import {type Input} from './day21.input.js';

// eslint-disable prettier/prettier
const KEYBOARDS = {
  numeric: [
    '7', '8', '9',
    '4', '5', '6',
    '1', '2', '3',
    ' ', '0', 'A',
  ] as const,

  directional: [
    ' ', '^', 'A',
    '<', 'v', '>',
  ] as const,
} as const
// eslint-enable prettier/prettier

console.log("xxx");

const xxx = (targetCode: string[], targetKeyboard: any): string[] => {
  let position = targetKeyboard.indexOf('A');

  let sequence: string[] = [];
  for (const target of targetCode) {
    const currentX = position % 3;
    const currentY = Math.floor(position / 3);
    // console.log('current', currentX, currentY);

    const targetPosition = targetKeyboard.indexOf(target as any);

    const targetX = targetPosition % 3;
    const targetY = Math.floor(targetPosition / 3);
    // console.log('target', targetX, targetY);

    const dx = targetX - currentX;
    const dy = targetY - currentY;
    // console.log('delta', dx, dy);

    const horizontal = [];
    for (let i = 0; i < Math.abs(dx); i += 1) {
      horizontal.push(dx > 0 ? '>' : '<');
    }

    const vertical = [];
    for (let i = 0; i < Math.abs(dy); i += 1) {
      vertical.push(dy > 0 ? 'v' : '^');
    }

    const asdf = targetKeyboard[currentY * 3 + targetX] === ' ' ? [...vertical, ...horizontal, 'A'] : [...horizontal, ...vertical, 'A'];

    sequence = [...sequence, ...asdf];
    position = targetPosition;
  }

  return sequence;
}

const zzz = (targetCode: string[], keyboards: { keyboard: keyof typeof KEYBOARDS, position: number }[]) => {
  let sequence: string[] = targetCode;
  for (const {keyboard, position} of keyboards.slice(0, -1)) {
    sequence = xxx(sequence, KEYBOARDS[keyboard]);
  }

  return sequence;
}

export const solvePart1 = (input: Input): number => {
  let complexity = 0;
  for (const target of input) {
    const keyboards: { keyboard: keyof typeof KEYBOARDS, position: number }[] = [
      {
        keyboard: 'numeric',
        position: KEYBOARDS.numeric.indexOf('A'),
      },
      {
        keyboard: 'directional',
        position: KEYBOARDS.directional.indexOf('A'),
      },
      {
        keyboard: 'directional',
        position: KEYBOARDS.directional.indexOf('A'),
      },
      {
        keyboard: 'directional',
        position: KEYBOARDS.directional.indexOf('A'),
      }
    ];

    const sequence = zzz(target, keyboards);

    console.log(`${target.join('')}: ${sequence.join('')}`);
    console.log(sequence.length, parseInt(target.join(''), 10))
    complexity += sequence.length * parseInt(target.join(''), 10);
  }

  return complexity;
};

export const solvePart2 = (input: Input): number => {
  return 0;
};

const iii = { 'a': 1 };
console.log(iii);
