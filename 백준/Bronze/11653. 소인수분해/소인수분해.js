const readline = require("readline"); // readline 모듈을 불러와서 입력을 처리

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 소인수분해 함수
function primeFactorization(n) {
    let factor = 2; // 첫 번째 소수부터 시작
    while (n > 1) { // n이 1보다 클 때까지 반복
        while (n % factor === 0) { // factor가 n의 약수라면 출력 후 n을 나눔
            console.log(factor);
            n /= factor;
        }
        factor++; // 다음 소수 후보로 증가
    }
}

rl.on("line", (input) => {
    let num = parseInt(input.trim()); // 입력값을 정수로 변환
    if (num > 1) primeFactorization(num); // 1보다 크면 소인수분해 실행
    rl.close(); // 입력 종료
});
