const fs = require("fs");

// 입력값을 받아와 처리
const input = fs.readFileSync("/dev/stdin").toString().trim().split(" ");

// N: 주어진 숫자, K: 찾고 싶은 약수의 위치
const N = parseInt(input[0]);
const K = parseInt(input[1]);

// 약수를 저장할 배열
let divisors = [];

// 1부터 N까지의 숫자를 순회하면서 약수 찾기
for (let i = 1; i <= N; i++) {
    if (N % i === 0) {
        divisors.push(i); // i가 N의 약수이면 배열에 추가
    }
}

// K번째 약수가 존재하면 출력, 없으면 0 출력
console.log(divisors[K - 1] || 0);