/**@noSelf **/
export interface IUIComponents {
    make_swither(node_name: string, setting_name: string, handler?: (state: string) => void): IUISwitcher;
}

/**@noSelf **/
export interface IUISwitcher {
    instance: DruidButton;
    active: (is_active: boolean) => void;
    is_active: boolean;
}

export function UIComponents(_druid: DruidClass): IUIComponents {
    const swithers: IUISwitcher[] = [];

    function set_ui_switcher_val(node_name: string, state: string) {
        const node = gui.get_node(node_name + '/root');
        gui.play_flipbook(node, state);
    }

    function make_swither(node_name: string, setting_name: string, handler?: (state: string) => void): IUISwitcher {
        let is_active = false;
        const active = (_is_active: boolean) => {
            is_active = _is_active;
            set_ui_switcher_val(node_name, tostring(is_active));
        };
        const new_switcher = {
            is_active,
            active,
            instance: _druid.new_button(node_name + '/root', () => {
                active(!is_active);
                if (handler)
                    handler(tostring(is_active));
                set_ui_switcher_val(node_name, tostring(is_active));
            }),

        };

        set_ui_switcher_val(node_name, tostring(is_active));

        swithers.push(new_switcher);
        return new_switcher;
    }

    return {
        make_swither
    };
}

export function clone_tree(name_node: string): AnyTable {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return gui.clone_tree(gui.get_node(name_node));
}