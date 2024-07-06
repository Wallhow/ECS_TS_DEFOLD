/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-empty-function */
import { newEasyEvents } from "../../../events/easyEvents";
import { newBlocker, newBlockerShadowAnimations } from "./Blocker";
import { newPopupAnimation } from "../PopupAnimation";
import { newShrinkText } from "./ShrinkText";
import { getNodesFromTemplate } from "../utilsFun";

export type GUIWindowPopup = ReturnType<typeof _createPopup>;
export const newGUIWindowPopup = _createPopup;

function _createPopup(druid: DruidClass, templateName: string) {
    const nodes = getNodesFromTemplate(templateName, ['center', 'blockerParent', 'root', 'window', 'button', 'label', 'contentContainer', 'labelH1'] as const);
    const events = newEasyEvents(['PRESS_BUTTON'] as const, { PRESS_BUTTON() { } });
    const popupAnim = newPopupAnimation(nodes.root);
    const blocker = newBlocker(druid, nodes.blockerParent, true);
    const blockerAnim = newBlockerShadowAnimations(blocker, vmath.vector4(1, 1, 1, 1));

    popupAnim.popupEvents.on('show', () => blockerAnim.show(() => _changeState(true)));
    popupAnim.popupEvents.on('hide', () => blockerAnim.hide(() => _changeState(false)));

    const { container, btnDruid } = _init();
    const { on, emit } = events;
    const { show, hide } = popupAnim;
    const shrinkTextButton = newShrinkText(nodes.label, 'x');
    let _isShow = false;

    _changeState(false);
    function _init() {
        const btnDruid = druid.new_button(nodes.button, () => emit('PRESS_BUTTON'));
        const container = _createTextContentContainer();

        return { btnDruid, container };
    }

    function setButtonText(text: string) {
        shrinkTextButton.set(text);
    }

    function addTextLine(text: string, shrinkAxis: 'x' | 'y' = 'x') {
        container.addTextLine(text, shrinkAxis);
    }

    function _changeState(state: boolean) {
        blocker.getBlocker().set_enabled(state);
        btnDruid.set_enabled(state);
        _isShow = state;
    }

    function _createTextContentContainer() {
        const container = druid.new_static_grid(nodes.contentContainer, nodes.labelH1, 1);
        const srcPosition = gui.get_position(nodes.contentContainer);
        const sizeContainer = gui.get_size(nodes.contentContainer);
        let labels: node[] = [];
        let countLine = 0;

        // gui.set_enabled(nodes.labelH1, false);
        container.on_clear.subscribe(_clear);
        srcPosition.y -= (sizeContainer.y / 2);
        _updatePositionContainer();

        function addTextLine(text: string, shrinkAxis: 'x' | 'y' = 'x') {
            const label = gui.clone_tree(nodes.labelH1);
            const newLabelNode = label[templateName + '/labelH1'];
            gui.set_enabled(newLabelNode, true);
            newShrinkText(newLabelNode, shrinkAxis, false).set(text);
            if (countLine > 0)
                _updatePositionContainer();


            countLine += 1;
            container.add(newLabelNode, (countLine));
            labels.push(newLabelNode);
        }

        function _clear() {
            for (const label of labels)
                gui.delete_node(label);
            labels = [];
            countLine = 0;
            gui.set_position(nodes.contentContainer, srcPosition);
        }

        function _updatePositionContainer(cLines = countLine) {
            const positionContainer = gui.get_position(nodes.contentContainer);
            const deltaY = (sizeContainer.y / 2) * (cLines == 0 ? -1 : 1);
            positionContainer.y += deltaY;
            gui.set_position(nodes.contentContainer, positionContainer);
        }
        return {
            addTextLine, clear: () => container.clear(),
        };
    }



    return {
        setButtonText, addTextLine,
        /**Чистит контейнер с текстом, а так же слушателей на кнопку */
        clear: () => {
            container.clear();
            events.final();
        }, on, show, hide, isShow: () => _isShow
    };

}


