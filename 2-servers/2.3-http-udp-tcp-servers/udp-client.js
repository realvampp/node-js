const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const message = 'Hello, server!';
let startTime;

client.send(message, 0, message.length, 3000, 'localhost', (err) => {
    if (err) throw err;
    startTime = new Date();
});
client.on('message', (msg, rinfo) =>{
    console.log(`${new Date()-startTime} millisecond(s) waited for response`)
    console.log(`Receive message from: ${rinfo.address}:${rinfo.port}`)
    if (msg == message)
        console.log(`Received message is same as requested one: ${message}`)
    else
        console.log(`Received message isn't same as requested one: ${message}`)
    client.close();
})
