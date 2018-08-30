import {Justify, justifyString } from '../utils/justify';

function alignColumns(data: string, separator: string, spacing: number, justify: Justify): string {
  const sanitizedData = data.split('\n').map(el => el.replace(/\s/g, '').split(separator));

  const rows: number = sanitizedData.length;

  let maxCols: number = -1;

  for (let i = 0; i < rows; i++) {
    maxCols = Math.max(sanitizedData[i].length, maxCols);
  }

  let maxCharsByCol: number[] = [];

  for (let j = 0; j < maxCols; j++) {
    let max = -1;
    for (let i = 0; i < rows; i++) {
      max = Math.max((sanitizedData[i][j] && sanitizedData[i][j].length) || -1, max);
    }
    maxCharsByCol.push(max + spacing);
  }

  let spacedData: string[][] = [];

  for (let i = 0; i < rows; i++) {
    let array = [];
    for (let j = 0; j < sanitizedData[i].length; j++) {
      array.push(justifyString(sanitizedData[i][j], maxCharsByCol[j], justify));
    }
    spacedData.push(array);
  }

  return spacedData.map(el => el.join('')).join('\n');
}

console.log(
  alignColumns(
    `Given$a$text$file$of$many$lines,$where$fields$within$a$line$
are$delineated$by$a$single$'dollar'$character, $write$a$program
that$aligns$each$column$of$fields$by$ensuring$that$words$in$each$
column$are$separated$by$at$least$one$space.
    Further, $allow$for$each$word$in$a$column$to$be$either$left$
justified, $right$justified, $or$center$justified$within$its$column.`,
    '$',
    5,
    Justify.RIGHT
  )
);
