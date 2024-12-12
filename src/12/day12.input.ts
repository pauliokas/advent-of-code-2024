export type Garden = string[][];

export default (input: string): Garden =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split(''));
