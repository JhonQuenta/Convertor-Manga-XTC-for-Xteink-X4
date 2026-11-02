(function () {
  "use strict";
  function fr(u) {
    return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u;
  }
  var P = {},
    j = {},
    R = {},
    K;
  function Q() {
    return (
      K ||
        ((K = 1),
        (R.hashU32 = function (f) {
          return (
            (f = f | 0),
            (f = (f + 2127912214 + (f << 12)) | 0),
            (f = f ^ -949894596 ^ (f >>> 19)),
            (f = (f + 374761393 + (f << 5)) | 0),
            (f = (f + -744332180) ^ (f << 9)),
            (f = (f + -42973499 + (f << 3)) | 0),
            (f ^ -1252372727 ^ (f >>> 16)) | 0
          );
        }),
        (R.readU64 = function (f, n) {
          var o = 0;
          return (
            (o |= f[n++] << 0),
            (o |= f[n++] << 8),
            (o |= f[n++] << 16),
            (o |= f[n++] << 24),
            (o |= f[n++] << 32),
            (o |= f[n++] << 40),
            (o |= f[n++] << 48),
            (o |= f[n++] << 56),
            o
          );
        }),
        (R.readU32 = function (f, n) {
          var o = 0;
          return (
            (o |= f[n++] << 0),
            (o |= f[n++] << 8),
            (o |= f[n++] << 16),
            (o |= f[n++] << 24),
            o
          );
        }),
        (R.writeU32 = function (f, n, o) {
          ((f[n++] = (o >> 0) & 255),
            (f[n++] = (o >> 8) & 255),
            (f[n++] = (o >> 16) & 255),
            (f[n++] = (o >> 24) & 255));
        }),
        (R.imul = function (f, n) {
          var o = f >>> 16,
            y = f & 65535,
            q = n >>> 16,
            A = n & 65535;
          return (y * A + ((o * A + y * q) << 16)) | 0;
        })),
      R
    );
  }
  var W;
  function ir() {
    if (W) return j;
    W = 1;
    var u = Q(),
      f = 2654435761,
      n = 2246822519,
      o = 3266489917,
      y = 668265263,
      q = 374761393;
    function A(a, t) {
      return ((a = a | 0), (t = t | 0), (a >>> ((32 - t) | 0)) | (a << t) | 0);
    }
    function O(a, t, m) {
      return (
        (a = a | 0),
        (t = t | 0),
        (m = m | 0),
        u.imul((a >>> ((32 - t) | 0)) | (a << t), m) | 0
      );
    }
    function F(a, t) {
      return ((a = a | 0), (t = t | 0), ((a >>> t) ^ a) | 0);
    }
    function L(a, t, m, b, w) {
      return O(u.imul(t, m) + a, b, w);
    }
    function B(a, t, m) {
      return O(a + u.imul(t[m], q), 11, f);
    }
    function M(a, t, m) {
      return L(a, u.readU32(t, m), o, 17, y);
    }
    function d(a, t, m) {
      return [
        L(a[0], u.readU32(t, m + 0), n, 13, f),
        L(a[1], u.readU32(t, m + 4), n, 13, f),
        L(a[2], u.readU32(t, m + 8), n, 13, f),
        L(a[3], u.readU32(t, m + 12), n, 13, f),
      ];
    }
    function X(a, t, m, b) {
      var w, H;
      if (((H = b), b >= 16)) {
        for (w = [a + f + n, a + n, a, a - f]; b >= 16;) ((w = d(w, t, m)), (m += 16), (b -= 16));
        w = A(w[0], 1) + A(w[1], 7) + A(w[2], 12) + A(w[3], 18) + H;
      } else w = (a + q + b) >>> 0;
      for (; b >= 4;) ((w = M(w, t, m)), (m += 4), (b -= 4));
      for (; b > 0;) ((w = B(w, t, m)), m++, b--);
      return ((w = F(u.imul(F(u.imul(F(w, 15), n), 13), o), 16)), w >>> 0);
    }
    return ((j.hash = X), j);
  }
  var Y;
  function nr() {
    return (
      Y ||
        ((Y = 1),
        (function (u) {
          var f = ir(),
            n = Q(),
            o = 4,
            y = 13,
            q = 5,
            A = 6,
            O = 65536,
            F = 4,
            L = (1 << F) - 1,
            B = 4,
            M = (1 << B) - 1,
            d = $(5 << 20),
            X = tr(),
            a = 407708164,
            t = 4,
            m = 8,
            b = 16,
            w = 64,
            H = 192,
            D = 2147483648,
            x = 7,
            G = 4,
            z = 7,
            N = { 4: 65536, 5: 262144, 6: 1048576, 7: 4194304 };
          function tr() {
            try {
              return new Uint32Array(O);
            } catch {
              for (var s = new Array(O), i = 0; i < O; i++) s[i] = 0;
              return s;
            }
          }
          function or(s) {
            for (var i = 0; i < O; i++) X[i] = 0;
          }
          function $(s) {
            try {
              return new Uint8Array(s);
            } catch {
              for (var i = new Array(s), e = 0; e < s; e++) i[e] = 0;
              return i;
            }
          }
          function S(s, i, e) {
            if (typeof s.buffer !== void 0) {
              if (Uint8Array.prototype.slice) return s.slice(i, e);
              var r = s.length;
              ((i = i | 0),
                (i = i < 0 ? Math.max(r + i, 0) : Math.min(i, r)),
                (e = e === void 0 ? r : e | 0),
                (e = e < 0 ? Math.max(r + e, 0) : Math.min(e, r)));
              for (var h = new Uint8Array(e - i), U = i, v = 0; U < e;) h[v++] = s[U++];
              return h;
            } else return s.slice(i, e);
          }
          ((u.compressBound = function (i) {
            return (i + i / 255 + 16) | 0;
          }),
            (u.decompressBound = function (i) {
              var e = 0;
              if (n.readU32(i, e) !== a) throw new Error("invalid magic number");
              e += 4;
              var r = i[e++];
              if ((r & H) !== w) throw new Error("incompatible descriptor version " + (r & H));
              var h = (r & b) !== 0,
                U = (r & m) !== 0,
                v = (i[e++] >> G) & z;
              if (N[v] === void 0) throw new Error("invalid block size " + v);
              var c = N[v];
              if (U) return n.readU64(i, e);
              e++;
              for (var l = 0; ;) {
                var g = n.readU32(i, e);
                if (((e += 4), g & D ? ((g &= ~D), (l += g)) : (l += c), g === 0)) return l;
                (h && (e += 4), (e += g));
              }
            }),
            (u.makeBuffer = $),
            (u.decompressBlock = function (i, e, r, h, U) {
              var v, c, l, g, k;
              for (l = r + h; r < l;) {
                var E = i[r++],
                  p = E >> 4;
                if (p > 0) {
                  if (p === 15) for (; (p += i[r]), i[r++] === 255;);
                  for (g = r + p; r < g;) e[U++] = i[r++];
                }
                if (r >= l) break;
                if (((v = E & 15), (c = i[r++] | (i[r++] << 8)), v === 15))
                  for (; (v += i[r]), i[r++] === 255;);
                for (v += o, k = U - c, g = k + v; k < g;) e[U++] = e[k++] | 0;
              }
              return U;
            }),
            (u.compressBlock = function (i, e, r, h, U) {
              var v, c, l, g, k, E, p, T, C;
              if (((p = 0), (T = h + r), (c = r), h >= y))
                for (var I = (1 << A) + 3; r + o < T - q;) {
                  var rr = n.readU32(i, r),
                    V = n.hashU32(rr) >>> 0;
                  if (
                    ((V = (((V >> 16) ^ V) >>> 0) & 65535),
                    (v = U[V] - 1),
                    (U[V] = r + 1),
                    v < 0 || (r - v) >>> 16 > 0 || n.readU32(i, v) !== rr)
                  ) {
                    ((k = I++ >> A), (r += k));
                    continue;
                  }
                  for (
                    I = (1 << A) + 3, E = r - c, g = r - v, r += o, v += o, l = r;
                    r < T - q && i[r] === i[v];
                  )
                    (r++, v++);
                  l = r - l;
                  var er = l < L ? l : L;
                  if (E >= M) {
                    for (e[p++] = (M << F) + er, C = E - M; C >= 255; C -= 255) e[p++] = 255;
                    e[p++] = C;
                  } else e[p++] = (E << F) + er;
                  for (var J = 0; J < E; J++) e[p++] = i[c + J];
                  if (((e[p++] = g), (e[p++] = g >> 8), l >= L)) {
                    for (C = l - L; C >= 255; C -= 255) e[p++] = 255;
                    e[p++] = C;
                  }
                  c = r;
                }
              if (c === 0) return 0;
              if (((E = T - c), E >= M)) {
                for (e[p++] = M << F, C = E - M; C >= 255; C -= 255) e[p++] = 255;
                e[p++] = C;
              } else e[p++] = E << F;
              for (r = c; r < T;) e[p++] = i[r++];
              return p;
            }),
            (u.decompressFrame = function (i, e) {
              var r,
                h,
                U,
                v,
                c = 0,
                l = 0;
              if (n.readU32(i, c) !== a) throw new Error("invalid magic number");
              if (((c += 4), (v = i[c++]), (v & H) !== w))
                throw new Error("incompatible descriptor version");
              ((r = (v & b) !== 0), (h = (v & t) !== 0), (U = (v & m) !== 0));
              var g = (i[c++] >> G) & z;
              if (N[g] === void 0) throw new Error("invalid block size");
              for (U && (c += 8), c++; ;) {
                var k;
                if (((k = n.readU32(i, c)), (c += 4), k === 0)) break;
                if ((r && (c += 4), (k & D) !== 0)) {
                  k &= ~D;
                  for (var E = 0; E < k; E++) e[l++] = i[c++];
                } else ((l = u.decompressBlock(i, e, c, k, l)), (c += k));
              }
              return (h && (c += 4), l);
            }),
            (u.compressFrame = function (i, e) {
              var r = 0;
              (n.writeU32(e, r, a),
                (r += 4),
                (e[r++] = w),
                (e[r++] = x << G),
                (e[r] = f.hash(0, e, 4, r - 4) >> 8),
                r++);
              var h = N[x],
                U = i.length,
                v = 0;
              for (or(); U > 0;) {
                var c = 0,
                  l = U > h ? h : U;
                if (((c = u.compressBlock(i, d, v, l, X)), c > l || c === 0)) {
                  (n.writeU32(e, r, 2147483648 | l), (r += 4));
                  for (var g = v + l; v < g;) e[r++] = i[v++];
                  U -= l;
                } else {
                  (n.writeU32(e, r, c), (r += 4));
                  for (var k = 0; k < c;) e[r++] = d[k++];
                  ((v += l), (U -= l));
                }
              }
              return (n.writeU32(e, r, 0), (r += 4), r);
            }),
            (u.decompress = function (i, e) {
              var r, h;
              return (
                e === void 0 && (e = u.decompressBound(i)),
                (r = u.makeBuffer(e)),
                (h = u.decompressFrame(i, r)),
                h !== e && (r = S(r, 0, h)),
                r
              );
            }),
            (u.compress = function (i, e) {
              var r, h;
              return (
                e === void 0 && (e = u.compressBound(i.length)),
                (r = u.makeBuffer(e)),
                (h = u.compressFrame(i, r)),
                h !== e && (r = S(r, 0, h)),
                r
              );
            }));
        })(P)),
      P
    );
  }
  var ur = nr(),
    Z = fr(ur);
  function _(u) {
    const f = new Uint8Array(4);
    return (
      (f[0] = u & 255),
      (f[1] = (u >>> 8) & 255),
      (f[2] = (u >>> 16) & 255),
      (f[3] = (u >>> 24) & 255),
      f
    );
  }
  function ar(u) {
    const f = u instanceof Uint8Array ? u : new Uint8Array(u),
      n = f.length,
      o = 4096,
      y = [];
    (y.push(new Uint8Array([88, 84, 90, 52])), y.push(_(n)), y.push(_(o)));
    const q = 65536,
      A = new Array(q);
    for (let B = 0; B < q; B++) A[B] = 0;
    for (let B = 0; B < n;) {
      const M = Math.min(o, n - B),
        d = Z.compressBound(M),
        X = new Uint8Array(d);
      for (let t = 0; t < q; t++) A[t] = 0;
      const a = Z.compressBlock(f, X, B, M, A);
      (a > 0 && a < M
        ? (y.push(_(a)), y.push(X.slice(0, a)))
        : (y.push(_(2147483648 | M)), y.push(f.slice(B, B + M))),
        (B += M));
    }
    let O = 0;
    for (const B of y) O += B.length;
    const F = new Uint8Array(O);
    let L = 0;
    for (const B of y) (F.set(B, L), (L += B.length));
    return F.buffer;
  }
  self.onmessage = (u) => {
    const { data: f } = u;
    try {
      const n = ar(f);
      self.postMessage(n, [n]);
    } catch (n) {
      self.postMessage({ error: n.message });
    }
  };
})();
