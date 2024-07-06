local ____exports = {}
local ____go_utils = require("utils.ui.uigo.go_utils")
local goexists = ____go_utils.goexists
____exports.UIGO_ACTION_ID_PRESSED = hash("input_down")
____exports.UIGO_ACTION_ID_RELEASED = hash("input_up")
function ____exports.set_sprite_color(go_hash, color, sprite_name)
    if sprite_name == nil then
        sprite_name = "sprite"
    end
    if goexists(go_hash) then
        go.set(
            msg.url(nil, go_hash, sprite_name),
            "tint",
            color
        )
    end
end
function ____exports.get_sprite_color(go_hash, sprite_name)
    if sprite_name == nil then
        sprite_name = "sprite"
    end
    return go.get(
        msg.url(nil, go_hash, sprite_name),
        "tint"
    )
end
function ____exports.set_sprite_anim(go_hash, animation_name, sprite_name)
    if sprite_name == nil then
        sprite_name = "sprite"
    end
    if goexists(go_hash) then
        sprite.play_flipbook(
            msg.url(nil, go_hash, sprite_name),
            animation_name
        )
    end
end
function ____exports.anim_sprite_color(go_hash, to_color, duration, playback, sprite_name)
    if sprite_name == nil then
        sprite_name = "sprite"
    end
    if goexists(go_hash) then
        go.animate(
            msg.url(nil, go_hash, sprite_name),
            "tint",
            playback,
            to_color,
            go.EASING_INOUTEXPO,
            duration
        )
    end
end
function ____exports.get_sprite_size(id_go, sprite_name)
    if sprite_name == nil then
        sprite_name = "sprite"
    end
    return go.get(
        msg.url(nil, id_go, sprite_name),
        "size"
    )
end
function ____exports.is_sprite_hovered(go_id, go_size, input_pos, offset_sprite)
    local go_pos = go.get_world_position(go_id)
    local cur_scale = go.get_world_scale(go_id)
    local hw = go_size.x * cur_scale.x * 0.5
    local hh = go_size.y * cur_scale.y * 0.5
    local ____temp_0
    if offset_sprite ~= nil then
        ____temp_0 = offset_sprite.y * cur_scale.y
    else
        ____temp_0 = 0
    end
    local offset_y = ____temp_0
    local ____temp_1
    if offset_sprite ~= nil then
        ____temp_1 = offset_sprite.x * cur_scale.x
    else
        ____temp_1 = 0
    end
    local offset_x = ____temp_1
    local min_y = go_pos.y + offset_y - hh
    local max_y = go_pos.y + offset_y + hh
    local min_x = go_pos.x + offset_x - hw
    local max_x = go_pos.x + offset_x + hw
    return input_pos.x > min_x and input_pos.x < max_x and input_pos.y > min_y and input_pos.y < max_y
end
return ____exports
