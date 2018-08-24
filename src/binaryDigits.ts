import { Justify, justifyString } from '../utils/justify';

function binDigits(n: number): string {
  return n.toString(2);
}

for (let i = 0; i < Math.pow(2, 5); i++) {
  console.log(justifyString(binDigits(i), 5, Justify.RIGHT));
}
