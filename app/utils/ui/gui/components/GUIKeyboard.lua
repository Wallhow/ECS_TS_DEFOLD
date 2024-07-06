local ____lualib = require("lualib_bundle")
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local ____exports = {}
local _createGUIKeyboard, ru, en, KeyboardEvent, defaultOpt
local ____easyEvents = require("utils.events.easyEvents")
local newEasyEvents = ____easyEvents.newEasyEvents
local ____StrEnum = require("utils.storage.StrEnum")
local newStrEnum = ____StrEnum.newStrEnum
local ____Blocker = require("utils.ui.gui.components.Blocker")
local newBlocker = ____Blocker.newBlocker
local newBlockerShadowAnimations = ____Blocker.newBlockerShadowAnimations
local ____GUIInputField = require("utils.ui.gui.components.GUIInputField")
local newGUIInputField = ____GUIInputField.newGUIInputField
local ____PopupAnimation = require("utils.ui.gui.PopupAnimation")
local newPopupAnimation = ____PopupAnimation.newPopupAnimation
function _createGUIKeyboard(druid, lang, templateName, opt)
    local init, _createKeys, _createNewKey, _action, __animatePressed, _createPreviewLabel, _getOptions, events, keys, letterNodes, curLang, durationChangeState, inputBlocker, isBlockerEnabled, isShow, staticGrid, regenerateOnShow, keyboardRootNode, btnConfirm, btnRemove
    function init(templateName, inputBlockOnStart)
        if inputBlockOnStart == nil then
            inputBlockOnStart = false
        end
        inputBlocker = newBlocker(
            druid,
            {gui.get_parent(gui.get_node(templateName .. "/root"))},
            inputBlockOnStart
        )
        local blockerAnimations = newBlockerShadowAnimations(inputBlocker)
        local templ = gui.clone_tree(gui.get_node(templateName .. "/root"))
        gui.set_enabled(templ[templateName .. "/root"], true)
        local keyboardRootNode = templ[templateName .. "/root"]
        local confirmBtnNode = templ[templateName .. "/confirmBtn"]
        local removeLetterBtnNode = templ[templateName .. "/removeBtn"]
        local keyTemplateName = templateName .. "/keyBtn"
        local animations = newPopupAnimation(keyboardRootNode)
        animations.popupEvents.on(
            "hide",
            function()
                _action("HIDE_KEYBOARD")
                blockerAnimations.hide()
            end
        )
        animations.popupEvents.on(
            "show",
            function()
                _action("SHOW_KEYBOARD")
                blockerAnimations.show()
            end
        )
        staticGrid = druid:new_static_grid(templ[templateName .. "/keyboard_container"], keyTemplateName, 6)
        __TS__ArrayForEach(
            curLang,
            function(____, key, i)
                local newKey = _createNewKey(keyTemplateName, key)
                staticGrid:add(newKey.node[keyTemplateName], i + 1)
                letterNodes[#letterNodes + 1] = newKey
            end
        )
        local druidConfirmBtn = druid:new_button(
            confirmBtnNode,
            function() return events.emit("PRESSED_CONFIRM", keyboardRootNode) end
        )
        local druidRemoveBtn = druid:new_button(
            removeLetterBtnNode,
            function() return events.emit("PRESSED_REMOVE") end
        )
        return {
            templ = templ,
            animations = animations,
            keyboardRootNode = keyboardRootNode,
            btnConfirm = {node = confirmBtnNode, druidNode = druidConfirmBtn},
            btnRemove = {node = removeLetterBtnNode, druidNode = druidRemoveBtn}
        }
    end
    function _createKeys()
        if isBlockerEnabled then
            inputBlocker.refresh(true)
        end
        if btnConfirm.druidNode ~= nil then
            druid:remove(btnConfirm.druidNode)
        end
        if btnRemove.druidNode ~= nil then
            druid:remove(btnRemove.druidNode)
        end
        if #keys > 0 then
            __TS__ArrayForEach(
                keys,
                function(____, key) return druid:remove(key) end
            )
        end
        if staticGrid ~= nil then
            druid:remove(staticGrid)
        end
        local keyTemplateName = templateName .. "/keyBtn"
        __TS__ArrayForEach(
            letterNodes,
            function(____, v, i)
                local ____v_4 = v
                local node = ____v_4.node
                local letter = ____v_4.letter
                keys[#keys + 1] = druid:new_button(
                    node[keyTemplateName],
                    function()
                        local data = letter
                        events.emit("ON_PRESSED", data)
                        __animatePressed(node)
                    end
                )
            end
        )
        btnConfirm.druidNode = druid:new_button(
            btnConfirm.node,
            function() return events.emit("PRESSED_CONFIRM", keyboardRootNode) end
        )
        btnRemove.druidNode = druid:new_button(
            btnRemove.node,
            function() return events.emit("PRESSED_REMOVE") end
        )
    end
    function _createNewKey(keyTemplateName, key)
        local templKey = gui.clone_tree(gui.get_node(keyTemplateName))
        gui.set_enabled(templKey[keyTemplateName], true)
        gui.set_text(templKey["keyboard/label"], key)
        return {node = templKey, letter = key}
    end
    function _action(event)
        events.emit(event, keyboardRootNode)
        isShow = event == "SHOW_KEYBOARD"
        if isShow and regenerateOnShow then
            _createKeys()
        end
        if isBlockerEnabled then
            inputBlocker.getBlocker():set_enabled(isShow)
        end
    end
    function __animatePressed(node)
        gui.set_enabled(node[templateName .. "/on"], true)
        timer.delay(
            durationChangeState,
            false,
            function() return gui.set_enabled(node[templateName .. "/on"], false) end
        )
    end
    function _createPreviewLabel(nodePreview)
        local previewText = newGUIInputField(druid, nodePreview, nodePreview, "!!!")
        previewText.init()
        local function removeLetterFunc()
            return previewText.removeLetterAtEnd()
        end
        events.on(
            "ON_PRESSED",
            function(____, key) return previewText.addText(key) end
        )
        events.on(
            "PRESSED_REMOVE",
            function() return removeLetterFunc() end
        )
        return previewText
    end
    function _getOptions(opt)
        if opt == nil then
            return defaultOpt
        end
        local options = {}
        __TS__ArrayForEach(
            __TS__ObjectKeys(defaultOpt),
            function(____, key)
                local ____key_6 = key
                local ____temp_5
                if opt[key] == nil then
                    ____temp_5 = defaultOpt[key]
                else
                    ____temp_5 = opt[key]
                end
                options[____key_6] = ____temp_5
                return ____temp_5
            end,
            {}
        )
        return options
    end
    events = newEasyEvents(
        KeyboardEvent,
        {
            ON_PRESSED = function(self, keyPressed)
            end,
            SHOW_KEYBOARD = function(self, rootNode)
            end,
            HIDE_KEYBOARD = function(self, rootNode)
            end,
            PRESSED_CONFIRM = function(self, rootNode)
            end,
            PRESSED_REMOVE = function(self)
            end
        }
    )
    keys = {}
    letterNodes = {}
    local ____temp_0
    if lang == ____exports.KeyboardLanguage.RU then
        ____temp_0 = ru
    else
        ____temp_0 = en
    end
    curLang = ____temp_0
    durationChangeState = 0.1
    isBlockerEnabled = true
    isShow = false
    local ____getOptions_result_1 = _getOptions(opt)
    local inputBlockOnStart = ____getOptions_result_1.inputBlockOnStart
    local previewTextOn = ____getOptions_result_1.previewTextOn
    regenerateOnShow = ____getOptions_result_1.regenerateOnShow
    local ____init_result_2 = init(templateName, inputBlockOnStart)
    local templ = ____init_result_2.templ
    local animations = ____init_result_2.animations
    keyboardRootNode = ____init_result_2.keyboardRootNode
    btnConfirm = ____init_result_2.btnConfirm
    btnRemove = ____init_result_2.btnRemove
    local ____previewTextOn_3
    if previewTextOn then
        ____previewTextOn_3 = _createPreviewLabel(templ[templateName .. "/previewText"])
    else
        ____previewTextOn_3 = nil
    end
    local previewText = ____previewTextOn_3
    local on = events.on
    local emit = events.emit
    local hide = animations.hide
    if not regenerateOnShow then
        _createKeys()
    end
    local function show(defaultTextInPreview)
        if defaultTextInPreview == nil then
            defaultTextInPreview = ""
        end
        if previewText ~= nil and previewTextOn then
            previewText.setText(defaultTextInPreview)
        end
        animations.show()
    end
    return {
        isShow = function() return isShow end,
        on = on,
        emit = emit,
        hide = hide,
        show = show,
        setAnimation = animations.setAnimation,
        popupEvents = animations.popupEvents,
        setBlockerEnable = function(enable)
            isBlockerEnabled = enable
            inputBlocker.getBlocker():set_enabled(enable)
        end,
        letterNodes = __TS__ArrayMap(
            letterNodes,
            function(____, l)
                return {node = l.node[templateName .. "/off"], letter = l.letter}
            end
        ),
        buttonConfirmNode = templ[templateName .. "/on1"]
    }
end
____exports.newGUIKeyboard = _createGUIKeyboard
ru = {
    "А",
    "Б",
    "В",
    "Г",
    "Д",
    "Е",
    "Ж",
    "З",
    "И",
    "Й",
    "К",
    "Л",
    "М",
    "Н",
    "О",
    "П",
    "Р",
    "С",
    "Т",
    "У",
    "Ф",
    "Х",
    "Ц",
    "Ч",
    "Ш",
    "Щ",
    "Ъ",
    "Ы",
    "Ь",
    "Э",
    "Ю",
    "Я"
}
en = {
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
}
____exports.KeyboardLanguage = {
    RU = newStrEnum(ru),
    EN = newStrEnum(en)
}
KeyboardEvent = {
    "ON_PRESSED",
    "SHOW_KEYBOARD",
    "HIDE_KEYBOARD",
    "PRESSED_CONFIRM",
    "PRESSED_REMOVE"
}
defaultOpt = {inputBlockOnStart = false, previewTextOn = true, regenerateOnShow = true}
return ____exports
