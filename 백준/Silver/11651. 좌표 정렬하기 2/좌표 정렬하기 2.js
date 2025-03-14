const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 좌표의 개수 N
const N = parseInt(input[0]);

// 나머지 줄들은 x, y 좌표로 구성되어 있으므로 파싱
const coordinates = [];
for (let i = 1; i <= N; i++) {
  const [x, y] = input[i].split(' ').map(Number);
  coordinates.push([x, y]);
}

// 정렬: 1순위 - y 오름차순, 2순위 - x 오름차순
coordinates.sort((a, b) => {
  if (a[1] !== b[1]) {
    return a[1] - b[1]; // y가 다르면 y 기준으로 정렬
  } else {
    return a[0] - b[0]; // y가 같으면 x 기준으로 정렬
  }
});

// 정렬된 좌표를 출력
let result = '';
for (let i = 0; i < N; i++) {
  result += `${coordinates[i][0]} ${coordinates[i][1]}\n`;
}

// 결과 출력
console.log(result);