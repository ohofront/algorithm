// 이분 탐색 방식
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫 줄: N (카드 개수)
const N = Number(input[0]);
// 두 번째 줄: N개의 숫자 카드
const cards = input[1].split(' ').map(Number);
// 세 번째 줄: M (찾고 싶은 수 개수)
const M = Number(input[2]);
// 네 번째 줄: M개의 숫자
const targets = input[3].split(' ').map(Number);

// 카드 배열 정렬
cards.sort((a, b) => a - b);

// 특정 수의 "하한 인덱스"를 찾는 함수 (lower bound)
// -> 해당 값 이상인 첫 번째 인덱스를 반환
function lowerBound(arr, target) {
    let left = 0;
    let right = arr.length;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}

// 특정 수의 "상한 인덱스"를 찾는 함수 (upper bound)
// -> 해당 값보다 큰 첫 번째 인덱스를 반환
function upperBound(arr, target) {
    let left = 0;
    let right = arr.length;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}

// 결과 저장 배열
const result = [];

// 각 찾고자 하는 숫자마다 개수를 계산해서 결과 배열에 추가
for (let i = 0; i < M; i++) {
    const target = targets[i];
    const count = upperBound(cards, target) - lowerBound(cards, target);
    result.push(count);
}

// 결과 출력 (공백으로 구분)
console.log(result.join(' '));
