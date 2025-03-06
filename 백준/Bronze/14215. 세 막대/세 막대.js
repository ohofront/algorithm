const fs = require("fs");

// 입력값 받아오기 (백준에서는 /dev/stdin 사용)
const input = fs.readFileSync("/dev/stdin").toString().trim().split(" ").map(Number);

// 세 변을 정렬하여 가장 긴 변을 마지막에 위치
input.sort((a, b) => a - b);

const [a, b, c] = input; // 정렬된 상태에서 가장 긴 변은 c

// 삼각형을 만들 수 없는 경우: 가장 긴 변이 나머지 두 변의 합보다 크거나 같음
if (c >= a + b) {
    // 삼각형을 만들 수 있도록 c를 조정 (c를 a + b - 1 로 설정)
    console.log(a + b + (a + b - 1));
} else {
    // 삼각형을 만들 수 있는 경우: 세 변의 합이 최대 둘레
    console.log(a + b + c);
}
