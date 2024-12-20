import {type Coords} from '../utils/grid.js';

export type Input = {map: Array<Array<'.' | '#'>>; start: Coords; end: Coords};

export default (input: string): Input => {
  const map = input
    .trim()
    .split('\n')
    .map((line) => line.split(''));
  let start: Coords;
  let end: Coords;
  for (const [y, element] of map.entries()) {
    for (let x = 0; x < element.length; x++) {
      if (element[x] === '.' || element[x] === '#') continue;
      if (element[x] === 'S') start = {x, y};
      if (element[x] === 'E') end = {x, y};
      element[x] = '.';
    }
  }

  return {map: map as Array<Array<'.' | '#'>>, start: start!, end: end!};
};
