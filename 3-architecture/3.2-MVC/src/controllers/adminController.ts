import {Request, Response} from 'express'
import basicAuth from "basic-auth";
import app from "../init";
import fs from "fs";
import path from "path";

export async function removeBook(req: Request, res: Response) {
    try {
        const connection = app.locals.connection
        const id = req.body.id
        console.log('removeBook', id)

        let deleteQuery = fs.readFileSync('./sqlQueries/books/deleteBook.sql', 'utf-8')
        let [approvement] = await connection.execute(deleteQuery, [id])

        if (approvement.affectedRows != 1) {
            res.json({success: false, msg: 'DB troubles'})
        }

        res.json({success: true})
    } catch (err) {
        console.log('Error', err)
        res.status(500).send()
    }
}

export async function addBook(req: Request, res: Response) {
    try {
        const connection = app.locals.connection
        const book = req.body
        const file = req.file

        if (!file)
            return res.json({success: false, msg: 'Отсутствует картинки'})

        book.author = arrayDeleteVoid(book.author)
        let placeholders = book.author.map(() => '(?)').join(', ')

        let addBookQuery = fs.readFileSync('./sqlQueries/books/addBook.sql', 'utf-8')
        let addBooksAuthorsQuery = fs.readFileSync('./sqlQueries/books_authors/insertBooksAuthors.sql', 'utf-8')
        let addAuthorScript = fs.readFileSync('./sqlQueries/authors/addAuthor.sql', 'utf-8')
        let addAuthorQuery = addAuthorScript.replace('?', placeholders);

        let [approvementBook] = await connection.execute(addBookQuery, [book.name, book.descr, book.year])
        let [approvementAuthor] = await connection.execute(addAuthorQuery, book.author)

        if (approvementBook.affectedRows != 1 || approvementAuthor.affectedRows == 0) {
            return res.json({success: false, msg: 'DB troubles'})
        }

        let bookId = approvementBook.insertId
        let authorId = approvementAuthor.insertId
        let authorCount = approvementAuthor.affectedRows

        for (let i = 0; i < authorCount; i++) {
            await connection.execute(addBooksAuthorsQuery, [bookId, (authorId + i)])
        }

        fs.renameSync(file.path, 'static/img/books/' + bookId + path.extname(file.originalname))

        res.json({success: true})
    } catch (err) {
        console.log(err)
        res.status(500).send('Ошибка на сервере')
    }

}

export async function booksAdmin(req: Request, res: Response) {
    try {
        const multiplier = 6
        const connection = app.locals.connection
        const filter = req.query.filter
        const page = +req.query.page!

        const offset = ((page - 1) * multiplier) + ''

        let totalQuery = fs.readFileSync('./sqlQueries/books/getNumberOfBooks.sql', 'utf-8')
        let [amountBooks] = await connection.execute(totalQuery)
        let pages = Math.ceil(amountBooks[0].amount / multiplier)

        let limitOffsetQuery = fs.readFileSync('./sqlQueries/books_authors/limitOffset.sql', 'utf-8')
        let [books] = await connection.execute(limitOffsetQuery, [multiplier + '', offset])

        let data = {books: books, total: {pages}, page, filter}

        res.json({data, success: true})
    } catch (err) {
        console.log("Error", err)
        res.status(500).send()
    }
}

export async function adminLogin(req: Request, res: Response) {
    const credentials = basicAuth(req)

    if (req.query.action == 'logout') {
        req.session.access = false

        return res.json({success: true});
    }

    if (!credentials || credentials.name !== 'admin' || credentials.pass !== '12345') {
        req.session.access = false;

        return res.json({success: false, msg: 'Неверный логин или пароль'});
    }

    req.session.access = true;
    res.json({success: true})
}

function arrayDeleteVoid(books: string[]) {
    books = books.reduce((accum: string[], current: string) => {
        if (current) {
            accum.push(current)
        }
        return accum
    }, [])

    return books
}