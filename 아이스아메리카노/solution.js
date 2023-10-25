const solution = (money) => {
  const answer = [];
  answer[0] = Math.floor(money / 5500); // 소수값 존재할때 소수값 버려
  answer[1] = money - 5500 * answer[0];
  return answer;
};
console.log(solution(10000));
