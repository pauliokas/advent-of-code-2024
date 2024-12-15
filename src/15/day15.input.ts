export type Coords = { x: number, y: number };

export type Movement = '^' | 'v' | '<' | '>';
export type Input = { grid: string[][]; robot: Coords, movement: Movement[] };

export default (input: string): Input => {
    const [gridStr, movementStr] = input.split('\n\n');
    let robot: Coords | undefined;

    const grid = gridStr.split('\n').map((line, y) => line.split(''));
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === '.') grid[y][x] = ' ';
            else if (grid[y][x] === '@') {
                robot = {x, y};
                grid[y][x] = ' ';
            }
        }
    }

    return {
        grid: grid,
        robot: robot!,
        movement: movementStr.split('\n').flatMap(line => line.split('')) as Movement[],
    };
};
