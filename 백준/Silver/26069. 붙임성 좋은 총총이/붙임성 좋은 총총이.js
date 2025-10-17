// fs 모듈을 불러옵니다.
const fs = require('fs');

// 표준 입력('/dev/stdin')의 전체 내용을 읽어옵니다.
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫 번째 줄은 만난 기록의 수 N이지만, 배열 순회를 통해 처리 가능하므로 별도의 변수에 저장하지 않습니다.

// 춤을 추는 사람들의 이름을 저장할 Set을 생성합니다.
// Set은 중복된 이름을 저장하지 않으며, 이름의 포함 여부를 O(1)에 가깝게 확인할 수 있어 효율적입니다.
const rainbowDancers = new Set();

// 1. 초기 상태 설정: 기록 시작 전 'ChongChong'만이 춤을 추고 있습니다.
const initialDancer = 'ChongChong';
rainbowDancers.add(initialDancer);

// 2. 두 번째 줄(i=1)부터 N개의 만남 기록을 순회합니다.
for (let i = 1; i < input.length; i++) {
    // 현재 기록 줄을 공백 기준으로 두 사람의 이름으로 분리합니다.
    const [personA, personB] = input[i].trim().split(' ');

    // 3. 댄스 전파 조건 확인: 두 사람 중 한 명이라도 이미 춤을 추고 있는지 확인합니다.
    const isA_Dancing = rainbowDancers.has(personA);
    const isB_Dancing = rainbowDancers.has(personB);

    // 4. 전파 로직
    // A 또는 B 둘 중 하나라도 춤을 추고 있었다면, 만난 시점 이후로 둘 다 춤을 추게 됩니다.
    if (isA_Dancing || isB_Dancing) {
        // 이미 춤을 추고 있던 사람을 만나면, 무지개 댄스가 전파됩니다.
        // Set에 추가하면 이미 춤을 추고 있는 사람(예: ChongChong)을 다시 추가해도
        // 중복이 발생하지 않아 안전합니다.
        rainbowDancers.add(personA);
        rainbowDancers.add(personB);
    }
}

// 5. 결과 출력: 마지막 기록 이후 무지개 댄스를 추는 사람의 수는 Set의 크기와 같습니다.
console.log(rainbowDancers.size);