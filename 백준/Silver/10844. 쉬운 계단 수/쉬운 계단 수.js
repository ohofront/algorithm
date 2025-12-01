// 첫 줄에 N (1 ≤ N ≤ 100)이 주어진다.
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim();
const N = Number(input);

// 문제에서 요구하는 나머지 값
const MOD = 1_000_000_000;

// DP 정의
// dp[i][d] = 길이가 i인 계단 수 중에서 마지막 자리가 d(0~9)인 것들의 개수
// 예) dp[3][2] = 길이 3, 맨 끝 숫자가 2인 계단 수 개수
const dp = Array.from({ length: N + 1 }, () => Array(10).fill(0));

// 초기값 설정 (길이 1인 계단 수)
// 한 자리 계단 수는 1~9 까지 가능 (0으로 시작하는 수는 허용 X)
for (let d = 1; d <= 9; d++) {
  dp[1][d] = 1;
}
// dp[1][0]은 0 (0으로 시작하는 수는 계단 수에서 제외)

// 점화식
// 길이가 i인 계단 수를 만들 때,
// 마지막 자리가 d일 수 있는 경우는 다음 두 가지다:
//
// 1) 바로 이전 자리(i-1 자리)의 마지막 숫자가 d-1 이었을 때
// 2) 바로 이전 자리(i-1 자리)의 마지막 숫자가 d+1 이었을 때
//
// 즉,
//   dp[i][0] = dp[i-1][1]
//   dp[i][9] = dp[i-1][8]
//   dp[i][d] = dp[i-1][d-1] + dp[i-1][d+1]  (1 <= d <= 8)
//
// 위 식을 MOD로 나눈 나머지로 관리한다.
for (let i = 2; i <= N; i++) {
  for (let d = 0; d <= 9; d++) {
    if (d === 0) {
      // 마지막이 0이라면 그 앞 자리는 무조건 1
      dp[i][d] = dp[i - 1][1] % MOD;
    } else if (d === 9) {
      // 마지막이 9라면 그 앞 자리는 무조건 8
      dp[i][d] = dp[i - 1][8] % MOD;
    } else {
      // 그 외 (1~8)은 양 옆 숫자에서 올 수 있음
      dp[i][d] = (dp[i - 1][d - 1] + dp[i - 1][d + 1]) % MOD;
    }
  }
}

// 정답 계산
// 길이가 N인 계단 수의 개수 = 마지막 자리가 0~9인 경우 모두 합친 값
let answer = 0;
for (let d = 0; d <= 9; d++) {
  answer = (answer + dp[N][d]) % MOD;
}

// 결과 출력
console.log(answer);