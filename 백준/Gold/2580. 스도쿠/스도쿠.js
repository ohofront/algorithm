// ─────────────────────────────────────────────
// 1. 입력 처리
// ─────────────────────────────────────────────
const fs = require("fs");
const raw = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);

// 9x9 스도쿠 판 생성
const board = Array.from({ length: 9 }, () => Array(9).fill(0));

let idx = 0;
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    board[i][j] = raw[idx++];
  }
}

// ─────────────────────────────────────────────
// 2. 행/열/3x3 박스 사용 여부 체크 배열
// ─────────────────────────────────────────────
//
// rowUsed[r][num] = r번째 행에 숫자 num이 쓰였는지
// colUsed[c][num] = c번째 열에 숫자 num이 쓰였는지
// boxUsed[b][num] = b번째 3x3 박스에 숫자 num이 쓰였는지
//
// * 박스 인덱스 계산:
//   - r, c가 주어졌을 때,
//   - box = Math.floor(r / 3) * 3 + Math.floor(c / 3)
//   - 예: (0~2, 0~2) -> 0, (0~2, 3~5) -> 1, ...
//
const rowUsed = Array.from({ length: 9 }, () => Array(10).fill(false));
const colUsed = Array.from({ length: 9 }, () => Array(10).fill(false));
const boxUsed = Array.from({ length: 9 }, () => Array(10).fill(false));

// 아직 채워야 할 빈칸들의 좌표를 저장
const blanks = [];

// 초기 상태에서 사용 중인 숫자들 표시 + 빈칸 목록 만들기
for (let r = 0; r < 9; r++) {
  for (let c = 0; c < 9; c++) {
    const val = board[r][c];
    if (val === 0) {
      // 빈칸이면 좌표 저장
      blanks.push([r, c]);
    } else {
      // 이미 숫자가 있다면 사용 여부 체크
      const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
      rowUsed[r][val] = true;
      colUsed[c][val] = true;
      boxUsed[b][val] = true;
    }
  }
}

// 정답을 찾았는지 여부
let solved = false;
let output = "";

// ─────────────────────────────────────────────
// 3. 백트래킹(DFS) 함수 정의
// ─────────────────────────────────────────────
//
// dfs(pos)
//  - pos: blanks 배열에서 몇 번째 빈칸을 채우는 중인지 (0 ~ blanks.length)
//
// 알고리즘:
//  - pos가 빈칸 개수와 같아지면 모든 칸을 채운 것이므로 스도쿠 완성
//  - 현재 빈칸 (r, c)에 1~9 중 올 수 있는 숫자를 전부 시도
//  - 행/열/박스에서 사용 중인지 미리 체크해 가지치기
//
function dfs(pos) {
  // 이미 정답을 찾았으면 추가 탐색은 중단
  if (solved) return;

  // 모든 빈칸을 다 채운 경우
  if (pos === blanks.length) {
    solved = true;
    // board를 문자열로 만들어 저장
    const lines = board.map((row) => row.join(" "));
    output = lines.join("\n");
    return;
  }

  const [r, c] = blanks[pos];
  const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);

  // 1 ~ 9까지 숫자 시도
  for (let num = 1; num <= 9; num++) {
    // 현재 행/열/박스에 이 숫자가 이미 쓰였으면 불가능
    if (rowUsed[r][num] || colUsed[c][num] || boxUsed[b][num]) continue;

    // num을 (r, c)에 놓는다고 가정
    board[r][c] = num;
    rowUsed[r][num] = true;
    colUsed[c][num] = true;
    boxUsed[b][num] = true;

    // 다음 빈칸으로 진행
    dfs(pos + 1);

    // 정답을 찾았으면 더 이상 되돌릴 필요 없이 리턴
    if (solved) return;

    // 백트래킹: 원상복구
    board[r][c] = 0;
    rowUsed[r][num] = false;
    colUsed[c][num] = false;
    boxUsed[b][num] = false;
  }
}

// ─────────────────────────────────────────────
// 4. DFS 시작 및 결과 출력
// ─────────────────────────────────────────────
dfs(0);
console.log(output);