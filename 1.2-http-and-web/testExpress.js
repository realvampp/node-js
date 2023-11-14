const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')

app.get('/', (req, res) => {
    res.send('Hello World! ')
})

app.get('/counter', (req, res) => {
    let counter = fs.readFileSync('counter.txt', 'UTF-8')
    counter++
    fs.writeFileSync('counter.txt', counter+'', 'UTF-8')
    res.send(`Кількість заходів на сайт ${counter}`);
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})