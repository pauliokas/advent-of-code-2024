import {type Input} from './day13.input.js';

export const solvePart1 = (input: Input): number => {
  let tokensSpent = 0;
  for (const machine of input) {
    let minTokens = Infinity;
    for (let a = 0; a < 100; a += 1) {
      for (let b = 0; b < 100; b += 1) {
        const scoreX = a * machine.a.dx + b * machine.b.dx;
        const scoreY = a * machine.a.dy + b * machine.b.dy;

        const tokensSpent = 3 * a + b;
        if (scoreX === machine.prize.x && scoreY === machine.prize.y && tokensSpent < minTokens) {
          minTokens = tokensSpent;
          console.log(a, b);
        }
      }
    }

    if (minTokens !== Infinity) {
      tokensSpent += minTokens;
    }
  }

  return tokensSpent;
};

export const solvePart2 = (input: Input): number => {
  return 0;
};
