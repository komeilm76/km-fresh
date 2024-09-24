type Subscriber = () => void;
declare function ref<T>(initialValue: T): {
    value: T;
    subscribe(subscriber: Subscriber): () => boolean;
    get(): T;
    set(newValue: T): void;
};
type Reactive<T> = {
    subscribe: (subscriber: Subscriber) => () => void;
    value: T;
};
declare function reactive<T extends object>(target: T): Reactive<T>;
declare function computed<T>(reactives: Record<string, ReturnType<typeof ref | typeof reactive>>, getter: () => T): {
    value: T;
    subscribe(subscriber: Subscriber): () => boolean;
    get(): T;
    set(newValue: T): void;
};
declare const _default: {
    ref: typeof ref;
    reactive: typeof reactive;
    computed: typeof computed;
};
export default _default;
