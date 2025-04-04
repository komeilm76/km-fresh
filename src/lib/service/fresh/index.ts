type SubscriberOfRef<T1> = (e: T1) => void;
type SubscriberOfReactive<T2> = (e: T2) => void;

function ref<T1>(initialValue: T1) {
  let value = initialValue;
  const subscribers = new Set<SubscriberOfRef<T1>>();

  const notify = (v: T1) => {
    subscribers.forEach((subscriber) => subscriber(v));
  };

  return {
    get value() {
      return value;
    },
    set value(newValue: T1) {
      if (newValue !== value) {
        value = newValue;
        notify(newValue);
      }
    },
    subscribe(subscriber: SubscriberOfRef<T1>) {
      subscribers.add(subscriber);
      return () => subscribers.delete(subscriber);
    },

    get() {
      return value;
    },
    set(newValue: T1) {
      if (newValue !== value) {
        value = newValue;
        notify(newValue);
      }
    },
    setHard(newValue: T1) {
      value = newValue;
      notify(newValue);
    },
  };
}

function reactive<T2 extends object = object>(target: T2) {
  const subscribers = new Set<SubscriberOfReactive<T2>>();

  const notify = (v: T2) => {
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
    subscribe: (subscriber: SubscriberOfReactive<T2>) => {
      subscribers.add(subscriber);
      return () => subscribers.delete(subscriber);
    },
  };
}

function computedExample<
  T3,
  REACTIVS extends Record<string, ReturnType<typeof ref | typeof reactive>> = Record<
    string,
    ReturnType<typeof ref | typeof reactive>
  >
>(reactives: REACTIVS, getter: (e: REACTIVS) => T3) {
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

function computed<
  T4,
  REACTIVS extends Record<
    string,
    ReturnType<typeof ref | typeof reactive | typeof computedExample>
  > = Record<string, ReturnType<typeof ref | typeof reactive | typeof computedExample>>
>(reactives: REACTIVS, getter: (e: REACTIVS) => T4) {
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
