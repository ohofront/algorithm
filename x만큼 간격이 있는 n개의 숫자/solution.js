const solution = (x,n) => {
    //우선 arr를 만들고 빈배열을 할당
    let arr =[]
    //미리 선언해둔 arr에 i의 값을 담는 행위를 for문을 도는 동안 반복
    for(i=x; arr.length < n; i+=x){
            arr.push(i)
        }
    
    return arr;
}
console.log(solution(2,5));