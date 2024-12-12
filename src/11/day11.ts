import {type Input} from './day11.input.js';

const evolve = (stone: number): [number] | [number, number] => {
  if (stone === 0) return [1];

  const digits = Math.floor(Math.log10(stone)) + 1;
  if (digits % 2 === 0) {
    const power = 10 ** (digits / 2);
    return [Math.floor(stone / power), Math.floor(stone % power)];
  }

  return [stone * 2024];
};

const solve =
  (iterations: number) =>
  (input: Input): number => {
    const cache = new Map<string, number>(/* input.map((stone) => [`0:${stone}`, 1]) */);
    const stack: Array<{previous: number[]; stone: number}> = input.map((stone) => ({stone, previous: []}));

    let stonesTotal = 0;

    while (stack.length > 0) {
      const {stone, previous} = stack.pop()!;
      const generation = previous.length;

      let stonesAdded = 1;

      if (generation === iterations) {
        stonesTotal += stonesAdded;
        continue;
      }

      const cacheKey = `${generation}:${stone}`;
      if (cache.has(cacheKey)) {
        stonesAdded = cache.get(cacheKey)!;
        stonesTotal += stonesAdded;
      } else {
        const newStones = evolve(stone);
        stonesAdded = newStones.length;
        cache.set(cacheKey, stonesAdded);
        stack.push(...newStones.map((newStone) => ({stone: newStone, previous: [...previous, stone]})));
      }

      if (stonesAdded > 1) {
        for (let i = previous.length - 1; i >= 0; i -= 1) {
          const previousKey = `${i}:${previous[i]}`;
          cache.set(previousKey, cache.get(previousKey)! + stonesAdded - 1);
        }
      }
    }

    return stonesTotal;
  };

export const solvePart1 = solve(25);
export const solvePart2 = solve(75);
