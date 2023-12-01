import express from 'express'
import cors from 'cors'
import fs from 'fs'
import bodyParser from 'body-parser'
import session from 'express-session'
import FileStore from 'session-file-store'

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

type UsersRecord = Record<string, { pass: string, items: Item[] }>

// const users: UsersRecord = {};
let usersFile = '../users.json'
if (!fs.existsSync(usersFile) || !fs.readFileSync(usersFile, 'utf-8')) {
    fs.writeFileSync('../users.json', JSON.stringify({}), 'utf-8')
}

app.post('/api/v1/login', (req, res) => {
    console.log('in login')
    let {login, pass} = req.body;
    let users: UsersRecord = JSON.parse(fs.readFileSync(usersFile, 'utf-8'))

    let user = users[login]
    if (user?.pass === pass) {
        console.log(req.session)
        if (!req.session.username) {
            console.log('here')
            req.session.username = login
        }
        res.json({ok: true})
    } else {
        console.log('in login false')
        res.status(401).json({error: 'Login or password doesnt correct'})
    }
})

app.post('/api/v1/register', (req, res) => {
    console.log('in register')
    let {login, pass} = req.body as User;
    let users: UsersRecord = JSON.parse(fs.readFileSync(usersFile, 'utf-8'))

    if (!users[login]) {
        users[login] = {pass: pass, items: []}
        fs.writeFileSync(usersFile, JSON.stringify(users), 'utf-8')
        res.json({ok: true})
    } else {
        res.status(401).json({error: 'User with this login has already existed'})
    }
})

app.post('/api/v1/logout', (req, res) => {
    console.log('in logout')
    req.session.destroy(err => {
        if (err) {
            console.error(err + 'myerr  ');
            res.json({ok: false})
        } else {
            res.json({ok: true})
        }
    })
})

app.get('/api/v1/items', (req, res) => {
    console.log('get items')
    console.log(req.query)
    let user
    try {
        let users: UsersRecord = JSON.parse(fs.readFileSync(usersFile, 'utf-8'))
        console.log(req.session)
        if (req.session.username) {
            user = users[req.session.username]
        } else {
            let login = `Guest${Math.floor(Math.random() * (2000000 - 1111)) + 1111}`
            console.log('in get else')
            users[login] = {pass: 'guest', items: []}
            req.session.username = login
            user = users[login]
        }
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf-8')

        res.json({items: user.items})
    } catch (err) {
        console.log(err)
        res.status(500).send('No users file at server')
    }


})

app.post('/api/v1/items', (req, res) => {
    console.log('post items')
    let id = fs.readFileSync('../src/idCounter.txt', 'utf-8') as unknown as number
    try {
        let users: UsersRecord = JSON.parse(fs.readFileSync(usersFile, 'utf-8'))
        if (req.session.username) {
            let user = users[req.session.username]

            let item = {
                text: req.body.text as string,
                id: id++,
                checked: false
            };
            user.items.push(item)

            fs.writeFileSync('../src/idCounter.txt', id + '', 'utf-8')
            fs.writeFileSync(usersFile, JSON.stringify(users), 'utf-8')

            res.json({id: id})
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('No users file at server')
    }
})

app.put('/api/v1/items', (req, res) => {
    let item = req.body
    try {
        if (req.session.username) {
            let users: UsersRecord = JSON.parse(fs.readFileSync(usersFile, 'utf-8'))

            let user = users[req.session.username]
            let indx = user.items.findIndex(element => element.id === item.id)
            user.items[indx] = item

            fs.writeFileSync(usersFile, JSON.stringify(users), 'utf-8')
            res.json({"ok": true})
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('No users file at server')
    }
})

app.delete('/api/v1/items', (req, res) => {
    let deletedId = req.body.id
    try {
        if (req.session.username) {
            let users: UsersRecord = JSON.parse(fs.readFileSync(usersFile, 'utf-8'))
            let user = users[req.session.username]

            user.items = user.items.filter((element: Item) => element.id !== deletedId)

            fs.writeFileSync(usersFile, JSON.stringify(users), 'utf-8')
            res.json({"ok": true})
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('No users file at server')
    }
})

let JSONFromFile = (fileName: string) => {
    return JSON.parse(fs.readFileSync(fileName, 'utf-8'))
}
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})