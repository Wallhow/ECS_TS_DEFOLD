
/**@noSelf */
export interface GuiEffects {
    blackoutEffect(node: AnyTable, duration?: number, to_alpha?: number, callback?: () => void): void;
    brighteningEffect(node: AnyTable, duration?: number, to_alpha?: number, callback?: () => void): void;
}

export function gui_effects(): GuiEffects {

    return {
        blackoutEffect: (node: LuaUserdata, duration = 0.3, to_alpha = 1, callback?: () => void): void => {

            const node_1 = node;
            const clr = gui.get_color(node_1);
            clr.x = 0.4;
            clr.y = 0.4;
            clr.z = 0.4;
            clr.w = to_alpha;
            gui.animate(node_1, gui.PROP_COLOR, clr, gui.EASING_INSINE, duration, 0, callback);
        },

        brighteningEffect: (node: LuaUserdata, duration = 0.3, to_alpha = 1, callback?: () => void) => {
            const node_1 = node;
            const to = vmath.vector4(1, 1, 1, to_alpha);
            gui.animate(node_1, gui.PROP_COLOR, to, gui.EASING_INSINE, duration, 0, callback);
        }
    };
}

export function set_opacity(node_name: any, alpha: number) {
    const node = type(node_name) == 'string' ? gui.get_node(node_name as string) : node_name as LuaTable;
    const color = gui.get_color(node);
    color.w = alpha;
    gui.set_color(node, color);
}

export function add_scale(node_name: any, scale_xy: number) {
    const node = type(node_name) == 'string' ? gui.get_node(node_name as string) : node_name as LuaTable;
    const scale = gui.get_scale(node);
    scale.x += scale_xy;
    scale.y += scale_xy;
    gui.set_scale(node, scale);
}
export function set_scale(node_name: any, scale_xy: number) {
    const node = type(node_name) == 'string' ? gui.get_node(node_name as string) : node_name as LuaTable;
    const scale = gui.get_scale(node);
    scale.x = scale_xy;
    scale.y = scale_xy;
    gui.set_scale(node, scale);
}
export function anim_scale(node_name: any, to_scale_xy: number, duration: number, easing: any, complited_fun?: () => void) {
    const node = type(node_name) == 'string' ? gui.get_node(node_name as string) : node_name as LuaTable;

    gui.animate(node, gui.PROP_SCALE, vmath.vector3(to_scale_xy, to_scale_xy, 1), easing, duration, 0, complited_fun, gui.PLAYBACK_ONCE_FORWARD);
}

export function anim_opacity(node_name: any, to_opacity: number, duration: number, easing: any, complited_fun?: () => void) {
    const node = type(node_name) == 'string' ? gui.get_node(node_name as string) : node_name as LuaTable;

    const color = gui.get_color(node);
    color.w = to_opacity;
    gui.animate(node, gui.PROP_COLOR, color, easing, duration, 0, complited_fun, gui.PLAYBACK_ONCE_FORWARD);
}

export function anim_position(node_name: any, to_position: vmath.vector3, duration: number, easing: any, complited_fun?: () => void) {
    const node = type(node_name) == 'string' ? gui.get_node(node_name as string) : node_name as LuaTable;
    gui.animate(node, gui.PROP_POSITION, to_position, easing, duration, 0, complited_fun, gui.PLAYBACK_ONCE_FORWARD);    
}

export function anim_color(node_name: any, to_color: [number,number,number,number], duration: number, easing: any, complited_fun?: () => void) {
    const node = type(node_name) == 'string' ? gui.get_node(node_name as string) : node_name as LuaTable;

    const color = gui.get_color(node);
    color.x = to_color[0];
    color.y = to_color[1];
    color.z = to_color[2];
    color.w = to_color[3];
    gui.animate(node, gui.PROP_COLOR, color, easing, duration, 0, complited_fun, gui.PLAYBACK_ONCE_FORWARD);
}

function hsv_to_rgb(h: number, s: number, v: number): [number, number, number] {
    let r: number, g: number, b: number;
    r = 0;
    g = 0;
    b = 0;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return [r, g, b];
}

export function animate_rainbow_effect(node: node) {
    const duration = 2;
    const num_steps = 20;
    const step_duration = duration / num_steps;
    
    coroutine.wrap(() => {
        for (let i = 0; i < num_steps; i++) {
            const t = i / (num_steps - 1);
            const [r, g, b] = hsv_to_rgb(t * 359,1,1);
            gui_animate(node, gui.PROP_COLOR, vmath.vector3(r, g, b), gui.EASING_INSINE, step_duration, step_duration * i, gui.PLAYBACK_ONCE_FORWARD);
        }
    })();


    timer.delay(duration, true, () => {
        coroutine.wrap(() => {
            for (let i = 0; i < num_steps; i++) {
                const t = i / (num_steps - 1);
                const [r, g, b] = hsv_to_rgb(t * 359,1,1);
                gui_animate(node, gui.PROP_COLOR, vmath.vector3(r, g, b), gui.EASING_INSINE, step_duration, step_duration * i, gui.PLAYBACK_ONCE_FORWARD);
            }
        })();

    });


}


function gui_animate(node: any, prop: any, to: any, easing: any, duration: number, delay: number, playback: any) {
    const co = coroutine.running();
    if (co != undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        gui.animate(node, prop, to, easing, duration, delay, () => {
            coroutine.resume(co);
        }, playback);
        coroutine.yield();
    }

}