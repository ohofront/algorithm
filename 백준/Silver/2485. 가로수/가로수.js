const fs = require('fs');
// 입력값을 받아와 줄 단위로 나누기
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫 줄: 나무의 개수 N
const N = parseInt(input[0]);

// 다음 줄들: 나무들이 심어진 위치
const trees = input.slice(1).map(Number);

// 간격 배열을 저장할 변수
const gaps = [];

// 각 인접한 나무 사이의 거리(간격)를 계산하여 gaps 배열에 저장
for (let i = 1; i < N; i++) {
  gaps.push(trees[i] - trees[i - 1]);
}

// 최대공약수를 구하는 함수 (유클리드 호제법)
function getGCD(a, b) {
  while (b !== 0) {
    let temp = a % b;
    a = b;
    b = temp;
  }
  return a;
}

// 모든 간격의 최대공약수를 계산
let gcd = gaps[0];
for (let i = 1; i < gaps.length; i++) {
  gcd = getGCD(gcd, gaps[i]);
}

// 최소 간격(gcd)을 기준으로 나무를 일정 간격으로 심기 위해
// 추가로 심어야 할 나무의 수를 계산
let needToPlant = 0;
for (let gap of gaps) {
  // 예: gap=6, gcd=2 → 6/2 - 1 = 2그루 심어야 함
  needToPlant += gap / gcd - 1;
}

// 결과 출력
console.log(needToPlant);