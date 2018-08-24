/**
 * TODO: FIX NUMBER PRECISION
 */
import { fraction, Fraction, subtract, multiply, format } from 'mathjs';

function bernoulli(n: number): Fraction {
  let a: Array<Fraction> = new Array(n + 1);
  for (let m = 0; m <= n; m++) {
    a[m] = <Fraction>fraction(1, m + 1);
    for (let j = m; j >= 1; j--) {
      a[j - 1] = <Fraction>multiply(j, subtract(a[j - 1], a[j]));
    }
  }
  return a[0];
}

//number precision breaks after 25th Brnoulli's number
for (let i = 0; i <= 60; i++) {
  let b: Fraction = bernoulli(i);
  if (b.n !== 0) console.log(`B(${i}) = ${format(b, { fraction: 'ratio' })}`);
}
