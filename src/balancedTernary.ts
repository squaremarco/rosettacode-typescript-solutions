import mapRight from '../utils/mapRight';
import { fill } from 'lodash';

enum Sign {
  ZERO = 0,
  PLUS = 1,
  MINUS = -1
}

type SignArray = Array<Sign>;

class Ternary {
  constructor(n?: number);
  constructor(s?: string);
  constructor(a?: SignArray);
  constructor(nsa?: number | string | SignArray) {
    if (nsa instanceof Array) {
      this.setSigns(nsa);
    }
    if (typeof nsa === 'number') {
      this.setSigns(nsa);
    }
    if (typeof nsa === 'string') {
      this.setSigns(nsa);
    }
  }

  private signs: SignArray;

  setSigns(n: number): void;
  setSigns(s: string): void;
  setSigns(a: SignArray): void;
  setSigns(nsa: number | string | SignArray): void {
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

  getSigns(): SignArray {
    return this.signs;
  }

  toNumber(): number {
    return this.getSigns().reduce((a, c, i) => a + c * Math.pow(3, i), 0);
  }

  toString(): string {
    return this.getSigns().reduceRight((a, c) => a + (c === Sign.ZERO ? '0' : c === Sign.PLUS ? '+' : '-'), '');
  }

  static negate(s: SignArray): SignArray;
  static negate(t: Ternary): Ternary;
  static negate(ts: Ternary | SignArray): Ternary | SignArray {
    let map: SignArray = <SignArray>(
      (ts instanceof Ternary ? ts.getSigns() : ts).map(el => el * Sign.MINUS || Sign.ZERO)
    );
    return ts instanceof Ternary ? new Ternary(map) : map;
  }

  static add(a: SignArray, b: SignArray): SignArray;
  static add(a: Ternary, b: Ternary): Ternary;
  static add(a: Ternary | SignArray, b: Ternary | SignArray): Ternary | SignArray {
    const aa: SignArray = a instanceof Ternary ? a.getSigns() : a;
    const bb: SignArray = b instanceof Ternary ? b.getSigns() : b;

    const outputArr: SignArray = [Sign.ZERO, Sign.PLUS, Sign.MINUS, Sign.ZERO, Sign.PLUS, Sign.MINUS, Sign.ZERO];
    const carryArr: SignArray = [Sign.MINUS, Sign.MINUS, Sign.ZERO, Sign.ZERO, Sign.ZERO, Sign.PLUS, Sign.PLUS];

    let result: SignArray = [];
    let carry: Sign = Sign.ZERO;
    let maxLen: number = Math.max(aa.length, bb.length);

    for (let i = 0; i < maxLen; i++) {
      let index: number = (aa[i] || 0) + (bb[i] || 0) + carry + 3;
      carry = carryArr[index];
      result.push(outputArr[index]);
    }
    if (carry !== Sign.ZERO) result.push(carry);

    for (let i = result.length - 1; result[i] === Sign.ZERO; i++) result.pop();

    return a instanceof Ternary ? new Ternary(result) : result;
  }

  static subtract(a: SignArray, b: SignArray): SignArray;
  static subtract(a: Ternary, b: Ternary): Ternary;
  static subtract(a: Ternary | SignArray, b: Ternary | SignArray): Ternary | SignArray {
    if (a instanceof Ternary && b instanceof Ternary) return Ternary.add(a, Ternary.negate(b));
    if (a instanceof Array && b instanceof Array) return Ternary.add(a, Ternary.negate(b));
  }

  static multiply(a: SignArray, b: SignArray): SignArray;
  static multiply(a: Ternary, b: Ternary): Ternary;
  static multiply(a: Ternary | SignArray, b: Ternary | SignArray): Ternary | SignArray {
    const aa: SignArray = a instanceof Ternary ? a.getSigns() : a;
    const bb: SignArray = b instanceof Ternary ? b.getSigns() : b;

    let interResults: Array<SignArray> = [];
    for (let i = 0; i < bb.length; i++) {
      let inter: SignArray = fill(Array(i), Sign.ZERO);
      for (let j = 0; j < aa.length; j++) {
        inter.push(aa[j] * bb[i]);
      }
      interResults.push(inter);
    }

    let result: SignArray = interResults.shift();
    for (let i = 0; i < interResults.length; i++) {
      result = Ternary.add(result, interResults[i]);
    }

    return a instanceof Ternary ? new Ternary(result) : result;
  }


  static divide(a: SignArray, b: SignArray): SignArray;
  static divide(a: Ternary, b: Ternary): Ternary;
  static divide(a: Ternary | SignArray, b: Ternary | SignArray): Ternary | SignArray {
    return new Ternary();
  }

  private static numberToTernary(n: number): SignArray {
    if (n === 0) return [Sign.ZERO];

    let result: SignArray = [];
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

  private static stringToTernary(s: string): SignArray {
    if (!s.match(/[^-+0]/g)) {
      return mapRight([...s], el => {
        switch (el) {
          case '+':
            return Sign.PLUS;
          case '-':
            return Sign.MINUS;
          case '0':
            return Sign.ZERO;
        }
      });
    }
    return undefined;
  }
}

const a: Ternary = new Ternary('+-0++0+');
const b: Ternary = new Ternary(-436);
const c: Ternary = new Ternary('+-++-');
const op: Ternary = Ternary.multiply(a, Ternary.subtract(b, c));
console.log(
  '\n%s\n%s\n%s\n%s',
  `a: (${a} : ${a.toNumber()})`,
  `b: (${b} : ${b.toNumber()})`,
  `c: (${c} : ${c.toNumber()})`,
  `a * (b - c): (${op} : ${op.toNumber()})`
);