local ____lualib = require("lualib_bundle")
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local ____exports = {}
local curLang, langsData
local ____user_data = require("utils.user_data")
local get_string = ____user_data.get_string
local set = ____user_data.set
function ____exports.getSystemLang()
    local info = sys.get_sys_info()
    local code = info.language
    if __TS__ArrayIncludes({
        "ru",
        "be",
        "kk",
        "uk",
        "uz"
    }, code) then
        return "ru"
    else
        return code
    end
end
function ____exports.getAppLang()
    local lang = ____exports.getSystemLang()
    if not ____exports.hasLang(lang) then
        print("lang not found:", lang, "apply en")
        lang = "en"
    end
    return lang
end
function ____exports.hasLang(code)
    return langsData[code] ~= undefined
end
function ____exports.setLang(lang, saveLang)
    if saveLang == nil then
        saveLang = false
    end
    if saveLang then
        set("lang", lang)
    end
    curLang = lang
    ____exports.applyLang()
end
function ____exports.applyLang()
    local data = langsData[curLang]
    if not data then
        return
    end
    local keys = __TS__ObjectKeys(langsData[curLang])
    do
        local i = 0
        while i < #keys do
            local k = keys[i + 1]
            local val = data[k]
            local ok, node = pcall(gui.get_node, k)
            if ok then
                gui.set_text(node, val)
            end
            i = i + 1
        end
    end
end
curLang = "en"
langsData = {}
function ____exports.init()
    local saveLang = get_string("lang", "")
    if saveLang ~= "" then
        ____exports.setLang(saveLang)
    else
        ____exports.setLang(____exports.getAppLang())
    end
end
function ____exports.getCodeText(code)
    local data = langsData[curLang]
    if not data then
        print("not lang getCodeText:", curLang)
        return ""
    end
    if data[code] == undefined then
        print("код не найден", code)
        return ""
    end
    return data[code]
end
function ____exports.addLangData(lang, data)
    langsData[lang] = data
end
return ____exports
