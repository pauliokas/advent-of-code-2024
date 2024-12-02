export type Input = string[];

export default (input: string): Input => input.trim().split('\n');
