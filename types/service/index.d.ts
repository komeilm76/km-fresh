declare const _default: {
    fresh: {
        ref: <T>(initialValue: T) => {
            value: T;
            subscribe(subscriber: () => void): () => boolean;
        };
        reactive: <T extends object>(target: T) => {
            subscribe: (subscriber: () => void) => () => void;
            value: T;
        };
        computed: <T>(reactives: Record<string, ReturnType<(<T_1>(initialValue: T_1) => {
            value: T_1;
            subscribe(subscriber: () => void): () => boolean;
        }) | (<T_1 extends object>(target: T_1) => {
            subscribe: (subscriber: () => void) => () => void;
            value: T_1;
        })>>, getter: () => T) => {
            value: T;
            subscribe(subscriber: () => void): () => boolean;
        };
    };
};
export default _default;
