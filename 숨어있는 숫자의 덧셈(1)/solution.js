function solution(my_string) {
  const num = my_string.split("");
  let result = 0;

  for (let i = 0; i < num.length; i++) {
    //하나하나 잘렸을 때 number면 result에 담아서 더해준다
    if (Number(num[i])) {
      result += Number(num[i]);
    }
  }
  return result;
}
console.log(solution("aAb1B2cC34oOp"));
