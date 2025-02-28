const fs = require("fs");

// 입력값을 가져옴 (백준에서 입력은 표준 입력을 통해 제공됨)
const input = fs.readFileSync("/dev/stdin").toString().trim().split(" ");

// 입력값을 숫자로 변환
const N = parseInt(input[0]); // 변환할 10진법 숫자
const B = parseInt(input[1]); // 변환할 진법 (2 ≤ B ≤ 36)

// 숫자를 B진법으로 변환하는 함수
function convertToBase(N, B) {
    let result = ""; // 변환된 숫자를 저장할 문자열
    const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // 0~9와 A~Z까지의 문자 배열

    let num = N;
    while (num > 0) {
        let remainder = num % B; // 나머지를 구함
        result = digits[remainder] + result; // 나머지를 진법 문자로 변환하여 앞에 추가
        num = Math.floor(num / B); // 몫을 업데이트
    }
    
    return result || "0"; // N이 0일 경우 "0"을 반환
}

// 결과 출력
console.log(convertToBase(N, B));
