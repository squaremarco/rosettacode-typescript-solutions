type Cartesian = {
  x: number;
  y: number;
};

type Polar = {
  r: number;
  p: number;
};

function isCartesian(x: any): x is Cartesian {
  return x.x !== undefined && x.y !== undefined;
}

function isPolar(x: any): x is Polar {
  return x.r !== undefined && x.p !== undefined;
}

class Complex {
  constructor(c: Cartesian);
  constructor(p: Polar);
  constructor(a: Array<number>);
  constructor(re: number, im?: number);
  constructor(r: number | Polar | Cartesian | Array<number>, i?: number) {
    if (isCartesian(r)) {
      this.re = r.x;
      this.im = r.y;
    } else if (isPolar(r)) {
      this.re = r.r * Math.cos(r.p);
      this.im = r.r * Math.sin(r.p);
    } else if (r instanceof Array) {
      this.re = r[0];
      this.im = r[1];
    } else {
      this.re = r;
      this.im = i;
    }
  }

  private re: number;
  private im: number;

  setRe(n: number): void {
    this.re = n;
  }
  setIm(n: number): void {
    this.im = n;
  }

  getRe(): number {
    return this.re;
  }

  getIm(): number {
    return this.im;
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

  negate(): Complex {
    return new Complex(-this.re, -this.im);
  }

  conjugate(): Complex {
    return new Complex(this.re, -this.im);
  }

  modulus(): number {
    return Math.sqrt(this.re * this.re + this.im * this.im);
  }

  argument(): number {
    return Math.atan2(this.im, this.re);
  }

  inverse(): Complex {
    if (this.isZero()) return Complex.INFINITY;
    if (this.isInfinite()) return Complex.ZERO;

    let d: number = this.re * this.re + this.im * this.im;

    return new Complex(this.re / d, -this.im / d);
  }

  sign(): Complex {
    let m: number = this.modulus();

    return new Complex(this.re / m, this.im / m);
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
    if (this.im === 0 && z.im === 0) return new Complex(this.re * z.re, 0);

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
    return Math.abs(this.re - z.re) <= Complex.EPSILON && Math.abs(this.im - z.im) <= Complex.EPSILON;
  }

  notEquals(z: Complex): boolean {
    return !this.equals(z);
  }

  toString(): string {
    if (this.isNaN()) return 'NaN';
    if (this.isInfinite()) return 'Infinite';
    if (this.isZero()) return '0';

    let re: string = this.re !== 0 || this.im === 0 ? `${this.re}` : '';
    let im: string = this.im !== 0 ? `${Math.abs(this.im)}` : '';
    let i: string = this.im !== 0 ? (this.im > 0 ? ' + i ' : ' - i ') : '';

    return `${re}${i}${im}`;
  }

  toCartesian(): Cartesian {
    return { x: this.re, y: this.im };
  }

  toPolar(): Polar {
    return { r: this.modulus(), p: Math.atan2(this.im, this.re) };
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
