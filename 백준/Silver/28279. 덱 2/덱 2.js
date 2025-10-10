const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const n = Number(input[0]);

// 덱 저장소와 포인터
const dq = {};    // 인덱스: 정수, 값: 정수
let head = 0;     // 현재 덱의 "앞" 인덱스
let tail = 0;     // 현재 덱의 "뒤" 다음 인덱스 (비어있으면 head===tail)

// 유틸
const size = () => tail - head;

const out = [];
for (let i = 1; i <= n; i++) {
  const line = input[i];
  const sp = line.split(" ");
  const cmd = Number(sp[0]);

  if (cmd === 1) {
    // 1 X: 정수 X를 덱의 앞에 넣는다.
    const x = Number(sp[1]);
    dq[--head] = x;
  } else if (cmd === 2) {
    // 2 X: 정수 X를 덱의 뒤에 넣는다.
    const x = Number(sp[1]);
    dq[tail++] = x;
  } else if (cmd === 3) {
    // 3: 맨 앞의 정수를 빼고 출력, 없으면 -1
    if (size() === 0) out.push(-1);
    else {
      const v = dq[head];
      delete dq[head++];
      out.push(v);
    }
  } else if (cmd === 4) {
    // 4: 맨 뒤의 정수를 빼고 출력, 없으면 -1
    if (size() === 0) out.push(-1);
    else {
      const v = dq[--tail];
      delete dq[tail];
      out.push(v);
    }
  } else if (cmd === 5) {
    // 5: 덱에 들어있는 정수의 개수
    out.push(size());
  } else if (cmd === 6) {
    // 6: 덱이 비어있으면 1, 아니면 0
    out.push(size() === 0 ? 1 : 0);
  } else if (cmd === 7) {
    // 7: 맨 앞의 정수 출력, 없으면 -1
    out.push(size() === 0 ? -1 : dq[head]);
  } else if (cmd === 8) {
    // 8: 맨 뒤의 정수 출력, 없으면 -1
    out.push(size() === 0 ? -1 : dq[tail - 1]);
  }
}

console.log(out.join("\n"));