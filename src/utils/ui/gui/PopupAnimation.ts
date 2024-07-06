/* eslint-disable @typescript-eslint/no-empty-function */
import { TweensForNode } from "../../defoldTweens/TweenGUI";
import { tween } from "../../defoldTweens/Tween";
import { newEasyEvents } from "../../events/easyEvents";

export type PopupAnimation = ReturnType<typeof _createPopupAnimbation>;
export function newPopupAnimation(rootNode: node, autoDisableNodeAfterHide = true): PopupAnimation {
    return _createPopupAnimbation(rootNode, autoDisableNodeAfterHide);
}

type AnimationsType = ('show' | 'hide');
type AnimFuncSignature = (rootNode: node, compliteFunc?: () => void) => TweensForNode | undefined;

function _createPopupAnimbation(rootNode: node, autoDisableNodeAfterHide = true) {

    const e = newEasyEvents(['show', 'hide'] as const, { show() { }, hide() { } });
    const animations: { [key in AnimationsType]: AnimFuncSignature } = {
        show: (rootNode, compliteFunc?: () => void) => {
            tween(rootNode, 'gui').opacityTo(0, 0).opacityTo(0.2, 1, { easing: 'EASING_OUTSINE' }).start();
            tween(rootNode, 'gui')
                .to(0, 'scale', { scale: vmath.vector3(0.5, 0.5, 0.5) })
                .to(0.5, 'scale', { scale: vmath.vector3(1, 1, 1) }, { easing: 'EASING_OUTELASTIC', compliteFunc }).start();
            return undefined;
        },
        hide: (rootNode, compliteFunc?: () => void) => {
            tween(rootNode, 'gui').opacityTo(0.5, 0, { easing: 'EASING_OUTSINE', compliteFunc }).start();
            return tween(rootNode, 'gui')
                .to(0.5, 'scale', { scale: vmath.vector3(0.5, 0.5, 1) }, { easing: 'EASING_OUTSINE' });
        }
    };

    const disableFunc = autoDisableNodeAfterHide ? () => gui.set_enabled(rootNode, false) : undefined;
    const enableFunc = autoDisableNodeAfterHide ? () => gui.set_enabled(rootNode, true) : undefined;

    function show() {
        if (enableFunc != undefined) enableFunc();
        _action(animations['show'], () => e.emit('show'));
    }

    function hide() {
        function __disable() {
            if (disableFunc != undefined)
                disableFunc();
            e.emit('hide');
        }
        _action(animations['hide'], __disable);
    }

    /**
     * Если в animFunc возвращается TweensForNode то метод show или hide сами вызовут start добавив при этом в конце анимация эмит события соответствующей анимации 
     * в противном случае события будут вызваны сразу же
     * @param key 
     * @param animFunc 
     */
    function setAnimation(key: AnimationsType, animFunc: AnimFuncSignature) {
        animations[key] = animFunc;
    }

    function _action(anim: AnimFuncSignature, func: () => void): void {
        const res = anim(rootNode);
        if (res != undefined)
            res.call(() => func()).start();
        else func();
    }

    return {
        show, hide,
        setAnimation,
        popupEvents: e
    };
}