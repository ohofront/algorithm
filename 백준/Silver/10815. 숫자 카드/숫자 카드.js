const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// 첫 줄: 상근이가 가지고 있는 숫자 카드 개수 (사용 안함)
const N = parseInt(input[0]);

// 두 번째 줄: 상근이가 가진 카드 숫자 배열
const sanggeunCards = input[1].split(" ").map(Number);

// 세 번째 줄: 확인할 숫자 개수 (사용 안함)
const M = parseInt(input[2]);

// 네 번째 줄: 확인할 숫자 배열
const compareCards = input[3].split(" ").map(Number);

// 상근이 카드 정렬 (이분 탐색을 위해 필요)
sanggeunCards.sort((a, b) => a - b);

// 이분 탐색 함수 정의
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return 1; // 숫자 찾음
    } else if (arr[mid] < target) {
      left = mid + 1; // 오른쪽 범위로 이동
    } else {
      right = mid - 1; // 왼쪽 범위로 이동
    }
  }

  return 0; // 숫자 없음
}

// 결과 출력 배열
const result = compareCards.map(card => binarySearch(sanggeunCards, card));

// 결과 출력 (공백으로 join)
console.log(result.join(" "));