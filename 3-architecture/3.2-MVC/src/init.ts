// import cors from 'cors'
import express, {Request, Response, NextFunction} from 'express'
import * as path from "path";
import bodyParser from 'body-parser'
import mysql from "mysql2/promise";
import session from 'express-session'
import FileStore from 'session-file-store'
import multer from 'multer'
import fs from "fs";

const app = express();
const port = 3000;
const FileStoreInstance = FileStore(session)

declare module 'express-session' {
    interface SessionData {
        access: boolean;
    }
}

app.use(bodyParser.json())

app.use(session({
    store: new FileStoreInstance({
        path: 'sessions',
        ttl: 3600
    }),
    secret: 'playboi carti realvamp',
    resave: true,
    saveUninitialized: false,
}))

app.use('/static', express.static(path.join(__dirname, '../static')))
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

export const server = app.listen(port, async () => {
    console.log(`App listen on port ${port}`);
    try {
        app.locals.connection = await mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '12345',
            database: 'mydb'
        });
        console.log(`Connected to DB`);
    } catch (err) {
        return console.log(err);
    }
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/img/books');
    },
    filename: async function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.access) {
        console.log('in auth false')
        return res.redirect('/auth')
    }
    next();
}

export const upload = multer({storage: storage, fileFilter: fileFilter});
export default app;