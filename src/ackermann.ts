function ackermann(m: number, n: number): number {
  if (m === 0) return n + 1;
  if (n === 0) return ackermann(m - 1, 1);
  if (n > 0 && m > 0) return ackermann(m - 1, ackermann(m, n - 1));
}

function ackermannOneliner(m: number, n: number): number {
  return m === 0 ? n + 1 : ackermann(m - 1, n === 0 ? 1 : ackermann(m, n - 1));
}

console.log(ackermann(3, 4));
console.log(ackermannOneliner(3, 2));
console.log(ackermannOneliner(4, 3)); //it wiil throw a RangeError if stack_size is not increased, it can't display the value anyway
