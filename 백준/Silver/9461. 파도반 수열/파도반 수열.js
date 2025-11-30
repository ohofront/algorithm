const fs = require("fs");

// 입력 전체 읽기
// 첫 줄: T (테스트 케이스 수)
// 이후 T줄: 각 줄마다 N
const input = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);

const T = input[0];          // 테스트 케이스 개수
const ns = input.slice(1);   // 각 테스트 케이스의 N 값들

// N이 하나도 없다면 바로 종료 (이론적으로는 없겠지만 방어 코드)
if (T === 0) {
  process.exit(0);
}

// DP를 계산할 최대 N 찾기
const maxN = Math.max(...ns);

// 파도반 수열 DP 배열 생성 (1-based 인덱스를 사용하기 위해 maxN + 1 크기로)
const P = new Array(maxN + 1).fill(0);

// 기저값 설정 (문제에서 주어진 값 그대로)
P[1] = 1;
if (maxN >= 2) P[2] = 1;
if (maxN >= 3) P[3] = 1;
if (maxN >= 4) P[4] = 2;
if (maxN >= 5) P[5] = 2;

// 점화식에 따라 6부터 maxN까지 채우기
for (let i = 6; i <= maxN; i++) {
  P[i] = P[i - 1] + P[i - 5];
}

// 각 테스트 케이스에 대한 결과를 모아서 한 번에 출력
let result = "";
for (let i = 0; i < T; i++) {
  const n = ns[i];
  result += P[n] + "\n";
}

console.log(result.trim());