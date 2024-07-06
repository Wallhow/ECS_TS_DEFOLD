local ____lualib = require("lualib_bundle")
local Error = ____lualib.Error
local RangeError = ____lualib.RangeError
local ReferenceError = ____lualib.ReferenceError
local SyntaxError = ____lualib.SyntaxError
local TypeError = ____lualib.TypeError
local URIError = ____lualib.URIError
local ____exports = {}
local _newTweensForGO
local ____TweenGUI = require("utils.defoldTweens.TweenGUI")
local _newTweensForNode = ____TweenGUI._newTweensForNode
function _newTweensForGO(obj)
    error(
        Error(nil, "Tween for go is not implemented"),
        0
    )
    return {}
end
function ____exports.tween(obj, ____type)
    local ____temp_0
    if ____type == "gui" then
        ____temp_0 = _newTweensForNode(obj)
    else
        ____temp_0 = _newTweensForGO(obj)
    end
    return ____temp_0
end
return ____exports
