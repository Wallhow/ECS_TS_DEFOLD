/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { IObservable, ObservableVal } from "../../../utils/observer";

import * as camera from '../../../utils/camera';
import { v2 } from "./ui_go_util_types";

import { go_ui_sprite } from "./scalable_container";
import { uigo_button } from "./interfaces/go_ui";
import { UIGO_ACTION_ID_RELEASED } from "./ui_go_utils";



export function newContainer<T extends go_ui_sprite>(this_go: hash, size: v2, start_scale = 1) {
    const array: T[] = [];
    const selected_obj = ObservableVal<T | undefined>(undefined);


    go.set_scale(vmath.vector3(start_scale, start_scale, 1), this_go);

    selected_obj.subscribe((val) => {
        if (val != undefined) {
            //go.set_parent(val[1].id, undefined, true);
        }
    });


    const add_child = (child: T) => {
        go.set_parent(child.url, this_go, true);
        if (!array.includes(child))
            array.push(child);

    };

    const remove = (index: number) => {
        if (array[index] != undefined) {

            go.delete(array[index].url);
            array.splice(index, 1);
        }
    };

    const clear = () => {
        array.forEach(v => go.delete(v.url));
        array.splice(0, array.length);
    };


    const get_index = (url: hash): number => array.findIndex(p => p.url == url);
    const delta = vmath.vector3(math.huge, math.huge, 0);

    const input_update = (x: number, y: number, action: AnyTable, action_id?: string | hash) => {
        array.forEach(obj_ => {
            if (obj_ != undefined) {
                if ((obj_ as AnyTable).is_pressed != undefined) {
                    const obj = (obj_ as AnyTable) as uigo_button;

                    const is_press = obj.is_pressed(x, y, action_id);
                    if (is_press) {
                        selected_obj.set(undefined);
                        selected_obj.set(obj_);
                    }
                }
            }
        });

        if (action_id != undefined && action_id == UIGO_ACTION_ID_RELEASED) {
            if (selected_obj.get() != undefined) {
                const obj = (selected_obj.get() as AnyTable);
                if ((selected_obj.get() as AnyTable).is_pressed != undefined) {
                    const obj_ = obj as uigo_button;
                    obj_.hovered.set(false);
                    obj_.trigger_on();
                    selected_obj.set(undefined);
                    delta.x = math.huge;
                    delta.y = math.huge;
                }
            }
        }
    };


    const input_listener = (message_id: hash, message: AnyTable) => {
        if (message_id == hash('input')) {
            const pos = camera.screen_to_world(message.x, message.y);
            input_update(pos.x, pos.y, message.action);
        }
        if (message_id == hash('input_down') || message_id == hash('input_up')) {
            const pos = camera.screen_to_world(message.x, message.y);
            input_update(pos.x, pos.y, message.action, message_id);
        }
    };

    return {
        add_child, remove, get_index, clear, input_listener, array, size
    };
}



