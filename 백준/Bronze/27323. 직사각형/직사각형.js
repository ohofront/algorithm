// fs 모듈을 사용하여 입력 값을 읽어옵니다.
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 입력 값은 두 줄에 걸쳐 각각 직사각형의 가로와 세로 길이를 나타냅니다.
const width = parseInt(input[0], 10);
const height = parseInt(input[1], 10);

// 직사각형의 넓이를 계산합니다.
const area = width * height;

// 결과를 출력합니다.
console.log(area);