/* eslint-disable @typescript-eslint/no-unsafe-return */
import { IGrid } from "../types/collections/IGrid";

export function newGrid<T>(sizeX: number, sizeY: number, initialFun: (x: number, y: number) => T): IGrid<T> {
    const grid: T[] = [];

    for (const y of $range(0, sizeY - 1))
        for (const x of $range(0, sizeX - 1))
            grid[toIndex(x, y)] = initialFun(x, y);

    function get(x: number, y: number): T | undefined {
        const _x = math.floor(x);
        const _y = math.floor(y);
        if (_isInBounds(_x, _y)) {
            return grid[toIndex(_x, _y)];
        } else return undefined;
    }

    function set(x: number, y: number, value: T): void {
        const _x = math.floor(x);
        const _y = math.floor(y);
        if (_isInBounds(_x, _y))
            grid[toIndex(_x, _y)] = value;
    }

    function cpy() {
        const copyGrid = newGrid<T>(sizeX, sizeY, initialFun);
        for (const y of $range(0, sizeY - 1)) {
            for (const x of $range(0, sizeX - 1)) {
                copyGrid.set(x, y, get(x, y)!);
            }
        }
        return copyGrid;
    }

    function contains(value: T): boolean;
    function contains(value: T, condition?: (val: T) => boolean): boolean {
        const cond = condition != undefined ? condition : (v: T) => v == value;
        return grid.find(v => cond(v)) != undefined;

    }

    function _isInBounds(x: number, y: number): boolean {
        return x >= 0 && x < sizeX && y >= 0 && y < sizeY;
    }

    function rows(): number {
        return sizeY;
    }
    function cols(): number {
        return sizeX;
    }

    function sliceRow(y: number): T[] {
        return grid.slice(y * sizeX, (y + 1) * sizeX);
    }

    function sliceCol(x: number): T[] {
        const colStartIndex = toIndex(x, 0);
        const colEndIndex = toIndex(x, sizeY - 1);
        return grid.slice(colStartIndex, colEndIndex);
    }

    function iterate<R>(iterFun: (value: T, data: { x: number, y: number, idx: number }) => R): R {
        for (const y of $range(0, sizeY - 1))
            for (const x of $range(0, sizeX - 1)) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const result = iterFun(get(x, y), { x, y, idx: y * sizeX + x });
                if (result != undefined)
                    return result;
            }


    }

    function toIndex(x: number, y: number): number {
        return y * sizeX + x;
    }

    return {
        get, set, cpy, contains, values: () => grid, rows, cols, iterate, sliceRow, sliceCol
    };
}