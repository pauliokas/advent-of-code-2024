export type Coords = {x: number; y: number};
export type DiffCoords = {dx: number; dy: number};
export type Input = Array<{a: DiffCoords; b: DiffCoords; prize: Coords}>;

const pattern =
  /Button A: X\+(?<ax>\d+), Y\+(?<ay>\d+)\nButton B: X\+(?<bx>\d+), Y\+(?<by>\d+)\nPrize: X=(?<prizex>\d+), Y=(?<prizey>\d+)/g;

export default (input: string): Input => {
  const parsedMachines: Input = [];

  const matches = input.matchAll(pattern);
  for (const match of matches) {
    const {ax, ay, bx, by, prizex, prizey} = match.groups!;
    parsedMachines.push({
      a: {dx: Number(ax), dy: Number(ay)},
      b: {dx: Number(bx), dy: Number(by)},
      prize: {x: Number(prizex), y: Number(prizey)},
    });
  }

  return parsedMachines;
};
