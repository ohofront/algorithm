// 1) 입력 처리: 표준 입력에서 "N K" 두 정수를 읽는다.
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
const [N, K] = input;

// 2) 조합 nCk 계산 함수
// - 곱셈/나눗셈을 이용해 O(k) 시간에 계산
// - 대칭성 이용: C(n, k) = C(n, n-k) 이므로 더 작은 k로 계산하면 연산이 줄어듦
function binom(n, k) {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;

  // 대칭성으로 k를 최솟값으로 치환
  k = Math.min(k, n - k);

  let numerator = 1;   // 분자 누적 곱
  let denominator = 1; // 분모 누적 곱

  // C(n, k) = (n * (n-1) * ... * (n-k+1)) / (k!)
  // 매 단계에서 나눗셈이 항상 나누어떨어지므로 정수 결과가 유지됨
  for (let i = 1; i <= k; i++) {
    numerator *= (n - i + 1);
    denominator *= i;
  }

  return Math.floor(numerator / denominator); // 정수 보장
}

// 3) 결과 계산 및 출력
const answer = binom(N, K);
console.log(answer);