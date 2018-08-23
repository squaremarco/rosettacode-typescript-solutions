import { ERROR, NOTIFY } from '../utils/colors';

function checkWord(word: string): boolean {
  //optimization
  const normalizedLetters: Array<string> = [...word.toUpperCase()];
  if (
    normalizedLetters
      .sort()
      .join('')
      .match(/(\w)\1{2}/g)
  ) {
    return false;
  }
  let blocks: Array<
    Array<string>
  > = 'BO XK DQ CP NA GT RE TG QD FS JW HU VI AN OB ER FS LY PC ZM'
    .split(' ')
    .map(pair => pair.split(''));
  for (let i = 0; i < normalizedLetters.length; i++) {
    let gotBlock = false;
    for (let j = 0; j < blocks.length && !gotBlock; j++) {
      if (blocks[j].indexOf(normalizedLetters[i]) !== -1) {
        blocks.splice(j, 1);
        gotBlock = !gotBlock;
      }
    }
    if (!gotBlock) return false;
  }
  return true;
}

const TRUE: string = NOTIFY('true');
const FALSE: string = ERROR('false');
['A', 'AAA', 'BARK', 'BOOK', 'TREAT', 'COMMON', 'SQUAD', 'CONFUSE'].forEach(
  word => {
    const result = checkWord(word);
    console.log(`${word}: ${result ? TRUE : FALSE}`);
  }
);
