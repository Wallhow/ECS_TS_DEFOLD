/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DataStorage } from "./declare/DataStorage";

export function CloudDataStorage<SchemaStorage extends object>(defaultValues: SchemaStorage, storageName = 'storage'): DataStorage<SchemaStorage> {
    type Keys = keyof typeof defaultValues;
    const cache = { ...defaultValues };
    const prefix = storageName + '_';

    const storage = Ads.bridge.storage;
    /* jstodef.add_listener((_, message_id, message) => {
        pprint(message_id)
        pprint(message)
    }) */
    load();

    function set<T extends Keys>(key: T, value: SchemaStorage[T]) {
        pprint('save to cloud storage');
        cache[key] = value;
        storage.set(prefix + (key as string), tostring(value));
    }

    function get<T extends Keys>(key: T): SchemaStorage[T] {
        return cache[key];
    }

    function load() {
        Object.keys(defaultValues).forEach(key => _loadItem(key));
    }

    function _loadItem(key: string) {
        const val = storage.get(prefix + key);
        pprint(storage.get(prefix + key));
        if (val == undefined || val == '')
            set(key as Keys, defaultValues[key as Keys]);
        else
            cache[key as Keys] = json.decode(val, {}).value;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument



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
