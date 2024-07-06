local ____lualib = require("lualib_bundle")
local __TS__ArrayReduce = ____lualib.__TS__ArrayReduce
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local ____exports = {}
local _createActions
local ____Easings = require("utils.defoldTweens.Easings")
local Easings = ____Easings.default
function _createActions(obj)
    local getOpt, _startTween, defaultOptions, thisTween
    function getOpt(opt, key)
        local ____temp_1
        if opt ~= nil and opt[key] ~= nil then
            ____temp_1 = opt[key]
        else
            ____temp_1 = defaultOptions[key]
        end
        return ____temp_1
    end
    function _startTween(easingFunction, from, to, time, callback)
        local timeElapsed = 0
        timer.delay(
            0.016,
            true,
            function(_, handler, timeElapsedFromTrigger)
                timeElapsed = timeElapsed + timeElapsedFromTrigger
                if timeElapsed >= time then
                    callback(
                        easingFunction(time, from, to - from, time),
                        true
                    )
                    timer.cancel(handler)
                    return
                end
                callback(easingFunction(timeElapsed, from, to - from, time))
            end
        )
    end
    local sequence = {}
    defaultOptions = {
        easing = "linear",
        onUpdate = function(____, currentValue, toValue)
        end,
        onComplete = function(____, currentValue)
        end
    }
    local function to(prop, value, duration, opt)
        sequence[#sequence + 1] = {
            key = "TO",
            prop = prop,
            duration = duration,
            delay = 0,
            val = value,
            opt = opt
        }
        return thisTween
    end
    local function start()
        if #sequence > 0 then
            __TS__ArrayReduce(
                sequence,
                function(____, acc, tween, idx)
                    local ____tween_0 = tween
                    local prop = ____tween_0.prop
                    local duration = ____tween_0.duration
                    local val = ____tween_0.val
                    local opt = ____tween_0.opt
                    local easing = getOpt(opt, "easing")
                    local onUpdate = getOpt(opt, "onUpdate")
                    local onComplete = getOpt(opt, "onComplete")
                    _startTween(
                        Easings[easing],
                        obj[prop],
                        val,
                        duration,
                        function(val, isFinished)
                            obj[prop] = val
                            onUpdate(nil, obj[prop], val)
                            if isFinished then
                                onComplete(nil, obj[prop])
                            end
                        end
                    )
                    acc = acc + duration
                    return acc
                end,
                0
            )
            __TS__ArraySplice(sequence, 0, #sequence)
        end
    end
    thisTween = {to = to, start = start}
    return thisTween
end
____exports.action = _createActions
return ____exports
