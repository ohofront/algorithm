// ─────────────────────────────────────────────
// 1. 입력 처리
// ─────────────────────────────────────────────
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
const N = input[0]; // 1부터 N까지의 자연수
const M = input[1]; // 뽑을 개수

// ─────────────────────────────────────────────
// 2. 백트래킹 준비
// ─────────────────────────────────────────────

// 현재까지 선택한 숫자들을 담는 배열
const selected = [];

// 결과를 문자열로 모아두는 배열
const result = [];

/**
 * 조합(오름차순 수열)을 만드는 DFS 함수
 * @param {number} start - 이번 깊이에서 선택을 시작할 숫자
 *                         (앞에서 고른 숫자보다 1 큰 값부터 시작)
 * @param {number} depth - 현재까지 선택한 숫자의 개수
 */
function dfs(start, depth) {
  // M개를 다 골랐다면 결과에 추가
  if (depth === M) {
    result.push(selected.join(" "));
    return;
  }

  // start부터 N까지 숫자 중에서 선택
  for (let num = start; num <= N; num++) {
    // 숫자 선택
    selected.push(num);

    // 다음 깊이에서는 num+1부터 시작해야 오름차순이 유지된다.
    dfs(num + 1, depth + 1);

    // 백트래킹: 방금 넣은 숫자 제거
    selected.pop();
  }
}

// 1부터 시작, 아직 아무 것도 안 골랐으니 depth = 0
dfs(1, 0);

// 결과 출력
console.log(result.join("\n"));