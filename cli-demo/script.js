/*const readline = require("readline");

const lineDetail = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

lineDetail.question(`Please provide your name -`,(name) => {
    console.log(`Hi ${name}!`);
    lineDetail.close();
});*/

const minimist = require('minimist');
 const args = minimist(process.argv.slice(2), {
   default: {
      num1: 'n1',
      num2: 'n2'
   }
 });
 console.log(`Num1 is: ${args.num1}`);
 const operation = args.operation;
 const num1 = parseInt(args.num1);
 const num2 = parseInt(args.num2);
 
 if(operation === 'add') {
    console.log(`Thhe result is: ${num1 + num2}`);
 } else if(operation === 'subtract') {
    console.log(`Thhe result is: ${num1 - num2}`);
 } else if(operation === 'multiply') {
    console.log(`Thhe result is: ${num1 * num2}`);
 } else {
    console.log('Unknown operation');
 }
 console.log(args.operation);
 console.log(args.num1);
 console.log(args.num2);