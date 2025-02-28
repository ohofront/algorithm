const readline = require("readline");

// 입력을 받기 위한 인터페이스 생성
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const N = parseInt(line); // 입력 받은 N 값 (이동 횟수)

  // 점의 개수는 (초기 점 개수) → (2^N + 1) x (2^N + 1)
  const points = (2 ** N + 1) ** 2;

  console.log(points); // 결과 출력
  process.exit(); // 프로그램 종료
});
