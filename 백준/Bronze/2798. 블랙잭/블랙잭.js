const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 입력값 파싱
const [N, M] = input[0].split(' ').map(Number); // 카드 개수(N)와 목표값(M)
const cards = input[1].split(' ').map(Number); // 카드 배열

let maxSum = 0; // M을 넘지 않는 최대 합 저장 변수

// 세 장의 카드 선택을 위한 3중 반복문
for (let i = 0; i < N - 2; i++) {
    for (let j = i + 1; j < N - 1; j++) {
        for (let k = j + 1; k < N; k++) {
            const sum = cards[i] + cards[j] + cards[k]; // 선택한 세 카드의 합
            
            // M을 넘지 않으면서, 기존 maxSum보다 크다면 업데이트
            if (sum <= M && sum > maxSum) {
                maxSum = sum;
            }
        }
    }
}

console.log(maxSum); // 최댓값 출력