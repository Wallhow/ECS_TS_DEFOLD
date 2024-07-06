/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { newInputField } from "../InputField";
import { ShrinkText, newShrinkText } from "./ShrinkText";

export type GUIInputField = ReturnType<typeof _createGUIInputField>;
export const newGUIInputField = _createGUIInputField;

function _createGUIInputField(druid: DruidClass, nameFieldNode: string | any, nameLabelNode: string | node, defText: string) {
    // eslint-disable-next-line prefer-const
    let value = defText;
    let inFocused = false;
    let isRemoveTextIfFocused = false;
    let isShrinkText = true;
    let druidComponent: DruidButton;
    let shrinkText: ShrinkText;

    const inputField = newInputField();
    nameLabelNode = typeof nameLabelNode == 'string' ? gui.get_node(nameLabelNode) : nameLabelNode;

    function init(removeTextIfFocused = false, is_shrinkText = true) {
        isRemoveTextIfFocused = removeTextIfFocused;
        isShrinkText = is_shrinkText;
        if (isShrinkText)
            shrinkText = newShrinkText(nameLabelNode, 'x');

        druidComponent = druid.new_button(nameFieldNode as string, () => inputField.emit('ON_FOCUS'));

        inputField.on('ON_FOCUS', () => _onFocused());
        inputField.on('CHANGED', (value) => {
            gui.set_text(nameLabelNode, value);

            if (isShrinkText)
                shrinkText.set(value);
        });

        inputField.setText(value);
    }

    function on_input(action_id: hash, action: any) {
        if (inFocused) {
            if (action_id == hash("text")) {
                inputField.addText(action.text as string);
            }
            if (action_id == hash("key_backspace") && action.released) {
                inputField.removeLetterAtEnd();
            }

            if (action_id == hash("key_enter") && action.released) {
                inFocused = false;
                if (inputField.getText() == '')
                    inputField.setText(defText);
            }
        }
    }

    function _onFocused() {
        inFocused = true;
        if (System.platform != 'HTML5') {
            if (isRemoveTextIfFocused)
                inputField.setText('');

            //gui.show_keyboard(gui.KEYBOARD_TYPE_DEFAULT, true);
        }
    }

    function remove() {
        druid.remove(druidComponent);
    }

    return {
        init, on_input, remove, ...inputField
    };
}