// readline 모듈을 사용하여 입력을 받음
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('', (n) => {
    n = parseInt(n); // 입력값을 정수로 변환
    console.log(n); // 수행 횟수는 입력값 n과 동일함
    console.log(1); // 수행 시간의 최고차항 차수는 1 (O(n) 시간 복잡도)
    rl.close();
});