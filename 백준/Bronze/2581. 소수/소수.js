const readline = require("readline"); // readline 모듈을 불러와서 입력을 처리

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputs = []; // 입력된 숫자들을 저장할 배열

// 소수 판별 함수
function isPrime(n) {
    if (n < 2) return false; // 1 이하의 숫자는 소수가 아님
    for (let i = 2; i * i <= n; i++) { // 2부터 sqrt(n)까지 확인
        if (n % i === 0) return false; // 나누어 떨어지면 소수가 아님
    }
    return true; // 나누어 떨어지지 않으면 소수
}

rl.on("line", (input) => {
    inputs.push(parseInt(input.trim())); // 입력을 배열에 저장
    if (inputs.length === 2) { // 두 개의 입력을 모두 받으면 실행
        let M = inputs[0]; // 시작 범위
        let N = inputs[1]; // 끝 범위
        let primes = []; // 소수를 저장할 배열

        for (let i = M; i <= N; i++) { // M부터 N까지 반복
            if (isPrime(i)) primes.push(i); // 소수이면 배열에 추가
        }

        if (primes.length > 0) {
            let sum = primes.reduce((acc, cur) => acc + cur, 0); // 소수들의 합 계산
            let min = Math.min(...primes); // 소수 중 최솟값 찾기
            console.log(sum); // 소수의 합 출력
            console.log(min); // 소수 중 최솟값 출력
        } else {
            console.log(-1); // 소수가 없는 경우 -1 출력
        }
        rl.close(); // 입력 종료
    }
});
