import assert from 'node:assert/strict';
import {describe, it} from 'node:test';
import {readFileSync} from 'node:fs';
import parseInput from './day18.input.js';
import {solvePart1, solvePart2} from './day18.js';

const inputExampleTxt = readFileSync(`${import.meta.dirname}/input-example.txt`, 'utf8');
const inputTxt = readFileSync(`${import.meta.dirname}/input.txt`, 'utf8');

describe('2024-18', () => {
  describe('part 1', () => {
    it('example', () => {
      assert.equal(solvePart1(parseInput(inputExampleTxt), {exit: {x: 6, y: 6}, bytes: 12}), 22);
    });

    it('exercise', () => {
      assert.equal(solvePart1(parseInput(inputTxt), {exit: {x: 70, y: 70}, bytes: 1024}), 268);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      assert.equal(solvePart2(parseInput(inputExampleTxt), {exit: {x: 6, y: 6}}), '6,1');
    });

    it('exercise', () => {
      assert.equal(solvePart2(parseInput(inputTxt), {exit: {x: 70, y: 70}}), '64,11');
    });
  });
});
