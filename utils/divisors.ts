export function naiveDivisors(value: number): number[] {
  let divisors:number[]=[];
  for(let i = 1; i <= value; i++){
    if(value % i === 0) divisors.push(i);
  }
  return divisors;
}

export function divisors(value: number): number[] {
  let low: number[] = [];
  let high: number[] = [];
  for (let i = 1; i <= Math.sqrt(value); i++) {
    if (value % i === 0){
      if(value / i === i){
        low.push(i);
      } else {
        low.push(i);
        high.unshift(value/i);
      }
    }
  }
  return [...low,...high];
}

export function properDivisors(value: number): number[] {
  if (value <= 1) return [];
  let proper: number[]= divisors(value);
  proper.pop();
  return proper;
}

export function restrictedDivisors(value: number): number[] {
  if(value <= 2) return [];
  let restricted: number[] = divisors(value);
  restricted.shift();
  return restricted;
}

