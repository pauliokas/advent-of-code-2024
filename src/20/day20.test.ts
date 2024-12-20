import assert from 'node:assert/strict';
import {describe, it} from 'node:test';
import {readFileSync} from 'node:fs';
import parseInput from './day20.input.js';
import {solvePart1, solvePart2} from './day20.js';

const inputExampleTxt = readFileSync(`${import.meta.dirname}/input-example.txt`, 'utf8');
const inputTxt = readFileSync(`${import.meta.dirname}/input.txt`, 'utf8');

describe('2024-20', () => {
  describe('part 1', () => {
    it('example', () => {
      assert.equal(solvePart1(parseInput(inputExampleTxt), 10), 10);
    });

    it('exercise', () => {
      assert.equal(solvePart1(parseInput(inputTxt), 100), 1296);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      assert.equal(solvePart2(parseInput(inputExampleTxt), 50), 285);
    });

    it('exercise', () => {
      assert.equal(solvePart2(parseInput(inputTxt), 100), 977_665);
    });
  });
});
