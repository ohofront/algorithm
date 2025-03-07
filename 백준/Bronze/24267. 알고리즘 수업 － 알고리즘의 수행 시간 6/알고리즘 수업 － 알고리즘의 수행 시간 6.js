const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();
const n = BigInt(input); // 입력값을 BigInt로 변환하여 사용

// 문제에서 주어진 수행 횟수는 O(n^3)에서 조합 개수를 이용한 계산
const result = (n * (n - BigInt(1)) * (n - BigInt(2))) / BigInt(6);

// 결과 출력
console.log(result.toString()); // BigInt는 문자열로 변환하여 출력
console.log(3); // 최고 차수 출력