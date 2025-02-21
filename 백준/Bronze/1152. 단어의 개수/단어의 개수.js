let fs = require('fs'); // 파일 시스템 모듈을 불러옴
let input = fs.readFileSync('/dev/stdin').toString(); // 표준 입력에서 문자열을 읽어옴

// 입력된 문자열을 앞뒤 공백 제거 후 공백(' ')을 기준으로 나누어 배열 생성
let wordsArr = input.trim().split(' '); 

let countOfWords = 0; // 단어 개수를 저장할 변수 초기화

// 배열을 순회하면서 빈 문자열이 아닌 경우만 단어 개수를 증가
for (let i = 0; i < wordsArr.length; i++) {
  if (wordsArr[i] !== '') { // 빈 문자열이 아닌 경우만 카운트
    countOfWords++;
  }
}

console.log(countOfWords); // 최종 단어 개수 출력
