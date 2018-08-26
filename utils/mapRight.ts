export default function mapRight<T, U>(
  array: Array<T>,
  callbackfn: (value: T, index: number, array: Array<T>) => U,
  thisArg?: any
): Array<U> {
  if(thisArg) callbackfn = callbackfn.bind(thisArg);
  return array.reduceRight(
    (accumulator: Array<U>, current: T, index: number, arr: Array<T>) => {
      return (accumulator = accumulator.concat(callbackfn(current, index, arr)));
    },
    <Array<U>>[]
  );
}
