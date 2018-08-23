import { fill } from 'lodash';

import { NOTIFY } from '../utils/colors';

function oneUndredDoors(): Array<number> {
  let doors: Array<boolean> = fill(Array(100), false);
  for (let i = 1; i <= 100; i++) {
    for (let j = i - 1; j < 100; j += i) {
      doors[j] = !doors[j];
    }
  }
  return doors
    .map((item, index) => (item ? index + 1 : -1))
    .filter(item => item > 0);
}

console.log(NOTIFY(`The open doors are: ${oneUndredDoors()}`));
