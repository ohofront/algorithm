const fs = require("fs");

// 입력값 받아오기 (백준에서는 /dev/stdin 사용)
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// 입력값을 정수 배열로 변환
const angles = input.map(Number);

// 세 각의 합 계산
const sum = angles.reduce((acc, cur) => acc + cur, 0);

// 삼각형 판별
if (sum !== 180) {
    console.log("Error"); // 각의 합이 180이 아니면 삼각형이 아님
} else if (angles[0] === 60 && angles[1] === 60 && angles[2] === 60) {
    console.log("Equilateral"); // 세 각이 모두 60도이면 정삼각형
} else if (angles[0] === angles[1] || angles[1] === angles[2] || angles[0] === angles[2]) {
    console.log("Isosceles"); // 두 각이 같으면 이등변삼각형
} else {
    console.log("Scalene"); // 세 각이 모두 다르면 부등변삼각형
}