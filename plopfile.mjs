import fs from 'node:fs';
import fetchTaskGenerator from './plop/fetch-task.generator.mjs';
import {createClient} from './plop/aoc-client.mjs';
import submitAnswerGenerator from './plop/submit-answer.generator.mjs';

const client = createClient(fs.readFileSync('./.aocsession', 'utf8').trim());

export default (plop) => {
  fetchTaskGenerator(plop, {client});
  submitAnswerGenerator(plop, {client});
};
