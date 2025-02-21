// 파일 시스템 모듈(fs)을 불러옴
const fs = require('fs');

// 표준 입력을 읽어 문자열로 변환
const input = fs.readFileSync("/dev/stdin").toString();

// 다이얼 숫자와 문자 매핑을 저장한 객체
let dial = {
    ABC: 3,   // A, B, C → 3초
    DEF: 4,   // D, E, F → 4초
    GHI: 5,   // G, H, I → 5초
    JKL: 6,   // J, K, L → 6초
    MNO: 7,   // M, N, O → 7초
    PQRS: 8,  // P, Q, R, S → 8초
    TUV: 9,   // T, U, V → 9초
    WXYZ: 10  // W, X, Y, Z → 10초
};

// 최소 걸리는 시간 계산을 위한 변수
let minTime = 0;

// 입력된 문자열의 각 문자에 대해 반복
for (let i = 0; i < input.length; i++) {
    // 다이얼 객체를 순회하면서 해당하는 숫자 값을 찾음
    for (let x in dial) {
        if (x.includes(input[i])) { // 현재 문자가 다이얼 키 중 하나에 포함되는지 확인
            minTime += dial[x]; // 해당 문자에 대응하는 시간을 더함
        }
    }
}

// 결과 출력 (다이얼을 눌러야 하는 총 시간)
console.log(minTime);
