export type Input = Array<[number, number]>;

export default (input: string): Input => {
  const lines = input.trim().split('\n');
  return lines.map((line) => {
    const [left, right] = line.split(/\s+/).map(Number);
    return [left, right];
  });
};
