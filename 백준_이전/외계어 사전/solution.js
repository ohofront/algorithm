const solution = (spell, dic) => {
  var answer = 0;
  const isThere = []; // dic의 word에 spell의 alphabet가 포함된 배열
  const isNotThere = []; // dic의 word중에서 spell의 alphabet이 포함되지 않은 배열

  dic.map((word) => {
    //dic를 map 돌려 word 나열
    let count = 0;
    spell.map((alphabet) => {
      if (word.includes(alphabet)) {
        //spell를 map 돌려 alphabet 중에 word가 포함한것이 있으면
        count += 1;
      }
    });
    //count 횟수가 spell의 길이와 같을때
    if (count === spell.length) {
      console.log("there:", word);
      isThere.push(word);
    } else {
      console.log("not there:", word);
      isNotThere.push(word);
    }
  });
  answer = isThere.length === 0 ? 2 : 1;
  return answer;
};

console.log(solution(["z", "d", "x"], ["def", "dww", "dzx", "loveaw"]));
