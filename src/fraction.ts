//TODO: create from string, float
//IDEA: https://www.ics.uci.edu/~eppstein/numth/frap.c

class Fraction {
  constructor(n: number, d?: number) {
    if (n === 0 && d === 0) throw new Error('Zero divided by Zero');
    if (d === 0) throw new Error('Divide by Zero');
    if (typeof d === 'undefined' || n === 0) {
      this.n = n;
      this.d = 1;
    } else if (d < 0) {
      this.n = -n;
      this.d = -d;
    } else {
      this.n = n;
      this.d = d;
    }
  }

  private n: number;
  private d: number;

  getFraction(): { n: number; d: number } {
    return { n: this.n, d: this.d };
  }

  getNumerator(): number {
    return this.n;
  }

  getDenominator(): number {
    return this.d;
  }

  toString(): string {
    return `${this.n} / ${this.d}`;
  }

  toFloat(): number {
    return this.n / this.d;
  }

  toInteger(): number {
    return Math.floor(this.toFloat());
  }

  normalize(): Fraction {
    let a: number = this.n;
    let b: number = this.d;

    //gcd(a, b)
    while (b !== 0) {
      [a, b] = [b, a % b];
    }

    this.n /= a;
    this.d /= a;
    return this;
  }

  abs(): Fraction {
    return new Fraction(Math.abs(this.n), this.d);
  }

  negate(): Fraction {
    return new Fraction(-this.n, this.d);
  }

  reciprocal(): Fraction {
    return new Fraction(this.d, this.n);
  }

  add(b: Fraction): Fraction {
    if (this.d === b.d) return new Fraction(this.n + b.n, this.d).normalize();
    return new Fraction(this.n * b.d + b.n * this.d, this.d * b.d).normalize();
  }

  subtract(b: Fraction): Fraction {
    return this.add(b.negate());
  }

  multiply(b: Fraction): Fraction {
    return new Fraction(this.n * b.n, this.d * b.d).normalize();
  }

  divide(b: Fraction): Fraction {
    return this.multiply(b.reciprocal());
  }

  intDivide(b: Fraction): number {
    return this.divide(b).toInteger();
  }

  //From this formula: http://www.wolframalpha.com/input/?i=%5Cfrac%7Bn1%7D%7Bd1%7D+mod+%5Cfrac%7Bn2%7D%7Bd2%7D
  mod(b: Fraction): Fraction {
    return this.subtract(b.multiply(new Fraction(this.intDivide(b)))).normalize();
  }

  eq(b: Fraction): boolean {
    return this.n === b.n && this.d === b.d;
  }

  neq(b: Fraction): boolean {
    return !this.eq(b);
  }

  lt(b: Fraction): boolean {
    return this.subtract(b).toFloat() < 0;
  }

  gt(b: Fraction): boolean {
    return this.subtract(b).toFloat() > 0;
  }

  lte(b: Fraction): boolean {
    return this.eq(b) && this.lt(b);
  }

  gte(b: Fraction): boolean {
    return this.eq(b) && this.gt(b);
  }
}


const max = 1 << 19;
for(let i = 2; i < max; i++){
  let sum : Fraction = new Fraction(1, i);
  const maxsqrt = Math.sqrt(i);
  for(let j = 2; j <= maxsqrt; j++){
    if(i % j === 0){
      sum = sum.add(new Fraction(1, j)).add(new Fraction(1, i / j));
    }
  }
  if(sum.toFloat() === 1) console.log(`${i} is perfect`);
}
