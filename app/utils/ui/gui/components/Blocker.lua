local ____exports = {}
local ____UUID = require("utils.UUID")
local UUID = ____UUID.default
local ____Tween = require("utils.defoldTweens.Tween")
local tween = ____Tween.tween
function ____exports._createBlocker(druid, parentNode, inputBlockOnStart, isVisible)
    if isVisible == nil then
        isVisible = false
    end
    local w, h = window.get_size()
    local blockerNode = gui.new_box_node(
        vmath.vector3(0, 0, 0),
        vmath.vector3(w, h, 0)
    )
    local blockerName = UUID.get("blocker")
    gui.set_adjust_mode(blockerNode, gui.ADJUST_STRETCH)
    gui.set_parent(blockerNode, parentNode, false)
    gui.set_visible(blockerNode, isVisible)
    gui.set_id(blockerNode, blockerName)
    local inputBlocker = druid:new_blocker(blockerName)
    inputBlocker:set_enabled(inputBlockOnStart)
    local function refresh(onBlock)
        if onBlock == nil then
            onBlock = inputBlockOnStart
        end
        druid:remove(inputBlocker)
        inputBlocker = druid:new_blocker(blockerName)
        inputBlocker:set_enabled(onBlock)
    end
    return {
        getBlocker = function() return inputBlocker end,
        refresh = refresh,
        node = blockerNode
    }
end
____exports.newBlocker = ____exports._createBlocker
function ____exports.newBlockerShadowAnimations(blocker, color)
    if color == nil then
        color = vmath.vector4(0, 0, 0, 0)
    end
    local function show(compliteFunc)
        gui.set_visible(blocker.node, true)
        tween(blocker.node, "gui").to(0, "color", {color = color}).opacityTo(0.2, 0.45, {easing = "EASING_OUTSINE"}).call(function()
            if compliteFunc ~= nil then
                compliteFunc()
            end
        end).start()
    end
    local function hide(compliteFunc)
        tween(blocker.node, "gui").opacityTo(0.2, 0, {easing = "EASING_OUTSINE"}).call(function()
            if compliteFunc ~= nil then
                compliteFunc()
            end
        end).start()
    end
    return {show = show, hide = hide}
end
return ____exports
