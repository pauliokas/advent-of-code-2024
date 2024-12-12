import {type Garden} from './day12.input.js';

type Coords = {x: number; y: number};

const neighbours = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
] as const;

const getRegions = (garden: Garden): Array<{name: string; cells: Coords[]}> => {
  const regions: Array<{name: string; cells: Coords[]}> = [];
  const visited = new Set<string>();

  for (let y = 0; y < garden.length; y += 1) {
    for (let x = 0; x < garden[y].length; x += 1) {
      if (visited.has(`${x},${y}`)) continue;

      const queue = [{x, y}];
      const region: Coords[] = [];

      while (queue.length > 0) {
        const {x, y} = queue.shift()!;
        if (visited.has(`${x},${y}`)) continue;
        visited.add(`${x},${y}`);

        region.push({x, y});

        for (const [dx, dy] of neighbours) {
          const newX = x + dx;
          const newY = y + dy;
          if (newX < 0 || newX >= garden[y].length || newY < 0 || newY >= garden.length) continue;
          if (garden[y][x] !== garden[newY][newX]) continue;

          queue.push({x: newX, y: newY});
        }
      }

      regions.push({name: garden[y][x], cells: region});
    }
  }

  return regions;
};

const getSimplePerimeter = (garden: Garden, region: Coords[]): number => {
  let perimeter = 0;
  for (const {x, y} of region) {
    let fences = 4;
    for (const [dx, dy] of neighbours) {
      const newX = x + dx;
      const newY = y + dy;
      if (newX < 0 || newX >= garden[y].length || newY < 0 || newY >= garden.length) continue;
      if (garden[y][x] !== garden[newY][newX]) continue;

      fences -= 1;
    }

    perimeter += fences;
  }

  return perimeter;
};

const countConsecutiveGroups = (array: number[]): number => {
  let groups = 1;
  for (let i = 1; i < array.length; i += 1) {
    if (array[i] - array[i - 1] > 1) groups += 1;
  }

  return groups;
};

const getComplexPerimeter = (garden: Garden, region: Coords[]): number => {
  const fencesX = new Map<number, number[]>();
  const fencesY = new Map<number, number[]>();

  for (const {x, y} of region) {
    for (const [dx, dy] of neighbours) {
      const newX = x + dx;
      const newY = y + dy;
      if (garden[y][x] === garden?.[newY]?.[newX]) continue;

      if (dx !== 0) fencesX.set(x + dx * 0.1, (fencesX.get(x + dx * 0.1) ?? []).concat(y));
      if (dy !== 0) fencesY.set(y + dy * 0.1, (fencesY.get(y + dy * 0.1) ?? []).concat(x));
    }
  }

  return [...fencesX.values(), ...fencesY.values()]
    .map((fences) => fences.sort((a, b) => a - b))
    .map((fences) => countConsecutiveGroups(fences))
    .reduce((a, b) => a + b, 0);
};

const solve =
  (measurePerimeter: (garden: Garden, region: Coords[]) => number) =>
  (garden: Garden): number => {
    const regions = getRegions(garden);
    let price = 0;
    for (const region of regions) {
      const perimeter = measurePerimeter(garden, region.cells);
      price += region.cells.length * perimeter;
    }

    return price;
  };

export const solvePart1 = solve(getSimplePerimeter);
export const solvePart2 = solve(getComplexPerimeter);
