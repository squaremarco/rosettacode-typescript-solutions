export default function mapRight<T, U>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => U,
  thisArg?: any
): U[] {
  if (typeof thisArg !== 'undefined') callbackfn = callbackfn.bind(thisArg);
  return array.reduceRight((accumulator: U[], current: T, index: number, arr: T[]) => {
    return (accumulator = accumulator.concat(callbackfn(current, index, arr)));
  }, []);
}
