import {type Input} from './day19.input.js';

const memoize = <T extends (key: string) => number>(function_: T): T => {
  const cache = new Map<string, number>();
  return ((key: string) => {
    if (cache.has(key)) return cache.get(key);
    const result: number = function_(key);
    cache.set(key, result);
    return result;
  }) as T;
};

const buildMatcher = (patterns: Set<string>) => {
  const isPatternAvailable = memoize((design: string): number => {
    if (design.length === 0) return 1;

    let availablePatterns = 0;

    for (let i = 1; i <= design.length; i += 1) {
      const pattern = design.slice(0, i);
      if (!patterns.has(pattern)) continue;

      availablePatterns += isPatternAvailable(design.slice(i));
    }

    return availablePatterns;
  });

  return isPatternAvailable;
};

export const solvePart1 = ({patterns, designs}: Input): number => {
  const isPatternAvailable = buildMatcher(patterns);
  let availableDesigns = 0;
  for (const design of designs) {
    if (isPatternAvailable(design) > 0) availableDesigns += 1;
  }

  return availableDesigns;
};

export const solvePart2 = ({patterns, designs}: Input): number => {
  const isPatternAvailable = buildMatcher(patterns);
  let availableDesigns = 0;
  for (const design of designs) {
    availableDesigns += isPatternAvailable(design);
  }

  return availableDesigns;
};
