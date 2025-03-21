const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 출입 기록 수
const n = Number(input[0]);

// 현재 회사에 있는 사람들을 저장할 Set
const company = new Set();

// 출입 기록 처리
for (let i = 1; i <= n; i++) {
  const [name, action] = input[i].split(' ');
  if (action === 'enter') {
    company.add(name);  // 출근한 사람은 추가
  } else {
    company.delete(name);  // 퇴근한 사람은 제거
  }
}

// 배열로 변환 후, sort()로 오름차순 정렬 → reverse()로 역순 정렬
const sorted = Array.from(company).sort().reverse();

// 출력
for (const name of sorted) {
  console.log(name);
}
