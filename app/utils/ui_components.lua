local ____exports = {}
function ____exports.UIComponents(_druid)
    local swithers = {}
    local function set_ui_switcher_val(node_name, state)
        local node = gui.get_node(node_name .. "/root")
        gui.play_flipbook(node, state)
    end
    local function make_swither(node_name, setting_name, handler)
        local is_active = false
        local function active(_is_active)
            is_active = _is_active
            set_ui_switcher_val(
                node_name,
                tostring(is_active)
            )
        end
        local new_switcher = {
            is_active = is_active,
            active = active,
            instance = _druid:new_button(
                node_name .. "/root",
                function()
                    active(not is_active)
                    if handler then
                        handler(tostring(is_active))
                    end
                    set_ui_switcher_val(
                        node_name,
                        tostring(is_active)
                    )
                end
            )
        }
        set_ui_switcher_val(
            node_name,
            tostring(is_active)
        )
        swithers[#swithers + 1] = new_switcher
        return new_switcher
    end
    return {make_swither = make_swither}
end
function ____exports.clone_tree(name_node)
    return gui.clone_tree(gui.get_node(name_node))
end
return ____exports
