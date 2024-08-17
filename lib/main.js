function i(n) {
  let t = n;
  const r = /* @__PURE__ */ new Set(), c = () => {
    r.forEach((e) => e());
  };
  return {
    get value() {
      return t;
    },
    set value(e) {
      e !== t && (t = e, c());
    },
    subscribe(e) {
      return r.add(e), () => r.delete(e);
    }
  };
}
function a(n) {
  const t = /* @__PURE__ */ new Set(), r = () => {
    t.forEach((e) => e());
  }, c = (e) => new Proxy(e, {
    get(s, u) {
      const o = s[u];
      return typeof o == "object" && o !== null ? c(o) : o;
    },
    set(s, u, o) {
      return s[u] !== o && (s[u] = o, r()), !0;
    }
  });
  return {
    value: c(n),
    subscribe: (e) => (t.add(e), () => t.delete(e))
  };
}
function l(n, t) {
  let r = i(t());
  for (const c in n)
    Object.prototype.hasOwnProperty.call(n, c) && n[c].subscribe(() => {
      r.value = t();
    });
  return r;
}
const d = {
  ref: i,
  reactive: a,
  computed: l
}, f = {
  fresh: d
}, v = f.fresh.computed, y = f.fresh.reactive, b = f.fresh.ref, m = {
  computed: v,
  reactive: y,
  ref: b
};
export {
  v as computed,
  m as default,
  y as reactive,
  b as ref
};
