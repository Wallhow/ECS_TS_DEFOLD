/* eslint-disable @typescript-eslint/no-explicit-any */


/** @noResolution */
declare namespace GManager {
    export const info: {
        isHTML5: boolean;
        ads_interval: number;
        ads_delay: number;
        isCampaign: boolean;
        isCrazy: boolean;
    };
    export function init(id_metrica?: string, id_banners?: string[], id_inters?: string[], banner_on_init?: boolean, ads_interval?: number, ads_delay?: number): void;
    export function loadScene(name: string): void;
    export function isSound(): boolean;
    export function setSound(active: boolean): void;
    export function playSnd(name: string, speed?: number, volume?:number): void;
    export function getSettingsVal<T>(id: string, def?: string): T;
    export function setSettingsVal(key: string, val: string): void;
    export function loadSettings(config: IConfig, cb_default: ICbDefault): void;
    export function showAds(is_check?: boolean): void;
    export function showReward(): void;
    export function doShare(): void;
    export function reportEvent(event: string, data?: string): void;
    export function apply_buttons_color() : void;
    export function getBGColor(key: number): string;
    export function get_btn_color(key: number): string;
    export function get_default_val(key: string) : any;
    export function get_random_name(): string;

}

/** @noResolution */
declare namespace PlayerPrefs {
    export function get(key: string): any;
    export function set(key: string, val: any): void;
    export function getInt(key: string, def?: number): number;
    export function getBool(key: string, def?: boolean): boolean;
    export function getString(key: string, def?: string): string;
    export function setData(key: string, tab: any): void;
    export function getData(key: string): any;
}

interface IConfig {
    [k: string]: any;
}
type ICbDefault = (key: string) => string;