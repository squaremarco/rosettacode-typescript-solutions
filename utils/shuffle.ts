import { random } from 'lodash';
export default function shuffle<T>(input: Array<T>): Array<T> {
  let a: Array<T> = [].concat(input);

  for (let i = 0; i < a.length; i++) {
    let last = a.length - i - 1;
    let rand = random(0, last);
    if (rand !== last) [a[rand], a[last]] = [a[last], a[rand]];
  }

  return a;
}
