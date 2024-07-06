/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */

import { get_string, set } from "./user_data";

interface ILangData {
    [k: string]: string;
}

let curLang = 'en';
const langsData: { [k: string]: ILangData } = {};


export function init() {
    const saveLang = get_string('lang', '');
    if (saveLang != '')
        setLang(saveLang);
    else {
        setLang(getAppLang());
    }
}

export function getSystemLang() {
    const info = sys.get_sys_info();
    const code = info.language as string;
    if (['ru', 'be', 'kk', 'uk', 'uz'].includes(code))
        return 'ru';
    else
        return code;
}

export function getAppLang() {
    let lang = getSystemLang();
    if (!hasLang(lang)) {
        print('lang not found:', lang, 'apply en');
        lang = 'en';
    }
    return lang;
}

export function hasLang(code: string) {
    return langsData[code] !== undefined;
}

export function getCodeText(code: string) {
    const data = langsData[curLang];
    if (!data) {
        print('not lang getCodeText:', curLang);
        return '';
    }
    if (data[code] == undefined) {
        print('код не найден', code);
        return '';
    }
    return data[code];
}

export function addLangData(lang: string, data: ILangData) {
    langsData[lang] = data;
    //print('register lang:', lang);
}

export function setLang(lang: string, saveLang = false) {
    if (saveLang)
        set('lang', lang);
    curLang = lang;
    applyLang();
}


export function applyLang() {
    const data = langsData[curLang];
    if (!data)
        return;// print('not applyLang:', curLang);
    //print('ApplyLang:', curLang);
    const keys = Object.keys(langsData[curLang]);

    for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        const val = data[k];
        const [ok, node] = pcall(gui.get_node, k);
        if (ok)
            gui.set_text(node, val);
    }
}