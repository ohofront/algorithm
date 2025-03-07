const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();
const n = BigInt(input); // 입력값을 BigInt로 변환하여 사용

// 문제에서 주어진 함수의 수행 횟수는 O(n^3)
const result = n * n * n;

// 결과 출력
console.log(result.toString()); // BigInt는 문자열로 변환하여 출력
console.log(3); // 최고 차수 출력