local util = require("instant_games_bridge.util")

local device = {}

function device.type()
	return util.get(util.JS_BRIDGE_ORIGINAL, "device.type")
end

return device