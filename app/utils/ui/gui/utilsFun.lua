local ____exports = {}
--- Возвращает mapped type объект где ключ это заданное имя из списка имен нод, а значение нода с данным именем
-- 
-- @param templateName имя темплейта в гуи сцене без '/'
-- @param nodesName имена нод которые надо из него вытащить, массив который должен быть помечен как as const
-- @param template клонированный темплейта из которой надо вытянуть заданные ноды, если не указан то берет ноды с указанного темплейта в сцене
-- @returns
function ____exports.getNodesFromTemplate(templateName, nodesName, template)
    local nodesMap = {}
    for ____, name in ipairs(nodesName) do
        local ____name_1 = name
        local ____temp_0
        if template == nil then
            ____temp_0 = gui.get_node((templateName .. "/") .. name)
        else
            ____temp_0 = template[(templateName .. "/") .. name]
        end
        nodesMap[____name_1] = ____temp_0
    end
    return nodesMap
end
--- Возвращает mapped type объект где ключ это заданное имя из списка имен нод, а значение нода с данным именем
-- достает ноды из темплейтов или из сцены
-- 
-- @param templateName имя темплейта в гуи сцене без '/'
-- @param nodesName имена нод которые надо из него вытащить, массив который должен быть помечен как as const
-- @param template клонированный темплейта из которой надо вытянуть заданные ноды, если не указан то берет ноды с указанного темплейта в сцене
-- @returns
function ____exports.getNodes(nodesName, templateName, template)
    if templateName == nil then
        templateName = ""
    end
    local get_node
    function get_node(templateName, nodeName, template)
        local ____temp_2
        if templateName ~= "" then
            ____temp_2 = templateName .. "/"
        else
            ____temp_2 = ""
        end
        local templatePrefix = ____temp_2
        local nodePath = templatePrefix .. nodeName
        local ____temp_3
        if template == nil then
            ____temp_3 = gui.get_node(nodePath)
        else
            ____temp_3 = template[nodePath]
        end
        return ____temp_3
    end
    local nodesMap = {}
    local ____ = templateName or ""
    for ____, name in ipairs(nodesName) do
        nodesMap[name] = get_node(templateName, name, template)
    end
    return nodesMap
end
return ____exports
