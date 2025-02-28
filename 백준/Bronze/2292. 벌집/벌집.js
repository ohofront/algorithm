const readline = require("readline");

// 입력을 받기 위한 인터페이스 생성
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const N = parseInt(line); // 입력 받은 방 번호 (N)

  if (N === 1) {
    console.log(1); // 1번 방은 이동할 필요 없음
    process.exit();
  }

  let layer = 1; // 현재 층 (거리)
  let maxNumber = 1; // 현재 층의 최대 방 번호

  // 각 층의 최대 방 번호를 초과할 때까지 증가
  while (N > maxNumber) {
    maxNumber += 6 * layer; // 다음 층의 마지막 방 번호 계산
    layer++; // 층 증가
  }

  console.log(layer); // 최단 경로 출력
  process.exit();
});
