/**
 * @noSelf
 */
export interface DataStorage<SchemaStorage extends object> {
    get<T extends keyof SchemaStorage>(key: T): SchemaStorage[T];
    set<T extends keyof SchemaStorage>(key: T, value: SchemaStorage[T]): void;
    load(): void;
    clear(): void;
    schemaObject: SchemaStorage;
}
