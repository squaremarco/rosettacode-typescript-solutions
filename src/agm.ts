import { config, format, add, multiply, subtract, sqrt } from 'mathjs'; //operators
import { BigNumber, bignumber } from 'mathjs'; //types

const precision: number = 64;
config({
  precision
});

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
