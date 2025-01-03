import assert from 'node:assert/strict';
import {describe, it} from 'node:test';
import {readFileSync} from 'node:fs';
import parseInput from './day22.input.js';
import {solvePart1, solvePart2} from './day22.js';

const inputTxt = readFileSync(`${import.meta.dirname}/input.txt`, 'utf8');

describe('2024-22', () => {
  describe('part 1', () => {
    it('example', () => {
      assert.equal(solvePart1([1, 10, 100, 2024]), 37_327_623);
    });

    it('exercise', () => {
      assert.equal(solvePart1(parseInput(inputTxt)), 15_006_633_487);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      assert.equal(solvePart2([1, 2, 3, 2024]), 23);
    });

    it('exercise', () => {
      assert.equal(solvePart2(parseInput(inputTxt)), 1710);
    });
  });
});
