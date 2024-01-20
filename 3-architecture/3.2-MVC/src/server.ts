import app from './init';
import {server} from "./init";
import defaultRouter from "./routes/defaultRouter";
import apiRouter from "./routes/apiRouter";
import adminRouter from "./routes/adminRouter";

app.use('/', defaultRouter)
app.use('/api/v1/books', apiRouter)
app.use('/admin/api/v1', adminRouter)


process.on('SIGINT', async () => {
    await app.locals.connection.end((err: {message: string})=>{
        if (err){
            return console.log("Error " + err.message)
        }
        console.log("Disconnect succeed")
    })
    server.close(() => {
        console.log('Сервер закрыт. Процесс завершен.');
        process.exit(0); // Выход из процесса с кодом 0
    });
})