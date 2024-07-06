local ____lualib = require("lualib_bundle")
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__ArrayFindIndex = ____lualib.__TS__ArrayFindIndex
local ____exports = {}
local ____observer = require("utils.observer")
local ObservableVal = ____observer.ObservableVal
local camera = require("utils.camera")
local ____ui_go_utils = require("utils.ui.uigo.ui_go_utils")
local UIGO_ACTION_ID_RELEASED = ____ui_go_utils.UIGO_ACTION_ID_RELEASED
function ____exports.newContainer(this_go, size, start_scale)
    if start_scale == nil then
        start_scale = 1
    end
    local array = {}
    local selected_obj = ObservableVal(nil)
    go.set_scale(
        vmath.vector3(start_scale, start_scale, 1),
        this_go
    )
    selected_obj.subscribe(function(val)
        if val ~= nil then
        end
    end)
    local function add_child(child)
        go.set_parent(child.url, this_go, true)
        if not __TS__ArrayIncludes(array, child) then
            array[#array + 1] = child
        end
    end
    local function remove(index)
        if array[index + 1] ~= nil then
            go.delete(array[index + 1].url)
            __TS__ArraySplice(array, index, 1)
        end
    end
    local function clear()
        __TS__ArrayForEach(
            array,
            function(____, v) return go.delete(v.url) end
        )
        __TS__ArraySplice(array, 0, #array)
    end
    local function get_index(url)
        return __TS__ArrayFindIndex(
            array,
            function(____, p) return p.url == url end
        )
    end
    local delta = vmath.vector3(math.huge, math.huge, 0)
    local function input_update(x, y, action, action_id)
        __TS__ArrayForEach(
            array,
            function(____, obj_)
                if obj_ ~= nil then
                    if obj_.is_pressed ~= nil then
                        local obj = obj_
                        local is_press = obj.is_pressed(x, y, action_id)
                        if is_press then
                            selected_obj.set(nil)
                            selected_obj.set(obj_)
                        end
                    end
                end
            end
        )
        if action_id ~= nil and action_id == UIGO_ACTION_ID_RELEASED then
            if selected_obj.get() ~= nil then
                local obj = selected_obj.get()
                if selected_obj.get().is_pressed ~= nil then
                    local obj_ = obj
                    obj_.hovered.set(false)
                    obj_.trigger_on()
                    selected_obj.set(nil)
                    delta.x = math.huge
                    delta.y = math.huge
                end
            end
        end
    end
    local function input_listener(message_id, message)
        if message_id == hash("input") then
            local pos = camera.screen_to_world(message.x, message.y)
            input_update(pos.x, pos.y, message.action)
        end
        if message_id == hash("input_down") or message_id == hash("input_up") then
            local pos = camera.screen_to_world(message.x, message.y)
            input_update(pos.x, pos.y, message.action, message_id)
        end
    end
    return {
        add_child = add_child,
        remove = remove,
        get_index = get_index,
        clear = clear,
        input_listener = input_listener,
        array = array,
        size = size
    }
end
return ____exports
