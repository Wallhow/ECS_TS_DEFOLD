local ____lualib = require("lualib_bundle")
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local ____exports = {}
function ____exports.newUIScalableContainer(container_go_id, _display_size)
    local is_position_exceeds, getCenterPointOfChildren, get_local_x, get_local_y, get_x, get_y, check, position, check_scale, center, display_size, bounds, children, start_scale, _scale, is_pos_anim, is_scale_anim, position_function
    function is_position_exceeds(child, new_pos)
        if new_pos == nil then
            new_pos = child.position
        end
        local hw = child.width() * _scale / 2
        local hh = child.height() * _scale / 2
        local x1 = new_pos.x - hw
        local x2 = new_pos.x + hw
        local y1 = new_pos.y - hh
        local y2 = new_pos.y + hh
        return x1 < bounds.min_x or y1 < bounds.min_y or x2 > bounds.max_x or y2 > bounds.max_y
    end
    function getCenterPointOfChildren()
        local maxX = bounds.max_x
        local maxY = bounds.max_y
        local minX = bounds.min_x
        local minY = bounds.min_y
        local minY_for_len = 0
        local maxY_for_len = 0
        local minX_for_len = 0
        local maxX_for_len = 0
        __TS__ArrayForEach(
            children,
            function(____, child_go)
                local minx = get_x(child_go, -1)
                local miny = get_y(child_go, -1)
                local maxx = get_x(child_go, 1)
                local maxy = get_y(child_go, 1)
                if minx < minX then
                    minX = minx
                end
                if miny < minY then
                    minY = miny
                end
                if maxx > maxX then
                    maxX = maxx
                end
                if maxy > maxY then
                    maxY = maxy
                end
                if get_local_y(child_go, 1) > maxY_for_len then
                    maxY_for_len = get_local_y(child_go, 1)
                end
                if get_local_y(child_go, -1) < minY_for_len then
                    minY_for_len = get_local_y(child_go, -1)
                end
                if get_local_x(child_go, 1) > maxX_for_len then
                    maxX_for_len = get_local_x(child_go, 1)
                end
                if get_local_x(child_go, -1) < minX_for_len then
                    minX_for_len = get_local_x(child_go, -1)
                end
            end
        )
        local centerX = (minX + maxX) / 2
        local centerY = (minY + maxY) / 2
        local delta = {x = minX_for_len + maxX_for_len, y = minY_for_len + maxY_for_len}
        return {
            x = centerX,
            y = centerY,
            length_x = math.abs(minX_for_len) + maxX_for_len,
            length_y = math.abs(minY_for_len) + maxY_for_len,
            delta = delta
        }
    end
    function get_local_x(child_go, uv_pos)
        return child_go.position.x + child_go.width() / 2 * uv_pos
    end
    function get_local_y(child_go, uv_pos)
        return child_go.position.y + child_go.height() / 2 * uv_pos
    end
    function get_x(child_go, uv_pos)
        return go.get_position(container_go_id).x + get_local_x(child_go, uv_pos) * _scale
    end
    function get_y(child_go, uv_pos)
        return go.get_position(container_go_id).y + get_local_y(child_go, uv_pos) * _scale
    end
    function check(go_ui)
        if is_position_exceeds(go_ui) then
            local center = getCenterPointOfChildren()
            local ____temp_0
            if display_size.x / center.length_x <= start_scale then
                ____temp_0 = display_size.x / center.length_x
            else
                ____temp_0 = start_scale
            end
            local scaleX = ____temp_0
            local ____temp_1
            if display_size.y / center.length_y <= start_scale then
                ____temp_1 = display_size.y / center.length_y
            else
                ____temp_1 = start_scale
            end
            local scaleY = ____temp_1
            local scale = math.min(scaleX, scaleY)
            _scale = scale
            local offsetX = center.x * -1
            local offsetY = center.y * -1
            local container_position = go.get_position(container_go_id)
            container_position.x = container_position.x + offsetX
            container_position.y = container_position.y + offsetY
            if not is_pos_anim then
                is_pos_anim = true
                go.animate(
                    container_go_id,
                    "position",
                    go.PLAYBACK_ONCE_FORWARD,
                    container_position,
                    go.EASING_OUTSINE,
                    0.1,
                    0,
                    function()
                        is_pos_anim = false
                        return is_pos_anim
                    end
                )
            end
            if not is_scale_anim then
                is_scale_anim = true
                go.animate(
                    container_go_id,
                    "scale",
                    go.PLAYBACK_ONCE_FORWARD,
                    vmath.vector3(_scale, _scale, 1),
                    go.EASING_OUTSINE,
                    0.5,
                    0,
                    function()
                        is_scale_anim = false
                        return is_scale_anim
                    end
                )
            end
        end
    end
    function position(go_ui)
        return go.get_world_position(go_ui.url)
    end
    function check_scale(url)
        if go.get_scale(url).x ~= 1 then
            go.set_scale(1, url)
        end
    end
    function center()
        local center = getCenterPointOfChildren()
        local deltaX = center.delta.x * _scale / 2
        local container_position = go.get_position(container_go_id)
        container_position.x = -deltaX
        go.animate(
            container_go_id,
            "position",
            go.PLAYBACK_ONCE_FORWARD,
            container_position,
            go.EASING_OUTSINE,
            0.2,
            0,
            function()
                is_pos_anim = false
                return is_pos_anim
            end
        )
    end
    display_size = {x = _display_size.x, y = _display_size.y}
    bounds = {min_x = -display_size.x / 2, min_y = -display_size.y / 2, max_x = display_size.x / 2, max_y = display_size.y / 2}
    children = {}
    local align = {x = 0, y = 0}
    local start_position = go.get_position(container_go_id)
    start_scale = 1
    _scale = 1
    is_pos_anim = false
    is_scale_anim = false
    local dirty = false
    local function add_child(go_ui, new_position, fast_anim)
        if fast_anim == nil then
            fast_anim = false
        end
        if dirty then
            dirty = false
            go.cancel_animations(container_go_id, "position")
            go.cancel_animations(container_go_id, "scale")
            go.set_position(start_position, container_go_id)
            go.set_scale(start_scale, container_go_id)
        end
        go_ui.position = {x = new_position.x, y = new_position.y}
        if not fast_anim then
            go.animate(
                go_ui.url,
                "scale",
                go.PLAYBACK_ONCE_FORWARD,
                vmath.vector3(_scale, _scale, 1),
                go.EASING_OUTSINE,
                0.1,
                0,
                function()
                    go.set_parent(go_ui.url, container_go_id, true)
                    if position_function ~= undefined then
                        position_function(
                            position(go_ui),
                            go_ui,
                            children,
                            new_position
                        )
                    else
                        go.set_position(new_position, go_ui.url)
                    end
                end
            )
            children[#children + 1] = go_ui
            timer.delay(
                0.01,
                false,
                function()
                    __TS__ArrayForEach(
                        children,
                        function(____, val) return check_scale(val.url) end
                    )
                end
            )
        else
            children[#children + 1] = go_ui
            go.set_parent(go_ui.url, container_go_id, false)
            timer.delay(
                0.01,
                false,
                function()
                    if position_function ~= undefined then
                        position_function(
                            position(go_ui),
                            go_ui,
                            children,
                            new_position
                        )
                    else
                        go.set_position(new_position, go_ui.url)
                    end
                    check(go_ui)
                end
            )
        end
    end
    local function update()
        if #children > 0 then
            __TS__ArrayForEach(
                children,
                function(____, go_ui)
                    check(go_ui)
                    check_scale(go_ui.url)
                end
            )
        end
    end
    local scale_function
    local function set_scale_function(func)
        scale_function = func
        return scale_function
    end
    local function set_position_function(func)
        position_function = func
        return position_function
    end
    local function set_start_scale(scale)
        start_scale = scale
        go.set_scale(
            vmath.vector3(scale, scale, 1),
            container_go_id
        )
    end
    local function set_align_content(x, y)
        align.x = x
        align.y = y
    end
    local function clear()
        __TS__ArrayForEach(
            children,
            function(____, v)
                go.delete(v.url)
            end
        )
        __TS__ArraySplice(children, 0, #children)
        _scale = start_scale
        is_pos_anim = false
        is_scale_anim = false
        dirty = true
    end
    local function resize(width, height)
        display_size.x = width
        display_size.y = height
        bounds.min_x = -display_size.x / 2
        bounds.min_y = -display_size.y / 2
        bounds.max_x = display_size.x / 2
        bounds.max_y = display_size.y / 2
        local _center = getCenterPointOfChildren()
        local ____temp_2
        if display_size.x / _center.length_x <= start_scale then
            ____temp_2 = display_size.x / _center.length_x
        else
            ____temp_2 = start_scale
        end
        local scaleX = ____temp_2
        local ____temp_3
        if display_size.y / _center.length_y <= start_scale then
            ____temp_3 = display_size.y / _center.length_y
        else
            ____temp_3 = start_scale
        end
        local scaleY = ____temp_3
        local scale = math.min(scaleX, scaleY)
        _scale = scale
        go.animate(
            container_go_id,
            "scale",
            go.PLAYBACK_ONCE_FORWARD,
            vmath.vector3(_scale, _scale, 1),
            go.EASING_OUTSINE,
            0.5,
            0,
            function()
                is_scale_anim = false
                return is_scale_anim
            end
        )
        center()
    end
    return {
        url = container_go_id,
        set_scale_function = set_scale_function,
        set_position_function = set_position_function,
        add_child = add_child,
        scale = _scale,
        clear = clear,
        set_align_content = set_align_content,
        children = children,
        update = update,
        center = center,
        set_start_scale = set_start_scale,
        resize = resize
    }
end
return ____exports
