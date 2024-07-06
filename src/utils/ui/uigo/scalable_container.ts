import { go_ui } from "./interfaces/go_ui";

/**@noSelf **/
export interface go_ui_scalable_container<T extends go_ui_sprite> extends go_ui {
    resize(width: number, height: number): unknown;
    add_child(go_ui: T, position: vmath.vector3, fast_anim?: boolean): void;
    set_align_content(x: number, y: number): void;
    set_position_function(func: (position: vmath.vector3, go_ui: T, all: T[], new_position: vmath.vector3) => void): void;
    set_scale_function(func: (scale: number, go_ui: go_ui) => void): void;
    set_start_scale(scale: number): void;
    children: T[];
    scale: number;
    update(): void;
    clear(): void;
    center(): void;
}

/**@noSelf **/
export interface go_ui_sprite extends go_ui {
    width(): number;
    height(): number;
}

export function newUIScalableContainer<T extends go_ui_sprite & { position: { x: number, y: number } }>(container_go_id: hash, _display_size: vmath.vector3): go_ui_scalable_container<T> {
    const display_size = { x: _display_size.x, y: _display_size.y };
    const bounds = { min_x: -display_size.x / 2, min_y: -display_size.y / 2, max_x: display_size.x / 2, max_y: display_size.y / 2 };
    const children: T[] = [];
    const align = { x: 0, y: 0 };

    const start_position = go.get_position(container_go_id);
    let start_scale = 1;
    let _scale = 1;
    let is_pos_anim = false;
    let is_scale_anim = false;
    let dirty = false;

    function is_position_exceeds(child: T, new_pos = child.position): boolean {
        const hw = child.width() * _scale / 2;
        const hh = child.height() * _scale / 2;
        const x1 = new_pos.x - hw;
        const x2 = new_pos.x + hw;
        const y1 = new_pos.y - hh;
        const y2 = new_pos.y + hh;

        return x1 < bounds.min_x || y1 < bounds.min_y || x2 > bounds.max_x || y2 > bounds.max_y;
    }

    function getCenterPointOfChildren(): { x: number, y: number, length_x: number, length_y: number, delta : {x: number, y: number} } {
        let maxX = bounds.max_x;
        let maxY = bounds.max_y;
        let minX = bounds.min_x;
        let minY = bounds.min_y;

        let minY_for_len = 0;
        let maxY_for_len = 0;
        let minX_for_len = 0;
        let maxX_for_len = 0;

        children.forEach(child_go => {
            const minx = get_x(child_go, -1);
            const miny = get_y(child_go, -1);
            const maxx = get_x(child_go, 1);
            const maxy = get_y(child_go, 1);

            if (minx < minX) minX = minx;
            if (miny < minY) minY = miny;
            if (maxx > maxX) maxX = maxx;
            if (maxy > maxY) maxY = maxy;

            if (get_local_y(child_go, 1) > maxY_for_len) maxY_for_len = get_local_y(child_go, 1);
            if (get_local_y(child_go, -1) < minY_for_len) minY_for_len = get_local_y(child_go, -1);
            if (get_local_x(child_go, 1) > maxX_for_len) maxX_for_len = get_local_x(child_go, 1);
            if (get_local_x(child_go, -1) < minX_for_len) minX_for_len = get_local_x(child_go, -1);
        });

        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;

        const delta = { x: minX_for_len + maxX_for_len, y: minY_for_len + maxY_for_len };

        return { x: centerX, y: centerY, length_x: (math.abs(minX_for_len) + maxX_for_len), length_y: math.abs(minY_for_len) + maxY_for_len, delta: delta };
    }

    function get_local_x(child_go: T, uv_pos: number): number { return child_go.position.x + (child_go.width() / 2) * uv_pos; }
    function get_local_y(child_go: T, uv_pos: number): number { return child_go.position.y + (child_go.height() / 2) * uv_pos; }
    function get_x(child_go: T, uv_pos: number): number { return go.get_position(container_go_id).x + get_local_x(child_go, uv_pos) * _scale; }
    function get_y(child_go: T, uv_pos: number): number { return go.get_position(container_go_id).y + get_local_y(child_go, uv_pos) * _scale; }

    function add_child(go_ui: T, new_position: vmath.vector3, fast_anim = false): void {
        if (dirty) {
            dirty = false;
            go.cancel_animations(container_go_id, 'position');
            go.cancel_animations(container_go_id, 'scale');
            go.set_position(start_position, container_go_id);
            go.set_scale(start_scale, container_go_id);

        }

        go_ui.position = { x: new_position.x, y: new_position.y };

        if (!fast_anim) {
            go.animate(go_ui.url, 'scale', go.PLAYBACK_ONCE_FORWARD, vmath.vector3(_scale, _scale, 1), go.EASING_OUTSINE, 0.1, 0, () => {
                go.set_parent(go_ui.url, container_go_id, true);
                if (position_function != undefined) {
                    position_function(position(go_ui), go_ui, children, new_position);
                }
                else {
                    go.set_position(new_position, go_ui.url);

                }

            });
            children.push(go_ui);

            timer.delay(0.01, false, () => {
                children.forEach(val => check_scale(val.url));
            });
        } else {
            children.push(go_ui);
            go.set_parent(go_ui.url, container_go_id, false);
            timer.delay(0.01, false, () => {
                if (position_function != undefined)
                    position_function(position(go_ui), go_ui, children, new_position);
                else
                    go.set_position(new_position, go_ui.url);
                check(go_ui);
            });
        }
    }


    function update() {
        if (children.length > 0)
            children.forEach((go_ui) => {
                check(go_ui);
                check_scale(go_ui.url);
            });
    }

    function check(go_ui: T) {
        if (is_position_exceeds(go_ui)) {
            const center = getCenterPointOfChildren();
            const scaleX = (display_size.x / (center.length_x)) <= start_scale ? (display_size.x / (center.length_x)) : start_scale;
            const scaleY = (display_size.y / (center.length_y)) <= start_scale ? (display_size.y / (center.length_y)) : start_scale;
            const scale = Math.min(scaleX, scaleY);
            _scale = scale;

            const offsetX = (center.x * -1);
            const offsetY = (center.y * -1);

            const container_position = go.get_position(container_go_id);
            container_position.x += offsetX;
            container_position.y += offsetY;


            if (!is_pos_anim) {
                is_pos_anim = true;
                go.animate(container_go_id, 'position', go.PLAYBACK_ONCE_FORWARD, container_position, go.EASING_OUTSINE, 0.1, 0, () => is_pos_anim = false);
            }

            if (!is_scale_anim) {
                is_scale_anim = true;
                go.animate(container_go_id, 'scale', go.PLAYBACK_ONCE_FORWARD, vmath.vector3(_scale, _scale, 1), go.EASING_OUTSINE, 0.5, 0, () => is_scale_anim = false);
            }

        }
    }

    function position(go_ui: go_ui): vmath.vector3 { return go.get_world_position(go_ui.url); }

    let scale_function: (scale: number, go_ui: go_ui) => void | undefined;
    let position_function: (position: vmath.vector3, go_ui: T, all: T[], new_position: vmath.vector3) => void | undefined;

    const set_scale_function = (func: (scale: number, go_ui: go_ui) => void) => scale_function = func;
    const set_position_function = (func: (position: vmath.vector3, go_ui: T, all: T[], new_position: vmath.vector3) => void) => position_function = func;
    const set_start_scale = (scale: number) => { start_scale = scale; go.set_scale(vmath.vector3(scale, scale, 1), container_go_id); };
    const set_align_content = (x: number, y: number) => {
        align.x = x;
        align.y = y;
    };

    function clear() {
        children.forEach(v => {
            go.delete(v.url);
        });
        children.splice(0, children.length);
        _scale = start_scale;
        is_pos_anim = false;
        is_scale_anim = false;
        dirty = true;

    }

    function check_scale(url: url): void {
        if (go.get_scale(url).x != 1) {
            go.set_scale(1, url);
        }
    }

    function resize(width: number, height: number) {
        display_size.x = width;
        display_size.y = height;
        bounds.min_x = -display_size.x / 2;
        bounds.min_y = -display_size.y / 2;
        bounds.max_x = display_size.x / 2;
        bounds.max_y = display_size.y / 2;


        const _center = getCenterPointOfChildren();
        const scaleX = (display_size.x / (_center.length_x)) <= start_scale ? (display_size.x / (_center.length_x)) : start_scale;
        const scaleY = (display_size.y / (_center.length_y)) <= start_scale ? (display_size.y / (_center.length_y)) : start_scale;
        const scale = Math.min(scaleX, scaleY);
        _scale = scale;
        go.animate(container_go_id, 'scale', go.PLAYBACK_ONCE_FORWARD, vmath.vector3(_scale, _scale, 1), go.EASING_OUTSINE, 0.5, 0, () => is_scale_anim = false);

        center();
    }

    function center() {
        const center = getCenterPointOfChildren();

        const deltaX = (center.delta.x*_scale) / 2;

        const container_position = go.get_position(container_go_id);
        container_position.x = -deltaX;

        go.animate(container_go_id, 'position', go.PLAYBACK_ONCE_FORWARD, container_position, go.EASING_OUTSINE, 0.2, 0, () => is_pos_anim = false);

    }

    return {
        url: container_go_id, set_scale_function, set_position_function, add_child,
        scale: _scale, clear, set_align_content, children, update, center, set_start_scale, resize
    };
}


