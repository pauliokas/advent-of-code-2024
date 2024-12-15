import {type Input} from './day15.input.js';
import {Direction, Grid} from "./grid.js";

const zzz = (movementStr: string) => {
  let i = 0;
  return (): Direction|undefined => {
    const next = movementStr.at(i++);
    if (next === '^') return {dx: 0, dy: -1};
    if (next === 'v') return {dx: 0, dy: +1};
    if (next === '<') return {dx: -1, dy: 0};
    if (next === '>') return {dx: +1, dy: 0};
    return undefined;
  };
}

export const solvePart1 = (input: Input): number => {
  const nextMove = zzz(input.movement);
  const grid = new Grid(input.grid, input.dimensions);
  let robot = input.robot;

  // console.log(grid.print());

  let direction: Direction | undefined;
  asdf: while(!!(direction = nextMove())) {
    let z = direction;
    while(grid.relativeTo(robot, z) !== undefined) {
      if (grid.relativeTo(robot, z) === '#') continue asdf;
      z = {dx: z.dx + direction.dx, dy: z.dy + direction.dy};
    }

    if (grid.relativeTo(robot, direction) === 'O') grid.set({x: robot.x + z.dx, y: robot.y + z.dy}, 'O');

    robot = {x: robot.x + direction.dx, y: robot.y + direction.dy};
    grid.set(robot, undefined);

    // console.log(grid.print());
  }
  // console.log(grid.print());

  let gpsSum = 0;
  for (let y = 0; y < input.dimensions.height; y+=1) {
    for (let x = 0; x < input.dimensions.width; x+=1) {
      if (grid.at({x, y}) === 'O') {
        gpsSum += 100*y+x;
      }
    }
  }

  return gpsSum;
};

export const solvePart2 = (input: Input): number => {
  return 0;
};
