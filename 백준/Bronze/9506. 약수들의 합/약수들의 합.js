const readline = require("readline"); // readline 모듈을 불러와서 입력을 처리

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 약수를 구하는 함수
function getDivisors(n) {
    let divisors = []; // 약수를 저장할 배열
    for (let i = 1; i < n; i++) { // 1부터 n-1까지 반복
        if (n % i === 0) { // i가 n의 약수인지 확인
            divisors.push(i); // 약수 배열에 추가
        }
    }
    return divisors; // 약수 배열 반환
}

// 입력을 처리하는 부분
rl.on("line", (input) => {
    let num = parseInt(input.trim()); // 입력값을 정수로 변환
    
    if (num === -1) { // 입력이 -1이면 종료
        rl.close();
        return;
    }
    
    let divisors = getDivisors(num); // 약수 구하기
    let sum = divisors.reduce((acc, cur) => acc + cur, 0); // 약수들의 합 계산
    
    if (sum === num) { // 완전수인지 확인
        console.log(`${num} = ${divisors.join(" + ")}`); // 형식에 맞게 출력
    } else {
        console.log(`${num} is NOT perfect.`); // 완전수가 아닌 경우 출력
    }
});
