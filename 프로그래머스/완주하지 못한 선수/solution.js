function solution(participant, completion) {
  // 참가자와 완주자 배열을 정렬합니다.
  participant.sort();
  completion.sort();

  // 정렬된 배열에서 서로 다른 지점을 찾습니다.
  for (let i = 0; i < completion.length; i++) {
    if (participant[i] !== completion[i]) {
      return participant[i];
    }
  }

  // 마지막 남은 참가자가 완주하지 못한 선수입니다.
  return participant[participant.length - 1];
}
