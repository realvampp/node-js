import express from "express";
import {getBooks, miniSearch, orderBook, wantBook} from "../controllers/apiController";

const apiRouter = express.Router()

apiRouter.get('/', getBooks)
apiRouter.get('/search', miniSearch)
apiRouter.post('/order', orderBook)
apiRouter.get('/want', wantBook)

export default apiRouter