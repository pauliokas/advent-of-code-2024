import assert from 'node:assert/strict';
import {describe, it} from 'node:test';
import {readFileSync} from 'node:fs';
import parseInput from './day07.input.js';
import {solvePart1, solvePart2} from './day07.js';

const inputExampleTxt = readFileSync(`${import.meta.dirname}/input-example.txt`, 'utf8');
const inputTxt = readFileSync(`${import.meta.dirname}/input.txt`, 'utf8');

describe('2024-07', () => {
  describe('part 1', () => {
    it('example', () => {
      assert.equal(solvePart1(parseInput(inputExampleTxt)), 3749);
    });

    it('exercise', () => {
      assert.equal(solvePart1(parseInput(inputTxt)), 2_437_272_016_585);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      assert.equal(solvePart2(parseInput(inputExampleTxt)), 11_387);
    });

    it('exercise', () => {
      assert.equal(solvePart2(parseInput(inputTxt)), 162_987_117_690_649);
    });
  });
});
