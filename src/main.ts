import service from "./service";

export const computed = service.fresh.computed;
export const reactive = service.fresh.reactive;
export const ref = service.fresh.ref;

export default {
  computed,
  reactive,
  ref,
};
