function* limit(limit: number, iterable: Iterable<number>): Generator<number> {
  let i = 0;
  for (const value of iterable) {
    if (i >= limit) break;
    yield value;
    i += 1;
  }
}

function* generateNumbers(seed: number): Generator<number> {
  let secret = seed;

  while (true) {
    const res1 = secret << 6;
    secret ^= res1;
    secret &= 0xffffff;

    const res2 = secret >> 5;
    secret ^= res2;
    secret &= 0xffffff;

    const res3 = secret << 11;
    secret ^= res3;
    secret &= 0xffffff;

    yield secret;
  }
}

export const solvePart1 = (seeds: number[]) => {
  let sum = 0;
  for (const seed of seeds) {
    const secrets = [...limit(2000, generateNumbers(seed))];
    sum += secrets.at(-1)!;
  }
  return sum;
};

export const solvePart2 = (seeds: number[]) => {
  return 0;
}
