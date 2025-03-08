const fs = require('fs');
const input = Number(fs.readFileSync('/dev/stdin').toString().trim());

let N = input;
let count = 0;

// 5kg 봉지를 최대한 많이 사용하도록 설정
while (N >= 0) {
    if (N % 5 === 0) { // 5kg 봉지로 나누어 떨어지는 경우
        count += N / 5; // 5kg 봉지 개수 추가
        console.log(count); // 결과 출력
        return;
    }
    N -= 3; // 5kg로 나누어 떨어지지 않으면 3kg 봉지 사용
    count++; // 3kg 봉지 개수 추가
}

console.log(-1); // 정확하게 나눌 수 없는 경우
