export type Coords = {x: number; y: number};
export type Cell = {frequency: string; coords: Coords};
export type Dimensions = {width: number; heigth: number};
export type Input = {antennas: Cell[]; dimensions: Dimensions};

export default (input: string): Input => {
  const lines = input.trim().split('\n');

  const antennas: Cell[] = [];

  for (const [y, line] of lines.entries()) {
    for (const [x, char] of line.split('').entries()) {
      if (char === '.') continue;

      antennas.push({frequency: char, coords: {x, y}});
    }
  }

  return {
    antennas,
    dimensions: {width: lines[0].length, heigth: lines.length},
  };
};
