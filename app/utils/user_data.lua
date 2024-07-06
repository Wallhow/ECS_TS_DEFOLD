local ____exports = {}
local file_key = "sys_save_load"
function ____exports.set_data(key, tab)
    local filename = sys.get_save_file(file_key, key)
    sys.save(filename, tab)
end
function ____exports.get_data(key)
    local filename = sys.get_save_file(file_key, key)
    local data = sys.load(filename)
    local nx = next(data)
    if nx == nil then
        return nil
    end
    return data
end
function ____exports.get(key)
    print(key)
    local data = ____exports.get_data(key)
    if data == nil then
        return nil
    else
        return data.value
    end
end
function ____exports.set(key, val)
    ____exports.set_data(key, {value = val})
end
function ____exports.get_int(key, def)
    if def == nil then
        def = 0
    end
    local data = ____exports.get_data(key)
    if data == nil then
        return def
    end
    return data.value
end
function ____exports.get_bool(key, def)
    if def == nil then
        def = false
    end
    local val = ____exports.get_int(key, -1)
    if val == -1 then
        return def
    end
    return val == true
end
function ____exports.get_string(key, def)
    if def == nil then
        def = ""
    end
    local data = ____exports.get_data(key)
    if data == nil then
        return def
    end
    return data.value or ""
end
return ____exports
