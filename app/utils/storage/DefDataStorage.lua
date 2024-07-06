local ____lualib = require("lualib_bundle")
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local ____exports = {}
function ____exports.DefDataStorage(defaultValues, storageName)
    if storageName == nil then
        storageName = "storage"
    end
    local load, _loadItem, cache, prefix
    function load()
        __TS__ArrayForEach(
            __TS__ObjectKeys(defaultValues),
            function(____, key) return _loadItem(key) end
        )
    end
    function _loadItem(key)
        local storageValue = Storage.get(prefix .. key)
        if storageValue == nil then
            storageValue = json.encode({value = defaultValues[key]}, {})
            Storage.set(prefix .. key, storageValue)
        end
        cache[key] = json.decode(storageValue, {}).value
    end
    cache = __TS__ObjectAssign({}, defaultValues)
    prefix = storageName .. "_"
    load()
    local function set(key, value)
        cache[key] = value
        Storage.set(
            prefix .. key,
            json.encode({value = value}, {})
        )
    end
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
