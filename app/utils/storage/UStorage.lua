local ____exports = {}
local ____CloudDataStorage = require("utils.storage.CloudDataStorage")
local CloudDataStorage = ____CloudDataStorage.CloudDataStorage
local ____DefDataStorage = require("utils.storage.DefDataStorage")
local DefDataStorage = ____DefDataStorage.DefDataStorage
function ____exports.UStorage(defaultValues, storageName)
    if storageName == nil then
        storageName = "storage"
    end
    local getProxy, load, proxy
    function getProxy()
        local isCloudSupported = false
        local ____isCloudSupported_0
        if isCloudSupported then
            ____isCloudSupported_0 = CloudDataStorage(defaultValues, storageName)
        else
            ____isCloudSupported_0 = DefDataStorage(defaultValues, storageName)
        end
        return ____isCloudSupported_0
    end
    function load()
        proxy.load()
    end
    proxy = getProxy()
    load()
    local function set(key, value)
        proxy.set(key, value)
    end
    local function get(key)
        return proxy.get(key)
    end
    local function clear()
        proxy.clear()
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
