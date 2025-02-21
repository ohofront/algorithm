/* 1. fs 모듈을 사용하여 입력 값을 읽고 숫자로 변환 */
const fs = require('fs');
const N = Number(fs.readFileSync('/dev/stdin'));

/* 2. 위쪽 삼각형 (1부터 N-1까지) */
for (let i = 1; i < N; i++) {
    let blank = ' '.repeat(N - i);  // 왼쪽 공백 (N-i 개)
    let stars = '*'.repeat(i + (i - 1));  // 별 개수 (2*i - 1 개)
    console.log(blank + stars);  // 공백 + 별 출력
}

/* 3. 아래쪽 삼각형 (N부터 1까지) */
for (let j = N; j > 0; j--) {
    let blank = ' '.repeat(N - j);  // 왼쪽 공백 (N-j 개)
    let stars = '*'.repeat(j + (j - 1));  // 별 개수 (2*j - 1 개)
    console.log(blank + stars);  // 공백 + 별 출력
}