/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
/// <library version="0.10.1" src="https://github.com/Insality/druid/archive/master.zip" />
/** @noResolution */

declare module 'druid.druid' {
    let exports: DruidConstructor;
    export = exports;
}

/** @noResolution */
declare module 'druid.styles.default.style' {
    let exports: DruidStyles;
    export = exports;
}

/**@noResolution */
declare module 'druid.extended.timer' {

}


type Context = unknown;
type Callback = (self: Context) => void;
type BtnCallback = (self: Context, params?: any, btn?: any) => void;
type CreateItemFunction = (this: any, data: any, index: number, data_list: any) => [DruidNode, DruidNode?];

interface DruidClass {
    final(): void;
    on_message(message_id: string | hash, message: unknown, sender: string | hash | url): void;
    on_input: (action_id: string | hash, action: unknown) => void;
    update(dt: number): void;
    remove(component: DruidNode): void;

    new_blocker: (node: string) => DruidBlocker;
    new_button: (node: string | node, cb: BtnCallback) => DruidButton;
    new_scroll(scroll: string | node, container: string | node): DruidScroll;
    new_static_grid(parent: string | node, element: string | node, in_row: number): DruidGridVertical;
    new_dynamic_grid(parent: string): DruidDynamicGrid;
    new_data_list(scroll: DruidScroll, grid: DruidGrid, fncCreate: CreateItemFunction): DruidGridVertical;
    new_drag(node: string, on_drag_callback: (self: AnyTable, dx: number, dy: number, total_x: number, total_y: number) => void): DruidDragNode
    new_input(node: string, text_node_name: string, keyboard_type?: number): DruidInput;
    new_timer(node: node, seconds_from: number, seconds_to?: number, callback?: () => void): DruidTimer;
    new_hover(node: string | node, on_hover_callback: (context: any, is_hover: boolean, druidNode: DruidHover) => void): DruidHover;
    set_blacklist: (component: DruidNode[]) => void;
    set_whitelist: (component: DruidNode[]) => void;


}

/** @noSelf **/
interface DruidConstructor {
    new: (self: Context) => DruidClass;
    set_sound_function: (self: Context) => void;
    set_default_style: (style: any) => void;
    register(name: string, module: any): void;
}

/** @noSelf **/
interface DruidComponent {
    node: node;
}

interface DruidBlocker extends DruidComponent {
    set_enabled: (state: boolean) => void;
}

interface DruidButton extends DruidComponent {
    set_click_zone: (zone: node) => void;
    set_enabled: (state: boolean) => void;
    start_scale: vmath.vector3;
    on_hold_callback: DruidEvent;
    on_click: DruidEvent;
    on_long_click: { subscribe(callback: (params: AnyTable, button: DruidButton, hold_time: number) => void, context: AnyTable): void; };
    on_click_outside: DruidEvent;
    on_pressed: DruidEvent;
    hover: DruidHover;
}

interface DruidHover extends DruidComponent {
    is_enabled(): boolean; //	Return current hover enabled state
    is_hovered(): boolean;	//Return current hover state.
    is_mouse_hovered(): boolean;	//Return current hover state.
    set_click_zone(zone: node): void;	//Strict hover click area.
    set_enabled(state: boolean): void;	//Set enable state of hover component.
    set_hover(state: boolean): void;	//Set hover state
    set_mouse_hover(state: boolean): void;	//Set mouse hover state

    on_hover: DruidEvent;	//On hover callback(self, state, hover_instance)
    on_mouse_hover: DruidEvent;	//On mouse hover callback(self, state, hover_instance)
}

interface DruidEvent {
    subscribe(callback: (...arg: any[]) => void, context?: any): void;//	Subscribe callback on event
    trigger(...arg: any[]): void;	//Trigger the event and call all subscribed callbacks
    unsubscribe(callback: (...arg: any[]) => void, context?: any): void;//	Unsubscribe callback on event
}

interface DruidNode {

}

interface DruidDragNode extends DruidNode {
    set_enabled(enabled: boolean): void;
    on_drag_end: DruidEvent;
    on_drag_start: DruidEvent;
}

interface DruidScroll extends DruidNode {
    bind_grid(grid: DruidGridVertical): void;
    set_horizontal_scroll(active: boolean): void;
    set_size(size: vmath.vector3, offset: vmath.vector3): void;
    set_extra_stretch_size(size: number): void;
    scroll_to_percent(percent: vmath.vector3, is_instant?: boolean): void;
    scroll_to_index(index: number, skip_cb?: Callback): void;
    get_percent(): vmath.vector3;//	Return current scroll progress status.
    get_scroll_size(): vmath.vector3;
    on_scroll: DruidEvent;
    content_node: node;
    available_size: vmath.vector3;
    target_position: vmath.vector3;
    position: vmath.vector3;
}

interface DruidGrid extends DruidNode {
    set_data: (data: any) => void;
    clear(): void;
    on_clear: DruidEvent;
}

interface DruidDynamicGrid extends DruidGrid {
    add(node: node, index: number,): void;
    get_index_by_node(node: node): number
    set_position_function(callback: (node: AnyTable, position: vmath.vector3) => void): DruidGrid;
    remove(index: number): void;
    border: vmath.vector4;
}


interface DruidGridVertical extends DruidGrid, DruidComponent {
    add: (node: node, index?: number) => void;
    remove(index: number, shift_policy?: number, is_instant?: boolean): void;
    get_index_by_node(node: node): number;
    set_position_function(callback: (node: AnyTable, position: vmath.vector3) => void): DruidGrid;
    get_size(): vmath.vector3;
}

interface DruidTimer extends DruidComponent {
    set_interval: (from: number, to: number) => void;
    set_state(is_on: boolean): void;
    set_to(to: number): void;
    on_tick: DruidEvent;
    value: number;
    from: number;
    target: number;
}



interface DruidInput extends DruidNode {

}

interface DruidStyles {
    scroll: {
        WHEEL_SCROLL_SPEED: number;
    },
    button: {
        LONGTAP_TIME: number;
    }
}