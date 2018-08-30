//TODO: test and eventually fix precision errors

type Cartesian = {
  x: number;
  y: number;
};

function isCartesian(x: any): x is Cartesian {
  return x.x !== undefined && x.y !== undefined;
}

type Polar = {
  r: number;
  p: number;
};

function isPolar(x: any): x is Polar {
  return x.r !== undefined && x.p !== undefined;
}

export default class Complex {
  constructor(c: Cartesian);
  constructor(p: Polar);
  constructor(a: number[]);
  constructor(re: number, im?: number);
  constructor(r: number | Polar | Cartesian | number[], i?: number) {
    if (isCartesian(r)) {
      this.re = r.x;
      this.im = r.y;
    } else if (isPolar(r)) {
      this.re = r.r * Math.cos(r.p);
      this.im = r.r * Math.sin(r.p);
    } else if (r instanceof Array) {
      this.re = r[0] || 0;
      this.im = r[1] || 0;
    } else {
      this.re = r || 0;
      this.im = i || 0;
    }
  }

  private re: number;
  private im: number;

  getRe(): number {
    return this.re;
  }

  getIm(): number {
    return this.im;
  }

  modulus(): number {
    let m: number = this.re * this.re + this.im * this.im;

    return Math.sqrt(m);
  }

  argument(): number {
    return Math.atan2(this.im, this.re);
  }

  isZero(): boolean {
    return this.equals(Complex.ZERO);
  }

  isInfinite(): boolean {
    return this.equals(Complex.INFINITY);
  }

  isNaN(): boolean {
    return isNaN(this.re) || isNaN(this.im);
  }

  isReal(): boolean {
    return Math.abs(this.im) <= Complex.EPSILON;
  }

  negate(): Complex {
    return new Complex(-this.re, -this.im);
  }

  conjugate(): Complex {
    return new Complex(this.re, -this.im);
  }

  inverse(): Complex {
    if (this.isZero()) return Complex.INFINITY;
    if (this.isInfinite()) return Complex.ZERO;

    let d: number = this.re * this.re + this.im * this.im;

    return new Complex(this.re / d, -this.im / d);
  }

  unit(): Complex {
    const m: number = this.modulus();

    return new Complex(this.re / m, this.im / m);
  }

  sqrt(): Complex {
    const a: number = Math.SQRT1_2; //0.5 * sqrt(2)
    const m: number = this.modulus();
    const is: number = this.im >= 0 ? 1 : -1;
    
    return new Complex(a * Math.sqrt(m + this.re), a * is * Math.sqrt(m - this.re));
  }

  exp(): Complex {
    if (this.im === Infinity || this.isInfinite()) return Complex.NAN;
    if (this.isZero()) return Complex.ONE;
    if (this.isReal()) return new Complex(Math.exp(this.re), 0);

    return new Complex({ r: Math.exp(this.re), p: this.im });
  }

  log(): Complex {
    return new Complex(Math.log(this.modulus()), this.argument());
  }

  plus(z: Complex): Complex {
    if (this.isInfinite() && z.isInfinite()) return Complex.NAN;
    if (this.isInfinite() || z.isInfinite()) return Complex.INFINITY;

    return new Complex(this.re + z.re, this.im + z.im);
  }

  minus(z: Complex): Complex {
    return this.plus(z.negate());
  }

  times(z: Complex): Complex {
    if ((this.isZero() && z.isInfinite()) || (this.isInfinite() && z.isZero())) return Complex.NAN;
    if (this.isInfinite() || z.isInfinite()) return Complex.INFINITY;
    if (this.isReal() && z.isReal()) return new Complex(this.re * z.re, 0);

    return new Complex(this.re * z.re - this.im * z.im, this.re * z.im + this.im * z.re);
  }

  divide(z: Complex): Complex {
    if ((this.isZero() && z.isZero()) || (this.isInfinite() && z.isInfinite())) return Complex.NAN;
    if (this.isInfinite() || z.isZero()) return Complex.INFINITY;
    if (this.isZero() || z.isInfinite()) return Complex.ZERO;

    let d: number = z.re * z.re + z.im * z.im;
    return new Complex((this.re * z.re + this.im * z.im) / d, (this.im * z.re + this.re * z.im) / d);
  }

  equals(z: Complex): boolean {
    if ((this.re === Infinity && z.re === Infinity) || (this.im === Infinity && z.im === Infinity)) return true;
    if (this.isNaN() || z.isNaN()) return false;

    return Math.abs(this.re - z.re) <= Complex.EPSILON && Math.abs(this.im - z.im) <= Complex.EPSILON;
  }

  notEquals(z: Complex): boolean {
    return !this.equals(z);
  }

  toString(): string {
    if (this.isNaN()) return 'NaN';
    if (this.isInfinite()) return 'Infinite';
    if (this.isZero()) return '0';

    let re: string = this.re !== 0 || this.isReal() ? `${this.re}` : '';
    let im: string = !this.isReal() ? `${Math.abs(this.im)} i` : '';
    let i: string = !this.isReal() ? (Math.sign(this.im) ? ' + ' : ' - ') : '';

    return `${re}${i}${im}`;
  }

  toCartesian(): Cartesian {
    let x = Math.abs(this.re) > Complex.EPSILON ? this.re : 0;
    let y = Math.abs(this.im) > Complex.EPSILON ? this.im : 0;
    return { x, y };
  }

  toPolar(): Polar {
    return { r: this.modulus(), p: this.argument() };
  }

  static ZERO: Complex = new Complex(0, 0);
  static ONE: Complex = new Complex(1, 0);
  static I: Complex = new Complex(0, 1);
  static PI: Complex = new Complex(Math.PI, 0);
  static E: Complex = new Complex(Math.E, 0);
  static INFINITY: Complex = new Complex(Infinity, Infinity);
  static NAN: Complex = new Complex(NaN, NaN);
  static EPSILON: number = 10e-17; //javascript maximum decimal resolution
}
