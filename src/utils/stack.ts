
/**@noSelf**/
export interface IStack<T> {
    pop():  T | undefined,
    push(element: T):void,
    isEmpty(): boolean,
    top():  T | undefined
    clear(): void;
    size() : number;
}



export function Stack<T>(): IStack<T> {
    const array : T[] = [];
    
    function pop() : T | undefined {
        const element = top();
        array.splice(array.length-1,1);
        return element;
    }

    function push(element: T) {
        array.push(element);
    }

    function top() : T | undefined {
        return array[array.length-1];
    }

    function isEmpty() : boolean {
        return array.length == 0;    
    }

    function clear() {
        while (pop() != null);
    }

    function size() : number { return array.length; }

    return { pop, push, top, isEmpty, clear, size };
}