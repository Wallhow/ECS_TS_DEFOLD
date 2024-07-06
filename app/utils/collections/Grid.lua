local ____lualib = require("lualib_bundle")
local __TS__ArrayFind = ____lualib.__TS__ArrayFind
local __TS__ArraySlice = ____lualib.__TS__ArraySlice
local ____exports = {}
function ____exports.newGrid(sizeX, sizeY, initialFun)
    local _isInBounds, toIndex
    function _isInBounds(x, y)
        return x >= 0 and x < sizeX and y >= 0 and y < sizeY
    end
    function toIndex(x, y)
        return y * sizeX + x
    end
    local grid = {}
    for y = 0, sizeY - 1 do
        for x = 0, sizeX - 1 do
            grid[toIndex(x, y) + 1] = initialFun(x, y)
        end
    end
    local function get(x, y)
        local _x = math.floor(x)
        local _y = math.floor(y)
        if _isInBounds(_x, _y) then
            return grid[toIndex(_x, _y) + 1]
        else
            return undefined
        end
    end
    local function set(x, y, value)
        local _x = math.floor(x)
        local _y = math.floor(y)
        if _isInBounds(_x, _y) then
            grid[toIndex(_x, _y) + 1] = value
        end
    end
    local function cpy()
        local copyGrid = ____exports.newGrid(sizeX, sizeY, initialFun)
        for y = 0, sizeY - 1 do
            for x = 0, sizeX - 1 do
                copyGrid.set(
                    x,
                    y,
                    get(x, y)
                )
            end
        end
        return copyGrid
    end
    local function contains(value, condition)
        local ____temp_0
        if condition ~= undefined then
            ____temp_0 = condition
        else
            ____temp_0 = function(v) return v == value end
        end
        local cond = ____temp_0
        return __TS__ArrayFind(
            grid,
            function(____, v) return cond(v) end
        ) ~= undefined
    end
    local function rows()
        return sizeY
    end
    local function cols()
        return sizeX
    end
    local function sliceRow(y)
        return __TS__ArraySlice(grid, y * sizeX, (y + 1) * sizeX)
    end
    local function sliceCol(x)
        local colStartIndex = toIndex(x, 0)
        local colEndIndex = toIndex(x, sizeY - 1)
        return __TS__ArraySlice(grid, colStartIndex, colEndIndex)
    end
    local function iterate(iterFun)
        for y = 0, sizeY - 1 do
            for x = 0, sizeX - 1 do
                local result = iterFun(
                    get(x, y),
                    {x = x, y = y, idx = y * sizeX + x}
                )
                if result ~= undefined then
                    return result
                end
            end
        end
    end
    return {
        get = get,
        set = set,
        cpy = cpy,
        contains = contains,
        values = function() return grid end,
        rows = rows,
        cols = cols,
        iterate = iterate,
        sliceRow = sliceRow,
        sliceCol = sliceCol
    }
end
return ____exports
