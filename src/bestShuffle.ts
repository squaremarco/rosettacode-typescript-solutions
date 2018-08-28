import { random } from 'lodash';
import shuffle from '../utils/shuffle';

function bestShuffle(input: Array<number>): { shuffledInput: Array<number>; overlap: number } {
  let duplicates: { [key: number]: any } = input.reduce(
    (a, c) => {
      a[c] = !a[c] ? 1 : a[c] + 1;
      return a;
    },
    <{ [key: number]: any }>{}
  );

  let maxDuplication: number = -1;
  for (let d in duplicates) {
    maxDuplication = Math.max(duplicates[d], maxDuplication);
  }

  let maxOverlap: number = 2 * (maxDuplication - input.length / 2);
  maxOverlap = maxOverlap > 0 ? maxOverlap : 0;

  let shuffledInput: Array<number> = [];
  let overlap: number;
  
  while(true) {
    overlap = 0;
    shuffledInput = shuffle(input);
    for (let i = 0; overlap <= maxOverlap && i < shuffledInput.length ; i++){
      if(shuffledInput[i] === input[i]) overlap++;
    }
    if (overlap <= maxOverlap) break;
  }

  return { shuffledInput, overlap };
}

[Array.from({ length: 10 }, (_, i) => random(0,i)), [1, 1, 2, 3, 4], [1, 1, 1, 1, 2]].forEach((array, i) => {
  console.time(`Shuffle ${i}`);
  console.log(bestShuffle(array));
  console.timeEnd(`Shuffle ${i}`);
});
