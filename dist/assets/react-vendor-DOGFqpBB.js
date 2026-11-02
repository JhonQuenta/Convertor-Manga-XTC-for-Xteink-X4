function po(t, n) {
  for (var e = 0; e < n.length; e++) {
    const o = n[e];
    if (typeof o != "string" && !Array.isArray(o)) {
      for (const r in o)
        if (r !== "default" && !(r in t)) {
          const s = Object.getOwnPropertyDescriptor(o, r);
          s && Object.defineProperty(t, r, s.get ? s : { enumerable: !0, get: () => o[r] });
        }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }));
}
function mo(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var ye = { exports: {} },
  Dt = {};
var rn;
function go() {
  if (rn) return Dt;
  rn = 1;
  var t = Symbol.for("react.transitional.element"),
    n = Symbol.for("react.fragment");
  function e(o, r, s) {
    var u = null;
    if ((s !== void 0 && (u = "" + s), r.key !== void 0 && (u = "" + r.key), "key" in r)) {
      s = {};
      for (var c in r) c !== "key" && (s[c] = r[c]);
    } else s = r;
    return ((r = s.ref), { $$typeof: t, type: o, key: u, ref: r !== void 0 ? r : null, props: s });
  }
  return ((Dt.Fragment = n), (Dt.jsx = e), (Dt.jsxs = e), Dt);
}
var sn;
function yo() {
  return (sn || ((sn = 1), (ye.exports = go())), ye.exports);
}
var C = yo(),
  ve = { exports: {} };
function vo(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Dn = { exports: {} },
  H = (Dn.exports = {}),
  rt,
  st;
function Ie() {
  throw new Error("setTimeout has not been defined");
}
function Oe() {
  throw new Error("clearTimeout has not been defined");
}
(function () {
  try {
    typeof setTimeout == "function" ? (rt = setTimeout) : (rt = Ie);
  } catch {
    rt = Ie;
  }
  try {
    typeof clearTimeout == "function" ? (st = clearTimeout) : (st = Oe);
  } catch {
    st = Oe;
  }
})();
function Bn(t) {
  if (rt === setTimeout) return setTimeout(t, 0);
  if ((rt === Ie || !rt) && setTimeout) return ((rt = setTimeout), setTimeout(t, 0));
  try {
    return rt(t, 0);
  } catch {
    try {
      return rt.call(null, t, 0);
    } catch {
      return rt.call(this, t, 0);
    }
  }
}
function _o(t) {
  if (st === clearTimeout) return clearTimeout(t);
  if ((st === Oe || !st) && clearTimeout) return ((st = clearTimeout), clearTimeout(t));
  try {
    return st(t);
  } catch {
    try {
      return st.call(null, t);
    } catch {
      return st.call(this, t);
    }
  }
}
var ut = [],
  Tt = !1,
  _t,
  Xt = -1;
function So() {
  !Tt || !_t || ((Tt = !1), _t.length ? (ut = _t.concat(ut)) : (Xt = -1), ut.length && Nn());
}
function Nn() {
  if (!Tt) {
    var t = Bn(So);
    Tt = !0;
    for (var n = ut.length; n;) {
      for (_t = ut, ut = []; ++Xt < n;) _t && _t[Xt].run();
      ((Xt = -1), (n = ut.length));
    }
    ((_t = null), (Tt = !1), _o(t));
  }
}
H.nextTick = function (t) {
  var n = new Array(arguments.length - 1);
  if (arguments.length > 1) for (var e = 1; e < arguments.length; e++) n[e - 1] = arguments[e];
  (ut.push(new Fn(t, n)), ut.length === 1 && !Tt && Bn(Nn));
};
function Fn(t, n) {
  ((this.fun = t), (this.array = n));
}
Fn.prototype.run = function () {
  this.fun.apply(null, this.array);
};
H.title = "browser";
H.browser = !0;
H.env = {};
H.argv = [];
H.version = "";
H.versions = {};
function ft() {}
H.on = ft;
H.addListener = ft;
H.once = ft;
H.off = ft;
H.removeListener = ft;
H.removeAllListeners = ft;
H.emit = ft;
H.prependListener = ft;
H.prependOnceListener = ft;
H.listeners = function (t) {
  return [];
};
H.binding = function (t) {
  throw new Error("process.binding is not supported");
};
H.cwd = function () {
  return "/";
};
H.chdir = function (t) {
  throw new Error("process.chdir is not supported");
};
H.umask = function () {
  return 0;
};
var Po = Dn.exports;
const _e = vo(Po);
var O = {},
  an;
function Ro() {
  if (an) return O;
  an = 1;
  var t = Symbol.for("react.transitional.element"),
    n = Symbol.for("react.portal"),
    e = Symbol.for("react.fragment"),
    o = Symbol.for("react.strict_mode"),
    r = Symbol.for("react.profiler"),
    s = Symbol.for("react.consumer"),
    u = Symbol.for("react.context"),
    c = Symbol.for("react.forward_ref"),
    a = Symbol.for("react.suspense"),
    i = Symbol.for("react.memo"),
    l = Symbol.for("react.lazy"),
    f = Symbol.for("react.activity"),
    d = Symbol.iterator;
  function h(p) {
    return p === null || typeof p != "object"
      ? null
      : ((p = (d && p[d]) || p["@@iterator"]), typeof p == "function" ? p : null);
  }
  var m = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    g = Object.assign,
    y = {};
  function _(p, v, k) {
    ((this.props = p), (this.context = v), (this.refs = y), (this.updater = k || m));
  }
  ((_.prototype.isReactComponent = {}),
    (_.prototype.setState = function (p, v) {
      if (typeof p != "object" && typeof p != "function" && p != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, p, v, "setState");
    }),
    (_.prototype.forceUpdate = function (p) {
      this.updater.enqueueForceUpdate(this, p, "forceUpdate");
    }));
  function R() {}
  R.prototype = _.prototype;
  function x(p, v, k) {
    ((this.props = p), (this.context = v), (this.refs = y), (this.updater = k || m));
  }
  var P = (x.prototype = new R());
  ((P.constructor = x), g(P, _.prototype), (P.isPureReactComponent = !0));
  var j = Array.isArray;
  function T() {}
  var w = { H: null, A: null, T: null, S: null },
    S = Object.prototype.hasOwnProperty;
  function b(p, v, k) {
    var L = k.ref;
    return { $$typeof: t, type: p, key: v, ref: L !== void 0 ? L : null, props: k };
  }
  function D(p, v) {
    return b(p.type, v, p.props);
  }
  function M(p) {
    return typeof p == "object" && p !== null && p.$$typeof === t;
  }
  function A(p) {
    var v = { "=": "=0", ":": "=2" };
    return (
      "$" +
      p.replace(/[=:]/g, function (k) {
        return v[k];
      })
    );
  }
  var W = /\/+/g;
  function F(p, v) {
    return typeof p == "object" && p !== null && p.key != null ? A("" + p.key) : v.toString(36);
  }
  function nt(p) {
    switch (p.status) {
      case "fulfilled":
        return p.value;
      case "rejected":
        throw p.reason;
      default:
        switch (
          (typeof p.status == "string"
            ? p.then(T, T)
            : ((p.status = "pending"),
              p.then(
                function (v) {
                  p.status === "pending" && ((p.status = "fulfilled"), (p.value = v));
                },
                function (v) {
                  p.status === "pending" && ((p.status = "rejected"), (p.reason = v));
                },
              )),
          p.status)
        ) {
          case "fulfilled":
            return p.value;
          case "rejected":
            throw p.reason;
        }
    }
    throw p;
  }
  function V(p, v, k, L, I) {
    var B = typeof p;
    (B === "undefined" || B === "boolean") && (p = null);
    var N = !1;
    if (p === null) N = !0;
    else
      switch (B) {
        case "bigint":
        case "string":
        case "number":
          N = !0;
          break;
        case "object":
          switch (p.$$typeof) {
            case t:
            case n:
              N = !0;
              break;
            case l:
              return ((N = p._init), V(N(p._payload), v, k, L, I));
          }
      }
    if (N)
      return (
        (I = I(p)),
        (N = L === "" ? "." + F(p, 0) : L),
        j(I)
          ? ((k = ""),
            N != null && (k = N.replace(W, "$&/") + "/"),
            V(I, v, k, "", function (jt) {
              return jt;
            }))
          : I != null &&
            (M(I) &&
              (I = D(
                I,
                k +
                  (I.key == null || (p && p.key === I.key)
                    ? ""
                    : ("" + I.key).replace(W, "$&/") + "/") +
                  N,
              )),
            v.push(I)),
        1
      );
    N = 0;
    var q = L === "" ? "." : L + ":";
    if (j(p))
      for (var z = 0; z < p.length; z++) ((L = p[z]), (B = q + F(L, z)), (N += V(L, v, k, B, I)));
    else if (((z = h(p)), typeof z == "function"))
      for (p = z.call(p), z = 0; !(L = p.next()).done;)
        ((L = L.value), (B = q + F(L, z++)), (N += V(L, v, k, B, I)));
    else if (B === "object") {
      if (typeof p.then == "function") return V(nt(p), v, k, L, I);
      throw (
        (v = String(p)),
        Error(
          "Objects are not valid as a React child (found: " +
            (v === "[object Object]" ? "object with keys {" + Object.keys(p).join(", ") + "}" : v) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return N;
  }
  function ot(p, v, k) {
    if (p == null) return p;
    var L = [],
      I = 0;
    return (
      V(p, L, "", "", function (B) {
        return v.call(k, B, I++);
      }),
      L
    );
  }
  function Je(p) {
    if (p._status === -1) {
      var v = p._result;
      ((v = v()),
        v.then(
          function (k) {
            (p._status === 0 || p._status === -1) && ((p._status = 1), (p._result = k));
          },
          function (k) {
            (p._status === 0 || p._status === -1) && ((p._status = 2), (p._result = k));
          },
        ),
        p._status === -1 && ((p._status = 0), (p._result = v)));
    }
    if (p._status === 1) return p._result.default;
    throw p._result;
  }
  var me =
      typeof reportError == "function"
        ? reportError
        : function (p) {
            if (typeof window == "object" && typeof window.ErrorEvent == "function") {
              var v = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof p == "object" && p !== null && typeof p.message == "string"
                    ? String(p.message)
                    : String(p),
                error: p,
              });
              if (!window.dispatchEvent(v)) return;
            } else if (typeof _e == "object" && typeof _e.emit == "function") {
              _e.emit("uncaughtException", p);
              return;
            }
            console.error(p);
          },
    Vt = {
      map: ot,
      forEach: function (p, v, k) {
        ot(
          p,
          function () {
            v.apply(this, arguments);
          },
          k,
        );
      },
      count: function (p) {
        var v = 0;
        return (
          ot(p, function () {
            v++;
          }),
          v
        );
      },
      toArray: function (p) {
        return (
          ot(p, function (v) {
            return v;
          }) || []
        );
      },
      only: function (p) {
        if (!M(p))
          throw Error("React.Children.only expected to receive a single React element child.");
        return p;
      },
    };
  return (
    (O.Activity = f),
    (O.Children = Vt),
    (O.Component = _),
    (O.Fragment = e),
    (O.Profiler = r),
    (O.PureComponent = x),
    (O.StrictMode = o),
    (O.Suspense = a),
    (O.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w),
    (O.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (p) {
        return w.H.useMemoCache(p);
      },
    }),
    (O.cache = function (p) {
      return function () {
        return p.apply(null, arguments);
      };
    }),
    (O.cacheSignal = function () {
      return null;
    }),
    (O.cloneElement = function (p, v, k) {
      if (p == null) throw Error("The argument must be a React element, but you passed " + p + ".");
      var L = g({}, p.props),
        I = p.key;
      if (v != null)
        for (B in (v.key !== void 0 && (I = "" + v.key), v))
          !S.call(v, B) ||
            B === "key" ||
            B === "__self" ||
            B === "__source" ||
            (B === "ref" && v.ref === void 0) ||
            (L[B] = v[B]);
      var B = arguments.length - 2;
      if (B === 1) L.children = k;
      else if (1 < B) {
        for (var N = Array(B), q = 0; q < B; q++) N[q] = arguments[q + 2];
        L.children = N;
      }
      return b(p.type, I, L);
    }),
    (O.createContext = function (p) {
      return (
        (p = {
          $$typeof: u,
          _currentValue: p,
          _currentValue2: p,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (p.Provider = p),
        (p.Consumer = { $$typeof: s, _context: p }),
        p
      );
    }),
    (O.createElement = function (p, v, k) {
      var L,
        I = {},
        B = null;
      if (v != null)
        for (L in (v.key !== void 0 && (B = "" + v.key), v))
          S.call(v, L) && L !== "key" && L !== "__self" && L !== "__source" && (I[L] = v[L]);
      var N = arguments.length - 2;
      if (N === 1) I.children = k;
      else if (1 < N) {
        for (var q = Array(N), z = 0; z < N; z++) q[z] = arguments[z + 2];
        I.children = q;
      }
      if (p && p.defaultProps)
        for (L in ((N = p.defaultProps), N)) I[L] === void 0 && (I[L] = N[L]);
      return b(p, B, I);
    }),
    (O.createRef = function () {
      return { current: null };
    }),
    (O.forwardRef = function (p) {
      return { $$typeof: c, render: p };
    }),
    (O.isValidElement = M),
    (O.lazy = function (p) {
      return { $$typeof: l, _payload: { _status: -1, _result: p }, _init: Je };
    }),
    (O.memo = function (p, v) {
      return { $$typeof: i, type: p, compare: v === void 0 ? null : v };
    }),
    (O.startTransition = function (p) {
      var v = w.T,
        k = {};
      w.T = k;
      try {
        var L = p(),
          I = w.S;
        (I !== null && I(k, L),
          typeof L == "object" && L !== null && typeof L.then == "function" && L.then(T, me));
      } catch (B) {
        me(B);
      } finally {
        (v !== null && k.types !== null && (v.types = k.types), (w.T = v));
      }
    }),
    (O.unstable_useCacheRefresh = function () {
      return w.H.useCacheRefresh();
    }),
    (O.use = function (p) {
      return w.H.use(p);
    }),
    (O.useActionState = function (p, v, k) {
      return w.H.useActionState(p, v, k);
    }),
    (O.useCallback = function (p, v) {
      return w.H.useCallback(p, v);
    }),
    (O.useContext = function (p) {
      return w.H.useContext(p);
    }),
    (O.useDebugValue = function () {}),
    (O.useDeferredValue = function (p, v) {
      return w.H.useDeferredValue(p, v);
    }),
    (O.useEffect = function (p, v) {
      return w.H.useEffect(p, v);
    }),
    (O.useEffectEvent = function (p) {
      return w.H.useEffectEvent(p);
    }),
    (O.useId = function () {
      return w.H.useId();
    }),
    (O.useImperativeHandle = function (p, v, k) {
      return w.H.useImperativeHandle(p, v, k);
    }),
    (O.useInsertionEffect = function (p, v) {
      return w.H.useInsertionEffect(p, v);
    }),
    (O.useLayoutEffect = function (p, v) {
      return w.H.useLayoutEffect(p, v);
    }),
    (O.useMemo = function (p, v) {
      return w.H.useMemo(p, v);
    }),
    (O.useOptimistic = function (p, v) {
      return w.H.useOptimistic(p, v);
    }),
    (O.useReducer = function (p, v, k) {
      return w.H.useReducer(p, v, k);
    }),
    (O.useRef = function (p) {
      return w.H.useRef(p);
    }),
    (O.useState = function (p) {
      return w.H.useState(p);
    }),
    (O.useSyncExternalStore = function (p, v, k) {
      return w.H.useSyncExternalStore(p, v, k);
    }),
    (O.useTransition = function () {
      return w.H.useTransition();
    }),
    (O.version = "19.2.4"),
    O
  );
}
var cn;
function le() {
  return (cn || ((cn = 1), (ve.exports = Ro())), ve.exports);
}
var E = le();
const It = mo(E),
  wo = po({ __proto__: null, default: It }, [E]);
var Se = { exports: {} },
  G = {};
var un;
function xo() {
  if (un) return G;
  un = 1;
  var t = le();
  function n(a) {
    var i = "https://react.dev/errors/" + a;
    if (1 < arguments.length) {
      i += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++) i += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return (
      "Minified React error #" +
      a +
      "; visit " +
      i +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function e() {}
  var o = {
      d: {
        f: e,
        r: function () {
          throw Error(n(522));
        },
        D: e,
        C: e,
        L: e,
        m: e,
        X: e,
        S: e,
        M: e,
      },
      p: 0,
      findDOMNode: null,
    },
    r = Symbol.for("react.portal");
  function s(a, i, l) {
    var f = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: r,
      key: f == null ? null : "" + f,
      children: a,
      containerInfo: i,
      implementation: l,
    };
  }
  var u = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function c(a, i) {
    if (a === "font") return "";
    if (typeof i == "string") return i === "use-credentials" ? i : "";
  }
  return (
    (G.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
    (G.createPortal = function (a, i) {
      var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!i || (i.nodeType !== 1 && i.nodeType !== 9 && i.nodeType !== 11)) throw Error(n(299));
      return s(a, i, null, l);
    }),
    (G.flushSync = function (a) {
      var i = u.T,
        l = o.p;
      try {
        if (((u.T = null), (o.p = 2), a)) return a();
      } finally {
        ((u.T = i), (o.p = l), o.d.f());
      }
    }),
    (G.preconnect = function (a, i) {
      typeof a == "string" &&
        (i
          ? ((i = i.crossOrigin),
            (i = typeof i == "string" ? (i === "use-credentials" ? i : "") : void 0))
          : (i = null),
        o.d.C(a, i));
    }),
    (G.prefetchDNS = function (a) {
      typeof a == "string" && o.d.D(a);
    }),
    (G.preinit = function (a, i) {
      if (typeof a == "string" && i && typeof i.as == "string") {
        var l = i.as,
          f = c(l, i.crossOrigin),
          d = typeof i.integrity == "string" ? i.integrity : void 0,
          h = typeof i.fetchPriority == "string" ? i.fetchPriority : void 0;
        l === "style"
          ? o.d.S(a, typeof i.precedence == "string" ? i.precedence : void 0, {
              crossOrigin: f,
              integrity: d,
              fetchPriority: h,
            })
          : l === "script" &&
            o.d.X(a, {
              crossOrigin: f,
              integrity: d,
              fetchPriority: h,
              nonce: typeof i.nonce == "string" ? i.nonce : void 0,
            });
      }
    }),
    (G.preinitModule = function (a, i) {
      if (typeof a == "string")
        if (typeof i == "object" && i !== null) {
          if (i.as == null || i.as === "script") {
            var l = c(i.as, i.crossOrigin);
            o.d.M(a, {
              crossOrigin: l,
              integrity: typeof i.integrity == "string" ? i.integrity : void 0,
              nonce: typeof i.nonce == "string" ? i.nonce : void 0,
            });
          }
        } else i == null && o.d.M(a);
    }),
    (G.preload = function (a, i) {
      if (typeof a == "string" && typeof i == "object" && i !== null && typeof i.as == "string") {
        var l = i.as,
          f = c(l, i.crossOrigin);
        o.d.L(a, l, {
          crossOrigin: f,
          integrity: typeof i.integrity == "string" ? i.integrity : void 0,
          nonce: typeof i.nonce == "string" ? i.nonce : void 0,
          type: typeof i.type == "string" ? i.type : void 0,
          fetchPriority: typeof i.fetchPriority == "string" ? i.fetchPriority : void 0,
          referrerPolicy: typeof i.referrerPolicy == "string" ? i.referrerPolicy : void 0,
          imageSrcSet: typeof i.imageSrcSet == "string" ? i.imageSrcSet : void 0,
          imageSizes: typeof i.imageSizes == "string" ? i.imageSizes : void 0,
          media: typeof i.media == "string" ? i.media : void 0,
        });
      }
    }),
    (G.preloadModule = function (a, i) {
      if (typeof a == "string")
        if (i) {
          var l = c(i.as, i.crossOrigin);
          o.d.m(a, {
            as: typeof i.as == "string" && i.as !== "script" ? i.as : void 0,
            crossOrigin: l,
            integrity: typeof i.integrity == "string" ? i.integrity : void 0,
          });
        } else o.d.m(a);
    }),
    (G.requestFormReset = function (a) {
      o.d.r(a);
    }),
    (G.unstable_batchedUpdates = function (a, i) {
      return a(i);
    }),
    (G.useFormState = function (a, i, l) {
      return u.H.useFormState(a, i, l);
    }),
    (G.useFormStatus = function () {
      return u.H.useHostTransitionStatus();
    }),
    (G.version = "19.2.4"),
    G
  );
}
var ln;
function bo() {
  if (ln) return Se.exports;
  ln = 1;
  function t() {
    if (!(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    ))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (n) {
        console.error(n);
      }
  }
  return (t(), (Se.exports = xo()), Se.exports);
}
var U = ((t) => (
  (t[(t.None = 0)] = "None"),
  (t[(t.Mutable = 1)] = "Mutable"),
  (t[(t.Watching = 2)] = "Watching"),
  (t[(t.RecursedCheck = 4)] = "RecursedCheck"),
  (t[(t.Recursed = 8)] = "Recursed"),
  (t[(t.Dirty = 16)] = "Dirty"),
  (t[(t.Pending = 32)] = "Pending"),
  t
))(U || {});
function $n({ update: t, notify: n, unwatched: e }) {
  return { link: o, unlink: r, propagate: s, checkDirty: u, shallowPropagate: c };
  function o(i, l, f) {
    const d = l.depsTail;
    if (d !== void 0 && d.dep === i) return;
    const h = d !== void 0 ? d.nextDep : l.deps;
    if (h !== void 0 && h.dep === i) {
      ((h.version = f), (l.depsTail = h));
      return;
    }
    const m = i.subsTail;
    if (m !== void 0 && m.version === f && m.sub === l) return;
    const g =
      (l.depsTail =
      i.subsTail =
        { version: f, dep: i, sub: l, prevDep: d, nextDep: h, prevSub: m, nextSub: void 0 });
    (h !== void 0 && (h.prevDep = g),
      d !== void 0 ? (d.nextDep = g) : (l.deps = g),
      m !== void 0 ? (m.nextSub = g) : (i.subs = g));
  }
  function r(i, l = i.sub) {
    const f = i.dep,
      d = i.prevDep,
      h = i.nextDep,
      m = i.nextSub,
      g = i.prevSub;
    return (
      h !== void 0 ? (h.prevDep = d) : (l.depsTail = d),
      d !== void 0 ? (d.nextDep = h) : (l.deps = h),
      m !== void 0 ? (m.prevSub = g) : (f.subsTail = g),
      g !== void 0 ? (g.nextSub = m) : (f.subs = m) === void 0 && e(f),
      h
    );
  }
  function s(i) {
    let l = i.nextSub,
      f;
    t: do {
      const d = i.sub;
      let h = d.flags;
      if (
        (h & 60
          ? h & 12
            ? h & 4
              ? !(h & 48) && a(i, d)
                ? ((d.flags = h | 40), (h &= 1))
                : (h = 0)
              : (d.flags = (h & -9) | 32)
            : (h = 0)
          : (d.flags = h | 32),
        h & 2 && n(d),
        h & 1)
      ) {
        const m = d.subs;
        if (m !== void 0) {
          const g = (i = m).nextSub;
          g !== void 0 && ((f = { value: l, prev: f }), (l = g));
          continue;
        }
      }
      if ((i = l) !== void 0) {
        l = i.nextSub;
        continue;
      }
      for (; f !== void 0;)
        if (((i = f.value), (f = f.prev), i !== void 0)) {
          l = i.nextSub;
          continue t;
        }
      break;
    } while (!0);
  }
  function u(i, l) {
    let f,
      d = 0,
      h = !1;
    t: do {
      const m = i.dep,
        g = m.flags;
      if (l.flags & 16) h = !0;
      else if ((g & 17) === 17) {
        if (t(m)) {
          const y = m.subs;
          (y.nextSub !== void 0 && c(y), (h = !0));
        }
      } else if ((g & 33) === 33) {
        ((i.nextSub !== void 0 || i.prevSub !== void 0) && (f = { value: i, prev: f }),
          (i = m.deps),
          (l = m),
          ++d);
        continue;
      }
      if (!h) {
        const y = i.nextDep;
        if (y !== void 0) {
          i = y;
          continue;
        }
      }
      for (; d--;) {
        const y = l.subs,
          _ = y.nextSub !== void 0;
        if ((_ ? ((i = f.value), (f = f.prev)) : (i = y), h)) {
          if (t(l)) {
            (_ && c(y), (l = i.sub));
            continue;
          }
          h = !1;
        } else l.flags &= -33;
        l = i.sub;
        const R = i.nextDep;
        if (R !== void 0) {
          i = R;
          continue t;
        }
      }
      return h;
    } while (!0);
  }
  function c(i) {
    do {
      const l = i.sub,
        f = l.flags;
      (f & 48) === 32 && ((l.flags = f | 16), (f & 6) === 2 && n(l));
    } while ((i = i.nextSub) !== void 0);
  }
  function a(i, l) {
    let f = l.depsTail;
    for (; f !== void 0;) {
      if (f === i) return !0;
      f = f.prevDep;
    }
    return !1;
  }
}
let Ne = 0,
  vt = 0,
  Ut = 0;
const ct = [],
  {
    link: Cs,
    unlink: Un,
    propagate: Ls,
    checkDirty: Co,
    shallowPropagate: Es,
  } = $n({
    update(t) {
      return t.depsTail !== void 0 ? Mo(t) : ko(t);
    },
    notify(t) {
      let n = Ut,
        e = n;
      do
        if (((ct[n++] = t), (t.flags &= -3), (t = t.subs?.sub), t === void 0 || !(t.flags & 2)))
          break;
      while (!0);
      for (Ut = n; e < --n;) {
        const o = ct[e];
        ((ct[e++] = ct[n]), (ct[n] = o));
      }
    },
    unwatched(t) {
      t.flags & 1
        ? t.depsTail !== void 0 && ((t.depsTail = void 0), (t.flags = 17), fe(t))
        : Ao.call(t);
    },
  });
function getPendingFiles() {
  return Ne;
}
function Eo() {
  ++Ne;
}
function To() {
  --Ne || Oo();
}
function Mo(t) {
  ((t.depsTail = void 0), (t.flags = 5));
  try {
    const n = t.value;
    return n !== (t.value = t.getter(n));
  } finally {
    ((t.flags &= -5), fe(t));
  }
}
function ko(t) {
  return ((t.flags = 1), t.currentValue !== (t.currentValue = t.pendingValue));
}
function Io(t) {
  const n = t.flags;
  if (n & 16 || (n & 32 && Co(t.deps, t))) {
    ((t.depsTail = void 0), (t.flags = 6));
    try {
      t.fn();
    } finally {
      ((t.flags &= -5), fe(t));
    }
  } else t.flags = 2;
}
function Oo() {
  try {
    for (; vt < Ut;) {
      const t = ct[vt];
      ((ct[vt++] = void 0), Io(t));
    }
  } finally {
    for (; vt < Ut;) {
      const t = ct[vt];
      ((ct[vt++] = void 0), (t.flags |= 10));
    }
    ((vt = 0), (Ut = 0));
  }
}
function Ao() {
  ((this.depsTail = void 0), (this.flags = 0), fe(this));
  const t = this.subs;
  t !== void 0 && Un(t);
}
function fe(t) {
  const n = t.depsTail;
  let e = n !== void 0 ? n.nextDep : t.deps;
  for (; e !== void 0;) e = Un(e, t);
}
function Hn(t, n, e) {
  const o = typeof t == "object",
    r = o ? t : void 0;
  return {
    next: (o ? t.next : t)?.bind(r),
    error: (o ? t.error : n)?.bind(r),
    complete: (o ? t.complete : e)?.bind(r),
  };
}
const Ae = [];
let Qt = 0;
const {
  link: fn,
  unlink: jo,
  propagate: Do,
  checkDirty: Wn,
  shallowPropagate: dn,
} = $n({
  update(t) {
    return t._update();
  },
  notify(t) {
    ((Ae[je++] = t), (t.flags &= ~U.Watching));
  },
  unwatched(t) {
    t.depsTail !== void 0 && ((t.depsTail = void 0), (t.flags = U.Mutable | U.Dirty), ne(t));
  },
});
let Gt = 0,
  je = 0,
  it;
function ne(t) {
  const n = t.depsTail;
  let e = n !== void 0 ? n.nextDep : t.deps;
  for (; e !== void 0;) e = jo(e, t);
}
function zn() {
  if (!(getPendingFiles() > 0)) {
    for (; Gt < je;) {
      const t = Ae[Gt];
      ((Ae[Gt++] = void 0), t.notify());
    }
    ((Gt = 0), (je = 0));
  }
}
function Bo(t, n) {
  const e = typeof t == "function",
    o = t,
    r = {
      _snapshot: e ? void 0 : t,
      subs: void 0,
      subsTail: void 0,
      deps: void 0,
      depsTail: void 0,
      flags: e ? U.None : U.Mutable,
      get() {
        return (it !== void 0 && fn(r, it, Qt), r._snapshot);
      },
      subscribe(s) {
        const u = Hn(s),
          c = { current: !1 },
          a = No(() => {
            (r.get(), c.current ? u.next?.(r._snapshot) : (c.current = !0));
          });
        return {
          unsubscribe: () => {
            a.stop();
          },
        };
      },
      _update(s) {
        const u = it,
          c = Object.is;
        ((it = r), ++Qt, (r.depsTail = void 0), e && (r.flags = U.Mutable | U.RecursedCheck));
        try {
          const a = r._snapshot,
            i = typeof s == "function" ? s(a) : s === void 0 && e ? o(a) : s;
          return a === void 0 || !c(a, i) ? ((r._snapshot = i), !0) : !1;
        } finally {
          ((it = u), e && (r.flags &= ~U.RecursedCheck), ne(r));
        }
      },
    };
  return (
    e
      ? ((r.flags = U.Mutable | U.Dirty),
        (r.get = function () {
          const s = r.flags;
          if (s & U.Dirty || (s & U.Pending && Wn(r.deps, r))) {
            if (r._update()) {
              const u = r.subs;
              u !== void 0 && dn(u);
            }
          } else s & U.Pending && (r.flags = s & ~U.Pending);
          return (it !== void 0 && fn(r, it, Qt), r._snapshot);
        }))
      : (r.set = function (s) {
          if (r._update(s)) {
            const u = r.subs;
            u !== void 0 && (Do(u), dn(u), zn());
          }
        }),
    r
  );
}
function No(t) {
  const n = () => {
      const o = it;
      ((it = e), ++Qt, (e.depsTail = void 0), (e.flags = U.Watching | U.RecursedCheck));
      try {
        return t();
      } finally {
        ((it = o), (e.flags &= ~U.RecursedCheck), ne(e));
      }
    },
    e = {
      deps: void 0,
      depsTail: void 0,
      subs: void 0,
      subsTail: void 0,
      flags: U.Watching | U.RecursedCheck,
      notify() {
        const o = this.flags;
        o & U.Dirty || (o & U.Pending && Wn(this.deps, this)) ? n() : (this.flags = U.Watching);
      },
      stop() {
        ((this.flags = U.None), (this.depsTail = void 0), ne(this));
      },
    };
  return (n(), e);
}
class Fo {
  constructor(n) {
    this.atom = Bo(n);
  }
  setState(n) {
    this.atom.set(n);
  }
  get state() {
    return this.atom.get();
  }
  get() {
    return this.state;
  }
  subscribe(n) {
    return this.atom.subscribe(Hn(n));
  }
}
function $o(t) {
  try {
    (Eo(), t());
  } finally {
    (To(), zn());
  }
}
const mt = "__TSR_index",
  hn = "popstate",
  pn = "beforeunload";
function Uo(t) {
  let n = t.getLocation();
  const e = new Set(),
    o = (u) => {
      ((n = t.getLocation()), e.forEach((c) => c({ location: n, action: u })));
    },
    r = (u) => {
      (t.notifyOnIndexChange ?? !0) ? o(u) : (n = t.getLocation());
    },
    s = async ({ task: u, navigateOpts: c, ...a }) => {
      if (c?.ignoreBlocker ?? !1) {
        u();
        return;
      }
      const l = t.getBlockers?.() ?? [],
        f = a.type === "PUSH" || a.type === "REPLACE";
      if (typeof document < "u" && l.length && f)
        for (const d of l) {
          const h = oe(a.path, a.state);
          if (await d.blockerFn({ currentLocation: n, nextLocation: h, action: a.type })) {
            t.onBlocked?.();
            return;
          }
        }
      u();
    };
  return {
    get location() {
      return n;
    },
    get length() {
      return t.getLength();
    },
    subscribers: e,
    subscribe: (u) => (
      e.add(u),
      () => {
        e.delete(u);
      }
    ),
    push: (u, c, a) => {
      const i = n.state[mt];
      ((c = mn(i + 1, c)),
        s({
          task: () => {
            (t.pushState(u, c), o({ type: "PUSH" }));
          },
          navigateOpts: a,
          type: "PUSH",
          path: u,
          state: c,
        }));
    },
    replace: (u, c, a) => {
      const i = n.state[mt];
      ((c = mn(i, c)),
        s({
          task: () => {
            (t.replaceState(u, c), o({ type: "REPLACE" }));
          },
          navigateOpts: a,
          type: "REPLACE",
          path: u,
          state: c,
        }));
    },
    go: (u, c) => {
      s({
        task: () => {
          (t.go(u), r({ type: "GO", index: u }));
        },
        navigateOpts: c,
        type: "GO",
      });
    },
    back: (u) => {
      s({
        task: () => {
          (t.back(u?.ignoreBlocker ?? !1), r({ type: "BACK" }));
        },
        navigateOpts: u,
        type: "BACK",
      });
    },
    forward: (u) => {
      s({
        task: () => {
          (t.forward(u?.ignoreBlocker ?? !1), r({ type: "FORWARD" }));
        },
        navigateOpts: u,
        type: "FORWARD",
      });
    },
    canGoBack: () => n.state[mt] !== 0,
    createHref: (u) => t.createHref(u),
    block: (u) => {
      if (!t.setBlockers) return () => {};
      const c = t.getBlockers?.() ?? [];
      return (
        t.setBlockers([...c, u]),
        () => {
          const a = t.getBlockers?.() ?? [];
          t.setBlockers?.(a.filter((i) => i !== u));
        }
      );
    },
    flush: () => t.flush?.(),
    destroy: () => t.destroy?.(),
    notify: o,
  };
}
function mn(t, n) {
  n || (n = {});
  const e = Fe();
  return { ...n, key: e, __TSR_key: e, [mt]: t };
}
function Ho(t) {
  const n = typeof document < "u" ? window : void 0,
    e = n.history.pushState,
    o = n.history.replaceState;
  let r = [];
  const s = () => r,
    u = (S) => (r = S),
    c = (S) => S,
    a = () => oe(`${n.location.pathname}${n.location.search}${n.location.hash}`, n.history.state);
  if (!n.history.state?.__TSR_key && !n.history.state?.key) {
    const S = Fe();
    n.history.replaceState({ [mt]: 0, key: S, __TSR_key: S }, "");
  }
  let i = a(),
    l,
    f = !1,
    d = !1,
    h = !1,
    m = !1;
  const g = () => i;
  let y, _;
  const R = () => {
      y &&
        ((w._ignoreSubscribers = !0),
        (y.isPush ? n.history.pushState : n.history.replaceState)(y.state, "", y.href),
        (w._ignoreSubscribers = !1),
        (y = void 0),
        (_ = void 0),
        (l = void 0));
    },
    x = (S, b, D) => {
      const M = c(b);
      (_ || (l = i),
        (i = oe(b, D)),
        (y = { href: M, state: D, isPush: y?.isPush || S === "push" }),
        _ || (_ = Promise.resolve().then(() => R())));
    },
    P = (S) => {
      ((i = a()), w.notify({ type: S }));
    },
    j = async () => {
      if (d) {
        d = !1;
        return;
      }
      const S = a(),
        b = S.state[mt] - i.state[mt],
        D = b === 1,
        M = b === -1,
        A = (!D && !M) || f;
      f = !1;
      const W = A ? "GO" : M ? "BACK" : "FORWARD",
        F = A ? { type: "GO", index: b } : { type: M ? "BACK" : "FORWARD" };
      if (h) h = !1;
      else {
        const nt = s();
        if (typeof document < "u" && nt.length) {
          for (const V of nt)
            if (await V.blockerFn({ currentLocation: i, nextLocation: S, action: W })) {
              ((d = !0), n.history.go(1), w.notify(F));
              return;
            }
        }
      }
      ((i = a()), w.notify(F));
    },
    T = (S) => {
      if (m) {
        m = !1;
        return;
      }
      let b = !1;
      const D = s();
      if (typeof document < "u" && D.length)
        for (const M of D) {
          const A = M.enableBeforeUnload ?? !0;
          if (A === !0) {
            b = !0;
            break;
          }
          if (typeof A == "function" && A() === !0) {
            b = !0;
            break;
          }
        }
      if (b) return (S.preventDefault(), (S.returnValue = ""));
    },
    w = Uo({
      getLocation: g,
      getLength: () => n.history.length,
      pushState: (S, b) => x("push", S, b),
      replaceState: (S, b) => x("replace", S, b),
      back: (S) => (S && (h = !0), (m = !0), n.history.back()),
      forward: (S) => {
        (S && (h = !0), (m = !0), n.history.forward());
      },
      go: (S) => {
        ((f = !0), n.history.go(S));
      },
      createHref: (S) => c(S),
      flush: R,
      destroy: () => {
        ((n.history.pushState = e),
          (n.history.replaceState = o),
          n.removeEventListener(pn, T, { capture: !0 }),
          n.removeEventListener(hn, j));
      },
      onBlocked: () => {
        l && i !== l && (i = l);
      },
      getBlockers: s,
      setBlockers: u,
      notifyOnIndexChange: !1,
    });
  return (
    n.addEventListener(pn, T, { capture: !0 }),
    n.addEventListener(hn, j),
    (n.history.pushState = function (...S) {
      const b = e.apply(n.history, S);
      return (w._ignoreSubscribers || P("PUSH"), b);
    }),
    (n.history.replaceState = function (...S) {
      const b = o.apply(n.history, S);
      return (w._ignoreSubscribers || P("REPLACE"), b);
    }),
    w
  );
}
function Wo(t) {
  let n = t.replace(/[\x00-\x1f\x7f]/g, "");
  return (n.startsWith("//") && (n = "/" + n.replace(/^\/+/, "")), n);
}
function oe(t, n) {
  const e = Wo(t),
    o = e.indexOf("#"),
    r = e.indexOf("?"),
    s = Fe();
  return {
    href: e,
    pathname: e.substring(0, o > 0 ? (r > 0 ? Math.min(o, r) : o) : r > 0 ? r : e.length),
    hash: o > -1 ? e.substring(o) : "",
    search: r > -1 ? e.slice(r, o === -1 ? void 0 : o) : "",
    state: n || { [mt]: 0, key: s, __TSR_key: s },
  };
}
function Fe() {
  return (Math.random() + 1).toString(36).substring(7);
}
const zo = !1;
function Ht(t) {
  let n;
  return (
    $o(() => {
      n = t();
    }),
    n
  );
}
function Wt(t) {
  return t[t.length - 1];
}
function Vo(t) {
  return typeof t == "function";
}
function ht(t, n) {
  return Vo(t) ? t(n) : t;
}
const Ko = Object.prototype.hasOwnProperty,
  gn = Object.prototype.propertyIsEnumerable;
function Y(t, n, e = 0) {
  if (t === n) return t;
  if (e > 500) return n;
  const o = n,
    r = _n(t) && _n(o);
  if (!r && !(re(t) && re(o))) return o;
  const s = r ? t : yn(t);
  if (!s) return o;
  const u = r ? o : yn(o);
  if (!u) return o;
  const c = s.length,
    a = u.length,
    i = r ? new Array(a) : {};
  let l = 0;
  for (let f = 0; f < a; f++) {
    const d = r ? f : u[f],
      h = t[d],
      m = o[d];
    if (h === m) {
      ((i[d] = h), (r ? f < c : Ko.call(t, d)) && l++);
      continue;
    }
    if (h === null || m === null || typeof h != "object" || typeof m != "object") {
      i[d] = m;
      continue;
    }
    const g = Y(h, m, e + 1);
    ((i[d] = g), g === h && l++);
  }
  return c === a && l === c ? t : i;
}
function yn(t) {
  const n = Object.getOwnPropertyNames(t);
  for (const r of n) if (!gn.call(t, r)) return !1;
  const e = Object.getOwnPropertySymbols(t);
  if (e.length === 0) return n;
  const o = n;
  for (const r of e) {
    if (!gn.call(t, r)) return !1;
    o.push(r);
  }
  return o;
}
function re(t) {
  if (!vn(t)) return !1;
  const n = t.constructor;
  if (typeof n > "u") return !0;
  const e = n.prototype;
  return !(!vn(e) || !e.hasOwnProperty("isPrototypeOf"));
}
function vn(t) {
  return Object.prototype.toString.call(t) === "[object Object]";
}
function _n(t) {
  return Array.isArray(t) && t.length === Object.keys(t).length;
}
function Rt(t, n, e) {
  if (t === n) return !0;
  if (typeof t != typeof n) return !1;
  if (Array.isArray(t) && Array.isArray(n)) {
    if (t.length !== n.length) return !1;
    for (let o = 0, r = t.length; o < r; o++) if (!Rt(t[o], n[o], e)) return !1;
    return !0;
  }
  if (re(t) && re(n)) {
    const o = e?.ignoreUndefined ?? !0;
    if (e?.partial) {
      for (const u in n) if ((!o || n[u] !== void 0) && !Rt(t[u], n[u], e)) return !1;
      return !0;
    }
    let r = 0;
    if (!o) r = Object.keys(t).length;
    else for (const u in t) t[u] !== void 0 && r++;
    let s = 0;
    for (const u in n) if ((!o || n[u] !== void 0) && (s++, s > r || !Rt(t[u], n[u], e))) return !1;
    return r === s;
  }
  return !1;
}
function Ot(t) {
  let n, e;
  const o = new Promise((r, s) => {
    ((n = r), (e = s));
  });
  return (
    (o.status = "pending"),
    (o.resolve = (r) => {
      ((o.status = "resolved"), (o.value = r), n(r), t?.(r));
    }),
    (o.reject = (r) => {
      ((o.status = "rejected"), e(r));
    }),
    o
  );
}
function qo(t) {
  return typeof t?.message != "string"
    ? !1
    : t.message.startsWith("Failed to fetch dynamically imported module") ||
        t.message.startsWith("error loading dynamically imported module") ||
        t.message.startsWith("Importing a module script failed");
}
function Mt(t) {
  return !!(t && typeof t == "object" && typeof t.then == "function");
}
function Go(t) {
  return t.replace(/[\x00-\x1f\x7f]/g, "");
}
function Sn(t) {
  let n;
  try {
    n = decodeURI(t);
  } catch {
    n = t.replaceAll(/%[0-9A-F]{2}/gi, (e) => {
      try {
        return decodeURI(e);
      } catch {
        return e;
      }
    });
  }
  return Go(n);
}
const Yo = ["http:", "https:", "mailto:", "tel:"];
function se(t, n) {
  if (!t) return !1;
  try {
    const e = new URL(t);
    return !n.has(e.protocol);
  } catch {
    return !1;
  }
}
function Bt(t) {
  if (!t) return { path: t, handledProtocolRelativeURL: !1 };
  if (!/[%\\\x00-\x1f\x7f]/.test(t) && !t.startsWith("//"))
    return { path: t, handledProtocolRelativeURL: !1 };
  const n = /%25|%5C/gi;
  let e = 0,
    o = "",
    r;
  for (; (r = n.exec(t)) !== null;) ((o += Sn(t.slice(e, r.index)) + r[0]), (e = n.lastIndex));
  o = o + Sn(e ? t.slice(e) : t);
  let s = !1;
  return (
    o.startsWith("//") && ((s = !0), (o = "/" + o.replace(/^\/+/, ""))),
    { path: o, handledProtocolRelativeURL: s }
  );
}
function Jo(t) {
  return /\s|[^\u0000-\u007F]/.test(t) ? t.replace(/\s|[^\u0000-\u007F]/gu, encodeURIComponent) : t;
}
var Xo = "Invariant failed";
function lt(t, n) {
  if (!t) throw new Error(Xo);
}
function ie(t) {
  const n = new Map();
  let e, o;
  const r = (s) => {
    s.next &&
      (s.prev
        ? ((s.prev.next = s.next),
          (s.next.prev = s.prev),
          (s.next = void 0),
          o && ((o.next = s), (s.prev = o)))
        : ((s.next.prev = void 0),
          (e = s.next),
          (s.next = void 0),
          o && ((s.prev = o), (o.next = s))),
      (o = s));
  };
  return {
    get(s) {
      const u = n.get(s);
      if (u) return (r(u), u.value);
    },
    set(s, u) {
      if (n.size >= t && e) {
        const a = e;
        (n.delete(a.key),
          a.next && ((e = a.next), (a.next.prev = void 0)),
          a === o && (o = void 0));
      }
      const c = n.get(s);
      if (c) ((c.value = u), r(c));
      else {
        const a = { key: s, value: u, prev: o };
        (o && (o.next = a), (o = a), e || (e = a), n.set(s, a));
      }
    },
    clear() {
      (n.clear(), (e = void 0), (o = void 0));
    },
  };
}
const At = 0,
  xt = 1,
  bt = 2,
  zt = 3,
  St = 4,
  Vn = 5;
function Qo(t) {
  const n = t.indexOf("{");
  if (n === -1) return null;
  const e = t.indexOf("}", n);
  return e === -1 || n + 1 >= t.length ? null : [n, e];
}
function $e(t, n, e = new Uint16Array(6)) {
  const o = t.indexOf("/", n),
    r = o === -1 ? t.length : o,
    s = t.substring(n, r);
  if (!s || !s.includes("$"))
    return ((e[0] = At), (e[1] = n), (e[2] = n), (e[3] = r), (e[4] = r), (e[5] = r), e);
  if (s === "$") {
    const c = t.length;
    return ((e[0] = bt), (e[1] = n), (e[2] = n), (e[3] = c), (e[4] = c), (e[5] = c), e);
  }
  if (s.charCodeAt(0) === 36)
    return ((e[0] = xt), (e[1] = n), (e[2] = n + 1), (e[3] = r), (e[4] = r), (e[5] = r), e);
  const u = Qo(s);
  if (u) {
    const [c, a] = u,
      i = s.charCodeAt(c + 1);
    if (i === 45) {
      if (c + 2 < s.length && s.charCodeAt(c + 2) === 36) {
        const l = c + 3,
          f = a;
        if (l < f)
          return (
            (e[0] = zt),
            (e[1] = n + c),
            (e[2] = n + l),
            (e[3] = n + f),
            (e[4] = n + a + 1),
            (e[5] = r),
            e
          );
      }
    } else if (i === 36) {
      const l = c + 1,
        f = c + 2;
      return f === a
        ? ((e[0] = bt),
          (e[1] = n + c),
          (e[2] = n + l),
          (e[3] = n + f),
          (e[4] = n + a + 1),
          (e[5] = t.length),
          e)
        : ((e[0] = xt),
          (e[1] = n + c),
          (e[2] = n + f),
          (e[3] = n + a),
          (e[4] = n + a + 1),
          (e[5] = r),
          e);
    }
  }
  return ((e[0] = At), (e[1] = n), (e[2] = n), (e[3] = r), (e[4] = r), (e[5] = r), e);
}
function de(t, n, e, o, r, s, u) {
  u?.(e);
  let c = o;
  {
    const a = e.fullPath ?? e.from,
      i = a.length,
      l = e.options?.caseSensitive ?? t,
      f = !!(e.options?.params?.parse && e.options?.skipRouteOnParseError?.params);
    for (; c < i;) {
      const h = $e(a, c, n);
      let m;
      const g = c,
        y = h[5];
      switch (((c = y + 1), s++, h[0])) {
        case At: {
          const R = a.substring(h[2], h[3]);
          if (l) {
            const x = r.static?.get(R);
            if (x) m = x;
            else {
              r.static ??= new Map();
              const P = Pt(e.fullPath ?? e.from);
              ((P.parent = r), (P.depth = s), (m = P), r.static.set(R, P));
            }
          } else {
            const x = R.toLowerCase(),
              P = r.staticInsensitive?.get(x);
            if (P) m = P;
            else {
              r.staticInsensitive ??= new Map();
              const j = Pt(e.fullPath ?? e.from);
              ((j.parent = r), (j.depth = s), (m = j), r.staticInsensitive.set(x, j));
            }
          }
          break;
        }
        case xt: {
          const R = a.substring(g, h[1]),
            x = a.substring(h[4], y),
            P = l && !!(R || x),
            j = R ? (P ? R : R.toLowerCase()) : void 0,
            T = x ? (P ? x : x.toLowerCase()) : void 0,
            w =
              !f &&
              r.dynamic?.find(
                (S) =>
                  !S.skipOnParamError && S.caseSensitive === P && S.prefix === j && S.suffix === T,
              );
          if (w) m = w;
          else {
            const S = Re(xt, e.fullPath ?? e.from, P, j, T);
            ((m = S), (S.depth = s), (S.parent = r), (r.dynamic ??= []), r.dynamic.push(S));
          }
          break;
        }
        case zt: {
          const R = a.substring(g, h[1]),
            x = a.substring(h[4], y),
            P = l && !!(R || x),
            j = R ? (P ? R : R.toLowerCase()) : void 0,
            T = x ? (P ? x : x.toLowerCase()) : void 0,
            w =
              !f &&
              r.optional?.find(
                (S) =>
                  !S.skipOnParamError && S.caseSensitive === P && S.prefix === j && S.suffix === T,
              );
          if (w) m = w;
          else {
            const S = Re(zt, e.fullPath ?? e.from, P, j, T);
            ((m = S), (S.parent = r), (S.depth = s), (r.optional ??= []), r.optional.push(S));
          }
          break;
        }
        case bt: {
          const R = a.substring(g, h[1]),
            x = a.substring(h[4], y),
            P = l && !!(R || x),
            j = R ? (P ? R : R.toLowerCase()) : void 0,
            T = x ? (P ? x : x.toLowerCase()) : void 0,
            w = Re(bt, e.fullPath ?? e.from, P, j, T);
          ((m = w), (w.parent = r), (w.depth = s), (r.wildcard ??= []), r.wildcard.push(w));
        }
      }
      r = m;
    }
    if (f && e.children && !e.isRoot && e.id && e.id.charCodeAt(e.id.lastIndexOf("/") + 1) === 95) {
      const h = Pt(e.fullPath ?? e.from);
      ((h.kind = Vn),
        (h.parent = r),
        s++,
        (h.depth = s),
        (r.pathless ??= []),
        r.pathless.push(h),
        (r = h));
    }
    const d = (e.path || !e.children) && !e.isRoot;
    if (d && a.endsWith("/")) {
      const h = Pt(e.fullPath ?? e.from);
      ((h.kind = St), (h.parent = r), s++, (h.depth = s), (r.index = h), (r = h));
    }
    ((r.parse = e.options?.params?.parse ?? null),
      (r.skipOnParamError = f),
      (r.parsingPriority = e.options?.skipRouteOnParseError?.priority ?? 0),
      d && !r.route && ((r.route = e), (r.fullPath = e.fullPath ?? e.from)));
  }
  if (e.children) for (const a of e.children) de(t, n, a, c, r, s, u);
}
function Pe(t, n) {
  if (t.skipOnParamError && !n.skipOnParamError) return -1;
  if (!t.skipOnParamError && n.skipOnParamError) return 1;
  if (t.skipOnParamError && n.skipOnParamError && (t.parsingPriority || n.parsingPriority))
    return n.parsingPriority - t.parsingPriority;
  if (t.prefix && n.prefix && t.prefix !== n.prefix) {
    if (t.prefix.startsWith(n.prefix)) return -1;
    if (n.prefix.startsWith(t.prefix)) return 1;
  }
  if (t.suffix && n.suffix && t.suffix !== n.suffix) {
    if (t.suffix.endsWith(n.suffix)) return -1;
    if (n.suffix.endsWith(t.suffix)) return 1;
  }
  return t.prefix && !n.prefix
    ? -1
    : !t.prefix && n.prefix
      ? 1
      : t.suffix && !n.suffix
        ? -1
        : !t.suffix && n.suffix
          ? 1
          : t.caseSensitive && !n.caseSensitive
            ? -1
            : !t.caseSensitive && n.caseSensitive
              ? 1
              : 0;
}
function dt(t) {
  if (t.pathless) for (const n of t.pathless) dt(n);
  if (t.static) for (const n of t.static.values()) dt(n);
  if (t.staticInsensitive) for (const n of t.staticInsensitive.values()) dt(n);
  if (t.dynamic?.length) {
    t.dynamic.sort(Pe);
    for (const n of t.dynamic) dt(n);
  }
  if (t.optional?.length) {
    t.optional.sort(Pe);
    for (const n of t.optional) dt(n);
  }
  if (t.wildcard?.length) {
    t.wildcard.sort(Pe);
    for (const n of t.wildcard) dt(n);
  }
}
function Pt(t) {
  return {
    kind: At,
    depth: 0,
    pathless: null,
    index: null,
    static: null,
    staticInsensitive: null,
    dynamic: null,
    optional: null,
    wildcard: null,
    route: null,
    fullPath: t,
    parent: null,
    parse: null,
    skipOnParamError: !1,
    parsingPriority: 0,
  };
}
function Re(t, n, e, o, r) {
  return {
    kind: t,
    depth: 0,
    pathless: null,
    index: null,
    static: null,
    staticInsensitive: null,
    dynamic: null,
    optional: null,
    wildcard: null,
    route: null,
    fullPath: n,
    parent: null,
    parse: null,
    skipOnParamError: !1,
    parsingPriority: 0,
    caseSensitive: e,
    prefix: o,
    suffix: r,
  };
}
function Zo(t, n) {
  const e = Pt("/"),
    o = new Uint16Array(6);
  for (const r of t) de(!1, o, r, 1, e, 0);
  (dt(e), (n.masksTree = e), (n.flatCache = ie(1e3)));
}
function tr(t, n) {
  t ||= "/";
  const e = n.flatCache.get(t);
  if (e) return e;
  const o = Ue(t, n.masksTree);
  return (n.flatCache.set(t, o), o);
}
function er(t, n, e, o, r) {
  ((t ||= "/"), (o ||= "/"));
  const s = n ? `case\0${t}` : t;
  let u = r.singleCache.get(s);
  if (!u) {
    u = Pt("/");
    const c = new Uint16Array(6);
    (de(n, c, { from: t }, 1, u, 0), r.singleCache.set(s, u));
  }
  return Ue(o, u, e);
}
function nr(t, n, e = !1) {
  const o = e ? t : `nofuzz\0${t}`,
    r = n.matchCache.get(o);
  if (r !== void 0) return r;
  t ||= "/";
  let s;
  try {
    s = Ue(t, n.segmentTree, e);
  } catch (u) {
    if (u instanceof URIError) s = null;
    else throw u;
  }
  return (s && (s.branch = sr(s.route)), n.matchCache.set(o, s), s);
}
function or(t) {
  return t === "/" ? t : t.replace(/\/{1,}$/, "");
}
function rr(t, n = !1, e) {
  const o = Pt(t.fullPath),
    r = new Uint16Array(6),
    s = {},
    u = {};
  let c = 0;
  return (
    de(n, r, t, 1, o, 0, (i) => {
      if (
        (e?.(i, c),
        lt(!(i.id in s), `Duplicate routes found with id: ${String(i.id)}`),
        (s[i.id] = i),
        c !== 0 && i.path)
      ) {
        const l = or(i.fullPath);
        (!u[l] || i.fullPath.endsWith("/")) && (u[l] = i);
      }
      c++;
    }),
    dt(o),
    {
      processedTree: {
        segmentTree: o,
        singleCache: ie(1e3),
        matchCache: ie(1e3),
        flatCache: null,
        masksTree: null,
      },
      routesById: s,
      routesByPath: u,
    }
  );
}
function Ue(t, n, e = !1) {
  const o = t.split("/"),
    r = ar(t, o, n, e);
  if (!r) return null;
  const [s] = Kn(t, o, r);
  return { route: r.node.route, rawParams: s, parsedParams: r.parsedParams };
}
function Kn(t, n, e) {
  const o = ir(e.node);
  let r = null;
  const s = {};
  let u = e.extract?.part ?? 0,
    c = e.extract?.node ?? 0,
    a = e.extract?.path ?? 0,
    i = e.extract?.segment ?? 0;
  for (; c < o.length; u++, c++, a++, i++) {
    const l = o[c];
    if (l.kind === St) break;
    if (l.kind === Vn) {
      (i--, u--, a--);
      continue;
    }
    const f = n[u],
      d = a;
    if ((f && (a += f.length), l.kind === xt)) {
      r ??= e.node.fullPath.split("/");
      const h = r[i],
        m = l.prefix?.length ?? 0;
      if (h.charCodeAt(m) === 123) {
        const y = l.suffix?.length ?? 0,
          _ = h.substring(m + 2, h.length - y - 1),
          R = f.substring(m, f.length - y);
        s[_] = decodeURIComponent(R);
      } else {
        const y = h.substring(1);
        s[y] = decodeURIComponent(f);
      }
    } else if (l.kind === zt) {
      if (e.skipped & (1 << c)) {
        (u--, (a = d - 1));
        continue;
      }
      r ??= e.node.fullPath.split("/");
      const h = r[i],
        m = l.prefix?.length ?? 0,
        g = l.suffix?.length ?? 0,
        y = h.substring(m + 3, h.length - g - 1),
        _ = l.suffix || l.prefix ? f.substring(m, f.length - g) : f;
      _ && (s[y] = decodeURIComponent(_));
    } else if (l.kind === bt) {
      const h = l,
        m = t.substring(d + (h.prefix?.length ?? 0), t.length - (h.suffix?.length ?? 0)),
        g = decodeURIComponent(m);
      ((s["*"] = g), (s._splat = g));
      break;
    }
  }
  return (
    e.rawParams && Object.assign(s, e.rawParams),
    [s, { part: u, node: c, path: a, segment: i }]
  );
}
function sr(t) {
  const n = [t];
  for (; t.parentRoute;) ((t = t.parentRoute), n.push(t));
  return (n.reverse(), n);
}
function ir(t) {
  const n = Array(t.depth + 1);
  do ((n[t.depth] = t), (t = t.parent));
  while (t);
  return n;
}
function ar(t, n, e, o) {
  if (t === "/" && e.index) return { node: e.index, skipped: 0 };
  const r = !Wt(n),
    s = r && t !== "/",
    u = n.length - (r ? 1 : 0),
    c = [{ node: e, index: 1, skipped: 0, depth: 1, statics: 1, dynamics: 0, optionals: 0 }];
  let a = null,
    i = null,
    l = null;
  for (; c.length;) {
    const f = c.pop(),
      { node: d, index: h, skipped: m, depth: g, statics: y, dynamics: _, optionals: R } = f;
    let { extract: x, rawParams: P, parsedParams: j } = f;
    if (d.skipOnParamError) {
      if (!we(t, n, f)) continue;
      ((P = f.rawParams), (x = f.extract), (j = f.parsedParams));
    }
    o && d.route && d.kind !== St && Nt(i, f) && (i = f);
    const T = h === u;
    if (
      T &&
      (d.route && !s && Nt(l, f) && (l = f), !d.optional && !d.wildcard && !d.index && !d.pathless)
    )
      continue;
    const w = T ? void 0 : n[h];
    let S;
    if (T && d.index) {
      const b = {
        node: d.index,
        index: h,
        skipped: m,
        depth: g + 1,
        statics: y,
        dynamics: _,
        optionals: R,
        extract: x,
        rawParams: P,
        parsedParams: j,
      };
      let D = !0;
      if ((d.index.skipOnParamError && (we(t, n, b) || (D = !1)), D)) {
        if (y === u && !_ && !R && !m) return b;
        Nt(l, b) && (l = b);
      }
    }
    if (d.wildcard && Nt(a, f))
      for (const b of d.wildcard) {
        const { prefix: D, suffix: M } = b;
        if (D && (T || !(b.caseSensitive ? w : (S ??= w.toLowerCase())).startsWith(D))) continue;
        if (M) {
          if (T) continue;
          const W = n.slice(h).join("/").slice(-M.length);
          if ((b.caseSensitive ? W : W.toLowerCase()) !== M) continue;
        }
        const A = {
          node: b,
          index: u,
          skipped: m,
          depth: g,
          statics: y,
          dynamics: _,
          optionals: R,
          extract: x,
          rawParams: P,
          parsedParams: j,
        };
        if (!(b.skipOnParamError && !we(t, n, A))) {
          a = A;
          break;
        }
      }
    if (d.optional) {
      const b = m | (1 << g),
        D = g + 1;
      for (let M = d.optional.length - 1; M >= 0; M--) {
        const A = d.optional[M];
        c.push({
          node: A,
          index: h,
          skipped: b,
          depth: D,
          statics: y,
          dynamics: _,
          optionals: R,
          extract: x,
          rawParams: P,
          parsedParams: j,
        });
      }
      if (!T)
        for (let M = d.optional.length - 1; M >= 0; M--) {
          const A = d.optional[M],
            { prefix: W, suffix: F } = A;
          if (W || F) {
            const nt = A.caseSensitive ? w : (S ??= w.toLowerCase());
            if ((W && !nt.startsWith(W)) || (F && !nt.endsWith(F))) continue;
          }
          c.push({
            node: A,
            index: h + 1,
            skipped: m,
            depth: D,
            statics: y,
            dynamics: _,
            optionals: R + 1,
            extract: x,
            rawParams: P,
            parsedParams: j,
          });
        }
    }
    if (!T && d.dynamic && w)
      for (let b = d.dynamic.length - 1; b >= 0; b--) {
        const D = d.dynamic[b],
          { prefix: M, suffix: A } = D;
        if (M || A) {
          const W = D.caseSensitive ? w : (S ??= w.toLowerCase());
          if ((M && !W.startsWith(M)) || (A && !W.endsWith(A))) continue;
        }
        c.push({
          node: D,
          index: h + 1,
          skipped: m,
          depth: g + 1,
          statics: y,
          dynamics: _ + 1,
          optionals: R,
          extract: x,
          rawParams: P,
          parsedParams: j,
        });
      }
    if (!T && d.staticInsensitive) {
      const b = d.staticInsensitive.get((S ??= w.toLowerCase()));
      b &&
        c.push({
          node: b,
          index: h + 1,
          skipped: m,
          depth: g + 1,
          statics: y + 1,
          dynamics: _,
          optionals: R,
          extract: x,
          rawParams: P,
          parsedParams: j,
        });
    }
    if (!T && d.static) {
      const b = d.static.get(w);
      b &&
        c.push({
          node: b,
          index: h + 1,
          skipped: m,
          depth: g + 1,
          statics: y + 1,
          dynamics: _,
          optionals: R,
          extract: x,
          rawParams: P,
          parsedParams: j,
        });
    }
    if (d.pathless) {
      const b = g + 1;
      for (let D = d.pathless.length - 1; D >= 0; D--) {
        const M = d.pathless[D];
        c.push({
          node: M,
          index: h,
          skipped: m,
          depth: b,
          statics: y,
          dynamics: _,
          optionals: R,
          extract: x,
          rawParams: P,
          parsedParams: j,
        });
      }
    }
  }
  if (l && a) return Nt(a, l) ? l : a;
  if (l) return l;
  if (a) return a;
  if (o && i) {
    let f = i.index;
    for (let h = 0; h < i.index; h++) f += n[h].length;
    const d = f === t.length ? "/" : t.slice(f);
    return ((i.rawParams ??= {}), (i.rawParams["**"] = decodeURIComponent(d)), i);
  }
  return null;
}
function we(t, n, e) {
  try {
    const [o, r] = Kn(t, n, e);
    ((e.rawParams = o), (e.extract = r));
    const s = e.node.parse(o);
    return ((e.parsedParams = Object.assign({}, e.parsedParams, s)), !0);
  } catch {
    return null;
  }
}
function Nt(t, n) {
  return t
    ? n.statics > t.statics ||
        (n.statics === t.statics &&
          (n.dynamics > t.dynamics ||
            (n.dynamics === t.dynamics &&
              (n.optionals > t.optionals ||
                (n.optionals === t.optionals &&
                  ((n.node.kind === St) > (t.node.kind === St) ||
                    ((n.node.kind === St) == (t.node.kind === St) && n.depth > t.depth)))))))
    : !0;
}
function Zt(t) {
  return He(t.filter((n) => n !== void 0).join("/"));
}
function He(t) {
  return t.replace(/\/{2,}/g, "/");
}
function qn(t) {
  return t === "/" ? t : t.replace(/^\/{1,}/, "");
}
function gt(t) {
  const n = t.length;
  return n > 1 && t[n - 1] === "/" ? t.replace(/\/{1,}$/, "") : t;
}
function Gn(t) {
  return gt(qn(t));
}
function ae(t, n) {
  return t?.endsWith("/") && t !== "/" && t !== `${n}/` ? t.slice(0, -1) : t;
}
function cr(t, n, e) {
  return ae(t, e) === ae(n, e);
}
function ur({ base: t, to: n, trailingSlash: e = "never", cache: o }) {
  const r = n.startsWith("/"),
    s = !r && n === ".";
  let u;
  if (o) {
    u = r ? n : s ? t : t + "\0" + n;
    const f = o.get(u);
    if (f) return f;
  }
  let c;
  if (s) c = t.split("/");
  else if (r) c = n.split("/");
  else {
    for (c = t.split("/"); c.length > 1 && Wt(c) === "";) c.pop();
    const f = n.split("/");
    for (let d = 0, h = f.length; d < h; d++) {
      const m = f[d];
      m === ""
        ? d
          ? d === h - 1 && c.push(m)
          : (c = [m])
        : m === ".."
          ? c.pop()
          : m === "." || c.push(m);
    }
  }
  c.length > 1 && (Wt(c) === "" ? e === "never" && c.pop() : e === "always" && c.push(""));
  let a,
    i = "";
  for (let f = 0; f < c.length; f++) {
    f > 0 && (i += "/");
    const d = c[f];
    if (!d) continue;
    a = $e(d, 0, a);
    const h = a[0];
    if (h === At) {
      i += d;
      continue;
    }
    const m = a[5],
      g = d.substring(0, a[1]),
      y = d.substring(a[4], m),
      _ = d.substring(a[2], a[3]);
    h === xt
      ? (i += g || y ? `${g}{$${_}}${y}` : `$${_}`)
      : h === bt
        ? (i += g || y ? `${g}{$}${y}` : "$")
        : (i += `${g}{-$${_}}${y}`);
  }
  i = He(i);
  const l = i || "/";
  return (u && o && o.set(u, l), l);
}
function lr(t) {
  const n = new Map(t.map((r) => [encodeURIComponent(r), r])),
    e = Array.from(n.keys())
      .map((r) => r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|"),
    o = new RegExp(e, "g");
  return (r) => r.replace(o, (s) => n.get(s) ?? s);
}
function xe(t, n, e) {
  const o = n[t];
  return typeof o != "string"
    ? o
    : t === "_splat"
      ? /^[a-zA-Z0-9\-._~!/]*$/.test(o)
        ? o
        : o
            .split("/")
            .map((r) => Rn(r, e))
            .join("/")
      : Rn(o, e);
}
function Pn({ path: t, params: n, decoder: e, ...o }) {
  let r = !1;
  const s = {};
  if (!t || t === "/") return { interpolatedPath: "/", usedParams: s, isMissingParams: r };
  if (!t.includes("$")) return { interpolatedPath: t, usedParams: s, isMissingParams: r };
  const u = t.length;
  let c = 0,
    a,
    i = "";
  for (; c < u;) {
    const f = c;
    a = $e(t, f, a);
    const d = a[5];
    if (((c = d + 1), f === d)) continue;
    const h = a[0];
    if (h === At) {
      i += "/" + t.substring(f, d);
      continue;
    }
    if (h === bt) {
      const m = n._splat;
      ((s._splat = m), (s["*"] = m));
      const g = t.substring(f, a[1]),
        y = t.substring(a[4], d);
      if (!m) {
        ((r = !0), (g || y) && (i += "/" + g + y));
        continue;
      }
      const _ = xe("_splat", n, e);
      i += "/" + g + _ + y;
      continue;
    }
    if (h === xt) {
      const m = t.substring(a[2], a[3]);
      (!r && !(m in n) && (r = !0), (s[m] = n[m]));
      const g = t.substring(f, a[1]),
        y = t.substring(a[4], d),
        _ = xe(m, n, e) ?? "undefined";
      i += "/" + g + _ + y;
      continue;
    }
    if (h === zt) {
      const m = t.substring(a[2], a[3]),
        g = n[m];
      if (g == null) continue;
      s[m] = g;
      const y = t.substring(f, a[1]),
        _ = t.substring(a[4], d),
        R = xe(m, n, e) ?? "";
      i += "/" + y + R + _;
      continue;
    }
  }
  return (
    t.endsWith("/") && (i += "/"),
    { usedParams: s, interpolatedPath: i || "/", isMissingParams: r }
  );
}
function Rn(t, n) {
  const e = encodeURIComponent(t);
  return n?.(e) ?? e;
}
function J(t) {
  return !!t?.isNotFound;
}
function fr() {
  try {
    if (typeof window < "u" && typeof window.sessionStorage == "object")
      return window.sessionStorage;
  } catch {}
}
const De = "tsr-scroll-restoration-v1_3",
  dr = (t, n) => {
    let e;
    return (...o) => {
      e ||
        (e = setTimeout(() => {
          (t(...o), (e = null));
        }, n));
    };
  };
function hr() {
  const t = fr();
  if (!t) return null;
  const n = t.getItem(De);
  let e = n ? JSON.parse(n) : {};
  return {
    state: e,
    set: (o) => {
      e = ht(o, e) || e;
      try {
        t.setItem(De, JSON.stringify(e));
      } catch {
        console.warn("[ts-router] Could not persist scroll restoration state to sessionStorage.");
      }
    },
  };
}
const Yt = hr(),
  pr = (t) => t.state.__TSR_key || t.href;
function mr(t) {
  const n = [];
  let e;
  for (; (e = t.parentNode);)
    (n.push(`${t.tagName}:nth-child(${Array.prototype.indexOf.call(e.children, t) + 1})`), (t = e));
  return `${n.reverse().join(" > ")}`.toLowerCase();
}
let ce = !1;
function gr({
  storageKey: t,
  key: n,
  behavior: e,
  shouldScrollRestoration: o,
  scrollToTopSelectors: r,
  location: s,
}) {
  let u;
  try {
    u = JSON.parse(sessionStorage.getItem(t) || "{}");
  } catch (i) {
    console.error(i);
    return;
  }
  const c = n || window.history.state?.__TSR_key,
    a = u[c];
  ce = !0;
  t: {
    if (o && a && Object.keys(a).length > 0) {
      for (const f in a) {
        const d = a[f];
        if (f === "window") window.scrollTo({ top: d.scrollY, left: d.scrollX, behavior: e });
        else if (f) {
          const h = document.querySelector(f);
          h && ((h.scrollLeft = d.scrollX), (h.scrollTop = d.scrollY));
        }
      }
      break t;
    }
    const i = (s ?? window.location).hash.split("#", 2)[1];
    if (i) {
      const f = window.history.state?.__hashScrollIntoViewOptions ?? !0;
      if (f) {
        const d = document.getElementById(i);
        d && d.scrollIntoView(f);
      }
      break t;
    }
    const l = { top: 0, left: 0, behavior: e };
    if ((window.scrollTo(l), r))
      for (const f of r) {
        if (f === "window") continue;
        const d = typeof f == "function" ? f() : document.querySelector(f);
        d && d.scrollTo(l);
      }
  }
  ce = !1;
}
function yr(t, n) {
  if (
    !Yt ||
    ((t.options.scrollRestoration ?? !1) && (t.isScrollRestoring = !0),
    t.isScrollRestorationSetup || !Yt)
  )
    return;
  ((t.isScrollRestorationSetup = !0), (ce = !1));
  const o = t.options.getScrollRestorationKey || pr;
  window.history.scrollRestoration = "manual";
  const r = (s) => {
    if (ce || !t.isScrollRestoring) return;
    let u = "";
    if (s.target === document || s.target === window) u = "window";
    else {
      const a = s.target.getAttribute("data-scroll-restoration-id");
      a ? (u = `[data-scroll-restoration-id="${a}"]`) : (u = mr(s.target));
    }
    const c = o(t.state.location);
    Yt.set((a) => {
      const i = (a[c] ||= {}),
        l = (i[u] ||= {});
      if (u === "window") ((l.scrollX = window.scrollX || 0), (l.scrollY = window.scrollY || 0));
      else if (u) {
        const f = document.querySelector(u);
        f && ((l.scrollX = f.scrollLeft || 0), (l.scrollY = f.scrollTop || 0));
      }
      return a;
    });
  };
  (typeof document < "u" && document.addEventListener("scroll", dr(r, 100), !0),
    t.subscribe("onRendered", (s) => {
      const u = o(s.toLocation);
      if (!t.resetNextScroll) {
        t.resetNextScroll = !0;
        return;
      }
      (typeof t.options.scrollRestoration == "function" &&
        !t.options.scrollRestoration({ location: t.latestLocation })) ||
        (gr({
          storageKey: De,
          key: u,
          behavior: t.options.scrollRestorationBehavior,
          shouldScrollRestoration: t.isScrollRestoring,
          scrollToTopSelectors: t.options.scrollToTopSelectors,
          location: t.history.location,
        }),
        t.isScrollRestoring && Yt.set((c) => ((c[u] ||= {}), c)));
    }));
}
function vr(t) {
  if (typeof document < "u" && document.querySelector) {
    const n = t.state.location.state.__hashScrollIntoViewOptions ?? !0;
    if (n && t.state.location.hash !== "") {
      const e = document.getElementById(t.state.location.hash);
      e && e.scrollIntoView(n);
    }
  }
}
function _r(t, n = String) {
  const e = new URLSearchParams();
  for (const o in t) {
    const r = t[o];
    r !== void 0 && e.set(o, n(r));
  }
  return e.toString();
}
function be(t) {
  return t ? (t === "false" ? !1 : t === "true" ? !0 : +t * 0 === 0 && +t + "" === t ? +t : t) : "";
}
function Sr(t) {
  const n = new URLSearchParams(t),
    e = {};
  for (const [o, r] of n.entries()) {
    const s = e[o];
    s == null ? (e[o] = be(r)) : Array.isArray(s) ? s.push(be(r)) : (e[o] = [s, be(r)]);
  }
  return e;
}
const Pr = wr(JSON.parse),
  Rr = xr(JSON.stringify, JSON.parse);
function wr(t) {
  return (n) => {
    n[0] === "?" && (n = n.substring(1));
    const e = Sr(n);
    for (const o in e) {
      const r = e[o];
      if (typeof r == "string")
        try {
          e[o] = t(r);
        } catch {}
    }
    return e;
  };
}
function xr(t, n) {
  const e = typeof n == "function";
  function o(r) {
    if (typeof r == "object" && r !== null)
      try {
        return t(r);
      } catch {}
    else if (e && typeof r == "string")
      try {
        return (n(r), t(r));
      } catch {}
    return r;
  }
  return (r) => {
    const s = _r(r, o);
    return s ? `?${s}` : "";
  };
}
const X = "__root__";
function br(t) {
  if (
    ((t.statusCode = t.statusCode || t.code || 307),
    !t._builtLocation && !t.reloadDocument && typeof t.href == "string")
  )
    try {
      (new URL(t.href), (t.reloadDocument = !0));
    } catch {}
  const n = new Headers(t.headers);
  t.href && n.get("Location") === null && n.set("Location", t.href);
  const e = new Response(null, { status: t.statusCode, headers: n });
  if (((e.options = t), t.throw)) throw e;
  return e;
}
function Q(t) {
  return t instanceof Response && !!t.options;
}
const te = (t) => {
    if (!t.rendered) return ((t.rendered = !0), t.onReady?.());
  },
  he = (t, n) => !!(t.preload && !t.router.state.matches.some((e) => e.id === n)),
  kt = (t, n, e = !0) => {
    const o = { ...(t.router.options.context ?? {}) },
      r = e ? n : n - 1;
    for (let s = 0; s <= r; s++) {
      const u = t.matches[s];
      if (!u) continue;
      const c = t.router.getMatch(u.id);
      c && Object.assign(o, c.__routeContext, c.__beforeLoadContext);
    }
    return o;
  },
  Yn = (t, n, e) => {
    const o = t.router.routesById[n.routeId ?? ""] ?? t.router.routeTree;
    !o.options.notFoundComponent &&
      t.router.options?.defaultNotFoundComponent &&
      (o.options.notFoundComponent = t.router.options.defaultNotFoundComponent);
    const r = e === "BEFORE_LOAD" && o.parentRoute;
    r || lt(o.options.notFoundComponent);
    const s = t.matches.find((u) => u.routeId === o.id);
    (lt(s, "Could not find match for route: " + o.id),
      t.updateMatch(s.id, (u) => ({ ...u, status: "notFound", error: n, isFetching: !1 })),
      r && ((n.routeId = o.parentRoute.id), Yn(t, n, e)));
  },
  pt = (t, n, e, o) => {
    if (!(!Q(e) && !J(e))) {
      if (Q(e) && e.redirectHandled && !e.options.reloadDocument) throw e;
      if (n) {
        (n._nonReactive.beforeLoadPromise?.resolve(),
          n._nonReactive.loaderPromise?.resolve(),
          (n._nonReactive.beforeLoadPromise = void 0),
          (n._nonReactive.loaderPromise = void 0));
        const r = Q(e) ? "redirected" : "notFound";
        ((n._nonReactive.error = e),
          t.updateMatch(n.id, (s) => ({
            ...s,
            status: r,
            context: kt(t, n.index),
            isFetching: !1,
            error: e,
          })),
          J(e) && !e.routeId && (e.routeId = n.routeId),
          n._nonReactive.loadPromise?.resolve());
      }
      throw Q(e)
        ? ((t.rendered = !0),
          (e.options._fromLocation = t.location),
          (e.redirectHandled = !0),
          (e = t.router.resolveRedirect(e)),
          e)
        : (Yn(t, e, o), e);
    }
  },
  Jn = (t, n) => !!t.router.getMatch(n)._nonReactive.dehydrated,
  Ft = (t, n, e, o) => {
    const { id: r, routeId: s } = t.matches[n],
      u = t.router.looseRoutesById[s];
    if (e instanceof Promise) throw e;
    ((e.routerCode = o), (t.firstBadMatchIndex ??= n), pt(t, t.router.getMatch(r), e, o));
    try {
      u.options.onError?.(e);
    } catch (c) {
      ((e = c), pt(t, t.router.getMatch(r), e, o));
    }
    t.updateMatch(
      r,
      (c) => (
        c._nonReactive.beforeLoadPromise?.resolve(),
        (c._nonReactive.beforeLoadPromise = void 0),
        c._nonReactive.loadPromise?.resolve(),
        {
          ...c,
          error: e,
          status: "error",
          isFetching: !1,
          updatedAt: Date.now(),
          abortController: new AbortController(),
        }
      ),
    );
  },
  Xn = (t, n, e, o) => {
    if (o._nonReactive.pendingTimeout !== void 0) return;
    const r = e.options.pendingMs ?? t.router.options.defaultPendingMs;
    if (!!(
      t.onReady &&
      !he(t, n) &&
      (e.options.loader || e.options.beforeLoad || to(e)) &&
      typeof r == "number" &&
      r !== 1 / 0 &&
      (e.options.pendingComponent ?? t.router.options?.defaultPendingComponent)
    )) {
      const u = setTimeout(() => {
        te(t);
      }, r);
      o._nonReactive.pendingTimeout = u;
    }
  },
  Cr = (t, n, e) => {
    const o = t.router.getMatch(n);
    if (!o._nonReactive.beforeLoadPromise && !o._nonReactive.loaderPromise) return;
    Xn(t, n, e, o);
    const r = () => {
      const s = t.router.getMatch(n);
      s.preload && (s.status === "redirected" || s.status === "notFound") && pt(t, s, s.error);
    };
    return o._nonReactive.beforeLoadPromise ? o._nonReactive.beforeLoadPromise.then(r) : r();
  },
  Lr = (t, n, e, o) => {
    const r = t.router.getMatch(n),
      s = r._nonReactive.loadPromise;
    r._nonReactive.loadPromise = Ot(() => {
      s?.resolve();
    });
    const { paramsError: u, searchError: c } = r;
    (u && Ft(t, e, u, "PARSE_PARAMS"), c && Ft(t, e, c, "VALIDATE_SEARCH"), Xn(t, n, o, r));
    const a = new AbortController();
    let i = !1;
    const l = () => {
        i ||
          ((i = !0),
          t.updateMatch(n, (P) => ({
            ...P,
            isFetching: "beforeLoad",
            fetchCount: P.fetchCount + 1,
            abortController: a,
          })));
      },
      f = () => {
        (r._nonReactive.beforeLoadPromise?.resolve(),
          (r._nonReactive.beforeLoadPromise = void 0),
          t.updateMatch(n, (P) => ({ ...P, isFetching: !1 })));
      };
    if (!o.options.beforeLoad) {
      Ht(() => {
        (l(), f());
      });
      return;
    }
    r._nonReactive.beforeLoadPromise = Ot();
    const d = { ...kt(t, e, !1), ...r.__routeContext },
      { search: h, params: m, cause: g } = r,
      y = he(t, n),
      _ = {
        search: h,
        abortController: a,
        params: m,
        preload: y,
        context: d,
        location: t.location,
        navigate: (P) => t.router.navigate({ ...P, _fromLocation: t.location }),
        buildLocation: t.router.buildLocation,
        cause: y ? "preload" : g,
        matches: t.matches,
        routeId: o.id,
        ...t.router.options.additionalContext,
      },
      R = (P) => {
        if (P === void 0) {
          Ht(() => {
            (l(), f());
          });
          return;
        }
        ((Q(P) || J(P)) && (l(), Ft(t, e, P, "BEFORE_LOAD")),
          Ht(() => {
            (l(), t.updateMatch(n, (j) => ({ ...j, __beforeLoadContext: P })), f());
          }));
      };
    let x;
    try {
      if (((x = o.options.beforeLoad(_)), Mt(x)))
        return (
          l(),
          x
            .catch((P) => {
              Ft(t, e, P, "BEFORE_LOAD");
            })
            .then(R)
        );
    } catch (P) {
      (l(), Ft(t, e, P, "BEFORE_LOAD"));
    }
    R(x);
  },
  Er = (t, n) => {
    const { id: e, routeId: o } = t.matches[n],
      r = t.router.looseRoutesById[o],
      s = () => c(),
      u = () => Lr(t, e, n, r),
      c = () => {
        if (Jn(t, e)) return;
        const a = Cr(t, e, r);
        return Mt(a) ? a.then(u) : u();
      };
    return s();
  },
  Tr = (t, n, e) => {
    const o = t.router.getMatch(n);
    if (!o || (!e.options.head && !e.options.scripts && !e.options.headers)) return;
    const r = {
      ssr: t.router.options.ssr,
      matches: t.matches,
      match: o,
      params: o.params,
      loaderData: o.loaderData,
    };
    return Promise.all([e.options.head?.(r), e.options.scripts?.(r), e.options.headers?.(r)]).then(
      ([s, u, c]) => {
        const a = s?.meta,
          i = s?.links,
          l = s?.scripts,
          f = s?.styles;
        return { meta: a, links: i, headScripts: l, headers: c, scripts: u, styles: f };
      },
    );
  },
  Qn = (t, n, e, o) => {
    const r = t.matchPromises[e - 1],
      { params: s, loaderDeps: u, abortController: c, cause: a } = t.router.getMatch(n),
      i = kt(t, e),
      l = he(t, n);
    return {
      params: s,
      deps: u,
      preload: !!l,
      parentMatchPromise: r,
      abortController: c,
      context: i,
      location: t.location,
      navigate: (f) => t.router.navigate({ ...f, _fromLocation: t.location }),
      cause: l ? "preload" : a,
      route: o,
      ...t.router.options.additionalContext,
    };
  },
  wn = async (t, n, e, o) => {
    try {
      const r = t.router.getMatch(n);
      try {
        (!(zo ?? t.router.isServer) || r.ssr === !0) && Zn(o);
        const s = o.options.loader?.(Qn(t, n, e, o)),
          u = o.options.loader && Mt(s);
        if (
          ((u ||
            o._lazyPromise ||
            o._componentsPromise ||
            o.options.head ||
            o.options.scripts ||
            o.options.headers ||
            r._nonReactive.minPendingPromise) &&
            t.updateMatch(n, (i) => ({ ...i, isFetching: "loader" })),
          o.options.loader)
        ) {
          const i = u ? await s : s;
          (pt(t, t.router.getMatch(n), i),
            i !== void 0 && t.updateMatch(n, (l) => ({ ...l, loaderData: i })));
        }
        o._lazyPromise && (await o._lazyPromise);
        const a = r._nonReactive.minPendingPromise;
        (a && (await a),
          o._componentsPromise && (await o._componentsPromise),
          t.updateMatch(n, (i) => ({
            ...i,
            error: void 0,
            context: kt(t, e),
            status: "success",
            isFetching: !1,
            updatedAt: Date.now(),
          })));
      } catch (s) {
        let u = s;
        if (u?.name === "AbortError") {
          if (r.abortController.signal.aborted) {
            (r._nonReactive.loaderPromise?.resolve(), (r._nonReactive.loaderPromise = void 0));
            return;
          }
          t.updateMatch(n, (a) => ({
            ...a,
            status: a.status === "pending" ? "success" : a.status,
            isFetching: !1,
            context: kt(t, e),
          }));
          return;
        }
        const c = r._nonReactive.minPendingPromise;
        (c && (await c),
          J(s) && (await o.options.notFoundComponent?.preload?.()),
          pt(t, t.router.getMatch(n), s));
        try {
          o.options.onError?.(s);
        } catch (a) {
          ((u = a), pt(t, t.router.getMatch(n), a));
        }
        t.updateMatch(n, (a) => ({
          ...a,
          error: u,
          context: kt(t, e),
          status: "error",
          isFetching: !1,
        }));
      }
    } catch (r) {
      const s = t.router.getMatch(n);
      (s && (s._nonReactive.loaderPromise = void 0), pt(t, s, r));
    }
  },
  Mr = async (t, n) => {
    async function e(l, f, d, h) {
      const m = Date.now() - f.updatedAt,
        g = l
          ? (h.options.preloadStaleTime ?? t.router.options.defaultPreloadStaleTime ?? 3e4)
          : (h.options.staleTime ?? t.router.options.defaultStaleTime ?? 0),
        y = h.options.shouldReload,
        _ = typeof y == "function" ? y(Qn(t, o, n, h)) : y,
        { status: R, invalid: x } = d;
      ((s = R === "success" && (x || (_ ?? m > g))),
        (l && h.options.preload === !1) ||
          (s && !t.sync
            ? ((u = !0),
              (async () => {
                try {
                  await wn(t, o, n, h);
                  const P = t.router.getMatch(o);
                  (P._nonReactive.loaderPromise?.resolve(),
                    P._nonReactive.loadPromise?.resolve(),
                    (P._nonReactive.loaderPromise = void 0));
                } catch (P) {
                  Q(P) && (await t.router.navigate(P.options));
                }
              })())
            : (R !== "success" || (s && t.sync)) && (await wn(t, o, n, h))));
    }
    const { id: o, routeId: r } = t.matches[n];
    let s = !1,
      u = !1;
    const c = t.router.looseRoutesById[r];
    if (!Jn(t, o)) {
      const l = t.router.getMatch(o),
        f = he(t, o);
      if (l._nonReactive.loaderPromise) {
        if (l.status === "success" && !t.sync && !l.preload) return l;
        await l._nonReactive.loaderPromise;
        const d = t.router.getMatch(o),
          h = d._nonReactive.error || d.error;
        (h && pt(t, d, h), d.status === "pending" && (await e(f, l, d, c)));
      } else {
        const d = f && !t.router.state.matches.some((m) => m.id === o),
          h = t.router.getMatch(o);
        ((h._nonReactive.loaderPromise = Ot()),
          d !== h.preload && t.updateMatch(o, (m) => ({ ...m, preload: d })),
          await e(f, l, h, c));
      }
    }
    const a = t.router.getMatch(o);
    (u || (a._nonReactive.loaderPromise?.resolve(), a._nonReactive.loadPromise?.resolve()),
      clearTimeout(a._nonReactive.pendingTimeout),
      (a._nonReactive.pendingTimeout = void 0),
      u || (a._nonReactive.loaderPromise = void 0),
      (a._nonReactive.dehydrated = void 0));
    const i = u ? a.isFetching : !1;
    return i !== a.isFetching || a.invalid !== !1
      ? (t.updateMatch(o, (l) => ({ ...l, isFetching: i, invalid: !1 })), t.router.getMatch(o))
      : a;
  };
async function xn(t) {
  const n = Object.assign(t, { matchPromises: [] });
  n.router.state.matches.some((e) => e._forcePending) && te(n);
  try {
    for (let c = 0; c < n.matches.length; c++) {
      const a = Er(n, c);
      Mt(a) && (await a);
    }
    const e = n.firstBadMatchIndex ?? n.matches.length;
    for (let c = 0; c < e; c++) n.matchPromises.push(Mr(n, c));
    const r = (await Promise.allSettled(n.matchPromises))
      .filter((c) => c.status === "rejected")
      .map((c) => c.reason);
    let s;
    for (const c of r) {
      if (Q(c)) throw c;
      !s && J(c) && (s = c);
    }
    for (const c of n.matches) {
      const { id: a, routeId: i } = c,
        l = n.router.looseRoutesById[i];
      try {
        const f = Tr(n, a, l);
        if (f) {
          const d = await f;
          n.updateMatch(a, (h) => ({ ...h, ...d }));
        }
      } catch (f) {
        console.error(`Error executing head for route ${i}:`, f);
      }
    }
    if (s) throw s;
    const u = te(n);
    Mt(u) && (await u);
  } catch (e) {
    if (J(e) && !n.preload) {
      const o = te(n);
      throw (Mt(o) && (await o), e);
    }
    if (Q(e)) throw e;
  }
  return n.matches;
}
async function Zn(t) {
  if (
    (!t._lazyLoaded &&
      t._lazyPromise === void 0 &&
      (t.lazyFn
        ? (t._lazyPromise = t.lazyFn().then((n) => {
            const { id: e, ...o } = n.options;
            (Object.assign(t.options, o), (t._lazyLoaded = !0), (t._lazyPromise = void 0));
          }))
        : (t._lazyLoaded = !0)),
    !t._componentsLoaded && t._componentsPromise === void 0)
  ) {
    const n = () => {
      const e = [];
      for (const o of eo) {
        const r = t.options[o]?.preload;
        r && e.push(r());
      }
      if (e.length)
        return Promise.all(e).then(() => {
          ((t._componentsLoaded = !0), (t._componentsPromise = void 0));
        });
      ((t._componentsLoaded = !0), (t._componentsPromise = void 0));
    };
    t._componentsPromise = t._lazyPromise ? t._lazyPromise.then(n) : n();
  }
  return t._componentsPromise;
}
function to(t) {
  for (const n of eo) if (t.options[n]?.preload) return !0;
  return !1;
}
const eo = ["component", "errorComponent", "pendingComponent", "notFoundComponent"];
function kr(t) {
  return {
    input: ({ url: n }) => {
      for (const e of t) n = Be(e, n);
      return n;
    },
    output: ({ url: n }) => {
      for (let e = t.length - 1; e >= 0; e--) n = no(t[e], n);
      return n;
    },
  };
}
function Ir(t) {
  const n = Gn(t.basepath),
    e = `/${n}`,
    o = `${e}/`,
    r = t.caseSensitive ? e : e.toLowerCase(),
    s = t.caseSensitive ? o : o.toLowerCase();
  return {
    input: ({ url: u }) => {
      const c = t.caseSensitive ? u.pathname : u.pathname.toLowerCase();
      return (
        c === r ? (u.pathname = "/") : c.startsWith(s) && (u.pathname = u.pathname.slice(e.length)),
        u
      );
    },
    output: ({ url: u }) => ((u.pathname = Zt(["/", n, u.pathname])), u),
  };
}
function Be(t, n) {
  const e = t?.input?.({ url: n });
  if (e) {
    if (typeof e == "string") return new URL(e);
    if (e instanceof URL) return e;
  }
  return n;
}
function no(t, n) {
  const e = t?.output?.({ url: n });
  if (e) {
    if (typeof e == "string") return new URL(e);
    if (e instanceof URL) return e;
  }
  return n;
}
function wt(t) {
  const n = t.resolvedLocation,
    e = t.location,
    o = n?.pathname !== e.pathname,
    r = n?.href !== e.href,
    s = n?.hash !== e.hash;
  return { fromLocation: n, toLocation: e, pathChanged: o, hrefChanged: r, hashChanged: s };
}
function Or(t) {
  const n = t.filter((e) => e.status !== "redirected");
  return n.length === t.length ? t : n;
}
class Ar {
  constructor(n) {
    ((this.tempLocationKey = `${Math.round(Math.random() * 1e7)}`),
      (this.resetNextScroll = !0),
      (this.shouldViewTransition = void 0),
      (this.isViewTransitionTypesSupported = void 0),
      (this.subscribers = new Set()),
      (this.isScrollRestoring = !1),
      (this.isScrollRestorationSetup = !1),
      (this.startTransition = (e) => e()),
      (this.update = (e) => {
        const o = this.options,
          r = this.basepath ?? o?.basepath ?? "/",
          s = this.basepath === void 0,
          u = o?.rewrite;
        if (
          ((this.options = { ...o, ...e }),
          (this.isServer = this.options.isServer ?? typeof document > "u"),
          (this.protocolAllowlist = new Set(this.options.protocolAllowlist)),
          this.options.pathParamsAllowedCharacters &&
            (this.pathParamsDecoder = lr(this.options.pathParamsAllowedCharacters)),
          (!this.history || (this.options.history && this.options.history !== this.history)) &&
            (this.options.history ? (this.history = this.options.history) : (this.history = Ho())),
          (this.origin = this.options.origin),
          this.origin ||
            (window?.origin && window.origin !== "null"
              ? (this.origin = window.origin)
              : (this.origin = "http://localhost")),
          this.history && this.updateLatestLocation(),
          this.options.routeTree !== this.routeTree)
        ) {
          this.routeTree = this.options.routeTree;
          let d;
          ((this.resolvePathCache = ie(1e3)), (d = this.buildRouteTree()), this.setRoutes(d));
        }
        !this.__store &&
          this.latestLocation &&
          ((this.__store = new Fo(Dr(this.latestLocation))), yr(this));
        let c = !1;
        const a = this.options.basepath ?? "/",
          i = this.options.rewrite;
        if (s || r !== a || u !== i) {
          this.basepath = a;
          const d = [],
            h = Gn(a);
          (h && h !== "/" && d.push(Ir({ basepath: a })),
            i && d.push(i),
            (this.rewrite = d.length === 0 ? void 0 : d.length === 1 ? d[0] : kr(d)),
            this.history && this.updateLatestLocation(),
            (c = !0));
        }
        (c &&
          this.__store &&
          this.__store.setState((d) => ({ ...d, location: this.latestLocation })),
          typeof window < "u" &&
            "CSS" in window &&
            typeof window.CSS?.supports == "function" &&
            (this.isViewTransitionTypesSupported = window.CSS.supports(
              "selector(:active-view-transition-type(a)",
            )));
      }),
      (this.updateLatestLocation = () => {
        this.latestLocation = this.parseLocation(this.history.location, this.latestLocation);
      }),
      (this.buildRouteTree = () => {
        const e = rr(this.routeTree, this.options.caseSensitive, (o, r) => {
          o.init({ originalIndex: r });
        });
        return (this.options.routeMasks && Zo(this.options.routeMasks, e.processedTree), e);
      }),
      (this.subscribe = (e, o) => {
        const r = { eventType: e, fn: o };
        return (
          this.subscribers.add(r),
          () => {
            this.subscribers.delete(r);
          }
        );
      }),
      (this.emit = (e) => {
        this.subscribers.forEach((o) => {
          o.eventType === e.type && o.fn(e);
        });
      }),
      (this.parseLocation = (e, o) => {
        const r = ({ pathname: a, search: i, hash: l, href: f, state: d }) => {
            if (!this.rewrite && !/[ \x00-\x1f\x7f\u0080-\uffff]/.test(a)) {
              const R = this.options.parseSearch(i),
                x = this.options.stringifySearch(R);
              return {
                href: a + x + l,
                publicHref: f,
                pathname: Bt(a).path,
                external: !1,
                searchStr: x,
                search: Y(o?.search, R),
                hash: Bt(l.slice(1)).path,
                state: Y(o?.state, d),
              };
            }
            const h = new URL(f, this.origin),
              m = Be(this.rewrite, h),
              g = this.options.parseSearch(m.search),
              y = this.options.stringifySearch(g);
            return (
              (m.search = y),
              {
                href: m.href.replace(m.origin, ""),
                publicHref: f,
                pathname: Bt(m.pathname).path,
                external: !!this.rewrite && m.origin !== this.origin,
                searchStr: y,
                search: Y(o?.search, g),
                hash: Bt(m.hash.slice(1)).path,
                state: Y(o?.state, d),
              }
            );
          },
          s = r(e),
          { __tempLocation: u, __tempKey: c } = s.state;
        if (u && (!c || c === this.tempLocationKey)) {
          const a = r(u);
          return (
            (a.state.key = s.state.key),
            (a.state.__TSR_key = s.state.__TSR_key),
            delete a.state.__tempLocation,
            { ...a, maskedLocation: s }
          );
        }
        return s;
      }),
      (this.resolvePathWithBase = (e, o) =>
        ur({
          base: e,
          to: He(o),
          trailingSlash: this.options.trailingSlash,
          cache: this.resolvePathCache,
        })),
      (this.matchRoutes = (e, o, r) =>
        typeof e == "string"
          ? this.matchRoutesInternal({ pathname: e, search: o }, r)
          : this.matchRoutesInternal(e, o)),
      (this.getMatchedRoutes = (e) =>
        Br({ pathname: e, routesById: this.routesById, processedTree: this.processedTree })),
      (this.cancelMatch = (e) => {
        const o = this.getMatch(e);
        o &&
          (o.abortController.abort(),
          clearTimeout(o._nonReactive.pendingTimeout),
          (o._nonReactive.pendingTimeout = void 0));
      }),
      (this.cancelMatches = () => {
        const e = this.state.matches.filter((s) => s.status === "pending"),
          o = this.state.matches.filter((s) => s.isFetching === "loader");
        new Set([...(this.state.pendingMatches ?? []), ...e, ...o]).forEach((s) => {
          this.cancelMatch(s.id);
        });
      }),
      (this.buildLocation = (e) => {
        const o = (s = {}) => {
            const u = s._fromLocation || this.pendingBuiltLocation || this.latestLocation,
              c = this.matchRoutesLightweight(u);
            s.from;
            const a = s.unsafeRelative === "path" ? u.pathname : (s.from ?? c.fullPath),
              i = this.resolvePathWithBase(a, "."),
              l = c.search,
              f = { ...c.params },
              d = s.to ? this.resolvePathWithBase(i, `${s.to}`) : this.resolvePathWithBase(i, "."),
              h =
                s.params === !1 || s.params === null
                  ? {}
                  : (s.params ?? !0) === !0
                    ? f
                    : Object.assign(f, ht(s.params, f)),
              m = this.getMatchedRoutes(d);
            let g = m.matchedRoutes;
            if (
              ((!m.foundRoute || (m.foundRoute.path !== "/" && m.routeParams["**"])) &&
                this.options.notFoundRoute &&
                (g = [...g, this.options.notFoundRoute]),
              Object.keys(h).length > 0)
            )
              for (const M of g) {
                const A = M.options.params?.stringify ?? M.options.stringifyParams;
                if (A)
                  try {
                    Object.assign(h, A(h));
                  } catch {}
              }
            const _ = e.leaveParams
              ? d
              : Bt(
                  Pn({ path: d, params: h, decoder: this.pathParamsDecoder, server: this.isServer })
                    .interpolatedPath,
                ).path;
            let R = l;
            if (e._includeValidateSearch && this.options.search?.strict) {
              const M = {};
              (g.forEach((A) => {
                if (A.options.validateSearch)
                  try {
                    Object.assign(M, ee(A.options.validateSearch, { ...M, ...R }));
                  } catch {}
              }),
                (R = M));
            }
            ((R = Nr({
              search: R,
              dest: s,
              destRoutes: g,
              _includeValidateSearch: e._includeValidateSearch,
            })),
              (R = Y(l, R)));
            const x = this.options.stringifySearch(R),
              P = s.hash === !0 ? u.hash : s.hash ? ht(s.hash, u.hash) : void 0,
              j = P ? `#${P}` : "";
            let T = s.state === !0 ? u.state : s.state ? ht(s.state, u.state) : {};
            T = Y(u.state, T);
            const w = `${_}${x}${j}`;
            let S,
              b,
              D = !1;
            if (this.rewrite) {
              const M = new URL(w, this.origin),
                A = no(this.rewrite, M);
              ((S = M.href.replace(M.origin, "")),
                A.origin !== this.origin
                  ? ((b = A.href), (D = !0))
                  : (b = A.pathname + A.search + A.hash));
            } else ((S = Jo(w)), (b = S));
            return {
              publicHref: b,
              href: S,
              pathname: _,
              search: R,
              searchStr: x,
              state: T,
              hash: P ?? "",
              external: D,
              unmaskOnReload: s.unmaskOnReload,
            };
          },
          r = (s = {}, u) => {
            const c = o(s);
            let a = u ? o(u) : void 0;
            if (!a) {
              const i = {};
              if (this.options.routeMasks) {
                const l = tr(c.pathname, this.processedTree);
                if (l) {
                  Object.assign(i, l.rawParams);
                  const { from: f, params: d, ...h } = l.route,
                    m =
                      d === !1 || d === null
                        ? {}
                        : (d ?? !0) === !0
                          ? i
                          : Object.assign(i, ht(d, i));
                  ((u = { from: e.from, ...h, params: m }), (a = o(u)));
                }
              }
            }
            return (a && (c.maskedLocation = a), c);
          };
        return e.mask ? r(e, { from: e.from, ...e.mask }) : r(e);
      }),
      (this.commitLocation = async ({ viewTransition: e, ignoreBlocker: o, ...r }) => {
        const s = () => {
            const a = ["key", "__TSR_key", "__TSR_index", "__hashScrollIntoViewOptions"];
            a.forEach((l) => {
              r.state[l] = this.latestLocation.state[l];
            });
            const i = Rt(r.state, this.latestLocation.state);
            return (
              a.forEach((l) => {
                delete r.state[l];
              }),
              i
            );
          },
          u = gt(this.latestLocation.href) === gt(r.href),
          c = this.commitLocationPromise;
        if (
          ((this.commitLocationPromise = Ot(() => {
            c?.resolve();
          })),
          u && s())
        )
          this.load();
        else {
          let { maskedLocation: a, hashScrollIntoView: i, ...l } = r;
          (a &&
            ((l = {
              ...a,
              state: {
                ...a.state,
                __tempKey: void 0,
                __tempLocation: {
                  ...l,
                  search: l.searchStr,
                  state: {
                    ...l.state,
                    __tempKey: void 0,
                    __tempLocation: void 0,
                    __TSR_key: void 0,
                    key: void 0,
                  },
                },
              },
            }),
            (l.unmaskOnReload ?? this.options.unmaskOnReload ?? !1) &&
              (l.state.__tempKey = this.tempLocationKey)),
            (l.state.__hashScrollIntoViewOptions =
              i ?? this.options.defaultHashScrollIntoView ?? !0),
            (this.shouldViewTransition = e),
            this.history[r.replace ? "replace" : "push"](l.publicHref, l.state, {
              ignoreBlocker: o,
            }));
        }
        return (
          (this.resetNextScroll = r.resetScroll ?? !0),
          this.history.subscribers.size || this.load(),
          this.commitLocationPromise
        );
      }),
      (this.buildAndCommitLocation = ({
        replace: e,
        resetScroll: o,
        hashScrollIntoView: r,
        viewTransition: s,
        ignoreBlocker: u,
        href: c,
        ...a
      } = {}) => {
        if (c) {
          const f = this.history.location.state.__TSR_index,
            d = oe(c, { __TSR_index: e ? f : f + 1 }),
            h = new URL(d.pathname, this.origin),
            m = Be(this.rewrite, h);
          ((a.to = m.pathname),
            (a.search = this.options.parseSearch(d.search)),
            (a.hash = d.hash.slice(1)));
        }
        const i = this.buildLocation({ ...a, _includeValidateSearch: !0 });
        this.pendingBuiltLocation = i;
        const l = this.commitLocation({
          ...i,
          viewTransition: s,
          replace: e,
          resetScroll: o,
          hashScrollIntoView: r,
          ignoreBlocker: u,
        });
        return (
          Promise.resolve().then(() => {
            this.pendingBuiltLocation === i && (this.pendingBuiltLocation = void 0);
          }),
          l
        );
      }),
      (this.navigate = async ({ to: e, reloadDocument: o, href: r, publicHref: s, ...u }) => {
        let c = !1;
        if (r)
          try {
            (new URL(`${r}`), (c = !0));
          } catch {}
        if ((c && !o && (o = !0), o)) {
          if (e !== void 0 || !r) {
            const i = this.buildLocation({ to: e, ...u });
            ((r = r ?? i.publicHref), (s = s ?? i.publicHref));
          }
          const a = !c && s ? s : r;
          if (se(a, this.protocolAllowlist)) return Promise.resolve();
          if (!u.ignoreBlocker) {
            const l = this.history.getBlockers?.() ?? [];
            for (const f of l)
              if (
                f?.blockerFn &&
                (await f.blockerFn({
                  currentLocation: this.latestLocation,
                  nextLocation: this.latestLocation,
                  action: "PUSH",
                }))
              )
                return Promise.resolve();
          }
          return (
            u.replace ? window.location.replace(a) : (window.location.href = a),
            Promise.resolve()
          );
        }
        return this.buildAndCommitLocation({ ...u, href: r, to: e, _isNavigate: !0 });
      }),
      (this.beforeLoad = () => {
        (this.cancelMatches(), this.updateLatestLocation());
        const e = this.matchRoutes(this.latestLocation);
        this.__store.setState((o) => ({
          ...o,
          status: "pending",
          statusCode: 200,
          isLoading: !0,
          location: this.latestLocation,
          pendingMatches: e,
          cachedMatches: o.cachedMatches.filter((r) => !e.some((s) => s.id === r.id)),
        }));
      }),
      (this.load = async (e) => {
        let o, r, s;
        for (
          s = new Promise((c) => {
            this.startTransition(async () => {
              try {
                this.beforeLoad();
                const a = this.latestLocation,
                  i = this.state.resolvedLocation;
                (this.state.redirect ||
                  this.emit({
                    type: "onBeforeNavigate",
                    ...wt({ resolvedLocation: i, location: a }),
                  }),
                  this.emit({ type: "onBeforeLoad", ...wt({ resolvedLocation: i, location: a }) }),
                  await xn({
                    router: this,
                    sync: e?.sync,
                    matches: this.state.pendingMatches,
                    location: a,
                    updateMatch: this.updateMatch,
                    onReady: async () => {
                      this.startTransition(() => {
                        this.startViewTransition(async () => {
                          let l = [],
                            f = [],
                            d = [];
                          (Ht(() => {
                            (this.__store.setState((h) => {
                              const m = h.matches,
                                g = h.pendingMatches || h.matches;
                              return (
                                (l = m.filter((y) => !g.some((_) => _.id === y.id))),
                                (f = g.filter((y) => !m.some((_) => _.id === y.id))),
                                (d = g.filter((y) => m.some((_) => _.id === y.id))),
                                {
                                  ...h,
                                  isLoading: !1,
                                  loadedAt: Date.now(),
                                  matches: g,
                                  pendingMatches: void 0,
                                  cachedMatches: [
                                    ...h.cachedMatches,
                                    ...l.filter(
                                      (y) =>
                                        y.status !== "error" &&
                                        y.status !== "notFound" &&
                                        y.status !== "redirected",
                                    ),
                                  ],
                                }
                              );
                            }),
                              this.clearExpiredCache());
                          }),
                            [
                              [l, "onLeave"],
                              [f, "onEnter"],
                              [d, "onStay"],
                            ].forEach(([h, m]) => {
                              h.forEach((g) => {
                                this.looseRoutesById[g.routeId].options[m]?.(g);
                              });
                            }));
                        });
                      });
                    },
                  }));
              } catch (a) {
                (Q(a)
                  ? ((o = a), this.navigate({ ...o.options, replace: !0, ignoreBlocker: !0 }))
                  : J(a) && (r = a),
                  this.__store.setState((i) => ({
                    ...i,
                    statusCode: o
                      ? o.status
                      : r
                        ? 404
                        : i.matches.some((l) => l.status === "error")
                          ? 500
                          : 200,
                    redirect: o,
                  })));
              }
              (this.latestLoadPromise === s &&
                (this.commitLocationPromise?.resolve(),
                (this.latestLoadPromise = void 0),
                (this.commitLocationPromise = void 0)),
                c());
            });
          }),
            this.latestLoadPromise = s,
            await s;
          this.latestLoadPromise && s !== this.latestLoadPromise;
        )
          await this.latestLoadPromise;
        let u;
        (this.hasNotFoundMatch()
          ? (u = 404)
          : this.__store.state.matches.some((c) => c.status === "error") && (u = 500),
          u !== void 0 && this.__store.setState((c) => ({ ...c, statusCode: u })));
      }),
      (this.startViewTransition = (e) => {
        const o = this.shouldViewTransition ?? this.options.defaultViewTransition;
        if (
          ((this.shouldViewTransition = void 0),
          o &&
            typeof document < "u" &&
            "startViewTransition" in document &&
            typeof document.startViewTransition == "function")
        ) {
          let r;
          if (typeof o == "object" && this.isViewTransitionTypesSupported) {
            const s = this.latestLocation,
              u = this.state.resolvedLocation,
              c =
                typeof o.types == "function"
                  ? o.types(wt({ resolvedLocation: u, location: s }))
                  : o.types;
            if (c === !1) {
              e();
              return;
            }
            r = { update: e, types: c };
          } else r = e;
          document.startViewTransition(r);
        } else e();
      }),
      (this.updateMatch = (e, o) => {
        this.startTransition(() => {
          const r = this.state.pendingMatches?.some((s) => s.id === e)
            ? "pendingMatches"
            : this.state.matches.some((s) => s.id === e)
              ? "matches"
              : this.state.cachedMatches.some((s) => s.id === e)
                ? "cachedMatches"
                : "";
          r &&
            (r === "cachedMatches"
              ? this.__store.setState((s) => ({
                  ...s,
                  cachedMatches: Or(s.cachedMatches.map((u) => (u.id === e ? o(u) : u))),
                }))
              : this.__store.setState((s) => ({
                  ...s,
                  [r]: s[r]?.map((u) => (u.id === e ? o(u) : u)),
                })));
        });
      }),
      (this.getMatch = (e) => {
        const o = (r) => r.id === e;
        return (
          this.state.cachedMatches.find(o) ??
          this.state.pendingMatches?.find(o) ??
          this.state.matches.find(o)
        );
      }),
      (this.invalidate = (e) => {
        const o = (r) =>
          (e?.filter?.(r) ?? !0)
            ? {
                ...r,
                invalid: !0,
                ...(e?.forcePending || r.status === "error" || r.status === "notFound"
                  ? { status: "pending", error: void 0 }
                  : void 0),
              }
            : r;
        return (
          this.__store.setState((r) => ({
            ...r,
            matches: r.matches.map(o),
            cachedMatches: r.cachedMatches.map(o),
            pendingMatches: r.pendingMatches?.map(o),
          })),
          (this.shouldViewTransition = !1),
          this.load({ sync: e?.sync })
        );
      }),
      (this.getParsedLocationHref = (e) => e.publicHref || "/"),
      (this.resolveRedirect = (e) => {
        const o = e.headers.get("Location");
        if (!e.options.href || e.options._builtLocation) {
          const r = e.options._builtLocation ?? this.buildLocation(e.options),
            s = this.getParsedLocationHref(r);
          ((e.options.href = s), e.headers.set("Location", s));
        } else if (o)
          try {
            const r = new URL(o);
            if (this.origin && r.origin === this.origin) {
              const s = r.pathname + r.search + r.hash;
              ((e.options.href = s), e.headers.set("Location", s));
            }
          } catch {}
        if (
          e.options.href &&
          !e.options._builtLocation &&
          se(e.options.href, this.protocolAllowlist)
        )
          throw new Error("Redirect blocked: unsafe protocol");
        return (e.headers.get("Location") || e.headers.set("Location", e.options.href), e);
      }),
      (this.clearCache = (e) => {
        const o = e?.filter;
        o !== void 0
          ? this.__store.setState((r) => ({
              ...r,
              cachedMatches: r.cachedMatches.filter((s) => !o(s)),
            }))
          : this.__store.setState((r) => ({ ...r, cachedMatches: [] }));
      }),
      (this.clearExpiredCache = () => {
        const e = (o) => {
          const r = this.looseRoutesById[o.routeId];
          if (!r.options.loader) return !0;
          const s =
            (o.preload
              ? (r.options.preloadGcTime ?? this.options.defaultPreloadGcTime)
              : (r.options.gcTime ?? this.options.defaultGcTime)) ?? 300 * 1e3;
          return o.status === "error" ? !0 : Date.now() - o.updatedAt >= s;
        };
        this.clearCache({ filter: e });
      }),
      (this.loadRouteChunk = Zn),
      (this.preloadRoute = async (e) => {
        const o = e._builtLocation ?? this.buildLocation(e);
        let r = this.matchRoutes(o, { throwOnError: !0, preload: !0, dest: e });
        const s = new Set(
            [...this.state.matches, ...(this.state.pendingMatches ?? [])].map((c) => c.id),
          ),
          u = new Set([...s, ...this.state.cachedMatches.map((c) => c.id)]);
        Ht(() => {
          r.forEach((c) => {
            u.has(c.id) ||
              this.__store.setState((a) => ({ ...a, cachedMatches: [...a.cachedMatches, c] }));
          });
        });
        try {
          return (
            (r = await xn({
              router: this,
              matches: r,
              location: o,
              preload: !0,
              updateMatch: (c, a) => {
                s.has(c) ? (r = r.map((i) => (i.id === c ? a(i) : i))) : this.updateMatch(c, a);
              },
            })),
            r
          );
        } catch (c) {
          if (Q(c))
            return c.options.reloadDocument
              ? void 0
              : await this.preloadRoute({ ...c.options, _fromLocation: o });
          J(c) || console.error(c);
          return;
        }
      }),
      (this.matchRoute = (e, o) => {
        const r = {
            ...e,
            to: e.to ? this.resolvePathWithBase(e.from || "", e.to) : void 0,
            params: e.params || {},
            leaveParams: !0,
          },
          s = this.buildLocation(r);
        if (o?.pending && this.state.status !== "pending") return !1;
        const c = (o?.pending === void 0 ? !this.state.isLoading : o.pending)
            ? this.latestLocation
            : this.state.resolvedLocation || this.state.location,
          a = er(
            s.pathname,
            o?.caseSensitive ?? !1,
            o?.fuzzy ?? !1,
            c.pathname,
            this.processedTree,
          );
        return !a || (e.params && !Rt(a.rawParams, e.params, { partial: !0 }))
          ? !1
          : (o?.includeSearch ?? !0)
            ? Rt(c.search, s.search, { partial: !0 })
              ? a.rawParams
              : !1
            : a.rawParams;
      }),
      (this.hasNotFoundMatch = () =>
        this.__store.state.matches.some((e) => e.status === "notFound" || e.globalNotFound)),
      this.update({
        defaultPreloadDelay: 50,
        defaultPendingMs: 1e3,
        defaultPendingMinMs: 500,
        context: void 0,
        ...n,
        caseSensitive: n.caseSensitive ?? !1,
        notFoundMode: n.notFoundMode ?? "fuzzy",
        stringifySearch: n.stringifySearch ?? Rr,
        parseSearch: n.parseSearch ?? Pr,
        protocolAllowlist: n.protocolAllowlist ?? Yo,
      }),
      typeof document < "u" && (self.__TSR_ROUTER__ = this));
  }
  isShell() {
    return !!this.options.isShell;
  }
  isPrerendering() {
    return !!this.options.isPrerendering;
  }
  get state() {
    return this.__store.state;
  }
  setRoutes({ routesById: n, routesByPath: e, processedTree: o }) {
    ((this.routesById = n), (this.routesByPath = e), (this.processedTree = o));
    const r = this.options.notFoundRoute;
    r && (r.init({ originalIndex: 99999999999 }), (this.routesById[r.id] = r));
  }
  get looseRoutesById() {
    return this.routesById;
  }
  getParentContext(n) {
    return n?.id ? (n.context ?? this.options.context ?? void 0) : (this.options.context ?? void 0);
  }
  matchRoutesInternal(n, e) {
    const o = this.getMatchedRoutes(n.pathname),
      { foundRoute: r, routeParams: s, parsedParams: u } = o;
    let { matchedRoutes: c } = o,
      a = !1;
    (r ? r.path !== "/" && s["**"] : gt(n.pathname)) &&
      (this.options.notFoundRoute ? (c = [...c, this.options.notFoundRoute]) : (a = !0));
    const i = a ? $r(this.options.notFoundMode, c) : void 0,
      l = new Array(c.length),
      f = new Map(this.state.matches.map((d) => [d.routeId, d]));
    for (let d = 0; d < c.length; d++) {
      const h = c[d],
        m = l[d - 1];
      let g, y, _;
      {
        const F = m?.search ?? n.search,
          nt = m?._strictSearch ?? void 0;
        try {
          const V = ee(h.options.validateSearch, { ...F }) ?? void 0;
          ((g = { ...F, ...V }), (y = { ...nt, ...V }), (_ = void 0));
        } catch (V) {
          let ot = V;
          if ((V instanceof ue || (ot = new ue(V.message, { cause: V })), e?.throwOnError))
            throw ot;
          ((g = F), (y = {}), (_ = ot));
        }
      }
      const R = h.options.loaderDeps?.({ search: g }) ?? "",
        x = R ? JSON.stringify(R) : "",
        { interpolatedPath: P, usedParams: j } = Pn({
          path: h.fullPath,
          params: s,
          decoder: this.pathParamsDecoder,
          server: this.isServer,
        }),
        T = h.id + P + x,
        w = this.getMatch(T),
        S = f.get(h.id),
        b = w?._strictParams ?? j;
      let D;
      if (!w)
        try {
          bn(h, j, u, b);
        } catch (F) {
          if ((J(F) || Q(F) ? (D = F) : (D = new jr(F.message, { cause: F })), e?.throwOnError))
            throw D;
        }
      Object.assign(s, b);
      const M = S ? "stay" : "enter";
      let A;
      if (w)
        A = {
          ...w,
          cause: M,
          params: S?.params ?? s,
          _strictParams: b,
          search: Y(S ? S.search : w.search, g),
          _strictSearch: y,
        };
      else {
        const F =
          h.options.loader || h.options.beforeLoad || h.lazyFn || to(h) ? "pending" : "success";
        A = {
          id: T,
          ssr: h.options.ssr,
          index: d,
          routeId: h.id,
          params: S?.params ?? s,
          _strictParams: b,
          pathname: P,
          updatedAt: Date.now(),
          search: S ? Y(S.search, g) : g,
          _strictSearch: y,
          searchError: void 0,
          status: F,
          isFetching: !1,
          error: void 0,
          paramsError: D,
          __routeContext: void 0,
          _nonReactive: { loadPromise: Ot() },
          __beforeLoadContext: void 0,
          context: {},
          abortController: new AbortController(),
          fetchCount: 0,
          cause: M,
          loaderDeps: S ? Y(S.loaderDeps, R) : R,
          invalid: !1,
          preload: !1,
          links: void 0,
          scripts: void 0,
          headScripts: void 0,
          meta: void 0,
          staticData: h.options.staticData || {},
          fullPath: h.fullPath,
        };
      }
      (e?.preload || (A.globalNotFound = i === h.id), (A.searchError = _));
      const W = this.getParentContext(m);
      ((A.context = { ...W, ...A.__routeContext, ...A.__beforeLoadContext }), (l[d] = A));
    }
    for (let d = 0; d < l.length; d++) {
      const h = l[d],
        m = this.looseRoutesById[h.routeId],
        g = this.getMatch(h.id),
        y = f.get(h.routeId);
      if (((h.params = y ? Y(y.params, s) : s), !g)) {
        const _ = l[d - 1],
          R = this.getParentContext(_);
        if (m.options.context) {
          const x = {
            deps: h.loaderDeps,
            params: h.params,
            context: R ?? {},
            location: n,
            navigate: (P) => this.navigate({ ...P, _fromLocation: n }),
            buildLocation: this.buildLocation,
            cause: h.cause,
            abortController: h.abortController,
            preload: !!h.preload,
            matches: l,
            routeId: m.id,
          };
          h.__routeContext = m.options.context(x) ?? void 0;
        }
        h.context = { ...R, ...h.__routeContext, ...h.__beforeLoadContext };
      }
    }
    return l;
  }
  matchRoutesLightweight(n) {
    const { matchedRoutes: e, routeParams: o, parsedParams: r } = this.getMatchedRoutes(n.pathname),
      s = Wt(e),
      u = { ...n.search };
    for (const l of e)
      try {
        Object.assign(u, ee(l.options.validateSearch, u));
      } catch {}
    const c = Wt(this.state.matches),
      a = c && c.routeId === s.id && n.pathname === this.state.location.pathname;
    let i;
    if (a) i = c.params;
    else {
      const l = { ...o };
      for (const f of e)
        try {
          bn(f, o, r ?? {}, l);
        } catch {}
      i = l;
    }
    return { matchedRoutes: e, fullPath: s.fullPath, search: u, params: i };
  }
}
class ue extends Error {}
class jr extends Error {}
function Dr(t) {
  return {
    loadedAt: 0,
    isLoading: !1,
    isTransitioning: !1,
    status: "idle",
    resolvedLocation: void 0,
    location: t,
    matches: [],
    pendingMatches: [],
    cachedMatches: [],
    statusCode: 200,
  };
}
function ee(t, n) {
  if (t == null) return {};
  if ("~standard" in t) {
    const e = t["~standard"].validate(n);
    if (e instanceof Promise) throw new ue("Async validation not supported");
    if (e.issues) throw new ue(JSON.stringify(e.issues, void 0, 2), { cause: e });
    return e.value;
  }
  return "parse" in t ? t.parse(n) : typeof t == "function" ? t(n) : {};
}
function Br({ pathname: t, routesById: n, processedTree: e }) {
  const o = {},
    r = gt(t);
  let s, u;
  const c = nr(r, e, !0);
  return (
    c && ((s = c.route), Object.assign(o, c.rawParams), (u = Object.assign({}, c.parsedParams))),
    { matchedRoutes: c?.branch || [n[X]], routeParams: o, foundRoute: s, parsedParams: u }
  );
}
function Nr({ search: t, dest: n, destRoutes: e, _includeValidateSearch: o }) {
  return Fr(e)(t, n, o ?? !1);
}
function Fr(t) {
  const n = { dest: null, _includeValidateSearch: !1, middlewares: [] };
  for (const r of t) {
    if ("search" in r.options)
      r.options.search?.middlewares && n.middlewares.push(...r.options.search.middlewares);
    else if (r.options.preSearchFilters || r.options.postSearchFilters) {
      const s = ({ search: u, next: c }) => {
        let a = u;
        "preSearchFilters" in r.options &&
          r.options.preSearchFilters &&
          (a = r.options.preSearchFilters.reduce((l, f) => f(l), u));
        const i = c(a);
        return "postSearchFilters" in r.options && r.options.postSearchFilters
          ? r.options.postSearchFilters.reduce((l, f) => f(l), i)
          : i;
      };
      n.middlewares.push(s);
    }
    if (r.options.validateSearch) {
      const s = ({ search: u, next: c }) => {
        const a = c(u);
        if (!n._includeValidateSearch) return a;
        try {
          return { ...a, ...(ee(r.options.validateSearch, a) ?? void 0) };
        } catch {
          return a;
        }
      };
      n.middlewares.push(s);
    }
  }
  const e = ({ search: r }) => {
    const s = n.dest;
    return s.search ? (s.search === !0 ? r : ht(s.search, r)) : {};
  };
  n.middlewares.push(e);
  const o = (r, s, u) => {
    if (r >= u.length) return s;
    const c = u[r];
    return c({ search: s, next: (i) => o(r + 1, i, u) });
  };
  return function (s, u, c) {
    return ((n.dest = u), (n._includeValidateSearch = c), o(0, s, n.middlewares));
  };
}
function $r(t, n) {
  if (t !== "root")
    for (let e = n.length - 1; e >= 0; e--) {
      const o = n[e];
      if (o.children) return o.id;
    }
  return X;
}
function bn(t, n, e, o) {
  const r = t.options.params?.parse ?? t.options.parseParams;
  if (r)
    if (t.options.skipRouteOnParseError) for (const s in n) s in e && (o[s] = e[s]);
    else {
      const s = r(o);
      Object.assign(o, s);
    }
}
const Ur = "Error preloading route! ☝️";
class oo {
  constructor(n) {
    if (
      ((this.init = (e) => {
        this.originalIndex = e.originalIndex;
        const o = this.options,
          r = !o?.path && !o?.id;
        ((this.parentRoute = this.options.getParentRoute?.()),
          r ? (this._path = X) : this.parentRoute || lt(!1));
        let s = r ? X : o?.path;
        s && s !== "/" && (s = qn(s));
        const u = o?.id || s;
        let c = r ? X : Zt([this.parentRoute.id === X ? "" : this.parentRoute.id, u]);
        (s === X && (s = "/"), c !== X && (c = Zt(["/", c])));
        const a = c === X ? "/" : Zt([this.parentRoute.fullPath, s]);
        ((this._path = s), (this._id = c), (this._fullPath = a), (this._to = gt(a)));
      }),
      (this.addChildren = (e) => this._addFileChildren(e)),
      (this._addFileChildren = (e) => (
        Array.isArray(e) && (this.children = e),
        typeof e == "object" && e !== null && (this.children = Object.values(e)),
        this
      )),
      (this._addFileTypes = () => this),
      (this.updateLoader = (e) => (Object.assign(this.options, e), this)),
      (this.update = (e) => (Object.assign(this.options, e), this)),
      (this.lazy = (e) => ((this.lazyFn = e), this)),
      (this.redirect = (e) => br({ from: this.fullPath, ...e })),
      (this.options = n || {}),
      (this.isRoot = !n?.getParentRoute),
      n?.id && n?.path)
    )
      throw new Error("Route cannot have both an 'id' and a 'path' option.");
  }
  get to() {
    return this._to;
  }
  get id() {
    return this._id;
  }
  get path() {
    return this._path;
  }
  get fullPath() {
    return this._fullPath;
  }
}
class Hr extends oo {
  constructor(n) {
    super(n);
  }
}
const Wr = "use",
  Cn = wo[Wr],
  Jt = typeof window < "u" ? E.useLayoutEffect : E.useEffect;
function Ce(t) {
  const n = E.useRef({ value: t, prev: null }),
    e = n.current.value;
  return (t !== e && (n.current = { value: t, prev: e }), n.current.prev);
}
function zr(t, n, e = {}, o = {}) {
  E.useEffect(() => {
    if (!t.current || o.disabled || typeof IntersectionObserver != "function") return;
    const r = new IntersectionObserver(([s]) => {
      n(s);
    }, e);
    return (
      r.observe(t.current),
      () => {
        r.disconnect();
      }
    );
  }, [n, e, o.disabled, t]);
}
function Vr(t) {
  const n = E.useRef(null);
  return (E.useImperativeHandle(t, () => n.current, []), n);
}
function We(t) {
  const n = t.errorComponent ?? ze;
  return C.jsx(Kr, {
    getResetKey: t.getResetKey,
    onCatch: t.onCatch,
    children: ({ error: e, reset: o }) =>
      e ? E.createElement(n, { error: e, reset: o }) : t.children,
  });
}
class Kr extends E.Component {
  constructor() {
    (super(...arguments), (this.state = { error: null }));
  }
  static getDerivedStateFromProps(n) {
    return { resetKey: n.getResetKey() };
  }
  static getDerivedStateFromError(n) {
    return { error: n };
  }
  reset() {
    this.setState({ error: null });
  }
  componentDidUpdate(n, e) {
    e.error && e.resetKey !== this.state.resetKey && this.reset();
  }
  componentDidCatch(n, e) {
    this.props.onCatch && this.props.onCatch(n, e);
  }
  render() {
    return this.props.children({
      error: this.state.resetKey !== this.props.getResetKey() ? null : this.state.error,
      reset: () => {
        this.reset();
      },
    });
  }
}
function ze({ error: t }) {
  const [n, e] = E.useState(!1);
  return C.jsxs("div", {
    style: { padding: ".5rem", maxWidth: "100%" },
    children: [
      C.jsxs("div", {
        style: { display: "flex", alignItems: "center", gap: ".5rem" },
        children: [
          C.jsx("strong", { style: { fontSize: "1rem" }, children: "Something went wrong!" }),
          C.jsx("button", {
            style: {
              appearance: "none",
              fontSize: ".6em",
              border: "1px solid currentColor",
              padding: ".1rem .2rem",
              fontWeight: "bold",
              borderRadius: ".25rem",
            },
            onClick: () => e((o) => !o),
            children: n ? "Hide Error" : "Show Error",
          }),
        ],
      }),
      C.jsx("div", { style: { height: ".25rem" } }),
      n
        ? C.jsx("div", {
            children: C.jsx("pre", {
              style: {
                fontSize: ".7em",
                border: "1px solid red",
                borderRadius: ".25rem",
                padding: ".3rem",
                color: "red",
                overflow: "auto",
              },
              children: t.message ? C.jsx("code", { children: t.message }) : null,
            }),
          })
        : null,
    ],
  });
}
function qr({ children: t, fallback: n = null }) {
  return ro() ? C.jsx(It.Fragment, { children: t }) : C.jsx(It.Fragment, { children: n });
}
function ro() {
  return It.useSyncExternalStore(
    Gr,
    () => !0,
    () => !1,
  );
}
function Gr() {
  return () => {};
}
var Le = { exports: {} },
  Ee = {},
  Te = { exports: {} },
  Me = {};
var Ln;
function Yr() {
  if (Ln) return Me;
  Ln = 1;
  var t = le();
  function n(f, d) {
    return (f === d && (f !== 0 || 1 / f === 1 / d)) || (f !== f && d !== d);
  }
  var e = typeof Object.is == "function" ? Object.is : n,
    o = t.useState,
    r = t.useEffect,
    s = t.useLayoutEffect,
    u = t.useDebugValue;
  function c(f, d) {
    var h = d(),
      m = o({ inst: { value: h, getSnapshot: d } }),
      g = m[0].inst,
      y = m[1];
    return (
      s(
        function () {
          ((g.value = h), (g.getSnapshot = d), a(g) && y({ inst: g }));
        },
        [f, h, d],
      ),
      r(
        function () {
          return (
            a(g) && y({ inst: g }),
            f(function () {
              a(g) && y({ inst: g });
            })
          );
        },
        [f],
      ),
      u(h),
      h
    );
  }
  function a(f) {
    var d = f.getSnapshot;
    f = f.value;
    try {
      var h = d();
      return !e(f, h);
    } catch {
      return !0;
    }
  }
  function i(f, d) {
    return d();
  }
  var l =
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
      ? i
      : c;
  return (
    (Me.useSyncExternalStore = t.useSyncExternalStore !== void 0 ? t.useSyncExternalStore : l),
    Me
  );
}
var En;
function Jr() {
  return (En || ((En = 1), (Te.exports = Yr())), Te.exports);
}
var Tn;
function Xr() {
  if (Tn) return Ee;
  Tn = 1;
  var t = le(),
    n = Jr();
  function e(i, l) {
    return (i === l && (i !== 0 || 1 / i === 1 / l)) || (i !== i && l !== l);
  }
  var o = typeof Object.is == "function" ? Object.is : e,
    r = n.useSyncExternalStore,
    s = t.useRef,
    u = t.useEffect,
    c = t.useMemo,
    a = t.useDebugValue;
  return (
    (Ee.useSyncExternalStoreWithSelector = function (i, l, f, d, h) {
      var m = s(null);
      if (m.current === null) {
        var g = { hasValue: !1, value: null };
        m.current = g;
      } else g = m.current;
      m = c(
        function () {
          function _(T) {
            if (!R) {
              if (((R = !0), (x = T), (T = d(T)), h !== void 0 && g.hasValue)) {
                var w = g.value;
                if (h(w, T)) return (P = w);
              }
              return (P = T);
            }
            if (((w = P), o(x, T))) return w;
            var S = d(T);
            return h !== void 0 && h(w, S) ? ((x = T), w) : ((x = T), (P = S));
          }
          var R = !1,
            x,
            P,
            j = f === void 0 ? null : f;
          return [
            function () {
              return _(l());
            },
            j === null
              ? void 0
              : function () {
                  return _(j());
                },
          ];
        },
        [l, f, d, h],
      );
      var y = r(i, m[0], m[1]);
      return (
        u(
          function () {
            ((g.hasValue = !0), (g.value = y));
          },
          [y],
        ),
        a(y),
        y
      );
    }),
    Ee
  );
}
var Mn;
function Qr() {
  return (Mn || ((Mn = 1), (Le.exports = Xr())), Le.exports);
}
var Zr = Qr();
function ts(t, n) {
  return t === n;
}
function es(t, n, e = ts) {
  const o = E.useCallback(
      (u) => {
        if (!t) return () => {};
        const { unsubscribe: c } = t.subscribe(u);
        return c;
      },
      [t],
    ),
    r = E.useCallback(() => t?.get(), [t]);
  return Zr.useSyncExternalStoreWithSelector(o, r, r, n, e);
}
const so = E.createContext(null);
function tt(t) {
  const n = E.useContext(so);
  return (t?.warn, n);
}
function Z(t) {
  const n = tt({ warn: t?.router === void 0 }),
    e = t?.router || n,
    o = E.useRef(void 0);
  return es(e.__store, (r) => {
    if (t?.select) {
      if (t.structuralSharing ?? e.options.defaultStructuralSharing) {
        const s = Y(o.current, t.select(r));
        return ((o.current = s), s);
      }
      return t.select(r);
    }
    return r;
  });
}
const pe = E.createContext(void 0),
  ns = E.createContext(void 0);
function at(t) {
  const n = E.useContext(t.from ? ns : pe);
  return Z({
    select: (o) => {
      const r = o.matches.find((s) => (t.from ? t.from === s.routeId : s.id === n));
      if (
        (lt(
          !((t.shouldThrow ?? !0) && !r),
          `Could not find ${t.from ? `an active match from "${t.from}"` : "a nearest match!"}`,
        ),
        r !== void 0)
      )
        return t.select ? t.select(r) : r;
    },
    structuralSharing: t.structuralSharing,
  });
}
function Ve(t) {
  return at({
    from: t.from,
    strict: t.strict,
    structuralSharing: t.structuralSharing,
    select: (n) => (t.select ? t.select(n.loaderData) : n.loaderData),
  });
}
function Ke(t) {
  const { select: n, ...e } = t;
  return at({ ...e, select: (o) => (n ? n(o.loaderDeps) : o.loaderDeps) });
}
function qe(t) {
  return at({
    from: t.from,
    shouldThrow: t.shouldThrow,
    structuralSharing: t.structuralSharing,
    strict: t.strict,
    select: (n) => {
      const e = t.strict === !1 ? n.params : n._strictParams;
      return t.select ? t.select(e) : e;
    },
  });
}
function Ge(t) {
  return at({
    from: t.from,
    strict: t.strict,
    shouldThrow: t.shouldThrow,
    structuralSharing: t.structuralSharing,
    select: (n) => (t.select ? t.select(n.search) : n.search),
  });
}
function Ye(t) {
  const n = tt();
  return E.useCallback((e) => n.navigate({ ...e, from: e.from ?? t?.from }), [t?.from, n]);
}
var os = bo();
function rs(t, n) {
  const e = tt(),
    o = Vr(n),
    {
      activeProps: r,
      inactiveProps: s,
      activeOptions: u,
      to: c,
      preload: a,
      preloadDelay: i,
      hashScrollIntoView: l,
      replace: f,
      startTransition: d,
      resetScroll: h,
      viewTransition: m,
      children: g,
      target: y,
      disabled: _,
      style: R,
      className: x,
      onClick: P,
      onBlur: j,
      onFocus: T,
      onMouseEnter: w,
      onMouseLeave: S,
      onTouchStart: b,
      ignoreBlocker: D,
      params: M,
      search: A,
      hash: W,
      state: F,
      mask: nt,
      reloadDocument: V,
      unsafeRelative: ot,
      from: Je,
      _fromLocation: me,
      ...Vt
    } = t,
    p = ro(),
    v = Z({
      select: ($) => {
        const K = $.matches[$.matches.length - 1];
        return { search: K?.search, hash: $.location.hash, path: K?.pathname };
      },
      structuralSharing: !0,
    }),
    k = t.from,
    L = E.useMemo(
      () => ({ ...t, from: k }),
      [
        e,
        v,
        k,
        t._fromLocation,
        t.hash,
        t.to,
        t.search,
        t.params,
        t.state,
        t.mask,
        t.unsafeRelative,
      ],
    ),
    I = E.useMemo(() => e.buildLocation({ ...L }), [e, L]),
    B = I.maskedLocation ? I.maskedLocation.publicHref : I.publicHref,
    N = I.maskedLocation ? I.maskedLocation.external : I.external,
    q = E.useMemo(() => ls(B, N, e.history, _), [_, N, B, e.history]),
    z = E.useMemo(() => {
      if (q?.external) return se(q.href, e.protocolAllowlist) ? void 0 : q.href;
      if (!fs(c) && !(typeof c != "string" || c.indexOf(":") === -1))
        try {
          return (new URL(c), se(c, e.protocolAllowlist) ? void 0 : c);
        } catch {}
    }, [c, q, e.protocolAllowlist]),
    jt = Z({
      select: ($) => {
        if (z) return !1;
        if (u?.exact) {
          if (!cr($.location.pathname, I.pathname, e.basepath)) return !1;
        } else {
          const K = ae($.location.pathname, e.basepath),
            et = ae(I.pathname, e.basepath);
          if (!(K.startsWith(et) && (K.length === et.length || K[et.length] === "/"))) return !1;
        }
        return (u?.includeSearch ?? !0) &&
          !Rt($.location.search, I.search, {
            partial: !u?.exact,
            ignoreUndefined: !u?.explicitUndefined,
          })
          ? !1
          : u?.includeHash
            ? p && $.location.hash === I.hash
            : !0;
      },
    }),
    Kt = jt ? (ht(r, {}) ?? ss) : ke,
    qt = jt ? ke : (ht(s, {}) ?? ke),
    Xe = [x, Kt.className, qt.className].filter(Boolean).join(" "),
    Qe = (R || Kt.style || qt.style) && { ...R, ...Kt.style, ...qt.style },
    [uo, Ze] = E.useState(!1),
    tn = E.useRef(!1),
    Ct = t.reloadDocument || z ? !1 : (a ?? e.options.defaultPreload),
    ge = i ?? e.options.defaultPreloadDelay ?? 0,
    yt = E.useCallback(() => {
      e.preloadRoute({ ...L, _builtLocation: I }).catch(($) => {
        (console.warn($), console.warn(Ur));
      });
    }, [e, L, I]),
    lo = E.useCallback(
      ($) => {
        $?.isIntersecting && yt();
      },
      [yt],
    );
  (zr(o, lo, us, { disabled: !!_ || Ct !== "viewport" }),
    E.useEffect(() => {
      tn.current || (!_ && Ct === "render" && (yt(), (tn.current = !0)));
    }, [_, yt, Ct]));
  const fo = ($) => {
    const K = $.currentTarget.getAttribute("target"),
      et = y !== void 0 ? y : K;
    if (!_ && !ds($) && !$.defaultPrevented && (!et || et === "_self") && $.button === 0) {
      ($.preventDefault(),
        os.flushSync(() => {
          Ze(!0);
        }));
      const on = e.subscribe("onResolved", () => {
        (on(), Ze(!1));
      });
      e.navigate({
        ...L,
        replace: f,
        resetScroll: h,
        hashScrollIntoView: l,
        startTransition: d,
        viewTransition: m,
        ignoreBlocker: D,
      });
    }
  };
  if (z)
    return {
      ...Vt,
      ref: o,
      href: z,
      ...(g && { children: g }),
      ...(y && { target: y }),
      ...(_ && { disabled: _ }),
      ...(R && { style: R }),
      ...(x && { className: x }),
      ...(P && { onClick: P }),
      ...(j && { onBlur: j }),
      ...(T && { onFocus: T }),
      ...(w && { onMouseEnter: w }),
      ...(S && { onMouseLeave: S }),
      ...(b && { onTouchStart: b }),
    };
  const en = ($) => {
      if (_ || !Ct) return;
      if (!ge) {
        yt();
        return;
      }
      const K = $.currentTarget;
      if ($t.has(K)) return;
      const et = setTimeout(() => {
        ($t.delete(K), yt());
      }, ge);
      $t.set(K, et);
    },
    ho = ($) => {
      _ || !Ct || yt();
    },
    nn = ($) => {
      if (_ || !Ct || !ge) return;
      const K = $.currentTarget,
        et = $t.get(K);
      et && (clearTimeout(et), $t.delete(K));
    };
  return {
    ...Vt,
    ...Kt,
    ...qt,
    href: q?.href,
    ref: o,
    onClick: Lt([P, fo]),
    onBlur: Lt([j, nn]),
    onFocus: Lt([T, en]),
    onMouseEnter: Lt([w, en]),
    onMouseLeave: Lt([S, nn]),
    onTouchStart: Lt([b, ho]),
    disabled: !!_,
    target: y,
    ...(Qe && { style: Qe }),
    ...(Xe && { className: Xe }),
    ...(_ && is),
    ...(jt && as),
    ...(p && uo && cs),
  };
}
const ke = {},
  ss = { className: "active" },
  is = { role: "link", "aria-disabled": !0 },
  as = { "data-status": "active", "aria-current": "page" },
  cs = { "data-transitioning": "transitioning" },
  $t = new WeakMap(),
  us = { rootMargin: "100px" },
  Lt = (t) => (n) => {
    for (const e of t)
      if (e) {
        if (n.defaultPrevented) return;
        e(n);
      }
  };
function ls(t, n, e, o) {
  if (!o) return n ? { href: t, external: !0 } : { href: e.createHref(t) || "/", external: !1 };
}
function fs(t) {
  if (typeof t != "string") return !1;
  const n = t.charCodeAt(0);
  return n === 47 ? t.charCodeAt(1) !== 47 : n === 46;
}
const io = E.forwardRef((t, n) => {
  const { _asChild: e, ...o } = t,
    { type: r, ...s } = rs(o, n),
    u =
      typeof o.children == "function"
        ? o.children({ isActive: s["data-status"] === "active" })
        : o.children;
  if (!e) {
    const { disabled: c, ...a } = s;
    return E.createElement("a", a, u);
  }
  return E.createElement(e, s, u);
});
function ds(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
class hs extends oo {
  constructor(n) {
    (super(n),
      (this.useMatch = (e) =>
        at({ select: e?.select, from: this.id, structuralSharing: e?.structuralSharing })),
      (this.useRouteContext = (e) =>
        at({ ...e, from: this.id, select: (o) => (e?.select ? e.select(o.context) : o.context) })),
      (this.useSearch = (e) =>
        Ge({ select: e?.select, structuralSharing: e?.structuralSharing, from: this.id })),
      (this.useParams = (e) =>
        qe({ select: e?.select, structuralSharing: e?.structuralSharing, from: this.id })),
      (this.useLoaderDeps = (e) => Ke({ ...e, from: this.id })),
      (this.useLoaderData = (e) => Ve({ ...e, from: this.id })),
      (this.useNavigate = () => Ye({ from: this.fullPath })),
      (this.Link = It.forwardRef((e, o) => C.jsx(io, { ref: o, from: this.fullPath, ...e }))),
      (this.$$typeof = Symbol.for("react.memo")));
  }
}
function ps(t) {
  return new hs(t);
}
class ms extends Hr {
  constructor(n) {
    (super(n),
      (this.useMatch = (e) =>
        at({ select: e?.select, from: this.id, structuralSharing: e?.structuralSharing })),
      (this.useRouteContext = (e) =>
        at({ ...e, from: this.id, select: (o) => (e?.select ? e.select(o.context) : o.context) })),
      (this.useSearch = (e) =>
        Ge({ select: e?.select, structuralSharing: e?.structuralSharing, from: this.id })),
      (this.useParams = (e) =>
        qe({ select: e?.select, structuralSharing: e?.structuralSharing, from: this.id })),
      (this.useLoaderDeps = (e) => Ke({ ...e, from: this.id })),
      (this.useLoaderData = (e) => Ve({ ...e, from: this.id })),
      (this.useNavigate = () => Ye({ from: this.fullPath })),
      (this.Link = It.forwardRef((e, o) => C.jsx(io, { ref: o, from: this.fullPath, ...e }))),
      (this.$$typeof = Symbol.for("react.memo")));
  }
}
function Ts(t) {
  return new ms(t);
}
function kn(t) {
  return typeof t == "object"
    ? new In(t, { silent: !0 }).createRoute(t)
    : new In(t, { silent: !0 }).createRoute;
}
class In {
  constructor(n, e) {
    ((this.path = n),
      (this.createRoute = (o) => {
        const r = ps(o);
        return ((r.isRoot = !1), r);
      }),
      (this.silent = e?.silent));
  }
}
class On {
  constructor(n) {
    ((this.useMatch = (e) =>
      at({ select: e?.select, from: this.options.id, structuralSharing: e?.structuralSharing })),
      (this.useRouteContext = (e) =>
        at({
          from: this.options.id,
          select: (o) => (e?.select ? e.select(o.context) : o.context),
        })),
      (this.useSearch = (e) =>
        Ge({ select: e?.select, structuralSharing: e?.structuralSharing, from: this.options.id })),
      (this.useParams = (e) =>
        qe({ select: e?.select, structuralSharing: e?.structuralSharing, from: this.options.id })),
      (this.useLoaderDeps = (e) => Ke({ ...e, from: this.options.id })),
      (this.useLoaderData = (e) => Ve({ ...e, from: this.options.id })),
      (this.useNavigate = () => {
        const e = tt();
        return Ye({ from: e.routesById[this.options.id].fullPath });
      }),
      (this.options = n),
      (this.$$typeof = Symbol.for("react.memo")));
  }
}
function An(t) {
  return typeof t == "object" ? new On(t) : (n) => new On({ id: t, ...n });
}
function Ms(t, n) {
  let e, o, r, s;
  const u = () => (
      e ||
        (e = t()
          .then((a) => {
            ((e = void 0), (o = a[n]));
          })
          .catch((a) => {
            if (
              ((r = a),
              qo(r) && r instanceof Error && typeof window < "u" && typeof sessionStorage < "u")
            ) {
              const i = `tanstack_router_reload:${r.message}`;
              sessionStorage.getItem(i) || (sessionStorage.setItem(i, "1"), (s = !0));
            }
          })),
      e
    ),
    c = function (i) {
      if (s) throw (window.location.reload(), new Promise(() => {}));
      if (r) throw r;
      if (!o)
        if (Cn) Cn(u());
        else throw u();
      return E.createElement(o, i);
    };
  return ((c.preload = u), c);
}
function gs() {
  const t = tt(),
    n = E.useRef({ router: t, mounted: !1 }),
    [e, o] = E.useState(!1),
    { hasPendingMatches: r, isLoading: s } = Z({
      select: (f) => ({
        isLoading: f.isLoading,
        hasPendingMatches: f.matches.some((d) => d.status === "pending"),
      }),
      structuralSharing: !0,
    }),
    u = Ce(s),
    c = s || e || r,
    a = Ce(c),
    i = s || r,
    l = Ce(i);
  return (
    (t.startTransition = (f) => {
      (o(!0),
        E.startTransition(() => {
          (f(), o(!1));
        }));
    }),
    E.useEffect(() => {
      const f = t.history.subscribe(t.load),
        d = t.buildLocation({
          to: t.latestLocation.pathname,
          search: !0,
          params: !0,
          hash: !0,
          state: !0,
          _includeValidateSearch: !0,
        });
      return (
        gt(t.latestLocation.publicHref) !== gt(d.publicHref) &&
          t.commitLocation({ ...d, replace: !0 }),
        () => {
          f();
        }
      );
    }, [t, t.history]),
    Jt(() => {
      if ((typeof window < "u" && t.ssr) || (n.current.router === t && n.current.mounted)) return;
      ((n.current = { router: t, mounted: !0 }),
        (async () => {
          try {
            await t.load();
          } catch (d) {
            console.error(d);
          }
        })());
    }, [t]),
    Jt(() => {
      u && !s && t.emit({ type: "onLoad", ...wt(t.state) });
    }, [u, t, s]),
    Jt(() => {
      l && !i && t.emit({ type: "onBeforeRouteMount", ...wt(t.state) });
    }, [i, l, t]),
    Jt(() => {
      if (a && !c) {
        const f = wt(t.state);
        (t.emit({ type: "onResolved", ...f }),
          t.__store.setState((d) => ({ ...d, status: "idle", resolvedLocation: d.location })),
          f.hrefChanged && vr(t));
      }
    }, [c, a, t]),
    null
  );
}
function ys(t) {
  const n = Z({ select: (e) => `not-found-${e.location.pathname}-${e.status}` });
  return C.jsx(We, {
    getResetKey: () => n,
    onCatch: (e, o) => {
      if (J(e)) t.onCatch?.(e, o);
      else throw e;
    },
    errorComponent: ({ error: e }) => {
      if (J(e)) return t.fallback?.(e);
      throw e;
    },
    children: t.children,
  });
}
function vs() {
  return C.jsx("p", { children: "Not Found" });
}
function Et(t) {
  return C.jsx(C.Fragment, { children: t.children });
}
function ao(t, n, e) {
  return n.options.notFoundComponent
    ? C.jsx(n.options.notFoundComponent, { ...e })
    : t.options.defaultNotFoundComponent
      ? C.jsx(t.options.defaultNotFoundComponent, { ...e })
      : C.jsx(vs, {});
}
function _s() {
  return (tt().isScrollRestoring, null);
}
const co = E.memo(function ({ matchId: n }) {
  const e = tt(),
    o = Z({
      select: (g) => {
        const y = g.matches.findIndex((R) => R.id === n),
          _ = g.matches[y];
        return (
          lt(_),
          {
            routeId: _.routeId,
            ssr: _.ssr,
            _displayPending: _._displayPending,
            resetKey: g.loadedAt,
            parentRouteId: g.matches[y - 1]?.routeId,
          }
        );
      },
      structuralSharing: !0,
    }),
    r = e.routesById[o.routeId],
    s = r.options.pendingComponent ?? e.options.defaultPendingComponent,
    u = s ? C.jsx(s, {}) : null,
    c = r.options.errorComponent ?? e.options.defaultErrorComponent,
    a = r.options.onCatch ?? e.options.defaultOnCatch,
    i = r.isRoot
      ? (r.options.notFoundComponent ?? e.options.notFoundRoute?.options.component)
      : r.options.notFoundComponent,
    l = o.ssr === !1 || o.ssr === "data-only",
    f =
      (!r.isRoot || r.options.wrapInSuspense || l) &&
      (r.options.wrapInSuspense ?? s ?? (r.options.errorComponent?.preload || l))
        ? E.Suspense
        : Et,
    d = c ? We : Et,
    h = i ? ys : Et,
    m = r.isRoot ? (r.options.shellComponent ?? Et) : Et;
  return C.jsxs(m, {
    children: [
      C.jsx(pe.Provider, {
        value: n,
        children: C.jsx(f, {
          fallback: u,
          children: C.jsx(d, {
            getResetKey: () => o.resetKey,
            errorComponent: c || ze,
            onCatch: (g, y) => {
              if (J(g)) throw g;
              a?.(g, y);
            },
            children: C.jsx(h, {
              fallback: (g) => {
                if (!i || (g.routeId && g.routeId !== o.routeId) || (!g.routeId && !r.isRoot))
                  throw g;
                return E.createElement(i, g);
              },
              children:
                l || o._displayPending
                  ? C.jsx(qr, { fallback: u, children: C.jsx(jn, { matchId: n }) })
                  : C.jsx(jn, { matchId: n }),
            }),
          }),
        }),
      }),
      o.parentRouteId === X && e.options.scrollRestoration
        ? C.jsxs(C.Fragment, { children: [C.jsx(Ss, {}), C.jsx(_s, {})] })
        : null,
    ],
  });
});
function Ss() {
  const t = tt(),
    n = E.useRef(void 0);
  return C.jsx(
    "script",
    {
      suppressHydrationWarning: !0,
      ref: (e) => {
        e &&
          (n.current === void 0 || n.current.href !== t.latestLocation.href) &&
          (t.emit({ type: "onRendered", ...wt(t.state) }), (n.current = t.latestLocation));
      },
    },
    t.latestLocation.state.__TSR_key,
  );
}
const jn = E.memo(function ({ matchId: n }) {
    const e = tt(),
      {
        match: o,
        key: r,
        routeId: s,
      } = Z({
        select: (a) => {
          const i = a.matches.find((m) => m.id === n),
            l = i.routeId,
            d = (e.routesById[l].options.remountDeps ?? e.options.defaultRemountDeps)?.({
              routeId: l,
              loaderDeps: i.loaderDeps,
              params: i._strictParams,
              search: i._strictSearch,
            });
          return {
            key: d ? JSON.stringify(d) : void 0,
            routeId: l,
            match: {
              id: i.id,
              status: i.status,
              error: i.error,
              invalid: i.invalid,
              _forcePending: i._forcePending,
              _displayPending: i._displayPending,
            },
          };
        },
        structuralSharing: !0,
      }),
      u = e.routesById[s],
      c = E.useMemo(() => {
        const a = u.options.component ?? e.options.defaultComponent;
        return a ? C.jsx(a, {}, r) : C.jsx(Ps, {});
      }, [r, u.options.component, e.options.defaultComponent]);
    if (o._displayPending) throw e.getMatch(o.id)?._nonReactive.displayPendingPromise;
    if (o._forcePending) throw e.getMatch(o.id)?._nonReactive.minPendingPromise;
    if (o.status === "pending") {
      const a = u.options.pendingMinMs ?? e.options.defaultPendingMinMs;
      if (a) {
        const i = e.getMatch(o.id);
        if (i && !i._nonReactive.minPendingPromise) {
          const l = Ot();
          ((i._nonReactive.minPendingPromise = l),
            setTimeout(() => {
              (l.resolve(), (i._nonReactive.minPendingPromise = void 0));
            }, a));
        }
      }
      throw e.getMatch(o.id)?._nonReactive.loadPromise;
    }
    if (o.status === "notFound") return (lt(J(o.error)), ao(e, u, o.error));
    if (o.status === "redirected")
      throw (lt(Q(o.error)), e.getMatch(o.id)?._nonReactive.loadPromise);
    if (o.status === "error") throw o.error;
    return c;
  }),
  Ps = E.memo(function () {
    const n = tt(),
      e = E.useContext(pe),
      o = Z({ select: (i) => i.matches.find((l) => l.id === e)?.routeId }),
      r = n.routesById[o],
      s = Z({
        select: (i) => {
          const f = i.matches.find((d) => d.id === e);
          return (lt(f), f.globalNotFound);
        },
      }),
      u = Z({
        select: (i) => {
          const l = i.matches,
            f = l.findIndex((d) => d.id === e);
          return l[f + 1]?.id;
        },
      }),
      c = n.options.defaultPendingComponent ? C.jsx(n.options.defaultPendingComponent, {}) : null;
    if (s) return ao(n, r, void 0);
    if (!u) return null;
    const a = C.jsx(co, { matchId: u });
    return o === X ? C.jsx(E.Suspense, { fallback: c, children: a }) : a;
  });
function Rs() {
  const t = tt(),
    e = t.routesById[X].options.pendingComponent ?? t.options.defaultPendingComponent,
    o = e ? C.jsx(e, {}) : null,
    r = typeof document < "u" && t.ssr ? Et : E.Suspense,
    s = C.jsxs(r, { fallback: o, children: [C.jsx(gs, {}), C.jsx(ws, {})] });
  return t.options.InnerWrap ? C.jsx(t.options.InnerWrap, { children: s }) : s;
}
function ws() {
  const t = tt(),
    n = Z({ select: (r) => r.matches[0]?.id }),
    e = Z({ select: (r) => r.loadedAt }),
    o = n ? C.jsx(co, { matchId: n }) : null;
  return C.jsx(pe.Provider, {
    value: n,
    children: t.options.disableGlobalCatchBoundary
      ? o
      : C.jsx(We, { getResetKey: () => e, errorComponent: ze, onCatch: void 0, children: o }),
  });
}
const ks = (t) => new xs(t);
class xs extends Ar {
  constructor(n) {
    super(n);
  }
}
typeof globalThis < "u"
  ? ((globalThis.createFileRoute = kn), (globalThis.createLazyFileRoute = An))
  : typeof window < "u" && ((window.createFileRoute = kn), (window.createLazyFileRoute = An));
function bs({ router: t, children: n, ...e }) {
  Object.keys(e).length > 0 &&
    t.update({ ...t.options, ...e, context: { ...t.options.context, ...e.context } });
  const o = C.jsx(so.Provider, { value: t, children: n });
  return t.options.Wrap ? C.jsx(t.options.Wrap, { children: o }) : o;
}
function Is({ router: t, ...n }) {
  return C.jsx(bs, { router: t, ...n, children: C.jsx(Rs, {}) });
}
export {
  io as L,
  Ps as O,
  Is as R,
  bo as a,
  E as b,
  Ts as c,
  kn as d,
  ks as e,
  mo as g,
  C as j,
  Ms as l,
  _e as p,
  le as r,
  Ye as u,
};
