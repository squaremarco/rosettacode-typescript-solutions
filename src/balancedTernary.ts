import mapRight from '../utils/mapRight';
import { fill } from 'lodash';

enum Sign {
  ZERO = 0,
  PLUS = 1,
  MINUS = -1
}

//TODO: division support
//TODO: right shift support
//TODO: left shift support
//IDEA: http://www.mortati.com/glusker/fowler/ternary.htm
//IDEA: http://userpages.wittenberg.edu/bshelburne/BalancedTernaryTalkSu09.pdf
//IDEA: http://www.mortati.com/glusker/fowler/ternary.htm

class Ternary {
  constructor(nsa?: number | string | Sign[]) {
    if (nsa) this.setSigns(nsa);
  }

  private signs: Sign[];

  setSigns(nsa: number | string | Sign[]): void {
    if (nsa instanceof Array) {
      this.signs = nsa;
    }
    if (typeof nsa === 'number') {
      this.signs = Ternary.numberToTernary(<number>nsa);
    }
    if (typeof nsa === 'string') {
      this.signs = Ternary.stringToTernary(<string>nsa);
    }
  }

  getSigns(): Sign[] {
    return this.signs;
  }

  toNumber(): number {
    return this.signs.reduce((a, c, i) => a + c * Math.pow(3, i), 0);
  }

  toString(): string {
    return this.signs.reduceRight((a, c) => a + (c === Sign.ZERO ? '0' : c === Sign.PLUS ? '+' : '-'), '');
  }

  mostSignificantSign(): Sign {
    return this.signs[this.signs.length - 1];
  }

  leastSignificantSign(): Sign {
    return this.signs[0];
  }

  isPositive(): boolean {
    return this.mostSignificantSign() === Sign.PLUS;
  }

  isNegative(): boolean {
    return this.mostSignificantSign() === Sign.MINUS;
  }

  isPositiveOrZero(): boolean {
    return !this.isNegative();
  }

  isNegativeOrZero(): boolean {
    return !this.isPositive();
  }

  negate(): Ternary {
    return Ternary.negate(this);
  }

  add(b: Ternary | Sign[]): Ternary {
    return Ternary.add(this, b);
  }

  subtract(b: Ternary | Sign[]): Ternary {
    return Ternary.subtract(this, b);
  }

  multiply(b: Ternary | Sign[]): Ternary {
    return Ternary.multiply(this, b);
  }

  private static negate(ts: Ternary | Sign[]): Ternary {
    let negatedSigns: Sign[] = <Sign[]>(ts instanceof Ternary ? ts.signs : ts).map(el => el * Sign.MINUS || Sign.ZERO);
    return new Ternary(negatedSigns);
  }

  private static add(a: Ternary | Sign[], b: Ternary | Sign[]): Ternary {
    const aa: Sign[] = a instanceof Ternary ? a.signs : a;
    const bb: Sign[] = b instanceof Ternary ? b.signs : b;

    const outputArr: Sign[] = [Sign.ZERO, Sign.PLUS, Sign.MINUS, Sign.ZERO, Sign.PLUS, Sign.MINUS, Sign.ZERO];
    const carryArr: Sign[] = [Sign.MINUS, Sign.MINUS, Sign.ZERO, Sign.ZERO, Sign.ZERO, Sign.PLUS, Sign.PLUS];

    let result: Sign[] = [];
    let carry: Sign = Sign.ZERO;
    let maxLen: number = Math.max(aa.length, bb.length);

    for (let i = 0; i < maxLen; i++) {
      let index: number = (aa[i] || 0) + (bb[i] || 0) + carry + 3;
      carry = carryArr[index];
      result.push(outputArr[index]);
    }
    if (carry !== Sign.ZERO) result.push(carry);

    for (let i = result.length - 1; result[i] === Sign.ZERO; i++) result.pop();

    return new Ternary(result);
  }

  private static subtract(a: Ternary | Sign[], b: Ternary | Sign[]): Ternary {
    return Ternary.add(a, Ternary.negate(b));
  }

  private static multiply(a: Ternary | Sign[], b: Ternary | Sign[]): Ternary {
    const aa: Sign[] = a instanceof Ternary ? a.signs : a;
    const bb: Sign[] = b instanceof Ternary ? b.signs : b;

    let interResults: Sign[][] = [];
    for (let i = 0; i < bb.length; i++) {
      if (bb[i] !== Sign.ZERO) {
        let inter: Sign[] = fill(Array(i), Sign.ZERO);
        for (let j = 0; j < aa.length; j++) {
          inter.push(aa[j] * bb[i]);
        }
        interResults.push(inter);
      }
    }

    return new Ternary(interResults.reduce((acc, curr) => Ternary.add(acc, curr).signs));
  }

  private static numberToTernary(n: number): Sign[] {
    if (n === 0) return [Sign.ZERO];

    let result: Sign[] = [];
    let isPositive: boolean = Math.sign(n) > 0;
    let i: number = Math.abs(n);

    while (i !== 0) {
      let r = i % 3;

      if (r !== 2) {
        result.push(r === 0 ? Sign.ZERO : isPositive ? Sign.PLUS : Sign.MINUS);
      } else {
        result.push(isPositive ? Sign.MINUS : Sign.PLUS);
        i++;
      }

      i = Math.trunc(i / 3);
    }

    return result;
  }

  private static charToSign(c: string): Sign {
    switch (c) {
      case '+':
        return Sign.PLUS;
      case '-':
        return Sign.MINUS;
      case '0':
        return Sign.ZERO;
    }
  }

  private static stringToTernary(s: string): Sign[] {
    if (!s.match(/[^-+0]/g)) {
      return mapRight([...s], Ternary.charToSign);
    }
    return undefined;
  }
}

const a: Ternary = new Ternary('+-0++0+');
const b: Ternary = new Ternary(-436);
const c: Ternary = new Ternary('+-++-');
const op: Ternary = a.multiply(b.subtract(c));
console.log(
  '\n%s\n%s\n%s\n%s',
  `a: (${a} : ${a.toNumber()})`,
  `b: (${b} : ${b.toNumber()})`,
  `c: (${c} : ${c.toNumber()})`,
  `a * (b - c): (${op} : ${op.toNumber()})`
);
