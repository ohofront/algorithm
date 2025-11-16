// ─────────────────────────────────────────────
// 1. 입력 처리
// ─────────────────────────────────────────────
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim();
const N = Number(input); // 원판 개수

// ─────────────────────────────────────────────
// 2. 하노이 재귀 함수 구현
// ─────────────────────────────────────────────

// 이동 과정을 담을 배열 (문자열 리스트)
const moves = [];

/**
 * 하노이 탑 재귀 함수
 * @param {number} n    - 옮겨야 할 원판 개수
 * @param {number} from - 출발 기둥 번호
 * @param {number} to   - 도착 기둥 번호
 * @param {number} via  - 보조 기둥 번호
 */
function hanoi(n, from, to, via) {
  // 원판이 1개인 경우: 바로 from -> to 로 옮기면 끝
  if (n === 1) {
    moves.push(`${from} ${to}`);
    return;
  }

  // 1) 가장 큰 원판을 제외한 n-1개를 보조 기둥(via)로 옮긴다.
  hanoi(n - 1, from, via, to);

  // 2) 가장 큰 원판 1개를 목적지 기둥(to)로 옮긴다.
  moves.push(`${from} ${to}`);

  // 3) 아까 보조 기둥으로 옮겨두었던 n-1개를 목적지 기둥(to)로 옮긴다.
  hanoi(n - 1, via, to, from);
}

// 하노이 알고리즘 실행 (1번 기둥 → 3번 기둥, 2번 기둥은 보조)
hanoi(N, 1, 3, 2);

// 총 이동 횟수: 2^N - 1
const count = Math.pow(2, N) - 1;

// 결과 출력: 첫 줄에 이동 횟수, 이후 줄마다 "from to"
console.log(count.toString());
console.log(moves.join("\n"));