// ─────────────────────────────────────────────
// 1. 입력 처리
// ─────────────────────────────────────────────
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim();

// 입력이 아예 없을 수도 있으므로 체크
if (input.length === 0) {
  // 아무것도 출력하지 않고 종료
  process.exit(0);
}

// 공백/줄바꿈 기준으로 숫자 N들을 모두 읽는다.
const nums = input.split(/\s+/).map(Number);

// ─────────────────────────────────────────────
// 2. 칸토어 문자열 생성 함수
// ─────────────────────────────────────────────

/**
 * 길이 3^n의 칸토어 문자열을 생성하는 함수
 * @param {number} n
 * @returns {string}
 */
function makeCantor(n) {
  // 전체 길이: 3^n
  const length = Math.pow(3, n);

  // 처음에는 모두 '-' 로 채운다.
  const arr = new Array(length).fill("-");

  /**
   * 칸토어 집합 재귀 함수
   * @param {number} start  - 현재 구간의 시작 인덱스
   * @param {number} len    - 현재 구간의 길이
   */
  function cantor(start, len) {
    // 더 이상 나눌 수 없는 길이면 종료
    if (len < 3) return;

    const third = len / 3;

    // 1) 가운데 1/3 구간을 공백으로 채운다.
    const midStart = start + third;
    const midEnd = start + 2 * third; // 미포함 인덱스
    for (let i = midStart; i < midEnd; i++) {
      arr[i] = " ";
    }

    // 2) 왼쪽 1/3 구간에 대해 재귀 호출
    cantor(start, third);

    // 3) 오른쪽 1/3 구간에 대해 재귀 호출
    cantor(start + 2 * third, third);
  }

  // 0 ~ length-1 구간에 대해 칸토어 집합 생성
  cantor(0, length);

  // 배열을 문자열로 합쳐서 반환
  return arr.join("");
}

// ─────────────────────────────────────────────
// 3. 각 입력 N에 대해 결과 생성 후 출력
// ─────────────────────────────────────────────
let output = [];
for (const n of nums) {
  output.push(makeCantor(n));
}

// 줄바꿈으로 이어서 한 번에 출력
console.log(output.join("\n"));