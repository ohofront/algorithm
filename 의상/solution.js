function sortClothes(clothes) {
  // 의상 종류별로 아이템을 저장할 해시 테이블
  const clothesHash = new Map();
  // 의상을 종류별로 그룹화
  for (const cloth of clothes) {
    const [name, type] = cloth;
    clothesHash[type] = clothesHash[type] + 1 || 1;
  }
  return clothesHash;
}
function solution(clothes) {
  // 의상 종류 별 카운트
  const clothesHash = sortClothes(clothes);

  // 각 종류별 선택 가능 경우의 수 계산
  // 하루에 최소 1개 이상의 의상을 입는다.
  let answer = 1;
  // 각 의상 종류에 '착용 하지 않음' 경우의 수 추가 (+1)
  for (const clothType in clothesHash) {
    answer *= clothesHash[clothType] + 1;
  }

  // 최소 한 가지는 입어야 하므로 아무것도 입지 않는 경우(1)를 뺌
  return answer - 1;
}
