import {type Map} from './day10.input.js';

type Coords = {x: number; y: number};

function* trails(map: Map, start: Coords, allPaths: boolean): Generator<Coords[]> {
  const queue = [{visited: new Set(), path: [start]}];

  while (queue.length > 0) {
    const {path, visited} = queue.shift()!;
    const {x, y} = path.at(-1)!;

    if (visited.has(`${x},${y}`)) continue;
    visited.add(`${x},${y}`);

    if (map[y][x] === 9) {
      yield path;
      continue;
    }

    for (const [dx, dy] of [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ] as const) {
      const newX = x + dx;
      const newY = y + dy;
      if (newX < 0 || newX >= map[0].length || newY < 0 || newY >= map.length) continue;
      if (map[y][x] + 1 !== map[newY][newX]) continue;

      queue.push({visited: allPaths ? new Set(visited) : visited, path: [...path, {x: newX, y: newY}]});
    }
  }
}

const getMapScore =
  ({allPaths}: {allPaths: boolean}) =>
  (map: Map): number => {
    let sum = 0;
    for (let y = 0; y < map.length; y += 1) {
      for (let x = 0; x < map[y].length; x += 1) {
        if (map[y][x] === 0) {
          for (const path of trails(map, {x, y}, allPaths)) sum += 1;
        }
      }
    }

    return sum;
  };

export const solvePart1 = getMapScore({allPaths: false});

export const solvePart2 = getMapScore({allPaths: true});
