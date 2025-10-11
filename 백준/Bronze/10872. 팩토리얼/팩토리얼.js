const fs = require("fs");

// 1) 입력: 한 줄에 정수 N (0 ≤ N ≤ 12)
const input = fs.readFileSync(0, "utf8").trim();
const N = Number(input);

// 2) 팩토리얼 계산 (반복문 사용)
//    - 0! 은 1로 정의
//    - N이 작으므로 Number로 충분 (오버플로우 걱정 X)
let fact = 1;
for (let i = 2; i <= N; i++) {
  fact *= i;
}

// 3) 결과 출력
console.log(fact.toString());