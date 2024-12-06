import {type Coords, type Input} from './day06.input.js';

const pair = ({x, y}: Coords): string => `${x},${y}`;

const rotate = (coords: Coords) => ({x: -coords.y, y: coords.x});

const getPath = ({
  obstacles,
  dimensions,
  start,
  direction: startDirection,
}: Input): {path: Coords[]; cyclical: boolean} => {
  let current = start;
  let direction = startDirection;

  const obstacleSet = new Set(obstacles.map((coords) => pair(coords)));
  const cycleDetection = new Set<string>();
  const path: Coords[] = [];

  while (current.x >= 0 && current.x < dimensions.width && current.y >= 0 && current.y < dimensions.heigth) {
    while (obstacleSet.has(pair({x: current.x + direction.x, y: current.y + direction.y})))
      direction = rotate(direction);
    const next = {x: current.x + direction.x, y: current.y + direction.y};

    const hashKey = `${pair(current)}:${pair(next)}`;
    if (cycleDetection.has(hashKey)) return {path, cyclical: true};
    cycleDetection.add(hashKey);

    path.push(current);
    current = next;
  }

  return {path, cyclical: false};
};

export const solvePart1 = (input: Input): number => {
  const {path} = getPath(input);
  return new Set(path.map((cell) => pair(cell))).size;
};

export const solvePart2 = (input: Input): number => {
  const {path: originalPath} = getPath(input);

  const possibleObstructions = new Set<string>();
  for (const current of originalPath) {
    if (current.x === input.start.x && current.y === input.start.y) continue;

    const {cyclical} = getPath({
      obstacles: [...input.obstacles, current],
      dimensions: input.dimensions,
      start: input.start,
      direction: input.direction,
    });
    if (cyclical) possibleObstructions.add(pair(current));
  }

  return possibleObstructions.size;
};
