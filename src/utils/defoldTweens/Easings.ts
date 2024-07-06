const pow = math.pow;
const sin = math.sin;
const cos = math.cos;
const pi = math.pi;
const sqrt = math.sqrt;
const abs = math.abs;
const asin = math.asin;

export type EasingFunction = (t: number, b: number, c: number, d: number) => number;

//easings

function linear(t: number, b: number, c: number, d: number): number {
    return (c * t / d) + b;
}

function inQuad(t: number, b: number, c: number, d: number): number {
    t = t / d;
    return (c * pow(t, 2)) + b;
}

function outQuad(t: number, b: number, c: number, d: number): number {
    t = t / d;
    return (-c * t * (t - 2)) + b;
}

function inOutQuad(t: number, b: number, c: number, d: number): number {
    t = t / d * 2;
    if (t < 1) {
        return (c / 2 * pow(t, 2)) + b;
    } else {
        return (-c / 2 * ((t - 1) * (t - 3) - 1)) + b;
    }
}

function outInQuad(t: number, b: number, c: number, d: number): number {
    if (t < d / 2) {
        return outQuad(t * 2, b, c / 2, d);
    } else {
        return inQuad((t * 2) - d, b + c / 2, c / 2, d);
    }
}

function inCubic(t: number, b: number, c: number, d: number): number {
    t = t / d;
    return c * pow(t, 3) + b;
}

function outCubic(t: number, b: number, c: number, d: number): number {
    t = t / d - 1;
    return c * (pow(t, 3) + 1) + b;
}

function inOutCubic(t: number, b: number, c: number, d: number): number {
    t = t / d * 2;
    if (t < 1) {
        return c / 2 * t * t * t + b;
    } else {
        t = t - 2;
        return c / 2 * (t * t * t + 2) + b;
    }
}

function outInCubic(t: number, b: number, c: number, d: number): number {
    if (t < d / 2) {
        return outCubic(t * 2, b, c / 2, d);
    } else {
        return inCubic((t * 2) - d, b + c / 2, c / 2, d);
    }
}

function inQuart(t: number, b: number, c: number, d: number): number {
    t = t / d;
    return c * pow(t, 4) + b;
}

function outQuart(t: number, b: number, c: number, d: number): number {
    t = t / d - 1;
    return -c * (pow(t, 4) - 1) + b;
}

function inOutQuart(t: number, b: number, c: number, d: number): number {
    t = t / d * 2;
    if (t < 1) {
        return c / 2 * pow(t, 4) + b;
    } else {
        t = t - 2;
        return -c / 2 * (pow(t, 4) - 2) + b;
    }
}

function outInQuart(t: number, b: number, c: number, d: number): number {
    if (t < d / 2) {
        return outQuart(t * 2, b, c / 2, d);
    } else {
        return inQuart((t * 2) - d, b + c / 2, c / 2, d);
    }
}

function inQuint(t: number, b: number, c: number, d: number): number {
    t = t / d;
    return c * pow(t, 5) + b;
}

function outQuint(t: number, b: number, c: number, d: number): number {
    t = t / d - 1;
    return c * (pow(t, 5) + 1) + b;
}

function inOutQuint(t: number, b: number, c: number, d: number): number {
    t = t / d * 2;
    if (t < 1) {
        return c / 2 * pow(t, 5) + b;
    } else {
        t = t - 2;
        return c / 2 * (pow(t, 5) + 2) + b;
    }
}

function outInQuint(t: number, b: number, c: number, d: number): number {
    if (t < d / 2) {
        return outQuint(t * 2, b, c / 2, d);
    } else {
        return inQuint((t * 2) - d, b + c / 2, c / 2, d);
    }
}

function inSine(t: number, b: number, c: number, d: number): number {
    return -c * cos(t / d * (pi / 2)) + c + b;
}

function outSine(t: number, b: number, c: number, d: number): number {
    return c * sin(t / d * (pi / 2)) + b;
}

function inOutSine(t: number, b: number, c: number, d: number): number {
    return -c / 2 * (cos(pi * t / d) - 1) + b;
}

function outInSine(t: number, b: number, c: number, d: number): number {
    if (t < d / 2) {
        return outSine(t * 2, b, c / 2, d);
    } else {
        return inSine((t * 2) - d, b + c / 2, c / 2, d);
    }
}

function inExpo(t: number, b: number, c: number, d: number): number {
    if (t === 0) {
        return b;
    } else {
        return c * pow(2, 10 * (t / d - 1)) + b - c * 0.001;
    }
}

function outExpo(t: number, b: number, c: number, d: number): number {
    if (t === d) {
        return b + c;
    } else {
        return c * 1.001 * (-pow(2, -10 * t / d) + 1) + b;
    }
}

function inOutExpo(t: number, b: number, c: number, d: number): number {
    if (t === 0) return b;
    if (t === d) return b + c;

    t = t / d * 2;
    if (t < 1) {
        return c / 2 * pow(2, 10 * (t - 1)) + b - c * 0.0005;
    } else {
        t = t - 1;
        return c / 2 * 1.0005 * (-pow(2, -10 * t) + 2) + b;
    }
}

function outInExpo(t: number, b: number, c: number, d: number): number {
    if (t < d / 2) {
        return outExpo(t * 2, b, c / 2, d);
    } else {
        return inExpo((t * 2) - d, b + c / 2, c / 2, d);
    }
}

function inCirc(t: number, b: number, c: number, d: number): number {
    t = t / d;
    return -c * (sqrt(1 - pow(t, 2)) - 1) + b;
}

function outCirc(t: number, b: number, c: number, d: number): number {
    t = t / d - 1;
    return c * sqrt(1 - pow(t, 2)) + b;
}

function inOutCirc(t: number, b: number, c: number, d: number): number {
    t = t / d * 2;
    if (t < 1) {
        return -c / 2 * (sqrt(1 - pow(t, 2)) - 1) + b;
    } else {
        t = t - 2;
        return c / 2 * (sqrt(1 - pow(t, 2)) + 1) + b;
    }
}

function outInCirc(t: number, b: number, c: number, d: number): number {
    if (t < d / 2) {
        return outCirc(t * 2, b, c / 2, d);
    } else {
        return inCirc((t * 2) - d, b + c / 2, c / 2, d);
    }
}

function inElastic(t: number, b: number, c: number, d: number, a: number, p: number): number {
    if (t === 0) return b;

    t = t / d;

    if (t === 1) return b + c;

    if (!p) p = d * 0.3;

    let s;

    if (!a || a < abs(c)) {
        a = c;
        s = p / 4;
    } else {
        s = p / (2 * pi) * asin(c / a);
    }

    t = t - 1;

    return -(a * pow(2, 10 * t) * sin((t * d - s) * (2 * pi) / p)) + b;
}

function outElastic(t: number, b: number, c: number, d: number, a: number, p: number): number {
    if (t === 0) return b;

    t = t / d;

    if (t === 1) return b + c;

    if (!p) p = d * 0.3;

    let s;

    if (!a || a < abs(c)) {
        a = c;
        s = p / 4;
    } else {
        s = p / (2 * pi) * asin(c / a);
    }

    return a * pow(2, -10 * t) * sin((t * d - s) * (2 * pi) / p) + c + b;
}

function inOutElastic(t: number, b: number, c: number, d: number, a: number, p: number): number {
    if (t === 0) return b;

    t = t / d * 2;

    if (t === 2) return b + c;

    if (!p) p = d * (0.3 * 1.5);
    if (!a) a = 0;

    let s;

    if (!a || a < abs(c)) {
        a = c;
        s = p / 4;
    } else {
        s = p / (2 * pi) * asin(c / a);
    }

    if (t < 1) {
        t = t - 1;
        return -0.5 * (a * pow(2, 10 * t) * sin((t * d - s) * (2 * pi) / p)) + b;
    } else {
        t = t - 1;
        return a * pow(2, -10 * t) * sin((t * d - s) * (2 * pi) / p) * 0.5 + c + b;
    }
}

function outInElastic(t: number, b: number, c: number, d: number, a: number, p: number): number {
    if (t < d / 2) {
        return outElastic(t * 2, b, c / 2, d, a, p);
    } else {
        return inElastic((t * 2) - d, b + c / 2, c / 2, d, a, p);
    }
}

const Easings = {
    outCirc,
    outInCirc,
    outCubic,
    outElastic,
    outExpo, inElastic, inOutElastic, outInElastic,
    linear, outInQuint, inSine, outSine, inOutSine, outInSine, inExpo, inOutExpo, outInExpo, inCirc, inOutCirc,
    inQuad, outQuad, inOutQuad, outInQuad, inCubic, inOutCubic, outInCubic, inQuart, outQuart, inOutQuart, outInQuart, inQuint, outQuint, inOutQuint
};

export default Easings;