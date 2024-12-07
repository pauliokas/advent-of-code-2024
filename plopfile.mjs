import fs from 'node:fs';
import prettier from 'prettier';
import got from 'got';
import * as cheerio from 'cheerio';
import {NodeHtmlMarkdown} from 'node-html-markdown';

const session = fs.readFileSync('./.aocsession', 'utf8').trim();

const fetchAssignment = async ({year, day}) => {
  const pageHtml = await got
    .get(`https://adventofcode.com/${year}/day/${day}`, {headers: {Cookie: `session=${session}`}})
    .text();
  const $ = cheerio.load(pageHtml);

  const htmlParts = [];
  $('article').each((index, element) => {
    htmlParts.push($(element).html());
  });

  const nhm = new NodeHtmlMarkdown({});

  return htmlParts.map((html) => nhm.translate(html)).join('\n\n');
};

const fetchExample = async ({year, day}) => {
  const pageHtml = await got
    .get(`https://adventofcode.com/${year}/day/${day}`, {headers: {Cookie: `session=${session}`}})
    .text();
  const $ = cheerio.load(pageHtml);

  return $('p:contains("example") + pre > code').first().text();
};

const fetchInput = async ({year, day}) =>
  got.get(`https://adventofcode.com/${year}/day/${day}/input`, {headers: {Cookie: `session=${session}`}}).text();

export default (plop) => {
  plop.setHelper('pad', (number_) => String(number_).padStart(2, '0'));

  const task = {};
  plop.setActionType('downloadTask', async (answers) => {
    Object.assign(task, {
      assignment: await fetchAssignment({year: answers.year, day: answers.day}),
      input: await fetchInput({year: answers.year, day: answers.day}),
      example: await fetchExample({year: answers.year, day: answers.day}),
    });
  });

  const today = new Date();

  plop.setGenerator('day', {
    description: 'generator for a new day in the advent of code',
    prompts: [
      {type: 'input', name: 'year', default: today.getFullYear()},
      {type: 'input', name: 'day', default: today.getDate()},
    ],
    actions: [
      {
        type: 'downloadTask',
      },
      {
        type: 'add',
        path: 'src/{{ pad day }}/README.md',
        force: true,
        transform: async () =>
          prettier.format(task.assignment, {
            parser: 'markdown',
            singleQuote: true,
            trailingComma: 'all',
            printWidth: 120,
            proseWrap: 'always',
          }),
      },
      {
        type: 'add',
        path: 'src/{{ pad day }}/input.txt',
        skipIfExists: true,
        transform: async () => task.input,
      },
      {
        type: 'add',
        path: 'src/{{ pad day }}/input-example.txt',
        skipIfExists: true,
        transform: async () => task.example,
      },
      {
        type: 'addMany',
        destination: 'src/{{ pad day }}',
        base: 'templates',
        templateFiles: 'templates/*.ts',
        skipIfExists: true,
        data: task,
      },
    ],
  });
};
