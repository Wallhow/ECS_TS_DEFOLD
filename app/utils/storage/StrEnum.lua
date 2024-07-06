local ____lualib = require("lualib_bundle")
local __TS__ArrayReduce = ____lualib.__TS__ArrayReduce
local ____exports = {}
function ____exports.newStrEnum(arr)
    return __TS__ArrayReduce(
        arr,
        function(____, acc, val)
            acc[val] = val
            return acc
        end,
        {}
    )
end
return ____exports
