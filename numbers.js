const [n, o] = process.argv.slice(2);
const colors = require('colors');

for(let i = n; i <= o; i++){
        if(i%2 == 0){
            console.log(colors.red(i));
            console.log(colors.yellow(i));
            console.log(colors.green(i));
        }
        else if(isNaN(n && o)){
            console.log(colors.red("Write range of numbers"));
        }
        else if(typeof(n & o) !== "number") {
            console.log(colors.red("ERROR: The argument(s) is not a number"));
        }
}
console.log("hello");