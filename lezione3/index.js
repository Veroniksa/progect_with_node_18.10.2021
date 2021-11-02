//Напишите программу, которая находит в файле accessV.log
//все записи с ip-адресами 89.123.1.41 и 34.48.240.111,
//а также сохраняет их в отдельные файлы с названием %ip-адрес%_requests.log.
const fs = require("fs");
const { Transform } = require("stream");
const ACCESS_V = "./accessV.log";
const readline = require("readline");

//readStrem file quello da copiare
//writeSream file quello da scrivere
//readStrem.pipe(writeSream)

/* const readSteream = fs.createReadStream(ACCESS_V, {
  flags: "r",
  encoding: "utf-8",
});
const re = new RegExp(/\d+\.\d+\.\d+\.\d+/g).exec("176.212.24.22");
readSteream.on("data", (chunk) => {
  const trans = chunk.toString().match(re);
  console.log(trans);
}); */
//readSteream.pipe(writeStrwm1);


const writeSream1 = fs.createWriteStream("./176.212.24.22_requests.log");
const writeSream2 = fs.createWriteStream("./89.123.1.41_requests.log");
const readStream = fs.createReadStream(ACCESS_V, "utf-8");

const readLine = readline.createInterface({
  input: readStream,
  terminal: true,
});

readLine.on("line", (line) => {
  if (line.includes("34.48.240.111")) {
    writeSream1.write(`${line} \n`);
  }

  if (line.includes("89.123.1.41")) {
    writeSream2.write(`${line} \n`);
  }
});
