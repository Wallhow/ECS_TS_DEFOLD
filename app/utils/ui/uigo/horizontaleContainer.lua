local ____lualib = require("lualib_bundle")
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__ArrayFindIndex = ____lualib.__TS__ArrayFindIndex
local ____exports = {}
local ____observer = require("utils.observer")
local ObservableVal = ____observer.ObservableVal
local camera = require("utils.camera")
local ____utils = require("utils.utils")
local clamp = ____utils.clamp
local in_next_frame = ____utils.in_next_frame
local ____ui_go_utils = require("utils.ui.uigo.ui_go_utils")
local UIGO_ACTION_ID_RELEASED = ____ui_go_utils.UIGO_ACTION_ID_RELEASED
local function newHorizontaleContainer(this_go, size, start_scale)
    if start_scale == nil then
        start_scale = 1
    end
    local check_long_press, recalculate, PLAYBACK, EASING, DURATION_ANIM, array, padding, TIME_LONG_PRESS, selected_obj, _scale, width_child
    function check_long_press(domino)
        timer.delay(
            TIME_LONG_PRESS,
            false,
            function()
                local btn = domino
                if btn == selected_obj.get() and not btn[2].is_long_press then
                    btn[2].is_long_press = true
                    if btn[2].long_press_callback ~= undefined then
                        btn[2].long_press_callback(btn[2].url)
                    end
                end
            end
        )
    end
    function recalculate(new_child)
        local width = width_child + padding
        local area = width * #array
        local half_area = area / 2
        __TS__ArrayForEach(
            array,
            function(____, obj, i)
                local pos = go.get_position(obj[1].url)
                local ____temp_1 = i * width - half_area
                local ____temp_0
                if new_child == undefined then
                    ____temp_0 = width / 2
                else
                    ____temp_0 = 0
                end
                pos.x = ____temp_1 + ____temp_0
                pos.z = 0
                go.animate(
                    obj[1].url,
                    "position",
                    PLAYBACK,
                    pos,
                    EASING,
                    DURATION_ANIM
                )
            end
        )
        if new_child ~= undefined then
            local new_child_pos = go.get_position(new_child[1].url)
            new_child_pos.z = 0
            new_child_pos.x = #array * width - half_area
            go.animate(
                new_child[1].url,
                "position",
                PLAYBACK,
                new_child_pos,
                EASING,
                DURATION_ANIM
            )
        end
        local scale = clamp(size.x / (area + 70), 0, 1.2)
        _scale = scale
        go.animate(
            this_go,
            "scale",
            PLAYBACK,
            vmath.vector3(scale, scale, 1),
            EASING,
            DURATION_ANIM
        )
    end
    PLAYBACK = go.PLAYBACK_ONCE_FORWARD
    EASING = go.EASING_OUTSINE
    DURATION_ANIM = 0.2
    array = {}
    padding = 5
    TIME_LONG_PRESS = 0.3
    selected_obj = ObservableVal(undefined)
    _scale = 1
    go.set_scale(
        vmath.vector3(start_scale, start_scale, 1),
        this_go
    )
    selected_obj.subscribe(function(val)
        if val ~= undefined then
        end
    end)
    local function add_child(child)
        if width_child == undefined then
            width_child = child[1].width()
        end
        go.set_parent(child[1].url, this_go)
        if not __TS__ArrayIncludes(array, child) then
            recalculate(child)
            array[#array + 1] = child
        end
    end
    local function remove(index)
        if array[index + 1] ~= undefined then
            go.delete(array[index + 1][1].url)
            __TS__ArraySplice(array, index, 1)
        end
        recalculate()
    end
    local function clear()
        __TS__ArrayForEach(
            array,
            function(____, v) return go.delete(v[1].url) end
        )
        __TS__ArraySplice(array, 0, #array)
    end
    local function get_index(url)
        return __TS__ArrayFindIndex(
            array,
            function(____, p) return p[1].url == url end
        )
    end
    local delta = vmath.vector3(math.huge, math.huge, 0)
    local function input_update(x, y, action, action_id)
        __TS__ArrayForEach(
            array,
            function(____, obj_)
                if obj_ ~= undefined then
                    local obj = obj_[2]
                    local is_press = obj.is_pressed(x, y, action_id)
                    if is_press then
                        selected_obj.set(undefined)
                        selected_obj.set(obj_)
                    end
                end
            end
        )
        in_next_frame(function()
            if selected_obj.get() ~= undefined then
                local domino = selected_obj.get()
                check_long_press(domino)
                local click_pos = camera.screen_to_world(action.x, action.y)
                local pos = go.get_position(domino[2].url)
                if delta.x == math.huge or delta.y == math.huge then
                    delta.x = click_pos.x - pos.x
                    delta.y = click_pos.y - pos.y
                end
                click_pos.x = click_pos.x - delta.x
                click_pos.y = click_pos.y - delta.y
                click_pos.z = 6
                go.set_position(click_pos, domino[2].url)
                if action.dx ~= 0 or action.dy ~= 0 then
                    if domino[2].on_drag_callback ~= undefined then
                        domino[2].on_drag_callback(domino[2].url, action.dx, action.dy)
                    end
                end
            end
        end)
        if action_id ~= undefined and action_id == UIGO_ACTION_ID_RELEASED then
            if selected_obj.get() ~= undefined then
                selected_obj.get()[2].hovered.set(false)
                selected_obj.get()[2].trigger_on()
                selected_obj.set(undefined)
                delta.x = math.huge
                delta.y = math.huge
            end
        end
    end
    return {
        add_child = add_child,
        remove = remove,
        input_update = input_update,
        get_index = get_index,
        clear = clear,
        recalculate = recalculate,
        array = array,
        size = size
    }
end
return ____exports
