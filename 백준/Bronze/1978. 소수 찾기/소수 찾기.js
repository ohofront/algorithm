const readline = require("readline"); // readline 모듈을 불러와서 입력을 처리

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 소수 판별 함수
function isPrime(n) {
    if (n < 2) return false; // 1 이하의 숫자는 소수가 아님
    for (let i = 2; i * i <= n; i++) { // 2부터 sqrt(n)까지 확인
        if (n % i === 0) return false; // 나누어 떨어지면 소수가 아님
    }
    return true; // 나누어 떨어지지 않으면 소수
}

let count = 0; // 소수 개수를 저장하는 변수
let inputCount = 0; // 입력된 숫자의 개수를 저장하는 변수

rl.on("line", (input) => {
    if (inputCount === 0) {
        inputCount = parseInt(input.trim()); // 첫 번째 입력값은 숫자의 개수
    } else {
        const numbers = input.split(" ").map(Number); // 공백으로 구분하여 숫자 배열로 변환
        numbers.forEach(num => {
            if (isPrime(num)) count++; // 소수이면 count 증가
        });
        console.log(count); // 최종 소수 개수 출력
        rl.close(); // 입력 종료
    }
});
