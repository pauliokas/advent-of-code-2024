import {type Coords, type Grid} from './day04.input.js';

const getWord = (grid: Grid, start: Coords, direction: Coords, length: number): string => {
  const height = grid.length;
  const width = grid[0].length;

  let word = '';
  let current = start;
  for (let i = 0; i < length; i++) {
    current = {x: start.x + i * direction.x, y: start.y + i * direction.y};
    if (current.x < 0 || current.x >= width || current.y < 0 || current.y >= height) return '';

    word += grid[current.y][current.x];
  }

  return word;
};

export const solvePart1 = (grid: Grid): number => {
  const height = grid.length;
  const width = grid[0].length;

  const searchDirections = [
    {x: +1, y: +0},
    {x: -1, y: +0},
    {x: +0, y: -1},
    {x: +0, y: +1},
    {x: +1, y: +1},
    {x: +1, y: -1},
    {x: -1, y: +1},
    {x: -1, y: -1},
  ];

  let count = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      for (const direction of searchDirections) {
        const word = getWord(grid, {x, y}, direction, 4);
        if (word === 'XMAS') count += 1;
      }
    }
  }

  return count;
};

export const solvePart2 = (grid: Grid): number => {
  const height = grid.length;
  const width = grid[0].length;

  let count = 0;
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      if (grid[y][x] !== 'A') continue;

      const diag1 = getWord(grid, {x: x - 1, y: y - 1}, {x: +1, y: +1}, 3);
      if (diag1 !== 'MAS' && diag1 !== 'SAM') continue;

      const diag2 = getWord(grid, {x: x + 1, y: y - 1}, {x: -1, y: +1}, 3);
      if (diag2 !== 'MAS' && diag2 !== 'SAM') continue;

      count += 1;
    }
  }

  return count;
};
