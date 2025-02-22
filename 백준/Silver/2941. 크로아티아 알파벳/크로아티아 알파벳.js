// fs 모듈을 사용하여 입력값을 읽음
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();

// 크로아티아 알파벳 목록
const croatianAlphabets = ['c=', 'c-', 'dz=', 'd-', 'lj', 'nj', 's=', 'z='];

// 크로아티아 알파벳을 하나의 문자로 변환하는 함수
const modifiedInput = (str) => {
    for (let i = 0; i < croatianAlphabets.length; i++) {
        str = str.replaceAll(croatianAlphabets[i], '*'); // '*'는 하나의 문자로 대체
    }
    return str;
};

// 변환된 문자열의 길이를 출력
console.log(modifiedInput(input).length);
