import assert from 'node:assert/strict';
import {describe, it} from 'node:test';
import {readFileSync} from 'node:fs';
import parseInput from './day11.input.js';
import {solvePart1, solvePart2} from './day11.js';

const inputTxt = readFileSync(`${import.meta.dirname}/input.txt`, 'utf8');

describe('2024-11', () => {
  describe('part 1', () => {
    it('example', () => {
      assert.equal(solvePart1(parseInput('125 17')), 55_312);
    });

    it('exercise', () => {
      assert.equal(solvePart1(parseInput(inputTxt)), 190_865);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      assert.equal(solvePart2(parseInput('125 17')), 65_601_038_650_482);
    });

    it('exercise', () => {
      assert.equal(solvePart2(parseInput(inputTxt)), 225_404_711_855_335);
    });
  });
});
