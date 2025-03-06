const fs = require("fs");

// 입력값 받아오기 (백준에서는 /dev/stdin 사용)
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// 입력값을 순회하며 처리
for (let i = 0; i < input.length; i++) {
    const sides = input[i].split(" ").map(Number);

    // 종료 조건: 세 값이 모두 0이면 종료
    if (sides[0] === 0 && sides[1] === 0 && sides[2] === 0) break;

    // 가장 긴 변을 찾기 위해 정렬
    sides.sort((a, b) => a - b);

    const [a, b, c] = sides; // 가장 긴 변이 c

    // 삼각형이 될 수 없는 조건: 가장 긴 변이 나머지 두 변의 합보다 크거나 같음
    if (c >= a + b) {
        console.log("Invalid");
    } else if (a === b && b === c) {
        console.log("Equilateral"); // 세 변이 모두 같음
    } else if (a === b || b === c || a === c) {
        console.log("Isosceles"); // 두 변이 같음
    } else {
        console.log("Scalene"); // 세 변이 모두 다름
    }
}
