const solution = (n, numlist) => {
    var answer = [];
    for(let i = 0; i < numlist.length; i++){
        answer = numlist.filter((item) => item % n === 0)
    }
    return answer;
}