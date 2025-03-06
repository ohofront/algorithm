const fs = require("fs");

// 입력값 받아오기 (백준에서는 /dev/stdin 사용)
const input = fs.readFileSync("/dev/stdin").toString().trim();

// 입력값 N을 정수로 변환
const N = parseInt(input, 10);

// 사각형을 직선 형태로 배열할 경우, 둘레는 4 * N
const result = 4 * N;

// 결과 출력
console.log(result);