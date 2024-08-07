/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-interface */
export type VoidCallback = () => void;
export type Messages = UserMessages & SystemMessages;
export type MessageId = keyof Messages;

export interface VoidMessage { }

export interface NameMessage extends VoidMessage { name: string; }
export interface InterMessage extends VoidMessage { is_check: boolean; }
export interface ValMessage extends VoidMessage { val: boolean; }
export interface SndMessage extends NameMessage { volume: number; speed: number }

export type _SystemMessages = {
    PLAY_SND: SndMessage,
    STOP_SND: NameMessage,
    ON_SOUND_PAUSE: ValMessage,
    LOAD_SCENE: NameMessage,
    SHOW_RATE: VoidMessage,
    APPLY_CUSTOM_LANG: VoidMessage,
    SCENE_LOADED: NameMessage,
    MANAGER_READY: VoidMessage,
    SHOW_REWARD: VoidMessage,
    SHOW_INTER: InterMessage,
    SHOW_BANNER: VoidMessage,
    HIDE_BANNER: VoidMessage,
    ON_INTER_SHOWN: VoidMessage,
    FINAL: VoidMessage,
};

export const _ID_MESSAGES = {
    MSG_TOUCH: hash('touch'),
    MSG_ON_MOVE: hash('MSG_ON_MOVE'),
    MSG_ON_DOWN: hash('MSG_ON_DOWN'),
    MSG_ON_UP: hash('MSG_ON_UP'),
    MSG_ON_DOWN_HASHES: hash('MSG_ON_DOWN_HASHES'),
    MSG_ON_UP_HASHES: hash('MSG_ON_UP_HASHES'),
    MSG_ON_DOWN_ITEM: hash('MSG_ON_DOWN_ITEM'),
    MSG_ON_UP_ITEM: hash('MSG_ON_UP_ITEM'),
    MSG_ON_MOVE_ITEM: hash('MSG_ON_MOVE_ITEM'),
    MSG_ON_REWARDED: hash('MSG_ON_REWARDED'),
    MSG_ON_INTER_SHOWN: hash('MSG_ON_INTER_SHOWN')
};