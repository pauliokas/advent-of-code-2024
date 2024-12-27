export function* combinations<T>(values: T[], length: number): Generator<T[]> {
  if (length === 0) {
    yield [];
    return;
  }

  if (values.length === 0 || length < 0) {
    return;
  }

  function* backtrack(start: number, path: T[]): Generator<T[]> {
    if (path.length === length) {
      yield [...path];
      return;
    }

    for (let i = start; i < values.length; i++) {
      path.push(values[i]);
      yield* backtrack(i + 1, path);
      path.pop();
    }
  }

  yield* backtrack(0, []);
}
