
const fs = require("fs");

// 입력: 한 줄에 N
const raw = fs.readFileSync(0, "utf8").trim();
const N = Number(raw);

// N = 1인 경우 바로 처리
if (N === 1) {
  console.log(1);
  process.exit(0);
}

// 큐 초기화: q = [1, 2, ..., N], head = 0 (front 가리킴)
const q = new Array(N);
for (let i = 0; i < N; i++) q[i] = i + 1;
let head = 0; // 큐의 front 인덱스

// 큐에 남은 원소 수 = q.length - head
const size = () => q.length - head;

// 카드가 1장 남을 때까지 반복
while (size() > 1) {
  // 1) 맨 위 카드 버리기
  head++;

  // 2) 다음 맨 위 카드를 맨 아래로 이동
  q.push(q[head]);
  head++;

  // (선택) 메모리 관리: head가 커지면 앞부분 잘라 정리
  //  - 많은 반복 후 사용하지 않는 앞부분 메모리를 회수
  if (head > 10000 && head * 2 > q.length) {
    q.splice(0, head);
    head = 0;
  }
}

// 마지막 남은 카드 출력
console.log(q[head]);