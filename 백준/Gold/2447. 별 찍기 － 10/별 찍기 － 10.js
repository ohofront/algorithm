const fs = require("fs");

// 입력: 한 줄에 정수 N
const input = fs.readFileSync(0, "utf8").trim();
const N = Number(input);

// N x N 크기의 2차원 배열을 공백(' ')으로 초기화
// 나중에 '*'를 채우고 한 번에 문자열로 출력한다.
const board = Array.from({ length: N }, () => Array(N).fill(" "));

/**
 * 재귀적으로 별 패턴을 그리는 함수
 * @param {number} x    - 시작 행 인덱스
 * @param {number} y    - 시작 열 인덱스
 * @param {number} size - 현재 그릴 정사각형의 한 변 길이
 */
function drawStar(x, y, size) {
  // 가장 작은 단위(1x1)가 되면 별 하나 찍고 종료
  if (size === 1) {
    board[x][y] = "*";
    return;
  }

  // 현재 정사각형을 3등분한 크기
  const div = size / 3;

  // 3x3 격자 형태로 순회하면서 재귀 호출
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // 가운데 칸(1,1)은 공백으로 남겨둔다.
      if (i === 1 && j === 1) continue;

      // 나머지 8칸은 다시 같은 규칙으로 별을 그린다.
      drawStar(x + i * div, y + j * div, div);
    }
  }
}

// (0,0)부터 N x N 영역에 대해 패턴 그리기 시작
drawStar(0, 0, N);

// 2차원 배열을 한 줄씩 문자열로 합쳐서 출력
const result = board.map((row) => row.join("")).join("\n");
console.log(result);