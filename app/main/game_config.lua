local ____lualib = require("lualib_bundle")
local __TS__StringIncludes = ____lualib.__TS__StringIncludes
local ____exports = {}
____exports.IS_DEBUG_MODE = false
____exports.IS_HUAWEI = sys.get_sys_info().system_name == "Android" and __TS__StringIncludes(
    sys.get_config_string("android.package"),
    "huawei"
)
local ____IS_HUAWEI_0
if ____exports.IS_HUAWEI then
    ____IS_HUAWEI_0 = {"R-M-3267787-1"}
else
    ____IS_HUAWEI_0 = {"R-M-3210895-1"}
end
local ____IS_HUAWEI_1
if ____exports.IS_HUAWEI then
    ____IS_HUAWEI_1 = {"R-M-3267787-2"}
else
    ____IS_HUAWEI_1 = {"R-M-3210895-2"}
end
____exports.ADS_CONFIG = {
    is_mediation = false,
    id_banners = ____IS_HUAWEI_0,
    id_inters = ____IS_HUAWEI_1,
    id_reward = {},
    banner_on_init = false,
    ads_interval = 3 * 60,
    ads_delay = 30
}
____exports.VK_SHARE_URL = "https://vk.com/app51762027"
____exports.OK_SHARE_TEXT = "https://vk.com/app51762027"
____exports.ID_YANDEX_METRICA = "d03c6af4-47ec-4854-b5bc-2a991ae44616"
____exports.RATE_FIRST_SHOW = 24 * 60 * 60
____exports.RATE_SECOND_SHOW = 3 * 24 * 60 * 60
____exports._GAME_CONFIG = {mode = "classic", isLoadGame = false}
____exports._STORAGE_CONFIG = {bg_color = "#e9faff", bg = 0, sound = false}
return ____exports
