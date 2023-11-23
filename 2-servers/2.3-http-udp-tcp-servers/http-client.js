const http = require('http');
const msg = 'Hello, server'
let startTime;

// Опции для HTTP-запроса
const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'text/plain',
        'Content-Length': Buffer.byteLength(msg),
    },
};

// Выполнение HTTP-запроса
const request = http.request(options, (res) => {
    let data = '';

    // Обработка данных, полученных от сервера
    res.on('data', (chunk) => {
        data += chunk;
    });

    // Обработка завершения запроса
    res.on('end', () => {
        console.log(`${new Date()-startTime} millisecond(s) waited for response`)
        if (msg == data)
            console.log(`Received response from server is same as request: ${data}`);
        else
            console.log(`Received response isn't same as request: ${data}`)
    });
});

// Обработка ошибок при выполнении запроса
request.on('error', (error) => {
    console.error(`Error with request: ${error.message}`);
});
startTime = new Date()
request.write(msg)
// Завершение запроса
request.end();
