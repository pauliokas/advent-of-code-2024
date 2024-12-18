import {type Input} from './day18.input.js';

type Coords = {x: number; y: number};

const findPath = (grid: Set<string>, end: Coords): Coords[] | undefined => {
  const visited = new Set<string>();
  const queue: Coords[][] = [[{x: 0, y: 0}]];

  while (queue.length > 0) {
    const path = queue.shift()!;
    const {x, y} = path.at(-1)!;

    if (visited.has(`${x},${y}`)) continue;
    visited.add(`${x},${y}`);

    if (x === end.x && y === end.y) return path;

    for (const [dx, dy] of [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ] as const) {
      const newX = x + dx;
      const newY = y + dy;
      if (newX < 0 || newX > end.x || newY < 0 || newY > end.y) continue;
      if (grid.has(`${newX},${newY}`)) continue;

      queue.push([...path, {x: newX, y: newY}]);
    }
  }

  return undefined;
};

export const solvePart1 = (input: Input, {exit, bytes}: {exit: Coords; bytes: number}): number => {
  const path = findPath(new Set(input.slice(0, bytes)), exit);
  return path!.length - 1;
};

export const solvePart2 = (input: Input, {exit}: {exit: Coords}): string => {
  let left = 0;
  let right = input.length - 1;

  while (left <= right) {
    const index = Math.floor((left + right) / 2);
    const path = findPath(new Set(input.slice(0, index)), exit);

    if (path) left = index + 1;
    else right = index - 1;
  }

  return input[Math.min(left, right)];
};
