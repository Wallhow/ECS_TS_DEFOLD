/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { ANIMATION_EASINGS, ANIMATION_PLAYBACKS } from "../../../defoldTweens/CommonTypes";
import { ADJUST_CONSTANTS, ANCHOR_CONSTANTS, PIVOT_CONSTANTS, PROP_CONSTANTS } from "./Types";

type ExcludedField = ADJUST_CONSTANTS |
    ANCHOR_CONSTANTS | PIVOT_CONSTANTS | PROP_CONSTANTS |
    'BLEND_ADD' | 'BLEND_ADD_ALPHA' | 'BLEND_ALPHA' | 'BLEND_MULT' | 'CLIPPING_MODE_NONE' | 'CLIPPING_MODE_STENCIL' |
    'SIZE_MODE_MANUAL' | 'SIZE_MODE_AUTO' | 'RESULT_TEXTURE_ALREADY_EXISTS' |
    'KEYBOARD_TYPE_PASSWORD' | 'KEYBOARD_TYPE_NUMBER_PAD' | 'KEYBOARD_TYPE_EMAIL' | 'KEYBOARD_TYPE_DEFAULT' |
    'PIEBOUNDS_ELLIPSE' | 'PIEBOUNDS_RECTANGLE' |
    'RESULT_OUT_OF_RESOURCES' | 'RESULT_DATA_ERROR' | 'fonts' | 'material' | 'materials' | 'textures';
type ExcludeMethods = 'new_box_node' | 'new_particlefx_node' | 'new_pie_node' | 'new_text_node' | 'new_texture' |
    'reset_keyboard' | 'reset_nodes' | 'hide_keyboard' | 'get_width' | 'get_height' | 'get_node' | 'get_layout'
    | 'get_font_resource' | 'delete_texture' | 'show_keyboard';
type Shift<T extends any[]> = ((...args: T) => any) extends ((_: any, ...rest: infer R) => any) ? R : never;

type MethodsList = Exclude<keyof typeof gui, 'animate' | PIVOT_CONSTANTS | ExcludedField | ANIMATION_EASINGS | ANIMATION_PLAYBACKS | ExcludeMethods>;
type params<method extends MethodsList> = Shift<Parameters<typeof gui[method]>>;
export type Node = { [method in MethodsList]: (...p: Exclude<params<method>, 'node'>) => ReturnType<typeof gui[method]> } & { self: node };

export function Node(node: string | node, constructor?: (self: Node, node: node) => void) {
    const _node = typeof node == 'string' ? gui.get_node(node) : node;
    const methods: AnyTable = {};

    for (const method of Object.keys(gui)) {
        if (typeof gui[method as keyof typeof gui] === 'function') {
            methods[method] = (...args: any[]) => {
                const func = gui[method as keyof typeof gui];
                return func(_node, ...args);
            };
        }
    }

    if (constructor != undefined)
        constructor(methods as Node, node);

    return {
        ...methods as Node, self: _node
    };
}