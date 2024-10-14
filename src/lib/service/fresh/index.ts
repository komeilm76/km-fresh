type Subscriber<T> = (e: T) => void;
function ref<T>(initialValue: T) {
  let value = initialValue;
  const subscribers = new Set<Subscriber<T>>();

  const notify = (v: T) => {
    subscribers.forEach((subscriber) => subscriber(v));
  };

  return {
    get value() {
      return value;
    },
    set value(newValue: T) {
      if (newValue !== value) {
        value = newValue;
        notify(newValue);
      }
    },
    subscribe(subscriber: Subscriber<T>) {
      subscribers.add(subscriber);
      return () => subscribers.delete(subscriber);
    },

    get() {
      return value;
    },
    set(newValue: T) {
      if (newValue !== value) {
        value = newValue;
        notify(newValue);
      }
    },
    setHard(newValue: T) {
      value = newValue;
      notify(newValue);
    },
  };
}
type Reactive<T> = { subscribe: (subscriber: Subscriber<T>) => () => void; value: T };
function reactive<T extends object>(target: T): Reactive<T> {
  const subscribers = new Set<Subscriber<T>>();

  const notify = (v: T) => {
    subscribers.forEach((subscriber) => subscriber(v));
  };

  const makeReactive = (obj: any): any => {
    return new Proxy(obj, {
      get(target, prop) {
        const value = target[prop];
        if (typeof value === 'object' && value !== null) {
          return makeReactive(value);
        }
        return value;
      },
      set(target, prop, value) {
        if (target[prop] !== value) {
          target[prop] = value;
          notify(value);
        }
        return true;
      },
    });
  };

  return {
    value: makeReactive(target),
    subscribe: (subscriber: Subscriber<T>) => {
      subscribers.add(subscriber);
      return () => subscribers.delete(subscriber);
    },
  };
}

type IComputedFunction = <
  T,
  REACTIVS extends Record<string, ReturnType<typeof ref | typeof reactive>>
>(
  reactives: REACTIVS,
  getter: (e: REACTIVS) => T
) => Pick<
  {
    value: T;
    subscribe(subscriber: Subscriber<T>): () => boolean;
    get(): T;
    set(newValue: T): void;
    setHard(newValue: T): void;
  },
  'get' | 'value' | 'subscribe'
>;

function computed<
  T,
  REACTIVS extends Record<string, ReturnType<typeof ref | typeof reactive | IComputedFunction>>
>(reactives: REACTIVS, getter: (e: REACTIVS) => T) {
  let output = ref(getter(reactives));
  for (const _key in reactives) {
    if (Object.prototype.hasOwnProperty.call(reactives, _key)) {
      const key = _key;
      const item = reactives[key];
      item.subscribe(() => {
        output.setHard(getter(reactives));
      });
    }
  }
  return output as Pick<typeof output, 'get' | 'value' | 'subscribe'>;
}

export default {
  ref,
  reactive,
  computed,
};
