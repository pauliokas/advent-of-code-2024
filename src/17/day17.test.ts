import assert from 'node:assert/strict';
import {describe, it} from 'node:test';
import {readFileSync} from 'node:fs';
import parseInput from './day17.input.js';
import {solvePart1, solvePart2} from './day17.js';

const inputExample1Txt = readFileSync(`${import.meta.dirname}/input-example-1.txt`, 'utf8');
const inputExample2Txt = readFileSync(`${import.meta.dirname}/input-example-2.txt`, 'utf8');
const inputTxt = readFileSync(`${import.meta.dirname}/input.txt`, 'utf8');

describe('2024-17', () => {
  describe('part 1', () => {
    it('example 1', () => {
      const registers = {AX: 0, BX: 0, CX: 9};
      const program = [2,6];

      solvePart1({registers, program});

      assert.equal(registers.CX, 9);
    });

    it('example 2', () => {
      const registers = {AX: 10, BX: 0, CX: 0};
      const program = [5,0,5,1,5,4];

      const out = solvePart1({registers, program});

      assert.equal(out, '0,1,2');
    });

    it('example 3', () => {
      const registers = {AX: 2024, BX: 0, CX: 0};
      const program = [0,1,5,4,3,0];

      const out = solvePart1({registers, program});

      assert.equal(out, '4,2,5,6,7,7,7,7,3,1,0');
      assert.equal(registers.AX, 0);
    });

    it('example 4', () => {
      const registers = {AX: 0, BX: 29, CX: 0};
      const program = [1,7];

      solvePart1({registers, program});

      assert.equal(registers.BX, 26);
    });

    it('example 5', () => {
      const registers = {AX: 0, BX: 2024, CX: 43690};
      const program = [4,0];

      solvePart1({registers, program});

      assert.equal(registers.BX, 44354);
    });

    it('example 6', () => {
      assert.equal(solvePart1(parseInput(inputExample1Txt)), '4,6,3,5,6,3,5,2,1,0');
    });

    it('exercise', () => {
      assert.equal(solvePart1(parseInput(inputTxt)), '6,5,4,7,1,6,0,3,1');
    });
  });

  describe('part 2', () => {
    it('example', () => {
      assert.equal(solvePart2(parseInput(inputExample2Txt)), 117440);
    });

    it('exercise', () => {
      assert.equal(solvePart2(parseInput(inputTxt)), -1);
    });
  });
});
