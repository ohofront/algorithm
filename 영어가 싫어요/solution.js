const solution = (numbers) => {
  var answer = 0;
  const strN = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  strN.map((str, idx) => {
    console.log(str);
    console.log("idx", idx);
    numbers = numbers.replaceAll(str, idx);
  });
  answer = Number(numbers);
  return answer;
};
console.log(solution("onefourzerosixseven"));
