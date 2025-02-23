const fs = require("fs");

// 입력 데이터를 받아오기 (백준에서는 '/dev/stdin'을 사용해야 함)
const input = fs.readFileSync("/dev/stdin", "utf8").trim().split("\n");

let totalGrade = 0; // 학점 총합
let totalWeightedScore = 0; // (학점 * 과목 평점)의 총합

// 과목 평점 변환을 위한 객체
const gradeMap = {
  "A+": 4.5,
  "A0": 4.0,
  "B+": 3.5,
  "B0": 3.0,
  "C+": 2.5,
  "C0": 2.0,
  "D+": 1.5,
  "D0": 1.0,
  "F": 0.0,
};

// 입력 데이터를 한 줄씩 처리
input.forEach((line) => {
  const [subject, creditStr, grade] = line.split(" ");
  const credit = parseFloat(creditStr);

  // P 과목은 계산에서 제외
  if (grade === "P") return;

  // 총 학점 계산
  totalGrade += credit;
  
  // 가중 점수 계산 (학점 * 평점)
  totalWeightedScore += credit * gradeMap[grade];
});

// 결과 계산: 총 (학점 * 평점) / 총 학점
const gpa = totalWeightedScore / totalGrade;

// 결과 출력 (소수점 6자리까지 출력)
console.log(gpa.toFixed(6));
