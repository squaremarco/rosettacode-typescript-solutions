function binToDecimalIterative(b: string): number {
  if (b.match(/[^01]/g)) return -1;
  let result: number = 0;

  for (let i = 0; i < b.length; i++) {
    result = result + parseInt(b[i]) * Math.pow(2, b.length - i - 1);
  }

  return result;
}

function binDigitsIterative(n: number): string {
  let result: string[] = [];
  let i: number = n;

  do {
    result.unshift(`${i % 2}`);
    i = Math.trunc(i / 2);
  } while (i !== 0);

  return result.join('');
}

function binToDecimal(b: string): number {
  if (b.match(/[^01]/g)) return -1;
  
  return parseInt(b, 2);
}

function binDigits(n: number): string {
  return n.toString(2);
}

for (let i = 0; i < Math.pow(2, 5); i++) {
  let string: string = binDigits(i);
  console.log(`${binToDecimal(string)} <-> ${string}`);
}
