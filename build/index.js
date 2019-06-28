/*!
 *
 *   @alfdocimo/rondel v1.0.5
 *   https://github.com/alfdocimo/rondel
 *
 *   Copyright (c) Alfredo Narvaez Docimo (https://github.com/alfdocimo)
 *
 *   This source code is licensed under the MIT license found in the
 *   LICENSE file in the root directory of this source tree.
 *
 */
!(function(t, e) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
    ? define([], e)
    : 'object' == typeof exports
    ? (exports.Rondel = e())
    : (t.Rondel = e());
})(window, function() {
  return (function(t) {
    var e = {};
    function o(n) {
      if (e[n]) return e[n].exports;
      var r = (e[n] = { i: n, l: !1, exports: {} });
      return t[n].call(r.exports, r, r.exports, o), (r.l = !0), r.exports;
    }
    return (
      (o.m = t),
      (o.c = e),
      (o.d = function(t, e, n) {
        o.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
      }),
      (o.r = function(t) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(t, '__esModule', { value: !0 });
      }),
      (o.t = function(t, e) {
        if ((1 & e && (t = o(t)), 8 & e)) return t;
        if (4 & e && 'object' == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (
          (o.r(n),
          Object.defineProperty(n, 'default', { enumerable: !0, value: t }),
          2 & e && 'string' != typeof t)
        )
          for (var r in t)
            o.d(
              n,
              r,
              function(e) {
                return t[e];
              }.bind(null, r),
            );
        return n;
      }),
      (o.n = function(t) {
        var e =
          t && t.__esModule
            ? function() {
                return t.default;
              }
            : function() {
                return t;
              };
        return o.d(e, 'a', e), e;
      }),
      (o.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (o.p = ''),
      o((o.s = 3))
    );
  })([
    function(t, e) {
      function o(t) {
        return (o =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function(t) {
                return typeof t;
              }
            : function(t) {
                return t &&
                  'function' == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? 'symbol'
                  : typeof t;
              })(t);
      }
      function n(e) {
        return (
          'function' == typeof Symbol && 'symbol' === o(Symbol.iterator)
            ? (t.exports = n = function(t) {
                return o(t);
              })
            : (t.exports = n = function(t) {
                return t &&
                  'function' == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? 'symbol'
                  : o(t);
              }),
          n(e)
        );
      }
      t.exports = n;
    },
    function(t, e) {
      t.exports = function(t, e) {
        if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
      };
    },
    function(t, e) {
      t.exports = function(t, e, o) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = o),
          t
        );
      };
    },
    function(t, e, o) {
      'use strict';
      o.r(e);
      var n = o(0),
        r = o.n(n),
        u = o(1),
        i = o.n(u),
        f = o(2),
        c = o.n(f);
      e.default = function t() {
        i()(this, t),
          c()(this, 'createProtected', function(t) {
            var e = t.obj,
              o = t.modifiers;
            if ('object' !== r()(e) || 'object' !== r()(o))
              throw new Error('Parameters supplied are either not objects or not correctly named');
            var n = o.exposeDefault,
              u = void 0 === n ? 'unset property' : n,
              i = o.setNotAllowed,
              f = void 0 !== i && i;
            return new Proxy(e, {
              set: function(t) {
                if (f) throw new Error('Not allowed to set properties to this object');
              },
              get: function(t, e) {
                return e in t ? t[e] : u;
              },
            });
          });
      };
    },
  ]);
});
