import assert from 'node:assert/strict';
import {describe, it} from 'node:test';
import {readFileSync} from 'node:fs';
import parseInput from './day10.input.js';
import {solvePart1, solvePart2} from './day10.js';

const inputExampleTxt = readFileSync(`${import.meta.dirname}/input-example.txt`, 'utf8');
const inputTxt = readFileSync(`${import.meta.dirname}/input.txt`, 'utf8');

describe('2024-10', () => {
  describe('part 1', () => {
    it('example', () => {
      assert.equal(solvePart1(parseInput(inputExampleTxt)), 36);
    });

    it('exercise', () => {
      assert.equal(solvePart1(parseInput(inputTxt)), 737);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      assert.equal(solvePart2(parseInput(inputExampleTxt)), 81);
    });

    it('exercise', () => {
      assert.equal(solvePart2(parseInput(inputTxt)), 1619);
    });
  });
});
