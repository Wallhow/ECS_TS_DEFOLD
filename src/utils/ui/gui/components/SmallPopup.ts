/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-empty-function */
import { tween } from "../../../defoldTweens/Tween";
import { newPopupAnimation } from "../PopupAnimation";
import { newShrinkText } from "./ShrinkText";
import { getNodesFromTemplate } from "../utilsFun";

/**@noSelf */
export interface GUIPopup {
    setText(text: string): void;
    show(): void;
    hide(): void;
    setHideCallback: (callback: (popup: GUIPopup) => void) => void;
    isShow: boolean,
    nodes: { window: node, label: node, root: node }
}
export const newGUIPopup = _createPopup;

function _createPopup(templateName: string) {
    const clonedNodes = gui.clone_tree(gui.get_node(templateName + '/root'));
    const nodes = getNodesFromTemplate(templateName, ['window', 'label', 'root'] as const, clonedNodes);
    const popupAnim = newPopupAnimation(nodes.root);

    popupAnim.setAnimation('show', _popupShowAnimation);
    popupAnim.popupEvents.on('show', () => isShow = true);
    popupAnim.popupEvents.on('hide', () => {
        isShow = false;
        _hideCalback();
    });

    const { show, hide } = popupAnim;
    const shrinkText = newShrinkText(nodes.label, 'x');
    let isShow = false;
    let hideCallback = (popup: GUIPopup) => { };

    function setText(text: string) {
        shrinkText.set(text);
    }

    function _hideCalback() {
        hideCallback(thisPopup);
    }

    function _popupShowAnimation(node: node, compliteFunc: (() => void) | null | undefined) {
        tween(node, 'gui').opacityTo(0, 0).opacityTo(0.2, 1, { easing: 'EASING_OUTSINE' }).start();
        tween(node, 'gui')
            .to(0, 'scale', { scale: vmath.vector3(0.5, 0.5, 0.5) })
            .to(0.6, 'scale', { scale: vmath.vector3(1, 1, 1) }, { easing: 'EASING_OUTEXPO', compliteFunc }).start();
        tween(node, 'gui')
            .to(0, 'position.y', { y: gui.get_position(node).y - 150 })
            .by(0.6, 'position.y', { y: 150 }, { easing: 'EASING_OUTEXPO', compliteFunc }).start();
        return undefined;
    }

    const thisPopup = {
        setText,
        show, hide, setHideCallback: (callback: (popup: GUIPopup) => void) => hideCallback = callback, isShow, nodes
    };
    return thisPopup;
}

export function newGUIPopups(templateName: string, position: vmath.vector3) {
    const popupsQueuePool: GUIPopup[] = [];
    const popupsActive: GUIPopup[] = [];
    const messageQueue: string[] = [];
    const maxCountPopups = 5;
    const durationShowPopup = 1.5;
    _init();

    function _init() {
        for (const _ of $range(0, maxCountPopups - 1)) {
            const popup = newGUIPopup(templateName);
            popup.setHideCallback(_popupHideHandler);
            popupsQueuePool.push(popup);
        }

    }

    function emitPopup(text: string) {
        if (popupsQueuePool.length > 0) {
            const popup = popupsQueuePool.pop();
            if (popup != undefined)
                _activatePopup(popup, text);
        } else
            messageQueue.push(text);
    }

    function _popupHideHandler(popup: GUIPopup) {
        const index = popupsActive.indexOf(popup);
        if (index != -1) {
            popupsActive.splice(index, 1);

            if (messageQueue.length > 0) {
                const message = messageQueue.splice(0, 1);
                _activatePopup(popup, message[0]);
            }
            else
                popupsQueuePool.push(popup);
        }
    }

    function _activatePopup(popup: GUIPopup, text: string) {
        _moveActivePopups();

        const pos = vmath.vector3(position);
        gui.set_position(popup.nodes.root, pos);
        popup.setText(text);
        popup.show();

        timer.delay(durationShowPopup, false, () => popup.hide());

        popupsActive.push(popup);
    }
    function _moveActivePopups() {
        for (const index of $range(0, popupsActive.length - 1)) {
            const pop = popupsActive[(popupsActive.length - 1) - index];
            tween(pop.nodes.root, 'gui').by(0.3, 'position.y', { y: 20 + gui.get_size(pop.nodes.window).y }, { easing: 'EASING_OUTEXPO' }).start();
            tween(pop.nodes.root, 'gui').opacityTo(0.3, 1 - ((index + 1) / maxCountPopups)).start();
        }
    }
    return {
        emitPopup
    };
}


