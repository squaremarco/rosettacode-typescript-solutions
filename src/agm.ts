import { config, add, multiply, subtract, divide, sqrt, pow } from 'mathjs'; //operators
import { BigNumber, bignumber } from 'mathjs'; //types

const precision: number = 64;
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

export default function agm(a: BigNumber, g: BigNumber, tolerance: BigNumber = bignumber(`10E-${precision}`)): BigNumber {
  if (!a.isPos() || !g.isPos() || a.lt(g)) return bignumber(-1);
  let an: BigNumber = a;
  let gn: BigNumber = g;
  while ((<BigNumber>subtract(an, gn)).gt(tolerance)) {
    [an, gn] = [<BigNumber>multiply(bignumber(0.5), add(an, gn)), <BigNumber>sqrt(<BigNumber>multiply(an, gn))];
  }
  return an;
}



//console.log(format(agm(bignumber(1), bignumber(1 / sqrt(2)))));
//console.log(format(agm(bignumber(24), bignumber(6))));
