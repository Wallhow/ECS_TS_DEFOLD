import { goexists } from "./go_utils";
import { v2 } from "./ui_go_util_types";

export const UIGO_ACTION_ID_PRESSED = hash('input_down');
export const UIGO_ACTION_ID_RELEASED = hash('input_up');

export function set_sprite_color(go_hash: hash, color: vmath.vector4, sprite_name = 'sprite') {
    if (goexists(go_hash))
        go.set(msg.url(undefined, go_hash, sprite_name), 'tint', color);
}

export function get_sprite_color(go_hash: hash, sprite_name = 'sprite') {
    return go.get(msg.url(undefined, go_hash, sprite_name), 'tint') as vmath.vector4;
}

export function set_sprite_anim(go_hash: hash, animation_name: string, sprite_name = 'sprite') {
    if (goexists(go_hash))
        sprite.play_flipbook(msg.url(undefined, go_hash, sprite_name), animation_name);
}

export function anim_sprite_color(go_hash: hash, to_color: vmath.vector4, duration: number, playback: any, sprite_name = 'sprite') {

    if (goexists(go_hash))
        go.animate(msg.url(undefined, go_hash, sprite_name), 'tint', playback, to_color, go.EASING_INOUTEXPO, duration);
}

export function get_sprite_size(id_go: hash, sprite_name = 'sprite'): vmath.vector4 {
    return go.get(msg.url(undefined, id_go, sprite_name), 'size') as vmath.vector4;
}

// Считается что середина спрайта в 0, 0 го
// вернет true если точка инпута над объектом
// offset_sprite задается вручную, если координаты спрайта отличны от нулевых
export function is_sprite_hovered(go_id: hash, go_size: v2, input_pos: v2, offset_sprite?: v2): boolean {

    const go_pos = go.get_world_position(go_id);
    const cur_scale = go.get_world_scale(go_id);
    const hw = go_size.x * cur_scale.x * 0.5;
    const hh = go_size.y * cur_scale.y * 0.5;

    const offset_y = offset_sprite != undefined ? (offset_sprite.y * cur_scale.y) : 0;
    const offset_x = offset_sprite != undefined ? (offset_sprite.x * cur_scale.x) : 0;
    const min_y = go_pos.y + offset_y - hh;
    const max_y = go_pos.y + offset_y + hh;
    const min_x = go_pos.x + offset_x - hw;
    const max_x = go_pos.x + offset_x + hw;

    return input_pos.x > min_x && input_pos.x < max_x &&
        input_pos.y > min_y && input_pos.y < max_y;
}

