// 파일 시스템 모듈(fs)을 불러옴
const fs = require('fs');

// 표준 입력을 읽어 문자열로 변환
const input = fs.readFileSync("/dev/stdin").toString();

// 출력
console.log(input);