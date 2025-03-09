const fs = require('fs');

// 입력을 파일에서 읽어옴 (백준에서는 '/dev/stdin' 사용)
const input = fs.readFileSync('/dev/stdin', 'utf8').trim().split('\n').map(Number);

// 1. 평균 구하기
const sum = input.reduce((acc, num) => acc + num, 0); // 모든 숫자 더하기
const average = sum / input.length; // 평균 구하기

// 2. 중앙값 구하기
const sortedArr = input.sort((a, b) => a - b); // 오름차순 정렬
const median = sortedArr[Math.floor(input.length / 2)]; // 중앙값 찾기

// 결과 출력
console.log(average); // 평균 출력
console.log(median);  // 중앙값 출력