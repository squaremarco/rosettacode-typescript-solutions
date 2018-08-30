const BABBAGE: number = 269696;
function babbage(): number[] {
  let n: number = Math.trunc(Math.sqrt(BABBAGE));

  while (Math.pow(n, 2) % 1000000 !== BABBAGE) {
    n++;
  }
  return [n, n * n];
}

function babbageList(testN: number): number[][] {
  const res = Array.from({ length: testN }, (v, i) => i * 1000000 + BABBAGE)
    .filter(n => {
      const root = Math.sqrt(n);
      return root === Math.floor(root);
    })
    .map(n => [Math.sqrt(n), n]);
  return res;
}

console.log(babbage());
console.log(babbageList(10e3)); // 10^5 numbers ending in BABBAGE
