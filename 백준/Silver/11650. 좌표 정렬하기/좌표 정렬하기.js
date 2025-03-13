// readline 모듈을 사용하여 입력값을 처리
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 점의 개수 N
const N = parseInt(input[0]);

// 좌표 데이터를 저장할 배열
const points = [];

// 두 번째 줄부터 N개의 좌표를 배열에 저장
for (let i = 1; i <= N; i++) {
  // 공백으로 x, y 분리
  const [x, y] = input[i].split(' ').map(Number);
  points.push([x, y]);
}

// 좌표 정렬
points.sort((a, b) => {
  // 첫 번째 기준: x 좌표 오름차순
  if (a[0] !== b[0]) {
    return a[0] - b[0];
  }
  // 두 번째 기준: y 좌표 오름차순
  return a[1] - b[1];
});

// 결과 출력
let result = '';
for (let i = 0; i < N; i++) {
  result += `${points[i][0]} ${points[i][1]}\n`;
}
console.log(result);