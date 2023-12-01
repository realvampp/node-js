import express from 'express'
import cors from 'cors'
import fs from 'fs'
import bodyParser from 'body-parser'
import session from 'express-session'
import FileStore from 'session-file-store'
import {Request, Response} from 'express';
import {Collection, MongoClient} from 'mongodb';


const app = express();
const port = 3005;
app.use(cors({
    origin: 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}))
app.use(bodyParser.json())

const FileStoreInstance = FileStore(session)
app.use(session({
    store: new FileStoreInstance({
        path: '../sessions',
        ttl: 600
    }),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
}))

interface User {
    login: string,
    pass: string,
    items: Item[]
}

interface Item {
    id: number,
    text: string,
    checked: boolean
}

declare module 'express-session' {
    interface SessionData {
        username: string; // Опціонально, залежно від вашої логіки
    }
}


// const users: UsersRecord = {};
const uri = 'mongodb://localhost:27017'; // Пример для локальной базы данных
const dbName = 'usersDB'; // замените на свою базу данных
const client = new MongoClient(uri);

app.post('/api/v2/router', async (req, res) => {
    console.log('in router')
    const action = req.query.action as string
    console.log('Action = ' + action)
    try {
        await client.connect();
        console.log('Успешное подключение к MongoDB');
        const db = client.db(dbName);
        const users = db.collection<User>('usersCollection');

        await handler[action](req, res, users)
    } catch (err) {
        console.log(err)
    } finally {
        await client.close();
        console.log('Отключение от монги')
    }

})

const handler: Record<string, Function> = {

    login: async (req: Request, res: Response, users: Collection<User>) => {
        console.log(('In login'))
        let {login, pass} = req.body;

        let user = await users.findOne({login: login})
        console.log(user)

        if (user?.pass === pass) {
            req.session.username = login
            res.json({ok: true})
        } else {
            console.log('in login false')
            res.status(401).json({error: 'not found'})
        }
    },

    logout: (req: Request, res: Response) => {
        console.log('in logout')
        req.session.destroy(err => {
            if (err) {
                console.error(err + 'myerr  ');
                res.json({ok: false})
            } else {
                res.json({ok: true})
            }
        })
    },

    register: async (req: Request, res: Response, users: Collection<User>) => {
        console.log('in register')
        let {login, pass} = req.body as User;

        let user = await users.findOne({login: login})
        if (!user) {

            await users.insertOne({login: login, pass: pass, items: []})
            res.json({ok: true})
        } else {
            res.status(401).json({error: 'User with this login has already existed'})
        }
    },

    getItems: async (req: Request, res: Response, users: Collection<User>) => {
        console.log('in getItems')
        let user
        try {
            let login = req.session.username
            let user = await users.findOne({login: login})

            if (user) {
                console.log(user.items)
                console.log(user)

                res.json({items: user.items})
            } else {
                res.status(500).send('Error in db')
                return;
            }
        } catch (err) {
            console.log(err)
            res.status(500).send('No users file at server')
        }
    },

    deleteItem: async (req: Request, res: Response, users: Collection<User>) => {
        console.log('In deleteItems')
        let deletedId = req.body.id
        try {
            let login = req.session.username
            await users.updateOne({login: login}, {$pull: {items: {id: deletedId}}})
            res.json({ok: true})
        } catch (err) {
            console.log(err)
            res.status(500).send('No users file at server')
        }
    },

    createItem: async (req: Request, res: Response, users: Collection<User>) => {
        console.log('post items')
        let id = fs.readFileSync('../src/idCounter.txt', 'utf-8') as unknown as number
        id++
        try {
            let login = req.session.username
            let text = req.body.text as string
            await users.updateOne({login: login}, {
                $push: {
                    items: {
                        text: text,
                        id: id,
                        checked: false
                    }
                }
            })

            fs.writeFileSync('../src/idCounter.txt', id + '', 'utf-8')
            res.json({id: id})
        } catch (err) {
            console.log(err)
            res.status(500).send('No users file at server')
        }
    },

    editItem: async (req: Request, res: Response, users: Collection<User>) => {
        console.log('in edit items')
        let item = req.body
        try {
            let login = req.session.username
            if (!login) {
                res.status(500).send('Error in db')
                return;
            }
            await users.updateOne(
                {login: login, 'items.id': item.id},
                {$set: {'items.$': item}}
            )
            res.json({ok: true})
        } catch (err) {
            console.log(err)
            res.status(500).send('No users file at server')
        }
    },

}

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})