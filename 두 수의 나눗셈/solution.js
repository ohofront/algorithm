const solution = (num1, num2) => {
        var answer = 0;
        var temp = 0;
        temp = num1/num2;
        answer = temp * 1000;
        return answer;
}
console.log(solution(10,2));