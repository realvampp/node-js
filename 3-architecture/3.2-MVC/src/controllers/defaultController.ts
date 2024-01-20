import {Request, Response} from 'express'
import app from "../init";
import fs from "fs";


export async function getAdmin(req: Request, res: Response) {
    const access = req.session.access

    if (access)
        res.render('admin', {scripts: ['admin'], topName: 'Welcome, Admin'})
    else {
        res.redirect('/auth')
    }
}

export async function getAuth(req: Request, res: Response) {
    res.render('auth', {scripts:['auth'], topName: 'Authorization'})
}

export async function getIndex(req: Request, res: Response) {
    console.log('in index', req.path)

    if (req.path === '/search') {
        res.render('search', {scripts: ['search']})
    } else {
        res.render('index', {scripts: ['sidebar', 'index', 'search']})
    }
}

export async function getOneBook(req: Request, res: Response) {
    try {
        const connection = app.locals.connection
        let id = req.params.id

        let query = fs.readFileSync('./sqlQueries/books_authors/selectFromJoin.sql', 'utf-8')
        let incVisit = fs.readFileSync('./sqlQueries/books/incVisit.sql', 'utf-8')

        const [book] = await connection.execute(query, [id])
        await connection.execute(incVisit, [id])

        res.render('book-page', {book: book[0], pageTitle: "Book-page", scripts: ['book', 'search']})
    } catch (err) {
        console.log("Error", err)
    }
}