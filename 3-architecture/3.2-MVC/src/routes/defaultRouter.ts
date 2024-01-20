import express from "express";
import {getAdmin, getIndex, getOneBook, getAuth} from "../controllers/defaultController";
import auth from '../init'

const defaultRouter = express.Router()

defaultRouter.get('/', getIndex)
defaultRouter.get('/book/:id', getOneBook)
defaultRouter.get('/search', getIndex)
defaultRouter.get('/admin', getAdmin)
defaultRouter.get('/auth', getAuth)


export default defaultRouter