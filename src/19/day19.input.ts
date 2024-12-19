export type Input = {patterns: Set<string>; designs: string[]};

export default (input: string): Input => {
  const [patterns, _, ...designs] = input.trim().split('\n');
  return {
    patterns: new Set(patterns.split(', ')),
    designs,
  };
};
