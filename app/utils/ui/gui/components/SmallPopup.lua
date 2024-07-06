local ____lualib = require("lualib_bundle")
local __TS__ArrayIndexOf = ____lualib.__TS__ArrayIndexOf
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local ____exports = {}
local _createPopup
local ____Tween = require("utils.defoldTweens.Tween")
local tween = ____Tween.tween
local ____PopupAnimation = require("utils.ui.gui.PopupAnimation")
local newPopupAnimation = ____PopupAnimation.newPopupAnimation
local ____ShrinkText = require("utils.ui.gui.components.ShrinkText")
local newShrinkText = ____ShrinkText.newShrinkText
local ____utilsFun = require("utils.ui.gui.utilsFun")
local getNodesFromTemplate = ____utilsFun.getNodesFromTemplate
function _createPopup(templateName)
    local _hideCalback, _popupShowAnimation, isShow, hideCallback, thisPopup
    function _hideCalback()
        hideCallback(thisPopup)
    end
    function _popupShowAnimation(node, compliteFunc)
        tween(node, "gui").opacityTo(0, 0).opacityTo(0.2, 1, {easing = "EASING_OUTSINE"}).start()
        tween(node, "gui").to(
            0,
            "scale",
            {scale = vmath.vector3(0.5, 0.5, 0.5)}
        ).to(
            0.6,
            "scale",
            {scale = vmath.vector3(1, 1, 1)},
            {easing = "EASING_OUTEXPO", compliteFunc = compliteFunc}
        ).start()
        tween(node, "gui").to(
            0,
            "position.y",
            {y = gui.get_position(node).y - 150}
        ).by(0.6, "position.y", {y = 150}, {easing = "EASING_OUTEXPO", compliteFunc = compliteFunc}).start()
        return undefined
    end
    local clonedNodes = gui.clone_tree(gui.get_node(templateName .. "/root"))
    local nodes = getNodesFromTemplate(templateName, {"window", "label", "root"}, clonedNodes)
    local popupAnim = newPopupAnimation(nodes.root)
    popupAnim.setAnimation("show", _popupShowAnimation)
    popupAnim.popupEvents.on(
        "show",
        function()
            isShow = true
            return isShow
        end
    )
    popupAnim.popupEvents.on(
        "hide",
        function()
            isShow = false
            _hideCalback()
        end
    )
    local show = popupAnim.show
    local hide = popupAnim.hide
    local shrinkText = newShrinkText(nodes.label, "x")
    isShow = false
    hideCallback = function(popup)
    end
    local function setText(text)
        shrinkText.set(text)
    end
    thisPopup = {
        setText = setText,
        show = show,
        hide = hide,
        setHideCallback = function(callback)
            hideCallback = callback
            return hideCallback
        end,
        isShow = isShow,
        nodes = nodes
    }
    return thisPopup
end
____exports.newGUIPopup = _createPopup
function ____exports.newGUIPopups(templateName, position)
    local _init, _popupHideHandler, _activatePopup, _moveActivePopups, popupsQueuePool, popupsActive, messageQueue, maxCountPopups, durationShowPopup
    function _init()
        for _ = 0, maxCountPopups - 1 do
            local popup = ____exports.newGUIPopup(templateName)
            popup.setHideCallback(_popupHideHandler)
            popupsQueuePool[#popupsQueuePool + 1] = popup
        end
    end
    function _popupHideHandler(popup)
        local index = __TS__ArrayIndexOf(popupsActive, popup)
        if index ~= -1 then
            __TS__ArraySplice(popupsActive, index, 1)
            if #messageQueue > 0 then
                local message = __TS__ArraySplice(messageQueue, 0, 1)
                _activatePopup(popup, message[1])
            else
                popupsQueuePool[#popupsQueuePool + 1] = popup
            end
        end
    end
    function _activatePopup(popup, text)
        _moveActivePopups()
        local pos = vmath.vector3(position)
        gui.set_position(popup.nodes.root, pos)
        popup.setText(text)
        popup.show()
        timer.delay(
            durationShowPopup,
            false,
            function() return popup.hide() end
        )
        popupsActive[#popupsActive + 1] = popup
    end
    function _moveActivePopups()
        for index = 0, #popupsActive - 1 do
            local pop = popupsActive[#popupsActive - 1 - index + 1]
            tween(pop.nodes.root, "gui").by(
                0.3,
                "position.y",
                {y = 20 + gui.get_size(pop.nodes.window).y},
                {easing = "EASING_OUTEXPO"}
            ).start()
            tween(pop.nodes.root, "gui").opacityTo(0.3, 1 - (index + 1) / maxCountPopups).start()
        end
    end
    popupsQueuePool = {}
    popupsActive = {}
    messageQueue = {}
    maxCountPopups = 5
    durationShowPopup = 1.5
    _init()
    local function emitPopup(text)
        if #popupsQueuePool > 0 then
            local popup = table.remove(popupsQueuePool)
            if popup ~= undefined then
                _activatePopup(popup, text)
            end
        else
            messageQueue[#messageQueue + 1] = text
        end
    end
    return {emitPopup = emitPopup}
end
return ____exports
