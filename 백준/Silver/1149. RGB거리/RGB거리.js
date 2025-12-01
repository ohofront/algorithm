// ─────────────────────────────────────────────
// 입력 처리
// 첫 줄: N (집의 수)
// 다음 N줄: R G B 비용
// ─────────────────────────────────────────────
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);

const N = input[0]; // 집의 수
let idx = 1;

// 비용을 2차원 배열로 저장: cost[i][색]
const cost = Array.from({ length: N + 1 }, () => Array(3).fill(0));

// 1번 집부터 N번 집까지 R,G,B 비용 입력
for (let i = 1; i <= N; i++) {
  cost[i][0] = input[idx++]; // 빨강 비용
  cost[i][1] = input[idx++]; // 초록 비용
  cost[i][2] = input[idx++]; // 파랑 비용
}

// DP 배열 생성: dp[i][색]
const dp = Array.from({ length: N + 1 }, () => Array(3).fill(0));

// 1번 집 초기값 설정
dp[1][0] = cost[1][0];
dp[1][1] = cost[1][1];
dp[1][2] = cost[1][2];

// 2번 집부터 N번 집까지 점화식대로 채우기
for (let i = 2; i <= N; i++) {
  // i번째 집을 빨강(0)으로 칠할 때
  dp[i][0] = cost[i][0] + Math.min(dp[i - 1][1], dp[i - 1][2]);

  // i번째 집을 초록(1)으로 칠할 때
  dp[i][1] = cost[i][1] + Math.min(dp[i - 1][0], dp[i - 1][2]);

  // i번째 집을 파랑(2)으로 칠할 때
  dp[i][2] = cost[i][2] + Math.min(dp[i - 1][0], dp[i - 1][1]);
}

// 마지막 집에서의 세 가지 경우 중 최소값이 전체 최소 비용
const answer = Math.min(dp[N][0], dp[N][1], dp[N][2]);

console.log(answer);