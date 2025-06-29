// fs 모듈을 사용하여 입력값을 받아오기 (백준에서는 '/dev/stdin' 사용)
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split(" ");

// 입력값 M과 N을 숫자로 변환
const M = parseInt(input[0]);
const N = parseInt(input[1]);

// N까지의 수 중 소수를 판별하기 위한 배열 생성 (true: 소수, false: 소수 아님)
const isPrime = new Array(N + 1).fill(true);

// 0과 1은 소수가 아니므로 false로 설정
isPrime[0] = false;
isPrime[1] = false;

// 에라토스테네스의 체 알고리즘 적용
for (let i = 2; i * i <= N; i++) {
  if (isPrime[i]) {
    // i의 배수는 소수가 아니므로 false로 설정
    for (let j = i * i; j <= N; j += i) {
      isPrime[j] = false;
    }
  }
}

// M 이상 N 이하의 숫자 중 소수인 것만 출력
for (let i = M; i <= N; i++) {
  if (isPrime[i]) {
    console.log(i);
  }
}