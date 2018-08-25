import { range, random } from 'lodash';

function generateBrackets(n: number) {
  return range(0, n)
    .map(el => (random() < 0.5 ? '[' : ']'))
    .join('');
}

function balancedBrackets(input: string): boolean {
  if (!input) return true;
  if (input.length === 1) return false;

  let leftStack: Array<string> = [];

  for (let i = 0; i < input.length; i++) {
    let current = input[i];
    switch (current) {
      case '[':
        leftStack.push(current);
        break;
      case ']':
        if (!leftStack.pop()) return false;
    }
  }

  return !leftStack.length;
}

for (let i = 0; i < 20; i++) {
  const n = random(0, 10);
  const brackets = generateBrackets(n);
  console.log(brackets, balancedBrackets(brackets));
}
