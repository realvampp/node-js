const dgram = require('dgram');


const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
    console.log(`Receive message at: ${formatTime(new Date())}`)
    console.log(`Received message from ${rinfo.address}:${rinfo.port}: ${msg}`);
    server.send(msg, 0, msg.length, rinfo.port, rinfo.address);
    console.log('Session has been ended\n')
})


const PORT = 3000;
server.bind(PORT);

let formatTime = (date) =>{
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}