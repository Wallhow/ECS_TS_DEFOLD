import { Iterable } from "../utility/AbleTypes";

/**@noSelf */
export interface IGrid<T> extends Iterable<T, { x: number, y: number, idx: number }> {
    get(x: number, y: number): T | undefined;
    set(x: number, y: number, value: T): void;
    contains(value: T): boolean;
    contains(value: T, condition: (val: T) => boolean): boolean;
    cpy(): IGrid<T>;
    values(): T[];

    rows(): number;
    cols(): number;

    sliceRow(y: number): T[];
    sliceCol(x: number): T[];
}