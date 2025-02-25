// 파일 시스템 모듈(fs) 불러오기
const fs = require('fs');

// 표준 입력을 읽어와서 문자열로 변환 후, 줄바꿈 기준으로 배열로 변환
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 행(N)과 열(M)의 크기 초기화
let N = 0;
let M = 0;

// 모든 값을 저장할 1차원 배열
const arr = [];

// 입력 데이터를 순회하면서 2차원 배열을 1차원 배열로 변환
input.forEach((i) => {
    // 각 줄을 공백 기준으로 나누어 숫자 배열로 변환
    i = i.split(' ').map(a => Number(a));

    // M(열 개수)은 한 줄의 길이로 설정
    M = i.length;

    // 배열에 모든 요소를 추가 (2차원 배열을 1차원 배열로 펼침)
    arr.push(...i);
});

// 배열에서 최댓값 찾기
const max = Math.max(...arr);

// 최댓값의 인덱스 찾기
const index = arr.indexOf(max);

// 최댓값 출력
console.log(max);

// 최댓값이 위치한 행과 열을 출력 (1부터 시작하는 인덱스로 변환)
console.log(Math.floor(index / M) + 1, index % M + 1);
