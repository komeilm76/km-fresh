export declare const computed: <T>(reactives: Record<string, ReturnType<(<T_1>(initialValue: T_1) => {
    value: T_1;
    subscribe(subscriber: () => void): () => any;
}) | (<T_1 extends object>(target: T_1) => {
    subscribe: (subscriber: () => void) => () => void;
    value: T_1;
})>>, getter: () => T) => {
    value: T;
    subscribe(subscriber: () => void): () => any;
};
export declare const reactive: <T extends object>(target: T) => {
    subscribe: (subscriber: () => void) => () => void;
    value: T;
};
export declare const ref: <T>(initialValue: T) => {
    value: T;
    subscribe(subscriber: () => void): () => any;
};
declare const _default: {
    computed: <T>(reactives: Record<string, ReturnType<(<T_1>(initialValue: T_1) => {
        value: T_1;
        subscribe(subscriber: () => void): () => any;
    }) | (<T_1 extends object>(target: T_1) => {
        subscribe: (subscriber: () => void) => () => void;
        value: T_1;
    })>>, getter: () => T) => {
        value: T;
        subscribe(subscriber: () => void): () => any;
    };
    reactive: <T extends object>(target: T) => {
        subscribe: (subscriber: () => void) => () => void;
        value: T;
    };
    ref: <T>(initialValue: T) => {
        value: T;
        subscribe(subscriber: () => void): () => any;
    };
};
export default _default;
