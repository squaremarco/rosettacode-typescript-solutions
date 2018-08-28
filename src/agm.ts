import { BigNumber } from 'bignumber.js';

const precision: number = 1000;
BigNumber.config({
  DECIMAL_PLACES: precision
});

export function agmPI(tolerance: BigNumber = new BigNumber(`10e-${precision}`)): BigNumber {
  const oneHalf = new BigNumber(0.5)
  const one = new BigNumber(1);
  const two = new BigNumber(2);
  const four = new BigNumber(4);

  let a0: BigNumber = one;
  let g0: BigNumber = one.div(two.sqrt());
  let c0: BigNumber = oneHalf.times(a0.minus(g0));
  let agm0: BigNumber = agm(a0, g0, tolerance);

  let [an, gn, cn] = [a0, g0, c0];
  let sum: BigNumber = two.pow(2).times(c0.pow(2));

  for (let i = 2; an.minus(gn).gt(tolerance); i++) {
    [an, gn] = [oneHalf.times(an.plus(gn)), an.times(gn).sqrt()];
    cn = oneHalf.times(an.minus(gn));
    sum = sum.plus(two.pow(i+1).times(cn.pow(2)));
  }

  return four.times(agm0.pow(2)).div(one.minus(sum));
}

export default function agm(
  a: BigNumber | number,
  g: BigNumber | number,
  tolerance: BigNumber = new BigNumber(`10e-${precision}`)
): BigNumber {
  let oneHalf: BigNumber = new BigNumber(0.5);

  let an: BigNumber = a instanceof BigNumber ? a : new BigNumber(a);
  let gn: BigNumber = g instanceof BigNumber ? g : new BigNumber(g);
  if (!an.isPositive() || !gn.isPositive() || an.lt(gn)) return new BigNumber(-1);
  while (an.minus(gn).gt(tolerance)) {
    [an, gn] = [oneHalf.times(an.plus(gn)), an.times(gn).sqrt()];
  }

  return an;
}

console.log('\n%s\n\n%s\n\n', agm(1, 1 / 2 ** (1 / 2)), agmPI());
