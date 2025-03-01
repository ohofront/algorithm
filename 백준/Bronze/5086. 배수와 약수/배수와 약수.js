const fs = require("fs");

// 입력을 받음 (백준에서는 '/dev/stdin' 사용)
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// 결과를 저장할 배열
const result = [];

for (let i = 0; i < input.length; i++) {
    // 입력을 숫자로 변환
    const [a, b] = input[i].split(" ").map(Number);

    // 종료 조건 (0 0이 입력되면 종료)
    if (a === 0 && b === 0) break;

    // a가 b의 약수인 경우 (b가 a의 배수)
    if (b % a === 0) {
        result.push("factor");
    }
    // a가 b의 배수인 경우 (a가 b의 약수)
    else if (a % b === 0) {
        result.push("multiple");
    }
    // 둘 다 아닌 경우
    else {
        result.push("neither");
    }
}

// 결과를 출력
console.log(result.join("\n"));
