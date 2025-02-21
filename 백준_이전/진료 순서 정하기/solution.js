function solution(emergency) {
  // 내림차순 정렬
  // slice()를 사용하여 원본 배열을 변경하지 않고 새로운 배열을 만들어서 순위를 찾아내는 것이 보다 안전한 방법
  let sorted = emergency.slice().sort((a, b) => b - a);
  console.log(sorted);
  // sorted.indexOf(v)는 sorted 배열에서 v의 인덱스를 찾아서 반환
  // +1을 해주면 v가 sorted 배열에서 몇 번째로 큰 요소인지를 나타내는 순위를 구할 수 있습니다
  return emergency.map((v) => sorted.indexOf(v) + 1);
}
console.log(solution([3, 76, 24]));
