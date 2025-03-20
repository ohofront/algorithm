
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫 줄에 n(집합 S에 포함된 문자열 개수)과 m(확인할 문자열 개수)
const [n, m] = input[0].split(' ').map(Number);

// 집합 S를 Set 자료구조로 저장 (중복 없이 빠르게 검색 가능)
const set = new Set();

// n개의 문자열을 집합 S에 추가
for (let i = 1; i <= n; i++) {
  set.add(input[i]);
}

// 집합 S에 포함된 문자열의 개수 카운팅
let count = 0;

// M개의 문자열을 하나씩 확인
for (let i = n + 1; i <= n + m; i++) {
  // 현재 문자열이 집합 S에 포함되어 있다면 카운트 증가
  if (set.has(input[i])) {
    count++;
  }
}

// 결과 출력
console.log(count);