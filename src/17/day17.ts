import {type Input, Registers} from './day17.input.js';

enum Operand {
  LITERAL_0 = 0,
  LITERAL_1 = 1,
  LITERAL_2 = 2,
  LITERAL_3 = 3,
  REGISTER_A = 4,
  REGISTER_B = 5,
  REGISTER_C = 6,
  RESERVED = 7,
}

enum Operation {
  ADV = 0,
  BDV = 6,
  CDV = 7,
  BXL = 1,
  BST = 2,
  JNZ = 3,
  BXC = 4,
  OUT = 5,
}

const zzz = (operand: Operand, registers: Registers) => {
  switch (operand) {
    case Operand.LITERAL_0:
      return 0;
    case Operand.LITERAL_1:
      return 1;
    case Operand.LITERAL_2:
      return 2;
    case Operand.LITERAL_3:
      return 3;
    case Operand.REGISTER_A:
      return registers["AX"];
    case Operand.REGISTER_B:
      return registers["BX"];
    case Operand.REGISTER_C:
      return registers["CX"];
    case Operand.RESERVED:
      return 0;
  }
}

const runProgram = (registers: Registers, program: number[]): number[] | undefined => {
  const out: number[] = [];

  let ip = 0;
  while (ip < program.length) {
    const opcode = program[ip++];
    const operand = program[ip++];

    switch (opcode) {
      case Operation.ADV:
        registers["AX"] = Math.floor(registers["AX"] / (2 ** zzz(operand, registers)));
        break;
      case Operation.BDV:
        registers["BX"] = Math.floor(registers["AX"] / (2 ** zzz(operand, registers)));
        break;
      case Operation.CDV:
        registers["CX"] = Math.floor(registers["AX"] / (2 ** zzz(operand, registers)));
        break;
      case Operation.BXL:
        registers["BX"] = registers["BX"] ^ operand;
        break;
      case Operation.BXC:
        registers["BX"] = registers["BX"] ^ registers["CX"];
        break;
      case Operation.BST:
        registers["BX"] = zzz(operand, registers) % 8; // | 0b111
        break;
      case Operation.JNZ:
        if (registers["AX"] !== 0) {
          ip = operand;
        }
        break;
      case Operation.OUT:
        const output = zzz(operand, registers) % 8;
        if (program[out.length + 1] !== output || out.length + 1 > program.length) return undefined;
        out.push(output);
        break;
    }
  }

  return out;
}

export const solvePart1 = ({registers, program}: Input): string => {
  return runProgram(registers, program)?.join(',') ?? '';
};

export const solvePart2 = ({registers,program}: Input): number => {
  const searchString = program.join(',');
  for (let ax = 0; true; ax+=1) {
    const out = runProgram({...registers, AX: ax}, program);
    if (ax % 1000000 === 0) console.log(ax, out?.join(','));
    if (out?.join(',') === searchString) return ax;
  }
  return -1;
};
