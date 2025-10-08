const fs = require('fs');

// 입력 파싱: 공백 기준으로 안전하게 분리
const tokens = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
const N = tokens[0];
const arr = tokens.slice(1); // 학생들이 서 있는 초기 순서 (길이 N)

let next = 1;        // 다음에 간식 받을 번호 (1부터 시작)
const stack = [];    // 보조 줄(스택)

// 초기 줄에서 한 명씩 처리
for (let i = 0; i < N; i++) {
  const cur = arr[i];

  // 먼저, 보조 줄 맨 위가 지금 줄 번호(next)라면 가능한 만큼 빼준다
  while (stack.length > 0 && stack[stack.length - 1] === next) {
    stack.pop();
    next++;
  }

  if (cur === next) {
    // 현재 학생이 바로 다음 번호면 간식 주고 next 증가
    next++;
  } else {
    // 아니면 보조 줄(스택)에 세워 둔다
    stack.push(cur);
  }
}

// 남은 보조 줄도 가능한 만큼 비우기
while (stack.length > 0 && stack[stack.length - 1] === next) {
  stack.pop();
  next++;
}

// 결과 판단
console.log(next === N + 1 ? 'Nice' : 'Sad');