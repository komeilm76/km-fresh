import service from "./service";

export const computed = service.fresh.computed;
export const reactive = service.fresh.reactive;
export const ref = service.fresh.ref;


const kmFresh = {
  computed,
  reactive,
  ref,
};

export default kmFresh;
