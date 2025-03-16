// 백준 온라인 저지용 입력 처리 방식
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 단어 개수
const N = Number(input[0]);

// 1번째 줄부터 N개의 단어를 배열로 저장
let words = input.slice(1);

// 중복 제거: Set을 이용
let uniqueWords = [...new Set(words)];

// 정렬: 길이 → 사전 순
uniqueWords.sort((a, b) => {
  // 1. 길이 비교
  if (a.length !== b.length) {
    return a.length - b.length;
  }
  // 2. 길이가 같으면 사전순 정렬 (localeCompare 사용 가능)
  return a.localeCompare(b);
});

// 결과 출력
console.log(uniqueWords.join('\n'));
