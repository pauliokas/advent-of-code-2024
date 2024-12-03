import {type Input} from './day03.input.js';

export const solvePart1 = (input: Input): number => {
  return input.filter(({op}) => op === 'mul').reduce((accumulator, {args: [a, b]}) => accumulator + a * b, 0);
};

export const solvePart2 = (input: Input): number => {
  let result = 0;

  let enabled = true;
  for (const {op, args} of input) {
    switch (op) {
      case 'do': {
        enabled = true;
        break;
      }

      case "don't": {
        enabled = false;
        break;
      }

      case 'mul': {
        if (enabled) result += args[0] * args[1];
        break;
      }
    }
  }

  return result;
};
