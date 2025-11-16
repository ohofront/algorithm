// ─────────────────────────────────────────────
// 1. 입력 처리
// ─────────────────────────────────────────────
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
const N = input[0]; // 1부터 N까지의 자연수
const M = input[1]; // 뽑을 개수

// ─────────────────────────────────────────────
// 2. 백트래킹(DFS) 준비
// ─────────────────────────────────────────────

// 현재까지 선택한 숫자들을 담을 배열 (길이 최대 M)
const selected = [];

// 각 숫자(1~N)를 이미 사용했는지 체크하는 배열
// visited[i] === true 이면 숫자 i는 이미 사용 중
const visited = Array(N + 1).fill(false);

// 결과 문자열들을 모아놓을 배열 (나중에 한 번에 출력)
const result = [];

/**
 * 깊이 우선 탐색(DFS)과 백트래킹으로 수열을 생성하는 함수
 * @param {number} depth - 현재까지 선택한 숫자의 개수
 */
function dfs(depth) {
  // base case: M개를 모두 선택했다면 결과에 추가하고 종료
  if (depth === M) {
    // selected 배열을 공백으로 이어서 "1 3 2" 형태의 문자열로 변환
    result.push(selected.join(" "));
    return;
  }

  // 1부터 N까지 숫자 중에서 하나씩 선택
  for (let num = 1; num <= N; num++) {
    // 이미 사용한 숫자는 건너뛰기
    if (visited[num]) continue;

    // 숫자 num을 사용하겠다고 표시
    visited[num] = true;
    selected.push(num);

    // 다음 깊이로 이동 (현재까지 선택한 숫자 개수 + 1)
    dfs(depth + 1);

    // 돌아와서는 원상태로 복구 (백트래킹)
    selected.pop();
    visited[num] = false;
  }
}

// DFS 시작 (아직 아무것도 선택하지 않았으므로 depth=0)
dfs(0);

// 결과를 한 번에 출력
console.log(result.join("\n"));