function arithmeticMean(arr: Array<number>): number {
  if (!arr.length) return NaN;
  return arr.reduce((a, c) => a + c, 0) / arr.length;
}

function geometricMean(arr: Array<number>): number {
  if (!arr.length) return NaN;
  return arr.reduce((a, c) => a * c, 1) ** (1 / arr.length);
}

function harmonicMean(arr: Array<number>): number {
  if (!arr.length) return NaN;
  return arr.length / arr.reduce((a, c) => a + 1 / c, 0);
}

//root mean square
function rms(arr: Array<number>): number {
  if (!arr.length) return NaN;
  return (arr.reduce((a, c) => a ** 2 + c ** 2, 0) / arr.length) ** (1 / 2);
}

//mean, variance, stdev
function mvs(arr: Array<number>): { m: number; v: number; s: number } {
  if (!arr.length) return { m: NaN, v: NaN, s: NaN };
  let m: number = arithmeticMean(arr);
  let v: number = arr.reduce((a, c) => a + (c - m) ** 2, 0) / arr.length;
  let s: number = Math.sqrt(v);
  return { m, v, s };
}

//sampled mvs
function smvs(arr: Array<number>): { m: number; v: number; s: number } {
  if (!arr.length) return { m: NaN, v: NaN, s: NaN };
  let m: number = arithmeticMean(arr);
  let v: number = arr.reduce((a, c) => a + (c - m) ** 2, 0) / (arr.length - 1);
  let s: number = Math.sqrt(v);
  return { m, v, s };
}

//cumulative mvs
function cmvs(): (n?: number) => { m: number; v: number; s: number } {
  let count: number = 0;
  let sum: number = 0;
  let sumSquares: number = 0;
  let m: number = 0;
  let v: number = 0;
  let s: number = 0;

  return (n?: number) => {
    if (typeof n !== 'undefined') {
      sum += n;
      sumSquares += n * n;
      count++;
      m = sum / count;
      v = sumSquares / count - m * m;
      s = Math.sqrt(v);
    }

    return { m, v, s };
  };
}

//simple moving average
function smv(period: number): (value?: number) => { m: number; stream: Array<number> } {
  if (period < 1) throw new Error('NonPositivePeriod');
  if (period % 1 !== 0) throw new Error('NonIntegerPeriod');
  
  const P: number = period;
  let sum: number = 0;
  let m: number = 0;
  let stream: Array<number> = [];

  return (n?: number): { m: number; stream: Array<number> } => {
    if (typeof n === 'undefined') return { m, stream };
    stream.push(n);
    sum += n;
    if (stream.length > P) {
      sum -= stream.shift();
      m = sum / P;
    } else {
      m = sum / stream.length;
    }
    return { m, stream };
  };
}

function mode(arr: Array<number>): number | Array<number> {
  const countIterable: IterableIterator<[number, number]> = arr
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

function median(arr: Array<number>): number {
  let arrCopy = [...arr].sort();
  let index = arrCopy.length / 2;
  if (arrCopy.length % 2 === 0) return (arrCopy[index] + arrCopy[index - 1]) / 2;
  return arrCopy[Math.floor(index)];
}
