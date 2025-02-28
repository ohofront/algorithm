const readline = require("readline");

// 입력을 받기 위한 인터페이스 생성
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const X = parseInt(line); // 입력값 X (찾을 분수의 순서)

  let diagonal = 1; // 현재 대각선 라인 (1부터 시작)
  let maxNumber = 1; // 현재 라인의 마지막 번호

  // X가 현재 라인의 마지막 번호보다 크면 다음 라인으로 이동
  while (X > maxNumber) {
    diagonal++; // 다음 대각선 이동
    maxNumber += diagonal; // 해당 라인의 마지막 번호 업데이트
  }

  // 해당 라인의 시작 번호 계산
  const prevMaxNumber = maxNumber - diagonal + 1;

  // X가 현재 라인의 몇 번째인지 계산
  const indexInLine = X - prevMaxNumber;

  let numerator, denominator;

  // 짝수 라인: 분자가 증가, 분모가 감소 (↙ 방향)
  // 홀수 라인: 분자가 감소, 분모가 증가 (↗ 방향)
  if (diagonal % 2 === 0) {
    numerator = 1 + indexInLine;
    denominator = diagonal - indexInLine;
  } else {
    numerator = diagonal - indexInLine;
    denominator = 1 + indexInLine;
  }

  console.log(`${numerator}/${denominator}`); // 분수 출력
  process.exit();
});
