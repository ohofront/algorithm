const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();

// 문자열 → 배열로 변환 → 숫자 내림차순 정렬 → 다시 문자열로 합쳐 출력
const result = input
  .split('')               // 문자열을 한 글자씩 배열로 분리
  .map(Number)             // 각 문자를 숫자로 변환
  .sort((a, b) => b - a)   // 내림차순 정렬
  .join('');               // 다시 문자열로 합치기

console.log(result);