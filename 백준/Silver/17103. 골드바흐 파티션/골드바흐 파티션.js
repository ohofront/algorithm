const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// 테스트케이스 수
const T = Number(input[0]);

// 최대값 설정 (문제에서 1,000,000 이하라고 했음)
const MAX = 1000000;

// 에라토스테네스의 체를 이용해 소수 판별 배열 만들기
const isPrime = Array(MAX + 1).fill(true);
isPrime[0] = isPrime[1] = false;

for (let i = 2; i * i <= MAX; i++) {
  if (isPrime[i]) {
    for (let j = i * i; j <= MAX; j += i) {
      isPrime[j] = false;
    }
  }
}

// 각 테스트케이스에 대해 골드바흐 파티션 개수 구하기
for (let t = 1; t <= T; t++) {
  const n = Number(input[t]);
  let count = 0;

  // 중복 방지를 위해 i는 n / 2까지만 탐색
  for (let i = 2; i <= n / 2; i++) {
    if (isPrime[i] && isPrime[n - i]) {
      count++;
    }
  }

  console.log(count);
}
