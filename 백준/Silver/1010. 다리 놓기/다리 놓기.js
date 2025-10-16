const fs = require("fs");
const tokens = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);

let p = 0;
const T = tokens[p++];

function nCk(n, k) {
  // 예외 처리
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;

  // 대칭성: C(n, k) = C(n, n-k), 더 작은 k로 계산해 곱셈 횟수 최소화
  k = Math.min(k, n - k);

  // C(n, k) = Π_{i=1..k} (n - i + 1) / i
  // 이 문제의 범위(M ≤ 30)에서는 정수 범위 내에서 안전하며
  // 단계마다 나누어떨어지므로 마지막에 정수 결과가 보장됩니다.
  let num = 1; // 분자 누적
  let den = 1; // 분모 누적
  for (let i = 1; i <= k; i++) {
    num *= (n - i + 1);
    den *= i;
    // 중간에 약분하고 싶다면 최대공약수로 나눌 수 있으나
    // 범위가 작아 생략해도 안전합니다.
  }
  return Math.floor(num / den);
}

const out = [];
for (let tc = 0; tc < T; tc++) {
  const N = tokens[p++];
  const M = tokens[p++];
  // 다리 놓기 정답: 동쪽에서 N개 선택 → C(M, N)
  out.push(String(nCk(M, N)));
}

console.log(out.join("\n"));