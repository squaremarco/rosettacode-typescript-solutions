function arithmeticMean(n: Array<number>): number {
  if (!n.length) return NaN;
  return n.reduce((a, c) => a + c, 0) / n.length;
}

function geometricMean(n: Array<number>): number {
  if (!n.length) return NaN;
  return n.reduce((a, c) => a * c, 1) ** (1 / n.length);
}

function harmonicMean(n: Array<number>): number {
  if (!n.length) return NaN;
  return n.length / n.reduce((a, c) => a + 1 / c, 0);
}

//root mean square
function rms(n: Array<number>): number {
  if (!n.length) return NaN;
  return (n.reduce((a, c) => a ** 2 + c ** 2, 0) / n.length) ** (1 / 2);
}

//mean, variance, stdev
function mvs(n: Array<number>): { m: number; v: number; s: number } {
  if (!n.length) return { m: NaN, v: NaN, s: NaN };
  let m: number = arithmeticMean(n);
  let v: number = n.reduce((a, c) => a + (c - m) ** 2, 0) / n.length;
  let s: number = v ** (1 / 2);
  return { m, v, s };
}

//sampled mvs
function smvs(n: Array<number>): { m: number; v: number; s: number } {
  if (!n.length) return { m: NaN, v: NaN, s: NaN };
  let m: number = arithmeticMean(n);
  let v: number = n.reduce((a, c) => a + (c - m) ** 2, 0) / (n.length - 1);
  let s: number = v ** (1 / 2);
  return { m, v, s };
}

//simple moving average
function smv(period: number): (value: number) => number {
  if (period <= 0) throw new Error('NotPositivePeriod');
  let P: number = period;
  let sum: number = 0;
  let avg: number = 0;
  let stream: Array<number> = [];
  return (n: number): number => {
    stream.push(n);
    sum += n;
    if (stream.length > P) {
      sum -= stream.shift();
      avg = sum / P;
    } else {
      avg = sum / stream.length;
    }
    return avg;
  };
}

function mode(n: Array<number>): number | Array<number> {
  let countIterable: IterableIterator<[number, number]> = n
    .reduce((a, c) => {
      if (!a.has(c)) return a.set(c, 1);
      return a.set(c, a.get(c) + 1);
    }, new Map<number, number>())
    .entries();

  let maxCount: number = -1;
  let result: Array<number> = [];
  for (let el of countIterable) {
    if (el[1] === maxCount) {
      result.push(el[0]);
    }
    if (el[1] > maxCount) {
      maxCount = el[1];
      result.length = 0;
      result.push(el[0]);
    }
  }
  return result.length === 1 ? result[0] : result;
}

function median(n: Array<number>): number {
  let arr = [...n].sort();
  let index = arr.length / 2;
  if (n.length % 2 === 0) return (n[index] + n[index - 1]) / 2;
  return n[Math.floor(index)];
}
