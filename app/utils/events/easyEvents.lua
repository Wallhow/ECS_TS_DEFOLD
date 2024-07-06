local ____lualib = require("lualib_bundle")
local __TS__Spread = ____lualib.__TS__Spread
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__Delete = ____lualib.__TS__Delete
local ____exports = {}
function ____exports.newEasyEvents(events, callbacksDeclare)
    local _callbackCall
    function _callbackCall(listener, args)
        local isOk = true
        local err = ""
        local ____listener_context_2 = listener.context
        if ____listener_context_2 == nil then
            ____listener_context_2 = {}
        end
        local context = ____listener_context_2
        local res = {pcall(function()
            listener.callback(
                context,
                __TS__Spread(args)
            )
        end)}
        isOk = res[1]
        err = res[2]
        return {isOk = isOk, err = err}
    end
    local listeners = {}
    for ____, eventKey in ipairs(events) do
        listeners[eventKey] = {}
    end
    local function on(event, callback, context)
        if listeners[event] == undefined then
            listeners[event] = {}
        end
        local ____listeners_event_0 = listeners[event]
        ____listeners_event_0[#____listeners_event_0 + 1] = {callback = callback, context = context}
    end
    local function emit(event, ...)
        local args = {...}
        if listeners[event] ~= undefined then
            for ____, listener in ipairs(listeners[event]) do
                local ____callbackCall_result_1 = _callbackCall(listener, args)
                local isOk = ____callbackCall_result_1.isOk
                local err = ____callbackCall_result_1.err
                if not isOk then
                    Log.error((("Emite event " .. event) .. " error: ") .. tostring(err))
                end
            end
        end
    end
    local function final()
        for ____, key in ipairs(events) do
            local listenerList = listeners[key]
            if listenerList ~= undefined and #listenerList > 0 then
                __TS__ArraySplice(listenerList, 0, #listenerList - 1)
            end
            __TS__Delete(listeners, key)
        end
    end
    return {on = on, emit = emit, final = final}
end
return ____exports
