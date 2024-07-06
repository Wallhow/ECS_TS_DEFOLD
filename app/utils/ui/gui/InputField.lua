local ____lualib = require("lualib_bundle")
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local ____exports = {}
local ____easyEvents = require("utils.events.easyEvents")
local newEasyEvents = ____easyEvents.newEasyEvents
local inputFieldEvents = {"ON_FOCUS", "CHANGED", "LOST_FOCUS"}
function ____exports.newInputField()
    local value = ""
    local events = newEasyEvents(
        inputFieldEvents,
        {
            CHANGED = function(self, test)
            end,
            LOST_FOCUS = function(self)
            end,
            ON_FOCUS = function(self)
            end
        }
    )
    --- Рассылает слушателям подписаным на CHANGE новый текст и кеширует его в переменную value
    local function setText(newValue)
        value = newValue
        events.emit("CHANGED", value)
    end
    local function getText()
        return value
    end
    local function addText(addedVal)
        setText(getText() .. addedVal)
        return getText()
    end
    local function removeLetterAtEnd()
        local text = getText()
        local ____temp_0
        if #text - 1 > 0 then
            ____temp_0 = utf8.sub(
                text,
                0,
                utf8.len(text) - 1
            )
        else
            ____temp_0 = ""
        end
        text = ____temp_0
        setText(text)
    end
    return __TS__ObjectAssign({setText = setText, getText = getText, addText = addText, removeLetterAtEnd = removeLetterAtEnd}, events)
end
return ____exports
