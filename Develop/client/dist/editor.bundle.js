(() => {
  "use strict";
  var e = {
      666: () => {
        let e, t;
        const n = new WeakMap(),
          r = new WeakMap(),
          o = new WeakMap(),
          a = new WeakMap(),
          s = new WeakMap();
        let i = {
          get(e, t, n) {
            if (e instanceof IDBTransaction) {
              if ("done" === t) return r.get(e);
              if ("objectStoreNames" === t)
                return e.objectStoreNames || o.get(e);
              if ("store" === t)
                return n.objectStoreNames[1]
                  ? void 0
                  : n.objectStore(n.objectStoreNames[0]);
            }
            return u(e[t]);
          },
          set: (e, t, n) => ((e[t] = n), !0),
          has: (e, t) =>
            (e instanceof IDBTransaction && ("done" === t || "store" === t)) ||
            t in e,
        };
        function c(a) {
          return "function" == typeof a
            ? (s = a) !== IDBDatabase.prototype.transaction ||
              "objectStoreNames" in IDBTransaction.prototype
              ? (
                  t ||
                  (t = [
                    IDBCursor.prototype.advance,
                    IDBCursor.prototype.continue,
                    IDBCursor.prototype.continuePrimaryKey,
                  ])
                ).includes(s)
                ? function (...e) {
                    return s.apply(d(this), e), u(n.get(this));
                  }
                : function (...e) {
                    return u(s.apply(d(this), e));
                  }
              : function (e, ...t) {
                  const n = s.call(d(this), e, ...t);
                  return o.set(n, e.sort ? e.sort() : [e]), u(n);
                }
            : (a instanceof IDBTransaction &&
                (function (e) {
                  if (r.has(e)) return;
                  const t = new Promise((t, n) => {
                    const r = () => {
                        e.removeEventListener("complete", o),
                          e.removeEventListener("error", a),
                          e.removeEventListener("abort", a);
                      },
                      o = () => {
                        t(), r();
                      },
                      a = () => {
                        n(
                          e.error ||
                            new DOMException("AbortError", "AbortError")
                        ),
                          r();
                      };
                    e.addEventListener("complete", o),
                      e.addEventListener("error", a),
                      e.addEventListener("abort", a);
                  });
                  r.set(e, t);
                })(a),
              (c = a),
              (
                e ||
                (e = [
                  IDBDatabase,
                  IDBObjectStore,
                  IDBIndex,
                  IDBCursor,
                  IDBTransaction,
                ])
              ).some((e) => c instanceof e)
                ? new Proxy(a, i)
                : a);
          var s, c;
        }
        function u(e) {
          if (e instanceof IDBRequest)
            return (function (e) {
              const t = new Promise((t, n) => {
                const r = () => {
                    e.removeEventListener("success", o),
                      e.removeEventListener("error", a);
                  },
                  o = () => {
                    t(u(e.result)), r();
                  },
                  a = () => {
                    n(e.error), r();
                  };
                e.addEventListener("success", o),
                  e.addEventListener("error", a);
              });
              return (
                t
                  .then((t) => {
                    t instanceof IDBCursor && n.set(t, e);
                  })
                  .catch(() => {}),
                s.set(t, e),
                t
              );
            })(e);
          if (a.has(e)) return a.get(e);
          const t = c(e);
          return t !== e && (a.set(e, t), s.set(t, e)), t;
        }
        const d = (e) => s.get(e);
        function p(
          e,
          t,
          { blocked: n, upgrade: r, blocking: o, terminated: a } = {}
        ) {
          const s = indexedDB.open(e, t),
            i = u(s);
          return (
            r &&
              s.addEventListener("upgradeneeded", (e) => {
                r(u(s.result), e.oldVersion, e.newVersion, u(s.transaction));
              }),
            n && s.addEventListener("blocked", () => n()),
            i
              .then((e) => {
                a && e.addEventListener("close", () => a()),
                  o && e.addEventListener("versionchange", () => o());
              })
              .catch(() => {}),
            i
          );
        }
        const f = ["get", "getKey", "getAll", "getAllKeys", "count"],
          l = ["put", "add", "delete", "clear"],
          v = new Map();
        function m(e, t) {
          if (!(e instanceof IDBDatabase) || t in e || "string" != typeof t)
            return;
          if (v.get(t)) return v.get(t);
          const n = t.replace(/FromIndex$/, ""),
            r = t !== n,
            o = l.includes(n);
          if (
            !(n in (r ? IDBIndex : IDBObjectStore).prototype) ||
            (!o && !f.includes(n))
          )
            return;
          const a = async function (e, ...t) {
            const a = this.transaction(e, o ? "readwrite" : "readonly");
            let s = a.store;
            return (
              r && (s = s.index(t.shift())),
              (await Promise.all([s[n](...t), o && a.done]))[0]
            );
          };
          return v.set(t, a), a;
        }
        function b(e, t, n, r, o, a, s) {
          try {
            var i = e[a](s),
              c = i.value;
          } catch (e) {
            return void n(e);
          }
          i.done ? t(c) : Promise.resolve(c).then(r, o);
        }
        var g;
        (g = i),
          (i = {
            ...g,
            get: (e, t, n) => m(e, t) || g.get(e, t, n),
            has: (e, t) => !!m(e, t) || g.has(e, t),
          }),
          (function () {
            var e,
              t =
                ((e = regeneratorRuntime.mark(function e() {
                  return regeneratorRuntime.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return e.abrupt(
                            "return",
                            p("jate", 1, {
                              upgrade: function (e) {
                                e.objectStoreNames.contains("jate")
                                  ? console.log("jate database already exists")
                                  : (e.createObjectStore("jate", {
                                      keyPath: "id",
                                      autoIncrement: !0,
                                    }),
                                    console.log("jate database created"));
                              },
                            })
                          );
                        case 1:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })),
                function () {
                  var t = this,
                    n = arguments;
                  return new Promise(function (r, o) {
                    var a = e.apply(t, n);
                    function s(e) {
                      b(a, r, o, s, i, "next", e);
                    }
                    function i(e) {
                      b(a, r, o, s, i, "throw", e);
                    }
                    s(void 0);
                  });
                });
            return function () {
              return t.apply(this, arguments);
            };
          })()();
      },
    },
    t = {};
  function n(r) {
    var o = t[r];
    if (void 0 !== o) return o.exports;
    var a = (t[r] = { exports: {} });
    return e[r](a, a.exports, n), a.exports;
  }
  (n.d = (e, t) => {
    for (var r in t)
      n.o(t, r) &&
        !n.o(e, r) &&
        Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
  }),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    n(666);
})();
