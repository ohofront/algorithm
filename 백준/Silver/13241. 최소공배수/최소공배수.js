// 입력을 받기 위한 readline 처리
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split(' ');

const A = BigInt(input[0]); // A는 매우 큰 수이므로 BigInt로 변환
const B = BigInt(input[1]);

// 최대공약수(GCD)를 구하는 함수 - 유클리드 호제법 사용
function gcd(a, b) {
  while (b !== 0n) {  // BigInt에서는 0 대신 0n 사용
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// 최소공배수(LCM)는 (A * B) / GCD(A, B)
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

// 결과 출력
console.log(lcm(A, B).toString()); // BigInt는 문자열로 변환하여 출력해야 함