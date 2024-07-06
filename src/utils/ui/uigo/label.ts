import { go_ui_lable } from "./interfaces/go_ui";

export function UILabel(url: url) : go_ui_lable {
       
    return {
        url,
        set_text : ( text: string ) => {
            label.set_text(url, text);
        },
        get_text : () : string => {
            return label.get_text(url);
        },
        set_visible : (visible) => {
            const to = go.get(url, 'color') as vmath.vector4;
            
            to.w = visible ? 1 : 0;
            go.set(url, 'color', to);
        }, 
        set_scale: (scale: number) => {
            go.set(url, 'scale', vmath.vector3(scale,scale,1));
        }
    };
}