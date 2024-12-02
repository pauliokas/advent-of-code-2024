import type {Input} from './day01.input.js';

export const solvePart1 = (input: Input): number => {
  const left: number[] = [];
  const right: number[] = [];

  for (const [l, r] of input) {
    left.push(l);
    right.push(r);
  }

  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    sum += Math.abs(left[i] - right[i]);
  }

  return sum;
};

export const solvePart2 = (input: Input): number => {
  const hash = new Map<number, number>();
  for (const [, r] of input) {
    if (!hash.has(r)) {
      hash.set(r, 0);
    }

    hash.set(r, hash.get(r)! + 1);
  }

  let sum = 0;
  for (const [l] of input) {
    let multiplier = 0;
    if (hash.has(l)) {
      multiplier = hash.get(l)!;
    }

    sum += l * multiplier;
  }

  return sum;
};
