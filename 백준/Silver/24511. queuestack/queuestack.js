const fs = require("fs");
const tok = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
let p = 0;

const N = tok[p++];                 // 구조물 개수
const type = new Array(N);
for (let i = 0; i < N; i++) type[i] = tok[p++];

const init = new Array(N);
for (let i = 0; i < N; i++) init[i] = tok[p++];

const M = tok[p++];
const inputs = tok.slice(p, p + M);

// ---- 덱 구현 (head/tail 포인터) ----
// JS 배열에 음수 인덱스를 써도 동작하지만, 성능/가독성을 위해
// head를 0에서 시작하고 push_front 시 head를 감소시키는 방식을 그대로 사용합니다.
const dq = [];   // 인덱스: 정수, 값: 정수
let head = 0;    // 현재 덱의 "앞" 인덱스
let tail = 0;    // 현재 덱의 "뒤 다음" 인덱스 (size = tail - head)

// 유틸
const size = () => tail - head;
const push_front = (v) => { dq[--head] = v; };
const push_back  = (v) => { dq[tail++] = v; };
const pop_front  = () => dq[head++]; // 사용 전 size>0 보장

// 1) 초기 상태 구성: 타입이 0(큐)인 값들만 덱에 넣되, "앞쪽"으로 쌓기
//    이유: 여러 구조를 통과한 최종 출력은 큐들의 front가 "뒤에서부터" 나오므로
//          입력 순서대로 push_front 해 두면, pop_front 순서가 정답과 일치.
for (let i = 0; i < N; i++) {
  if (type[i] === 0) push_front(init[i]);
}

// 2) M개의 입력 처리: 뒤에 넣고, 앞에서 하나 빼서 출력
const out = new Array(M);
for (let i = 0; i < M; i++) {
  push_back(inputs[i]);     // 새 값 뒤에 삽입
  out[i] = pop_front();     // 앞에서 하나 꺼내 출력
}

console.log(out.join(" "));