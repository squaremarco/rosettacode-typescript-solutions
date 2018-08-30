import { BigNumber } from 'bignumber.js';

const precision: number = 200;
BigNumber.config({
  DECIMAL_PLACES: precision,
  EXPONENTIAL_AT: precision
});

function bernoulli(n: number): BigNumber {
  const one: BigNumber = new BigNumber(1);

  let a: BigNumber[] = <BigNumber[]>new Array(n + 1);
  for (let m = 0; m <= n; m++) {
    a[m] = one.div(new BigNumber(m + 1));
    for (let j = m; j >= 1; j--) {
      a[j - 1] = new BigNumber(j).times(a[j - 1].minus(a[j]));
    }
  }
  
  return a[0];
}

//number precision breaks after 25th Brnoulli's number
for (let i = 0; i <= 60; i++) {
  let b: string[] = bernoulli(i).toFraction(new BigNumber(`10e${precision / 4}`));
  if (b[0] !== '0') console.log(`B(${i}) = ${b[0]} / ${b[1]}`);
}
