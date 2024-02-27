const solution = (n) => {
    //for문의 범위는 2부터 시작하고 n보다 작을때까지 +1씩 반복
    for(x=2; x<n; x++){
        //if문을 통해서 조건으로 n%x===1을 넣는다.
        if(n%x===1){
            return x
        } 
      } 
    }
console.log(solution(8));
 