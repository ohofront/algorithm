// fs 모듈을 사용해 입력값을 읽습니다. (백준에서는 '/dev/stdin'을 사용)
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫 번째 줄에서 N(학생 수), K(상을 받는 인원 수)를 가져옵니다.
const [N, K] = input[0].split(' ').map(Number);

// 두 번째 줄에서 학생들의 점수를 배열로 가져옵니다.
const scores = input[1].split(' ').map(Number);

// 점수를 내림차순으로 정렬합니다. 높은 점수가 앞에 오게 정렬
scores.sort((a, b) => b - a);

// K번째 학생의 점수를 출력합니다 (배열 인덱스는 0부터 시작하므로 K-1)
console.log(scores[K - 1]);