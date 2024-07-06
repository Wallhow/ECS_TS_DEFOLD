local ____exports = {}
local _createPopup
local ____easyEvents = require("utils.events.easyEvents")
local newEasyEvents = ____easyEvents.newEasyEvents
local ____Blocker = require("utils.ui.gui.components.Blocker")
local newBlocker = ____Blocker.newBlocker
local newBlockerShadowAnimations = ____Blocker.newBlockerShadowAnimations
local ____PopupAnimation = require("utils.ui.gui.PopupAnimation")
local newPopupAnimation = ____PopupAnimation.newPopupAnimation
local ____ShrinkText = require("utils.ui.gui.components.ShrinkText")
local newShrinkText = ____ShrinkText.newShrinkText
local ____utilsFun = require("utils.ui.gui.utilsFun")
local getNodesFromTemplate = ____utilsFun.getNodesFromTemplate
function _createPopup(druid, templateName)
    local _init, _changeState, _createTextContentContainer, nodes, blocker, btnDruid, emit, _isShow
    function _init()
        local btnDruid = druid:new_button(
            nodes.button,
            function() return emit("PRESS_BUTTON") end
        )
        local container = _createTextContentContainer()
        return {btnDruid = btnDruid, container = container}
    end
    function _changeState(state)
        blocker.getBlocker():set_enabled(state)
        btnDruid:set_enabled(state)
        _isShow = state
    end
    function _createTextContentContainer()
        local _clear, _updatePositionContainer, srcPosition, sizeContainer, labels, countLine
        function _clear()
            for ____, label in ipairs(labels) do
                gui.delete_node(label)
            end
            labels = {}
            countLine = 0
            gui.set_position(nodes.contentContainer, srcPosition)
        end
        function _updatePositionContainer(cLines)
            if cLines == nil then
                cLines = countLine
            end
            local positionContainer = gui.get_position(nodes.contentContainer)
            local deltaY = sizeContainer.y / 2 * (cLines == 0 and -1 or 1)
            positionContainer.y = positionContainer.y + deltaY
            gui.set_position(nodes.contentContainer, positionContainer)
        end
        local container = druid:new_static_grid(nodes.contentContainer, nodes.labelH1, 1)
        srcPosition = gui.get_position(nodes.contentContainer)
        sizeContainer = gui.get_size(nodes.contentContainer)
        labels = {}
        countLine = 0
        container.on_clear:subscribe(_clear)
        srcPosition.y = srcPosition.y - sizeContainer.y / 2
        _updatePositionContainer()
        local function addTextLine(text, shrinkAxis)
            if shrinkAxis == nil then
                shrinkAxis = "x"
            end
            local label = gui.clone_tree(nodes.labelH1)
            local newLabelNode = label[templateName .. "/labelH1"]
            gui.set_enabled(newLabelNode, true)
            newShrinkText(newLabelNode, shrinkAxis, false).set(text)
            if countLine > 0 then
                _updatePositionContainer()
            end
            countLine = countLine + 1
            container:add(newLabelNode, countLine)
            labels[#labels + 1] = newLabelNode
        end
        return {
            addTextLine = addTextLine,
            clear = function() return container:clear() end
        }
    end
    nodes = getNodesFromTemplate(templateName, {
        "center",
        "blockerParent",
        "root",
        "window",
        "button",
        "label",
        "contentContainer",
        "labelH1"
    })
    local events = newEasyEvents(
        {"PRESS_BUTTON"},
        {PRESS_BUTTON = function(self)
        end}
    )
    local popupAnim = newPopupAnimation(nodes.root)
    blocker = newBlocker(druid, nodes.blockerParent, true)
    local blockerAnim = newBlockerShadowAnimations(
        blocker,
        vmath.vector4(1, 1, 1, 1)
    )
    popupAnim.popupEvents.on(
        "show",
        function() return blockerAnim.show(function() return _changeState(true) end) end
    )
    popupAnim.popupEvents.on(
        "hide",
        function() return blockerAnim.hide(function() return _changeState(false) end) end
    )
    local ____init_result_0 = _init()
    local container = ____init_result_0.container
    btnDruid = ____init_result_0.btnDruid
    local on = events.on
    emit = events.emit
    local show = popupAnim.show
    local hide = popupAnim.hide
    local shrinkTextButton = newShrinkText(nodes.label, "x")
    _isShow = false
    _changeState(false)
    local function setButtonText(text)
        shrinkTextButton.set(text)
    end
    local function addTextLine(text, shrinkAxis)
        if shrinkAxis == nil then
            shrinkAxis = "x"
        end
        container.addTextLine(text, shrinkAxis)
    end
    return {
        setButtonText = setButtonText,
        addTextLine = addTextLine,
        clear = function()
            container.clear()
            events.final()
        end,
        on = on,
        show = show,
        hide = hide,
        isShow = function() return _isShow end
    }
end
____exports.newGUIWindowPopup = _createPopup
return ____exports
