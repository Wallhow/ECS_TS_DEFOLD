local ____exports = {}
function ____exports.uigo_effects()
    local function set_opacity(uigo, alpha)
        local color = go.get(uigo.url, "color")
        color.w = alpha
        go.set(uigo.url, "color", color)
    end
    local function get_opacity(uigo)
        local color = go.get(uigo.url, "color")
        return color.w
    end
    local function add_scale(uigo, scale_xy)
        local scale = go.get_scale(uigo.url)
        scale.x = scale.x + scale_xy
        scale.y = scale.y + scale_xy
        go.set_scale(scale, uigo.url)
    end
    local function set_scale(uigo, scale_xy)
        local scale = go.get_scale(uigo.url)
        scale.x = scale_xy
        scale.y = scale_xy
        go.set_scale(scale, uigo.url)
    end
    local function set_rotation(uigo, to_rotate)
        go.set_rotation(to_rotate, uigo.url)
    end
    local function anim_scale(uigo, to_scale_xy, duration, easing, complite_func)
        if duration == nil then
            duration = 0.2
        end
        if easing == nil then
            easing = go.EASING_OUTSINE
        end
        if complite_func == nil then
            complite_func = undefined
        end
        go.animate(
            uigo.url,
            "scale",
            go.PLAYBACK_ONCE_FORWARD,
            vmath.vector3(to_scale_xy, to_scale_xy, 1),
            easing,
            duration,
            0,
            complite_func
        )
    end
    local function anim_opacity(uigo, to_opacity, duration, easing, complite_func)
        if complite_func == nil then
            complite_func = undefined
        end
        local color = go.get(uigo.url, "color")
        color.w = to_opacity
        go.animate(
            uigo.url,
            "color",
            go.PLAYBACK_ONCE_FORWARD,
            color,
            easing,
            duration,
            0,
            complite_func
        )
    end
    local function anim_rotation(uigo, to_rotate, duration, easing, complite_func)
        if complite_func == nil then
            complite_func = undefined
        end
        go.animate(
            uigo.url,
            "rotation",
            go.PLAYBACK_ONCE_FORWARD,
            to_rotate,
            easing,
            duration,
            0,
            complite_func
        )
    end
    local function anim_position(uigo, to_position, duration, easing, complite_func)
        if complite_func == nil then
            complite_func = undefined
        end
        go.animate(
            uigo.url,
            "position",
            go.PLAYBACK_ONCE_FORWARD,
            to_position,
            easing,
            duration,
            0,
            complite_func
        )
    end
    return {
        set_opacity = set_opacity,
        set_scale = set_scale,
        anim_opacity = anim_opacity,
        add_scale = add_scale,
        anim_scale = anim_scale,
        get_opacity = get_opacity,
        anim_rotation = anim_rotation,
        anim_position = anim_position,
        set_rotation = set_rotation
    }
end
return ____exports
