/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ecs } from "../ecs/core/ECS";
import * as flow from 'ludobits.m.flow';
import { MainLoop } from "./core/MainLoop";

interface props {
    is_visible: boolean
}

export function init(this: props) {

    msg.post('.', 'acquire_input_focus');
    flow.start(() => MainLoop(), {});
}

export function update(this: props, dt: number) {
    ecs.update(dt);
}

export function on_message(this: props, message_id: hash, message: any, sender: any): void {

    flow.on_message(message_id, message, sender);
}

export function on_input(this: props, action_id: string | hash, action: any): void {
    if (action_id == ID_MESSAGES.MSG_TOUCH)
        msg.post('.', action_id, action);
    ecs.input(action_id, action);

}


export function final(this: props) {

    flow.stop();
}

