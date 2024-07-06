/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export type EventCallbacks<Events extends readonly string[]> = { [key in Events[number]]: (this: any, ...args: any[]) => void };
/**@noSelf */
export interface EasyEvents<Event extends readonly string[], Callbacks extends EventCallbacks<Event>> {
    on<T extends Event[number]>(event: T, callback: Callbacks[T], context?: any): void;
    emit<T extends Event[number]>(event: T, ...args: Parameters<Callbacks[T]>): void;
    final(): void;
}

export function newEasyEvents<Event extends readonly string[], C extends EventCallbacks<Event>>
    (events: Event, callbacksDeclare: C): EasyEvents<Event, C> {


    type Listeners = { [event: string]: Array<{ callback: C[Event[number]], context?: any }> };

    const listeners: Listeners = {} as Listeners;

    for (const eventKey of events)
        listeners[eventKey] = [];

    function on<T extends Event[number]>(event: T, callback: C[T], context?: any): void {
        if (listeners[event as string] == undefined) listeners[event as string] = [];
        listeners[event as string].push({ callback, context });
    }

    function emit<T extends Event[number]>(event: T, ...args: Parameters<C[T]>): void {
        if (listeners[event as string] != undefined)
            for (const listener of listeners[event as string]) {
                const { isOk, err } = _callbackCall(listener, args);
                if (!isOk)
                    Log.error('Emite event ' + (event as string) + ' error: ' + err);
            }
    }

    function _callbackCall<T extends Event[number]>(listener: { callback: C[T], context?: any }, args: Parameters<C[T]>): { isOk: boolean, err: any } {
        let isOk = true;
        let err: any = '';
        const context = listener.context ?? {};

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        // pcall(listener.callback, {}, args);
        const res = pcall(() => {
            listener.callback.call(context, ...args);
        });

        isOk = res[0];
        err = res[1];

        return { isOk, err };
    }

    function final() {
        for (const key of events) {
            const listenerList = listeners[key];
            if (listenerList != undefined && listenerList.length > 0)
                listenerList.splice(0, listenerList.length - 1);

            delete listeners[key];
        }  
    }

    return { on, emit, final };
}