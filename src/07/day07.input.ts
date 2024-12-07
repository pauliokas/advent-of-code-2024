export type Input = Array<{target: number; operands: number[]}>;

export default (input: string): Input =>
  input
    .trim()
    .split('\n')
    .map((line) => {
      const [targetString, rest] = line.split(': ');
      return {target: Number(targetString), operands: rest.split(' ').map(Number)};
    });
