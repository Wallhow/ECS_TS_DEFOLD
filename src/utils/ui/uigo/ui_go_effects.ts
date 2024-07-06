import { go_ui } from "./interfaces/go_ui";

/**@noSelf **/
interface ui_go_effects {
    set_opacity(uigo: go_ui, alpha: number): void;
    get_opacity(uigo: go_ui): number;
    add_scale(uigo: go_ui, scale_xy: number): void;
    set_scale(uigo: go_ui, scale_xy: number): void;
    set_rotation(uigo: go_ui, to_rotate: vmath.quaternion): void;

    anim_scale(uigo: go_ui, to_scale_xy: number, duration?: number, easing?: any, complite_func?: (() => void) | undefined): void;
    anim_opacity(uigo: go_ui, to_opacity: number, duration: number, easing: any, complite_func?: (() => void) | undefined): void;
    anim_rotation(uigo: go_ui, to_rotate: vmath.quaternion, duration: number, easing: any, complite_func?: (() => void) | undefined): void;
    anim_position(uigo: go_ui, to_position: vmath.vector3, duration: number, easing: any, complite_func?: (() => void) | undefined): void;
}

export function uigo_effects(): ui_go_effects {
    
    function set_opacity(uigo: go_ui, alpha: number) {
        const color = go.get(uigo.url, 'color') as vmath.vector4;
        color.w = alpha;
        go.set(uigo.url, 'color', color);
    }

    function get_opacity(uigo: go_ui): number {
        const color = go.get(uigo.url, 'color') as vmath.vector4;
        return color.w;
    }

    function add_scale(uigo: go_ui, scale_xy: number) {
        const scale = go.get_scale(uigo.url);
        scale.x += scale_xy;
        scale.y += scale_xy;
        go.set_scale(scale, uigo.url);
    }

    function set_scale(uigo: go_ui, scale_xy: number) {
        const scale = go.get_scale(uigo.url);
        scale.x = scale_xy;
        scale.y = scale_xy;
        go.set_scale(scale, uigo.url);
    }

    function set_rotation(uigo: go_ui, to_rotate: vmath.quaternion) {
        go.set_rotation(to_rotate,uigo.url);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    function anim_scale(uigo: go_ui, to_scale_xy: number, duration = 0.2, easing = go.EASING_OUTSINE, complite_func = undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        go.animate(uigo.url, 'scale', go.PLAYBACK_ONCE_FORWARD, vmath.vector3(to_scale_xy, to_scale_xy, 1), easing, duration, 0, complite_func);
    }

    function anim_opacity(uigo: go_ui, to_opacity: number, duration: number, easing: any, complite_func = undefined) {
        const color = go.get(uigo.url, 'color') as vmath.vector4;
        color.w = to_opacity;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        go.animate(uigo.url, 'color', go.PLAYBACK_ONCE_FORWARD, color, easing, duration, 0, complite_func);
    }

    function anim_rotation(uigo: go_ui, to_rotate: vmath.quaternion, duration: number, easing: any, complite_func = undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        go.animate(uigo.url, 'rotation', go.PLAYBACK_ONCE_FORWARD, to_rotate, easing, duration, 0, complite_func);
    }

    function anim_position(uigo: go_ui, to_position: vmath.vector3, duration: number, easing: any, complite_func = undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        go.animate(uigo.url, 'position', go.PLAYBACK_ONCE_FORWARD, to_position, easing, duration, 0, complite_func);
    }
    






    return {
        set_opacity, set_scale, anim_opacity, add_scale, anim_scale, get_opacity,anim_rotation,anim_position,set_rotation
    };
}

