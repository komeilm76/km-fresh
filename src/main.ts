import service from "./service";

export const computed = service.fresh.computed;
export const reactive = service.fresh.reactive;
export const ref = service.fresh.ref;

const kmStorage = {
  computed,
  reactive,
  ref,
};

export default kmStorage;
