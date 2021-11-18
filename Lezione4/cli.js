#!/usr/bin/node
const fs = require("fs/promises");
const { lstatSync } = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const yargs = require("yargs");

let currentDirectory = process.cwd();

const options = yargs
.positional("d", {
    describe: 'P <path to the file>',
    default: process.cwd(),
})
  .positional("s", {
    describe: "Pattern",
    default: '',
  }).argv;

console.log(options);

class ListItem {
    constructor(path, fileName) {
        this.path = path;
        this.fileName = fileName;
    }

    get isDir() {
        return lstatSync(this.path).isDirectory();
    }
}

const run = async () => {
    const list = await fs.readdir(currentDirectory);
    const items = list.map(fileName =>
        new ListItem(path.join(currentDirectory, fileName), fileName));

        const item = await inquirer
        .prompt([
            {
                name: 'listItem',
                type: 'list',
                message: `Choose: ${currentDirectory}`,
                choices: items.map(item => ({ name: item.fileName, value: item })),
            }
        ])
        .then(answer => answer.listItem);

        if (item.isDir) {
            currentDirectory = item.path;
            return await run();
        } else {
            const data = await fs.readFile(item.path, 'utf-8');
            if (options.s == null) console.log(data);
            else {
                const re = new RegExp(options.s, 'igm');
                console.log(data.match(re));
            }
        }
  };

  

run();