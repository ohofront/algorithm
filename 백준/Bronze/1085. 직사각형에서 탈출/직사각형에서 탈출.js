// fs 모듈을 사용하여 입력 값을 읽어옵니다.
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split(' ');

// 입력 값 파싱 (x, y, w, h)
const x = parseInt(input[0], 10);
const y = parseInt(input[1], 10);
const w = parseInt(input[2], 10);
const h = parseInt(input[3], 10);

// (x, y)에서 경계선까지의 최단 거리 계산
const minDistance = Math.min(x, y, w - x, h - y);

// 결과 출력
console.log(minDistance);
