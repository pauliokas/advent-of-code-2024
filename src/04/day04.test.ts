import assert from 'node:assert/strict';
import {describe, it} from 'node:test';
import {readFileSync} from 'node:fs';
import parseInput from './day04.input.js';
import {solvePart1, solvePart2} from './day04.js';

const inputExampleTxt = readFileSync(`${import.meta.dirname}/input-example.txt`, 'utf8');
const inputTxt = readFileSync(`${import.meta.dirname}/input.txt`, 'utf8');

describe('2024-04', () => {
  describe('part 1', () => {
    it('example', () => {
      assert.equal(solvePart1(parseInput(inputExampleTxt)), 18);
    });

    it('exercise', () => {
      assert.equal(solvePart1(parseInput(inputTxt)), 2536);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      assert.equal(solvePart2(parseInput(inputExampleTxt)), 9);
    });

    it('exercise', () => {
      assert.equal(solvePart2(parseInput(inputTxt)), 1875);
    });
  });
});
