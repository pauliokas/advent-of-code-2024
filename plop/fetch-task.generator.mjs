import prettier from 'prettier';

export default (plop, {client}) => {
  plop.setHelper('pad', (number_) => String(number_).padStart(2, '0'));

  const task = {};
  plop.setActionType('downloadTask', async (answers) => {
    Object.assign(task, {
      assignment: await client.fetchAssignment({year: answers.year, day: answers.day}),
      input: await client.fetchInput({year: answers.year, day: answers.day}),
      example: await client.fetchExample({year: answers.year, day: answers.day}),
    });
  });

  const today = new Date();

  plop.setGenerator('fetch-task', {
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
