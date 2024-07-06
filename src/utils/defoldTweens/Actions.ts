/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ExtractPropsType } from "../types";
import Easings, { EasingFunction } from "./Easings";

export type Actions = ReturnType<typeof _createActions>;


export const action = _createActions;

function _createActions<T extends object>(obj: T) {
    type Props = keyof ExtractPropsType<T, number>;

    type Options = { easing?: keyof typeof Easings, onUpdate?: (currentValue: number, toValue: number) => void, onComplete?: (currentValue: number) => void };
    type ToTween = { key: 'TO', prop: Props, duration: number, delay: number, val: number, opt?: Options };
    type TweenData = ToTween;

    const sequence: TweenData[] = [];
    const defaultOptions: Required<Options> = {
        easing: 'linear',
        onUpdate: (currentValue: number, toValue: number): void => { },
        onComplete: (currentValue: number): void => { },
    };

    function to<P extends Props>(prop: P, value: number, duration: number, opt?: Options) {
        sequence.push({ key: 'TO', prop, duration, delay: 0, val: value, opt });
        return thisTween;
    }

    function start() {
        if (sequence.length > 0) {
            sequence.reduce((acc, tween, idx) => {
                const { prop, duration, val, opt } = tween;

                const easing = getOpt(opt, 'easing');
                const onUpdate = getOpt(opt, 'onUpdate')!;
                const onComplete = getOpt(opt, 'onComplete')!;

                _startTween(Easings[easing!] as EasingFunction, obj[prop] as number, val, duration, (val, isFinished) => {
                    (obj as any)[prop] = val;

                    onUpdate(obj[prop] as number, val);
                    if (isFinished)
                        onComplete(obj[prop] as number);
                });

                acc += duration;

                return acc;
            }, 0);
            sequence.splice(0, sequence.length);
        }
    }

    function getOpt<keys extends keyof Options>(opt: Options | undefined, key: keys): Options[keys] {
        return opt != undefined && opt[key] != undefined ? opt[key]! : defaultOptions[key];
    }

    function _startTween(easingFunction: EasingFunction, from: number, to: number, time: number, callback: (value: number, finished?: boolean) => void): void {
        let timeElapsed = 0;

        timer.delay(0.016, true, (_: any, handler: hash, timeElapsedFromTrigger: number) => {
            timeElapsed += timeElapsedFromTrigger;
            if (timeElapsed >= time) {
                callback(easingFunction(time, from, to - from, time), true);
                timer.cancel(handler);
                return;
            }
            callback(easingFunction(timeElapsed, from, to - from, time));
        });
    }

    const thisTween = {
        to,
        start
    };

    return thisTween;
}