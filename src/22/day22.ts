function* limit<T>(limit: number, iterable: Iterable<T>): Generator<T> {
  let i = 0;
  for (const value of iterable) {
    if (i >= limit) break;
    yield value;
    i += 1;
  }
}

function* generateNumbers(seed: number): Generator<number> {
  let secret = seed;

  yield secret;

  while (true) {
    /* eslint-disable no-bitwise */
    secret ^= (secret << 6) & 0xff_ff_ff;
    secret ^= (secret >> 5) & 0xff_ff_ff;
    secret ^= (secret << 11) & 0xff_ff_ff;
    /* eslint-enable no-bitwise */

    yield secret;
  }
}

function* lastDigit(generator: Iterable<number>): Generator<number> {
  for (const value of generator) {
    yield value % 10;
  }
}

function* pair<T>(generator: Iterable<T>): Generator<[T, T]> {
  const iterator = generator[Symbol.iterator]();

  let previous = iterator.next().value as T;
  while (true) {
    const current = iterator.next().value as T;
    yield [previous, current];
    previous = current;
  }
}

function* index<T>(generator: Iterable<T>): Generator<[number, T]> {
  let i = 0;
  for (const value of generator) {
    yield [i, value];
    i += 1;
  }
}

export const solvePart1 = (seeds: number[]) => {
  let sum = 0;
  for (const seed of seeds) {
    const secrets = [...limit(2001, generateNumbers(seed))];
    sum += secrets.at(-1)!;
  }

  return sum;
};

export const solvePart2 = (seeds: number[]) => {
  const cache = new Map<string, Array<{start: number; price: number; seed: number}>>();

  for (const seed of seeds) {
    const sequence: number[] = [];
    const seenKeys = new Set<string>();

    for (const [i, [previous, current]] of limit(2001, index(pair(lastDigit(generateNumbers(seed)))))) {
      const diff = current - previous;

      sequence.splice(sequence.length, 0, diff);
      if (sequence.length > 4) sequence.splice(0, 1);

      if (sequence.length < 4) continue;

      const key = sequence.join(',');
      if (seenKeys.has(key)) continue;
      seenKeys.add(key);

      if (!cache.has(key)) cache.set(key, []);
      cache.get(key)!.push({start: i, price: current, seed});
    }
  }

  let maxSum = 0;
  for (const [, values] of cache) {
    const sum = values.map(({price}) => price).reduce((accumulator, price) => accumulator + price);
    if (sum > maxSum) maxSum = sum;
  }

  return maxSum;
};
