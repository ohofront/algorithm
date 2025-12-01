// 입력 처리
// /dev/stdin 에서 숫자 하나(N)를 읽어온다.
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim();
const N = Number(input);

// DP 배열 정의
// dp[i] = 정수 i를 1로 만들기 위해 필요한 연산의 최소 횟수
// (연산: 1을 빼기, 2로 나누기, 3으로 나누기)
const dp = Array(N + 1).fill(0);

// 1은 이미 1이므로 연산 횟수 0
dp[1] = 0;

// 점화식 적용 (Bottom-Up)
// i를 1로 만드는 최소 연산 횟수는 다음 세 가지 경우 중 최소값:
// 1) i - 1 로 만들고 한 번 더 빼기 → dp[i-1] + 1
// 2) i 가 2로 나누어 떨어질 때: i / 2 로 만든 뒤 두 배 → dp[i/2] + 1
// 3) i 가 3으로 나누어 떨어질 때: i / 3 로 만든 뒤 세 배 → dp[i/3] + 1
for (let i = 2; i <= N; i++) {
  // 기본 연산: 1을 빼는 경우
  let minOps = dp[i - 1] + 1;

  // 2로 나누어 떨어질 경우 비교
  if (i % 2 === 0) {
    minOps = Math.min(minOps, dp[i / 2] + 1);
  }

  // 3으로 나누어 떨어질 경우 비교
  if (i % 3 === 0) {
    minOps = Math.min(minOps, dp[i / 3] + 1);
  }

  dp[i] = minOps;
}

// N을 1로 만드는 최소 연산 횟수 출력
console.log(dp[N]);
