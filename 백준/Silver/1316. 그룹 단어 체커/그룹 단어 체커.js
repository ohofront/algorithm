const fs = require('fs'); // 파일 시스템 모듈을 불러옴
const file = process.platform === 'linux' ? '/dev/stdin' : './input.txt'; // 플랫폼에 따라 입력 파일 경로 설정
const input = fs.readFileSync(file).toString().trim().split('\n'); // 입력 파일을 읽고 줄 단위로 나눔
const arr = []; // 입력값을 저장할 배열

// 첫 번째 줄은 개수 정보이므로 제외하고 나머지 줄을 배열에 저장
for (let i = 1; i < input.length; i++) {
  arr.push(input[i]);
}

let answer = arr.length; // 그룹 단어의 개수를 초기화
let temp = ''; // 문자 순서를 추적할 임시 문자열

// 배열을 순회하며 그룹 단어 여부를 검사
arr.forEach((item) => {
  temp = item[0]; // 첫 번째 문자를 temp에 저장
  for (let i = 1; i < item.length; i++) {
    // 이전에 등장한 문자가 다시 나왔지만, 연속된 문자가 아닌 경우 그룹 단어가 아님
    if (temp.includes(item[i]) && item[i - 1] !== item[i]) {
      answer--; // 그룹 단어 개수 감소
      break; // 반복문 종료
    }
    temp += item[i]; // 현재 문자를 temp에 추가
  }
});

console.log(answer); // 최종 그룹 단어 개수를 출력