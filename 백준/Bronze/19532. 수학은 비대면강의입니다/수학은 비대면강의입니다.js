
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(Number);

const [a, b, c, d, e, f] = input; // 입력값을 숫자로 변환하여 저장

let x, y;

// x, y를 찾기 위해 이중 반복문 사용 (가능한 모든 정수 조합 탐색)
for (let i = -999; i <= 999; i++) {
    for (let j = -999; j <= 999; j++) {
        // 주어진 두 개의 방정식을 만족하는지 확인
        if (a * i + b * j === c && d * i + e * j === f) {
            x = i;
            y = j;
            break;
        }
    }
    if (x !== undefined) break; // 해를 찾으면 반복문 종료
}

console.log(x, y); // 결과 출력