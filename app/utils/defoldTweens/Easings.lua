local ____exports = {}
local pow = math.pow
local sin = math.sin
local cos = math.cos
local pi = math.pi
local sqrt = math.sqrt
local abs = math.abs
local asin = math.asin
local function linear(t, b, c, d)
    return c * t / d + b
end
local function inQuad(t, b, c, d)
    t = t / d
    return c * pow(t, 2) + b
end
local function outQuad(t, b, c, d)
    t = t / d
    return -c * t * (t - 2) + b
end
local function inOutQuad(t, b, c, d)
    t = t / d * 2
    if t < 1 then
        return c / 2 * pow(t, 2) + b
    else
        return -c / 2 * ((t - 1) * (t - 3) - 1) + b
    end
end
local function outInQuad(t, b, c, d)
    if t < d / 2 then
        return outQuad(t * 2, b, c / 2, d)
    else
        return inQuad(t * 2 - d, b + c / 2, c / 2, d)
    end
end
local function inCubic(t, b, c, d)
    t = t / d
    return c * pow(t, 3) + b
end
local function outCubic(t, b, c, d)
    t = t / d - 1
    return c * (pow(t, 3) + 1) + b
end
local function inOutCubic(t, b, c, d)
    t = t / d * 2
    if t < 1 then
        return c / 2 * t * t * t + b
    else
        t = t - 2
        return c / 2 * (t * t * t + 2) + b
    end
end
local function outInCubic(t, b, c, d)
    if t < d / 2 then
        return outCubic(t * 2, b, c / 2, d)
    else
        return inCubic(t * 2 - d, b + c / 2, c / 2, d)
    end
end
local function inQuart(t, b, c, d)
    t = t / d
    return c * pow(t, 4) + b
end
local function outQuart(t, b, c, d)
    t = t / d - 1
    return -c * (pow(t, 4) - 1) + b
end
local function inOutQuart(t, b, c, d)
    t = t / d * 2
    if t < 1 then
        return c / 2 * pow(t, 4) + b
    else
        t = t - 2
        return -c / 2 * (pow(t, 4) - 2) + b
    end
end
local function outInQuart(t, b, c, d)
    if t < d / 2 then
        return outQuart(t * 2, b, c / 2, d)
    else
        return inQuart(t * 2 - d, b + c / 2, c / 2, d)
    end
end
local function inQuint(t, b, c, d)
    t = t / d
    return c * pow(t, 5) + b
end
local function outQuint(t, b, c, d)
    t = t / d - 1
    return c * (pow(t, 5) + 1) + b
end
local function inOutQuint(t, b, c, d)
    t = t / d * 2
    if t < 1 then
        return c / 2 * pow(t, 5) + b
    else
        t = t - 2
        return c / 2 * (pow(t, 5) + 2) + b
    end
end
local function outInQuint(t, b, c, d)
    if t < d / 2 then
        return outQuint(t * 2, b, c / 2, d)
    else
        return inQuint(t * 2 - d, b + c / 2, c / 2, d)
    end
end
local function inSine(t, b, c, d)
    return -c * cos(t / d * (pi / 2)) + c + b
end
local function outSine(t, b, c, d)
    return c * sin(t / d * (pi / 2)) + b
end
local function inOutSine(t, b, c, d)
    return -c / 2 * (cos(pi * t / d) - 1) + b
end
local function outInSine(t, b, c, d)
    if t < d / 2 then
        return outSine(t * 2, b, c / 2, d)
    else
        return inSine(t * 2 - d, b + c / 2, c / 2, d)
    end
end
local function inExpo(t, b, c, d)
    if t == 0 then
        return b
    else
        return c * pow(2, 10 * (t / d - 1)) + b - c * 0.001
    end
end
local function outExpo(t, b, c, d)
    if t == d then
        return b + c
    else
        return c * 1.001 * (-pow(2, -10 * t / d) + 1) + b
    end
end
local function inOutExpo(t, b, c, d)
    if t == 0 then
        return b
    end
    if t == d then
        return b + c
    end
    t = t / d * 2
    if t < 1 then
        return c / 2 * pow(2, 10 * (t - 1)) + b - c * 0.0005
    else
        t = t - 1
        return c / 2 * 1.0005 * (-pow(2, -10 * t) + 2) + b
    end
end
local function outInExpo(t, b, c, d)
    if t < d / 2 then
        return outExpo(t * 2, b, c / 2, d)
    else
        return inExpo(t * 2 - d, b + c / 2, c / 2, d)
    end
end
local function inCirc(t, b, c, d)
    t = t / d
    return -c * (sqrt(1 - pow(t, 2)) - 1) + b
end
local function outCirc(t, b, c, d)
    t = t / d - 1
    return c * sqrt(1 - pow(t, 2)) + b
end
local function inOutCirc(t, b, c, d)
    t = t / d * 2
    if t < 1 then
        return -c / 2 * (sqrt(1 - pow(t, 2)) - 1) + b
    else
        t = t - 2
        return c / 2 * (sqrt(1 - pow(t, 2)) + 1) + b
    end
end
local function outInCirc(t, b, c, d)
    if t < d / 2 then
        return outCirc(t * 2, b, c / 2, d)
    else
        return inCirc(t * 2 - d, b + c / 2, c / 2, d)
    end
end
local function inElastic(t, b, c, d, a, p)
    if t == 0 then
        return b
    end
    t = t / d
    if t == 1 then
        return b + c
    end
    if not p then
        p = d * 0.3
    end
    local s
    if not a or a < abs(c) then
        a = c
        s = p / 4
    else
        s = p / (2 * pi) * asin(c / a)
    end
    t = t - 1
    return -(a * pow(2, 10 * t) * sin((t * d - s) * (2 * pi) / p)) + b
end
local function outElastic(t, b, c, d, a, p)
    if t == 0 then
        return b
    end
    t = t / d
    if t == 1 then
        return b + c
    end
    if not p then
        p = d * 0.3
    end
    local s
    if not a or a < abs(c) then
        a = c
        s = p / 4
    else
        s = p / (2 * pi) * asin(c / a)
    end
    return a * pow(2, -10 * t) * sin((t * d - s) * (2 * pi) / p) + c + b
end
local function inOutElastic(t, b, c, d, a, p)
    if t == 0 then
        return b
    end
    t = t / d * 2
    if t == 2 then
        return b + c
    end
    if not p then
        p = d * (0.3 * 1.5)
    end
    if not a then
        a = 0
    end
    local s
    if not a or a < abs(c) then
        a = c
        s = p / 4
    else
        s = p / (2 * pi) * asin(c / a)
    end
    if t < 1 then
        t = t - 1
        return -0.5 * (a * pow(2, 10 * t) * sin((t * d - s) * (2 * pi) / p)) + b
    else
        t = t - 1
        return a * pow(2, -10 * t) * sin((t * d - s) * (2 * pi) / p) * 0.5 + c + b
    end
end
local function outInElastic(t, b, c, d, a, p)
    if t < d / 2 then
        return outElastic(
            t * 2,
            b,
            c / 2,
            d,
            a,
            p
        )
    else
        return inElastic(
            t * 2 - d,
            b + c / 2,
            c / 2,
            d,
            a,
            p
        )
    end
end
local Easings = {
    outCirc = outCirc,
    outInCirc = outInCirc,
    outCubic = outCubic,
    outElastic = outElastic,
    outExpo = outExpo,
    inElastic = inElastic,
    inOutElastic = inOutElastic,
    outInElastic = outInElastic,
    linear = linear,
    outInQuint = outInQuint,
    inSine = inSine,
    outSine = outSine,
    inOutSine = inOutSine,
    outInSine = outInSine,
    inExpo = inExpo,
    inOutExpo = inOutExpo,
    outInExpo = outInExpo,
    inCirc = inCirc,
    inOutCirc = inOutCirc,
    inQuad = inQuad,
    outQuad = outQuad,
    inOutQuad = inOutQuad,
    outInQuad = outInQuad,
    inCubic = inCubic,
    inOutCubic = inOutCubic,
    outInCubic = outInCubic,
    inQuart = inQuart,
    outQuart = outQuart,
    inOutQuart = inOutQuart,
    outInQuart = outInQuart,
    inQuint = inQuint,
    outQuint = outQuint,
    inOutQuint = inOutQuint
}
____exports.default = Easings
return ____exports
