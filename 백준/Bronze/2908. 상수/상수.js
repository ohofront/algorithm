// 파일 시스템 모듈(fs)을 불러옴
const fs = require('fs');

// 표준 입력을 읽어 문자열로 변환 후, 공백을 기준으로 나누어 배열로 저장
const input = fs.readFileSync('/dev/stdin').toString().split(' ');

// 숫자를 거꾸로 뒤집어 저장할 배열 선언
let sangsoo = [];

// 입력된 각 숫자를 뒤집어 배열에 추가
for(let i = 0; i < input.length; i++){
  // 문자열을 문자 배열로 변환 -> 배열을 뒤집음 -> 다시 문자열로 변환
  sangsoo.push(input[i].split('').reverse().join(''));
}

// 배열의 값 중 가장 큰 값을 출력 (숫자로 자동 변환됨)
console.log(Math.max(...sangsoo));
