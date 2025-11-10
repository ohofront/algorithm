const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");

const T = Number(input[0]);              // 테스트 케이스 수
const lines = input.slice(1);            // 각 문자열

// 문자열 s에 대해 [isPal, callCount]를 반환
function isPalindromeWithCount(s) {
  let cnt = 0; // 재귀 호출 횟수 (케이스별로 초기화)

  function recursion(l, r) {
    cnt++; // 함수가 호출될 때마다 카운트 증가
    if (l >= r) return 1;                // 중앙에 도달(또는 교차) → 팰린드롬
    if (s[l] !== s[r]) return 0;         // 양 끝 문자가 다르면 실패
    return recursion(l + 1, r - 1);      // 다음 쌍 검사
  }

  const result = recursion(0, s.length - 1);
  return [result, cnt];
}

const out = [];
for (let i = 0; i < T; i++) {
  const s = lines[i]?.trim() ?? "";
  const [res, cnt] = isPalindromeWithCount(s);
  out.push(`${res} ${cnt}`);
}

console.log(out.join("\n"));
