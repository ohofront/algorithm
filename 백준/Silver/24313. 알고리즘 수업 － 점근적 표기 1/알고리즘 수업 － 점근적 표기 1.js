const fs = require('fs');

// 파일 입력 경로 설정 (백준 환경에서는 '/dev/stdin', 로컬에서는 'input.txt')
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';

// 입력 값 읽기 및 전처리
const [aList, c, n0] = fs.readFileSync(filePath).toString().trim().split('\n');
const [a1, a0] = aList
  .trim()
  .split(' ')
  .map((item) => +item); // 문자열을 숫자로 변환

// solution 함수 실행 및 결과 출력
console.log(solution(a1, a0, +c, +n0));

/**
 * 점근적 표기 조건을 만족하는지 확인하는 함수
 * @param {number} a1 - f(n)의 계수 (n의 계수)
 * @param {number} a0 - f(n)의 상수항
 * @param {number} c - 비교할 상수 값
 * @param {number} n0 - 최소 기준값
 * @returns {number} - 조건을 만족하면 1, 아니면 0 반환
 */
function solution(a1, a0, c, n0) {
  const fn = a1 * n0 + a0; // f(n0) 계산
  const gn = c * n0; // c * g(n0) 계산 (g(n) = n)

  // f(n) <= c * g(n) && a1 <= c를 만족하면 1, 아니면 0 반환
  return fn <= gn && a1 - c <= 0 ? 1 : 0;
}