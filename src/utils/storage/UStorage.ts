/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CloudDataStorage } from "./CloudDataStorage";
import { DefDataStorage } from "./DefDataStorage";
import { DataStorage } from "./declare/DataStorage";

//Типа UniversalStorage :D
export function UStorage<SchemaStorage extends object>(defaultValues: SchemaStorage, storageName = 'storage'): DataStorage<SchemaStorage> {
    type Keys = keyof typeof defaultValues;

    const proxy = getProxy();

    function getProxy() {
        //const isCloudSupported = html5 != undefined && Ads.bridge.storage.isSupported();
        const isCloudSupported = false;

        return isCloudSupported ? CloudDataStorage(defaultValues, storageName) : DefDataStorage(defaultValues, storageName);
    }

    load();

    function set<T extends Keys>(key: T, value: SchemaStorage[T]) {
        proxy.set(key, value);
    }

    function get<T extends Keys>(key: T): SchemaStorage[T] {
        return proxy.get(key);
    }

    function load() {
        proxy.load();
    }

    function clear() {
        proxy.clear();
    }

    return {
        set, get, load, clear, schemaObject: defaultValues
    };
}
