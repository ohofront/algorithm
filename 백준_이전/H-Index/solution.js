function solution(citations) {
  // 인용 횟수 배열을 내림차순으로 정렬
  citations.sort((a, b) => b - a);

  let hIndex = 0;
  for (let i = 0; i < citations.length; i++) {
    // 논문의 인용 횟수가 (i+1) 이상이면, H-Index 후보를 갱신
    if (citations[i] >= i + 1) {
      hIndex = i + 1;
    } else {
      // 만약 citations[i]가 (i+1)보다 작다면 더 이상 조건을 만족하는 경우가 없으므로 종료합니다.
      break;
    }
  }

  return hIndex;
}
