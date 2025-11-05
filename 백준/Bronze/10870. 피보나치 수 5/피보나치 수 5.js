const fs = require("fs");

// 입력 읽기 및 정수 변환
const input = fs.readFileSync(0, "utf8").trim();
const N = Number(input);

// N이 0 또는 1인 경우는 그대로 반환
if (N <= 1) {
  console.log(N);
  process.exit(0);
}

// a = F(0), b = F(1) 로 시작
let a = 0;
let b = 1;

// i=2부터 N까지 F(i) = a + b 규칙으로 갱신
for (let i = 2; i <= N; i++) {
  const next = a + b; // F(i)
  a = b;              // 다음 스텝을 위해 한 칸 전진
  b = next;           // 현재 값 업데이트
}

console.log(b); // F(N)