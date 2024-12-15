export default (plop, {client}) => {
  const today = new Date();

  plop.setActionType('submitAnswer', async (answers) => {
    const response = await client.submitAnswer({
      year: answers.year,
      day: answers.day,
      level: answers.level,
      guess: answers.guess,
    });

    console.log(response);
  });

  plop.setGenerator('submit-answer', {
    description: 'generator to submit the answer for advent of code',
    prompts: [
      {type: 'number', name: 'year', default: today.getFullYear()},
      {type: 'number', name: 'day', default: today.getDate()},
      {type: 'list', name: 'level', choices: ['1', '2'], default: '2'},
      {type: 'input', name: 'guess'},
    ],
    actions: [
      {
        type: 'submitAnswer',
      },
    ],
  });
};
