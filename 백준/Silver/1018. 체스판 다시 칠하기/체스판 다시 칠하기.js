const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number); // 체스판 크기 (N x M)
const board = input.slice(1).map(row => row.trim()); // 체스판 정보

const patterns = [
    ['WBWBWBWB', 'BWBWBWBW', 'WBWBWBWB', 'BWBWBWBW', 'WBWBWBWB', 'BWBWBWBW', 'WBWBWBWB', 'BWBWBWBW'],
    ['BWBWBWBW', 'WBWBWBWB', 'BWBWBWBW', 'WBWBWBWB', 'BWBWBWBW', 'WBWBWBWB', 'BWBWBWBW', 'WBWBWBWB']
];

let minChanges = Infinity; // 최소 변경 횟수 저장 변수

// 8x8 크기의 모든 부분 체스판 검사
for (let i = 0; i <= N - 8; i++) {
    for (let j = 0; j <= M - 8; j++) {
        for (let p = 0; p < 2; p++) { // 두 가지 패턴 검사 (WBWB... vs BWBW...)
            let changes = 0;
            for (let x = 0; x < 8; x++) {
                for (let y = 0; y < 8; y++) {
                    if (board[i + x][j + y] !== patterns[p][x][y]) {
                        changes++;
                    }
                }
            }
            minChanges = Math.min(minChanges, changes);
        }
    }
}

console.log(minChanges); // 결과 출력