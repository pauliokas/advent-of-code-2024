import assert from 'node:assert/strict';
import {describe, it} from 'node:test';
import {readFileSync} from 'node:fs';
import parseInput from './day21.input.js';
import {solvePart1, solvePart2} from './day21.js';

const inputExampleTxt = readFileSync(`${import.meta.dirname}/input-example.txt`, 'utf8');
const inputTxt = readFileSync(`${import.meta.dirname}/input.txt`, 'utf8');

describe('2024-21', () => {
  describe('part 1', () => {
    it('example 1', () => {
      assert.equal(solvePart1(['456A'.split('')] as any), 29184);
    });

    it('example 2', () => {
      assert.equal(solvePart1(['379A'.split('')] as any), 24256);
    });

    it('example', () => {
      assert.equal(solvePart1(parseInput(inputExampleTxt)), 126384);
    });

    it('exercise', () => {
      assert.equal(solvePart1(parseInput(inputTxt)), 192841);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      assert.equal(solvePart2(parseInput(inputExampleTxt)), -1);
    });

    it('exercise', () => {
      assert.equal(solvePart2(parseInput(inputTxt)), -1);
    });
  });
});
