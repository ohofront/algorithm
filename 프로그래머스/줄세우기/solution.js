// 입력값이 여러 개일 때(한 줄에 공백으로 구분)
const fs = require("fs");
const [n, input] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const inputArr = input.trim().split(" ");

const answer = [];
// 입력받을 번호 길이 만큼 FORㅣ
for (let i = 0; i < inputArr.length; i++) {
  console.log("inputArr[i]::" + inputArr[i]);
  // 요소를 제거하지 않고 Number(inputArr[i]) 인덱스에 i+1 대입
  answer.splice(Number(inputArr[i]), 0, i + 1);
  console.log("answer::" + answer);
}
answer.reverse();
console.log(answer.join(" "));
