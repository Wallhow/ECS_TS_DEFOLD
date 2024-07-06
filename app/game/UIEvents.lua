local ____exports = {}
local ____easyEvents = require("utils.events.easyEvents")
local newEasyEvents = ____easyEvents.newEasyEvents
local UIEvents = newEasyEvents(
    {
        "DRAW_FIELD",
        "UI_INITIALIZED",
        "SELECTED_PAIR",
        "SELECTED_CELLS_NOT_OK",
        "UNSELECT_ALL",
        "SCORE_ADD"
    },
    {
        DRAW_FIELD = function(self, field)
        end,
        UI_INITIALIZED = function(self, ui)
        end,
        SELECTED_PAIR = function(self, pairCell)
        end,
        SELECTED_CELLS_OK = function(self, cells)
        end,
        SELECTED_CELLS_NOT_OK = function(self)
        end,
        UNSELECT_ALL = function(self)
        end,
        SCORE_ADD = function(self, count)
        end
    }
)
____exports.default = UIEvents
return ____exports
