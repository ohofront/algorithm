const fs = require("fs");

// 입력값 받아오기 (백준에서는 /dev/stdin 사용)
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// 첫 번째 줄: 점의 개수 N
const N = parseInt(input[0], 10);

// x, y 좌표를 저장할 배열
let xArr = [];
let yArr = [];

// 입력값을 순회하며 x, y 좌표를 배열에 저장
for (let i = 1; i <= N; i++) {
    const [x, y] = input[i].split(" ").map(Number);
    xArr.push(x);
    yArr.push(y);
}

// 최소 x, 최대 x, 최소 y, 최대 y 찾기
const minX = Math.min(...xArr);
const maxX = Math.max(...xArr);
const minY = Math.min(...yArr);
const maxY = Math.max(...yArr);

// 직사각형의 넓이 계산 (가로 * 세로)
const area = (maxX - minX) * (maxY - minY);

// 결과 출력
console.log(area);