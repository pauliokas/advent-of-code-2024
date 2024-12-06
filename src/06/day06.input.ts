export type Coords = {x: number; y: number};
export type Dimensions = {width: number; heigth: number};
export type Input = {start: Coords; obstacles: Coords[]; dimensions: Dimensions; direction: Coords};

export default (input: string): Input => {
  const lines = input.trim().split('\n');

  let guard: Coords;
  const obstacles: Coords[] = [];

  // eslint-disable-next-line unicorn/no-for-loop
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];

    // eslint-disable-next-line unicorn/no-for-loop
    for (let x = 0; x < line.length; x++) {
      const char = line[x];

      if (char === '^') guard = {x, y};
      else if (char === '#') obstacles.push({x, y});
    }
  }

  const dimensions = {width: lines[0].length, heigth: lines.length};

  return {
    obstacles,
    dimensions,
    start: guard!,
    direction: {x: 0, y: -1},
  };
};
