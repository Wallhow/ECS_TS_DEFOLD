
export const array = {
    get_rnd: <T>(array: T[]): T => array.length > 1 ? array[math.random(0, array.length - 1)] : array[0],
    clear: <T>(array: T[], callback_befor_remove?: (element: T) => void) => {
        if (callback_befor_remove)
            for (const el of array)
                callback_befor_remove(el);
        array.splice(0, array.length);
    },
    sum(this: void, array: number[]): number { return array.length > 1 ? array.reduce((acc, cur) => acc + cur, 0) : array[0]; },

    remove: <T>(array: T[], condition: (element_in_arr: T) => boolean) => {
        const index = array.findIndex((v) => condition(v));
        if (index != -1)
            array.splice(index, 1);
    },
    removeIndex: <T>(array: T[], index: number) => {
        if (index != -1)
            array.splice(index, 1);
    },

    exclude: <T>(array: T[], condition: (element: T) => boolean) => {
        return array.filter(el => !condition(el));
    },

    firstEl: <T>(array: T[]): T => array[0],
    lastEl: <T>(array: T[]): T => array[array.length - 1],
};
