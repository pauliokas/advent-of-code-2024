export type Rules = Record<number, number[]>;
export type Input = {
  rules: Rules;
  orders: number[][];
};

export default (input: string): Input => {
  const [rulesString, orderString] = input.trim().split('\n\n');

  const rules = rulesString
    .split('\n')
    .map((line) => line.split('|').map(Number) as [number, number])
    .reduce<Rules>((accumulator, [a, b]) => Object.assign(accumulator, {[a]: [...(accumulator[a] ?? []), b]}), {});

  const orders = orderString.split('\n').map((line) => line.split(',').map(Number));

  return {rules, orders};
};
