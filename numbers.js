const [n, o] = process.argv.slice(2);
const colors = require('colors');
/* const n = "è", o = "" */

for(let i = n; i <= o; i++){
        if(i%2 == 0){
            console.log(colors.red(i));
            console.log(colors.yellow(i));
            console.log(colors.green(i));
            /* console.log(i) */
        }
        else if(i%2 !== 0){
            console.log(colors.red("There are no prime numbers in the range "));
        }
        else if(typeof(n & o) !== "number") {
            console.log(colors.red("ERROR: The argument(s) is not a number"));
        }
}
console.log("hello");