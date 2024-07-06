import { new_uigo_button } from "../components/button";
import { v2 } from "../ui_go_util_types";

export interface go_ui {
    url: url;
}

 /**@noSelf */
 export interface go_ui_lable extends go_ui {
    set_visible(visible: boolean): void;
    set_text(text: string): void;
    get_text() : string;
    set_scale(scale: number): void;
}


export type uigo_button = ReturnType<typeof new_uigo_button>;

export type uigo_sprite = go_ui & { width() : number, height(): number, position: v2 };