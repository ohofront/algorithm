const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// 회원 수 N
const N = Number(input[0]);

// N명의 회원 정보 저장 (이름과 나이)
const members = [];
// index는 안정 정렬을 위한 입력 순서
for (let i = 1; i <= N; i++) {
  const [age, name] = input[i].split(" ");
  members.push({ age: Number(age), name, index: i }); 
}

 // 나이 기준 오름차순
members.sort((a, b) => {
  return a.age - b.age; 
});

// 결과 출력
const result = members.map(member => `${member.age} ${member.name}`);
console.log(result.join("\n"));