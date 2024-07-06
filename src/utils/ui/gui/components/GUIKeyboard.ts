/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-empty-function */

import { newEasyEvents } from "../../../events/easyEvents";
import { newStrEnum } from "../../../storage/StrEnum";
import { newBlocker, newBlockerShadowAnimations } from "./Blocker";
import { newGUIInputField, GUIInputField } from "./GUIInputField";

import { PopupAnimation, newPopupAnimation } from "../PopupAnimation";

export type GUIKeyboard = ReturnType<typeof _createGUIKeyboard>;
export const newGUIKeyboard = _createGUIKeyboard;

const ru = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'] as const;
const en = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'] as const;

export const KeyboardLanguage = {
    RU: newStrEnum(ru),
    EN: newStrEnum(en),
};

export type KeyboardLangs = typeof KeyboardLanguage.RU | typeof KeyboardLanguage.EN;

const KeyboardEvent = ['ON_PRESSED', 'SHOW_KEYBOARD', 'HIDE_KEYBOARD', 'PRESSED_CONFIRM', 'PRESSED_REMOVE'] as const;
const defaultOpt = {
    inputBlockOnStart: false, previewTextOn: true, regenerateOnShow: true,
};

function _createGUIKeyboard(druid: DruidClass, lang: KeyboardLangs, templateName: string, opt?: Partial<typeof defaultOpt>) {
    type DruidAndNode = { node: node, druidNode: DruidButton };
    const events = newEasyEvents(KeyboardEvent, {
        ON_PRESSED(keyPressed: string) { },
        SHOW_KEYBOARD(rootNode: node) { },
        HIDE_KEYBOARD(rootNode: node) { },
        PRESSED_CONFIRM(rootNode: node) { },
        PRESSED_REMOVE() { }
    });

    const keys: DruidButton[] = [];
    const letterNodes: { node: AnyTable, letter: string }[] = [];
    const curLang = lang == KeyboardLanguage.RU ? ru : en;
    const durationChangeState = 0.1;

    let inputBlocker: ReturnType<typeof newBlocker>;
    let isBlockerEnabled = true;
    let isShow = false;
    let staticGrid: DruidGridVertical;

    const { inputBlockOnStart, previewTextOn, regenerateOnShow } = _getOptions(opt);

    const { templ, animations, keyboardRootNode, btnConfirm, btnRemove } = init(templateName, inputBlockOnStart);

    const previewText = previewTextOn ? _createPreviewLabel(templ[templateName + '/previewText']) : null;

    const { on, emit } = events;
    const hide = animations.hide;

    if (!regenerateOnShow)
        _createKeys();

    function init(templateName: string, inputBlockOnStart = false): { templ: AnyTable, animations: PopupAnimation, keyboardRootNode: node, btnConfirm: DruidAndNode, btnRemove: DruidAndNode } {
        inputBlocker = newBlocker(druid, gui.get_parent(gui.get_node(templateName + '/root')), inputBlockOnStart);
        const blockerAnimations = newBlockerShadowAnimations(inputBlocker);
        const templ = gui.clone_tree(gui.get_node(templateName + '/root'));

        gui.set_enabled(templ[templateName + '/root'], true);
        const keyboardRootNode = templ[templateName + '/root'];

        const confirmBtnNode = templ[templateName + '/confirmBtn'];
        const removeLetterBtnNode = templ[templateName + '/removeBtn'];

        const keyTemplateName = templateName + '/keyBtn';

        const animations = newPopupAnimation(keyboardRootNode);

        animations.popupEvents.on('hide', () => {
            _action('HIDE_KEYBOARD');
            blockerAnimations.hide();
        });
        animations.popupEvents.on('show', () => {
            _action('SHOW_KEYBOARD');
            blockerAnimations.show();
        });

        staticGrid = druid.new_static_grid(templ[templateName + '/keyboard_container'], keyTemplateName, 6);

        curLang.forEach((key, i) => {
            const newKey = _createNewKey(keyTemplateName, key);
            staticGrid.add(newKey.node[keyTemplateName], (i + 1));
            letterNodes.push(newKey);
        });

        const druidConfirmBtn = druid.new_button(confirmBtnNode, () => events.emit('PRESSED_CONFIRM', keyboardRootNode));
        const druidRemoveBtn = druid.new_button(removeLetterBtnNode, () => events.emit('PRESSED_REMOVE'));

        return {
            templ, animations, keyboardRootNode, btnConfirm: { node: confirmBtnNode, druidNode: druidConfirmBtn }, btnRemove: { node: removeLetterBtnNode as node, druidNode: druidRemoveBtn }
        };
    }


    function show(defaultTextInPreview = '') {
        if (previewText != null && previewTextOn)
            previewText.setText(defaultTextInPreview);
        animations.show();
    }

    function _createKeys() {
        if (isBlockerEnabled) inputBlocker.refresh(true);

        if (btnConfirm.druidNode != undefined)
            druid.remove(btnConfirm.druidNode);
        if (btnRemove.druidNode != undefined)
            druid.remove(btnRemove.druidNode);

        if (keys.length > 0)
            keys.forEach(key => druid.remove(key));
        if (staticGrid != undefined)
            druid.remove(staticGrid);

        const keyTemplateName = templateName + '/keyBtn';

        letterNodes.forEach((v, i) => {
            const { node, letter } = v;
            keys.push(druid.new_button(node[keyTemplateName] as string, () => {
                const data = letter;
                events.emit('ON_PRESSED', data);
                __animatePressed(node);
            }));
        });

        btnConfirm.druidNode = druid.new_button(btnConfirm.node, () => events.emit('PRESSED_CONFIRM', keyboardRootNode));
        btnRemove.druidNode = druid.new_button(btnRemove.node, () => events.emit('PRESSED_REMOVE'));
    }

    function _createNewKey(keyTemplateName: string, key: string) {
        const templKey = gui.clone_tree(gui.get_node(keyTemplateName));
        gui.set_enabled(templKey[keyTemplateName], true);
        gui.set_text(templKey['keyboard/label'], key);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return { node: templKey, letter: key };
    }
    function _action(event: Exclude<typeof KeyboardEvent[number], 'ON_PRESSED' | "PRESSED_CONFIRM" | "PRESSED_REMOVE">) {
        events.emit(event, keyboardRootNode);
        isShow = event == 'SHOW_KEYBOARD';
        if (isShow && regenerateOnShow)
            _createKeys();
        if (isBlockerEnabled) inputBlocker.getBlocker().set_enabled(isShow);
    }

    function __animatePressed(node: AnyTable) {
        gui.set_enabled(node[templateName + '/on'], true);
        timer.delay(durationChangeState, false, () => gui.set_enabled(node[templateName + '/on'], false));
    }

    function _createPreviewLabel(nodePreview: node) {
        const previewText = newGUIInputField(druid, nodePreview, nodePreview, '!!!');
        previewText.init();
        const removeLetterFunc = () => previewText.removeLetterAtEnd();
        events.on('ON_PRESSED', (key) => previewText.addText(key));
        events.on('PRESSED_REMOVE', () => removeLetterFunc());

        return previewText;
    }

    function _getOptions(opt?: Partial<typeof defaultOpt> | undefined): typeof defaultOpt {
        if (opt == undefined) return defaultOpt;
        const options: typeof defaultOpt = {} as typeof defaultOpt;
        Object.keys(defaultOpt).
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            forEach((key) => options[key as keyof typeof defaultOpt] = (opt as any)[key] == undefined ? (defaultOpt as any)[key] : (opt as any)[key], {} as AnyTable) as any;
        return options;
    }

    return {
        isShow: () => isShow,
        on,
        emit,
        hide,
        show,
        setAnimation: animations.setAnimation,
        popupEvents: animations.popupEvents,
        setBlockerEnable: (enable: boolean) => {
            isBlockerEnabled = enable;
            inputBlocker.getBlocker().set_enabled(enable);
        },
        letterNodes: letterNodes.map(l => {
            return { node: l.node[templateName + '/off'], letter: l.letter };
        }),
        buttonConfirmNode: templ[templateName + '/on1'],
    };
}




