const fs = require('fs');

// 입력을 파일 또는 콘솔에서 읽어오기 (백준에서는 '/dev/stdin' 사용)
const input = fs.readFileSync('/dev/stdin', 'utf8').trim().split('\n');

// 첫 번째 줄에서 행렬의 크기 N, M을 가져옴
const [N, M] = input[0].split(' ').map(Number);

// 두 개의 행렬을 저장할 배열 초기화
let matrixA = [];
let matrixB = [];

// 첫 번째 행렬 A를 저장 (1번 인덱스부터 N번 인덱스까지)
for (let i = 1; i <= N; i++) {
    matrixA.push(input[i].split(' ').map(Number));
}

// 두 번째 행렬 B를 저장 (N+1번 인덱스부터 2N번 인덱스까지)
for (let i = N + 1; i <= 2 * N; i++) {
    matrixB.push(input[i].split(' ').map(Number));
}

// 결과 행렬을 저장할 배열 초기화
let resultMatrix = Array.from(Array(N), () => Array(M).fill(0));

// 행렬 덧셈 수행
for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        resultMatrix[i][j] = matrixA[i][j] + matrixB[i][j];
    }
}

// 결과 출력 (각 행을 공백으로 구분하여 출력)
console.log(resultMatrix.map(row => row.join(' ')).join('\n'));
