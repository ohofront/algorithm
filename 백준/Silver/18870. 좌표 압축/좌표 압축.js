const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]); // 좌표 개수
const arr = input[1].split(" ").map(Number); // 원본 좌표 배열

// 중복 제거 + 정렬 -> 압축 기준 배열 생성
const sortedUnique = [...new Set(arr)].sort((a, b) => a - b);

// Map 자료구조로 각 숫자에 대한 압축 좌표값을 매핑
const coordMap = new Map();

// value: 원래 좌표 값, index: 압축된 좌표 값 (작은 순서대로 0부터 시작)
sortedUnique.forEach((value, index) => {
  coordMap.set(value, index);
});

// 원래 배열에서 각 좌표를 압축 좌표로 치환
const result = arr.map(value => coordMap.get(value));

// 결과 출력 (공백으로 join)
console.log(result.join(" "));
