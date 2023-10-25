const solution = (array, n) => {
  console.log("처음 array:", array);
  //정답 담는 배열 선언
  const answer = [];

  // answer 배열에 array에 있는 값과 n의 차이가 들어가
  // map도 배열의 반복문의 역할 but forEach문과 다른점은 반환값인 return이 있다는것
  console.log(
    "처리 array:",
    array.map((item) => {
      return Math.abs(item - n);
    })
  );

  //Array.push 를 통해 값을 answer에 넣어
  array.map((item) => {
    return answer.push(Math.abs(item - n));
  });
  console.log("answer:", answer);

  // ...전개 연산자를 사용해 얕은 복사
  // answer의 최소값 min
  const min = Math.min(...answer);
  console.log("answer의 min:", min);

  //answer 배열의 길이만큼 반복하면서 answer의 원소값이 min과 같다면
  //같은 인덱스에 있는 array의 원소를 check 배열에 넣어
  let check = [];
  for (let i = 0; i < answer.length; i++) {
    if (answer[i] === min) {
      check.push(array[i]);
    }
  }

  return Math.min(...check);
};
console.log(solution([3, 10, 28], 20));
