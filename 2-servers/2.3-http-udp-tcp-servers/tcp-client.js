let net = require('net')
let client = new net.Socket();
let sentData = 'Hello, server! Love, Client.'
let time;
client.connect(30000, '127.0.0.1', () => {
    console.log('Connected');
    time = new Date();
    client.write(sentData);
});

client.on('data', function (data) {
    if(sentData == data){
        console.log(`Received data is same as sent data: "${data}"`)
    }
    let receiveTime = new Date();
    console.log(`${receiveTime - time} millisecond(s) waited for response`)
    client.destroy(); // kill client after server's response
});

client.on('close', function () {
    console.log('Connection closed');
});