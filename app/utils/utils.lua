local ____lualib = require("lualib_bundle")
local __TS__StringReplace = ____lualib.__TS__StringReplace
local __TS__StringSubstr = ____lualib.__TS__StringSubstr
local __TS__ArraySort = ____lualib.__TS__ArraySort
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local ____exports = {}
function ____exports.hex2rgba(hex, alpha)
    if alpha == nil then
        alpha = 1
    end
    hex = __TS__StringReplace(hex, "#", "")
    if #hex == 3 then
        return vmath.vector4(
            tonumber("0x" .. __TS__StringSubstr(hex, 0, 1)) * 17 / 255,
            tonumber("0x" .. __TS__StringSubstr(hex, 1, 1)) * 17 / 255,
            tonumber("0x" .. __TS__StringSubstr(hex, 2, 1)) * 17 / 255,
            alpha
        )
    elseif #hex == 6 then
        return vmath.vector4(
            tonumber("0x" .. __TS__StringSubstr(hex, 0, 2)) / 255,
            tonumber("0x" .. __TS__StringSubstr(hex, 2, 2)) / 255,
            tonumber("0x" .. __TS__StringSubstr(hex, 4, 2)) / 255,
            alpha
        )
    else
        assert(false, "hex not correct:" .. hex)
        return vmath.vector4()
    end
end
function ____exports.set_text_colors(list, color, alpha)
    if alpha == nil then
        alpha = 1
    end
    do
        local i = 0
        while i < #list do
            gui.set_color(
                gui.get_node(list[i + 1]),
                ____exports.hex2rgba(color, alpha)
            )
            i = i + 1
        end
    end
end
function ____exports.hide_gui_list(list)
    do
        local i = 0
        while i < #list do
            gui.set_enabled(
                gui.get_node(list[i + 1]),
                false
            )
            i = i + 1
        end
    end
end
function ____exports.show_gui_list(list)
    do
        local i = 0
        while i < #list do
            gui.set_enabled(
                gui.get_node(list[i + 1]),
                true
            )
            i = i + 1
        end
    end
end
function ____exports.set_text(name, text)
    local n = gui.get_node(name)
    gui.set_text(
        n,
        tostring(text) .. ""
    )
end
function ____exports.sort_list(list, field, isAsc)
    if isAsc == nil then
        isAsc = true
    end
    if isAsc then
        return __TS__ArraySort(
            list,
            function(____, a, b) return a[field] - b[field] end
        )
    else
        return __TS__ArraySort(
            list,
            function(____, a, b) return b[field] - a[field] end
        )
    end
end
local function CatmullRom(t, p0, p1, p2, p3)
    local v0 = (p2 - p0) * 0.5
    local v1 = (p3 - p1) * 0.5
    local t2 = t * t
    local t3 = t * t2
    return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1
end
function ____exports.getPointCurve(t, points, point)
    local p = (#points - 1) * t
    local intPoint = math.floor(p)
    local weight = p - intPoint
    local p0 = points[(intPoint == 0 and intPoint or intPoint - 1) + 1]
    local p1 = points[intPoint + 1]
    local ____points_1 = points
    local ____temp_0
    if intPoint > #points - 2 then
        ____temp_0 = #points - 1
    else
        ____temp_0 = intPoint + 1
    end
    local p2 = ____points_1[____temp_0 + 1]
    local ____points_3 = points
    local ____temp_2
    if intPoint > #points - 3 then
        ____temp_2 = #points - 1
    else
        ____temp_2 = intPoint + 2
    end
    local p3 = ____points_3[____temp_2 + 1]
    point.x = CatmullRom(
        weight,
        p0.x,
        p1.x,
        p2.x,
        p3.x
    )
    point.y = CatmullRom(
        weight,
        p0.y,
        p1.y,
        p2.y,
        p3.y
    )
    return point
end
function ____exports.button_off(buttons)
    __TS__ArrayForEach(
        buttons,
        function(____, button)
            button:set_enabled(false)
        end
    )
end
function ____exports.to2d(index, cols)
    local row = math.floor(index / cols)
    local col = index % cols
    return {col, row}
end
function ____exports.shuffle(array)
    math.randomseed(os.time())
    do
        local i = #array - 1
        while i > 0 do
            local j = math.floor(math.random() * (i + 1))
            local ____temp_4 = {array[j + 1], array[i + 1]}
            array[i + 1] = ____temp_4[1]
            array[j + 1] = ____temp_4[2]
            i = i - 1
        end
    end
end
____exports["repeat"] = function(count_repeat_action, action)
    local context = {is_break = false}
    do
        local i = 0
        while i < count_repeat_action do
            if context.is_break then
                break
            end
            action(i, context)
            i = i + 1
        end
    end
end
function ____exports.distance(v1, v2)
    local dx = v1.x - v2.x
    local dy = v1.y - v2.y
    return math.sqrt(math.abs(dx * dx + dy * dy))
end
function ____exports.clamp(value, min, max)
    local ____temp_6
    if value < min then
        ____temp_6 = min
    else
        local ____temp_5
        if value > max then
            ____temp_5 = max
        else
            ____temp_5 = value
        end
        ____temp_6 = ____temp_5
    end
    return ____temp_6
end
function ____exports.in_next_frame(func)
    timer.delay(0.002, false, func)
end
function ____exports.overlaps_circle_circle(ax, ay, ar, bx, by, br)
    return math.abs((ax - bx) ^ 2 + (ay - by) ^ 2) < (ar + br) ^ 2
end
function ____exports.is(arg1, arg2, ...)
    local excludeFields = {...}
    for ____, key in ipairs(__TS__ObjectKeys(arg1)) do
        if not __TS__ArrayIncludes(excludeFields, key) and arg1[key] ~= arg2[key] then
            return false
        end
    end
    return true
end
function ____exports.isNot(arg1, arg2, ...)
    return not ____exports.is(arg1, arg2, ...)
end
function ____exports.iterate(object, func)
    for key in pairs(object) do
        local element = object[key]
        func(element)
    end
end
function ____exports.lastIndexOf(str, pattern)
    if pattern == "" then
        return undefined
    end
    local position = {string.find(str, pattern, 1)}
    local previous = undefined
    while #position ~= 0 do
        previous = position
        position = {string.find(str, pattern, previous[1] + 1)}
    end
    return previous
end
function ____exports.parseTime(t)
    local d = math.floor(t)
    local m = math.floor(d / 60)
    local s = d - m * 60
    local ____temp_7
    if m < 10 then
        ____temp_7 = "0" .. tostring(m)
    else
        ____temp_7 = tostring(m) .. ""
    end
    local mm = ____temp_7
    local ____temp_8
    if s < 10 then
        ____temp_8 = "0" .. tostring(s)
    else
        ____temp_8 = tostring(s) .. ""
    end
    local ss = ____temp_8
    return (mm .. ":") .. ss
end
function ____exports.sign()
    return math.random(0, 1) == 1 and 1 or -1
end
return ____exports
