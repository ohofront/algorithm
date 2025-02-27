// 입력값을 읽어옴 (백준에서는 '/dev/stdin' 사용)
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split(' ');

// 입력값 분해
const N = input[0]; // 변환할 수 (문자열 형태)
const B = parseInt(input[1]); // 진법 (10진수 형태)

// parseInt 함수를 사용하여 B진법의 N을 10진법으로 변환
const result = parseInt(N, B);

// 변환된 결과 출력
console.log(result);
