#!/usr/bin/node
const fs = require("fs");
const http = require("http");
const path = require("path");

(async () => {
  const isFile = (path) => fs.lstatSync(path).isFile();

  http
    .createServer((req, res) => {
        const currentDirectory = process.cwd();
      const fullPath = path.join(currentDirectory, req.url);

      if (!fs.existsSync(fullPath))
        return res.end("File or directory not found");

      if (isFile(fullPath)) {
        return fs.createReadStream(fullPath).pipe(res);
      }

      let links = "";

      fs.readdirSync(fullPath).forEach((fileName) => {
        const filePath = path.join(req.url, fileName);
        console.log(filePath);
        links += `<li><a href="${filePath}">${fileName}</a></li>`;
      });

      const HTML = fs
        .readFileSync(path.join(__dirname, "./ui.html"), "utf-8")
        .replace(`<h2>Hello from HTML</h2>`, links);

      res.writeHead(200, {
        "Content-Type": "text/html",
      });

      return res.end(HTML);
    })
    .listen(8880);
})();
