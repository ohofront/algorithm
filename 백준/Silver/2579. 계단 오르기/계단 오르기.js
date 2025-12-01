// 입력 처리 (/dev/stdin에서 전체를 읽어옴)
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");

// 첫 줄: 계단 개수 N
const N = Number(input[0]);

// 다음 N줄: 각 계단의 점수
// 편하게 인덱스를 1부터 쓰기 위해 앞에 0을 하나 넣어줌
const stairs = [0];
for (let i = 1; i <= N; i++) {
  stairs[i] = Number(input[i]);
}

// N이 1 또는 2처럼 작은 경우는 바로 처리
if (N === 1) {
  console.log(stairs[1]);
  process.exit(0);
}
if (N === 2) {
  console.log(stairs[1] + stairs[2]);
  process.exit(0);
}

// DP 배열 정의
// dp[i] = i번째 계단에 "도착했을 때" 얻을 수 있는 점수의 최댓값
const dp = Array(N + 1).fill(0);

// 초기값 설정
// 1번 계단: 그냥 1번 계단만 밟았을 때
dp[1] = stairs[1];
// 2번 계단: 1 → 2 로 연속 두 계단 밟는 것이 항상 최댓값
dp[2] = stairs[1] + stairs[2];

// 점화식
// 연속으로 3번 계단을 밟으면 안 된다.
// i번째 계단에 도달하는 경우는 2가지 뿐이다:
//
// 1) (i-2) → i        : 한 계단 건너뛰고 오는 경우
//    => dp[i-2] + stairs[i]
//
// 2) (i-3) → (i-1) → i : i-1, i를 연속으로 밟는 경우
//    => dp[i-3] + stairs[i-1] + stairs[i]
//
// 위 두 경우 중 더 큰 값을 선택한다.
for (let i = 3; i <= N; i++) {
  dp[i] = Math.max(
    dp[i - 2] + stairs[i],                  // (i-2)에서 한 칸 건너뛰어 i로
    dp[i - 3] + stairs[i - 1] + stairs[i]   // (i-3) → (i-1) → i
  );
}

// 마지막 계단(N)을 반드시 밟아야 하므로 dp[N]이 정답
console.log(dp[N]);