/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import * as druid from 'druid.druid';
import * as default_style from "druid.styles.default.style";

import { register_manager } from '../modules/Manager';
import { BannerPos } from '../modules/Ads';

export function init(this: any) {
    msg.post('.', 'acquire_input_focus');

    register_manager();
    Manager.init(() => {
        Sound.attach_druid_click('btn');
        default_style.scroll.WHEEL_SCROLL_SPEED = 10;
        druid.set_default_style(default_style);
        Scene.set_bg(GameStorage.get('bg_color'));

        Scene.load('game', true);
    }, true);


}

export function on_message(this: any, message_id: hash, _message: any, sender: hash): void {
    Manager.on_message(this, message_id, _message, sender);
    if (message_id == to_hash('LOAD_SCENE')) {
        const message = _message as SystemMessages['LOAD_SCENE'];

        window.set_dim_mode(message.name == 'game' ? window.DIMMING_OFF : window.DIMMING_ON);
        if (html5 != undefined) {
            if (message.name == 'game')
                Ads.show_banner(BannerPos.POS_TOP_CENTER);
            else
                Ads.hide_banner();
        }
    }
}
