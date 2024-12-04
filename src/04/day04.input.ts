export type Coords = {x: number; y: number};
export type Grid = Array<Array<'X' | 'M' | 'A' | 'S'>>;

export default (input: string): Grid =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split('') as Array<'X' | 'M' | 'A' | 'S'>);
