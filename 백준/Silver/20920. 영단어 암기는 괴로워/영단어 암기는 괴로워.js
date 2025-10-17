// fs 모듈을 사용하여 파일 입력을 처리합니다.
const fs = require('fs');

// 표준 입력('/dev/stdin')의 전체 내용을 읽고 줄바꿈으로 분리합니다.
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫 줄에서 N(단어 개수)와 M(최소 길이)을 분리합니다.
const [N, M] = input[0].split(' ').map(Number);

// Map을 사용하여 각 단어의 빈도수를 저장합니다.
const wordFrequency = new Map();

// 1. 단어 목록 순회 및 빈도수 계산
for (let i = 1; i <= N; i++) {
    const word = input[i].trim();
    
    // M보다 짧은 길이의 단어는 제외합니다.
    if (word.length < M) {
        continue;
    }
    
    // 빈도수 갱신: 이미 Map에 있으면 1 증가, 없으면 1로 초기화
    wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
}

// 2. Map의 [단어, 빈도수] 쌍을 배열로 변환합니다.
// Map의 key는 단어, value는 빈도수입니다.
const wordList = Array.from(wordFrequency.entries());

// 3. 3가지 우선순위에 따라 정렬합니다.
wordList.sort((a, b) => {
    const wordA = a[0]; // 단어 A
    const freqA = a[1]; // 빈도수 A
    const wordB = b[0]; // 단어 B
    const freqB = b[1]; // 빈도수 B

    // 1순위: 자주 나오는 단어일수록 앞에 배치 (빈도수: 내림차순)
    if (freqA !== freqB) {
        return freqB - freqA; // freqB > freqA 이면 음수가 나와 A가 앞에 배치됨
    }

    // 2순위: 해당 단어의 길이가 길수록 앞에 배치 (길이: 내림차순)
    if (wordA.length !== wordB.length) {
        return wordB.length - wordA.length; // wordB.length > wordA.length 이면 음수가 나와 A가 앞에 배치됨
    }

    // 3순위: 알파벳 사전 순으로 앞에 있는 단어일수록 앞에 배치 (사전순: 오름차순)
    // String.prototype.localeCompare()는 사전순 비교를 수행합니다.
    // A가 B보다 사전순으로 빠르면 음수를 반환하므로, 오름차순 정렬에 적합합니다.
    return wordA.localeCompare(wordB);
});

// 4. 정렬된 단어 배열에서 단어(key)만 추출하여 줄바꿈으로 연결합니다.
const result = wordList.map(entry => entry[0]).join('\n');

// 결과 출력
console.log(result);