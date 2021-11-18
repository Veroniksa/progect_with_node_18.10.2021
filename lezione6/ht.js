const socket = require("socket.io");
const http = require("http");
const fs = require("fs");
const path = require("path");


const server = http
.createServer((req, res) => {
    const indexPath = path.join(__dirname, './index.html');
    const readStream = fs.createReadStream(indexPath);

    readStream.pipe(res);
});

const io = socket(server);
let numUsers = 0;

io.on('connection', client => {
    let addUser = false;
    //console.log('New connection');
    client.on('client-name', nikName =>{
        if(addUser) return;
        const nameUser = {
            name: nikName.name,
            online: nikName.name,
        };
        //for numbers sockets connected
        numUsers++;
        addUser = true;
        client.emit('login', {
            numUsers: numUsers,
        });
        console.log(numUsers);
        client.emit('server-name', nameUser);
        client.broadcast.emit('server-name', nameUser);
        //client.broadcast.emit('server-name', numUsers);
    });
    client.on('client-msg', data => {
        //console.log(data);
        const payload = {
            name: data.name,
            message: data.message,
        };
        client.broadcast.emit('server-msg', payload);//informare tutti, trane se stesso
        client.emit('server-msg', payload);//informare solo se stesso
    });
    client.on('disconnect', () => {
        console.log('Fuori');
        client.broadcast.emit('disconnected', {
            numUsers: --numUsers, 
            
        });
    });
    /* client.on('reconnection', ()=> {
        console.log('??????');
        client.broadcast.emit('reconnected')
    }) */
});

server.listen(5555);
