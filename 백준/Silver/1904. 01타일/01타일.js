const fs = require("fs");

// 입력: 한 줄에 정수 N
const input = fs.readFileSync(0, "utf8").trim();
const N = Number(input);

const MOD = 15746;

// N이 1 또는 2일 때는 바로 출력
if (N === 1) {
  console.log(1);
  process.exit(0);
}
if (N === 2) {
  console.log(2);
  process.exit(0);
}

// a = dp[1], b = dp[2]로 두고
// 이후부터는 피보나치처럼 갱신해 나간다.
let a = 1; // dp[1]
let b = 2; // dp[2]

// i는 3부터 N까지 순차적으로 dp[i]를 계산
for (let i = 3; i <= N; i++) {
  const c = (a + b) % MOD; // dp[i] = dp[i-1] + dp[i-2] (mod 15746)
  a = b; // 다음 턴을 위해 한 칸 밀기: a ← dp[i-1]
  b = c; // b ← dp[i]
}

// 최종적으로 b에는 dp[N]이 들어있다.
console.log(b % MOD);