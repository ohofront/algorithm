/* 1. fs 모듈을 사용하여 입력 값을 읽고 문자열로 변환 */
const fs = require('fs');
const input = require("fs").readFileSync("/dev/stdin").toString().trim();

/* 2. 문자열을 반대로 뒤집음 */
const reverse = input.split("").reverse().join("");  

/* 3. 원본 문자열(input)과 뒤집은 문자열(reverse)이 같다면 1, 아니면 0을 출력 */
console.log(input === reverse ? 1 : 0);
