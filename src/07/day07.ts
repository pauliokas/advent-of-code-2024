import {type Input} from './day07.input.js';

const sum = (a: number, b: number): number => a + b;
const mul = (a: number, b: number): number => a * b;
const cat = (a: number, b: number): number => a * 10 ** Math.ceil(Math.log10(b) + Number.EPSILON) + b;

type Operation = (a: number, b: number) => number;
function* generateResults(operations: Operation[], ...[o1, o2, ...rest]: number[]): Generator<number> {
  for (const op of operations) {
    if (rest.length === 0) {
      yield op(o1, o2);
      continue;
    }

    yield* generateResults(operations, op(o1, o2), ...rest);
  }
}

const solve = (...operations: Operation[]) => {
  return (input: Input): number => {
    let sum = 0;
    for (const {target, operands} of input) {
      for (const result of generateResults(operations, ...operands)) {
        if (result === target) {
          sum += target;
          break;
        }
      }
    }

    return sum;
  };
};

export const solvePart1 = solve(sum, mul);
export const solvePart2 = solve(sum, mul, cat);
