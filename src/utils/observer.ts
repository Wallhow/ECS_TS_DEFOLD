/**@noSelf */
export interface IObservable<T> {
    subscribe(fn: (data: T) => void): void;
    unsubscribe(fn: (data: T) => void): void;
    get(): T;
    set(value: T): void;
}

/**@noSelf */
export interface IObservableNumberVal extends IObservable<number> {
    sub(val: number): void;
    add(val: number): void;
}

const createObservableVal = <T>(value: T, receive_msg_when_subscribe = false): IObservable<T> => {
    let observers: Array<(data: T) => void> = [];
    let value_ = value;

    const subscribe = (fn: (data: T) => void) => {
        observers.push(fn);
        if (receive_msg_when_subscribe) {
            fn(value_);
        }
    };

    const unsubscribe = (fn: (data: T) => void) => {
        observers = observers.filter((subscriber) => subscriber !== fn);
    };

    const setValue = (data: T) => {
        value_ = data;
        observers.forEach((subscriber) => subscriber(value_));
    };

    const getValue = () => {
        return value_;
    };

    return {
        get: getValue,
        set: setValue,
        subscribe,
        unsubscribe,
    };
};

const createObservableNumberVal = (value: number, receive_msg_when_subscribe = false): IObservableNumberVal => {
    const observableVal = createObservableVal(value, receive_msg_when_subscribe);

    const add = (v: number) => {
        observableVal.set(observableVal.get() + v);
    };

    const sub = (v: number) => {
        observableVal.set(observableVal.get() - v);
    };

    return {
        ...observableVal,
        add,
        sub,
    };
};

const createObservableNumberValWithPre = (value: number, receive_msg_when_subscribe = false) => {

    let observers: Array<(new_value: number, pre_value: number) => void> = [];
    let value_ = value;
    let pre_value = value;
    const subscribe = (fn: (new_value: number, pre_value: number) => void) => {
        observers.push(fn);
        if (receive_msg_when_subscribe) {
            fn(value_, pre_value);
        }
    };

    const unsubscribe = (fn: (new_value: number, pre_value: number) => void) => {
        observers = observers.filter((subscriber) => subscriber !== fn);
    };

    const setValue = (data: number) => {
        pre_value = value_;
        value_ = data;
        observers.forEach((subscriber) => subscriber(value_, pre_value));
    };

    const getValue = () => {
        return value_;
    };

    return {
        get: getValue,
        set: setValue,
        subscribe,
        unsubscribe,
    };
};

export const ObservableVal = createObservableVal;
export const ObservableNumberVal = createObservableNumberVal;

export const ObservableNumberValWithPre = createObservableNumberValWithPre;