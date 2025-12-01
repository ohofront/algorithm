const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");

const N = Number(input[0]);

// 인덱스를 1부터 쓰기 위해 맨 앞에 0을 넣어둔다.
const wine = [0];
for (let i = 1; i <= N; i++) {
  wine[i] = Number(input[i]);
}

// N이 1 또는 2 같이 작은 경우는 바로 처리
if (N === 1) {
  console.log(wine[1]);
  process.exit(0);
}
if (N === 2) {
  console.log(wine[1] + wine[2]);
  process.exit(0);
}

// DP 배열 정의
// dp[i] = 1번째 잔부터 i번째 잔까지 고려했을 때, 마실 수 있는 포도주의 최대 양
const dp = Array(N + 1).fill(0);

// 초기값 설정
// 1번째 잔까지 고려했을 때: 그냥 1번 잔만 마신 경우
dp[1] = wine[1];
// 2번째 잔까지 고려했을 때: 두 잔 다 마시는 것이 최대
dp[2] = wine[1] + wine[2];

// 점화식
// "연속으로 3잔을 마실 수 없다"는 조건을 만족하면서
// i번째 잔까지 고려했을 때의 최대 양은 3가지 경우 중 최댓값이다.
//
// 1) i번째 잔을 마시지 않는 경우
//    → dp[i-1]
// 2) i번째 잔만 마시고, i-1번째 잔은 마시지 않는 경우
//    → dp[i-2] + wine[i]
// 3) i-1, i번째 잔을 연속으로 마시고, i-2번째 잔은 마시지 않는 경우
//    → dp[i-3] + wine[i-1] + wine[i]
//
// 따라서,
//   dp[i] = max(
//     dp[i-1],
//     dp[i-2] + wine[i],
//     dp[i-3] + wine[i-1] + wine[i]
//   )
for (let i = 3; i <= N; i++) {
  dp[i] = Math.max(
    dp[i - 1],                             // i번째 잔을 건너뛰는 경우
    dp[i - 2] + wine[i],                   // i번째 잔만 마시는 경우
    dp[i - 3] + wine[i - 1] + wine[i]      // i-1, i번째 잔을 마시는 경우
  );
}

// 정답 출력: N번째 잔까지 고려했을 때 최대 양
console.log(dp[N]);