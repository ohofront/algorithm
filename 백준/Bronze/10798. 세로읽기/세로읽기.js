
const fs = require("fs");

// 입력을 받아와 줄바꿈 기준으로 나누어 배열로 변환
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// 5줄의 입력을 문자 단위로 쪼개 2차원 배열로 저장
const arr = input.map(line => line.split(""));

// 결과를 저장할 문자열 변수
let result = "";

// 최대 문자열 길이가 15이므로 0부터 14까지 반복
for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 5; j++) { // 입력은 항상 5줄이므로 5번 반복
        // 현재 행(j)에 i번째 문자가 존재하는지 확인 후 결과에 추가
        if (arr[j][i] !== undefined) {
            result += arr[j][i];
        }
    }
}

// 최종 결과 출력
console.log(result);