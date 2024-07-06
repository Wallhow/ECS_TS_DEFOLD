local ____lualib = require("lualib_bundle")
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local ____exports = {}
function ____exports.CloudDataStorage(defaultValues, storageName)
    if storageName == nil then
        storageName = "storage"
    end
    local set, load, _loadItem, cache, prefix, storage
    function set(key, value)
        pprint("save to cloud storage")
        cache[key] = value
        storage.set(
            prefix .. key,
            tostring(value)
        )
    end
    function load()
        __TS__ArrayForEach(
            __TS__ObjectKeys(defaultValues),
            function(____, key) return _loadItem(key) end
        )
    end
    function _loadItem(key)
        local val = storage.get(prefix .. key)
        pprint(storage.get(prefix .. key))
        if val == nil or val == "" then
            set(key, defaultValues[key])
        else
            cache[key] = json.decode(val, {}).value
        end
    end
    cache = __TS__ObjectAssign({}, defaultValues)
    prefix = storageName .. "_"
    storage = Ads.bridge.storage
    load()
    local function get(key)
        return cache[key]
    end
    local function clear()
        __TS__ArrayForEach(
            __TS__ObjectKeys(cache),
            function(____, key)
                set(key, defaultValues[key])
            end
        )
    end
    return {
        set = set,
        get = get,
        load = load,
        clear = clear,
        schemaObject = defaultValues
    }
end
return ____exports
