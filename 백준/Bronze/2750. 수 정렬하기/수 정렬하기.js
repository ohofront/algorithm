const fs = require('fs'); // 파일 시스템 모듈을 불러옴
const numbers = fs.readFileSync('/dev/stdin') // 표준 입력에서 데이터를 읽음
    .toString() // 버퍼를 문자열로 변환
    .trim() // 앞뒤 공백 제거
    .split('\n'); // 개행 문자를 기준으로 배열로 변환

const N = numbers.shift(); // 배열의 첫 번째 요소(N)를 제거하고 저장 (사용하지 않음)

/* 정렬 및 출력 */
numbers.sort((a, b) => a - b) // 숫자 오름차순 정렬
    .forEach(num => console.log(num)); // 정렬된 숫자를 한 줄씩 출력