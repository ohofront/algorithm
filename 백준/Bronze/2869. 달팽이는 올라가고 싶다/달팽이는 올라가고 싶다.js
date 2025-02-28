const readline = require("readline");

// 입력을 받기 위한 인터페이스 생성
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const [A, B, V] = line.split(" ").map(Number); // 입력값 파싱 (A: 낮에 올라가는 거리, B: 밤에 미끄러지는 거리, V: 목표 높이)

  // 하루 동안 실제 올라가는 거리
  const dailyClimb = A - B;

  // 목표 높이에서 마지막 날 올라가는 높이(A)를 제외한 후, 하루 이동 거리(dailyClimb)로 나눔
  let days = Math.ceil((V - A) / dailyClimb) + 1;

  console.log(days); // 결과 출력
  process.exit();
});
