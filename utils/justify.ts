export enum Justify {
  LEFT,
  CENTER,
  RIGHT
}

export function justifyString(string: string, maxChars: number, justify: Justify): string {
  switch (justify) {
    case Justify.LEFT:
      return `${string}${' '.repeat(maxChars - string.length)}`;
    case Justify.RIGHT:
      return `${' '.repeat(maxChars - string.length)}${string}`;
    case Justify.CENTER:
      let diff = maxChars - string.length;
      return `${' '.repeat(Math.floor(diff / 2))}${string}${' '.repeat(Math.ceil(diff / 2))}`;
  }
}
