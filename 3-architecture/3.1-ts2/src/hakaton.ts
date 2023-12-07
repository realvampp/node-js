import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express();
const port = 3005;
app.use(cors({
    origin: 'http://localhost:63342',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}))
app.use(bodyParser.json())

enum Buttons {
    Plus ,
    Minus
}
let buttonCount = {
    [Buttons.Plus]: 0,
    [Buttons.Minus]: 0
};

app.post('/', (req, res) => {
    let button = req.body.button as Buttons;

    buttonCount[button]++
    res.json({count: buttonCount[button]})
})


app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})