import assert from 'node:assert/strict';
import {describe, it} from 'node:test';
import {readFileSync} from 'node:fs';
import parseInput from './day09.input.js';
import {solvePart1, solvePart2} from './day09.js';

const inputExampleTxt = readFileSync(`${import.meta.dirname}/input-example.txt`, 'utf8');
const inputTxt = readFileSync(`${import.meta.dirname}/input.txt`, 'utf8');

describe('2024-09', () => {
  describe('part 1', () => {
    it('example', () => {
      assert.equal(solvePart1(parseInput(inputExampleTxt)), 1928);
    });

    it('exercise', () => {
      assert.equal(solvePart1(parseInput(inputTxt)), 6_421_128_769_094);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      assert.equal(solvePart2(parseInput(inputExampleTxt)), 2858);
    });

    it('exercise', () => {
      assert.equal(solvePart2(parseInput(inputTxt)), 6_448_168_620_520);
    });
  });
});
