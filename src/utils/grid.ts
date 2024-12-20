export type Coords = {readonly x: number; readonly y: number};
export type Directions = {readonly dx: number; readonly dy: number};
export type Dimensions = {readonly width: number; readonly height: number};

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
      if (!this.inBounds()) throw new Error(`Out of bounds: x=${this.coords.x}, y=${this.coords.y}`);
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
      return [
        {dx: 0, dy: -1},
        {dx: 1, dy: 0},
        {dx: 0, dy: 1},
        {dx: -1, dy: 0},
      ]
        .map((direction) => this.move(direction))
        .filter((cell) => cell.inBounds());
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
    this.dimensions = {width: data?.length ?? 0, height: (data ?? [])[0]?.length ?? 0};
  }

  at(coords: Coords): Cell<T> {
    return new Grid.Cell(this, coords);
  }

  *[Symbol.iterator]() {
    for (let x = 0; x < this.dimensions.width; x++) {
      for (let y = 0; y < this.dimensions.height; y++) {
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
