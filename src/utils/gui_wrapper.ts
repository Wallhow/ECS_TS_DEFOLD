/**@noSelf **/
export interface IGUIWrapper {
    button(node_name: string, callback: () => void, category?: number): DruidNode;
    block(node_name: string, is_block_enabled: boolean): void;
    block_category(category: number, is_block_enabled: boolean): void;
    is_bloked(node_name: string): boolean;
    set_befor_block_category_func(befor_block_category_: (category: number, node: string, is_blocked: boolean) => void): void;
    remove_category(category: number): void;
    remove(druid_node: DruidNode): void;
}

export function GUIWrapper(druid: DruidClass): IGUIWrapper {
    type ComponentDruid = {
        node: DruidNode,
        node_name: string,
        category: number
    };

    const components: ComponentDruid[] = [];
    const black_list: ComponentDruid[] = [];
    let befor_block_category: (category: number, node: string, is_blocked: boolean) => void | undefined;

    function button(node_name: string, callback: () => void, category = 0): DruidNode {
        const c = {
            node_name: node_name,
            node: druid.new_button(node_name, callback),
            category: category
        };
        components.push(c);
        return c.node;
    }

    function remove_category(category: number) {
        block_category(category, false);
        for (let i = components.length - 1 ; i > 0; i--) {
            const c = components[i];
            if(c.category == category) {
                pprint('remove');
                druid.remove(c.node);
            }
        }
    }

    function remove(druid_node: DruidNode) {
        const comp = components.findIndex(val => val.node == druid_node);
        if(comp!=-1) {
            block(components[comp].node_name, false);
            druid.remove(components[comp].node);
            components.splice(comp, 1);
        }
    }

    function set_befor_block_category_func(befor_block_category_: (category: number, node: string, is_blocked: boolean) => void) {
        befor_block_category = befor_block_category_;
    }
    function block(node_name: string, is_block_enabled: boolean): void {
        const node = components.find(comp => comp.node_name == node_name);
        if (node != null) {
            if (is_block_enabled) {
                if (black_list.find(n => n.node_name == node_name) != null) return;
                black_list.push(node);
            } else {
                const i = black_list.findIndex(v => v.node_name == node_name);
                if (i != -1)
                    black_list.splice(i, 1);
                else {
                    //pprint("node " + node.node_name + " not found");
                }

            }
            druid.set_blacklist(get_all_nodes(black_list));
        } else {
            //pprint('node ' + node_name + " not found");
        }

    }

    function block_category(category: number, is_block_enabled: boolean): void {
        const nodes = components.filter(comp => comp.category == category);
        if (nodes.length == 0) {
            pprint("category " + category + " empty!");
            return;
        }
        else if (nodes != null) {
            if (is_block_enabled) {
                nodes.forEach(node => {
                    if (black_list.find(n => n.node_name == node.node_name) == null) {
                        black_list.push(node);
                        if (befor_block_category != null)
                            befor_block_category(category, node.node_name, true);
                    }
                });
            } else {
                nodes.forEach(node => {
                    const i = black_list.findIndex(v => v.node_name == node.node_name);
                    if (i != -1) {
                        black_list.splice(i, 1);
                        if (befor_block_category != null)
                            befor_block_category(category, node.node_name, false);
                    }
                    else {
                        //pprint("node " + tostring(node.node_name) + " with category " + node.category + " not found");
                    }
                });

            }
            //pprint("block node category " + category + " " + is_block_enabled);
            druid.set_blacklist(get_all_nodes(black_list));
        }
    }

    function is_bloked(node_name: string): boolean {
        return black_list.find(n => n.node_name == node_name) != null;
    }
    function get_all_nodes(components: ComponentDruid[]): DruidNode[] {
        return components.map<DruidNode>(value => {
            return value.node;
        });
    }

    return { is_bloked, button, block, block_category, set_befor_block_category_func,remove_category,remove };
}