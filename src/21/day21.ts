import {Cell, Coords, Grid} from '../utils/grid.js';
import {Digit, type Input} from './day21.input.js';

// eslint-disable prettier/prettier
const KEYBOARDS = {
  numeric: {
    grid: Grid.from2dArray([
      ['7', '8', '9'],
      ['4', '5', '6'],
      ['1', '2', '3'],
      [undefined, '0', 'A'],
    ] as const),
    start: {x: 2, y: 3},
  },

  directional: {
    grid: Grid.from2dArray([
      [undefined, '^', 'A'],
      ['<', 'v', '>'],
    ] as const),
    start: {x: 1, y: 0},
  },
} as const
// eslint-enable prettier/prettier

const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map<string, ReturnType<T>>();
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) cache.set(key, fn(...args));
    return cache.get(key)!;
  }) as T;
}

const convert = (path: Cell<any>[]): string[] => {
  const buttons: string[] = [];
  for (let i = 1; i < path.length; i += 1) {
    const dx = path[i].x - path[i - 1].x;
    const dy = path[i].y - path[i - 1].y;

    if (dx === -1) buttons.push('<');
    else if (dx === 1) buttons.push('>');
    else if (dy === -1) buttons.push('^');
    else if (dy === 1) buttons.push('v');
  }
  return buttons;
}

const zzz = memoize((keyboardTypes: (keyof typeof KEYBOARDS)[], start: Coords, end: Coords): string[] => {
  const {grid} = KEYBOARDS[keyboardTypes.at(-1)!];
  const path = grid.findPath(
    start,
    end,
    (cell, {current}) => {
      if (keyboardTypes.length === 1) return 0;
      return zzz(keyboardTypes.slice(0, -1), current, cell).length;
    }
  );
  return [...convert(path), 'A'];
});

const remap = (keyboardTypes: (keyof typeof KEYBOARDS)[], actualTarget: string[]): string[] => {
  let target = actualTarget;
  for (let i = keyboardTypes.length - 1; i >= 0; i -= 1) {
    const keyboardType = keyboardTypes[i];
    const {grid, start} = KEYBOARDS[keyboardType];

    let position = grid.at(start);
    const newTarget: string[] = [];
    for (let i = 0; i < target.length; i += 1) {
      const key = target.at(i)!;
      const targetCell = [...grid].find((cell => cell.value === key))!;
      // const directPath = grid.findPath(position, targetCell);
      // newTarget.push(...convert(directPath), 'A');
      newTarget.push(...zzz(keyboardTypes, position, targetCell));
      position = targetCell;
    }

    target = newTarget;
  }

  return target;
}

export const solvePart1 = (input: Input): number => {
  const keyboards: (keyof typeof KEYBOARDS)[] = [
    'directional', 'directional', 'numeric'
  ];

  let complexity = 0;
  for (const target of input) {
    const result = remap(keyboards, target);
    console.log(result.join(''));
    complexity += result.length;
  }

  return complexity;
};

export const solvePart2 = (input: Input): number => {
  return 0;
};
