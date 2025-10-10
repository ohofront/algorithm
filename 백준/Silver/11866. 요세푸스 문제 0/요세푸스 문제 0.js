const fs = require("fs");

// 입력: "N K"
const raw = fs.readFileSync(0, "utf8").trim();
const [N, K] = raw.split(/\s+/).map(Number);

// 큐 초기화: q = [1..N], head = 0(front)
const q = new Array(N);
for (let i = 0; i < N; i++) q[i] = i + 1;
let head = 0;

// 유틸: 현재 큐 크기
const size = () => q.length - head;

const ans = [];

// 큐에 원소가 남아있는 동안
while (size() > 0) {
  // 1) K-1 번 회전: 맨 앞 원소를 뒤로 보냄
  //    (원형 이동 효과)
  for (let i = 0; i < K - 1; i++) {
    // front -> back
    q.push(q[head++]);
  }

  // 2) K번째 원소 제거: 현재 front를 정답에 추가
  ans.push(q[head++]);

  // (선택) 메모리 관리: head가 커졌을 때 앞부분 잘라 정리
  if (head > 10000 && head * 2 > q.length) {
    q.splice(0, head);
    head = 0;
  }
}

// 요구 형식대로 출력: <a, b, c, ...>
console.log(`<${ans.join(", ")}>`);