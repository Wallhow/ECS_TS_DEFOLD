local ____exports = {}
local _createPopupAnimbation
local ____Tween = require("utils.defoldTweens.Tween")
local tween = ____Tween.tween
local ____easyEvents = require("utils.events.easyEvents")
local newEasyEvents = ____easyEvents.newEasyEvents
function _createPopupAnimbation(rootNode, autoDisableNodeAfterHide)
    if autoDisableNodeAfterHide == nil then
        autoDisableNodeAfterHide = true
    end
    local _action
    function _action(anim, func)
        local res = anim(rootNode)
        if res ~= nil then
            res.call(function() return func() end).start()
        else
            func()
        end
    end
    local e = newEasyEvents(
        {"show", "hide"},
        {
            show = function(self)
            end,
            hide = function(self)
            end
        }
    )
    local animations = {
        show = function(rootNode, compliteFunc)
            tween(rootNode, "gui").opacityTo(0, 0).opacityTo(0.2, 1, {easing = "EASING_OUTSINE"}).start()
            tween(rootNode, "gui").to(
                0,
                "scale",
                {scale = vmath.vector3(0.5, 0.5, 0.5)}
            ).to(
                0.5,
                "scale",
                {scale = vmath.vector3(1, 1, 1)},
                {easing = "EASING_OUTELASTIC", compliteFunc = compliteFunc}
            ).start()
            return nil
        end,
        hide = function(rootNode, compliteFunc)
            tween(rootNode, "gui").opacityTo(0.5, 0, {easing = "EASING_OUTSINE", compliteFunc = compliteFunc}).start()
            return tween(rootNode, "gui").to(
                0.5,
                "scale",
                {scale = vmath.vector3(0.5, 0.5, 1)},
                {easing = "EASING_OUTSINE"}
            )
        end
    }
    local ____autoDisableNodeAfterHide_0
    if autoDisableNodeAfterHide then
        ____autoDisableNodeAfterHide_0 = function() return gui.set_enabled(rootNode, false) end
    else
        ____autoDisableNodeAfterHide_0 = nil
    end
    local disableFunc = ____autoDisableNodeAfterHide_0
    local ____autoDisableNodeAfterHide_1
    if autoDisableNodeAfterHide then
        ____autoDisableNodeAfterHide_1 = function() return gui.set_enabled(rootNode, true) end
    else
        ____autoDisableNodeAfterHide_1 = nil
    end
    local enableFunc = ____autoDisableNodeAfterHide_1
    local function show()
        if enableFunc ~= nil then
            enableFunc()
        end
        _action(
            animations.show,
            function() return e.emit("show") end
        )
    end
    local function hide()
        local function __disable()
            if disableFunc ~= nil then
                disableFunc()
            end
            e.emit("hide")
        end
        _action(animations.hide, __disable)
    end
    --- Если в animFunc возвращается TweensForNode то метод show или hide сами вызовут start добавив при этом в конце анимация эмит события соответствующей анимации 
    -- в противном случае события будут вызваны сразу же
    -- 
    -- @param key
    -- @param animFunc
    local function setAnimation(key, animFunc)
        animations[key] = animFunc
    end
    return {show = show, hide = hide, setAnimation = setAnimation, popupEvents = e}
end
function ____exports.newPopupAnimation(rootNode, autoDisableNodeAfterHide)
    if autoDisableNodeAfterHide == nil then
        autoDisableNodeAfterHide = true
    end
    return _createPopupAnimbation(rootNode, autoDisableNodeAfterHide)
end
return ____exports
