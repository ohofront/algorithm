const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");

// 첫 줄: 삼각형의 크기 N
const N = Number(input[0]);

// 이후 N줄: 삼각형 숫자들
// triangle[i][j] = i번째 줄, j번째 열 (0-index) 값
const triangle = [];
for (let i = 1; i <= N; i++) {
  triangle.push(input[i].trim().split(" ").map(Number));
}

// DP 배열 초기화
// dp[i][j] = (0,0)에서 시작해서 (i,j)에 도달할 수 있는 경로들 중 최대 합
// triangle과 같은 크기의 2차원 배열로 만들거나, triangle을 그대로 dp로 써도 된다.
const dp = Array.from({ length: N }, () => Array(N).fill(0));

// 시작점 설정: 꼭대기 값 그대로
dp[0][0] = triangle[0][0];

// 아래로 내려가면서 dp 값 채우기 (Top-Down 방식의 반복문 버전)
for (let i = 1; i < N; i++) {
  for (let j = 0; j <= i; j++) {
    // 현재 위치 (i, j)로 오는 경로는 두 가지:
    // 1) 바로 위에서 내려옴: (i-1, j)
    // 2) 왼쪽 위에서 내려옴: (i-1, j-1)
    // 둘 중 존재하는 것만 고려해서 최댓값을 취한다.

    let fromUp = 0;      // (i-1, j)에서 오는 경우
    let fromUpLeft = 0;  // (i-1, j-1)에서 오는 경우

    // 위쪽 (i-1, j)가 범위 안에 있을 때만 사용
    if (j <= i - 1) {
      fromUp = dp[i - 1][j];
    }

    // 왼쪽 위 (i-1, j-1)가 범위 안에 있을 때만 사용
    if (j - 1 >= 0) {
      fromUpLeft = dp[i - 1][j - 1];
    }

    // 두 경로 중 더 큰 값에 현재 삼각형의 값 더하기
    dp[i][j] = Math.max(fromUp, fromUpLeft) + triangle[i][j];
  }
}

// 마지막 줄(dp[N-1])에서 최댓값이 정답
const answer = Math.max(...dp[N - 1]);

// 결과 출력
console.log(answer);