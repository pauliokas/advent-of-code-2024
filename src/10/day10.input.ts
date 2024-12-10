export type Map = number[][];

export default (input: string): Map =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split('').map(Number));
