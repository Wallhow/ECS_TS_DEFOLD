import UUID from "../../../UUID";
import { tween } from "../../../defoldTweens/Tween";

export type Blocker = ReturnType<typeof _createBlocker>;
export const newBlocker = _createBlocker;

export function _createBlocker(druid: DruidClass, parentNode: node, inputBlockOnStart: boolean, isVisible = false) {
    const [w, h] = window.get_size();

   /*  window.set_listener((_, event, data: { width: number, height: number }) => {
        if (event == window.WINDOW_EVENT_RESIZED) {
            gui.set_size(blockerNode, vmath.vector3(data.width, data.height, 1));
        }
    }); */

    const blockerNode = gui.new_box_node(vmath.vector3(0, 0, 0), vmath.vector3(w, h, 0));
    const blockerName = UUID.get('blocker');

    gui.set_adjust_mode(blockerNode, gui.ADJUST_STRETCH);
    gui.set_parent(blockerNode, parentNode, false);

    gui.set_visible(blockerNode, isVisible);
    gui.set_id(blockerNode, blockerName);

    let inputBlocker = druid.new_blocker(blockerName);
    inputBlocker.set_enabled(inputBlockOnStart);

    function refresh(onBlock = inputBlockOnStart) {
        druid.remove(inputBlocker);

        inputBlocker = druid.new_blocker(blockerName);
        inputBlocker.set_enabled(onBlock);
    }

    return { getBlocker: () => inputBlocker, refresh, node: blockerNode };
}


export function newBlockerShadowAnimations(blocker: Blocker, color = vmath.vector4(0, 0, 0, 0)) {
    function show(compliteFunc?: () => void) {
        gui.set_visible(blocker.node, true);
        tween(blocker.node, 'gui')
            .to(0, 'color', { color: color })
            .opacityTo(0.2, 0.45, { easing: 'EASING_OUTSINE' })
            .call(() => {
                if (compliteFunc != undefined)
                    compliteFunc();
            })
            .start();
    }

    function hide(compliteFunc?: () => void) {
        tween(blocker.node, 'gui').opacityTo(0.2, 0.0, { easing: 'EASING_OUTSINE' }).call(() => {
            if (compliteFunc != undefined)
                compliteFunc();
        }).start();
    }

    return {
        show, hide
    };
}