import {describe, it} from "node:test";
import {Grid} from "./grid.js";
import assert from "node:assert/strict";

describe('Grid', () => {
  describe('.findPath()', () => {
    it('should find a simple path', () => {
      const grid = Grid.from2dArray([
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ]);

      const path = grid.findPath({x: 0, y: 0}, {x: 2, y: 2});

      assert.deepEqual(path.map(c => c.toString()),
        [
          '[object Cell({0,0}=1)]',
          '[object Cell({1,0}=1)]',
          '[object Cell({2,0}=1)]',
          '[object Cell({2,1}=1)]',
          '[object Cell({2,2}=1)]'
        ]
      );
    });

    it('should raise an error if no path can be found', () => {
      const grid = Grid.from2dArray([
        [1, 1, 1],
        [1, undefined, undefined],
        [1, undefined, 1],
      ]);

      try {
        grid.findPath({x: 0, y: 0}, {x: 2, y: 2});
        assert.fail('Expected an error');
      } catch (error) {
        assert.equal((error as any).message, 'No path could be found between [object Cell({0,0}=1)] and [object Cell({2,2}=1)]');
      }
    });

    it('should find cheapest path', () => {
      const grid = Grid.from2dArray([
        [1, 1, 1],
        [1, 9, 9],
        [1, 8, 1],
      ]);

      const path = grid.findPath({x: 0, y: 0}, {x: 2, y: 2}, (cell) => cell.value);

      assert.deepEqual(path.map(c => c.toString()),
        [
          '[object Cell({0,0}=1)]',
          '[object Cell({0,1}=1)]',
          '[object Cell({0,2}=1)]',
          '[object Cell({1,2}=8)]',
          '[object Cell({2,2}=1)]'
        ]
      );
    });
  });
});
