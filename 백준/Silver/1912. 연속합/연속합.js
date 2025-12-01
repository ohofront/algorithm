// ─────────────────────────────────────────────
// 입력 처리
// 첫 줄: N (수열 길이)
// 둘째 줄: N개의 정수
// ─────────────────────────────────────────────
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);

const N = input[0];          // 수열 길이
const arr = input.slice(1);  // 실제 수열

// N이 1인 경우는 그냥 그 값이 정답
if (N === 1) {
  console.log(arr[0]);
  process.exit(0);
}

// ▒ 메모리 절약형 Kadane 알고리즘 구현
// currentSum: i번째 원소로 "끝나는" 최대 연속합 (dp[i] 역할)
// maxSum: 지금까지 본 연속합 중 최댓값
let currentSum = arr[0];
let maxSum = arr[0];

// 1번째 인덱스부터 순회 (0은 이미 처리)
for (let i = 1; i < N; i++) {
  const value = arr[i];

  // dp[i] = max(arr[i], dp[i-1] + arr[i])
  currentSum = Math.max(value, currentSum + value);

  // 전체 최댓값 갱신
  if (currentSum > maxSum) {
    maxSum = currentSum;
  }
}

// 최종 결과 출력
console.log(maxSum);