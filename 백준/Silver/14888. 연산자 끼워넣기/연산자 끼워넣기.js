// ─────────────────────────────────────────────
// 1. 입력 처리
// ─────────────────────────────────────────────
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");

const N = Number(input[0]); // 숫자의 개수
const nums = input[1].split(" ").map(Number); // 숫자들 배열
const ops = input[2].split(" ").map(Number);  // 연산자 개수: [+, -, *, /]

// ops[0] = 더하기 개수
// ops[1] = 빼기 개수
// ops[2] = 곱하기 개수
// ops[3] = 나누기 개수

// 최댓값과 최솟값을 저장할 변수
let maxValue = -Infinity;
let minValue = Infinity;

// ─────────────────────────────────────────────
// 2. 나눗셈 연산 함수 (문제의 규칙 맞추기)
// ─────────────────────────────────────────────
//
// - C/C++14 기준의 정수 나눗셈처럼 "0을 향해" 버림(truncation)해야 한다.
// - 자바스크립트에서 a / b 는 실수이므로, 이를 0을 기준으로 버려야 한다.
//   * 양수: Math.floor
//   * 음수: Math.ceil
//
function divideWithTruncZero(a, b) {
  const q = a / b;
  // q가 음수면 위로(절댓값 작게) 올림, 양수면 아래로 내림 → 0 방향으로 버림
  return q < 0 ? Math.ceil(q) : Math.floor(q);
}

// ─────────────────────────────────────────────
// 3. 백트래킹(DFS)로 모든 연산자 조합 탐색
// ─────────────────────────────────────────────
//
// idx: 현재 몇 번째 숫자까지 계산을 끝냈는지 (nums[idx]를 지금 사용하려는 인덱스)
// cur: 지금까지의 계산 결과
// plus, minus, mul, div: 각각 남은 연산자 개수
//
function dfs(idx, cur, plus, minus, mul, div) {
  // 모든 숫자를 다 사용했다면 (마지막까지 계산을 마친 상태)
  if (idx === N) {
    // 최댓값/최솟값 갱신
    if (cur > maxValue) maxValue = cur;
    if (cur < minValue) minValue = cur;
    return;
  }

  const nextNum = nums[idx]; // 다음에 사용할 숫자

  // 1) 더하기 연산자 사용
  if (plus > 0) {
    dfs(idx + 1, cur + nextNum, plus - 1, minus, mul, div);
  }

  // 2) 빼기 연산자 사용
  if (minus > 0) {
    dfs(idx + 1, cur - nextNum, plus, minus - 1, mul, div);
  }

  // 3) 곱하기 연산자 사용
  if (mul > 0) {
    dfs(idx + 1, cur * nextNum, plus, minus, mul - 1, div);
  }

  // 4) 나누기 연산자 사용
  if (div > 0) {
    dfs(idx + 1, divideWithTruncZero(cur, nextNum), plus, minus, mul, div - 1);
  }
}

// ─────────────────────────────────────────────
// 4. DFS 시작
// ─────────────────────────────────────────────
//
// 첫 번째 숫자는 그대로 시작값으로 사용하고,
// 두 번째 숫자부터(idx = 1) 연산자를 끼워 넣는다.
//
dfs(1, nums[0], ops[0], ops[1], ops[2], ops[3]);

// ─────────────────────────────────────────────
// 5. 결과 출력
// ─────────────────────────────────────────────
//
// 첫째 줄에 최댓값, 둘째 줄에 최솟값
//
console.log(maxValue.toString());
console.log(minValue.toString());