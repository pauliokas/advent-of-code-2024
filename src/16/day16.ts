import {Coords, type Input} from './day16.input.js';
import {PriorityQueue} from "./priority-queue.js";

type Direction = {dx: number; dy: number};
type Directions = {
  N: Direction,
  E: Direction,
  S: Direction,
  W: Direction,
};

const directions: Directions = {
  N: {dx: 0, dy: -1} as const,
  E: {dx: +1, dy: 0} as const,
  S: {dx: 0, dy: +1} as const,
  W: {dx: -1, dy: 0} as const,
} as const;

const opposites: Record<keyof Directions, keyof Directions> = {
  N: 'S',
  E: 'W',
  S: 'N',
  W: 'E',
} as const;

const pair = (a: number, b: number): number => (a + b) * (a + b + 1) / 2 + b;

const unpair = (z: number): [number, number] => {
  const w = Math.floor((Math.sqrt(8 * z + 1) - 1) / 2);
  const t = (w ** 2 + w) / 2;
  const y = z - t;
  const x = w - y;
  return [x, y];
}

const dijkstra = (map: string[][], start: Coords, end: Coords): { path: Coords[], cost: number } => {
  const distances: Record<string, number> = {};
  const previous: Record<string, Coords> = {};
  const queue: {key: string, coords: Coords, direction: keyof Directions}[] = [];
  const visited: Set<string> = new Set();

  for (let y = 0; y < map.length; y+=1) {
    for (let x = 0; x < map[0].length; x+=1) {
      if (map[y][x] !== '.') continue;
      for (const d of Object.keys(directions) as (keyof Directions)[]) {
        const key = `${x},${y}-${d}`;
        const next = {x: x + directions[d].dx, y: y + directions[d].dy};
        if (map[next.y][next.x] !== '.') continue;

        let distance = Infinity;
        if (x === start.x && y === start.y && d === 'E') distance = 0;
        distances[key] = distance;
        queue.push({key, coords: {x,y}, direction: d});
      }
    }
  }

  while(queue.length) {
    queue.sort((a, b) => distances[a.key] - distances[b.key]);
    const {key, coords, direction} = queue.shift()!;
    visited.add(key);

    for (const d of Object.keys(directions) as (keyof Directions)[]) {
      const next = {x: coords.x + directions[d].dx, y: coords.y + directions[d].dy};
      const nextKey = `${next.x},${next.y}-${d}`;
      if (distances[nextKey] === undefined) continue;
      if (visited.has(nextKey)) continue;

      const rotateCost = direction === d ? 0 : 1000;
      const newDistance = distances[key] + 1 + rotateCost;

      if (newDistance < distances[nextKey]) {
        distances[nextKey] = newDistance;
        previous[nextKey] = coords;
        // queue.enqueue({coords: next, direction: d}, newDistance);
      }
    }



    // console.log(distances.map((row) => row.map(dist => dist === -Infinity ? ' ####' : dist === Infinity ? '     ' : ('' + dist).padStart(5)).join('')).join('\n'), '\n');
  }

  // const path: Coords[] = [end];
  // while (path[0].x !== start.x || path[0].y !== start.y) {
  //   path.unshift(previous[path[0].y][path[0].x]!);
  // }

  return {cost: 0, path: []};
}

export const solvePart1 = ({map, start, end}: Input): number => {
  const {cost, path} = dijkstra(map, start, end);

  let pathstr = '';
  for (let i = 1; i < path.length; i += 1) {
    const z = {dx: path[i].x - path[i - 1].x, dy: path[i].y - path[i - 1].y};

    if (z.dx === 1 && z.dy === 0) pathstr += '>';
    else if (z.dx === -1 && z.dy === 0) pathstr += '<';
    else if (z.dx === 0 && z.dy === 1) pathstr += 'v';
    else if (z.dx === 0 && z.dy === -1) pathstr += '^';
  }

  // console.log(pathstr);

  // console.log(map.map((row) => row.join('')).join('\n').replaceAll('.', ' ').replaceAll('#', '·'));

  for (const {x, y} of path) {
    if (map[y][x] === '·') console.log('WTF', x, y);
    map[y][x] = '·';
  }
  map[start.y][start.x] = 'S';
  map[end.y][end.x] = 'E';

  // for (let y = 0; y < map.length; y++) {
  //   for (let x = 0; x < map[0].length; x++) {
  //     const cell = map[y][x];
  //     if (cell === '@') continue;
  //     if (cell === 'S') continue;
  //     if (cell === 'E') continue;
  //     if (cell === '#') continue;
  //     if (cell === '.') continue;
  //     console.log(cell, x, y);
  //   }
  // }

  console.log(map.map((row) => row.join('')).join('\n').replaceAll('.', ' '));

  return cost;
};

export const solvePart2 = (input: Input): number => {
  return 0;
};
