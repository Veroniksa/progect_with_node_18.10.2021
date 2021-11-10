const socket = require("socket.io");
const http = require("http");
const fs = require("fs");
const path = require("path");


const server = http
.createServer((req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(indexPath);

    readStream.pipe(res);
});

const io = socket(server);

io.on('connection', client => {
    console.log(client);
    //console.log('new connection');
    client.on('client-msg', data => {
        //console.log(data);
        /* const payload = {
            message: data.message.split('').reverse().join('')
        }; */
        const payload = {
            message: data.message,
        };

        client.broadcast.emit('server-msg', payload);
        client.emit('server-msg', payload);//способ уведомить всех кроме себя
    });
});

server.listen(5555);
