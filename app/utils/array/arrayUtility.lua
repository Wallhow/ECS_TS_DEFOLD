local ____lualib = require("lualib_bundle")
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__ArrayReduce = ____lualib.__TS__ArrayReduce
local __TS__ArrayFindIndex = ____lualib.__TS__ArrayFindIndex
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local ____exports = {}
____exports.array = {
    get_rnd = function(array)
        local ____temp_0
        if #array > 1 then
            ____temp_0 = array[math.random(0, #array - 1) + 1]
        else
            ____temp_0 = array[1]
        end
        return ____temp_0
    end,
    clear = function(array, callback_befor_remove)
        if callback_befor_remove then
            for ____, el in ipairs(array) do
                callback_befor_remove(el)
            end
        end
        __TS__ArraySplice(array, 0, #array)
    end,
    sum = function(self, this, array)
        local ____temp_1
        if #array > 1 then
            ____temp_1 = __TS__ArrayReduce(
                array,
                function(____, acc, cur) return acc + cur end,
                0
            )
        else
            ____temp_1 = array[1]
        end
        return ____temp_1
    end,
    remove = function(array, condition)
        local index = __TS__ArrayFindIndex(
            array,
            function(____, v) return condition(v) end
        )
        if index ~= -1 then
            __TS__ArraySplice(array, index, 1)
        end
    end,
    removeIndex = function(array, index)
        if index ~= -1 then
            __TS__ArraySplice(array, index, 1)
        end
    end,
    exclude = function(array, condition)
        return __TS__ArrayFilter(
            array,
            function(____, el) return not condition(el) end
        )
    end,
    firstEl = function(array) return array[1] end,
    lastEl = function(array) return array[#array] end
}
return ____exports
