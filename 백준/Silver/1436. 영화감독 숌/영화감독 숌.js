const fs = require('fs');
const input = Number(fs.readFileSync('/dev/stdin').toString().trim());

let count = 0; // 666이 포함된 숫자 개수
let number = 666; // 첫 번째 종말의 숫자

// N번째 종말의 숫자를 찾을 때까지 반복
while (count < input) {
    if (String(number).includes('666')) { // 숫자에 '666'이 포함되어 있는지 확인
        count++; // 조건을 만족하면 카운트 증가
    }
    if (count < input) number++; // 원하는 개수에 도달할 때까지 숫자 증가
}

console.log(number); // N번째 종말의 숫자 출력