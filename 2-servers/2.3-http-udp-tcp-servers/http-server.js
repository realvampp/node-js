const http = require('http')

const server = http.createServer((request, response) => {
    let clientIP = request.connection.remoteAddress
    if (request.method === 'POST' && request.url === '/') {
        let receiveReq = new Date()
        console.log(`Request from client received at: ${formatTime(new Date())}`)
        console.log(`Client IP: ${clientIP}`)
        let data = '';

        // Обработка данных, полученных от клиента
        request.on('data', (chunk) => {
            data += chunk;
        });

        // Обработка завершения запроса
        request.on('end', () => {
            console.log(`Received message from client: ${data}\nAt ${formatTime(new Date())}`);
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end(`${data}`);
        });
    } else {
        // Если это не POST-запрос на корневой URL, отвечаем ошибкой
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('Not Found');
    }
});

const PORT = 3000;
server.listen(PORT);

let formatTime = (date) =>{
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();

   return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}