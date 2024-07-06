/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { tween } from "../../defoldTweens/Tween";
import { newEasyEvents } from "../../events/easyEvents";
import { newStrEnum } from "../../storage/StrEnum";
import { ShrinkText, newShrinkText } from "./components/ShrinkText";

export type PlayerKeys = "player_01_name" | "player_02_name" | "player_03_name" | "player_04_name";

const inputFieldEvents = ['ON_FOCUS', 'CHANGED', 'LOST_FOCUS'] as const;

export function newInputField() {
    let value = '';

    const events = newEasyEvents(inputFieldEvents, {
        CHANGED(test: string) { },
        LOST_FOCUS() { },
        ON_FOCUS() { }
    });
    /**
     * Рассылает слушателям подписаным на CHANGE новый текст и кеширует его в переменную value
     */
    function setText(newValue: string): void {
        value = newValue;
        events.emit('CHANGED', value);
    }

    function getText(): string {
        return value;
    }

    function addText(addedVal: string): string {
        setText(getText() + addedVal);
        return getText();
    }

    function removeLetterAtEnd() {
        let text = getText();
        text = text.length - 1 > 0 ? utf8.sub(text, 0, utf8.len(text) - 1) : "";
        setText(text);
    }


    return {
        setText, getText, addText, removeLetterAtEnd, ...events
    };

}

