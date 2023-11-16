function solution(numbers, k) {
  // 첫 번째 선수가 공 갖고 있음
  let answer = 1;
  // k-1번까지 반복하며 다음 사람을 건너뛰도록 +2를 함
  for (let i = 0; i < k - 1; i++) {
    answer += 2;
    // 마지막 번호 넘어가는 경우 처음 선수에게 공이 전달되도록 크기만큼 빼
    if (answer > numbers.length) {
      answer -= numbers.length;
    }
  }
  return answer;
}
console.log(solution([1, 2, 3, 4, 5, 6], 6));
