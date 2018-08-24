import { random } from 'lodash';
import shuffle from '../utils/shuffle';

function bestShuffle(input: Array<number>): { shuffledInput: Array<number>; overlap: number } {
  let shuffledInput: Array<number> = [];
  let foundShuffle = false;
  let duplicates: { [key: number]: any } = {};

  input.forEach((v) => {
    if (!duplicates[v]) {
      duplicates[v] = 1;
    } else {
      duplicates[v]++;
    }
  });

  let maxDuplication: number = -1;
  for (let d in duplicates) {
    maxDuplication = Math.max(duplicates[d], maxDuplication);
  }

  let maxOverlap: number = 2 * (maxDuplication - input.length / 2);
  maxOverlap = maxOverlap > 0 ? maxOverlap : 0;

  let overlap: number;
  while (!foundShuffle) {
    overlap = 0;
    shuffledInput = shuffle(input);
    for (let i = 0; i < input.length; i++) {
      if (input[i] === shuffledInput[i]) overlap++;
    }
    foundShuffle = overlap <= maxOverlap;
  }
  return { shuffledInput, overlap };
}

[Array.from({ length: 10 }, (_, i) => random(0,i)), [1, 1, 2, 3, 4], [1, 1, 1, 1, 2]].forEach((array, i) => {
  console.time(`Shuffle ${i}`);
  console.log(bestShuffle(array));
  console.timeEnd(`Shuffle ${i}`);
});
