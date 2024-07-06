local ____lualib = require("lualib_bundle")
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local ____exports = {}
local function createObservableVal(value, receive_msg_when_subscribe)
    if receive_msg_when_subscribe == nil then
        receive_msg_when_subscribe = false
    end
    local observers = {}
    local value_ = value
    local function subscribe(fn)
        observers[#observers + 1] = fn
        if receive_msg_when_subscribe then
            fn(value_)
        end
    end
    local function unsubscribe(fn)
        observers = __TS__ArrayFilter(
            observers,
            function(____, subscriber) return subscriber ~= fn end
        )
    end
    local function setValue(data)
        value_ = data
        __TS__ArrayForEach(
            observers,
            function(____, subscriber) return subscriber(value_) end
        )
    end
    local function getValue()
        return value_
    end
    return {get = getValue, set = setValue, subscribe = subscribe, unsubscribe = unsubscribe}
end
local function createObservableNumberVal(value, receive_msg_when_subscribe)
    if receive_msg_when_subscribe == nil then
        receive_msg_when_subscribe = false
    end
    local observableVal = createObservableVal(value, receive_msg_when_subscribe)
    local function add(v)
        observableVal.set(observableVal.get() + v)
    end
    local function sub(v)
        observableVal.set(observableVal.get() - v)
    end
    return __TS__ObjectAssign({}, observableVal, {add = add, sub = sub})
end
local function createObservableNumberValWithPre(value, receive_msg_when_subscribe)
    if receive_msg_when_subscribe == nil then
        receive_msg_when_subscribe = false
    end
    local observers = {}
    local value_ = value
    local pre_value = value
    local function subscribe(fn)
        observers[#observers + 1] = fn
        if receive_msg_when_subscribe then
            fn(value_, pre_value)
        end
    end
    local function unsubscribe(fn)
        observers = __TS__ArrayFilter(
            observers,
            function(____, subscriber) return subscriber ~= fn end
        )
    end
    local function setValue(data)
        pre_value = value_
        value_ = data
        __TS__ArrayForEach(
            observers,
            function(____, subscriber) return subscriber(value_, pre_value) end
        )
    end
    local function getValue()
        return value_
    end
    return {get = getValue, set = setValue, subscribe = subscribe, unsubscribe = unsubscribe}
end
____exports.ObservableVal = createObservableVal
____exports.ObservableNumberVal = createObservableNumberVal
____exports.ObservableNumberValWithPre = createObservableNumberValWithPre
return ____exports
