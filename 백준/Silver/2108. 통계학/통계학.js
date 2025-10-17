const fs = require("fs");

const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((num) => parseInt(num));


const n = input.shift();
const nums = input.sort((a, b) => a - b);

const avr = Math.round(input.reduce((acc, num) => (acc += num), 0) / n);
console.log(avr.toString());

console.log(nums[Math.floor(n / 2)].toString());

let max = 0;

const mapp = new Map();

for (let i of nums) {
  if (mapp.get(i)) {
    mapp.set(i, mapp.get(i) + 1);
  } else {
    mapp.set(i, 1);
  }
  if (mapp.get(i) > max) max = mapp.get(i);
}

let frq = [];
for (let i of new Set(nums)) {
  if (mapp.get(i) == max) frq.push(i);
}

frq.length > 1 ? console.log(frq[1]) : console.log(frq[0]);

const max_n = nums[n - 1];
const min_n = nums[0];
console.log((max_n - min_n).toString());