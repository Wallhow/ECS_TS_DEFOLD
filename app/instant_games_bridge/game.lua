local util = require("instant_games_bridge.util")

local game = {}

function game.visibilityState()
	return util.get(util.JS_BRIDGE_ORIGINAL, "game.visibilityState")
end

return game