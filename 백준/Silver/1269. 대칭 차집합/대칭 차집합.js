// 백준 온라인 저지에서 입력을 받기 위한 코드
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫 줄: A와 B의 원소 개수 (n, m)
const [n, m] = input[0].split(' ').map(Number);

// 둘째 줄: 집합 A의 원소들
const A = new Set(input[1].split(' ').map(Number));

// 셋째 줄: 집합 B의 원소들
const B = new Set(input[2].split(' ').map(Number));

// 대칭 차집합 구하기
// A에서 B에 없는 값들 + B에서 A에 없는 값들
let count = 0;

for (let value of A) {
  if (!B.has(value)) {
    count++; // A에는 있지만 B에는 없는 원소
  }
}

for (let value of B) {
  if (!A.has(value)) {
    count++; // B에는 있지만 A에는 없는 원소
  }
}

// 결과 출력
console.log(count);