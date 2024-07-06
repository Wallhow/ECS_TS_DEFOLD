local ____exports = {}
local gui_animate
function gui_animate(node, prop, to, easing, duration, delay, playback)
    local co = coroutine.running()
    if co ~= undefined then
        gui.animate(
            node,
            prop,
            to,
            easing,
            duration,
            delay,
            function()
                coroutine.resume(co)
            end,
            playback
        )
        coroutine.yield()
    end
end
function ____exports.gui_effects()
    return {
        blackoutEffect = function(node, duration, to_alpha, callback)
            if duration == nil then
                duration = 0.3
            end
            if to_alpha == nil then
                to_alpha = 1
            end
            local node_1 = node
            local clr = gui.get_color(node_1)
            clr.x = 0.4
            clr.y = 0.4
            clr.z = 0.4
            clr.w = to_alpha
            gui.animate(
                node_1,
                gui.PROP_COLOR,
                clr,
                gui.EASING_INSINE,
                duration,
                0,
                callback
            )
        end,
        brighteningEffect = function(node, duration, to_alpha, callback)
            if duration == nil then
                duration = 0.3
            end
            if to_alpha == nil then
                to_alpha = 1
            end
            local node_1 = node
            local to = vmath.vector4(1, 1, 1, to_alpha)
            gui.animate(
                node_1,
                gui.PROP_COLOR,
                to,
                gui.EASING_INSINE,
                duration,
                0,
                callback
            )
        end
    }
end
function ____exports.set_opacity(node_name, alpha)
    local ____temp_0
    if type(node_name) == "string" then
        ____temp_0 = gui.get_node(node_name)
    else
        ____temp_0 = node_name
    end
    local node = ____temp_0
    local color = gui.get_color(node)
    color.w = alpha
    gui.set_color(node, color)
end
function ____exports.add_scale(node_name, scale_xy)
    local ____temp_1
    if type(node_name) == "string" then
        ____temp_1 = gui.get_node(node_name)
    else
        ____temp_1 = node_name
    end
    local node = ____temp_1
    local scale = gui.get_scale(node)
    scale.x = scale.x + scale_xy
    scale.y = scale.y + scale_xy
    gui.set_scale(node, scale)
end
function ____exports.set_scale(node_name, scale_xy)
    local ____temp_2
    if type(node_name) == "string" then
        ____temp_2 = gui.get_node(node_name)
    else
        ____temp_2 = node_name
    end
    local node = ____temp_2
    local scale = gui.get_scale(node)
    scale.x = scale_xy
    scale.y = scale_xy
    gui.set_scale(node, scale)
end
function ____exports.anim_scale(node_name, to_scale_xy, duration, easing, complited_fun)
    local ____temp_3
    if type(node_name) == "string" then
        ____temp_3 = gui.get_node(node_name)
    else
        ____temp_3 = node_name
    end
    local node = ____temp_3
    gui.animate(
        node,
        gui.PROP_SCALE,
        vmath.vector3(to_scale_xy, to_scale_xy, 1),
        easing,
        duration,
        0,
        complited_fun,
        gui.PLAYBACK_ONCE_FORWARD
    )
end
function ____exports.anim_opacity(node_name, to_opacity, duration, easing, complited_fun)
    local ____temp_4
    if type(node_name) == "string" then
        ____temp_4 = gui.get_node(node_name)
    else
        ____temp_4 = node_name
    end
    local node = ____temp_4
    local color = gui.get_color(node)
    color.w = to_opacity
    gui.animate(
        node,
        gui.PROP_COLOR,
        color,
        easing,
        duration,
        0,
        complited_fun,
        gui.PLAYBACK_ONCE_FORWARD
    )
end
function ____exports.anim_position(node_name, to_position, duration, easing, complited_fun)
    local ____temp_5
    if type(node_name) == "string" then
        ____temp_5 = gui.get_node(node_name)
    else
        ____temp_5 = node_name
    end
    local node = ____temp_5
    gui.animate(
        node,
        gui.PROP_POSITION,
        to_position,
        easing,
        duration,
        0,
        complited_fun,
        gui.PLAYBACK_ONCE_FORWARD
    )
end
function ____exports.anim_color(node_name, to_color, duration, easing, complited_fun)
    local ____temp_6
    if type(node_name) == "string" then
        ____temp_6 = gui.get_node(node_name)
    else
        ____temp_6 = node_name
    end
    local node = ____temp_6
    local color = gui.get_color(node)
    color.x = to_color[1]
    color.y = to_color[2]
    color.z = to_color[3]
    color.w = to_color[4]
    gui.animate(
        node,
        gui.PROP_COLOR,
        color,
        easing,
        duration,
        0,
        complited_fun,
        gui.PLAYBACK_ONCE_FORWARD
    )
end
local function hsv_to_rgb(h, s, v)
    local r
    local g
    local b
    r = 0
    g = 0
    b = 0
    local i = math.floor(h * 6)
    local f = h * 6 - i
    local p = v * (1 - s)
    local q = v * (1 - f * s)
    local t = v * (1 - (1 - f) * s)
    repeat
        local ____switch13 = i % 6
        local ____cond13 = ____switch13 == 0
        if ____cond13 then
            do
                do
                    r = v
                    g = t
                end
                b = p
            end
            break
        end
        ____cond13 = ____cond13 or ____switch13 == 1
        if ____cond13 then
            do
                do
                    r = q
                    g = v
                end
                b = p
            end
            break
        end
        ____cond13 = ____cond13 or ____switch13 == 2
        if ____cond13 then
            do
                do
                    r = p
                    g = v
                end
                b = t
            end
            break
        end
        ____cond13 = ____cond13 or ____switch13 == 3
        if ____cond13 then
            do
                do
                    r = p
                    g = q
                end
                b = v
            end
            break
        end
        ____cond13 = ____cond13 or ____switch13 == 4
        if ____cond13 then
            do
                do
                    r = t
                    g = p
                end
                b = v
            end
            break
        end
        ____cond13 = ____cond13 or ____switch13 == 5
        if ____cond13 then
            do
                do
                    r = v
                    g = p
                end
                b = q
            end
            break
        end
    until true
    return {r, g, b}
end
function ____exports.animate_rainbow_effect(node)
    local duration = 2
    local num_steps = 20
    local step_duration = duration / num_steps
    coroutine.wrap(function()
        do
            local i = 0
            while i < num_steps do
                local t = i / (num_steps - 1)
                local r, g, b = unpack(hsv_to_rgb(t * 359, 1, 1))
                gui_animate(
                    node,
                    gui.PROP_COLOR,
                    vmath.vector3(r, g, b),
                    gui.EASING_INSINE,
                    step_duration,
                    step_duration * i,
                    gui.PLAYBACK_ONCE_FORWARD
                )
                i = i + 1
            end
        end
    end)()
    timer.delay(
        duration,
        true,
        function()
            coroutine.wrap(function()
                do
                    local i = 0
                    while i < num_steps do
                        local t = i / (num_steps - 1)
                        local r, g, b = unpack(hsv_to_rgb(t * 359, 1, 1))
                        gui_animate(
                            node,
                            gui.PROP_COLOR,
                            vmath.vector3(r, g, b),
                            gui.EASING_INSINE,
                            step_duration,
                            step_duration * i,
                            gui.PLAYBACK_ONCE_FORWARD
                        )
                        i = i + 1
                    end
                end
            end)()
        end
    )
end
return ____exports
