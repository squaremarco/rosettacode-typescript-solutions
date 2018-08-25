import mapRight from '../utils/mapRight';

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
      this.signs = [...nsa].reverse();
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

  negate(): Ternary {
    return new Ternary(mapRight(this.getSigns(), el => el * Sign.MINUS || Sign.ZERO));
  }

  add(b: Ternary): Ternary {
    const aa: SignArray = this.getSigns();
    const bb: SignArray = b.getSigns();

    const outputArr: SignArray = [Sign.ZERO, Sign.PLUS, Sign.MINUS, Sign.ZERO, Sign.PLUS, Sign.MINUS, Sign.ZERO];
    const carryArr: SignArray = [Sign.MINUS, Sign.MINUS, Sign.ZERO, Sign.ZERO, Sign.ZERO, Sign.PLUS, Sign.PLUS];

    let result: SignArray = [];
    let carry: Sign = Sign.ZERO;
    let maxLen: number = Math.max(aa.length, bb.length);

    for (let i = 0; i < maxLen; i++) {
      let index: number = (aa[i] || 0) + (bb[i] || 0) + carry + 3;
      carry = carryArr[index];
      result.unshift(outputArr[index]);
    }
    if (carry !== Sign.ZERO) result.unshift(carry);

    for (let i = 0; result[i] === Sign.ZERO; i++) result.shift();

    return new Ternary(result);
  }

  subtract(b: Ternary): Ternary {
    return this.add(b.negate());
  }

  private static numberToTernary(n: number): SignArray {
    if (n === 0) return [Sign.ZERO];

    let result: SignArray = [];
    let isPos: boolean = Math.sign(n) > 0;
    let i: number = Math.abs(n);

    while (i !== 0) {
      let r = i % 3;

      if (r !== 2) {
        result.push(r === 0 ? Sign.ZERO : isPos ? Sign.PLUS : Sign.MINUS);
      } else {
        result.push(isPos ? Sign.MINUS : Sign.PLUS);
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

let t1: Ternary = new Ternary(22);
let t2: Ternary = new Ternary(2); //13
console.log(`t1: ${t1}, t2: ${t2}, t1+t2: ${t1.add(t2)}, t1-t2: ${t1.subtract(t2)}, t2-t1: ${t2.subtract(t1)}`);

let t3: Ternary = new Ternary();
console.log(t3);
