import assert from 'node:assert/strict';
import {describe, it} from 'node:test';
import {readFileSync} from 'node:fs';
import parseInput from './day12.input.js';
import {solvePart1, solvePart2} from './day12.js';

const inputExample1Txt = readFileSync(`${import.meta.dirname}/input-example-1.txt`, 'utf8');
const inputExample2Txt = readFileSync(`${import.meta.dirname}/input-example-2.txt`, 'utf8');
const inputExample3Txt = readFileSync(`${import.meta.dirname}/input-example-3.txt`, 'utf8');
const inputExample4Txt = readFileSync(`${import.meta.dirname}/input-example-4.txt`, 'utf8');
const inputExample5Txt = readFileSync(`${import.meta.dirname}/input-example-5.txt`, 'utf8');
const inputTxt = readFileSync(`${import.meta.dirname}/input.txt`, 'utf8');

describe('2024-12', () => {
  describe('part 1', () => {
    it('example 1', () => {
      assert.equal(solvePart1(parseInput(inputExample1Txt)), 140);
    });

    it('example 2', () => {
      assert.equal(solvePart1(parseInput(inputExample2Txt)), 772);
    });

    it('example 3', () => {
      assert.equal(solvePart1(parseInput(inputExample3Txt)), 1930);
    });

    it('exercise', () => {
      assert.equal(solvePart1(parseInput(inputTxt)), 1_402_544);
    });
  });

  describe('part 2', () => {
    it('example 1', () => {
      assert.equal(solvePart2(parseInput(inputExample1Txt)), 80);
    });

    it('example 2', () => {
      assert.equal(solvePart2(parseInput(inputExample2Txt)), 436);
    });

    it('example 3', () => {
      assert.equal(solvePart2(parseInput(inputExample3Txt)), 1206);
    });

    it('example 4', () => {
      assert.equal(solvePart2(parseInput(inputExample4Txt)), 236);
    });

    it('example 5', () => {
      assert.equal(solvePart2(parseInput(inputExample5Txt)), 368);
    });

    it('exercise', () => {
      assert.equal(solvePart2(parseInput(inputTxt)), 862_486);
    });
  });
});
