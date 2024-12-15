import * as cheerio from 'cheerio';
import {NodeHtmlMarkdown} from 'node-html-markdown';
import got from 'got';

const parseHtml = (html) => {
  const $ = cheerio.load(html);

  const htmlParts = [];
  $('article').each((index, element) => {
    htmlParts.push($(element).html());
  });

  const nhm = new NodeHtmlMarkdown({});

  return htmlParts.map((html) => nhm.translate(html)).join('\n\n');
};

const fetchAssignment =
  (client) =>
  async ({year, day}) => {
    const pageHtml = await client.get(`${year}/day/${day}`).text();

    return parseHtml(pageHtml);
  };

const fetchExample =
  (client) =>
  async ({year, day}) => {
    const pageHtml = await client.get(`${year}/day/${day}`).text();
    const $ = cheerio.load(pageHtml);

    return $('p:contains("example") + pre > code').first().text();
  };

const fetchInput =
  (client) =>
  async ({year, day}) =>
    client.get(`${year}/day/${day}/input`).text();

const submitAnswer =
  (client) =>
  async ({year, day, level, guess}) => {
    const pageHtml = await client
      .post(`${year}/day/${day}/answer`, {
        form: {
          level: `${level}`,
          answer: `${guess}`,
        },
      })
      .text();

    return parseHtml(pageHtml);
  };

export const createClient = (session) => {
  const client = got.extend({
    prefixUrl: 'https://adventofcode.com',
    headers: {Cookie: `session=${session}`},
  });

  return {
    fetchAssignment: fetchAssignment(client),
    fetchExample: fetchExample(client),
    fetchInput: fetchInput(client),
    submitAnswer: submitAnswer(client),
  };
};
