const fs = require("fs");

// 1) 입력: 한 줄에 정수 N (층 수)
const input = fs.readFileSync(0, "utf8").trim();
const N = Number(input);

// 2) 계산: 경로의 총 개수 = 2^N
//    - N이 매우 작으므로(문제 조건상) 정수 범위에서 안전
const answer = 2 ** N;

// 3) 출력
console.log(answer.toString());