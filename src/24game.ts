import * as seval from 'safe-eval';
import * as readline from 'readline-sync';
import { isEqual } from 'lodash';
import { NOTIFY, ERROR, WARN } from '../utils/colors';

function twentyFour(randNumbers: Array<number>, input: string): void {
  const strippedInput = input.replace(/\s/g, '');

  if (!strippedInput.match(/[-+*\/)(\d]/g)) {
    console.log(ERROR('\nInvalid input - only numbers, parentheses, whitespaces and + - * / allowed.\n'));
    return;
  }

  const inputNumbers = strippedInput
    .replace(/\D/g, '')
    .split('')
    .map(el => parseInt(el))
    .sort();

  if (!isEqual(randNumbers, inputNumbers)) {
    console.log(ERROR('\nInvalid numbers - only use generated numbers.\n'));
    return;
  }

  try {
    if (seval(strippedInput) !== 24) {
      console.log(WARN(`\n${strippedInput} !== 24\n`));
      return;
    } else {
      console.log(NOTIFY(`\n${strippedInput} === 24 - CORRECT!`));
      process.exit();
    }
  } catch (e) {
    console.log(ERROR(`\n${e.toString()}\n`));
    return;
  }
}

const randNumbers: Array<number> = Array.from({ length: 4 }, () => Math.ceil(Math.random() * 9)).sort();

while (true) {
  let answer = readline.question(`These are the generated numbers: ${randNumbers}, insert expression:\n> `);
  if (answer === 'exit') process.exit();
  twentyFour(randNumbers, answer);
}
