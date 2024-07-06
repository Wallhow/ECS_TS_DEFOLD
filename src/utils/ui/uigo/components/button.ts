import { uigo_effects } from "../ui_go_effects";
import { get_sprite_size, is_sprite_hovered, UIGO_ACTION_ID_PRESSED, UIGO_ACTION_ID_RELEASED } from "../ui_go_utils";
import { ObservableVal } from "../../../../utils/observer";
import { v2 } from "../ui_go_util_types";

export function new_uigo_button(go_id: hash, button_click_callback: (url: hash) => void, custum_main_sprite_name = 'sprite', offset_sprite?: v2) {
    const effects = uigo_effects();
    const start_size = get_sprite_size(go_id, custum_main_sprite_name);
    const start_scale = go.get_scale(go_id);
    const hovered = ObservableVal<boolean>(false);
    const is_block = ObservableVal<boolean>(false);

    let hover_effect = true;
    let hover_callback: ((url: hash) => void) | undefined;
    let released_callback: ((url: hash) => void) | undefined;
    let pressed_callback: ((url: hash) => void) | undefined;
    let on_drag_callback: ((url: hash, dx: number, dy: number) => void) | undefined;
    let long_press_callback: ((url: hash) => void) | undefined;

    let _is_btn_pressed = false;
    let _hover_effect_active = false;
    // eslint-disable-next-line prefer-const
    let is_dragged = false;
    let is_long_press = false;

    hovered.subscribe((val) => {

        if (val && _hover_effect_active == false) {
            if (hover_callback != undefined)
                hover_callback(go_id);
            if (hover_effect) {
                _hover_effect_active = true;
                go.set(go_id, 'position.z', 8);
                effects.anim_scale({ url: go_id }, 1.05);
            }
        } else {
            is_long_press = false;
            if (_hover_effect_active) {
                _hover_effect_active = false;
                if (hover_effect) {
                    go.set(go_id, 'position.z', 1);
                    effects.anim_scale({ url: go_id }, start_scale.x);
                }
                _is_btn_pressed = false;
            }
        }

    });

    const is_hovered = (x: number, y: number): boolean => {
        if (!is_block.get()) {
            const result = is_sprite_hovered(go_id, { x: start_size.x, y: start_size.y }, { x, y }, offset_sprite);
            if (hovered.get() != result)
                hovered.set(result);
            return result;
        } else return false;
    };

    const is_pressed = (x: number, y: number, action_id?: string | hash): boolean => {
        if (is_hovered(x, y)) {
            if (action_id == UIGO_ACTION_ID_PRESSED) {
                _is_btn_pressed = true;
                if (pressed_callback != undefined)
                    pressed_callback(go_id);
                //effects.anim_scale({ url: go_id }, 0.95, 0.1, go.EASING_INSINE, () => {
                /* go.animate(go_id, 'scale', go.PLAYBACK_ONCE_FORWARD, vmath.vector3(1.12, 1.12, 1), go.EASING_OUTSINE, 0.2, 0, () => {
                    effects.anim_scale({ url: go_id }, start_scale.x);
                }); */
                //});

            } else if (action_id == UIGO_ACTION_ID_RELEASED) {
                if (released_callback != undefined)
                    released_callback(go_id);

                if (_is_btn_pressed)
                    button_click_callback(go_id);
                hovered.set(false);
                _is_btn_pressed = false;
            }
            return _is_btn_pressed;
        } else {
            return false;
        }
    };

    const trigger_on = () => { button_click_callback(go_id); };

    return {
        url: go_id,
        width: () => start_size.y,
        height: () => start_size.x,
        hovered_effect_enabled: (enabled: boolean) => hover_effect = enabled,
        is_hovered,
        is_pressed,
        pressed_callback,
        hover_callback,
        set_released_callback: (callback: (url: hash) => void) => { released_callback = callback; },
        long_press_callback,
        on_drag_callback,
        trigger_on,
        start_scale,
        is_block,
        is_long_press,
        is_dragged,
        hovered
    };
}