const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();

const substrings = new Set(); // 중복 제거를 위한 Set 생성

// 문자열의 모든 부분 문자열 생성
for (let i = 0; i < input.length; i++) {
  for (let j = i + 1; j <= input.length; j++) {
    const substring = input.slice(i, j); // i부터 j-1까지 자른 부분 문자열
    substrings.add(substring); // Set에 추가 (자동 중복 제거됨)
  }
}

console.log(substrings.size); // 서로 다른 부분 문자열의 개수 출력