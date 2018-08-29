//TODO: support complex numbers
//IDEA: https://en.wikipedia.org/wiki/Cholesky_decomposition#The_Cholesky%E2%80%93Banachiewicz_and_Cholesky%E2%80%93Crout_algorithms

import { flatten } from 'lodash';

function cholesky(array: number[] | number[][]) {
  const flattenArray = flatten(array);
  console.log(flattenArray);
  const n = Math.sqrt(flattenArray.length);

  if (n % 1 !== 0) throw new Error('Not a squared matrix');

  let L: number[] = Array(n * n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i + 1; j++) {
      let sum: number = 0;

      for (let k = 0; k < j; k++) {
        sum += L[i * n + k] * L[j * n + k];
      }

      let expr: number = flattenArray[i * n + j] - sum;
      L[i * n + j] = i === j ? Math.sqrt(expr) : (1 / L[j * n + j]) * expr;
    }
  }

  return L;
}

console.log(cholesky([25, 15, -5, 15, 18, 0, -5, 0, 11]));
console.log(cholesky([[18, 22, 54, 42], [22, 70, 86, 62], [54, 86, 174, 134], [42, 62, 134, 106]]));
