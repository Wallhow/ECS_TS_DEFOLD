
function UUID() {
    const uuids: { [key: string]: number } = {};

    function get(key: string): string {
        if (uuids[key] == undefined) uuids[key] = 0;
        uuids[key] += 1;
        return key + "_" + uuids[key];
    }

    return {
        get
    };
}

export default UUID();