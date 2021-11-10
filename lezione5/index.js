const fs = require("fs");
const http = require('http');
const url = require("url");
const path = require("path");

const cluster = require("cluster");
const os = require("os");

//const server = http.createServer((req, res) => {
  //res.end("Hello from node.js");
  /* console.log('url:', req.url);
  console.log('method:', req.method);
  console.log('headers:', req.headers); */
/*   res.setHeader("x-server", "my server");
  res.writeHead(200, "OK", {
   "castom-header": "test",
  }); 


});
server.listen(5555);*/

//URL
/*   if(req.url === './user') {
      res.write('User found');
      res.end();
  } else {
      res.writeHead(404, 'Not found', {
          'castom-header': 'test'
      });
      res.write('User not found')
      res.end();
  }
    */

//METHODS
/* if(req.method === 'GET') {
    res.write('Hello');
    res.end();
} else {
    res.writeHead(405, 'Not Allowed', {
        'test-header' : 'header',
    });
    res.write('Method not allowed');
    res.end();
} 

const {query} = url.parse(req.url, true);
console.log(query);*/

/* if(req.method === 'POST'){
    let data = '';

    req.on('data', chunk = data += chunk);
    req.on('end', () => {
        const parsedData = JSON.parse(data);
        console.log(data);
        console.log(parsedData);
        res.writeHead(200, 'OK', {
            'content-Type': 'application/json',
        });
        res.end(data);
    });
} else {
    req.end();
} 

const filePath = path.join(__dirname, "./index.html");
  const readStream = fs.createReadStream(filePath);
  res.writeHead(200, "OK", {
    "Content-Type": "text/html",
  });
  readStream.pipe(res);
  
});

server.listen(5555);
*/



//INSTENS
 if (cluster.isMaster) {
  //cluster.fork();
  console.log(`Master procces ${process.pid} is running...`);
  for (let i = 0; i < os.cpus().length; i++) {
    console.log(`Forking process number ${i}`);
    cluster.fork();
  }
} else {
  console.log(`Worker ${process.pid} is running`);
  http.createServer((req, res) => {
      const filePath = path.join(__dirname, "./index.html");
      const readStream = fs.createReadStream(filePath);

      setTimeout(() => {
        console.log(`Worker ${process.pid} hander request`);
        res.writeHead(200, "OK", {
          "content-Type": "application/json",
        });
        readStream.pipe(res);
      }, 5000);
    })
    .listen(5555);
  }