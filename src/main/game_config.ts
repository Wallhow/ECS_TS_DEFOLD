/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export const IS_DEBUG_MODE = false;

export const IS_HUAWEI = sys.get_sys_info().system_name == 'Android' && sys.get_config_string("android.package").includes('huawei');

// параметры инициализации для ADS
export const ADS_CONFIG = {
    is_mediation: false,
    id_banners: IS_HUAWEI ? ['R-M-3267787-1'] : ['R-M-3210895-1'],
    id_inters: IS_HUAWEI ? ['R-M-3267787-2'] : ['R-M-3210895-2'],
    id_reward: [],
    banner_on_init: false,
    ads_interval: 3 * 60,
    ads_delay: 30,
};

// для вк
export const VK_SHARE_URL = 'https://vk.com/app51762027';
export const OK_SHARE_TEXT = 'https://vk.com/app51762027';
// для андроида метрика
export const ID_YANDEX_METRICA = "d03c6af4-47ec-4854-b5bc-2a991ae44616";
// через сколько показать первое окно оценки
export const RATE_FIRST_SHOW = 24 * 60 * 60;
// через сколько второй раз показать 
export const RATE_SECOND_SHOW = 3 * 24 * 60 * 60;

// игровой конфиг (сюда не пишем/не читаем если предполагается сохранение после выхода из игры)
// все обращения через глобальную переменную GAME_CONFIG
export const _GAME_CONFIG = {
    mode: 'classic',
    isLoadGame: false,
};

// конфиг с хранилищем  (отсюда не читаем/не пишем, все запрашивается/меняется через GameStorage)
export const _STORAGE_CONFIG = {
    bg_color: '#e9faff',
    bg: 0,
    sound: false,
};



// пользовательские сообщения под конкретный проект, доступны типы через глобальную тип-переменную UserMessages
export type _UserMessages = {
    //
};