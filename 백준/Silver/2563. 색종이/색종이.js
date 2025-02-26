const fs = require("fs");

// 입력을 받아와 줄바꿈 기준으로 나누어 배열로 변환
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// 100x100 크기의 도화지를 2차원 배열로 생성하고 0으로 초기화
const paper = Array.from(Array(100), () => Array(100).fill(0));

// 색종이 개수 입력
const n = parseInt(input[0]);

// 색종이가 덮은 총 면적을 저장할 변수
let area = 0;

// 입력된 색종이 개수만큼 반복
for (let i = 1; i <= n; i++) {
    // 각 색종이의 왼쪽 아래 (x, y) 좌표를 숫자로 변환하여 저장
    const [x, y] = input[i].split(" ").map(Number);
    
    // 색종이의 크기는 10x10 이므로, (x, y)부터 (x+9, y+9)까지 탐색
    for (let row = x; row < x + 10; row++) {
        for (let col = y; col < y + 10; col++) {
            // 아직 덮이지 않은 영역이라면
            if (paper[row][col] === 0) {
                paper[row][col] = 1; // 해당 위치를 색종이가 덮었음을 표시
                area++; // 덮인 영역 증가
            }
        }
    }
}

// 최종적으로 색종이가 덮은 총 면적을 출력
console.log(area);