// fs 모듈을 사용하여 입력값을 읽어옴 (백준에서는 '/dev/stdin' 사용)
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);

// 입력값은 여러 줄로 들어오며, 마지막 줄의 0은 처리하지 않음
input.pop(); // 마지막 0 제거

// 에라토스테네스의 체를 사용하기 위해 가장 큰 2n 값을 계산
const max = Math.max(...input) * 2;

// 소수를 판별할 배열 초기화 (true는 소수라고 가정)
const isPrime = new Array(max + 1).fill(true);
isPrime[0] = false;
isPrime[1] = false;

// 에라토스테네스의 체를 사용하여 소수를 판별
for (let i = 2; i * i <= max; i++) {
  if (isPrime[i]) {
    for (let j = i * i; j <= max; j += i) {
      isPrime[j] = false;
    }
  }
}

// 각 입력값에 대해 n < x ≤ 2n 범위 내의 소수 개수를 출력
input.forEach(n => {
  let count = 0;
  for (let i = n + 1; i <= 2 * n; i++) {
    if (isPrime[i]) count++;
  }
  console.log(count);
});
