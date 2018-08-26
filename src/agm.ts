import { config, format, add, multiply, subtract, divide, sqrt, pow } from 'mathjs'; //operators
import { BigNumber, bignumber } from 'mathjs'; //types

const precision: number = 1000;
config({
  precision
});

export function agmPI(tolerance: BigNumber = bignumber(`10E-${precision}`)): BigNumber {
  let a0: BigNumber = bignumber(1);
  let g0: BigNumber = bignumber(1 / sqrt(2));
  let c0: BigNumber = <BigNumber>multiply(bignumber(0.5), subtract(a0, g0));
  let agm0: BigNumber = agm(a0, g0, tolerance);

  let [an, gn, cn] = [a0, g0, c0];
  let sum: BigNumber = <BigNumber>multiply(pow(bignumber(2), 2), pow(c0, 2));

  for (let i = 2; (<BigNumber>subtract(an, gn)).gt(tolerance); i++) {
    [an, gn] = [<BigNumber>multiply(bignumber(0.5), add(an, gn)), <BigNumber>sqrt(<BigNumber>multiply(an, gn))];
    cn = <BigNumber>multiply(bignumber(0.5), subtract(an, gn));
    sum = <BigNumber>add(sum, multiply(pow(bignumber(2), i + 1), pow(cn, 2)));
  }

  return <BigNumber>divide(multiply(bignumber(4), pow(agm0, 2)), subtract(bignumber(1), sum));
}

export default function agm(
  a: BigNumber | number,
  g: BigNumber | number,
  tolerance: BigNumber = bignumber(`10E-${precision}`)
): BigNumber {
  let an: BigNumber = typeof a === 'number' ? bignumber(a) : a;
  let gn: BigNumber = typeof g === 'number' ? bignumber(g) : g;
  if (!an.isPos() || !gn.isPos() || an.lt(gn)) return bignumber(-1);
  while ((<BigNumber>subtract(an, gn)).gt(tolerance)) {
    [an, gn] = [<BigNumber>multiply(bignumber(0.5), add(an, gn)), <BigNumber>sqrt(<BigNumber>multiply(an, gn))];
  }
  return an;
}

console.log(
  '\n%s\n\n%s\n\n%s\n\n',
  format(agm(1, 1 / 2 ** (1 / 2))),
  format(agm(bignumber(24), bignumber(6))),
  format(agmPI())
);
