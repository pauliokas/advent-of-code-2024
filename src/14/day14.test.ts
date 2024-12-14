import assert from 'node:assert/strict';
import {describe, it} from 'node:test';
import {readFileSync} from 'node:fs';
import parseInput, {type Coords} from './day14.input.js';
import {solvePart1, solvePart2} from './day14.js';

const inputExampleTxt = readFileSync(`${import.meta.dirname}/input-example.txt`, 'utf8');
const inputTxt = readFileSync(`${import.meta.dirname}/input.txt`, 'utf8');

const print = (points: Coords[], {width, height}: {width: number; height: number}) => {
  const grid = Array.from({length: height}, () => Array.from({length: width}, () => '.'));
  for (const {x, y} of points) grid[y][x] = '#';
  return grid.map((row) => row.join('')).join('\n');
};

describe('2024-14', () => {
  describe('part 1', () => {
    it('example', () => {
      assert.equal(solvePart1(parseInput(inputExampleTxt), {width: 11, height: 7}), 12);
    });

    it('exercise', () => {
      assert.equal(solvePart1(parseInput(inputTxt), {width: 101, height: 103}), 225_943_500);
    });
  });

  describe('part 2', () => {
    it('exercise', () => {
      assert.equal(solvePart2(parseInput(inputTxt), {width: 101, height: 103}), 6377);
    });
  });
});
