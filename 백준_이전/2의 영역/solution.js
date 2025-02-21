const solution = (arr) => {
    var answer= '';
    if(!arr.includes(2)){
        return [-1];
    }
    for(let i=0; i<arr.length;i++){
        if(arr[i] === 2 ){
            index1 = i;
            break;
        }
    }
    for(let i=arr.length-1; i>=0;i--){
        if(arr[i] === 2){
            index2 = i;
            break;
        }
    }
    answer = arr.slice(index1,index2);
    return answer;
}
console.log(solution([1, 2, 1, 4, 5, 2, 9]));