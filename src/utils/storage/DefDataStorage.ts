/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DataStorage } from "./declare/DataStorage";

export function DefDataStorage<SchemaStorage extends object>(defaultValues: SchemaStorage, storageName = 'storage'): DataStorage<SchemaStorage> {
    type Keys = keyof typeof defaultValues;
    const cache = { ...defaultValues };
    const prefix = storageName + '_';
    load();

    function set<T extends Keys>(key: T, value: SchemaStorage[T]) {
        cache[key] = value;
        Storage.set(prefix + (key as string), json.encode({ value: value }, {}));
    }

    function get<T extends Keys>(key: T): SchemaStorage[T] {
        return cache[key];
    }

    function load() {
        Object.keys(defaultValues).forEach(key => _loadItem(key));
    }

    function _loadItem(key: string) {
        let storageValue = Storage.get(prefix + key);
        if (storageValue == undefined) {
            storageValue =json.encode({ value: defaultValues[key as Keys] }, {});
            Storage.set(prefix + key, storageValue);
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
        cache[key as Keys] = json.decode(storageValue, {}).value;
    }

    function clear() {
        Object.keys(cache).forEach(key => {
            set(key as Keys, defaultValues[key as Keys]);
        });
    }

    return {
        set, get, load, clear, schemaObject: defaultValues
    };
}
