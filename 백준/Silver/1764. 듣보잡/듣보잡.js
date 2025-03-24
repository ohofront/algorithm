// readline 모듈로 입력 받기
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 듣도 못한 사람 수 N과 보도 못한 사람 수 M이 공백
const [N, M] = input[0].split(' ').map(Number);

// 듣도 못한 사람 리스트 (1 ~ N번째 줄)
const unheard = new Set(input.slice(1, 1 + N));

// 보도 못한 사람 리스트 (N+1 ~ N+M번째 줄)
const unseen = input.slice(1 + N);

// 결과 저장 배열
const result = [];

// 보도 못한 사람 중에서 듣도 못한 사람 집합에 포함되는 경우를 찾기
for (let name of unseen) {
  if (unheard.has(name)) {
    result.push(name); // 겹치는 이름 저장
  }
}

// 사전 순 정렬
result.sort();

// 겹치는 사람 수, 그리고 이름 리스트
console.log(result.length);
console.log(result.join('\n'));