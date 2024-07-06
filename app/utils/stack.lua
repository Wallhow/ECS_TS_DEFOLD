local ____lualib = require("lualib_bundle")
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local ____exports = {}
function ____exports.Stack()
    local top, array
    function top()
        return array[#array]
    end
    array = {}
    local function pop()
        local element = top()
        __TS__ArraySplice(array, #array - 1, 1)
        return element
    end
    local function push(element)
        array[#array + 1] = element
    end
    local function isEmpty()
        return #array == 0
    end
    local function clear()
        while pop() ~= nil do
        end
    end
    local function size()
        return #array
    end
    return {
        pop = pop,
        push = push,
        top = top,
        isEmpty = isEmpty,
        clear = clear,
        size = size
    }
end
return ____exports
