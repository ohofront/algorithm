const fs = require('fs');
const numbers = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = numbers.shift();

/* 출력 값 */
numbers.sort((a, b) => a - b).forEach(num => console.log(num))