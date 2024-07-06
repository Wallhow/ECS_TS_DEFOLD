export type Pair<T> = [T, T];

export type LimitedTable<Keys extends string, TValue> = { [k in Keys]: TValue };