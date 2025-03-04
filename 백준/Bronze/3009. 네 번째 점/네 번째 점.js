// readline 모듈을 사용하여 입력을 처리
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const points = [];

// 입력을 한 줄씩 받아 배열에 저장
rl.on('line', (line) => {
    points.push(line.split(' ').map(Number));
    
    // 3개의 점을 입력받으면 네 번째 점을 계산
    if (points.length === 3) {
        rl.close();
    }
});

rl.on('close', () => {
    const xValues = {};
    const yValues = {};
    
    // x, y 좌표가 몇 번 등장하는지 카운트
    for (const [x, y] of points) {
        xValues[x] = (xValues[x] || 0) + 1;
        yValues[y] = (yValues[y] || 0) + 1;
    }
    
    // 카운트가 1인 좌표가 네 번째 점의 좌표
    let fourthX = Object.keys(xValues).find(key => xValues[key] === 1);
    let fourthY = Object.keys(yValues).find(key => yValues[key] === 1);
    
    console.log(`${fourthX} ${fourthY}`);
});
