export type Input = number[];

export default (input: string): Input => input.trim().split('\n').map(Number);
