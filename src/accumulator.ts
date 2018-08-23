function accumulator(startValue: number): (value: number) => number {
  let sum = startValue;
  return (n: number): number => (sum += n);
}

let x = accumulator(1);
console.log(x(5));
accumulator(3); //does nothing
console.log(x(2.8));
