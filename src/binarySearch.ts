function recursiveBinarySearch(
  array: number[],
  value: number,
  low: number = 0,
  high: number = array.length - 1,
  findInsertionIndex: boolean = false
): number {
  if (high < low) return findInsertionIndex ? low : -1;
  const mid: number = low + Math.floor((high - low) / 2);
  if (array[mid] > value) return recursiveBinarySearch(array, value, low, mid - 1);
  if (array[mid] < value) return recursiveBinarySearch(array, value, mid + 1, high);
  return mid;
}

function iterativeBinarySearch(array: number[], value: number, findInsertionIndex: boolean = false): number {
  let low = 0;
  let high = array.length - 1;
  while (low <= high) {
    let mid = low + Math.floor((high - low) / 2);
    if (array[mid] === value) return mid;
    if (array[mid] > value) high = mid - 1;
    else low = mid + 1;
  }
  return findInsertionIndex ? low : -1;
}
