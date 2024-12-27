export type Coords = { readonly x: number; readonly y: number };
export type Directions = { readonly dx: number; readonly dy: number };
export type Dimensions = { readonly width: number; readonly height: number };

export type Cell<T> = InstanceType<typeof Grid.Cell<T>>;

export class Grid<T> extends Object {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  static Cell = class<T> extends Object {
    public readonly symbol: symbol;

    public constructor(
      private readonly grid: Grid<T>,
      private readonly coords: Coords,
    ) {
      const symbol = Symbol.for(`coords=(${coords.x},${coords.y})`);
      super(symbol);

      this.symbol = symbol;
    }

    move({dx, dy}: Directions): Cell<T> {
      return new Grid.Cell(this.grid, {x: this.coords.x + dx, y: this.coords.y + dy});
    }

    get x(): number {
      return this.coords.x;
    }

    get y(): number {
      return this.coords.y;
    }

    get value(): T {
      if (!this.inBounds()) {
        throw new Error(`Out of bounds: x=${this.coords.x}, y=${this.coords.y}`);
      }
      return this.grid.data[this.coords.y][this.coords.x];
    }

    set value(value: T) {
      if (!this.inBounds()) throw new Error(`Out of bounds: x=${this.coords.x}, y=${this.coords.y}`);
      this.grid.data[this.coords.y][this.coords.x] = value;
    }

    inBounds(): boolean {
      return (
        this.coords.x >= 0 &&
        this.coords.x < this.grid.dimensions.width &&
        this.coords.y >= 0 &&
        this.coords.y < this.grid.dimensions.height
      );
    }

    get neighbours(): Array<Cell<T>> {
      const directions = [
        {dx: 0, dy: -1},
        {dx: 1, dy: 0},
        {dx: 0, dy: 1},
        {dx: -1, dy: 0},
      ];

      const neighbours = [];
      for (const direction of directions) {
        const neighbour = this.move(direction);
        if (!neighbour.inBounds()) continue;
        if (neighbour.value === undefined) continue;
        neighbours.push(neighbour);
      }

      return neighbours;
    }

    distanceTo(other: Cell<T>): number {
      return Math.abs(this.coords.x - other.coords.x) + Math.abs(this.coords.y - other.coords.y);
    }

    get [Symbol.toStringTag]() {
      return `Cell({${this.coords.x},${this.coords.y}}=${this.value as any})`;
    }
  };

  static from2dArray<T>(data: T[][]): Grid<T> {
    return new Grid(data);
  }

  private readonly dimensions: Dimensions;

  private constructor(private readonly data: T[][]) {
    super();
    this.dimensions = {width: (data ?? [])[0]?.length ?? 0, height: data?.length ?? 0};
  }

  at(coords: Coords): Cell<T> {
    return new Grid.Cell(this, coords);
  }

  findPath(start: Coords, end: Coords, heuristic: (cell: Cell<T>, context: {current: Cell<T>}) => number = (cell) => 0): Cell<T>[] {
    const openSet: Cell<T>[] = [this.at(start)];
    const visited = new Set<symbol>();

    const cameFrom = new Map<symbol, Cell<T>>();

    const gScore = new Map<symbol, number>();
    gScore.set(this.at(start).symbol, 0);

    const fScore = new Map<symbol, number>();
    fScore.set(this.at(start).symbol, heuristic(this.at(start), {current: this.at(start)}));

    while (openSet.length) {
      openSet.sort((a, b) => (fScore.get(a.symbol) ?? Infinity) - (fScore.get(b.symbol) ?? Infinity));
      const [current] = openSet.splice(0, 1);
      visited.add(current.symbol);

      if (current.symbol === this.at(end).symbol) {
        let cur = current;
        const path = [cur];
        while (cameFrom.has(cur.symbol)) {
          cur = cameFrom.get(cur.symbol)!;
          path.unshift(cur);
        }
        return path;
      }

      for (const neighbour of current.neighbours) {
        if (visited.has(neighbour.symbol)) continue;

        const tentativeScore = (gScore.get(current.symbol) ?? Infinity) + 1;
        if (tentativeScore < (gScore.get(neighbour.symbol) ?? Infinity)) {
          cameFrom.set(neighbour.symbol, current);
          gScore.set(neighbour.symbol, tentativeScore);
          fScore.set(neighbour.symbol, tentativeScore + heuristic(neighbour, {current}));
          openSet.push(neighbour);
        }
      }
    }

    throw new Error(`No path could be found between ${this.at(start)} and ${this.at(end)}`);
  }

  * [Symbol.iterator]() {
    for (let y = 0; y < this.dimensions.height; y++) {
      for (let x = 0; x < this.dimensions.width; x++) {
        if (this.data[y][x] === undefined) continue;
        yield this.at({x, y});
      }
    }
  }

  get [Symbol.toStringTag](): string {
    return `Grid(${this.dimensions.width}x${this.dimensions.height})`;
  }

  toString(): string {
    return this.data.map((line) => line.join('')).join('\n');
  }

  copy(): Grid<T> {
    return new Grid(this.data.map((line) => line.slice()));
  }
}
