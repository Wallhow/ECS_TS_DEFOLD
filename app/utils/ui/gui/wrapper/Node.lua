local ____lualib = require("lualib_bundle")
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local ____exports = {}
function ____exports.Node(node, constructor)
    local ____temp_0
    if type(node) == "string" then
        ____temp_0 = gui.get_node(node)
    else
        ____temp_0 = node
    end
    local _node = ____temp_0
    local methods = {}
    for ____, method in ipairs(__TS__ObjectKeys(gui)) do
        if type(gui[method]) == "function" then
            methods[method] = function(...)
                local func = gui[method]
                return func(_node, ...)
            end
        end
    end
    if constructor ~= nil then
        constructor(methods, node)
    end
    return __TS__ObjectAssign({}, methods, {self = _node})
end
return ____exports
