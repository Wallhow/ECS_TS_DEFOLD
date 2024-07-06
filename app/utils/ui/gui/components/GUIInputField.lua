local ____lualib = require("lualib_bundle")
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local ____exports = {}
local _createGUIInputField
local ____InputField = require("utils.ui.gui.InputField")
local newInputField = ____InputField.newInputField
local ____ShrinkText = require("utils.ui.gui.components.ShrinkText")
local newShrinkText = ____ShrinkText.newShrinkText
function _createGUIInputField(druid, nameFieldNode, nameLabelNode, defText)
    local _onFocused, inFocused, isRemoveTextIfFocused, inputField
    function _onFocused()
        inFocused = true
        if System.platform ~= "HTML5" then
            if isRemoveTextIfFocused then
                inputField.setText("")
            end
        end
    end
    local value = defText
    inFocused = false
    isRemoveTextIfFocused = false
    local isShrinkText = true
    local druidComponent
    local shrinkText
    inputField = newInputField()
    local ____temp_0
    if type(nameLabelNode) == "string" then
        ____temp_0 = gui.get_node(nameLabelNode)
    else
        ____temp_0 = nameLabelNode
    end
    nameLabelNode = ____temp_0
    local function init(removeTextIfFocused, is_shrinkText)
        if removeTextIfFocused == nil then
            removeTextIfFocused = false
        end
        if is_shrinkText == nil then
            is_shrinkText = true
        end
        isRemoveTextIfFocused = removeTextIfFocused
        isShrinkText = is_shrinkText
        if isShrinkText then
            shrinkText = newShrinkText(nameLabelNode, "x")
        end
        druidComponent = druid:new_button(
            nameFieldNode,
            function() return inputField.emit("ON_FOCUS") end
        )
        inputField.on(
            "ON_FOCUS",
            function() return _onFocused() end
        )
        inputField.on(
            "CHANGED",
            function(____, value)
                gui.set_text(nameLabelNode, value)
                if isShrinkText then
                    shrinkText.set(value)
                end
            end
        )
        inputField.setText(value)
    end
    local function on_input(action_id, action)
        if inFocused then
            if action_id == hash("text") then
                inputField.addText(action.text)
            end
            if action_id == hash("key_backspace") and action.released then
                inputField.removeLetterAtEnd()
            end
            if action_id == hash("key_enter") and action.released then
                inFocused = false
                if inputField.getText() == "" then
                    inputField.setText(defText)
                end
            end
        end
    end
    local function remove()
        druid:remove(druidComponent)
    end
    return __TS__ObjectAssign({init = init, on_input = on_input, remove = remove}, inputField)
end
____exports.newGUIInputField = _createGUIInputField
return ____exports
