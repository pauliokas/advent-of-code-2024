export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type Activate = 'A';
export type Input = (Digit | Activate)[][];

export default (input: string): Input => input.trim().split('\n').map(line => line.split('') as (Digit | Activate)[]);
