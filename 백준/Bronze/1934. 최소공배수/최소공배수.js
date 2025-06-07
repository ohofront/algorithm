// 입력값을 받아오기 (Node.js 표준 입력 처리)
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

// 테스트 케이스 수
const T = parseInt(input[0]);

// 최대공약수(GCD) 함수 - 유클리드 호제법
function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// 최소공배수(LCM) 함수
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

// 각 테스트 케이스마다 최소공배수 계산
for (let i = 1; i <= T; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  console.log(lcm(a, b));
}