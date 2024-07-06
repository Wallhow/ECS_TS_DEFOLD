/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

export type StrEnum<T extends string> = { [K in T]: K };

export function newStrEnum<T extends string>(arr: readonly T[]): StrEnum<T> {
    return arr.reduce((acc, val) => {
        acc[val] = val;
        return acc;
    }, {} as any);
}