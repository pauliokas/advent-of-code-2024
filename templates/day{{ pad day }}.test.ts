import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { readFileSync } from 'node:fs';
import parseInput from './day{{ pad day }}.input.js';
import { solvePart1, solvePart2 } from './day{{ pad day }}.js';

const inputExampleTxt = readFileSync(`${import.meta.dirname}/input-example.txt`, 'utf8');
const inputTxt = readFileSync(`${import.meta.dirname}/input.txt`, 'utf8');

describe('{{ year }}-{{ pad day }}', () => {
    describe('part 1', () => {
        it('example', () => {
            assert.equal(solvePart1(parseInput(inputExampleTxt)), 0);
        });

        it('exercise', () => {
            assert.equal(solvePart1(parseInput(inputTxt)), 0);
        });
    });

    describe('part 2', () => {
        it('example', () => {
            assert.equal(solvePart2(parseInput(inputExampleTxt)), 0);
        });

        it('exercise', () => {
            assert.equal(solvePart2(parseInput(inputTxt)), 0);
        });
    });
});
