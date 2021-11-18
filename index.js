const colors = require('colors');
//const args = process.argv.slice(2);
const [from, to] = process.argv.slice(2);
//console.log(colors.yellow("Hello world from"), colors.blue(args));
console.log(colors.yellow("Hello world from"), colors.blue(from), "to", colors.green(to));

