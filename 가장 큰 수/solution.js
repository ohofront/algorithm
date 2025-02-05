function solution(numbers) {
  // 숫자들을 문자열로 변환
  const numStrs = numbers.map((num) => num.toString());

  // 두 문자열 a, b에 대해 a+b와 b+a를 비교하여 더 큰 값을 만드는 순서대로 정렬합니다.
  numStrs.sort((a, b) => {
    if (a + b > b + a) {
      return -1;
    } else if (a + b < b + a) {
      return 1;
    } else {
      return 0;
    }
  });

  // 정렬된 문자열들을 합치기
  const result = numStrs.join('');

  // 모든 숫자가 0인 경우를 처리
  return result[0] === '0' ? '0' : result;
}
