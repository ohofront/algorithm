const fs = require('fs');

// 입력 데이터를 줄바꿈 기준으로 나눠
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫 줄은 숫자의 개수 
const N = Number(input[0]);

// 나머지 줄은 정렬할 숫자 목록
const numbers = input.slice(1).map(Number);

// 자바스크립트의 기본 정렬은 문자열 기준이므로 숫자 정렬을 위해 compare 함수 필요
numbers.sort((a, b) => a - b);

// 정렬된 결과를 한 줄씩 출력
console.log(numbers.join('\n'));