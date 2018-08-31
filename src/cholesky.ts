import { flatten } from 'lodash';
import Complex from '@iamsquare/complex.js';

function choleskyComplex(array: Complex[] | Complex[][]) {
  const flattenArray: Complex[] = <Complex[]>flatten(array);
  const n: number = Math.sqrt(flattenArray.length);

  if (n % 1 !== 0) throw new Error('Not a squared matrix');

  let L: Complex[] = <Complex[]>Array(n * n).fill(Complex.ZERO);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i + 1; j++) {
      let sum: Complex = Complex.ZERO;

      for (let k = 0; k < j; k++) {
        sum = sum.plus(L[i * n + k].times(L[j * n + k].conjugate()));
      }

      let expr: Complex = flattenArray[i * n + j].minus(sum);
      L[i * n + j] = i === j ? expr.sqrt() : L[j * n + j].inverse().times(expr);
    }
  }

  return L;
}

function cholesky(array: number[] | number[][]) {
  const flattenArray = flatten(array);
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

console.log(cholesky([1, 1, 1, 1, 1, 1, 1, 1, 1]));
console.log(choleskyComplex([1, 1, 1, 1, 1, 1, 1, 1, 1].map(e => new Complex(e, 0))));
console.log(
  choleskyComplex([18, 22, 54, 42, 22, 70, 86, 62, 54, 86, 174, 134, 42, 62, 134, 106].map(e => new Complex(e, 0)))
);
