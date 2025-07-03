// fs 모듈을 사용해 입력을 처리합니다 (백준에서는 /dev/stdin 사용)
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();

// 입력값 n (창문의 개수)
const n = Number(input);

// 열려 있는 창문은 제곱수에 해당하는 창문뿐이므로
// 1부터 n까지 중 제곱수가 몇 개인지만 세면 됩니다.
// √n의 정수 부분이 곧 제곱수의 개수입니다.

const openWindows = Math.floor(Math.sqrt(n));

// 결과 출력
console.log(openWindows);