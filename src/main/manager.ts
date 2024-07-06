/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { _STORAGE_CONFIG } from './game_config';

export function getBGColor(key: number) {
    return ['#ffffff', '#333333', '#1a4d1a', '#334db3'][key];
}

export function get_btn_color(key: number) {
    return ['#fff', '#fff', '#669966', '#fff'][key];
}
