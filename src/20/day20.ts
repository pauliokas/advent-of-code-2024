import {type Cell, Grid} from '../utils/grid.js';
import {type Input} from './day20.input.js';

const findPath = <T>(grid: Grid<T>, start: Cell<T>, end: Cell<T>): Array<Cell<T>> | undefined => {
  const visited = new Set<symbol>();
  const queue: Array<Array<Cell<T>>> = [[start]];

  while (queue.length > 0) {
    const path = queue.shift()!;
    const cell = path.at(-1)!;

    if (visited.has(cell.symbol)) continue;
    visited.add(cell.symbol);

    if (cell.symbol === end.symbol) return path;

    for (const neighbour of cell.neighbours) {
      if (neighbour.value === '#') continue;
      queue.push([...path, neighbour]);
    }
  }

  return undefined;
};

const solve =
  (maxCheat: number) =>
  ({map, start, end}: Input, savedByCheat: number): number => {
    let count = 0;

    const grid = Grid.from2dArray(map);
    const path = findPath(grid, grid.at(start), grid.at(end))!;
    for (let i = 0; i < path.length - savedByCheat - 2; i += 1) {
      const origin = path[i];

      for (let index = i + savedByCheat + 2; index < path.length; index += 1) {
        const distribution = origin.distanceTo(path[index]);
        if (distribution > maxCheat) continue;

        const saved = index - i - distribution;
        if (saved >= savedByCheat) count += 1;
      }
    }

    return count;
  };

export const solvePart1 = solve(2);
export const solvePart2 = solve(20);
