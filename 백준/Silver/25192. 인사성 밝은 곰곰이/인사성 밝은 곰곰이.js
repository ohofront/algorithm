// fs 모듈을 불러옵니다.
const fs = require('fs');

// 표준 입력('/dev/stdin')의 전체 내용을 읽어옵니다.
// trim()으로 불필요한 공백을 제거하고, split('\n')으로 각 줄을 배열 요소로 만듭니다.
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫 번째 줄은 채팅방의 기록 수 N입니다.
// const N = Number(input[0]); // N은 반복 횟수만 지정하므로, 입력 배열을 순회하는 것으로 충분합니다.

// 전체 곰곰티콘 사용 횟수를 저장할 변수
let gomGomCount = 0;

// 'ENTER' 이후 인사를 한 유저의 닉네임을 저장하는 Set.
// Set은 중복된 값을 허용하지 않으므로, 유저가 이미 인사했는지 빠르게 확인할 수 있습니다.
let currentUsers = new Set();

// 두 번째 줄부터 N개의 채팅 기록을 순회합니다.
// input[0]은 N이므로, i=1부터 시작하여 실제 채팅 기록을 확인합니다.
for (let i = 1; i < input.length; i++) {
    const record = input[i].trim(); // 현재 기록 (ENTER 또는 닉네임)

    // 1. 'ENTER'가 입력된 경우
    if (record === 'ENTER') {
        // 새로운 사람이 입장했으므로, 이전 세션의 유저 목록을 초기화합니다.
        // 이는 새로운 세션에서 모든 유저가 다시 인사를 할 수 있음을 의미합니다.
        currentUsers = new Set();
    } 
    // 2. 닉네임이 입력된 경우
    else {
        const username = record;

        // Set에 현재 닉네임이 등록되어 있지 않은지 확인합니다.
        // 즉, 'ENTER' 이후 이 유저가 처음으로 채팅을 입력하는 경우입니다.
        if (!currentUsers.has(username)) {
            // 처음 채팅이므로 곰곰티콘으로 인사를 한 것으로 간주하고 횟수를 증가시킵니다.
            gomGomCount++;

            // 이 유저가 이미 인사했음을 표시하기 위해 Set에 닉네임을 추가합니다.
            currentUsers.add(username);
        }
        // 이미 currentUsers에 닉네임이 있다면, 이 채팅은 일반 채팅이므로 무시합니다.
    }
}

// 최종 곰곰티콘 사용 횟수를 출력합니다.
console.log(gomGomCount);