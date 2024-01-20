import {Request, Response} from "express";
import app from "../init";
import fs from "fs";


export async function orderBook(req: Request, res: Response) {
    console.log('in order book')
    const id = req.body.id
    const email = req.body.email

    console.log(id, email)
    res.json({success: true})
}

export async function wantBook(req:Request, res: Response){
    try {
        const connection = app.locals.connection
        let id = req.query.id
        let incWant = fs.readFileSync('./sqlQueries/books/incWant.sql', 'utf-8')

        const [result] = await connection.execute(incWant, [id])
        // console.log(result)
        if (result.affectedRows !== 1) throw new Error()

        res.json({success: true})

    } catch (err) {
        res.json({success: false, msg: 'Ошибка на сервере'})
    }
}

export async function getBooks(req: Request, res: Response) {
    const connection = app.locals.connection
    let limit = req.query.limit
    let filter = req.query.filter
    let offset = req.query.offset || '0'

    let limitOffsetQuery = fs.readFileSync('./sqlQueries/books_authors/limitOffset.sql', 'utf-8')
    let [books] = await connection.execute(limitOffsetQuery, [limit, offset])

    let totalQuery = fs.readFileSync('./sqlQueries/books/getNumberOfBooks.sql', 'utf-8')
    let [amountBooks] = await connection.execute(totalQuery)

    let data = {books: books, total: amountBooks[0], filter, offset}

    res.json({data, success: true})
}

export async function miniSearch(req: Request, res: Response) {
    const connection = app.locals.connection
    let search = req.query.search

    search = `%${search}%`
    const likeQuery = fs.readFileSync('./sqlQueries/books_authors/findBook.sql', 'utf-8')

    let [books] = await connection.execute(likeQuery, [search, search])

    let data = {books, total: {amount: books.length}}

    res.json({data, success: true})
}