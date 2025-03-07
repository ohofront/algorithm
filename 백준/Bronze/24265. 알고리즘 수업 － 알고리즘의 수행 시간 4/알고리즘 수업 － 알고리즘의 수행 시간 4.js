// 입력을 받기 위한 파일 시스템 모듈 불러오기
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();

// 입력된 숫자 n을 정수로 변환
const n = parseInt(input, 10);

// 수행 횟수 계산
const count = BigInt(n) * BigInt(n - 1) / BigInt(2);

// 결과 출력
console.log(count.toString()); // 수행 횟수 출력
console.log(2); // 최고차항의 차수 출력 (O(n²) 이므로 2)