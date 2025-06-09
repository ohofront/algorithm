// 최대공약수(GCD) 함수 (유클리드 호제법)
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

// 최소공배수(LCM) 함수
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

// 입력 처리
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫 번째 분수 a/b
const [a, b] = input[0].split(' ').map(Number);
// 두 번째 분수 c/d
const [c, d] = input[1].split(' ').map(Number);

// 공통 분모 계산 (최소공배수)
const commonDenominator = lcm(b, d);

// 통분 후 분자 합산
const numerator = a * (commonDenominator / b) + c * (commonDenominator / d);

// 기약 분수로 만들기 위해 GCD 구함
const commonGcd = gcd(numerator, commonDenominator);

// 기약 분수 형태로 출력
console.log(`${numerator / commonGcd} ${commonDenominator / commonGcd}`);
