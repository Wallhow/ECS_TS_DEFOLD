/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */


export type v2like = { x: number, y: number };

export function hex2rgba(hex: string, alpha = 1) {
    hex = hex.replace('#', '');
    if (hex.length == 3)
        return vmath.vector4(
            tonumber("0x" + hex.substr(0, 1))! * 17 / 255,
            tonumber("0x" + hex.substr(1, 1))! * 17 / 255,
            tonumber("0x" + hex.substr(2, 1))! * 17 / 255, alpha);

    else if (hex.length == 6)
        return vmath.vector4(
            tonumber("0x" + hex.substr(0, 2))! / 255,
            tonumber("0x" + hex.substr(2, 2))! / 255,
            tonumber("0x" + hex.substr(4, 2))! / 255, alpha);
    else {
        assert(false, 'hex not correct:' + hex);
        return vmath.vector4();
    }
}


export function set_text_colors(list: string[], color: string, alpha = 1) {
    for (let i = 0; i < list.length; i++) {
        gui.set_color(
            gui.get_node(list[i]),
            hex2rgba(color, alpha)
        );
    }
}

export function hide_gui_list(list: string[]) {
    for (let i = 0; i < list.length; i++) {
        gui.set_enabled(gui.get_node(list[i]), false);
    }
}

export function show_gui_list(list: string[]) {
    for (let i = 0; i < list.length; i++) {
        gui.set_enabled(gui.get_node(list[i]), true);
    }
}

export function set_text(name: string, text: string | number) {
    const n = gui.get_node(name);
    gui.set_text(n, text + '');
}

export function sort_list<T>(list: T[], field: string, isAsc = true) {
    if (isAsc)
        return list.sort((a: any, b: any) => a[field] - b[field]);
    else
        return list.sort((a: any, b: any) => b[field] - a[field]);
}


function CatmullRom(t: number, p0: number, p1: number, p2: number, p3: number) {

    const v0 = (p2 - p0) * 0.5;
    const v1 = (p3 - p1) * 0.5;
    const t2 = t * t;
    const t3 = t * t2;
    return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (- 3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;

}

export function getPointCurve(t: number, points: { x: number, y: number }[], point: vmath.vector3) {
    const p = (points.length - 1) * t;

    const intPoint = Math.floor(p);
    const weight = p - intPoint;

    const p0 = points[intPoint === 0 ? intPoint : intPoint - 1];
    const p1 = points[intPoint];
    const p2 = points[intPoint > points.length - 2 ? points.length - 1 : intPoint + 1];
    const p3 = points[intPoint > points.length - 3 ? points.length - 1 : intPoint + 2];

    point.x = CatmullRom(weight, p0.x, p1.x, p2.x, p3.x);
    point.y = CatmullRom(weight, p0.y, p1.y, p2.y, p3.y);
    return point;
}
/*
export function setting_val_or_def<T>(name_val:string): T {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return getSettingsVal<T>(name_val,GameStorage.get(name_val));
}*/


export function button_off(buttons: DruidButton[]) {
    buttons.forEach(button => {
        button.set_enabled(false);
    });
}

export function to2d(index: number, cols: number): [number, number] {
    const row = Math.floor(index / cols);
    const col = index % cols;
    return [col, row];
}


export function shuffle(array: any[]): void {
    math.randomseed(os.time());
    for (let i = array.length - 1; i > 0; i--) {
        const j = math.floor(math.random() * (i + 1));
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function repeat(count_repeat_action: number, action: (index: number, repeat_context: { is_break: boolean }) => void) {
    const context = { is_break: false };
    for (let i = 0; i < count_repeat_action; i++) {
        if (context.is_break) {
            break;
        }
        action(i, context);
    }
}

export function distance(v1: vmath.vector3, v2: vmath.vector3): number {
    const dx = (v1.x - v2.x);
    const dy = (v1.y - v2.y);
    return math.sqrt(math.abs((dx * dx) + (dy * dy)));
}

export function clamp(value: number, min: number, max: number): number {
    return value < min ? min : value > max ? max : value;
}

export function in_next_frame(func: () => void) {
    timer.delay(0.002, false, func);
}

export function overlaps_circle_circle(ax: number, ay: number, ar: number,
    bx: number, by: number, br: number) {
    return math.abs(((ax - bx) ** 2) + ((ay - by) ** 2)) < ((ar + br) ** 2);
}


export function is<T extends object, K extends keyof T>(arg1: T, arg2: Omit<T, K>, ...excludeFields: (K)[]): boolean {
    for (const key of Object.keys(arg1))
        if (!excludeFields.includes(key as K) && arg1[key] !== arg2[key]) return false;

    return true;
}

export function isNot<T extends object, K extends keyof T>(arg1: T, arg2: Omit<T, K>, ...excludeFields: (K)[]): boolean {
    return !is(arg1, arg2, ...excludeFields);
}



export function iterate<T>(object: T, func: (element: T[keyof T]) => void) {
    for (const key in object) {
        const element = object[key as keyof typeof object];
        func(element);
    }
}


export function lastIndexOf(str: string, pattern: string) {
    if (pattern == '') return undefined;
    let position = string.find(str, pattern, 1);
    let previous = undefined;

    while (position.length != 0) {
        previous = position;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        position = string.find(str, pattern, previous[1] + 1);
    }

    return previous;
}

export function parseTime(t: number) {
    const d = math.floor(t);
    const m = math.floor(d / 60);
    const s = d - m * 60;
    const mm = m < 10 ? "0" + m : m + "";
    const ss = s < 10 ? "0" + s : s + "";
    return mm + ":" + ss;
}

export function sign() {
    return math.random(0, 1) == 1 ? 1 : -1;
}