// fs 모듈로 표준 입력을 읽어온다.
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split(" ").map(Number);

const N = input[0]; // 1부터 N까지의 자연수
const M = input[1]; // 길이가 M인 수열

// 현재까지 선택한 수열을 저장할 배열
const selected = new Array(M);
// 모든 수열 문자열을 모아둘 배열 (나중에 한 번에 출력)
const result = [];

/**
 * depth: 현재 수열에서 채워야 할 위치 (0 ~ M-1)
 *
 * 수를 중복해서 사용할 수 있으므로
 * 매 단계마다 1 ~ N 까지를 모두 선택해본다.
 */
function dfs(depth) {
  // 수열의 길이 M개를 모두 채운 경우
  if (depth === M) {
    // selected 배열을 ' '로 join 해서 문자열로 만든 후 결과에 저장
    result.push(selected.join(" "));
    return;
  }

  // 1부터 N까지의 수를 하나씩 선택
  for (let num = 1; num <= N; num++) {
    // 현재 depth 위치에 num을 선택
    selected[depth] = num;

    // 다음 위치(depth + 1)를 채우러 재귀 호출
    dfs(depth + 1);
  }
}

// 깊이 우선 탐색 시작 (0번째 위치부터 채우기)
dfs(0);

// 결과 배열을 개행 문자로 이어붙여 한 번에 출력
console.log(result.join("\n"));