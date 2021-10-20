const [n, o] = process.argv.slice(2);
const colors = require('colors');

for(let i = n; i <= o; i++){
        if(i%2 == 0){
            console.log(colors.red(i));
            console.log(colors.yellow(i));
            console.log(colors.green(i));
        }
}
if(isNaN(n && o)){
    console.log(colors.red("Write range of numbers"));
}
if((n || o).typeof !== Number){
    console.log(colors.red("The argument is not a number"));
}
console.log("hello");