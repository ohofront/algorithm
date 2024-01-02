function solution(num_list) {
    let cnt = 0; // num_list의 원소들이 1이될때까지 카운트할 변수
    for (let i = 0; i < num_list.length; i++){ // num_list 배열을 반복하고
        while(true) {
            if (num_list[i] === 1){ // number가 1이 되면 반복종료
                break;
            }
            if (num_list[i] % 2 === 0){ // 짝수일 때
                num_list[i] = num_list[i] / 2;
                cnt += 1 // 카운트 1
            }else{ // 홀수일 때
                num_list[i] = (num_list[i] - 1) / 2;
                cnt += 1; // 카운트 1
            }
        }
    }
    return cnt;
}
console.log(solution([12,4,15,1,14]));
