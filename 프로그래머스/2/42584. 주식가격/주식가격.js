function solution(prices) {
   var answer = new Array(prices.length).fill(0); // 결과를 저장할 배열 (모든 요소를 0으로 초기화)
    var stack = []; // 가격의 인덱스를 저장할 스택

    for (let i = 0; i < prices.length; i++) {
        // 스택이 비어있지 않고, 현재 가격이 스택에 있는 가격보다 작다면
        while (stack.length > 0 && prices[i] < prices[stack[stack.length - 1]]) {
            let top = stack.pop(); // 가격이 떨어진 시점의 인덱스를 꺼냄
            answer[top] = i - top; // 가격이 유지된 기간 계산
        }
        stack.push(i); // 현재 인덱스를 스택에 추가
    }

    // 스택에 남아 있는 인덱스들은 끝까지 가격이 떨어지지 않은 경우
    while (stack.length > 0) {
        let top = stack.pop();
        answer[top] = prices.length - 1 - top; // 끝까지 가격이 유지됨
    }

    return answer;
}