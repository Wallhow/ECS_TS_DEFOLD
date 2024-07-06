/** @noResolution */
declare module 'yagames.yagames' {
    export function init(fn: CallbackYandex): void;
    export function adv_show_fullscreen_adv(cb: AdvInterCallbacks): void;
    export function adv_show_rewarded_video(cb: AdvRewardCallbacks): void;
    export function feedback_can_review(cb: CallbackFeedback): void;
    export function feedback_request_review(cb: CallbackFeedbackResult): void;
}

type CallbackYandex = (this: any, err: string) => void;
type CallbackFeedback = (this: any, data: { value: boolean, reason: string }) => void;
type CallbackFeedbackResult = (this: any, data: { feedbackSent: boolean }) => void;

interface AdvInterCallbacks {
    open?: () => void;
    close?: (was_shown: boolean) => void;
    offline?: () => void;
    error?: (err: string) => void;
}

interface AdvRewardCallbacks extends AdvInterCallbacks {
    rewarded?: (err: string) => void;
}