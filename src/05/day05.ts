import {type Input, type Rules} from './day05.input.js';

const comparator = (rules: Rules): ((a: number, b: number) => number) => {
  return (a, b) => {
    if (rules[a]?.includes(b)) return -1;
    if (rules[b]?.includes(a)) return +1;
    return 0;
  };
};

const solve =
  ({countOrdered}: {countOrdered: boolean}) =>
  ({rules, orders}: Input) => {
    const compareFunction = comparator(rules);

    let sum = 0;
    for (const order of orders) {
      const sorted = order.toSorted(compareFunction);
      const ordered = sorted.every((number_, i) => number_ === order[i]);
      if (ordered === countOrdered) sum += sorted[Math.floor(order.length / 2)];
    }

    return sum;
  };

export const solvePart1 = solve({countOrdered: true});

export const solvePart2 = solve({countOrdered: false});
