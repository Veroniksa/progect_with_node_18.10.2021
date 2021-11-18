const fs = require("fs");
const { Transform } = require("stream");
const ACCESS_LOG = "./access.log";
//const fsPromises = require("fs/promises");

/* const data = fs.readFileSync(ACCESS_LOG, {
    encoding: 'utf-8',
});
//console.log(data.toString());
console.log(data); */

/* fs.readFile(ACCESS_LOG, 'utf-8', (err, data) => {
   if(err) console.log(err);
   else console.log(data);
}); */

/* fsPromises.readFile(ACCESS_LOG, 'utf-8')
.then((data) => {
    console.log(data);
})
.catch((err) => {
    console.log(err);
}); */

/* const foo = async () => {
  try {
    const data = await fsPromises.readFile(ACCESS_LOG, "utf-8");
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

foo(); */

const requests = [
  `127.0.0.1 - - [25/May/2021:00:07:17 +0000] "GET /foo HTTP/1.1" 200 0 "-" "curl/7.47.0"`,
  `127.0.0.1 - - [25/May/2021:00:07:24 +0000] "POST /baz HTTP/1.1" 200 0 "-" "curl/7.47.0"`,
];

/* fs.writeFile(ACCESS_LOG, 
    requests[1] + `\n`, 
    {
        encoding: 'utf-8',
        flag: 'a',
    }, 
    (err) => {
        if (err) console.log(err);
}); */

//OR al posto gi usare flag 'a' usare il metodo appendFile

/* fs.appendFile(ACCESS_LOG, 
    requests[1] + `\n`, 
    {
        encoding: 'utf-8',
    }, 
    (err) => {
        if (err) console.log(err);
}); */

//fs.ReadStream();
//fs.createReadStream();

const readStream = fs.createReadStream(

    ACCESS_LOG, 
    {
        flags: 'r',
        encoding: 'utf-8',
        //autoClose
        //start
        //end

        highWaterMark: 30,
    });

readStream.on('open', () => {
    console.log("File opened");
});
//data OR line
readStream.on('data', (chunk) => {
    console.log("Read chunk:", chunk);
});
readStream.on('end', () => {
    console.log("Finished");
});
readStream.on('error', (err) => {
    console.log(err);
});



/* const writeStream = fs.createWriteStream(
    ACCESS_LOG,
    {
        encoding: 'utf-8',
        flags: 'a',
    }
);

requests.forEach(logString => {
    writeStream.write(logString + `\n`);
});

writeStream.end(() => {
    console.log('Finished');
}); */

const payAccount = false;
const readStream = fs.createReadStream(ACCESS_LOG);
//tStream трансформированный(измененный) поток
const tStream = new Transform({
  transform(chunk, encoding, callback) {
    if (payAccount) this.push(chunk);
    else {
      const transformed = chunk
        .toString()
        .replace(/\d+\.\d+\.\d+\.\d+/g, "[IP was hidden]");
      this.push(transformed);
      callback();
    }
  },
});

readStream
    .pipe(tStream)
    .pipe(process.stdout);
