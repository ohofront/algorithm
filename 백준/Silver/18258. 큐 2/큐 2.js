const fs = require("fs");

// 입력 읽기 (빈 입력 방지용 가드 포함)
const raw = fs.readFileSync(0, "utf8").trim();
if (raw.length === 0) {
  // 혹시 모를 빈 입력 가드
  process.stdout.write("");
  process.exit(0);
}

const lines = raw.split("\n");
const n = Number(lines[0]) || 0;

// 큐: 배열 + head 인덱스
const q = [];
let head = 0;

// 출력 버퍼
const out = [];

// 유틸 함수
const size = () => q.length - head;

for (let i = 1; i <= n; i++) {
  const cmd = lines[i];

  if (cmd[0] === "p") {
    // push or pop
    if (cmd[1] === "u") {
      // "push x"
      // 공백 기준 분리 대신 slice로 살짝 더 빠르고 안전하게
      const x = Number(cmd.slice(5));
      q.push(x);
    } else {
      // "pop"
      if (size() === 0) out.push(-1);
      else out.push(q[head++]);
    }
  } else if (cmd[0] === "s") {
    // "size"
    out.push(size());
  } else if (cmd[0] === "e") {
    // "empty"
    out.push(size() === 0 ? 1 : 0);
  } else if (cmd[0] === "f") {
    // "front"
    out.push(size() === 0 ? -1 : q[head]);
  } else if (cmd[0] === "b") {
    // "back"
    out.push(size() === 0 ? -1 : q[q.length - 1]);
  }

  // (선택) 메모리 관리: head가 과하게 커지면 앞부분 잘라 정리
  if (head > 10000 && head * 2 > q.length) {
    q.splice(0, head);
    head = 0;
  }
}

process.stdout.write(out.join("\n"));