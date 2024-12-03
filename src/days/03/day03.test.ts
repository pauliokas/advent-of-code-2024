import assert from 'node:assert/strict';
import {describe, it} from 'node:test';
import {readFileSync} from 'node:fs';
import parseInput from './day03.input.js';
import {solvePart1, solvePart2} from './day03.js';

const inputTxt = readFileSync(`${import.meta.dirname}/input.txt`, 'utf8');

describe('2024-03', () => {
  describe('part 1', () => {
    it('example', () => {
      assert.equal(
        solvePart1(parseInput('xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))')),
        161,
      );
    });

    it('exercise', () => {
      assert.equal(solvePart1(parseInput(inputTxt)), 156_388_521);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      assert.equal(
        solvePart2(parseInput("xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))")),
        48,
      );
    });

    it('exercise', () => {
      assert.equal(solvePart2(parseInput(inputTxt)), 75_920_122);
    });
  });
});
