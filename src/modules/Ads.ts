/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ADS_CONFIG, OK_SHARE_TEXT, VK_SHARE_URL } from "../main/game_config";
import * as bridge from 'instant_games_bridge.bridge';
/*
    Модуль для работы с рекламой
*/

declare global {
    const Ads: ReturnType<typeof AdsModule>;
}

export function register_ads() {
    (_G as any).Ads = AdsModule();
}

export enum BannerPos {
    POS_NONE,
    POS_TOP_LEFT,
    POS_TOP_CENTER,
    POS_TOP_RIGHT,
    POS_BOTTOM_LEFT,
    POS_BOTTOM_CENTER,
    POS_BOTTOM_RIGHT,
    POS_CENTER
}


type WebPlatform = "yandex" | "vk" | 'ok' | '';
type CallbackAds = (state: boolean) => void;

function AdsModule() {

    function showRewarded(callback: (state: boolean) => void) {
        if (html5 != undefined) {
            let isCallbackCalled = false;
            timer.delay(0, true, (_, h: hash, t) => {
                const state = bridge.advertisement.rewardedState();
                if (state === 'opened' && Sound.is_active()) {
                    Sound.set_active(false);
                    pprint('OPENED REWARD');
                }
                if (state === 'rewarded') {
                    if (!isCallbackCalled) {
                        isCallbackCalled = true;
                        callback(true);
                    }
                }
                if (state === 'closed') {
                    pprint('CLOSED REWARD');
                    Sound.set_active(true);
                    timer.cancel(h);
                }
            });
            bridge.advertisement.showRewarded();
        } else {
            pprint('Fake show rewarded');
            timer.delay(0.5, false, () => {
                callback(true);
            });

        }


    }

    return {
        bridge: bridge,
        get_platform_id: bridge.platform.id,
        is_ready: () => true,
        hide_banner: bridge.advertisement.hideBanner,
        show_banner: (pos: any) => bridge.advertisement.showBanner(pos as BannerOptions),
        show_reward: showRewarded,
        register_ads_callbacks: () => { },
        _on_message: (_this: any, message_id: hash, message: any, sender: hash) => { }
    };
}