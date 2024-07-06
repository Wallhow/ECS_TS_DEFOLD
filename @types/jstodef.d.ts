/**@noResolution */
declare namespace jstodef {
    type js_listener = { (self: any, message_id: string, message: any): void };
    function add_listener(js_listener: js_listener): void;
    function remove_listener(js_listener: js_listener): void;
}