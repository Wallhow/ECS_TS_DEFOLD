local ____exports = {}
local function UUID()
    local uuids = {}
    local function get(key)
        if uuids[key] == nil then
            uuids[key] = 0
        end
        uuids[key] = uuids[key] + 1
        return (key .. "_") .. tostring(uuids[key])
    end
    return {get = get}
end
____exports.default = UUID()
return ____exports
