function solution(a, b, c) {
    if (a !== b && a !== c && b !== c) {
      return a + b + c;
    } else if (a === b || a === c || b === c) {
      return (a + b + c) * (Math.pow(a, 2) + Math.pow(b, 2) + Math.pow(c, 2));
    }else if (a === b && b === c) {
        return (a + b + c) * (Math.pow(a, 2) + Math.pow(b, 2) + Math.pow(c, 2)) * (Math.pow(a, 3) + Math.pow(b, 3) + Math.pow(c, 3));
    }
  }
console.log(solution(2,2,2));