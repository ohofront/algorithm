const solution = (my_string, indices) => {
    var answer = '';
    for(let i = 0; i < my_string.length; i++){
        //indices가 i가 포함하지 않았을때
        if(!indices.includes(i)) {
            answer += my_string[i];
        }
    }
    return answer;
}
console.log(solution("apporoograpemmemprs",[1, 16, 6, 15, 0, 10, 11, 3]));