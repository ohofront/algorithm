const fs = require('fs');
const lines = fs.readFileSync(0, 'utf8').split('\n');

let out = [];
for (let raw of lines) {
  const line = raw.replace(/\r/g, ''); // 윈도우 개행 대응
  if (line === '.') break; // 종료 조건

  const stack = [];
  let ok = true;

  for (const ch of line) {
    if (ch === '(' || ch === '[') {
      stack.push(ch);
    } else if (ch === ')') {
      if (stack.length === 0 || stack[stack.length - 1] !== '(') {
        ok = false;
        break;
      }
      stack.pop();
    } else if (ch === ']') {
      if (stack.length === 0 || stack[stack.length - 1] !== '[') {
        ok = false;
        break;
      }
      stack.pop();
    }
    // 다른 문자들은 무시
  }

  out.push(ok && stack.length === 0 ? 'yes' : 'no');
}

console.log(out.join('\n'));