import {type Coords, type Robots} from './day14.input.js';

type Dimensions = {width: number; height: number};

const wrap = (number: number, max: number) => ((number % max) + max) % max;

function* generate(robots: Robots, {width, height}: Dimensions) {
  let positions = robots.map(({position}) => position);
  let i = 0;
  while (true) {
    positions = positions.map(({x, y}, index) => {
      const {dx, dy} = robots[index].velocity;
      return {x: wrap(x + dx, width), y: wrap(y + dy, height)};
    });
    yield positions;
    i += 1;
  }
}

function nth<T>(iterable: Iterable<T>, index: number): T | undefined {
  let nthValue: T | undefined;
  let i = 0;
  for (const value of iterable) {
    nthValue = value;
    if (++i === index) break;
  }

  return nthValue;
}

export const solvePart1 = (robots: Robots, {width, height}: Dimensions): number => {
  const positions: Coords[] = nth(generate(robots, {width, height}), 100)!;
  const filteredPositions = positions.filter(({x, y}) => x !== Math.floor(width / 2) && y !== Math.floor(height / 2));
  const quadrants = filteredPositions.reduce<Record<string, number>>((accumulator, {x, y}) => {
    const key = `${Math.floor(x / (width / 2))}x${Math.floor(y / (height / 2))}`;
    return Object.assign(accumulator, {[key]: (accumulator[key] ?? 0) + 1});
  }, {});
  return Object.values(quadrants).reduce((accumulator, value) => accumulator * value, 1);
};

export const solvePart2 = (robots: Robots, dimensions: Dimensions): number => {
  let index = 0;

  for (const points of generate(robots, dimensions)) {
    index += 1;
    const groupedByY = points.reduce<Record<number, number[]>>(
      (accumulator, {x, y}) => Object.assign(accumulator, {[y]: (accumulator[y] ?? []).concat(x)}),
      {},
    );
    for (const array of Object.values(groupedByY)) {
      if (array.length < 10) continue;
      array.sort((a, b) => a - b);

      let consecutiveStreak = 0;
      for (let i = 1; i < array.length; i += 1) {
        if (array[i] - array[i - 1] === 1) consecutiveStreak += 1;
        else consecutiveStreak = 0;

        if (consecutiveStreak >= 10) return index;
      }
    }
  }

  return -1;
};
