import {Coords, type Input} from './day15.input.js';

type Direction = { dx: number, dy: number };

const directions = {
    '^': {dx: 0, dy: -1} as const,
    'v': {dx: 0, dy: +1} as const,
    '<': {dx: -1, dy: 0} as const,
    '>': {dx: +1, dy: 0} as const,
} as const;

const moveSmallBox = (grid: string[][], {x, y}: Coords, {dx, dy}: Direction): [Coords, Coords][] => {
    if (grid[y + dy][x + dx] === '#') return [];

    let transformations: [Coords, Coords][] = [];
    if (grid[y + dy][x + dx] === 'O') {
        transformations = moveSmallBox(grid, {x: x + dx, y: y + dy}, {dx, dy});
        if (transformations.length === 0) return [];
    }

    return [...transformations, [{x, y}, {x: x + dx, y: y + dy}]];
}

const moveLargeBox = (grid: string[][], {x,y}: Coords, {dx,dy}: Direction): [Coords, Coords][] => {
    if (grid[y + dy][x + dx] === '#') return [];

    let transformations: [Coords, Coords][] = [];
    if (grid[y + dy][x + dx] === '[' || grid[y + dy][x + dx] === ']') {
        transformations = moveLargeBox(grid, {x: x + dx, y: y + dy}, {dx, dy});
        if (transformations.length === 0) return [];
    }

    const box = [
        ...(grid[y][x] === ']' ? [{x: x - 1, y}] : []),
        {x,y},
        ...(grid[y][x] === '[' ? [{x: x + 1, y}] : []),
    ].sort((a,b) => -1 * dx * (a.x - b.x));

    const zzz = box.map((z): [Coords, Coords] => [z, {x: z.x + dx, y: z.y + dy}]);
    return [...transformations, ...zzz];
}

export const solvePart1 = ({grid, movement, robot: initialPosition}: Input): number => {
    let robot = initialPosition;

    for (const mov of movement) {
        const direction = directions[mov];

        let transformations: [Coords, Coords][] = [[{x: robot.x, y: robot.y}, {x: robot.x + direction.dx, y: robot.y + direction.dy}]];
        if (grid[robot.y + direction.dy][robot.x + direction.dx] === 'O') {
            const boxTransformations = moveSmallBox(grid, {x: robot.x + direction.dx, y: robot.y + direction.dy}, direction);
            if (boxTransformations.length === 0) continue;
            transformations = [...boxTransformations, ...transformations];
        } else if (grid[robot.y + direction.dy][robot.x + direction.dx] === '#') {
            continue;
        }

        for (const [from, to] of transformations) {
            grid[to.y][to.x] = grid[from.y][from.x];
        }

        robot = {x: robot.x + direction.dx, y: robot.y + direction.dy};
    }

    let gpsSum = 0;
    for (let y = 0; y < grid.length; y += 1) {
        for (let x = 0; x < grid[y].length; x += 1) {
            if (grid[y][x] === 'O') gpsSum += 100 * y + x;
        }
    }

    return gpsSum;
};

export const solvePart2 = ({movement, ...input}: Input): number => {
    const grid = input.grid.map(line => line.flatMap(cell => {
        if (cell === 'O') return ['[', ']'];
        if (cell === '#') return ['#', '#'];
        if (cell === ' ') return [' ', ' '];
        throw new Error(`Unexpected cell: ${cell}`)
    }));
    let robot = {x: input.robot.x * 2, y: input.robot.y};

    for (const mov of movement) {
        const direction = directions[mov];

        let transformations: [Coords, Coords][] = [[{x: robot.x, y: robot.y}, {x: robot.x + direction.dx, y: robot.y + direction.dy}]];
        if (grid[robot.y + direction.dy][robot.x + direction.dx] === '[' || grid[robot.y + direction.dy][robot.x + direction.dx] === ']') {
            const boxTransformations = moveLargeBox(grid, {x: robot.x + direction.dx, y: robot.y + direction.dy}, direction);
            if (boxTransformations.length === 0) continue;
            transformations = [...boxTransformations, ...transformations];
        } else if (grid[robot.y + direction.dy][robot.x + direction.dx] === '#') {
            continue;
        }

        for (const [from, to] of transformations) {
            grid[to.y][to.x] = grid[from.y][from.x];
        }

        robot = {x: robot.x + direction.dx, y: robot.y + direction.dy};

        console.log(grid.map(line => line.join('')).join('\n'));
    }

    let gpsSum = 0;
    for (let y = 0; y < grid.length; y += 1) {
        for (let x = 0; x < grid[y].length; x += 1) {
            if (grid[y][x] === 'O') gpsSum += 100 * y + x;
        }
    }

    return gpsSum;

};
