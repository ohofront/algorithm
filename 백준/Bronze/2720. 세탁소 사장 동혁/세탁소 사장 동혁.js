const readline = require("readline");

// 입력을 받기 위한 인터페이스 생성
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 동전 단위 (쿼터, 다임, 니켈, 페니)
const coins = [25, 10, 5, 1];

// 입력 데이터 저장 배열
const input = [];

rl.on("line", (line) => {
  input.push(line); // 입력 값을 배열에 저장
}).on("close", () => {
  const T = parseInt(input[0]); // 테스트 케이스 개수

  for (let i = 1; i <= T; i++) {
    let cents = parseInt(input[i]); // 거스름돈 (센트 단위)
    let result = [];

    // 동전 개수 계산
    for (let coin of coins) {
      result.push(Math.floor(cents / coin)); // 해당 동전으로 나눈 몫
      cents %= coin; // 남은 잔돈 계산
    }

    console.log(result.join(" ")); // 결과 출력
  }

  process.exit(); // 프로그램 종료
});
