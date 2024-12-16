import assert from 'node:assert/strict';
import {describe, it} from 'node:test';
import {readFileSync} from 'node:fs';
import parseInput from './day16.input.js';
import {solvePart1, solvePart2} from './day16.js';

const inputExample1Txt = readFileSync(`${import.meta.dirname}/input-example-1.txt`, 'utf8');
const inputExample2Txt = readFileSync(`${import.meta.dirname}/input-example-2.txt`, 'utf8');
const inputExample3Txt = readFileSync(`${import.meta.dirname}/input-example-3.txt`, 'utf8');
const inputTxt = readFileSync(`${import.meta.dirname}/input.txt`, 'utf8');

describe('2024-16', () => {
  describe('part 1', () => {
    it('example 1', () => {
      assert.equal(solvePart1(parseInput(inputExample1Txt)), 7036);
    });

    it('example 2', () => {
      assert.equal(solvePart1(parseInput(inputExample2Txt)), 11048);
    });

    it('example 3', () => {
      assert.equal(solvePart1(parseInput(inputExample3Txt)), 4013);
    });

    it('exercise', () => {
      assert.equal(solvePart1(parseInput(inputTxt)), 73404);
    });
  });

  describe('part 2', () => {
    it('example 1', () => {
      assert.equal(solvePart2(parseInput(inputExample2Txt)), -1);
    });

    it('exercise', () => {
      assert.equal(solvePart2(parseInput(inputTxt)), -1);
    });
  });
});
