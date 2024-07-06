--[[
This module provides one way to scale a Gui scene to use as much screen estate as possible.
Useful for adapting to different screen sizes or when the user resizes the window on a Desktop.
Put all content as children in one box (the root) and scale this box.
Set "adjust mode" of the Gui scenes concerned to "disabled".
Use in init when no resizing can occur (Mobile), use when a resized window is detected (Desktop).
Tested on Android, Windows and Manjaro Linux (I have not got a Mac, but I expect it works as well).
]]
local M = {}

-- variables for the box
local box
local box_width
local box_height
local box_dimensions
-- variables for the target device/window
local target_width
local target_height
-- variables for the scaling factors
local scale_width
local scale_height
-- variables for the center of the device screen
local window_center_x
local window_center_y

local pivot_x = 0
local pivot_y = -1

local function get_position_with_pivot(target_width, target_height)
	local position = vmath.vector3();
	if pivot_y == -1 then
		position.y = target_height
	elseif pivot_y == 0 then
		position.y = window_center_y
	else
		position.y = 0
	end

	if pivot_x == -1 then
		position.x = 0
	elseif pivot_x == 0 then
		position.x = window_center_x
	else
		position.x = target_width
	end
	return position
end

function M.set_pivot(x, y)
	pivot_x = x
	pivot_y = y
end

function M.scalefactor(node_name, fill_only_width)
	-- get the box node and its dimensions
	box = gui.get_node(node_name)
	box_dimensions = gui.get_size(box)
	box_width = box_dimensions.x
	box_height = box_dimensions.y
	-- get the device screen/window, its dimensions and its center
	target_width, target_height = window.get_size()
	window_center_x = target_width / 2
	local y = target_height
	window_center_y = target_height / 2
	-- calculate the scaling factors
	scale_width = target_width / box_width
	scale_height = target_height / box_height

	if fill_only_width then
		if scale_width < scale_height or scale_width >= scale_height then
			gui.set_scale(box, vmath.vector3(scale_width, scale_width, 0))

			local position = get_position_with_pivot(target_width, target_height)

			gui.set_position(box, position)
		end
	else
		
		--[[ -- if the screen/window is wider than tall, the box can use the full height available
		-- so use the height factor for scaling, then center the box
		if scale_width >= scale_height then
			gui.set_scale(box, vmath.vector3(scale_height, scale_height, 0))
			local position = get_position_with_pivot(target_width, target_height)
			gui.set_position(box, position)
		end
		-- if the screen/window is higher than wide, the box must respect the width,
		-- so use the width factor for scaling, then center the box
		if scale_width < scale_height then
			gui.set_scale(box, vmath.vector3(scale_width, scale_width, 0))
			local position = get_position_with_pivot(target_width, target_height)
			gui.set_position(box, position)
		end ]]
	end
end

return M
