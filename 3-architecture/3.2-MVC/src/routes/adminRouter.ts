import express from "express";
import {addBook, adminLogin, booksAdmin, removeBook} from "../controllers/adminController";
import {auth, upload} from "../init";

const adminRouter = express.Router()

adminRouter.get('/login', adminLogin)
adminRouter.get('/books', auth, booksAdmin)
adminRouter.post('/upload', auth, upload.single('pict'), addBook)
adminRouter.post('/remove', auth, removeBook)

export default adminRouter
