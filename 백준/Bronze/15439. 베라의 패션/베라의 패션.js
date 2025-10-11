
const fs = require("fs");

// 1) 입력 읽기: 한 줄에 정수 N이 주어짐
const input = fs.readFileSync(0, "utf8").trim();
const N = Number(input);

// 2) 계산: 서로 다른 두 색 조합 수
//    - 상의 색: N가지 선택
//    - 하의 색: 상의와 다른 색이어야 하므로 (N - 1)가지
const answer = N * (N - 1);

// 3) 출력
console.log(answer.toString());