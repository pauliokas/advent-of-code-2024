const supportedOps = ['mul', 'do', "don't"] as const;

export type Op = (typeof supportedOps)[number];
export type Operation = {op: Op; args: any[]};
export type Input = Operation[];

const parseNextNumber = (input: string, offset: number): [string, number] => {
  let i = 0;
  let number_ = '';
  while (i < 3 && offset + i < input.length && input[offset + i] >= '0' && input[offset + i] <= '9') {
    number_ += input[offset + i];
    i += 1;
  }

  return [number_, offset + i];
};

export default (input: string): Input => {
  const result: Operation[] = [];

  let i = 0;
  while (i < input.length) {
    if (input.startsWith('do()', i)) {
      i += 4;
      result.push({op: 'do', args: []});
      continue;
    }

    if (input.startsWith("don't()", i)) {
      i += 7;
      result.push({op: "don't", args: []});
      continue;
    }

    if (input.startsWith('mul(', i)) {
      i += 4;

      const [number1, offset1] = parseNextNumber(input, i);
      i = offset1;
      if (!number1) continue;

      if (input[i] !== ',') continue;
      i += 1;

      const [number2, offset2] = parseNextNumber(input, i);
      i = offset2;
      if (!number2) continue;

      if (input[i] !== ')') continue;
      i += 1;

      result.push({op: 'mul', args: [Number(number1), Number(number2)]});
      continue;
    }

    i += 1;
  }

  return result;
};
