import {Coords, Dimensions, Direction} from "./grid.js";

export type Input = { grid: Record<string, MapObject>, dimensions: Dimensions; robot: Coords, movement: string };

export type Box = 'O';
export type Wall = '#';
export type MapObject = Box | Wall;

export default (input: string): Input => {
    const [gridStr, movementStr] = input.split('\n\n');
    const mapData: Record<string, MapObject> = {};
    let robot: Coords | undefined;

    const grid = gridStr.split('\n').map((line, y) => line.split(''));
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === '.') continue;
            if (grid[y][x] === '@') {
                robot = {x, y};
                continue;
            }
            mapData[`${x},${y}`] = grid[y][x] as MapObject;
        }
    }

    return {
        grid: mapData,
        dimensions: {width: grid[0].length, height: grid.length},
        robot: robot!,
        movement: movementStr.split('\n').join('')
    };
};
