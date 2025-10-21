const fs = require("fs");

// 입력 읽기 & 정수로 변환
const input = fs.readFileSync(0, "utf8").trim();
const N = Number(input); // 반복 제어에는 Number로 충분

// 팩토리얼은 0! = 1 이므로 초기값을 1n(BigInt)으로 설정
let ans = 1n;

// 1부터 N까지 곱셈(정확한 정수 연산을 위해 i도 BigInt로 변환)
for (let i = 2; i <= N; i++) {
  ans *= BigInt(i);
}

// BigInt를 문자열로 출력
console.log(ans.toString());