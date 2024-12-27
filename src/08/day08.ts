import {type Cell, type Coords, type Input} from './day08.input.js';
import {combinations} from "../utils/combinations.js";

const getLineFunction = (a: Coords, b: Coords) => {
  const stepX = a.x - b.x;
  const stepY = a.y - b.y;
  return (x: number) => ((x - a.x) * stepY) / stepX + a.y;
};

const solve = (generateXs: (a: Coords, b: Coords) => Generator<number>) => {
  return ({antennas, dimensions}: Input): number => {
    const coordsByFrequency = antennas.reduce<Record<Cell['frequency'], Coords[]>>(
      (accumulator, {coords, frequency}) => {
        accumulator[frequency] ||= [];
        accumulator[frequency].push(coords);
        return accumulator;
      },
      {},
    );

    const antinodes = new Set<string>();

    for (const [, locations] of Object.entries(coordsByFrequency)) {
      if (locations.length < 2) continue;

      for (const [a, b] of combinations(locations, 2)) {
        const line = getLineFunction(a, b);
        for (const x of generateXs(a, b)) {
          if (x < 0) continue;
          if (x >= dimensions.width) break;

          const y = line(x);
          if (y >= 0 && y < dimensions.heigth) antinodes.add(`${x},${y}`);
        }
      }
    }

    return antinodes.size;
  };
};

export const solvePart1 = solve(function* (a, b) {
  const step = Math.abs(a.x - b.x);
  yield Math.min(a.x, b.x) - step;
  yield Math.max(a.x, b.x) + step;
});

export const solvePart2 = solve(function* (a, b) {
  const step = Math.abs(a.x - b.x);
  for (let x = a.x % step; true; x += step) {
    yield x;
  }
});
