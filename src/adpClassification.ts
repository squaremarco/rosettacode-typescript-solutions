import { properDivisors } from '../utils/divisors';

function ADPClassification(range: number): Array<number> {
  let [a, p, d] = [0, 0, 0];
  for (let i = 2; i <= range; i++) {
    let ds: number = properDivisors(i).reduce((a, v) => a + v);
    if (ds > i) a++;
    if (ds === i) p++;
    if (ds < i) d++;
    console.log(ds, i, [a, p, d]);
  }
  return [a, p, d];
}

console.log(ADPClassification(20000));
