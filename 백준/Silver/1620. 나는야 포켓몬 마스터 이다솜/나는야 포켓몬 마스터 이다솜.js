const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫 줄에는 N(포켓몬 개수), M(문제 개수)가 주어짐
const [N, M] = input[0].split(' ').map(Number);

// 포켓몬 번호로 이름을 찾기 위한 배열
const nameList = [];

// 포켓몬 이름으로 번호를 찾기 위한 Map 객체 (빠른 검색용)
const nameMap = new Map();

// 1~N까지 포켓몬 이름 저장
for (let i = 1; i <= N; i++) {
  const name = input[i];
  nameList[i] = name; // 인덱스를 1부터 사용 (번호가 1번부터 시작하므로)
  nameMap.set(name, i); // 이름을 키로, 번호를 값으로 저장
}

// 결과를 저장할 배열
const result = [];

// M개의 문제 처리
for (let i = N + 1; i <= N + M; i++) {
  const query = input[i];

  // 숫자인 경우 (번호 → 이름)
  if (!isNaN(query)) {
    const idx = Number(query);
    result.push(nameList[idx]);
  } else {
    // 문자 (이름 → 번호)
    result.push(nameMap.get(query));
  }
}

// 결과 출력
console.log(result.join('\n'));