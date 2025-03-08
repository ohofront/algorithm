const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();

const N = Number(input); // 입력값을 숫자로 변환

let result = 0; // 생성자가 없는 경우 0을 출력하기 위한 변수

// 1부터 N까지 모든 숫자 검사 (완전 탐색)
for (let i = 1; i < N; i++) {
    let sum = i; // i 자체를 더함
    let num = i;
    
    // 각 자리 숫자를 분해하여 합산
    while (num > 0) {
        sum += num % 10; // 마지막 자리 숫자 더하기
        num = Math.floor(num / 10); // 마지막 자리 제거
    }
    
    // 분해합이 N과 같다면, i가 생성자
    if (sum === N) {
        result = i;
        break; // 가장 작은 생성자를 찾으면 종료
    }
}

console.log(result); // 결과 출력