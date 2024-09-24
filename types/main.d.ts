export declare const computed: <T>(reactives: Record<string, ReturnType<(<T_1>(initialValue: T_1) => {
    value: T_1;
    subscribe(subscriber: () => void): () => boolean;
    get(): T_1;
    set(newValue: T_1): void;
}) | (<T_1 extends object>(target: T_1) => {
    subscribe: (subscriber: () => void) => () => void;
    value: T_1;
})>>, getter: () => T) => {
    value: T;
    subscribe(subscriber: () => void): () => boolean;
    get(): T;
    set(newValue: T): void;
};
export declare const reactive: <T extends object>(target: T) => {
    subscribe: (subscriber: () => void) => () => void;
    value: T;
};
export declare const ref: <T>(initialValue: T) => {
    value: T;
    subscribe(subscriber: () => void): () => boolean;
    get(): T;
    set(newValue: T): void;
};
declare const kmFresh: {
    computed: <T>(reactives: Record<string, ReturnType<(<T_1>(initialValue: T_1) => {
        value: T_1;
        subscribe(subscriber: () => void): () => boolean;
        get(): T_1;
        set(newValue: T_1): void;
    }) | (<T_1 extends object>(target: T_1) => {
        subscribe: (subscriber: () => void) => () => void;
        value: T_1;
    })>>, getter: () => T) => {
        value: T;
        subscribe(subscriber: () => void): () => boolean;
        get(): T;
        set(newValue: T): void;
    };
    reactive: <T extends object>(target: T) => {
        subscribe: (subscriber: () => void) => () => void;
        value: T;
    };
    ref: <T>(initialValue: T) => {
        value: T;
        subscribe(subscriber: () => void): () => boolean;
        get(): T;
        set(newValue: T): void;
    };
};
export default kmFresh;
