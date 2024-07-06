/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const file_key = "sys_save_load";


export function set_data(key: string, tab: any) {
    const filename = sys.get_save_file(file_key, key);
    sys.save(filename, tab);
}

export function get_data(key: string) {
    const filename = sys.get_save_file(file_key, key);
    const data = sys.load(filename);
    const [nx] = next(data);
    if (nx == null)
        return null;
    return data;
}

export function get(key: string) {
    print(key);
    const data = get_data(key);
    if (data == null)
        return null;
    else
        return data.value;
}



export function set(key: string, val: any) {
    set_data(key, { value: val });
}

export function get_int(key: string, def = 0): number {
    const data = get_data(key);
    if (data == null)
        return def;
    return data.value;
}

export function get_bool(key: string, def = false): boolean {
    const val: any = get_int(key, -1);
    if (val == -1)
        return def;
    return val == true;
}

export function get_string(key: string, def = ''): string {
    const data = get_data(key);
    if (data == null)
        return def;
    return data.value || '';
}

