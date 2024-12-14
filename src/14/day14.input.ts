export type Coords = {x: number; y: number};
export type DiffCoords = {dx: number; dy: number};
export type RobotDescription = {position: Coords; velocity: DiffCoords};
export type Robots = RobotDescription[];

const pattern = /p=(?<px>-?\d+),(?<py>-?\d+) v=(?<vx>-?\d+),(?<vy>-?\d+)/g;

export default (input: string): Robots => {
  const robots: Robots = [];

  for (const match of input.matchAll(pattern)) {
    const {px, py, vx, vy} = match.groups!;
    robots.push({position: {x: Number(px), y: Number(py)}, velocity: {dx: Number(vx), dy: Number(vy)}});
  }

  return robots;
};
