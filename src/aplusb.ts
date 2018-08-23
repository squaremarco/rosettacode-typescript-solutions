import * as readline from 'readline-sync';
import { ERROR, NOTIFY } from '../utils/colors';

function stringSum(buf: string): string | number {
  if (buf.match(/[^\d\s]/g)) {
    return ERROR('\nInvalid input - only integers and whitespaces allowed.\n');
  }
  return NOTIFY(
    buf
      .match(/\d+/g)
      .map(Number)
      .reduce((acc, cur) => acc + cur)
  );
}

while (true) {
  let answer = readline.question('Insert integer numbers separated by a space:\n> ');
  if (answer === 'exit') process.exit();
  console.log(stringSum(answer));
}
