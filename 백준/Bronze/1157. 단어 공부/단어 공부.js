const fs = require('fs');

let input;
try {
    input = fs.readFileSync('/dev/stdin', 'utf8').toString().split('\n');
} catch (err) {
    console.error("입력을 읽을 수 없습니다:", err);
    process.exit(1);
}

if (!input || input.length === 0 || input[0].trim() === "") {
    console.error("입력값이 없습니다.");
    process.exit(1);
}

solution(input[0]);

function solution(str) {
    if (!str || str.trim().length === 0) { 
        console.error("입력 문자열이 유효하지 않습니다.");
        return;
    }
    
    let lowStr = str.toLowerCase(); // 대소문자 구분 없이 처리
    let obj = {}; // 문자 개수를 저장할 객체

    for (let i = 0; i < lowStr.length; i++) {
        obj[lowStr[i]] = (obj[lowStr[i]] || 0) + 1;
    }

    let maxCount = Math.max(...Object.values(obj));
    let result = Object.keys(obj).filter(key => obj[key] === maxCount);

    console.log(result.length > 1 ? '?' : result[0].toUpperCase());
}
