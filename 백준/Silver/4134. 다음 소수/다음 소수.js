const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 테스트 케이스 개수
const T = parseInt(input[0]);

// 소수 판별 함수
function isPrime(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  // 3부터 sqrt(n)까지 홀수만 검사
  const sqrt = Math.floor(Math.sqrt(n));
  for (let i = 3; i <= sqrt; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

// 각 테스트 케이스 처리
for (let i = 1; i <= T; i++) {
  let num = BigInt(input[i]);

  // num부터 시작해서 소수 찾기
  while (true) {
    if (isPrime(Number(num))) {
      console.log(num.toString());
      break;
    }
    num++;
  }
}