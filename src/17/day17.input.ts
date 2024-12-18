export type Registers = {
  AX: number;
  BX: number;
  CX: number;
}
export type Program = number[];
export type Input = {registers: Registers, program: Program};

export default (input: string): Input => {
  const lines = input.trim().split('\n');

  const registers: Registers = {
    AX: Number(lines[0].substring("Register X: ".length)),
    BX: Number(lines[1].substring("Register X: ".length)),
    CX: Number(lines[2].substring("Register X: ".length)),
  }
  const program = lines[4].substring("Program: ".length).split(',').map(Number);

  return {registers,program};
};
