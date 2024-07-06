local ____lualib = require("lualib_bundle")
local __TS__ArrayFindIndex = ____lualib.__TS__ArrayFindIndex
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__ArrayFind = ____lualib.__TS__ArrayFind
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local ____exports = {}
function ____exports.GUIWrapper(druid)
    local block, block_category, get_all_nodes, components, black_list, befor_block_category
    function block(node_name, is_block_enabled)
        local node = __TS__ArrayFind(
            components,
            function(____, comp) return comp.node_name == node_name end
        )
        if node ~= nil then
            if is_block_enabled then
                if __TS__ArrayFind(
                    black_list,
                    function(____, n) return n.node_name == node_name end
                ) ~= nil then
                    return
                end
                black_list[#black_list + 1] = node
            else
                local i = __TS__ArrayFindIndex(
                    black_list,
                    function(____, v) return v.node_name == node_name end
                )
                if i ~= -1 then
                    __TS__ArraySplice(black_list, i, 1)
                else
                end
            end
            druid:set_blacklist(get_all_nodes(black_list))
        else
        end
    end
    function block_category(category, is_block_enabled)
        local nodes = __TS__ArrayFilter(
            components,
            function(____, comp) return comp.category == category end
        )
        if #nodes == 0 then
            pprint(("category " .. tostring(category)) .. " empty!")
            return
        elseif nodes ~= nil then
            if is_block_enabled then
                __TS__ArrayForEach(
                    nodes,
                    function(____, node)
                        if __TS__ArrayFind(
                            black_list,
                            function(____, n) return n.node_name == node.node_name end
                        ) == nil then
                            black_list[#black_list + 1] = node
                            if befor_block_category ~= nil then
                                befor_block_category(category, node.node_name, true)
                            end
                        end
                    end
                )
            else
                __TS__ArrayForEach(
                    nodes,
                    function(____, node)
                        local i = __TS__ArrayFindIndex(
                            black_list,
                            function(____, v) return v.node_name == node.node_name end
                        )
                        if i ~= -1 then
                            __TS__ArraySplice(black_list, i, 1)
                            if befor_block_category ~= nil then
                                befor_block_category(category, node.node_name, false)
                            end
                        else
                        end
                    end
                )
            end
            druid:set_blacklist(get_all_nodes(black_list))
        end
    end
    function get_all_nodes(components)
        return __TS__ArrayMap(
            components,
            function(____, value)
                return value.node
            end
        )
    end
    components = {}
    black_list = {}
    local function button(node_name, callback, category)
        if category == nil then
            category = 0
        end
        local c = {
            node_name = node_name,
            node = druid:new_button(node_name, callback),
            category = category
        }
        components[#components + 1] = c
        return c.node
    end
    local function remove_category(category)
        block_category(category, false)
        do
            local i = #components - 1
            while i > 0 do
                local c = components[i + 1]
                if c.category == category then
                    pprint("remove")
                    druid:remove(c.node)
                end
                i = i - 1
            end
        end
    end
    local function remove(druid_node)
        local comp = __TS__ArrayFindIndex(
            components,
            function(____, val) return val.node == druid_node end
        )
        if comp ~= -1 then
            block(components[comp + 1].node_name, false)
            druid:remove(components[comp + 1].node)
            __TS__ArraySplice(components, comp, 1)
        end
    end
    local function set_befor_block_category_func(befor_block_category_)
        befor_block_category = befor_block_category_
    end
    local function is_bloked(node_name)
        return __TS__ArrayFind(
            black_list,
            function(____, n) return n.node_name == node_name end
        ) ~= nil
    end
    return {
        is_bloked = is_bloked,
        button = button,
        block = block,
        block_category = block_category,
        set_befor_block_category_func = set_befor_block_category_func,
        remove_category = remove_category,
        remove = remove
    }
end
return ____exports
