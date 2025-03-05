function solution(progresses, speeds) {
    var answer = [];
    var days = progresses.map((progress, index) => 
        Math.ceil((100 - progress) / speeds[index]) // 각 작업이 완료되는 데 걸리는 일수 계산
    );
    
    var maxDay = days[0]; // 첫 번째 작업이 완료되는 날짜
    var count = 0; // 같은 날 배포될 작업 개수
    
    for (let i = 0; i < days.length; i++) {
        if (days[i] <= maxDay) {
            // 현재 작업이 이전 작업과 함께 배포될 수 있으면 count 증가
            count++;
        } else {
            // 이전 작업들 배포하고 새로운 기준 설정
            answer.push(count);
            count = 1; // 현재 작업이 새로운 배포의 시작
            maxDay = days[i]; // 기준일 변경
        }
    }
    
    answer.push(count); // 마지막 남은 작업들 배포
    return answer;
}