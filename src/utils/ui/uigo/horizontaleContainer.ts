/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { IObservable, ObservableVal } from "../../../utils/observer";


import * as camera from '../../../utils/camera';


import { v2 } from "./ui_go_util_types";
import { clamp, in_next_frame } from "../../../utils/utils";
import { go_ui_sprite } from "./scalable_container";
import { uigo_button } from "./interfaces/go_ui";
import { UIGO_ACTION_ID_RELEASED } from "./ui_go_utils";



function newHorizontaleContainer<T extends [go_ui_sprite, uigo_button]>(this_go: hash, size: v2, start_scale = 1) {
    const PLAYBACK = go.PLAYBACK_ONCE_FORWARD;
    const EASING = go.EASING_OUTSINE;
    const DURATION_ANIM = 0.2;
    const array: T[] = [];
    const padding = 5;
    const TIME_LONG_PRESS = 0.3;
    const selected_obj = ObservableVal<T | undefined>(undefined);

    let _scale = 1;
    let width_child: number;

    go.set_scale(vmath.vector3(start_scale, start_scale, 1), this_go);

    selected_obj.subscribe((val) => {
        if (val != undefined) {
            //go.set_parent(val[1].id, undefined, true);
        }
    });


    const add_child = (child: T) => {
        if (width_child == undefined)
            width_child = child[0].width();

        go.set_parent(child[0].url, this_go);
        if (!array.includes(child)) {
            recalculate(child);
            array.push(child);
        }
    };

    const remove = (index: number) => {
        if (array[index] != undefined) {

            go.delete(array[index][0].url);
            array.splice(index, 1);
        }
        recalculate();
    };

    const clear = () => {
        array.forEach(v => go.delete(v[0].url));
        array.splice(0, array.length);
    };


    const get_index = (url: hash): number => array.findIndex(p => p[0].url == url);
    const delta = vmath.vector3(math.huge, math.huge, 0);

    const input_update = (x: number, y: number, action: AnyTable, action_id?: string | hash) => {
        array.forEach(obj_ => {
            if (obj_ != undefined) {
                const obj = obj_[1];

                const is_press = obj.is_pressed(x, y, action_id);
                if (is_press) {
                    selected_obj.set(undefined);
                    selected_obj.set(obj_);
                }

            }
        });

        in_next_frame(() => {
            if (selected_obj.get() != undefined) {
                const domino = selected_obj.get() as T;

                check_long_press(domino);

                const click_pos = camera.screen_to_world((action.x), (action.y));
                const pos = go.get_position(domino[1].url);

                if (delta.x == math.huge || delta.y == math.huge) {
                    delta.x = click_pos.x - pos.x;
                    delta.y = click_pos.y - pos.y;
                }

                click_pos.x -= delta.x;
                click_pos.y -= delta.y;

                click_pos.z = 6;
                go.set_position(click_pos, domino[1].url);

                if (action.dx != 0 || action.dy != 0) {
                    if (domino[1].on_drag_callback != undefined)
                        domino[1].on_drag_callback(domino[1].url, action.dx, action.dy);
                }

            }
        });


        if (action_id != undefined && action_id == UIGO_ACTION_ID_RELEASED) {
            if (selected_obj.get() != undefined) {
                (selected_obj.get() as T)[1].hovered.set(false);
                (selected_obj.get() as T)[1].trigger_on();
                selected_obj.set(undefined);
                delta.x = math.huge;
                delta.y = math.huge;
            }
        }
    };

    function check_long_press(domino: T) {
        timer.delay(TIME_LONG_PRESS, false, () => {
            const btn = domino;
            if (btn == selected_obj.get() && !btn[1].is_long_press) {
                btn[1].is_long_press = true;
                if (btn[1].long_press_callback != undefined) {
                    btn[1].long_press_callback(btn[1].url);
                }
            }
        });
    }


    function recalculate(new_child?: T) {
        const width = width_child + padding;
        const area = (width) * array.length;
        const half_area = area / 2;

        array.forEach((obj, i) => {
            const pos = go.get_position(obj[0].url);
            pos.x = i * (width) - half_area + (new_child == undefined ? width / 2 : 0);
            pos.z = 0;

            go.animate(obj[0].url, 'position', PLAYBACK, pos, EASING, DURATION_ANIM);
        });

        if (new_child != undefined) {
            const new_child_pos = go.get_position(new_child[0].url);
            new_child_pos.z = 0;
            new_child_pos.x = array.length * (width) - half_area;
            go.animate(new_child[0].url, 'position', PLAYBACK, new_child_pos, EASING, DURATION_ANIM);
        }
       

        const scale = clamp(size.x / (area + 70), 0, 1.2);
        _scale = scale;
        go.animate(this_go, 'scale', PLAYBACK, vmath.vector3(scale, scale, 1), EASING, DURATION_ANIM);



    }

    return {
        add_child, remove, input_update, get_index, clear, recalculate, array, size
    };
}



