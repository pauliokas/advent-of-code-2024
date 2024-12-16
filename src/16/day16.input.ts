export type Coords = { x: number; y: number };
export type Input = { map: string[][]; start: Coords; end: Coords };

export default (input: string): Input => {
  const map = input.trim().split('\n').map(line => line.split(''));
  const startIdx = input.indexOf('S');
  const endIdx = input.indexOf('E');

  let start: Coords;
  let end: Coords;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === 'S') {
        start = {x, y};
        map[y][x] = '.';
      } else if (map[y][x] === 'E') {
        end = {x, y};
        map[y][x] = '.';
      }
    }
  }

  return {
    map,
    start: start!,
    end: end!,
  };
};
