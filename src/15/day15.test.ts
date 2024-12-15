import assert from 'node:assert/strict';
import {describe, it} from 'node:test';
import {readFileSync} from 'node:fs';
import parseInput from './day15.input.js';
import {solvePart1, solvePart2} from './day15.js';

const inputExample1Txt = readFileSync(`${import.meta.dirname}/input-example-1.txt`, 'utf8');
const inputExample2Txt = readFileSync(`${import.meta.dirname}/input-example-2.txt`, 'utf8');
const inputTxt = readFileSync(`${import.meta.dirname}/input.txt`, 'utf8');

describe('2024-15', () => {
  describe('part 1', () => {
    it('example 1', () => {
      assert.equal(solvePart1(parseInput(inputExample1Txt)), 2028);
    });

    it('example 2', () => {
      assert.equal(solvePart1(parseInput(inputExample2Txt)), 10092);
    });

    it('exercise', () => {
      assert.equal(solvePart1(parseInput(inputTxt)), -1);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      assert.equal(solvePart2(parseInput(inputExample1Txt)), -1);
    });

    it('exercise', () => {
      assert.equal(solvePart2(parseInput(inputTxt)), -1);
    });
  });
});
