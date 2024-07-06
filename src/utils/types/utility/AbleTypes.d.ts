
/**@noSelf **/
export interface Iterable<T, IterateData> {
    iterate<R>(iterFun: (value: T, data: IterateData) => R): R
}