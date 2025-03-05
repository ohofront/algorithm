function solution(order) {
  var expected = 19000;
  var answer = 0;
  var result = false;
  order.map((item) => {
    if (item.includes("latte")) {
      answer += 5000;
    } else {
      answer += 4500;
    }
  });
  if (answer === expected) {
    result = true;
  } else {
    result = false;
  }
  return result;
}
console.log(
  solution(["cafelatte", "americanoice", "hotcafelatte", "anything"])
);
