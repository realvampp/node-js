let net = require('net')

let server = net.createServer(socket => {
    // socket.pipe(socket);
    console.log(`Client connected from IP address: ${socket.remoteAddress} at ${new Date()}`)
    socket.on('data', (data) => {
        console.log(`Receive data from client at: ${new Date()}`)
        console.log(`Received data: ${data}`)
        socket.write(data);
    })
    socket.on('end', (socket) => {
        console.log(`Disconnected at: ${new Date()}`)
    });
})
server.listen(30000);