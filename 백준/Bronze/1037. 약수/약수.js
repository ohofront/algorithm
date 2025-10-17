// 파일 시스템 모듈을 불러옵니다.
const fs = require('fs');

// 표준 입력('/dev/stdin')의 전체 내용을 읽어옵니다.
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫 번째 줄은 진짜 약수의 개수이지만, 문제 풀이에는 직접 사용되지 않습니다.
// 두 번째 줄은 진짜 약수들이 공백으로 구분된 문자열입니다.
const divisorString = input[1];

// 1. 진짜 약수 문자열을 공백 기준으로 나누고, 각 요소를 숫자로 변환하여 배열을 만듭니다.
const divisors = divisorString.split(' ').map(Number);

// 2. 주어진 진짜 약수들 중에서 최솟값(가장 작은 약수, 1 제외)을 찾습니다.
const minDivisor = Math.min(...divisors);

// 3. 주어진 진짜 약수들 중에서 최댓값(가장 큰 약수, N 제외)을 찾습니다.
const maxDivisor = Math.max(...divisors);

// 4. 원래의 수 N은 가장 작은 진짜 약수와 가장 큰 진짜 약수의 곱입니다.
// (약수 쌍의 원리에 따라)
const N = minDivisor * maxDivisor;

// 5. 계산된 N을 출력합니다.
console.log(N);