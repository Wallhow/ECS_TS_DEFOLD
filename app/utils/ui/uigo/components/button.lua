local ____exports = {}
local ____ui_go_effects = require("utils.ui.uigo.ui_go_effects")
local uigo_effects = ____ui_go_effects.uigo_effects
local ____ui_go_utils = require("utils.ui.uigo.ui_go_utils")
local get_sprite_size = ____ui_go_utils.get_sprite_size
local is_sprite_hovered = ____ui_go_utils.is_sprite_hovered
local UIGO_ACTION_ID_PRESSED = ____ui_go_utils.UIGO_ACTION_ID_PRESSED
local UIGO_ACTION_ID_RELEASED = ____ui_go_utils.UIGO_ACTION_ID_RELEASED
local ____observer = require("utils.observer")
local ObservableVal = ____observer.ObservableVal
function ____exports.new_uigo_button(go_id, button_click_callback, custum_main_sprite_name, offset_sprite)
    if custum_main_sprite_name == nil then
        custum_main_sprite_name = "sprite"
    end
    local effects = uigo_effects()
    local start_size = get_sprite_size(go_id, custum_main_sprite_name)
    local start_scale = go.get_scale(go_id)
    local hovered = ObservableVal(false)
    local is_block = ObservableVal(false)
    local hover_effect = true
    local hover_callback
    local released_callback
    local pressed_callback
    local on_drag_callback
    local long_press_callback
    local _is_btn_pressed = false
    local _hover_effect_active = false
    local is_dragged = false
    local is_long_press = false
    hovered.subscribe(function(val)
        if val and _hover_effect_active == false then
            if hover_callback ~= nil then
                hover_callback(go_id)
            end
            if hover_effect then
                _hover_effect_active = true
                go.set(go_id, "position.z", 8)
                effects.anim_scale({url = go_id}, 1.05)
            end
        else
            is_long_press = false
            if _hover_effect_active then
                _hover_effect_active = false
                if hover_effect then
                    go.set(go_id, "position.z", 1)
                    effects.anim_scale({url = go_id}, start_scale.x)
                end
                _is_btn_pressed = false
            end
        end
    end)
    local function is_hovered(x, y)
        if not is_block.get() then
            local result = is_sprite_hovered(go_id, {x = start_size.x, y = start_size.y}, {x = x, y = y}, offset_sprite)
            if hovered.get() ~= result then
                hovered.set(result)
            end
            return result
        else
            return false
        end
    end
    local function is_pressed(x, y, action_id)
        if is_hovered(x, y) then
            if action_id == UIGO_ACTION_ID_PRESSED then
                _is_btn_pressed = true
                if pressed_callback ~= nil then
                    pressed_callback(go_id)
                end
            elseif action_id == UIGO_ACTION_ID_RELEASED then
                if released_callback ~= nil then
                    released_callback(go_id)
                end
                if _is_btn_pressed then
                    button_click_callback(go_id)
                end
                hovered.set(false)
                _is_btn_pressed = false
            end
            return _is_btn_pressed
        else
            return false
        end
    end
    local function trigger_on()
        button_click_callback(go_id)
    end
    return {
        url = go_id,
        width = function() return start_size.y end,
        height = function() return start_size.x end,
        hovered_effect_enabled = function(enabled)
            hover_effect = enabled
            return hover_effect
        end,
        is_hovered = is_hovered,
        is_pressed = is_pressed,
        pressed_callback = pressed_callback,
        hover_callback = hover_callback,
        set_released_callback = function(callback)
            released_callback = callback
        end,
        long_press_callback = long_press_callback,
        on_drag_callback = on_drag_callback,
        trigger_on = trigger_on,
        start_scale = start_scale,
        is_block = is_block,
        is_long_press = is_long_press,
        is_dragged = is_dragged,
        hovered = hovered
    }
end
return ____exports
