// Copyright 2012 Google Inc. All rights reserved.

(function () {
  var data = {
    resource: {
      version: "2",

      macros: [
        { function: "__e" },
        {
          function: "__u",
          vtp_component: "URL",
          vtp_enableMultiQueryKeys: false,
          vtp_enableIgnoreEmptyQueryParam: false,
        },
        {
          function: "__u",
          vtp_component: "HOST",
          vtp_enableMultiQueryKeys: false,
          vtp_enableIgnoreEmptyQueryParam: false,
        },
        {
          function: "__u",
          vtp_component: "PATH",
          vtp_enableMultiQueryKeys: false,
          vtp_enableIgnoreEmptyQueryParam: false,
        },
        { function: "__f", vtp_component: "URL" },
        { function: "__e" },
      ],
      tags: [
        {
          function: "__lcl",
          vtp_waitForTags: false,
          vtp_checkValidation: false,
          vtp_waitForTagsTimeout: "2000",
          vtp_uniqueTriggerId: "169593255_3",
          tag_id: 0,
        },
      ],
      predicates: [{ function: "_eq", arg0: ["macro", 0], arg1: "gtm.js" }],
      rules: [
        [
          ["if", 0],
          ["add", 0],
        ],
      ],
    },
    runtime: [
      [
        50,
        "__e",
        [46, "a"],
        [
          36,
          [
            13,
            [41, "$0"],
            [3, "$0", ["require", "internal.getEventData"]],
            ["$0", "event"],
          ],
        ],
      ],
      [
        50,
        "__lcl",
        [46, "a"],
        [52, "b", ["require", "makeInteger"]],
        [52, "c", ["require", "makeString"]],
        [52, "d", ["require", "internal.enableAutoEventOnLinkClick"]],
        [52, "e", [8]],
        [
          22,
          [17, [15, "a"], "waitForTags"],
          [
            46,
            [43, [15, "e"], "waitForTags", true],
            [
              43,
              [15, "e"],
              "waitForTagsTimeout",
              ["b", [17, [15, "a"], "waitForTagsTimeout"]],
            ],
          ],
        ],
        [
          22,
          [17, [15, "a"], "checkValidation"],
          [46, [43, [15, "e"], "checkValidation", true]],
        ],
        [52, "f", [30, [17, [15, "a"], "uniqueTriggerId"], "0"]],
        ["d", [15, "e"], [15, "f"]],
        [2, [15, "a"], "gtmOnSuccess", [7]],
      ],
    ],
    entities: {
      __e: { 2: true, 4: true },
    },
    blob: { 1: "2" },
    permissions: {
      __e: {
        read_event_data: {
          eventDataAccess: "specific",
          keyPatterns: ["event"],
        },
      },
      __lcl: { detect_link_click_events: { allowWaitForTags: true } },
    },

    security_groups: {
      google: ["__e"],
    },
  };

  var ba,
    ca = function (a) {
      var b = 0;
      return function () {
        return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
      };
    },
    da =
      typeof Object.defineProperties == "function"
        ? Object.defineProperty
        : function (a, b, c) {
            if (a == Array.prototype || a == Object.prototype) return a;
            a[b] = c.value;
            return a;
          },
    ea = function (a) {
      for (
        var b = [
            "object" == typeof globalThis && globalThis,
            a,
            "object" == typeof window && window,
            "object" == typeof self && self,
            "object" == typeof global && global,
          ],
          c = 0;
        c < b.length;
        ++c
      ) {
        var d = b[c];
        if (d && d.Math == Math) return d;
      }
      throw Error("Cannot find global object");
    },
    fa = ea(this),
    ia = function (a, b) {
      if (b)
        a: {
          for (var c = fa, d = a.split("."), e = 0; e < d.length - 1; e++) {
            var f = d[e];
            if (!(f in c)) break a;
            c = c[f];
          }
          var g = d[d.length - 1],
            k = c[g],
            m = b(k);
          m != k &&
            m != null &&
            da(c, g, { configurable: !0, writable: !0, value: m });
        }
    };
  ia("Symbol", function (a) {
    if (a) return a;
    var b = function (f, g) {
      this.j = f;
      da(this, "description", { configurable: !0, writable: !0, value: g });
    };
    b.prototype.toString = function () {
      return this.j;
    };
    var c = "jscomp_symbol_" + ((Math.random() * 1e9) >>> 0) + "_",
      d = 0,
      e = function (f) {
        if (this instanceof e)
          throw new TypeError("Symbol is not a constructor");
        return new b(c + (f || "") + "_" + d++, f);
      };
    return e;
  });
  var ja = function (a) {
      return (a.raw = a);
    },
    ka = function (a, b) {
      a.raw = b;
      return a;
    },
    ma = function (a) {
      var b =
        typeof Symbol != "undefined" && Symbol.iterator && a[Symbol.iterator];
      if (b) return b.call(a);
      if (typeof a.length == "number") return { next: ca(a) };
      throw Error(String(a) + " is not an iterable or ArrayLike");
    },
    oa = function (a) {
      for (var b, c = []; !(b = a.next()).done; ) c.push(b.value);
      return c;
    },
    pa = function (a) {
      return a instanceof Array ? a : oa(ma(a));
    },
    qa =
      typeof Object.assign == "function"
        ? Object.assign
        : function (a, b) {
            for (var c = 1; c < arguments.length; c++) {
              var d = arguments[c];
              if (d)
                for (var e in d)
                  Object.prototype.hasOwnProperty.call(d, e) && (a[e] = d[e]);
            }
            return a;
          };
  ia("Object.assign", function (a) {
    return a || qa;
  });
  var ra =
      typeof Object.create == "function"
        ? Object.create
        : function (a) {
            var b = function () {};
            b.prototype = a;
            return new b();
          },
    sa;
  if (typeof Object.setPrototypeOf == "function") sa = Object.setPrototypeOf;
  else {
    var ta;
    a: {
      var ua = { a: !0 },
        va = {};
      try {
        va.__proto__ = ua;
        ta = va.a;
        break a;
      } catch (a) {}
      ta = !1;
    }
    sa = ta
      ? function (a, b) {
          a.__proto__ = b;
          if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
          return a;
        }
      : null;
  }
  var wa = sa,
    xa = function (a, b) {
      a.prototype = ra(b.prototype);
      a.prototype.constructor = a;
      if (wa) wa(a, b);
      else
        for (var c in b)
          if (c != "prototype")
            if (Object.defineProperties) {
              var d = Object.getOwnPropertyDescriptor(b, c);
              d && Object.defineProperty(a, c, d);
            } else a[c] = b[c];
      a.Xn = b.prototype;
    },
    za = function () {
      for (var a = Number(this), b = [], c = a; c < arguments.length; c++)
        b[c - a] = arguments[c];
      return b;
    }; /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
  var Aa = this || self,
    Ba = function (a) {
      return a;
    };
  var Ca = function (a, b) {
    this.type = a;
    this.data = b;
  };
  var Da = function () {
    this.j = {};
    this.H = {};
  };
  ba = Da.prototype;
  ba.get = function (a) {
    return this.j["dust." + a];
  };
  ba.set = function (a, b) {
    a = "dust." + a;
    this.H.hasOwnProperty(a) || (this.j[a] = b);
  };
  ba.Xh = function (a, b) {
    this.set(a, b);
    this.H["dust." + a] = !0;
  };
  ba.has = function (a) {
    return this.j.hasOwnProperty("dust." + a);
  };
  ba.Ff = function (a) {
    a = "dust." + a;
    this.H.hasOwnProperty(a) || delete this.j[a];
  };
  var Ea = function () {};
  Ea.prototype.reset = function () {};
  var Fa = function (a, b) {
    this.P = a;
    this.parent = b;
    this.j = this.D = void 0;
    this.K = !1;
    this.H = function (c, d, e) {
      return c.apply(d, e);
    };
    this.values = new Da();
  };
  Fa.prototype.add = function (a, b) {
    Ha(this, a, b, !1);
  };
  var Ha = function (a, b, c, d) {
    a.K || (d ? a.values.Xh(b, c) : a.values.set(b, c));
  };
  Fa.prototype.set = function (a, b) {
    this.K ||
      (!this.values.has(a) && this.parent && this.parent.has(a)
        ? this.parent.set(a, b)
        : this.values.set(a, b));
  };
  Fa.prototype.get = function (a) {
    return this.values.has(a)
      ? this.values.get(a)
      : this.parent
      ? this.parent.get(a)
      : void 0;
  };
  Fa.prototype.has = function (a) {
    return !!this.values.has(a) || !(!this.parent || !this.parent.has(a));
  };
  var Ia = function (a) {
    var b = new Fa(a.P, a);
    a.D && (b.D = a.D);
    b.H = a.H;
    b.j = a.j;
    return b;
  };
  Fa.prototype.ud = function () {
    return this.P;
  };
  Fa.prototype.La = function () {
    this.K = !0;
  };
  function Ja(a, b) {
    for (
      var c, d = 0;
      d < b.length && !((c = Ka(a, b[d])), c instanceof Ca);
      d++
    );
    return c;
  }
  function Ka(a, b) {
    try {
      var c = a.get(String(b[0]));
      if (!c || typeof c.invoke !== "function")
        throw Error("Attempting to execute non-function " + b[0] + ".");
      return c.invoke.apply(c, [a].concat(b.slice(1)));
    } catch (e) {
      var d = a.D;
      d && d(e, b.context ? { id: b[0], line: b.context.line } : null);
      throw e;
    }
  }
  var La = function () {
    this.D = new Ea();
    this.j = new Fa(this.D);
  };
  ba = La.prototype;
  ba.ud = function () {
    return this.D;
  };
  ba.execute = function (a) {
    var b = Array.prototype.slice.call(arguments, 0);
    return this.Vh(b);
  };
  ba.Vh = function () {
    for (var a, b = 0; b < arguments.length; b++) a = Ka(this.j, arguments[b]);
    return a;
  };
  ba.Uk = function (a) {
    var b = Ia(this.j);
    b.j = a;
    for (var c, d = 1; d < arguments.length; d++) c = Ka(b, arguments[d]);
    return c;
  };
  ba.La = function () {
    this.j.La();
  };
  var Ma = function () {
    Da.call(this);
    this.D = !1;
  };
  xa(Ma, Da);
  var Oa = function (a, b) {
    var c = [],
      d;
    for (d in a.j)
      if (a.j.hasOwnProperty(d))
        switch (((d = d.substr(5)), b)) {
          case 1:
            c.push(d);
            break;
          case 2:
            c.push(a.get(d));
            break;
          case 3:
            c.push([d, a.get(d)]);
        }
    return c;
  };
  Ma.prototype.set = function (a, b) {
    this.D || Da.prototype.set.call(this, a, b);
  };
  Ma.prototype.Xh = function (a, b) {
    this.D || Da.prototype.Xh.call(this, a, b);
  };
  Ma.prototype.Ff = function (a) {
    this.D || Da.prototype.Ff.call(this, a);
  };
  Ma.prototype.La = function () {
    this.D = !0;
  }; /*
 jQuery (c) 2005, 2012 jQuery Foundation, Inc. jquery.org/license.
*/
  var Pa = /\[object (Boolean|Number|String|Function|Array|Date|RegExp)\]/,
    Qa = function (a) {
      if (a == null) return String(a);
      var b = Pa.exec(Object.prototype.toString.call(Object(a)));
      return b ? b[1].toLowerCase() : "object";
    },
    Ra = function (a, b) {
      return Object.prototype.hasOwnProperty.call(Object(a), b);
    },
    Ta = function (a) {
      if (!a || Qa(a) != "object" || a.nodeType || a == a.window) return !1;
      try {
        if (
          a.constructor &&
          !Ra(a, "constructor") &&
          !Ra(a.constructor.prototype, "isPrototypeOf")
        )
          return !1;
      } catch (c) {
        return !1;
      }
      for (var b in a);
      return b === void 0 || Ra(a, b);
    },
    h = function (a, b) {
      var c = b || (Qa(a) == "array" ? [] : {}),
        d;
      for (d in a)
        if (Ra(a, d)) {
          var e = a[d];
          Qa(e) == "array"
            ? (Qa(c[d]) != "array" && (c[d] = []), (c[d] = h(e, c[d])))
            : Ta(e)
            ? (Ta(c[d]) || (c[d] = {}), (c[d] = h(e, c[d])))
            : (c[d] = e);
        }
      return c;
    };
  function Ua(a) {
    if (a == void 0 || Array.isArray(a) || Ta(a)) return !0;
    switch (typeof a) {
      case "boolean":
      case "number":
      case "string":
      case "function":
        return !0;
    }
    return !1;
  }
  function Va(a) {
    return (
      (typeof a === "number" && a >= 0 && isFinite(a) && a % 1 === 0) ||
      (typeof a === "string" && a[0] !== "-" && a === "" + parseInt(a))
    );
  }
  var Wa = function (a) {
    this.j = [];
    this.H = !1;
    this.D = new Ma();
    a = a || [];
    for (var b in a)
      a.hasOwnProperty(b) &&
        (Va(b) ? (this.j[Number(b)] = a[Number(b)]) : this.D.set(b, a[b]));
  };
  ba = Wa.prototype;
  ba.toString = function (a) {
    if (a && a.indexOf(this) >= 0) return "";
    for (var b = [], c = 0; c < this.j.length; c++) {
      var d = this.j[c];
      d === null || d === void 0
        ? b.push("")
        : d instanceof Wa
        ? ((a = a || []), a.push(this), b.push(d.toString(a)), a.pop())
        : b.push(String(d));
    }
    return b.join(",");
  };
  ba.set = function (a, b) {
    if (!this.H)
      if (a === "length") {
        if (!Va(b))
          throw Error("RangeError: Length property must be a valid integer.");
        this.j.length = Number(b);
      } else Va(a) ? (this.j[Number(a)] = b) : this.D.set(a, b);
  };
  ba.get = function (a) {
    return a === "length"
      ? this.length()
      : Va(a)
      ? this.j[Number(a)]
      : this.D.get(a);
  };
  ba.length = function () {
    return this.j.length;
  };
  ba.Pb = function () {
    for (var a = Oa(this.D, 1), b = 0; b < this.j.length; b++) a.push(b + "");
    return new Wa(a);
  };
  var Xa = function (a, b) {
    Va(b) ? delete a.j[Number(b)] : a.D.Ff(b);
  };
  ba = Wa.prototype;
  ba.pop = function () {
    return this.j.pop();
  };
  ba.push = function () {
    return this.j.push.apply(this.j, Array.prototype.slice.call(arguments));
  };
  ba.shift = function () {
    return this.j.shift();
  };
  ba.splice = function (a, b) {
    return new Wa(this.j.splice.apply(this.j, arguments));
  };
  ba.unshift = function () {
    return this.j.unshift.apply(this.j, Array.prototype.slice.call(arguments));
  };
  ba.has = function (a) {
    return (Va(a) && this.j.hasOwnProperty(a)) || this.D.has(a);
  };
  ba.La = function () {
    this.H = !0;
    Object.freeze(this.j);
    this.D.La();
  };
  function Ya(a) {
    for (var b = [], c = 0; c < a.length(); c++) a.has(c) && (b[c] = a.get(c));
    return b;
  }
  var Za = function () {
    Ma.call(this);
  };
  xa(Za, Ma);
  Za.prototype.Pb = function () {
    return new Wa(Oa(this, 1));
  };
  var $a = function (a) {
    for (var b = Oa(a, 3), c = new Wa(), d = 0; d < b.length; d++) {
      var e = new Wa(b[d]);
      c.push(e);
    }
    return c;
  };
  function ab() {
    for (var a = bb, b = {}, c = 0; c < a.length; ++c) b[a[c]] = c;
    return b;
  }
  function db() {
    var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    a += a.toLowerCase() + "0123456789-_";
    return a + ".";
  }
  var bb, eb;
  function fb(a) {
    bb = bb || db();
    eb = eb || ab();
    for (var b = [], c = 0; c < a.length; c += 3) {
      var d = c + 1 < a.length,
        e = c + 2 < a.length,
        f = a.charCodeAt(c),
        g = d ? a.charCodeAt(c + 1) : 0,
        k = e ? a.charCodeAt(c + 2) : 0,
        m = f >> 2,
        n = ((f & 3) << 4) | (g >> 4),
        p = ((g & 15) << 2) | (k >> 6),
        q = k & 63;
      e || ((q = 64), d || (p = 64));
      b.push(bb[m], bb[n], bb[p], bb[q]);
    }
    return b.join("");
  }
  function gb(a) {
    function b(m) {
      for (; d < a.length; ) {
        var n = a.charAt(d++),
          p = eb[n];
        if (p != null) return p;
        if (!/^[\s\xa0]*$/.test(n))
          throw Error("Unknown base64 encoding at char: " + n);
      }
      return m;
    }
    bb = bb || db();
    eb = eb || ab();
    for (var c = "", d = 0; ; ) {
      var e = b(-1),
        f = b(0),
        g = b(64),
        k = b(64);
      if (k === 64 && e === -1) return c;
      c += String.fromCharCode((e << 2) | (f >> 4));
      g !== 64 &&
        ((c += String.fromCharCode(((f << 4) & 240) | (g >> 2))),
        k !== 64 && (c += String.fromCharCode(((g << 6) & 192) | k)));
    }
  }
  var hb = {};
  function ib(a, b) {
    hb[a] = hb[a] || [];
    hb[a][b] = !0;
  }
  function jb(a) {
    var b = hb[a];
    if (!b || b.length === 0) return "";
    for (var c = [], d = 0, e = 0; e < b.length; e++)
      e % 8 === 0 && e > 0 && (c.push(String.fromCharCode(d)), (d = 0)),
        b[e] && (d |= 1 << e % 8);
    d > 0 && c.push(String.fromCharCode(d));
    return fb(c.join("")).replace(/\.+$/, "");
  }
  function kb() {
    for (var a = [], b = hb.fdr || [], c = 0; c < b.length; c++)
      b[c] && a.push(c);
    return a.length > 0 ? a : void 0;
  }
  var lb = [],
    mb = {};
  function nb(a) {
    return lb[a] === void 0 ? !1 : lb[a];
  }
  function ob() {}
  function pb(a) {
    return typeof a === "function";
  }
  function l(a) {
    return typeof a === "string";
  }
  function qb(a) {
    return typeof a === "number" && !isNaN(a);
  }
  function rb(a) {
    return Array.isArray(a) ? a : [a];
  }
  function sb(a, b) {
    if (a && Array.isArray(a))
      for (var c = 0; c < a.length; c++) if (a[c] && b(a[c])) return a[c];
  }
  function tb(a, b) {
    if (!qb(a) || !qb(b) || a > b) (a = 0), (b = 2147483647);
    return Math.floor(Math.random() * (b - a + 1) + a);
  }
  function ub(a, b) {
    for (var c = new vb(), d = 0; d < a.length; d++) c.set(a[d], !0);
    for (var e = 0; e < b.length; e++) if (c.get(b[e])) return !0;
    return !1;
  }
  function z(a, b) {
    for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b(c, a[c]);
  }
  function wb(a) {
    return (
      !!a &&
      (Object.prototype.toString.call(a) === "[object Arguments]" ||
        Object.prototype.hasOwnProperty.call(a, "callee"))
    );
  }
  function xb(a) {
    return Math.round(Number(a)) || 0;
  }
  function yb(a) {
    return "false" === String(a).toLowerCase() ? !1 : !!a;
  }
  function zb(a) {
    var b = [];
    if (Array.isArray(a))
      for (var c = 0; c < a.length; c++) b.push(String(a[c]));
    return b;
  }
  function Ab(a) {
    return a ? a.replace(/^\s+|\s+$/g, "") : "";
  }
  function Bb() {
    return new Date(Date.now());
  }
  function Cb() {
    return Bb().getTime();
  }
  var vb = function () {
    this.prefix = "gtm.";
    this.values = {};
  };
  vb.prototype.set = function (a, b) {
    this.values[this.prefix + a] = b;
  };
  vb.prototype.get = function (a) {
    return this.values[this.prefix + a];
  };
  function Db(a, b, c) {
    return a && a.hasOwnProperty(b) ? a[b] : c;
  }
  function Eb(a) {
    var b = a;
    return function () {
      if (b) {
        var c = b;
        b = void 0;
        try {
          c();
        } catch (d) {}
      }
    };
  }
  function Fb(a, b) {
    for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
  }
  function Gb(a, b) {
    for (var c = [], d = 0; d < a.length; d++)
      c.push(a[d]), c.push.apply(c, b[a[d]] || []);
    return c;
  }
  function Hb(a, b) {
    return a.length >= b.length && a.substring(0, b.length) === b;
  }
  function Ib(a, b) {
    return (
      a.length >= b.length && a.substring(a.length - b.length, a.length) === b
    );
  }
  function Jb(a, b) {
    var c = G;
    b = b || [];
    for (var d = c, e = 0; e < a.length - 1; e++) {
      if (!d.hasOwnProperty(a[e])) return;
      d = d[a[e]];
      if (b.indexOf(d) >= 0) return;
    }
    return d;
  }
  function Kb(a, b) {
    for (var c = {}, d = c, e = a.split("."), f = 0; f < e.length - 1; f++)
      d = d[e[f]] = {};
    d[e[e.length - 1]] = b;
    return c;
  }
  var Lb = /^\w{1,9}$/;
  function Mb(a, b) {
    a = a || {};
    b = b || ",";
    var c = [];
    z(a, function (d, e) {
      Lb.test(d) && e && c.push(d);
    });
    return c.join(b);
  }
  function Nb(a, b) {
    function c() {
      e && ++d === b && (e(), (e = null), (c.done = !0));
    }
    var d = 0,
      e = a;
    c.done = !1;
    return c;
  }
  function Ob(a) {
    if (!a) return a;
    var b = a;
    if (nb(3))
      try {
        b = decodeURIComponent(a);
      } catch (d) {}
    var c = b.split(",");
    return c.length === 2 && c[0] === c[1] ? c[0] : a;
  }
  var Pb,
    Qb = function () {
      if (Pb === void 0) {
        var a = null,
          b = Aa.trustedTypes;
        if (b && b.createPolicy) {
          try {
            a = b.createPolicy("goog#html", {
              createHTML: Ba,
              createScript: Ba,
              createScriptURL: Ba,
            });
          } catch (c) {
            Aa.console && Aa.console.error(c.message);
          }
          Pb = a;
        } else Pb = a;
      }
      return Pb;
    };
  var Rb = function (a) {
    this.j = a;
  };
  Rb.prototype.toString = function () {
    return this.j + "";
  };
  var Sb = function (a) {
      return a instanceof Rb && a.constructor === Rb
        ? a.j
        : "type_error:TrustedResourceUrl";
    },
    Tb = {},
    Ub = function (a) {
      var b = a,
        c = Qb(),
        d = c ? c.createScriptURL(b) : b;
      return new Rb(d, Tb);
    }; /*

 SPDX-License-Identifier: Apache-2.0
*/
  var Vb = ja([""]),
    Wb = ka(["\x00"], ["\\0"]),
    Xb = ka(["\n"], ["\\n"]),
    Yb = ka(["\x00"], ["\\u0000"]);
  function Zb(a) {
    return a.toString().indexOf("`") === -1;
  }
  Zb(function (a) {
    return a(Vb);
  }) ||
    Zb(function (a) {
      return a(Wb);
    }) ||
    Zb(function (a) {
      return a(Xb);
    }) ||
    Zb(function (a) {
      return a(Yb);
    });
  var $b = function (a) {
    this.j = a;
  };
  $b.prototype.toString = function () {
    return this.j;
  };
  var ac = new $b("about:invalid#zClosurez");
  var bc = function (a) {
    this.om = a;
  };
  function cc(a) {
    return new bc(function (b) {
      return b.substr(0, a.length + 1).toLowerCase() === a + ":";
    });
  }
  var dc = [
    cc("data"),
    cc("http"),
    cc("https"),
    cc("mailto"),
    cc("ftp"),
    new bc(function (a) {
      return /^[^:]*([/?#]|$)/.test(a);
    }),
  ];
  function ec(a, b) {
    b = b === void 0 ? dc : b;
    if (a instanceof $b) return a;
    for (var c = 0; c < b.length; ++c) {
      var d = b[c];
      if (d instanceof bc && d.om(a)) return new $b(a);
    }
  }
  function fc(a) {
    var b;
    b = b === void 0 ? dc : b;
    return ec(a, b) || ac;
  }
  var gc = /^\s*(?!javascript:)(?:[\w+.-]+:|[^:/?#]*(?:[/?#]|$))/i;
  function hc(a) {
    var b;
    if (a instanceof $b)
      if (a instanceof $b) b = a.j;
      else throw Error("");
    else b = gc.test(a) ? a : void 0;
    return b;
  }
  var jc = function () {
    this.j = ic[0].toLowerCase();
  };
  jc.prototype.toString = function () {
    return this.j;
  };
  var kc = Array.prototype.indexOf
    ? function (a, b) {
        return Array.prototype.indexOf.call(a, b, void 0);
      }
    : function (a, b) {
        if (typeof a === "string")
          return typeof b !== "string" || b.length != 1 ? -1 : a.indexOf(b, 0);
        for (var c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
        return -1;
      };
  var lc = {},
    mc = function (a) {
      this.j = a;
    };
  mc.prototype.toString = function () {
    return this.j.toString();
  };
  function nc(a, b) {
    var c = [new jc()];
    if (c.length === 0) throw Error("");
    var d = c.map(function (f) {
        var g;
        if (f instanceof jc) g = f.j;
        else throw Error("");
        return g;
      }),
      e = b.toLowerCase();
    if (
      d.every(function (f) {
        return e.indexOf(f) !== 0;
      })
    )
      throw Error(
        'Attribute "' + b + '" does not match any of the allowed prefixes.'
      );
    a.setAttribute(b, "true");
  }
  function oc(a, b) {
    var c = hc(b);
    c !== void 0 && (a.action = c);
  }
  "ARTICLE SECTION NAV ASIDE H1 H2 H3 H4 H5 H6 HEADER FOOTER ADDRESS P HR PRE BLOCKQUOTE OL UL LH LI DL DT DD FIGURE FIGCAPTION MAIN DIV EM STRONG SMALL S CITE Q DFN ABBR RUBY RB RT RTC RP DATA TIME CODE VAR SAMP KBD SUB SUP I B U MARK BDI BDO SPAN BR WBR NOBR INS DEL PICTURE PARAM TRACK MAP TABLE CAPTION COLGROUP COL TBODY THEAD TFOOT TR TD TH SELECT DATALIST OPTGROUP OPTION OUTPUT PROGRESS METER FIELDSET LEGEND DETAILS SUMMARY MENU DIALOG SLOT CANVAS FONT CENTER ACRONYM BASEFONT BIG DIR HGROUP STRIKE TT"
    .split(" ")
    .concat(["BUTTON", "INPUT"]);
  function pc(a) {
    return a === null ? "null" : a === void 0 ? "undefined" : a;
  }
  var G = window,
    H = document,
    qc = navigator,
    rc = function () {
      var a;
      try {
        a = qc.serviceWorker;
      } catch (b) {
        return;
      }
      return a;
    },
    sc = H.currentScript,
    tc = sc && sc.src,
    uc = function (a, b) {
      var c = G[a];
      G[a] = c === void 0 ? b : c;
      return G[a];
    };
  function vc(a) {
    return (qc.userAgent || "").indexOf(a) !== -1;
  }
  var wc = function (a, b) {
      b &&
        (a.addEventListener
          ? (a.onload = b)
          : (a.onreadystatechange = function () {
              a.readyState in { loaded: 1, complete: 1 } &&
                ((a.onreadystatechange = null), b());
            }));
    },
    xc = { async: 1, nonce: 1, onerror: 1, onload: 1, src: 1, type: 1 },
    yc = { onload: 1, src: 1, width: 1, height: 1, style: 1 };
  function zc(a, b, c) {
    b &&
      z(b, function (d, e) {
        d = d.toLowerCase();
        c.hasOwnProperty(d) || a.setAttribute(d, e);
      });
  }
  var Ac = function (a, b, c, d, e) {
      var f = H.createElement("script");
      zc(f, d, xc);
      f.type = "text/javascript";
      f.async = d && d.async === !1 ? !1 : !0;
      var g;
      g = Ub(pc(a));
      f.src = Sb(g);
      var k,
        m,
        n,
        p =
          (n = (m = ((f.ownerDocument && f.ownerDocument.defaultView) || window)
            .document).querySelector) == null
            ? void 0
            : n.call(m, "script[nonce]");
      (k = p ? p.nonce || p.getAttribute("nonce") || "" : "") &&
        f.setAttribute("nonce", k);
      wc(f, b);
      c && (f.onerror = c);
      if (e) e.appendChild(f);
      else {
        var q = H.getElementsByTagName("script")[0] || H.body || H.head;
        q.parentNode.insertBefore(f, q);
      }
      return f;
    },
    Bc = function () {
      if (tc) {
        var a = tc.toLowerCase();
        if (a.indexOf("https://") === 0) return 2;
        if (a.indexOf("http://") === 0) return 3;
      }
      return 1;
    },
    Cc = function (a, b, c, d, e) {
      var f;
      f = f === void 0 ? !0 : f;
      var g = e,
        k = !1;
      g || ((g = H.createElement("iframe")), (k = !0));
      zc(g, c, yc);
      d &&
        z(d, function (n, p) {
          g.dataset[n] = p;
        });
      f &&
        ((g.height = "0"),
        (g.width = "0"),
        (g.style.display = "none"),
        (g.style.visibility = "hidden"));
      a !== void 0 && (g.src = a);
      if (k) {
        var m = (H.body && H.body.lastChild) || H.body || H.head;
        m.parentNode.insertBefore(g, m);
      }
      wc(g, b);
      return g;
    },
    Dc = function (a, b, c, d) {
      var e = new Image(1, 1);
      zc(e, d, {});
      e.onload = function () {
        e.onload = null;
        b && b();
      };
      e.onerror = function () {
        e.onerror = null;
        c && c();
      };
      e.src = a;
      return e;
    },
    Ec = function (a, b, c, d) {
      a.addEventListener
        ? a.addEventListener(b, c, !!d)
        : a.attachEvent && a.attachEvent("on" + b, c);
    },
    Fc = function (a, b, c) {
      a.removeEventListener
        ? a.removeEventListener(b, c, !1)
        : a.detachEvent && a.detachEvent("on" + b, c);
    },
    I = function (a) {
      G.setTimeout(a, 0);
    },
    Gc = function (a, b) {
      return a && b && a.attributes && a.attributes[b]
        ? a.attributes[b].value
        : null;
    },
    Hc = function (a) {
      function b(e) {
        e && e != " " && (e = e.replace(/^[\s\xa0]+|[\s\xa0]+$/g, ""));
        e && e != " " && (e = e.replace(/^[\s\xa0]+|[\s\xa0]+$/g, ""));
        e && (e = e.replace(/(\xa0+|\s{2,}|\n|\r\t)/g, " "));
        return e;
      }
      var c = b(a.innerText || a.textContent || "");
      if (nb(10)) {
        var d = b(a.textContent || "");
        ib("TAGGING", 26);
        d !== c && ib("TAGGING", 25);
      }
      return c;
    },
    Ic = function (a) {
      var b = H.createElement("div"),
        c = b,
        d,
        e = pc("A<div>" + a + "</div>"),
        f = Qb(),
        g = f ? f.createHTML(e) : e;
      d = new mc(g, lc);
      if (c.nodeType === 1) {
        var k = c.tagName;
        if (k === "SCRIPT" || k === "STYLE") throw Error("");
      }
      c.innerHTML =
        d instanceof mc && d.constructor === mc ? d.j : "type_error:SafeHtml";
      b = b.lastChild;
      for (var m = []; b.firstChild; ) m.push(b.removeChild(b.firstChild));
      return m;
    },
    Jc = function (a, b, c) {
      c = c || 100;
      for (var d = {}, e = 0; e < b.length; e++) d[b[e]] = !0;
      for (var f = a, g = 0; f && g <= c; g++) {
        if (d[String(f.tagName).toLowerCase()]) return f;
        f = f.parentElement;
      }
      return null;
    },
    Kc = function (a) {
      var b;
      try {
        b = qc.sendBeacon && qc.sendBeacon(a);
      } catch (c) {
        ib("TAGGING", 15);
      }
      b || Dc(a);
    },
    Lc = function (a, b) {
      try {
        return qc.sendBeacon(a, b);
      } catch (c) {
        ib("TAGGING", 15);
      }
      return !1;
    },
    Mc = {
      cache: "no-store",
      credentials: "include",
      keepalive: !0,
      method: "POST",
      mode: "no-cors",
      redirect: "follow",
    },
    Oc = function (a, b, c) {
      if (Nc()) {
        var d = Object.assign({}, Mc);
        b && (d.body = b);
        c &&
          (c.attributionReporting &&
            (d.attributionReporting = c.attributionReporting),
          c.browsingTopics && (d.browsingTopics = c.browsingTopics));
        try {
          var e = G.fetch(a, d);
          e && e.catch(ob);
          return !0;
        } catch (f) {}
      }
      if (c && c.noFallback) return !1;
      if (b) return Lc(a, b);
      Kc(a);
      return !0;
    },
    Nc = function () {
      return typeof G.fetch === "function";
    },
    Pc = function (a, b) {
      var c = a[b];
      c && typeof c.animVal === "string" && (c = c.animVal);
      return c;
    },
    Qc = function () {
      var a = G.performance;
      if (a && pb(a.now)) return a.now();
    },
    Rc = function () {
      return G.performance || void 0;
    };
  function Sc(a, b) {
    return this.evaluate(a) && this.evaluate(b);
  }
  function Tc(a, b) {
    return this.evaluate(a) === this.evaluate(b);
  }
  function Uc(a, b) {
    return this.evaluate(a) || this.evaluate(b);
  }
  function Vc(a, b) {
    a = this.evaluate(a);
    b = this.evaluate(b);
    return String(a).indexOf(String(b)) > -1;
  }
  function Wc(a, b) {
    var c = String(this.evaluate(a)),
      d = String(this.evaluate(b));
    return c.substring(0, d.length) === d;
  }
  function Xc(a, b) {
    a = this.evaluate(a);
    b = this.evaluate(b);
    switch (a) {
      case "pageLocation":
        var c = G.location.href;
        b instanceof Za &&
          b.get("stripProtocol") &&
          (c = c.replace(/^https?:\/\//, ""));
        return c;
    }
  }
  var Yc = function (a, b) {
    Ma.call(this);
    this.Xj = a;
    this.rh = b;
  };
  xa(Yc, Ma);
  ba = Yc.prototype;
  ba.toString = function () {
    return this.Xj;
  };
  ba.getName = function () {
    return this.Xj;
  };
  ba.Pb = function () {
    return new Wa(Oa(this, 1));
  };
  ba.invoke = function (a) {
    return this.rh.apply(
      new Zc(this, a),
      Array.prototype.slice.call(arguments, 1)
    );
  };
  ba.jb = function (a) {
    try {
      return this.invoke.apply(this, Array.prototype.slice.call(arguments, 0));
    } catch (b) {}
  };
  var Zc = function (a, b) {
    this.rh = a;
    this.F = b;
  };
  Zc.prototype.evaluate = function (a) {
    var b = this.F;
    return Array.isArray(a) ? Ka(b, a) : a;
  };
  Zc.prototype.getName = function () {
    return this.rh.getName();
  };
  Zc.prototype.ud = function () {
    return this.F.ud();
  };
  var $c = function () {
    this.map = new Map();
  };
  $c.prototype.set = function (a, b) {
    this.map.set(a, b);
  };
  $c.prototype.get = function (a) {
    return this.map.get(a);
  };
  var ad = function () {
    this.keys = [];
    this.values = [];
  };
  ad.prototype.set = function (a, b) {
    this.keys.push(a);
    this.values.push(b);
  };
  ad.prototype.get = function (a) {
    var b = this.keys.indexOf(a);
    if (b > -1) return this.values[b];
  };
  function bd() {
    try {
      return Map ? new $c() : new ad();
    } catch (a) {
      return new ad();
    }
  }
  var cd = function (a) {
    if (a instanceof cd) return a;
    if (Ua(a)) throw Error("Type of given value has an equivalent Pixie type.");
    this.value = a;
  };
  cd.prototype.getValue = function () {
    return this.value;
  };
  cd.prototype.toString = function () {
    return String(this.value);
  };
  var ed = function (a) {
    Ma.call(this);
    this.promise = a;
    this.set("then", dd(this));
    this.set("catch", dd(this, !0));
    this.set("finally", dd(this, !1, !0));
  };
  xa(ed, Za);
  var dd = function (a, b, c) {
    b = b === void 0 ? !1 : b;
    c = c === void 0 ? !1 : c;
    return new Yc("", function (d, e) {
      b && ((e = d), (d = void 0));
      c && (e = d);
      d instanceof Yc || (d = void 0);
      e instanceof Yc || (e = void 0);
      var f = Ia(this.F),
        g = function (m) {
          return function (n) {
            return c ? (m.invoke(f), a.promise) : m.invoke(f, n);
          };
        },
        k = a.promise.then(d && g(d), e && g(e));
      return new ed(k);
    });
  };
  function J(a, b, c) {
    var d = bd(),
      e = function (g, k) {
        for (var m = Oa(g, 1), n = 0; n < m.length; n++)
          k[m[n]] = f(g.get(m[n]));
      },
      f = function (g) {
        var k = d.get(g);
        if (k) return k;
        if (g instanceof Wa) {
          var m = [];
          d.set(g, m);
          for (var n = g.Pb(), p = 0; p < n.length(); p++)
            m[n.get(p)] = f(g.get(n.get(p)));
          return m;
        }
        if (g instanceof ed) return g.promise;
        if (g instanceof Za) {
          var q = {};
          d.set(g, q);
          e(g, q);
          return q;
        }
        if (g instanceof Yc) {
          var r = function () {
            for (
              var u = Array.prototype.slice.call(arguments, 0), v = 0;
              v < u.length;
              v++
            )
              u[v] = fd(u[v], b, c);
            var w = new Fa(b ? b.ud() : new Ea());
            b && (w.j = b.j);
            return f(g.invoke.apply(g, [w].concat(u)));
          };
          d.set(g, r);
          e(g, r);
          return r;
        }
        var t = !1;
        switch (c) {
          case 1:
            t = !0;
            break;
          case 2:
            t = !1;
            break;
          case 3:
            t = !1;
            break;
          default:
        }
        if (g instanceof cd && t) return g.getValue();
        switch (typeof g) {
          case "boolean":
          case "number":
          case "string":
          case "undefined":
            return g;
          case "object":
            if (g === null) return null;
        }
      };
    return f(a);
  }
  function fd(a, b, c) {
    var d = bd(),
      e = function (g, k) {
        for (var m in g) g.hasOwnProperty(m) && k.set(m, f(g[m]));
      },
      f = function (g) {
        var k = d.get(g);
        if (k) return k;
        if (Array.isArray(g) || wb(g)) {
          var m = new Wa([]);
          d.set(g, m);
          for (var n in g) g.hasOwnProperty(n) && m.set(n, f(g[n]));
          return m;
        }
        if (Ta(g)) {
          var p = new Za();
          d.set(g, p);
          e(g, p);
          return p;
        }
        if (typeof g === "function") {
          var q = new Yc("", function () {
            for (
              var x = Array.prototype.slice.call(arguments, 0), y = 0;
              y < x.length;
              y++
            )
              x[y] = J(this.evaluate(x[y]), b, c);
            return f((0, this.F.H)(g, g, x));
          });
          d.set(g, q);
          e(g, q);
          return q;
        }
        var v = typeof g;
        if (g === null || v === "string" || v === "number" || v === "boolean")
          return g;
        var w = !1;
        switch (c) {
          case 1:
            w = !0;
            break;
          case 2:
            w = !1;
            break;
          default:
        }
        if (g !== void 0 && w) return new cd(g);
      };
    return f(a);
  }
  function gd() {
    var a = !1;
    return a;
  }
  var hd = {
    supportedMethods:
      "concat every filter forEach hasOwnProperty indexOf join lastIndexOf map pop push reduce reduceRight reverse shift slice some sort splice unshift toString".split(
        " "
      ),
    concat: function (a) {
      for (var b = [], c = 0; c < this.length(); c++) b.push(this.get(c));
      for (var d = 1; d < arguments.length; d++)
        if (arguments[d] instanceof Wa)
          for (var e = arguments[d], f = 0; f < e.length(); f++)
            b.push(e.get(f));
        else b.push(arguments[d]);
      return new Wa(b);
    },
    every: function (a, b) {
      for (var c = this.length(), d = 0; d < this.length() && d < c; d++)
        if (this.has(d) && !b.invoke(a, this.get(d), d, this)) return !1;
      return !0;
    },
    filter: function (a, b) {
      for (
        var c = this.length(), d = [], e = 0;
        e < this.length() && e < c;
        e++
      )
        this.has(e) && b.invoke(a, this.get(e), e, this) && d.push(this.get(e));
      return new Wa(d);
    },
    forEach: function (a, b) {
      for (var c = this.length(), d = 0; d < this.length() && d < c; d++)
        this.has(d) && b.invoke(a, this.get(d), d, this);
    },
    hasOwnProperty: function (a, b) {
      return this.has(b);
    },
    indexOf: function (a, b, c) {
      var d = this.length(),
        e = c === void 0 ? 0 : Number(c);
      e < 0 && (e = Math.max(d + e, 0));
      for (var f = e; f < d; f++)
        if (this.has(f) && this.get(f) === b) return f;
      return -1;
    },
    join: function (a, b) {
      for (var c = [], d = 0; d < this.length(); d++) c.push(this.get(d));
      return c.join(b);
    },
    lastIndexOf: function (a, b, c) {
      var d = this.length(),
        e = d - 1;
      c !== void 0 && (e = c < 0 ? d + c : Math.min(c, e));
      for (var f = e; f >= 0; f--)
        if (this.has(f) && this.get(f) === b) return f;
      return -1;
    },
    map: function (a, b) {
      for (
        var c = this.length(), d = [], e = 0;
        e < this.length() && e < c;
        e++
      )
        this.has(e) && (d[e] = b.invoke(a, this.get(e), e, this));
      return new Wa(d);
    },
    pop: function () {
      return this.pop();
    },
    push: function (a) {
      return this.push.apply(this, Array.prototype.slice.call(arguments, 1));
    },
    reduce: function (a, b, c) {
      var d = this.length(),
        e,
        f = 0;
      if (c !== void 0) e = c;
      else {
        if (d === 0) throw Error("TypeError: Reduce on List with no elements.");
        for (var g = 0; g < d; g++)
          if (this.has(g)) {
            e = this.get(g);
            f = g + 1;
            break;
          }
        if (g === d) throw Error("TypeError: Reduce on List with no elements.");
      }
      for (var k = f; k < d; k++)
        this.has(k) && (e = b.invoke(a, e, this.get(k), k, this));
      return e;
    },
    reduceRight: function (a, b, c) {
      var d = this.length(),
        e,
        f = d - 1;
      if (c !== void 0) e = c;
      else {
        if (d === 0)
          throw Error("TypeError: ReduceRight on List with no elements.");
        for (var g = 1; g <= d; g++)
          if (this.has(d - g)) {
            e = this.get(d - g);
            f = d - (g + 1);
            break;
          }
        if (g > d)
          throw Error("TypeError: ReduceRight on List with no elements.");
      }
      for (var k = f; k >= 0; k--)
        this.has(k) && (e = b.invoke(a, e, this.get(k), k, this));
      return e;
    },
    reverse: function () {
      for (var a = Ya(this), b = a.length - 1, c = 0; b >= 0; b--, c++)
        a.hasOwnProperty(b) ? this.set(c, a[b]) : Xa(this, c);
      return this;
    },
    shift: function () {
      return this.shift();
    },
    slice: function (a, b, c) {
      var d = this.length();
      b === void 0 && (b = 0);
      b = b < 0 ? Math.max(d + b, 0) : Math.min(b, d);
      c = c === void 0 ? d : c < 0 ? Math.max(d + c, 0) : Math.min(c, d);
      c = Math.max(b, c);
      for (var e = [], f = b; f < c; f++) e.push(this.get(f));
      return new Wa(e);
    },
    some: function (a, b) {
      for (var c = this.length(), d = 0; d < this.length() && d < c; d++)
        if (this.has(d) && b.invoke(a, this.get(d), d, this)) return !0;
      return !1;
    },
    sort: function (a, b) {
      var c = Ya(this);
      b === void 0
        ? c.sort()
        : c.sort(function (e, f) {
            return Number(b.invoke(a, e, f));
          });
      for (var d = 0; d < c.length; d++)
        c.hasOwnProperty(d) ? this.set(d, c[d]) : Xa(this, d);
      return this;
    },
    splice: function (a, b, c) {
      return this.splice.apply(
        this,
        Array.prototype.splice.call(arguments, 1, arguments.length - 1)
      );
    },
    toString: function () {
      return this.toString();
    },
    unshift: function (a) {
      return this.unshift.apply(this, Array.prototype.slice.call(arguments, 1));
    },
  };
  var id = function (a) {
    var b;
    b = Error.call(this, a);
    this.message = b.message;
    "stack" in b && (this.stack = b.stack);
  };
  xa(id, Error);
  var jd = {
      charAt: 1,
      concat: 1,
      indexOf: 1,
      lastIndexOf: 1,
      match: 1,
      replace: 1,
      search: 1,
      slice: 1,
      split: 1,
      substring: 1,
      toLowerCase: 1,
      toLocaleLowerCase: 1,
      toString: 1,
      toUpperCase: 1,
      toLocaleUpperCase: 1,
      trim: 1,
    },
    kd = new Ca("break"),
    ld = new Ca("continue");
  function md(a, b) {
    return this.evaluate(a) + this.evaluate(b);
  }
  function nd(a, b) {
    return this.evaluate(a) && this.evaluate(b);
  }
  function od(a, b, c) {
    a = this.evaluate(a);
    b = this.evaluate(b);
    c = this.evaluate(c);
    if (!(c instanceof Wa))
      throw Error("Error: Non-List argument given to Apply instruction.");
    if (a === null || a === void 0) {
      var d = "TypeError: Can't read property " + b + " of " + a + ".";
      if (gd()) throw new id(d);
      throw Error(d);
    }
    var e = typeof a === "number";
    if (typeof a === "boolean" || e) {
      if (b === "toString") {
        if (e && c.length()) {
          var f = J(c.get(0));
          try {
            return a.toString(f);
          } catch (y) {}
        }
        return a.toString();
      }
      var g = "TypeError: " + a + "." + b + " is not a function.";
      if (gd()) throw new id(g);
      throw Error(g);
    }
    if (typeof a === "string") {
      if (jd.hasOwnProperty(b)) {
        var k = 2;
        k = 1;
        var m = J(c, void 0, k);
        return fd(a[b].apply(a, m), this.F);
      }
      var n = "TypeError: " + b + " is not a function";
      if (gd()) throw new id(n);
      throw Error(n);
    }
    if (a instanceof Wa) {
      if (a.has(b)) {
        var p = a.get(b);
        if (p instanceof Yc) {
          var q = Ya(c);
          q.unshift(this.F);
          return p.invoke.apply(p, q);
        }
        var r = "TypeError: " + b + " is not a function";
        if (gd()) throw new id(r);
        throw Error(r);
      }
      if (hd.supportedMethods.indexOf(b) >= 0) {
        var t = Ya(c);
        t.unshift(this.F);
        return hd[b].apply(a, t);
      }
    }
    if (a instanceof Yc || a instanceof Za) {
      if (a.has(b)) {
        var u = a.get(b);
        if (u instanceof Yc) {
          var v = Ya(c);
          v.unshift(this.F);
          return u.invoke.apply(u, v);
        }
        var w = "TypeError: " + b + " is not a function";
        if (gd()) throw new id(w);
        throw Error(w);
      }
      if (b === "toString") return a instanceof Yc ? a.getName() : a.toString();
      if (b === "hasOwnProperty") return a.has.apply(a, Ya(c));
    }
    if (a instanceof cd && b === "toString") return a.toString();
    var x = "TypeError: Object has no '" + b + "' property.";
    if (gd()) throw new id(x);
    throw Error(x);
  }
  function pd(a, b) {
    a = this.evaluate(a);
    if (typeof a !== "string")
      throw Error("Invalid key name given for assignment.");
    var c = this.F;
    if (!c.has(a)) throw Error("Attempting to assign to undefined value " + b);
    var d = this.evaluate(b);
    c.set(a, d);
    return d;
  }
  function qd() {
    var a = Ia(this.F),
      b = Ja(a, Array.prototype.slice.apply(arguments));
    if (b instanceof Ca) return b;
  }
  function rd() {
    return kd;
  }
  function sd(a) {
    for (var b = this.evaluate(a), c = 0; c < b.length; c++) {
      var d = this.evaluate(b[c]);
      if (d instanceof Ca) return d;
    }
  }
  function vd() {
    for (var a = this.F, b = 0; b < arguments.length - 1; b += 2) {
      var c = arguments[b];
      if (typeof c === "string") {
        var d = this.evaluate(arguments[b + 1]);
        Ha(a, c, d, !0);
      }
    }
  }
  function wd() {
    return ld;
  }
  function xd(a, b) {
    return new Ca(a, this.evaluate(b));
  }
  function yd(a, b) {
    var c = new Wa();
    b = this.evaluate(b);
    for (var d = 0; d < b.length; d++) c.push(b[d]);
    var e = [51, a, c].concat(
      Array.prototype.splice.call(arguments, 2, arguments.length - 2)
    );
    this.F.add(a, this.evaluate(e));
  }
  function zd(a, b) {
    return this.evaluate(a) / this.evaluate(b);
  }
  function Ad(a, b) {
    a = this.evaluate(a);
    b = this.evaluate(b);
    var c = a instanceof cd,
      d = b instanceof cd;
    return c || d ? (c && d ? a.getValue() === b.getValue() : !1) : a == b;
  }
  function Bd() {
    for (var a, b = 0; b < arguments.length; b++)
      a = this.evaluate(arguments[b]);
    return a;
  }
  function Cd(a, b, c, d) {
    for (var e = 0; e < b(); e++) {
      var f = a(c(e)),
        g = Ja(f, d);
      if (g instanceof Ca) {
        if (g.type === "break") break;
        if (g.type === "return") return g;
      }
    }
  }
  function Dd(a, b, c) {
    if (typeof b === "string")
      return Cd(
        a,
        function () {
          return b.length;
        },
        function (f) {
          return f;
        },
        c
      );
    if (b instanceof Za || b instanceof Wa || b instanceof Yc) {
      var d = b.Pb(),
        e = d.length();
      return Cd(
        a,
        function () {
          return e;
        },
        function (f) {
          return d.get(f);
        },
        c
      );
    }
  }
  function Ed(a, b, c) {
    a = this.evaluate(a);
    b = this.evaluate(b);
    c = this.evaluate(c);
    var d = this.F;
    return Dd(
      function (e) {
        d.set(a, e);
        return d;
      },
      b,
      c
    );
  }
  function Fd(a, b, c) {
    a = this.evaluate(a);
    b = this.evaluate(b);
    c = this.evaluate(c);
    var d = this.F;
    return Dd(
      function (e) {
        var f = Ia(d);
        Ha(f, a, e, !0);
        return f;
      },
      b,
      c
    );
  }
  function Gd(a, b, c) {
    a = this.evaluate(a);
    b = this.evaluate(b);
    c = this.evaluate(c);
    var d = this.F;
    return Dd(
      function (e) {
        var f = Ia(d);
        f.add(a, e);
        return f;
      },
      b,
      c
    );
  }
  function Hd(a, b, c) {
    a = this.evaluate(a);
    b = this.evaluate(b);
    c = this.evaluate(c);
    var d = this.F;
    return Id(
      function (e) {
        d.set(a, e);
        return d;
      },
      b,
      c
    );
  }
  function Jd(a, b, c) {
    a = this.evaluate(a);
    b = this.evaluate(b);
    c = this.evaluate(c);
    var d = this.F;
    return Id(
      function (e) {
        var f = Ia(d);
        Ha(f, a, e, !0);
        return f;
      },
      b,
      c
    );
  }
  function Kd(a, b, c) {
    a = this.evaluate(a);
    b = this.evaluate(b);
    c = this.evaluate(c);
    var d = this.F;
    return Id(
      function (e) {
        var f = Ia(d);
        f.add(a, e);
        return f;
      },
      b,
      c
    );
  }
  function Id(a, b, c) {
    if (typeof b === "string")
      return Cd(
        a,
        function () {
          return b.length;
        },
        function (d) {
          return b[d];
        },
        c
      );
    if (b instanceof Wa)
      return Cd(
        a,
        function () {
          return b.length();
        },
        function (d) {
          return b.get(d);
        },
        c
      );
    if (gd()) throw new id("The value is not iterable.");
    throw new TypeError("The value is not iterable.");
  }
  function Ld(a, b, c, d) {
    function e(p, q) {
      for (var r = 0; r < f.length(); r++) {
        var t = f.get(r);
        q.add(t, p.get(t));
      }
    }
    var f = this.evaluate(a);
    if (!(f instanceof Wa))
      throw Error("TypeError: Non-List argument given to ForLet instruction.");
    var g = this.F;
    d = this.evaluate(d);
    var k = Ia(g);
    for (e(g, k); Ka(k, b); ) {
      var m = Ja(k, d);
      if (m instanceof Ca) {
        if (m.type === "break") break;
        if (m.type === "return") return m;
      }
      var n = Ia(g);
      e(k, n);
      Ka(n, c);
      k = n;
    }
  }
  function Md(a, b) {
    var c = this.F,
      d = this.evaluate(b);
    if (!(d instanceof Wa))
      throw Error("Error: non-List value given for Fn argument names.");
    var e = Array.prototype.slice.call(arguments, 2);
    return new Yc(
      a,
      (function () {
        return function (f) {
          var g = Ia(c);
          g.j === void 0 && (g.j = this.F.j);
          for (
            var k = Array.prototype.slice.call(arguments, 0), m = 0;
            m < k.length;
            m++
          )
            if (((k[m] = this.evaluate(k[m])), k[m] instanceof Ca)) return k[m];
          for (var n = d.get("length"), p = 0; p < n; p++)
            p < k.length ? g.add(d.get(p), k[p]) : g.add(d.get(p), void 0);
          g.add("arguments", new Wa(k));
          var q = Ja(g, e);
          if (q instanceof Ca) return q.type === "return" ? q.data : q;
        };
      })()
    );
  }
  function Nd(a) {
    a = this.evaluate(a);
    var b = this.F;
    if (Od && !b.has(a)) throw new ReferenceError(a + " is not defined.");
    return b.get(a);
  }
  function Pd(a, b) {
    var c;
    a = this.evaluate(a);
    b = this.evaluate(b);
    if (a === void 0 || a === null) {
      var d =
        "TypeError: Cannot read properties of " + a + " (reading '" + b + "')";
      if (gd()) throw new id(d);
      throw Error(d);
    }
    if (a instanceof Za || a instanceof Wa || a instanceof Yc) c = a.get(b);
    else if (typeof a === "string")
      b === "length" ? (c = a.length) : Va(b) && (c = a[b]);
    else if (a instanceof cd) return;
    return c;
  }
  function Qd(a, b) {
    return this.evaluate(a) > this.evaluate(b);
  }
  function Rd(a, b) {
    return this.evaluate(a) >= this.evaluate(b);
  }
  function Sd(a, b) {
    a = this.evaluate(a);
    b = this.evaluate(b);
    a instanceof cd && (a = a.getValue());
    b instanceof cd && (b = b.getValue());
    return a === b;
  }
  function Td(a, b) {
    return !Sd.call(this, a, b);
  }
  function Ud(a, b, c) {
    var d = [];
    this.evaluate(a) ? (d = this.evaluate(b)) : c && (d = this.evaluate(c));
    var e = Ja(this.F, d);
    if (e instanceof Ca) return e;
  }
  var Od = !1;
  function Vd(a, b) {
    return this.evaluate(a) < this.evaluate(b);
  }
  function Wd(a, b) {
    return this.evaluate(a) <= this.evaluate(b);
  }
  function Xd() {
    for (var a = new Wa(), b = 0; b < arguments.length; b++) {
      var c = this.evaluate(arguments[b]);
      a.push(c);
    }
    return a;
  }
  function Yd() {
    for (var a = new Za(), b = 0; b < arguments.length - 1; b += 2) {
      var c = this.evaluate(arguments[b]) + "",
        d = this.evaluate(arguments[b + 1]);
      a.set(c, d);
    }
    return a;
  }
  function Zd(a, b) {
    return this.evaluate(a) % this.evaluate(b);
  }
  function $d(a, b) {
    return this.evaluate(a) * this.evaluate(b);
  }
  function ae(a) {
    return -this.evaluate(a);
  }
  function be(a) {
    return !this.evaluate(a);
  }
  function ce(a, b) {
    return !Ad.call(this, a, b);
  }
  function de() {
    return null;
  }
  function ee(a, b) {
    return this.evaluate(a) || this.evaluate(b);
  }
  function fe(a, b) {
    var c = this.evaluate(a);
    this.evaluate(b);
    return c;
  }
  function ge(a) {
    return this.evaluate(a);
  }
  function he() {
    return Array.prototype.slice.apply(arguments);
  }
  function ie(a) {
    return new Ca("return", this.evaluate(a));
  }
  function je(a, b, c) {
    a = this.evaluate(a);
    b = this.evaluate(b);
    c = this.evaluate(c);
    if (a === null || a === void 0) {
      var d = "TypeError: Can't set property " + b + " of " + a + ".";
      if (gd()) throw new id(d);
      throw Error(d);
    }
    (a instanceof Yc || a instanceof Wa || a instanceof Za) && a.set(b, c);
    return c;
  }
  function ke(a, b) {
    return this.evaluate(a) - this.evaluate(b);
  }
  function le(a, b, c) {
    a = this.evaluate(a);
    var d = this.evaluate(b),
      e = this.evaluate(c);
    if (!Array.isArray(d) || !Array.isArray(e))
      throw Error("Error: Malformed switch instruction.");
    for (var f, g = !1, k = 0; k < d.length; k++)
      if (g || a === this.evaluate(d[k]))
        if (((f = this.evaluate(e[k])), f instanceof Ca)) {
          var m = f.type;
          if (m === "break") return;
          if (m === "return" || m === "continue") return f;
        } else g = !0;
    if (
      e.length === d.length + 1 &&
      ((f = this.evaluate(e[e.length - 1])),
      f instanceof Ca && (f.type === "return" || f.type === "continue"))
    )
      return f;
  }
  function me(a, b, c) {
    return this.evaluate(a) ? this.evaluate(b) : this.evaluate(c);
  }
  function ne(a) {
    a = this.evaluate(a);
    return a instanceof Yc ? "function" : typeof a;
  }
  function oe() {
    for (var a = this.F, b = 0; b < arguments.length; b++) {
      var c = arguments[b];
      typeof c !== "string" || a.add(c, void 0);
    }
  }
  function pe(a, b, c, d) {
    var e = this.evaluate(d);
    if (this.evaluate(c)) {
      var f = Ja(this.F, e);
      if (f instanceof Ca) {
        if (f.type === "break") return;
        if (f.type === "return") return f;
      }
    }
    for (; this.evaluate(a); ) {
      var g = Ja(this.F, e);
      if (g instanceof Ca) {
        if (g.type === "break") break;
        if (g.type === "return") return g;
      }
      this.evaluate(b);
    }
  }
  function qe(a) {
    return ~Number(this.evaluate(a));
  }
  function re(a, b) {
    return Number(this.evaluate(a)) << Number(this.evaluate(b));
  }
  function se(a, b) {
    return Number(this.evaluate(a)) >> Number(this.evaluate(b));
  }
  function te(a, b) {
    return Number(this.evaluate(a)) >>> Number(this.evaluate(b));
  }
  function ue(a, b) {
    return Number(this.evaluate(a)) & Number(this.evaluate(b));
  }
  function ve(a, b) {
    return Number(this.evaluate(a)) ^ Number(this.evaluate(b));
  }
  function we(a, b) {
    return Number(this.evaluate(a)) | Number(this.evaluate(b));
  }
  function xe() {}
  function ye(a, b, c, d, e) {
    var f = !0;
    try {
      var g = this.evaluate(c);
      if (g instanceof Ca) return g;
    } catch (r) {
      if (!(r instanceof id && a)) throw ((f = r instanceof id), r);
      var k = Ia(this.F),
        m = new cd(r);
      k.add(b, m);
      var n = this.evaluate(d),
        p = Ja(k, n);
      if (p instanceof Ca) return p;
    } finally {
      if (f && e !== void 0) {
        var q = this.evaluate(e);
        if (q instanceof Ca) return q;
      }
    }
  }
  var Ae = function () {
    this.j = new La();
    ze(this);
  };
  Ae.prototype.execute = function (a) {
    return this.j.Vh(a);
  };
  var ze = function (a) {
    var b = function (c, d) {
      var e = new Yc(String(c), d);
      e.La();
      a.j.j.set(String(c), e);
    };
    b("map", Yd);
    b("and", Sc);
    b("contains", Vc);
    b("equals", Tc);
    b("or", Uc);
    b("startsWith", Wc);
    b("variable", Xc);
  };
  var Ce = function () {
    this.D = !1;
    this.j = new La();
    Be(this);
    this.D = !0;
  };
  Ce.prototype.execute = function (a) {
    return De(this.j.Vh(a));
  };
  var Ee = function (a, b, c) {
    return De(a.j.Uk(b, c));
  };
  Ce.prototype.La = function () {
    this.j.La();
  };
  var Be = function (a) {
    var b = function (c, d) {
      var e = String(c),
        f = new Yc(e, d);
      f.La();
      a.j.j.set(e, f);
    };
    b(0, md);
    b(1, nd);
    b(2, od);
    b(3, pd);
    b(56, ue);
    b(57, re);
    b(58, qe);
    b(59, we);
    b(60, se);
    b(61, te);
    b(62, ve);
    b(53, qd);
    b(4, rd);
    b(5, sd);
    b(52, vd);
    b(6, wd);
    b(49, xd);
    b(7, Xd);
    b(8, Yd);
    b(9, sd);
    b(50, yd);
    b(10, zd);
    b(12, Ad);
    b(13, Bd);
    b(51, Md);
    b(47, Ed);
    b(54, Fd);
    b(55, Gd);
    b(63, Ld);
    b(64, Hd);
    b(65, Jd);
    b(66, Kd);
    b(15, Nd);
    b(16, Pd);
    b(17, Pd);
    b(18, Qd);
    b(19, Rd);
    b(20, Sd);
    b(21, Td);
    b(22, Ud);
    b(23, Vd);
    b(24, Wd);
    b(25, Zd);
    b(26, $d);
    b(27, ae);
    b(28, be);
    b(29, ce);
    b(45, de);
    b(30, ee);
    b(32, fe);
    b(33, fe);
    b(34, ge);
    b(35, ge);
    b(46, he);
    b(36, ie);
    b(43, je);
    b(37, ke);
    b(38, le);
    b(39, me);
    b(67, ye);
    b(40, ne);
    b(44, xe);
    b(41, oe);
    b(42, pe);
  };
  Ce.prototype.ud = function () {
    return this.j.ud();
  };
  function De(a) {
    if (
      a instanceof Ca ||
      a instanceof Yc ||
      a instanceof Wa ||
      a instanceof Za ||
      a instanceof cd ||
      a === null ||
      a === void 0 ||
      typeof a === "string" ||
      typeof a === "number" ||
      typeof a === "boolean"
    )
      return a;
  }
  var Fe = function (a) {
    this.message = a;
  };
  function Ge(a) {
    var b = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"[
      a
    ];
    return b === void 0
      ? new Fe(
          "Value " + a + " can not be encoded in web-safe base64 dictionary."
        )
      : b;
  }
  function He(a) {
    switch (a) {
      case 1:
        return "1";
      case 2:
      case 4:
        return "0";
      default:
        return "-";
    }
  }
  var Ie = /^[1-9a-zA-Z_-][1-9a-c][1-9a-v]\d$/;
  function Je(a, b) {
    for (var c = "", d = !0; a > 7; ) {
      var e = a & 31;
      a >>= 5;
      d ? (d = !1) : (e |= 32);
      c = "" + Ge(e) + c;
    }
    a <<= 2;
    d || (a |= 32);
    return (c = "" + Ge(a | b) + c);
  }
  var Ke = (function () {
    function a(b) {
      return {
        toString: function () {
          return b;
        },
      };
    }
    return {
      yk: a("consent"),
      ii: a("convert_case_to"),
      ji: a("convert_false_to"),
      ki: a("convert_null_to"),
      li: a("convert_true_to"),
      mi: a("convert_undefined_to"),
      sn: a("debug_mode_metadata"),
      oa: a("function"),
      Tg: a("instance_name"),
      Xk: a("live_only"),
      Yk: a("malware_disabled"),
      Zk: a("metadata"),
      fl: a("original_activity_id"),
      Bn: a("original_vendor_template_id"),
      An: a("once_on_load"),
      bl: a("once_per_event"),
      vj: a("once_per_load"),
      Dn: a("priority_override"),
      En: a("respected_consent_types"),
      Dj: a("setup_tags"),
      ve: a("tag_id"),
      Jj: a("teardown_tags"),
    };
  })();
  var hf;
  var jf = [],
    kf = [],
    lf = [],
    mf = [],
    nf = [],
    of = {},
    pf,
    qf;
  function rf(a) {
    qf = qf || a;
  }
  function sf(a) {}
  var tf,
    uf = [],
    vf = [];
  function wf(a, b) {
    var c = {};
    c[Ke.oa] = "__" + a;
    for (var d in b) b.hasOwnProperty(d) && (c["vtp_" + d] = b[d]);
    return c;
  }
  function xf(a, b, c) {
    try {
      return pf(yf(a, b, c));
    } catch (d) {
      JSON.stringify(a);
    }
    return 2;
  }
  function zf(a) {
    var b = a[Ke.oa];
    if (!b) throw Error("Error: No function name given for function call.");
    return !!of[b];
  }
  var yf = function (a, b, c) {
      c = c || [];
      var d = {},
        e;
      for (e in a) a.hasOwnProperty(e) && (d[e] = Af(a[e], b, c));
      return d;
    },
    Af = function (a, b, c) {
      if (Array.isArray(a)) {
        var d;
        switch (a[0]) {
          case "function_id":
            return a[1];
          case "list":
            d = [];
            for (var e = 1; e < a.length; e++) d.push(Af(a[e], b, c));
            return d;
          case "macro":
            var f = a[1];
            if (c[f]) return;
            var g = jf[f];
            if (!g || b.isBlocked(g)) return;
            c[f] = !0;
            var k = String(g[Ke.Tg]);
            try {
              var m = yf(g, b, c);
              m.vtp_gtmEventId = b.id;
              b.priorityId && (m.vtp_gtmPriorityId = b.priorityId);
              d = Bf(m, { event: b, index: f, type: 2, name: k });
              tf && (d = tf.yl(d, m));
            } catch (y) {
              b.logMacroError && b.logMacroError(y, Number(f), k), (d = !1);
            }
            c[f] = !1;
            return d;
          case "map":
            d = {};
            for (var n = 1; n < a.length; n += 2)
              d[Af(a[n], b, c)] = Af(a[n + 1], b, c);
            return d;
          case "template":
            d = [];
            for (var p = !1, q = 1; q < a.length; q++) {
              var r = Af(a[q], b, c);
              qf && (p = p || qf.km(r));
              d.push(r);
            }
            return qf && p ? qf.Bl(d) : d.join("");
          case "escape":
            d = Af(a[1], b, c);
            if (qf && Array.isArray(a[1]) && a[1][0] === "macro" && qf.lm(a))
              return qf.Jm(d);
            d = String(d);
            for (var t = 2; t < a.length; t++) Le[a[t]] && (d = Le[a[t]](d));
            return d;
          case "tag":
            var u = a[1];
            if (!mf[u])
              throw Error("Unable to resolve tag reference " + u + ".");
            return { Qj: a[2], index: u };
          case "zb":
            var v = { arg0: a[2], arg1: a[3], ignore_case: a[5] };
            v[Ke.oa] = a[1];
            var w = xf(v, b, c),
              x = !!a[4];
            return x || w !== 2 ? x !== (w === 1) : null;
          default:
            throw Error(
              "Attempting to expand unknown Value type: " + a[0] + "."
            );
        }
      }
      return a;
    },
    Bf = function (a, b) {
      var c = a[Ke.oa],
        d = b && b.event;
      if (!c) throw Error("Error: No function name given for function call.");
      var e = of[c],
        f =
          b &&
          b.type === 2 &&
          (d == null ? void 0 : d.reportMacroDiscrepancy) &&
          e &&
          uf.indexOf(c) !== -1,
        g = {},
        k = {},
        m;
      for (m in a)
        a.hasOwnProperty(m) &&
          Hb(m, "vtp_") &&
          (e && (g[m] = a[m]), !e || f) &&
          (k[m.substring(4)] = a[m]);
      e &&
        d &&
        d.cachedModelValues &&
        (g.vtp_gtmCachedValues = d.cachedModelValues);
      if (b) {
        if (b.name == null) {
          var n;
          a: {
            var p = b.type,
              q = b.index;
            if (q == null) n = "";
            else {
              var r;
              switch (p) {
                case 2:
                  r = jf[q];
                  break;
                case 1:
                  r = mf[q];
                  break;
                default:
                  n = "";
                  break a;
              }
              var t = r && r[Ke.Tg];
              n = t ? String(t) : "";
            }
          }
          b.name = n;
        }
        e && ((g.vtp_gtmEntityIndex = b.index), (g.vtp_gtmEntityName = b.name));
      }
      var u, v, w;
      if (f && vf.indexOf(c) === -1) {
        vf.push(c);
        var x = Cb();
        u = e(g);
        var y = Cb() - x,
          B = Cb();
        v = hf(c, k, b);
        w = y - (Cb() - B);
      } else if ((e && (u = e(g)), !e || f)) v = hf(c, k, b);
      f &&
        d &&
        (d.reportMacroDiscrepancy(d.id, c, void 0, !0),
        Ua(u)
          ? (Array.isArray(u)
              ? Array.isArray(v)
              : Ta(u)
              ? Ta(v)
              : typeof u === "function"
              ? typeof v === "function"
              : u === v) || d.reportMacroDiscrepancy(d.id, c)
          : u !== v && d.reportMacroDiscrepancy(d.id, c),
        w !== void 0 && d.reportMacroDiscrepancy(d.id, c, w));
      return e ? u : v;
    };
  var Cf = function (a, b, c) {
    var d;
    d = Error.call(this, c);
    this.message = d.message;
    "stack" in d && (this.stack = d.stack);
    this.permissionId = a;
    this.parameters = b;
    this.name = "PermissionError";
  };
  xa(Cf, Error);
  function Df(a, b) {
    if (Array.isArray(a)) {
      Object.defineProperty(a, "context", { value: { line: b[0] } });
      for (var c = 1; c < a.length; c++) Df(a[c], b[c]);
    }
  }
  var Ef = function (a, b) {
    var c;
    c = Error.call(
      this,
      "Wrapped error for Dust debugging. Original error message: " + a.message
    );
    this.message = c.message;
    "stack" in c && (this.stack = c.stack);
    this.Dm = a;
    this.j = [];
    this.D = b;
  };
  xa(Ef, Error);
  function Ff() {
    return function (a, b) {
      a instanceof Ef || (a = new Ef(a, Gf));
      b && a instanceof Ef && a.j.push(b);
      throw a;
    };
  }
  function Gf(a) {
    if (!a.length) return a;
    a.push({ id: "main", line: 0 });
    for (var b = a.length - 1; b > 0; b--) qb(a[b].id) && a.splice(b++, 1);
    for (var c = a.length - 1; c > 0; c--) a[c].line = a[c - 1].line;
    a.splice(0, 1);
    return a;
  }
  function Hf(a) {
    function b(r) {
      for (var t = 0; t < r.length; t++) d[r[t]] = !0;
    }
    for (var c = [], d = [], e = If(a), f = 0; f < kf.length; f++) {
      var g = kf[f],
        k = Jf(g, e);
      if (k) {
        for (var m = g.add || [], n = 0; n < m.length; n++) c[m[n]] = !0;
        b(g.block || []);
      } else k === null && b(g.block || []);
    }
    for (var p = [], q = 0; q < mf.length; q++) c[q] && !d[q] && (p[q] = !0);
    return p;
  }
  function Jf(a, b) {
    for (var c = a["if"] || [], d = 0; d < c.length; d++) {
      var e = b(c[d]);
      if (e === 0) return !1;
      if (e === 2) return null;
    }
    for (var f = a.unless || [], g = 0; g < f.length; g++) {
      var k = b(f[g]);
      if (k === 2) return null;
      if (k === 1) return !1;
    }
    return !0;
  }
  function If(a) {
    var b = [];
    return function (c) {
      b[c] === void 0 && (b[c] = xf(lf[c], a));
      return b[c];
    };
  }
  var Kf = {
    yl: function (a, b) {
      b[Ke.ii] &&
        typeof a === "string" &&
        (a = b[Ke.ii] === 1 ? a.toLowerCase() : a.toUpperCase());
      b.hasOwnProperty(Ke.ki) && a === null && (a = b[Ke.ki]);
      b.hasOwnProperty(Ke.mi) && a === void 0 && (a = b[Ke.mi]);
      b.hasOwnProperty(Ke.li) && a === !0 && (a = b[Ke.li]);
      b.hasOwnProperty(Ke.ji) && a === !1 && (a = b[Ke.ji]);
      return a;
    },
  };
  var Lf = function () {
      this.j = {};
    },
    Nf = function (a, b) {
      var c = Mf.D,
        d;
      (d = c.j)[a] != null || (d[a] = []);
      c.j[a].push(function () {
        return b.apply(null, pa(za.apply(0, arguments)));
      });
    };
  function Of(a, b, c, d) {
    if (a)
      for (var e = 0; e < a.length; e++) {
        var f = void 0,
          g = "A policy function denied the permission request";
        try {
          (f = a[e](b, c, d)), (g += ".");
        } catch (k) {
          g =
            typeof k === "string"
              ? g + (": " + k)
              : k instanceof Error
              ? g + (": " + k.message)
              : g + ".";
        }
        if (!f) throw new Cf(c, d, g);
      }
  }
  function Pf(a, b, c) {
    return function () {
      var d = arguments[0];
      if (d) {
        var e = a.j[d],
          f = a.j.all;
        if (e || f) {
          var g = c.apply(void 0, Array.prototype.slice.call(arguments, 0));
          Of(e, b, d, g);
          Of(f, b, d, g);
        }
      }
    };
  }
  var Tf = function () {
      var a = data.permissions || {},
        b = Qf.ctid,
        c = this;
      this.j = {};
      this.D = new Lf();
      var d = {},
        e = {},
        f = Pf(this.D, b, function () {
          var g = arguments[0];
          return g && d[g]
            ? d[g].apply(void 0, Array.prototype.slice.call(arguments, 0))
            : {};
        });
      z(a, function (g, k) {
        function m(p) {
          var q = za.apply(1, arguments);
          if (!n[p])
            throw Rf(
              p,
              {},
              "The requested additional permission " + p + " is not configured."
            );
          f.apply(null, [p].concat(pa(q)));
        }
        var n = {};
        z(k, function (p, q) {
          var r = Sf(p, q);
          n[p] = r.assert;
          d[p] || (d[p] = r.N);
          r.Mj && !e[p] && (e[p] = r.Mj);
        });
        c.j[g] = function (p, q) {
          var r = n[p];
          if (!r)
            throw Rf(
              p,
              {},
              "The requested permission " + p + " is not configured."
            );
          var t = Array.prototype.slice.call(arguments, 0);
          r.apply(void 0, t);
          f.apply(void 0, t);
          var u = e[p];
          u && u.apply(null, [m].concat(pa(t.slice(1))));
        };
      });
    },
    Uf = function (a) {
      return Mf.j[a] || function () {};
    };
  function Sf(a, b) {
    var c = wf(a, b);
    c.vtp_permissionName = a;
    c.vtp_createPermissionError = Rf;
    try {
      return Bf(c);
    } catch (d) {
      return {
        assert: function (e) {
          throw new Cf(e, {}, "Permission " + e + " is unknown.");
        },
        N: function () {
          throw new Cf(a, {}, "Permission " + a + " is unknown.");
        },
      };
    }
  }
  function Rf(a, b, c) {
    return new Cf(a, b, c);
  }
  var Vf = !1;
  var Wf = {};
  Wf.qk = yb("");
  Wf.El = yb("");
  var bg = {},
    cg =
      ((bg.uaa = !0),
      (bg.uab = !0),
      (bg.uafvl = !0),
      (bg.uamb = !0),
      (bg.uam = !0),
      (bg.uap = !0),
      (bg.uapv = !0),
      (bg.uaw = !0),
      bg);
  var kg = function (a, b) {
      for (var c = 0; c < b.length; c++) {
        var d = a,
          e = b[c];
        if (!ig.exec(e)) throw Error("Invalid key wildcard");
        var f = e.indexOf(".*"),
          g = f !== -1 && f === e.length - 2,
          k = g ? e.slice(0, e.length - 2) : e,
          m;
        a: if (d.length === 0) m = !1;
        else {
          for (var n = d.split("."), p = 0; p < n.length; p++)
            if (!jg.exec(n[p])) {
              m = !1;
              break a;
            }
          m = !0;
        }
        if (
          !m || k.length > d.length || (!g && d.length !== e.length)
            ? 0
            : g
            ? Hb(d, k) && (d === k || d.charAt(k.length) === ".")
            : d === k
        )
          return !0;
      }
      return !1;
    },
    jg = /^[a-z$_][\w$]*$/i,
    ig = /^(?:[a-z_$][a-z_$0-9]*\.)*[a-z_$][a-z_$0-9]*(?:\.\*)?$/i;
  var lg = [
    "matches",
    "webkitMatchesSelector",
    "mozMatchesSelector",
    "msMatchesSelector",
    "oMatchesSelector",
  ];
  function mg(a, b) {
    var c = String(a),
      d = String(b),
      e = c.length - d.length;
    return e >= 0 && c.indexOf(d, e) === e;
  }
  var ng = new vb();
  function og(a, b, c) {
    var d = c ? "i" : void 0;
    try {
      var e = String(b) + String(d),
        f = ng.get(e);
      f || ((f = new RegExp(b, d)), ng.set(e, f));
      return f.test(a);
    } catch (g) {
      return !1;
    }
  }
  function pg(a, b) {
    return String(a).indexOf(String(b)) >= 0;
  }
  function qg(a, b) {
    return String(a) === String(b);
  }
  function rg(a, b) {
    return Number(a) >= Number(b);
  }
  function sg(a, b) {
    return Number(a) <= Number(b);
  }
  function tg(a, b) {
    return Number(a) > Number(b);
  }
  function ug(a, b) {
    return Number(a) < Number(b);
  }
  function vg(a, b) {
    return Hb(String(a), String(b));
  }
  var Cg =
      /^([a-z][a-z0-9]*):(!|\?)(\*|string|boolean|number|Fn|PixieMap|List|OpaqueValue)$/i,
    Dg = { Fn: "function", PixieMap: "Object", List: "Array" };
  function K(a, b, c) {
    for (var d = 0; d < b.length; d++) {
      var e = Cg.exec(b[d]);
      if (!e) throw Error("Internal Error in " + a);
      var f = e[1],
        g = e[2] === "!",
        k = e[3],
        m = c[d];
      if (m == null) {
        if (g)
          throw Error(
            "Error in " + a + ". Required argument " + f + " not supplied."
          );
      } else if (k !== "*") {
        var n = typeof m;
        m instanceof Yc
          ? (n = "Fn")
          : m instanceof Wa
          ? (n = "List")
          : m instanceof Za
          ? (n = "PixieMap")
          : m instanceof cd && (n = "OpaqueValue");
        if (n !== k)
          throw Error(
            "Error in " +
              a +
              ". Argument " +
              f +
              " has type " +
              ((Dg[n] || n) + ", which does not match required type ") +
              ((Dg[k] || k) + ".")
          );
      }
    }
  }
  function Eg(a) {
    return "" + a;
  }
  function Fg(a, b) {
    var c = [];
    return c;
  }
  function Gg(a, b) {
    var c = new Yc(a, function () {
      for (
        var d = Array.prototype.slice.call(arguments, 0), e = 0;
        e < d.length;
        e++
      )
        d[e] = this.evaluate(d[e]);
      try {
        return b.apply(this, d);
      } catch (g) {
        if (gd()) throw new id(g.message);
        throw g;
      }
    });
    c.La();
    return c;
  }
  function Hg(a, b) {
    var c = new Za(),
      d;
    for (d in b)
      if (b.hasOwnProperty(d)) {
        var e = b[d];
        pb(e)
          ? c.set(d, Gg(a + "_" + d, e))
          : Ta(e)
          ? c.set(d, Hg(a + "_" + d, e))
          : (qb(e) || l(e) || typeof e === "boolean") && c.set(d, e);
      }
    c.La();
    return c;
  }
  function Ig(a, b) {
    K(this.getName(), ["apiName:!string", "message:?string"], arguments);
    var c = {},
      d = new Za();
    return (d = Hg("AssertApiSubject", c));
  }
  function Jg(a, b) {
    K(this.getName(), ["actual:?*", "message:?string"], arguments);
    if (a instanceof ed)
      throw Error(
        "Argument actual cannot have type Promise. Assertions on asynchronous code aren't supported."
      );
    var c = {},
      d = new Za();
    return (d = Hg("AssertThatSubject", c));
  }
  function Kg(a) {
    return function () {
      for (var b = [], c = this.F, d = 0; d < arguments.length; ++d)
        b.push(J(arguments[d], c));
      return fd(a.apply(null, b));
    };
  }
  function Lg() {
    for (var a = Math, b = Mg, c = {}, d = 0; d < b.length; d++) {
      var e = b[d];
      a.hasOwnProperty(e) && (c[e] = Kg(a[e].bind(a)));
    }
    return c;
  }
  function Ng(a) {
    var b;
    return b;
  }
  function Og(a) {
    var b;
    return b;
  }
  function Pg(a) {
    try {
      return encodeURI(a);
    } catch (b) {}
  }
  function Qg(a) {
    try {
      return encodeURIComponent(a);
    } catch (b) {}
  }
  function Vg(a) {
    K(this.getName(), ["message:?string"], arguments);
  }
  function Wg(a, b) {
    K(this.getName(), ["min:!number", "max:!number"], arguments);
    return tb(a, b);
  }
  function Xg() {
    return new Date().getTime();
  }
  function Yg(a) {
    if (a === null) return "null";
    if (a instanceof Wa) return "array";
    if (a instanceof Yc) return "function";
    if (a instanceof cd) {
      var b;
      a = (b = a) == null ? void 0 : b.getValue();
      var c;
      if (
        ((c = a) == null ? void 0 : c.constructor) === void 0 ||
        a.constructor.name === void 0
      ) {
        var d = String(a);
        return d.substring(8, d.length - 1);
      }
      return String(a.constructor.name);
    }
    return typeof a;
  }
  function Zg(a) {
    function b(c) {
      return function (d) {
        try {
          return c(d);
        } catch (e) {
          (Vf || Wf.qk) && a.call(this, e.message);
        }
      };
    }
    return {
      parse: b(function (c) {
        return fd(JSON.parse(c));
      }),
      stringify: b(function (c) {
        return JSON.stringify(J(c));
      }),
    };
  }
  function $g(a) {
    return xb(J(a, this.F));
  }
  function ah(a) {
    return Number(J(a, this.F));
  }
  function bh(a) {
    return a === null ? "null" : a === void 0 ? "undefined" : a.toString();
  }
  function ch(a, b, c) {
    var d = null,
      e = !1;
    return e ? d : null;
  }
  var Mg = "floor ceil round max min abs pow sqrt".split(" ");
  function dh() {
    var a = {};
    return {
      Ol: function (b) {
        return a.hasOwnProperty(b) ? a[b] : void 0;
      },
      mk: function (b, c) {
        a[b] = c;
      },
      reset: function () {
        a = {};
      },
    };
  }
  function eh(a, b) {
    return function () {
      var c = Array.prototype.slice.call(za.apply(0, arguments), 0);
      c.unshift(b);
      return Yc.prototype.invoke.apply(a, c);
    };
  }
  function fh(a, b) {
    K(this.getName(), ["apiName:!string", "mock:?*"], arguments);
  }
  function gh(a, b) {
    K(this.getName(), ["apiName:!string", "mock:!PixieMap"], arguments);
  }
  var hh = {};
  hh.keys = function (a) {
    return new Wa();
  };
  hh.values = function (a) {
    return new Wa();
  };
  hh.entries = function (a) {
    return new Wa();
  };
  hh.freeze = function (a) {
    return a;
  };
  hh.delete = function (a, b) {
    return !1;
  };
  function N(a, b) {
    var c = za.apply(2, arguments),
      d = a.F.j;
    if (!d) throw Error("Missing program state.");
    if (d.Pm) {
      try {
        d.Nj.apply(null, [b].concat(pa(c)));
      } catch (e) {
        throw (ib("TAGGING", 21), e);
      }
      return;
    }
    d.Nj.apply(null, [b].concat(pa(c)));
  }
  var jh = function () {
    this.j = {};
    this.D = {};
    this.H = !0;
  };
  jh.prototype.get = function (a, b) {
    var c = this.j.hasOwnProperty(a) ? this.j[a] : void 0;
    return c;
  };
  jh.prototype.add = function (a, b, c) {
    if (this.j.hasOwnProperty(a))
      throw Error(
        "Attempting to add a function which already exists: " + a + "."
      );
    if (this.D.hasOwnProperty(a))
      throw Error(
        "Attempting to add an API with an existing private API name: " + a + "."
      );
    this.j[a] = c ? void 0 : pb(b) ? Gg(a, b) : Hg(a, b);
  };
  function kh(a, b) {
    var c = void 0;
    return c;
  }
  function lh() {
    var a = {};
    return a;
  }
  function mh(a) {
    return nh ? H.querySelectorAll(a) : null;
  }
  function oh(a, b) {
    if (!nh) return null;
    if (Element.prototype.closest)
      try {
        return a.closest(b);
      } catch (e) {
        return null;
      }
    var c =
        Element.prototype.matches ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector,
      d = a;
    if (!H.documentElement.contains(d)) return null;
    do {
      try {
        if (c.call(d, b)) return d;
      } catch (e) {
        break;
      }
      d = d.parentElement || d.parentNode;
    } while (d !== null && d.nodeType === 1);
    return null;
  }
  var ph = !1;
  if (H.querySelectorAll)
    try {
      var qh = H.querySelectorAll(":root");
      qh && qh.length == 1 && qh[0] == H.documentElement && (ph = !0);
    } catch (a) {}
  var nh = ph;
  var rh = /^[0-9A-Fa-f]{64}$/;
  function sh(a) {
    try {
      return new TextEncoder().encode(a);
    } catch (e) {
      for (var b = [], c = 0; c < a.length; c++) {
        var d = a.charCodeAt(c);
        d < 128
          ? b.push(d)
          : d < 2048
          ? b.push(192 | (d >> 6), 128 | (d & 63))
          : d < 55296 || d >= 57344
          ? b.push(224 | (d >> 12), 128 | ((d >> 6) & 63), 128 | (d & 63))
          : ((d = 65536 + (((d & 1023) << 10) | (a.charCodeAt(++c) & 1023))),
            b.push(
              240 | (d >> 18),
              128 | ((d >> 12) & 63),
              128 | ((d >> 6) & 63),
              128 | (d & 63)
            ));
      }
      return new Uint8Array(b);
    }
  }
  function th(a) {
    if (a === "" || a === "e0") return Promise.resolve(a);
    var b;
    if ((b = G.crypto) == null ? 0 : b.subtle) {
      if (rh.test(a)) return Promise.resolve(a);
      try {
        var c = sh(a);
        return G.crypto.subtle
          .digest("SHA-256", c)
          .then(function (d) {
            var e = Array.from(new Uint8Array(d))
              .map(function (f) {
                return String.fromCharCode(f);
              })
              .join("");
            return G.btoa(e)
              .replace(/\+/g, "-")
              .replace(/\//g, "_")
              .replace(/=+$/, "");
          })
          .catch(function () {
            return "e2";
          });
      } catch (d) {
        return Promise.resolve("e2");
      }
    } else return Promise.resolve("e1");
  }
  function O(a) {
    ib("GTM", a);
  }
  var P = {
      g: {
        ya: "ad_personalization",
        R: "ad_storage",
        O: "ad_user_data",
        U: "analytics_storage",
        Eb: "region",
        Sb: "consent_updated",
        af: "wait_for_update",
        oi: "app_remove",
        ri: "app_store_refund",
        si: "app_store_subscription_cancel",
        ui: "app_store_subscription_convert",
        vi: "app_store_subscription_renew",
        Bk: "consent_update",
        eg: "add_payment_info",
        fg: "add_shipping_info",
        oc: "add_to_cart",
        qc: "remove_from_cart",
        gg: "view_cart",
        Tb: "begin_checkout",
        rc: "select_item",
        kb: "view_item_list",
        Fb: "select_promotion",
        lb: "view_promotion",
        Ia: "purchase",
        sc: "refund",
        Na: "view_item",
        hg: "add_to_wishlist",
        Ck: "exception",
        wi: "first_open",
        xi: "first_visit",
        ba: "gtag.config",
        Ua: "gtag.get",
        yi: "in_app_purchase",
        Ub: "page_view",
        Dk: "screen_view",
        zi: "session_start",
        Ek: "timing_complete",
        Fk: "track_social",
        Nc: "user_engagement",
        Gk: "user_id_update",
        nb: "gclgb",
        Va: "gclid",
        Ai: "gclgs",
        Bi: "gclst",
        fa: "ads_data_redaction",
        Ci: "gad_source",
        Di: "gad_source_src",
        Hd: "gclid_url",
        Ei: "gclsrc",
        ig: "gbraid",
        bf: "wbraid",
        ka: "allow_ad_personalization_signals",
        cf: "allow_custom_scripts",
        Id: "allow_direct_google_requests",
        df: "allow_display_features",
        Jd: "allow_enhanced_conversions",
        ob: "allow_google_signals",
        Ca: "allow_interest_groups",
        Hk: "app_id",
        Ik: "app_installer_id",
        Jk: "app_name",
        Kk: "app_version",
        Gb: "auid",
        Fi: "auto_detection_enabled",
        Vb: "aw_remarketing",
        ef: "aw_remarketing_only",
        Kd: "discount",
        Ld: "aw_feed_country",
        Md: "aw_feed_language",
        da: "items",
        Nd: "aw_merchant_id",
        jg: "aw_basket_type",
        Oc: "campaign_content",
        Pc: "campaign_id",
        Qc: "campaign_medium",
        Rc: "campaign_name",
        Sc: "campaign",
        Tc: "campaign_source",
        Uc: "campaign_term",
        pb: "client_id",
        Gi: "rnd",
        kg: "consent_update_type",
        Hi: "content_group",
        Ii: "content_type",
        Za: "conversion_cookie_prefix",
        Vc: "conversion_id",
        ra: "conversion_linker",
        Ji: "conversion_linker_disabled",
        Wb: "conversion_api",
        ff: "cookie_deprecation",
        Wa: "cookie_domain",
        Oa: "cookie_expires",
        ab: "cookie_flags",
        uc: "cookie_name",
        Hb: "cookie_path",
        Pa: "cookie_prefix",
        vc: "cookie_update",
        wc: "country",
        za: "currency",
        Od: "customer_lifetime_value",
        Wc: "custom_map",
        lg: "gcldc",
        Pd: "dclid",
        Ki: "debug_mode",
        la: "developer_id",
        Li: "disable_merchant_reported_purchases",
        Xc: "dc_custom_params",
        Mi: "dc_natural_search",
        mg: "dynamic_event_settings",
        ng: "affiliation",
        Qd: "checkout_option",
        hf: "checkout_step",
        og: "coupon",
        Yc: "item_list_name",
        jf: "list_name",
        Ni: "promotions",
        Zc: "shipping",
        kf: "tax",
        Rd: "engagement_time_msec",
        Sd: "enhanced_client_id",
        Td: "enhanced_conversions",
        pg: "enhanced_conversions_automatic_settings",
        Ud: "estimated_delivery_date",
        lf: "euid_logged_in_state",
        bd: "event_callback",
        Lk: "event_category",
        rb: "event_developer_id_string",
        Mk: "event_label",
        xc: "event",
        Vd: "event_settings",
        Wd: "event_timeout",
        Nk: "description",
        Ok: "fatal",
        Oi: "experiments",
        nf: "firebase_id",
        yc: "first_party_collection",
        Xd: "_x_20",
        sb: "_x_19",
        Pi: "fledge_drop_reason",
        qg: "fledge",
        rg: "flight_error_code",
        sg: "flight_error_message",
        Qi: "fl_activity_category",
        Ri: "fl_activity_group",
        ug: "fl_advertiser_id",
        Si: "fl_ar_dedupe",
        vg: "match_id",
        Ti: "fl_random_number",
        Ui: "tran",
        Vi: "u",
        Yd: "gac_gclid",
        zc: "gac_wbraid",
        wg: "gac_wbraid_multiple_conversions",
        xg: "ga_restrict_domain",
        yg: "ga_temp_client_id",
        Ac: "gdpr_applies",
        zg: "geo_granularity",
        Ib: "value_callback",
        tb: "value_key",
        Bc: "_google_ng",
        Xb: "google_signals",
        Ag: "google_tld",
        Zd: "groups",
        Bg: "gsa_experiment_id",
        Wi: "gtm_up",
        Jb: "iframe_state",
        dd: "ignore_referrer",
        pf: "internal_traffic_results",
        Yb: "is_legacy_converted",
        Kb: "is_legacy_loaded",
        ae: "is_passthrough",
        ed: "_lps",
        Qa: "language",
        be: "legacy_developer_id_string",
        sa: "linker",
        Cc: "accept_incoming",
        vb: "decorate_forms",
        W: "domains",
        Lb: "url_position",
        Cg: "method",
        Pk: "name",
        fd: "new_customer",
        Dg: "non_interaction",
        Xi: "optimize_id",
        Yi: "page_hostname",
        gd: "page_path",
        Da: "page_referrer",
        cb: "page_title",
        Eg: "passengers",
        Fg: "phone_conversion_callback",
        Zi: "phone_conversion_country_code",
        Gg: "phone_conversion_css_class",
        aj: "phone_conversion_ids",
        Hg: "phone_conversion_number",
        Ig: "phone_conversion_options",
        Jg: "_protected_audience_enabled",
        hd: "quantity",
        de: "redact_device_info",
        qf: "referral_exclusion_definition",
        Zb: "restricted_data_processing",
        bj: "retoken",
        Qk: "sample_rate",
        rf: "screen_name",
        Mb: "screen_resolution",
        cj: "search_term",
        Ja: "send_page_view",
        ac: "send_to",
        jd: "server_container_url",
        kd: "session_duration",
        ee: "session_engaged",
        tf: "session_engaged_time",
        wb: "session_id",
        fe: "session_number",
        uf: "_shared_user_id",
        ld: "delivery_postal_code",
        Rk: "temporary_client_id",
        vf: "topmost_url",
        dj: "tracking_id",
        wf: "traffic_type",
        Aa: "transaction_id",
        Nb: "transport_url",
        Kg: "trip_type",
        bc: "update",
        Xa: "url_passthrough",
        xf: "_user_agent_architecture",
        yf: "_user_agent_bitness",
        zf: "_user_agent_full_version_list",
        Af: "_user_agent_mobile",
        Bf: "_user_agent_model",
        Cf: "_user_agent_platform",
        Df: "_user_agent_platform_version",
        Ef: "_user_agent_wow64",
        Ea: "user_data",
        Lg: "user_data_auto_latency",
        Mg: "user_data_auto_meta",
        Ng: "user_data_auto_multi",
        Og: "user_data_auto_selectors",
        Pg: "user_data_auto_status",
        md: "user_data_mode",
        he: "user_data_settings",
        Ba: "user_id",
        eb: "user_properties",
        ej: "_user_region",
        ie: "us_privacy_string",
        na: "value",
        Qg: "wbraid_multiple_conversions",
        me: "_fpm_parameters",
        nj: "_host_name",
        oj: "_in_page_command",
        pj: "_is_passthrough_cid",
        Ob: "non_personalized_ads",
        te: "_sst_parameters",
        qb: "conversion_label",
        wa: "page_location",
        ub: "global_developer_id_string",
        Dc: "tc_privacy_string",
      },
    },
    Rh = {},
    Sh = Object.freeze(
      ((Rh[P.g.ka] = 1),
      (Rh[P.g.df] = 1),
      (Rh[P.g.Jd] = 1),
      (Rh[P.g.ob] = 1),
      (Rh[P.g.da] = 1),
      (Rh[P.g.Wa] = 1),
      (Rh[P.g.Oa] = 1),
      (Rh[P.g.ab] = 1),
      (Rh[P.g.uc] = 1),
      (Rh[P.g.Hb] = 1),
      (Rh[P.g.Pa] = 1),
      (Rh[P.g.vc] = 1),
      (Rh[P.g.Wc] = 1),
      (Rh[P.g.la] = 1),
      (Rh[P.g.mg] = 1),
      (Rh[P.g.bd] = 1),
      (Rh[P.g.Vd] = 1),
      (Rh[P.g.Wd] = 1),
      (Rh[P.g.yc] = 1),
      (Rh[P.g.xg] = 1),
      (Rh[P.g.Xb] = 1),
      (Rh[P.g.Ag] = 1),
      (Rh[P.g.Zd] = 1),
      (Rh[P.g.pf] = 1),
      (Rh[P.g.Yb] = 1),
      (Rh[P.g.Kb] = 1),
      (Rh[P.g.sa] = 1),
      (Rh[P.g.qf] = 1),
      (Rh[P.g.Zb] = 1),
      (Rh[P.g.Ja] = 1),
      (Rh[P.g.ac] = 1),
      (Rh[P.g.jd] = 1),
      (Rh[P.g.kd] = 1),
      (Rh[P.g.tf] = 1),
      (Rh[P.g.ld] = 1),
      (Rh[P.g.Nb] = 1),
      (Rh[P.g.bc] = 1),
      (Rh[P.g.he] = 1),
      (Rh[P.g.eb] = 1),
      (Rh[P.g.te] = 1),
      Rh)
    );
  Object.freeze([
    P.g.wa,
    P.g.Da,
    P.g.cb,
    P.g.Qa,
    P.g.rf,
    P.g.Ba,
    P.g.nf,
    P.g.Hi,
  ]);
  var Th = {},
    Uh = Object.freeze(
      ((Th[P.g.oi] = 1),
      (Th[P.g.ri] = 1),
      (Th[P.g.si] = 1),
      (Th[P.g.ui] = 1),
      (Th[P.g.vi] = 1),
      (Th[P.g.wi] = 1),
      (Th[P.g.xi] = 1),
      (Th[P.g.yi] = 1),
      (Th[P.g.zi] = 1),
      (Th[P.g.Nc] = 1),
      Th)
    ),
    Vh = {},
    Wh = Object.freeze(
      ((Vh[P.g.eg] = 1),
      (Vh[P.g.fg] = 1),
      (Vh[P.g.oc] = 1),
      (Vh[P.g.qc] = 1),
      (Vh[P.g.gg] = 1),
      (Vh[P.g.Tb] = 1),
      (Vh[P.g.rc] = 1),
      (Vh[P.g.kb] = 1),
      (Vh[P.g.Fb] = 1),
      (Vh[P.g.lb] = 1),
      (Vh[P.g.Ia] = 1),
      (Vh[P.g.sc] = 1),
      (Vh[P.g.Na] = 1),
      (Vh[P.g.hg] = 1),
      Vh)
    ),
    Xh = Object.freeze([
      P.g.ka,
      P.g.Id,
      P.g.ob,
      P.g.vc,
      P.g.yc,
      P.g.dd,
      P.g.Ja,
      P.g.bc,
    ]),
    Yh = Object.freeze([].concat(pa(Xh))),
    Zh = Object.freeze([P.g.Oa, P.g.Wd, P.g.kd, P.g.tf, P.g.Rd]),
    $h = Object.freeze([].concat(pa(Zh))),
    ai = {},
    bi =
      ((ai[P.g.R] = "1"),
      (ai[P.g.U] = "2"),
      (ai[P.g.O] = "3"),
      (ai[P.g.ya] = "4"),
      ai),
    ci = {},
    di = Object.freeze(
      ((ci[P.g.ka] = 1),
      (ci[P.g.Id] = 1),
      (ci[P.g.Jd] = 1),
      (ci[P.g.Ca] = 1),
      (ci[P.g.Vb] = 1),
      (ci[P.g.ef] = 1),
      (ci[P.g.Kd] = 1),
      (ci[P.g.Ld] = 1),
      (ci[P.g.Md] = 1),
      (ci[P.g.da] = 1),
      (ci[P.g.Nd] = 1),
      (ci[P.g.Za] = 1),
      (ci[P.g.ra] = 1),
      (ci[P.g.Wa] = 1),
      (ci[P.g.Oa] = 1),
      (ci[P.g.ab] = 1),
      (ci[P.g.Pa] = 1),
      (ci[P.g.za] = 1),
      (ci[P.g.Od] = 1),
      (ci[P.g.la] = 1),
      (ci[P.g.Li] = 1),
      (ci[P.g.Td] = 1),
      (ci[P.g.Ud] = 1),
      (ci[P.g.nf] = 1),
      (ci[P.g.yc] = 1),
      (ci[P.g.Yb] = 1),
      (ci[P.g.Kb] = 1),
      (ci[P.g.Qa] = 1),
      (ci[P.g.fd] = 1),
      (ci[P.g.wa] = 1),
      (ci[P.g.Da] = 1),
      (ci[P.g.Fg] = 1),
      (ci[P.g.Gg] = 1),
      (ci[P.g.Hg] = 1),
      (ci[P.g.Ig] = 1),
      (ci[P.g.Zb] = 1),
      (ci[P.g.Ja] = 1),
      (ci[P.g.ac] = 1),
      (ci[P.g.jd] = 1),
      (ci[P.g.ld] = 1),
      (ci[P.g.Aa] = 1),
      (ci[P.g.Nb] = 1),
      (ci[P.g.bc] = 1),
      (ci[P.g.Xa] = 1),
      (ci[P.g.Ea] = 1),
      (ci[P.g.Ba] = 1),
      (ci[P.g.na] = 1),
      ci)
    ),
    ei = {},
    fi = Object.freeze(
      ((ei.search = "s"),
      (ei.youtube = "y"),
      (ei.playstore = "p"),
      (ei.shopping = "h"),
      (ei.ads = "a"),
      (ei.maps = "m"),
      ei)
    );
  Object.freeze(P.g);
  var gi = {},
    hi = (G.google_tag_manager = G.google_tag_manager || {});
  gi.Vg = "4880";
  gi.se = Number("0") || 0;
  gi.Ya = "dataLayer";
  gi.rn =
    "ChAI8MLhtQYQoo3A8oX6w9FxEiUALB6KvC4aU/E5Vg5+HGeIpmyzl3wzbvxWz80QUaJ9IyZbhVTVGgLHPQ\x3d\x3d";
  var ii = {
      __cl: 1,
      __ecl: 1,
      __ehl: 1,
      __evl: 1,
      __fal: 1,
      __fil: 1,
      __fsl: 1,
      __hl: 1,
      __jel: 1,
      __lcl: 1,
      __sdl: 1,
      __tl: 1,
      __ytl: 1,
    },
    ji = { __paused: 1, __tg: 1 },
    ki;
  for (ki in ii) ii.hasOwnProperty(ki) && (ji[ki] = 1);
  var li = yb(""),
    mi,
    ni = !1;
  mi = ni;
  var oi,
    pi = !1;
  oi = pi;
  var qi,
    ri = !1;
  qi = ri;
  gi.Gd = "www.googletagmanager.com";
  var si = "" + gi.Gd + (mi ? "/gtag/js" : "/gtm.js"),
    ti = null,
    ui = null,
    vi = {},
    wi = {};
  function xi() {
    var a = hi.sequence || 1;
    hi.sequence = a + 1;
    return a;
  }
  gi.zk = "";
  var yi = "";
  gi.Jf = yi;
  var zi = new (function () {
    this.j = "";
    this.H = this.D = !1;
    this.P = 0;
    this.fb = this.Z = this.Ra = this.K = "";
  })();
  function Ai() {
    var a = zi.K.length;
    return zi.K[a - 1] === "/" ? zi.K.substring(0, a - 1) : zi.K;
  }
  function Bi(a) {
    for (var b = {}, c = ma(a.split("|")), d = c.next(); !d.done; d = c.next())
      b[d.value] = !0;
    return b;
  }
  var Ci = new vb(),
    Di = {},
    Ei = {},
    Hi = {
      name: gi.Ya,
      set: function (a, b) {
        h(Kb(a, b), Di);
        Fi();
      },
      get: function (a) {
        return Gi(a, 2);
      },
      reset: function () {
        Ci = new vb();
        Di = {};
        Fi();
      },
    };
  function Gi(a, b) {
    return b != 2 ? Ci.get(a) : Ii(a);
  }
  function Ii(a, b) {
    var c = a.split(".");
    b = b || [];
    for (var d = Di, e = 0; e < c.length; e++) {
      if (d === null) return !1;
      if (d === void 0) break;
      d = d[c[e]];
      if (b.indexOf(d) !== -1) return;
    }
    return d;
  }
  function Ji(a, b) {
    Ei.hasOwnProperty(a) || (Ci.set(a, b), h(Kb(a, b), Di), Fi());
  }
  function Ki() {
    for (
      var a = [
          "gtm.allowlist",
          "gtm.blocklist",
          "gtm.whitelist",
          "gtm.blacklist",
          "tagTypeBlacklist",
        ],
        b = 0;
      b < a.length;
      b++
    ) {
      var c = a[b],
        d = Gi(c, 1);
      if (Array.isArray(d) || Ta(d)) d = h(d);
      Ei[c] = d;
    }
  }
  function Fi(a) {
    z(Ei, function (b, c) {
      Ci.set(b, c);
      h(Kb(b), Di);
      h(Kb(b, c), Di);
      a && delete Ei[b];
    });
  }
  function Li(a, b) {
    var c,
      d = (b === void 0 ? 2 : b) !== 1 ? Ii(a) : Ci.get(a);
    Qa(d) === "array" || Qa(d) === "object" ? (c = h(d)) : (c = d);
    return c;
  }
  var Pi = /:[0-9]+$/,
    Qi = /^\d+\.fls\.doubleclick\.net$/;
  function Ri(a, b, c, d) {
    for (
      var e = [], f = ma(a.split("&")), g = f.next();
      !g.done;
      g = f.next()
    ) {
      var k = ma(g.value.split("=")),
        m = k.next().value,
        n = oa(k);
      if (decodeURIComponent(m.replace(/\+/g, " ")) === b) {
        var p = n.join("=");
        if (!c) return d ? p : decodeURIComponent(p.replace(/\+/g, " "));
        e.push(d ? p : decodeURIComponent(p.replace(/\+/g, " ")));
      }
    }
    return c ? e : void 0;
  }
  function Si(a, b, c, d, e) {
    b && (b = String(b).toLowerCase());
    if (b === "protocol" || b === "port")
      a.protocol = Ti(a.protocol) || Ti(G.location.protocol);
    b === "port"
      ? (a.port = String(
          Number(a.hostname ? a.port : G.location.port) ||
            (a.protocol === "http" ? 80 : a.protocol === "https" ? 443 : "")
        ))
      : b === "host" &&
        (a.hostname = (a.hostname || G.location.hostname)
          .replace(Pi, "")
          .toLowerCase());
    return Ui(a, b, c, d, e);
  }
  function Ui(a, b, c, d, e) {
    var f,
      g = Ti(a.protocol);
    b && (b = String(b).toLowerCase());
    switch (b) {
      case "url_no_fragment":
        f = Vi(a);
        break;
      case "protocol":
        f = g;
        break;
      case "host":
        f = a.hostname.replace(Pi, "").toLowerCase();
        if (c) {
          var k = /^www\d*\./.exec(f);
          k && k[0] && (f = f.substring(k[0].length));
        }
        break;
      case "port":
        f = String(
          Number(a.port) || (g === "http" ? 80 : g === "https" ? 443 : "")
        );
        break;
      case "path":
        a.pathname || a.hostname || ib("TAGGING", 1);
        f = a.pathname.substring(0, 1) === "/" ? a.pathname : "/" + a.pathname;
        var m = f.split("/");
        (d || []).indexOf(m[m.length - 1]) >= 0 && (m[m.length - 1] = "");
        f = m.join("/");
        break;
      case "query":
        f = a.search.replace("?", "");
        e && (f = Ri(f, e, !1));
        break;
      case "extension":
        var n = a.pathname.split(".");
        f = n.length > 1 ? n[n.length - 1] : "";
        f = f.split("/")[0];
        break;
      case "fragment":
        f = a.hash.replace("#", "");
        break;
      default:
        f = a && a.href;
    }
    return f;
  }
  function Ti(a) {
    return a ? a.replace(":", "").toLowerCase() : "";
  }
  function Vi(a) {
    var b = "";
    if (a && a.href) {
      var c = a.href.indexOf("#");
      b = c < 0 ? a.href : a.href.substring(0, c);
    }
    return b;
  }
  var Wi = {},
    Xi = 0;
  function Yi(a) {
    var b = Wi[a];
    if (!b) {
      var c = H.createElement("a");
      a && (c.href = a);
      var d = c.pathname;
      d[0] !== "/" && (a || ib("TAGGING", 1), (d = "/" + d));
      var e = c.hostname.replace(Pi, "");
      b = {
        href: c.href,
        protocol: c.protocol,
        host: c.host,
        hostname: e,
        pathname: d,
        search: c.search,
        hash: c.hash,
        port: c.port,
      };
      Xi < 5 && ((Wi[a] = b), Xi++);
    }
    return b;
  }
  function Zi(a) {
    function b(n) {
      var p = n.split("=")[0];
      return d.indexOf(p) < 0 ? n : p + "=0";
    }
    function c(n) {
      return n
        .split("&")
        .map(b)
        .filter(function (p) {
          return p !== void 0;
        })
        .join("&");
    }
    var d = "gclid dclid gbraid wbraid gclaw gcldc gclha gclgf gclgb _gl".split(
        " "
      ),
      e = Yi(a),
      f = a.split(/[?#]/)[0],
      g = e.search,
      k = e.hash;
    g[0] === "?" && (g = g.substring(1));
    k[0] === "#" && (k = k.substring(1));
    g = c(g);
    k = c(k);
    g !== "" && (g = "?" + g);
    k !== "" && (k = "#" + k);
    var m = "" + f + g + k;
    m[m.length - 1] === "/" && (m = m.substring(0, m.length - 1));
    return m;
  }
  function $i(a) {
    var b = Yi(G.location.href),
      c = Si(b, "host", !1);
    if (c && c.match(Qi)) {
      var d = Si(b, "path");
      if (d) {
        var e = d.split(a + "=");
        if (e.length > 1) return e[1].split(";")[0].split("?")[0];
      }
    }
  }
  var aj = {
    "https://www.google.com": "/g",
    "https://www.googleadservices.com": "/as",
    "https://pagead2.googlesyndication.com": "/gs",
  };
  function bj(a, b) {
    if (a) {
      var c = "" + a;
      c.indexOf("http://") !== 0 &&
        c.indexOf("https://") !== 0 &&
        (c = "https://" + c);
      c[c.length - 1] === "/" && (c = c.substring(0, c.length - 1));
      return Yi("" + c + b).href;
    }
  }
  function cj(a, b) {
    if (zi.D || oi) return bj(a, b);
  }
  function dj() {
    return !!gi.Jf && gi.Jf.split("@@").join("") !== "SGTM_TOKEN";
  }
  function ej(a) {
    for (var b = ma([P.g.jd, P.g.Nb]), c = b.next(); !c.done; c = b.next()) {
      var d = Q(a, c.value);
      if (d) return d;
    }
  }
  function fj(a, b) {
    return zi.D ? "" + Ai() + (b ? aj[a] || "" : "") : a;
  }
  function gj(a) {
    var b = String(a[Ke.oa] || "").replace(/_/g, "");
    return Hb(b, "cvt") ? "cvt" : b;
  }
  var hj =
    G.location.search.indexOf("?gtm_latency=") >= 0 ||
    G.location.search.indexOf("&gtm_latency=") >= 0;
  var ij = { sampleRate: "0.005000", vk: "", pn: "0.005" },
    jj = Math.random(),
    kj;
  if (!(kj = hj)) {
    var lj = ij.sampleRate;
    kj = jj < Number(lj);
  }
  var mj = kj,
    nj =
      (tc == null ? void 0 : tc.includes("gtm_debug=d")) ||
      hj ||
      jj >= 1 - Number(ij.pn);
  var oj = /gtag[.\/]js/,
    pj = /gtm[.\/]js/,
    qj = !1;
  function rj(a) {
    if (qj) return "1";
    var b = a.scriptSource;
    if (b) {
      if (oj.test(b)) return "3";
      if (pj.test(b)) return "2";
    }
    return "0";
  }
  function sj(a, b) {
    var c = tj();
    c.pending || (c.pending = []);
    sb(c.pending, function (d) {
      return (
        d.target.ctid === a.ctid && d.target.isDestination === a.isDestination
      );
    }) || c.pending.push({ target: a, onLoad: b });
  }
  var uj = function () {
    this.container = {};
    this.destination = {};
    this.canonical = {};
    this.pending = [];
    this.siloed = [];
    this.injectedFirstPartyContainers = {};
    var a;
    var b = G.google_tags_first_party || [];
    if (Array.isArray(b)) {
      for (var c = {}, d = ma(b), e = d.next(); !e.done; e = d.next())
        c[e.value] = !0;
      a = Object.freeze(c);
    } else a = {};
    this.injectedFirstPartyContainers = a;
  };
  function tj() {
    var a = uc("google_tag_data", {}),
      b = a.tidr;
    b || ((b = new uj()), (a.tidr = b));
    return b;
  }
  var vj = {},
    wj = !1,
    Qf = {
      ctid: "GTM-WG62CH3B",
      canonicalContainerId: "169593255",
      bk: "GTM-WG62CH3B",
      dk: "GTM-WG62CH3B",
    };
  vj.oe = yb("");
  function xj() {
    var a = yj();
    return wj ? a.map(zj) : a;
  }
  function Aj() {
    var a = Bj();
    return wj ? a.map(zj) : a;
  }
  function Cj() {
    return Dj(Qf.ctid);
  }
  function Ej() {
    return Dj(Qf.canonicalContainerId || "_" + Qf.ctid);
  }
  function yj() {
    return Qf.bk ? Qf.bk.split("|") : [Qf.ctid];
  }
  function Bj() {
    return Qf.dk ? Qf.dk.split("|") : [];
  }
  function Fj() {
    var a = Gj(Hj()),
      b = a && a.parent;
    if (b) return Gj(b);
  }
  function Gj(a) {
    var b = tj();
    return a.isDestination ? b.destination[a.ctid] : b.container[a.ctid];
  }
  function Dj(a) {
    return wj ? zj(a) : a;
  }
  function zj(a) {
    return "siloed_" + a;
  }
  function Ij(a) {
    return wj ? Jj(a) : a;
  }
  function Jj(a) {
    a = String(a);
    return Hb(a, "siloed_") ? a.substring(7) : a;
  }
  function Nj() {
    var a = !1;
    if (a) {
      var b = tj();
      if (b.siloed) {
        for (
          var c = [], d = yj().map(zj), e = Bj().map(zj), f = {}, g = 0;
          g < b.siloed.length;
          f = { Mf: void 0 }, g++
        )
          (f.Mf = b.siloed[g]),
            !wj &&
            sb(
              f.Mf.isDestination ? e : d,
              (function (k) {
                return function (m) {
                  return m === k.Mf.ctid;
                };
              })(f)
            )
              ? (wj = !0)
              : c.push(f.Mf);
        b.siloed = c;
      }
    }
  }
  function Oj() {
    var a = tj();
    if (a.pending) {
      for (
        var b, c = [], d = !1, e = xj(), f = Aj(), g = {}, k = 0;
        k < a.pending.length;
        g = { Se: void 0 }, k++
      )
        (g.Se = a.pending[k]),
          sb(
            g.Se.target.isDestination ? f : e,
            (function (m) {
              return function (n) {
                return n === m.Se.target.ctid;
              };
            })(g)
          )
            ? d || ((b = g.Se.onLoad), (d = !0))
            : c.push(g.Se);
      a.pending = c;
      if (b)
        try {
          b(Ej());
        } catch (m) {}
    }
  }
  function Pj() {
    for (
      var a = Qf.ctid,
        b = xj(),
        c = Aj(),
        d = function (n, p) {
          var q = {
            canonicalContainerId: Qf.canonicalContainerId,
            scriptContainerId: a,
            state: 2,
            containers: b.slice(),
            destinations: c.slice(),
          };
          sc && (q.scriptElement = sc);
          tc && (q.scriptSource = tc);
          if (Fj() === void 0) {
            var r;
            a: {
              if ((q.scriptContainerId || "").indexOf("GTM-") >= 0) {
                var t;
                b: {
                  if (q.scriptSource) {
                    for (
                      var u = zi.H,
                        v = Yi(q.scriptSource),
                        w = u ? v.pathname : "" + v.hostname + v.pathname,
                        x = H.scripts,
                        y = "",
                        B = 0;
                      B < x.length;
                      ++B
                    ) {
                      var A = x[B];
                      if (
                        !(
                          A.innerHTML.length === 0 ||
                          (!u &&
                            A.innerHTML.indexOf(
                              q.scriptContainerId || "SHOULD_NOT_BE_SET"
                            ) < 0) ||
                          A.innerHTML.indexOf(w) < 0
                        )
                      ) {
                        if (A.innerHTML.indexOf("(function(w,d,s,l,i)") >= 0) {
                          t = String(B);
                          break b;
                        }
                        y = String(B);
                      }
                    }
                    if (y) {
                      t = y;
                      break b;
                    }
                  }
                  t = void 0;
                }
                var C = t;
                if (C) {
                  qj = !0;
                  r = C;
                  break a;
                }
              }
              var E = [].slice.call(document.scripts);
              r = q.scriptElement ? String(E.indexOf(q.scriptElement)) : "-1";
            }
            q.htmlLoadOrder = r;
            q.loadScriptType = rj(q);
          }
          var D = p ? e.destination : e.container,
            F = D[n];
          F ? (p && F.state === 0 && O(93), Object.assign(F, q)) : (D[n] = q);
        },
        e = tj(),
        f = ma(b),
        g = f.next();
      !g.done;
      g = f.next()
    )
      d(g.value, !1);
    for (var k = ma(c), m = k.next(); !m.done; m = k.next()) d(m.value, !0);
    e.canonical[Ej()] = {};
    Oj();
  }
  function Qj(a) {
    return !!tj().container[a];
  }
  function Rj(a) {
    var b = tj().destination[a];
    return !!b && !!b.state;
  }
  function Hj() {
    return { ctid: Cj(), isDestination: vj.oe };
  }
  function Sj(a) {
    var b = tj();
    (b.siloed = b.siloed || []).push(a);
  }
  function Tj() {
    var a = tj().container,
      b;
    for (b in a) if (a.hasOwnProperty(b) && a[b].state === 1) return !0;
    return !1;
  }
  function Uj() {
    var a = {};
    z(tj().destination, function (b, c) {
      c.state === 0 && (a[Jj(b)] = c);
    });
    return a;
  }
  function Vj(a) {
    return !!(
      a &&
      a.parent &&
      a.context &&
      a.context.source === 1 &&
      a.parent.ctid.indexOf("GTM-") !== 0
    );
  }
  var Wj = "/td?id=" + Qf.ctid,
    Xj = ["v", "t", "pid", "dl", "tdp"],
    Yj = ["mcc"],
    Zj = {},
    ak = {};
  function bk(a, b, c) {
    ak[a] = b;
    (c === void 0 || c) && ck(a);
  }
  function ck(a, b) {
    if (Zj[a] === void 0 || (b === void 0 ? 0 : b)) Zj[a] = !0;
  }
  function dk(a) {
    a = a === void 0 ? !1 : a;
    var b = Object.keys(Zj)
      .filter(function (c) {
        return Zj[c] === !0 && ak[c] !== void 0 && (a || !Yj.includes(c));
      })
      .map(function (c) {
        var d = ak[c];
        typeof d === "function" && (d = d());
        return d ? "&" + c + "=" + d : "";
      })
      .join("");
    return "" + fj("https://www.googletagmanager.com") + Wj + ("" + b + "&z=0");
  }
  function ek() {
    Object.keys(Zj).forEach(function (a) {
      Xj.indexOf(a) < 0 && (Zj[a] = !1);
    });
  }
  function fk(a) {
    a = a === void 0 ? !1 : a;
    if (nj && Qf.ctid) {
      var b = dk(a);
      a ? Oc(b) : Dc(b);
      ek();
    }
  }
  function gk() {
    Object.keys(Zj).filter(function (a) {
      return Zj[a] && !Xj.includes(a);
    }).length > 0 && fk(!0);
  }
  var hk = tb();
  function ik() {
    hk = tb();
  }
  function jk() {
    bk("v", "3");
    bk("t", "t");
    bk("pid", function () {
      return String(hk);
    });
    Ec(G, "pagehide", gk);
    G.setInterval(ik, 864e5);
  }
  function kk(a, b) {
    if (a === "") return b;
    var c = Number(a);
    return isNaN(c) ? b : c;
  }
  var lk = [];
  function mk(a) {
    switch (a) {
      case 0:
        return 0;
      case 42:
        return 1;
      case 43:
        return 2;
      case 44:
        return 11;
      case 49:
        return 3;
      case 57:
        return 4;
      case 65:
        return 7;
      case 75:
        return 5;
      case 84:
        return 6;
      case 85:
        return 10;
      case 87:
        return 8;
      case 88:
        return 9;
    }
  }
  function T(a) {
    lk[a] = !0;
    var b = mk(a);
    b !== void 0 && (lb[b] = !0);
  }
  T(30);
  T(26);
  T(27);
  T(28);
  T(29);
  T(45);
  T(69);
  T(53);
  T(66);
  T(33);
  T(15);
  T(93);
  T(14);
  T(98);
  T(92);
  T(58);
  T(76);
  T(6);
  T(46);
  T(4);
  T(73);
  T(89);
  T(64);
  T(62);
  T(74);
  T(102);
  T(99);
  T(75);
  T(5);
  T(84);
  mb[1] = kk("1", 6e4);
  mb[3] = kk("10", 1);
  mb[2] = kk("", 50);
  T(23);
  T(11);
  T(61);
  T(90);
  T(72);
  T(50);
  T(22);
  T(101);
  T(41);
  T(77);
  T(85);
  T(79);
  T(47);

  function U(a) {
    return !!lk[a];
  }
  var qk = new (function (a, b) {
    this.j = a;
    this.defaultValue = b === void 0 ? !1 : b;
  })(1933);
  function rk() {
    var a = uc("google_tag_data", {});
    return (a.ics = a.ics || new sk());
  }
  var sk = function () {
    this.entries = {};
    this.waitPeriodTimedOut =
      this.wasSetLate =
      this.accessedAny =
      this.accessedDefault =
      this.usedImplicit =
      this.usedUpdate =
      this.usedDefault =
      this.usedDeclare =
      this.active =
        !1;
    this.j = [];
  };
  sk.prototype.default = function (a, b, c, d, e, f, g) {
    this.usedDefault ||
      this.usedDeclare ||
      (!this.accessedDefault && !this.accessedAny) ||
      (this.wasSetLate = !0);
    this.usedDefault = this.active = !0;
    ib("TAGGING", 19);
    b == null ? ib("TAGGING", 18) : tk(this, a, b === "granted", c, d, e, f, g);
  };
  sk.prototype.waitForUpdate = function (a, b, c) {
    for (var d = 0; d < a.length; d++)
      tk(this, a[d], void 0, void 0, "", "", b, c);
  };
  var tk = function (a, b, c, d, e, f, g, k) {
    var m = a.entries,
      n = m[b] || {},
      p = n.region,
      q = d && l(d) ? d.toUpperCase() : void 0;
    e = e.toUpperCase();
    f = f.toUpperCase();
    if (e === "" || q === f || (q === e ? p !== f : !q && !p)) {
      var r = !!(g && g > 0 && n.update === void 0),
        t = {
          region: q,
          declare_region: n.declare_region,
          implicit: n.implicit,
          default: c !== void 0 ? c : n.default,
          declare: n.declare,
          update: n.update,
          quiet: r,
        };
      if (e !== "" || n.default !== !1) m[b] = t;
      r &&
        G.setTimeout(function () {
          m[b] === t &&
            t.quiet &&
            (ib("TAGGING", 2),
            (a.waitPeriodTimedOut = !0),
            a.clearTimeout(b, void 0, k),
            a.notifyListeners());
        }, g);
    }
  };
  ba = sk.prototype;
  ba.clearTimeout = function (a, b, c) {
    var d = [a],
      e = c.delegatedConsentTypes,
      f;
    for (f in e) e.hasOwnProperty(f) && e[f] === a && d.push(f);
    var g = this.entries[a] || {},
      k = this.getConsentState(a, c);
    if (g.quiet) {
      g.quiet = !1;
      for (var m = ma(d), n = m.next(); !n.done; n = m.next())
        uk(this, n.value);
    } else if (b !== void 0 && k !== b)
      for (var p = ma(d), q = p.next(); !q.done; q = p.next())
        uk(this, q.value);
  };
  ba.update = function (a, b, c) {
    this.usedDefault ||
      this.usedDeclare ||
      this.usedUpdate ||
      !this.accessedAny ||
      (this.wasSetLate = !0);
    this.usedUpdate = this.active = !0;
    if (b != null) {
      var d = this.getConsentState(a, c),
        e = this.entries;
      (e[a] = e[a] || {}).update = b === "granted";
      this.clearTimeout(a, d, c);
    }
  };
  ba.declare = function (a, b, c, d, e) {
    this.usedDeclare = this.active = !0;
    var f = this.entries,
      g = f[a] || {},
      k = g.declare_region,
      m = c && l(c) ? c.toUpperCase() : void 0;
    d = d.toUpperCase();
    e = e.toUpperCase();
    if (d === "" || m === e || (m === d ? k !== e : !m && !k)) {
      var n = {
        region: g.region,
        declare_region: m,
        declare: b === "granted",
        implicit: g.implicit,
        default: g.default,
        update: g.update,
        quiet: g.quiet,
      };
      if (d !== "" || g.declare !== !1) f[a] = n;
    }
  };
  ba.implicit = function (a, b) {
    this.usedImplicit = !0;
    var c = this.entries,
      d = (c[a] = c[a] || {});
    d.implicit !== !1 && (d.implicit = b === "granted");
  };
  ba.getConsentState = function (a, b) {
    var c = this.entries,
      d = c[a] || {},
      e = d.update;
    if (e !== void 0) return e ? 1 : 2;
    if (nb(8) && b.usedContainerScopedDefaults) {
      var f = b.containerScopedDefaults[a];
      if (f === 3) return 1;
      if (f === 2) return 2;
    } else if (((e = d.default), e !== void 0)) return e ? 1 : 2;
    if (b == null ? 0 : b.delegatedConsentTypes.hasOwnProperty(a)) {
      var g = b.delegatedConsentTypes[a],
        k = c[g] || {};
      e = k.update;
      if (e !== void 0) return e ? 1 : 2;
      if (nb(8) && b.usedContainerScopedDefaults) {
        var m = b.containerScopedDefaults[g];
        if (m === 3) return 1;
        if (m === 2) return 2;
      } else if (((e = k.default), e !== void 0)) return e ? 1 : 2;
    }
    e = d.declare;
    if (e !== void 0) return e ? 1 : 2;
    e = d.implicit;
    return e !== void 0 ? (e ? 3 : 4) : 0;
  };
  ba.addListener = function (a, b) {
    this.j.push({ consentTypes: a, Jl: b });
  };
  var uk = function (a, b) {
    for (var c = 0; c < a.j.length; ++c) {
      var d = a.j[c];
      Array.isArray(d.consentTypes) &&
        d.consentTypes.indexOf(b) !== -1 &&
        (d.ek = !0);
    }
  };
  sk.prototype.notifyListeners = function (a, b) {
    for (var c = 0; c < this.j.length; ++c) {
      var d = this.j[c];
      if (d.ek) {
        d.ek = !1;
        try {
          d.Jl({ consentEventId: a, consentPriorityId: b });
        } catch (e) {}
      }
    }
  };
  var vk = function (a) {
    vk[" "](a);
    return a;
  };
  vk[" "] = function () {};
  var xk = function () {
    var a = wk,
      b = "zh";
    if (a.zh && a.hasOwnProperty(b)) return a.zh;
    var c = new a();
    return (a.zh = c);
  };
  var wk = function () {
    var a = {};
    this.j = function () {
      var b = qk.j,
        c = qk.defaultValue;
      return a[b] != null ? a[b] : c;
    };
    this.D = function () {
      a[qk.j] = !0;
    };
  };
  var yk = !1,
    zk = !1,
    Ak = {},
    Bk = {
      delegatedConsentTypes: {},
      corePlatformServices: {},
      usedCorePlatformServices: !1,
      selectedAllCorePlatformServices: !1,
      containerScopedDefaults:
        ((Ak.ad_storage = 1),
        (Ak.analytics_storage = 1),
        (Ak.ad_user_data = 1),
        (Ak.ad_personalization = 1),
        Ak),
      usedContainerScopedDefaults: !1,
    };
  function Ck(a) {
    var b = rk();
    b.accessedAny = !0;
    return (l(a) ? [a] : a).every(function (c) {
      switch (b.getConsentState(c, Bk)) {
        case 1:
        case 3:
          return !0;
        case 2:
        case 4:
          return !1;
        default:
          return !0;
      }
    });
  }
  function Dk(a) {
    var b = rk();
    b.accessedAny = !0;
    return b.getConsentState(a, Bk);
  }
  function Ek(a) {
    for (var b = {}, c = ma(a), d = c.next(); !d.done; d = c.next()) {
      var e = d.value;
      b[e] = Bk.corePlatformServices[e] !== !1;
    }
    return b;
  }
  function Fk(a) {
    var b = rk();
    b.accessedAny = !0;
    return !(b.entries[a] || {}).quiet;
  }
  function Gk() {
    if (!xk().j()) return !1;
    var a = rk();
    a.accessedAny = !0;
    if (a.active) return !0;
    if (!nb(8) || !Bk.usedContainerScopedDefaults) return !1;
    for (
      var b = ma(Object.keys(Bk.containerScopedDefaults)), c = b.next();
      !c.done;
      c = b.next()
    )
      if (Bk.containerScopedDefaults[c.value] !== 1) return !0;
    return !1;
  }
  function Hk(a, b) {
    rk().addListener(a, b);
  }
  function Ik(a, b) {
    rk().notifyListeners(a, b);
  }
  function Jk(a, b) {
    function c() {
      for (var e = 0; e < b.length; e++) if (!Fk(b[e])) return !0;
      return !1;
    }
    if (c()) {
      var d = !1;
      Hk(b, function (e) {
        d || c() || ((d = !0), a(e));
      });
    } else a({});
  }
  function Kk(a, b) {
    function c() {
      for (var k = [], m = 0; m < e.length; m++) {
        var n = e[m];
        Ck(n) && !f[n] && k.push(n);
      }
      return k;
    }
    function d(k) {
      for (var m = 0; m < k.length; m++) f[k[m]] = !0;
    }
    var e = l(b) ? [b] : b,
      f = {},
      g = c();
    g.length !== e.length &&
      (d(g),
      Hk(e, function (k) {
        function m(q) {
          q.length !== 0 && (d(q), (k.consentTypes = q), a(k));
        }
        var n = c();
        if (n.length !== 0) {
          var p = Object.keys(f).length;
          n.length + p >= e.length
            ? m(n)
            : G.setTimeout(function () {
                m(c());
              }, 500);
        }
      }));
  }
  var Lk = [
      "ad_storage",
      "analytics_storage",
      "ad_user_data",
      "ad_personalization",
    ],
    Mk = !1,
    Nk = !1;
  function Ok() {
    U(47) &&
      !Nk &&
      Mk &&
      (Lk.some(function (a) {
        return Bk.containerScopedDefaults[a] !== 1;
      }) ||
        Pk("mbc"));
    Nk = !0;
  }
  function Pk(a) {
    nj && (bk(a, "1"), fk());
  }
  function Qk(a) {
    ib("HEALTH", a);
  }
  var Rk;
  try {
    Rk = JSON.parse(
      gb(
        "eyIwIjoiSU4iLCIxIjoiSU4tS0EiLCIyIjpmYWxzZSwiMyI6Imdvb2dsZS5jby5pbiIsIjQiOiIiLCI1Ijp0cnVlLCI2IjpmYWxzZSwiNyI6ImFkX3N0b3JhZ2V8YW5hbHl0aWNzX3N0b3JhZ2V8YWRfdXNlcl9kYXRhfGFkX3BlcnNvbmFsaXphdGlvbiJ9"
      )
    );
  } catch (a) {
    O(123), Qk(2), (Rk = {});
  }
  function Sk() {
    return Rk["0"] || "";
  }
  function Tk() {
    return Rk["1"] || "";
  }
  function Uk() {
    var a = !1;
    return a;
  }
  function Vk() {
    return Rk["6"] !== !1;
  }
  function Wk() {
    var a = "";
    return a;
  }
  function Xk() {
    var a = !1;
    return a;
  }
  function Yk() {
    var a = "";
    return a;
  }
  var Zk = [P.g.R, P.g.U, P.g.O, P.g.ya],
    $k,
    al;
  function bl(a) {
    for (
      var b = a[P.g.Eb], c = Array.isArray(b) ? b : [b], d = { Ie: 0 };
      d.Ie < c.length;
      d = { Ie: d.Ie }, ++d.Ie
    )
      z(
        a,
        (function (e) {
          return function (f, g) {
            if (f !== P.g.Eb) {
              var k = c[e.Ie],
                m = Sk(),
                n = Tk();
              zk = !0;
              yk && ib("TAGGING", 20);
              rk().declare(f, g, k, m, n);
            }
          };
        })(d)
      );
  }
  function cl(a) {
    Ok();
    !al && $k && Pk("crc");
    al = !0;
    var b = a[P.g.Eb];
    b && O(40);
    var c = a[P.g.af];
    c && O(41);
    for (
      var d = Array.isArray(b) ? b : [b], e = { Je: 0 };
      e.Je < d.length;
      e = { Je: e.Je }, ++e.Je
    )
      z(
        a,
        (function (f) {
          return function (g, k) {
            if (g !== P.g.Eb && g !== P.g.af) {
              var m = d[f.Je],
                n = Number(c),
                p = Sk(),
                q = Tk();
              n = n === void 0 ? 0 : n;
              yk = !0;
              zk && ib("TAGGING", 20);
              rk().default(g, k, m, p, q, n, Bk);
            }
          };
        })(e)
      );
  }
  function dl(a) {
    if (U(88)) {
      nb(9) && (Bk.usedContainerScopedDefaults = !0);
      var b = a[P.g.Eb];
      if (b) {
        var c = Array.isArray(b) ? b : [b];
        if (!c.includes(Tk()) && !c.includes(Sk())) return;
      }
      z(a, function (d, e) {
        switch (d) {
          case "ad_storage":
          case "analytics_storage":
          case "ad_user_data":
          case "ad_personalization":
            break;
          default:
            return;
        }
        nb(9) && (Bk.usedContainerScopedDefaults = !0);
        Bk.containerScopedDefaults[d] = e === "granted" ? 3 : 2;
      });
    }
  }
  function el(a, b) {
    Ok();
    $k = !0;
    z(a, function (c, d) {
      yk = !0;
      zk && ib("TAGGING", 20);
      rk().update(c, d, Bk);
    });
    Ik(b.eventId, b.priorityId);
  }
  function fl(a) {
    a.hasOwnProperty("all") &&
      ((Bk.selectedAllCorePlatformServices = !0),
      z(fi, function (b) {
        Bk.corePlatformServices[b] = a.all === "granted";
        Bk.usedCorePlatformServices = !0;
      }));
    z(a, function (b, c) {
      b !== "all" &&
        ((Bk.corePlatformServices[b] = c === "granted"),
        (Bk.usedCorePlatformServices = !0));
    });
  }
  function W(a) {
    Array.isArray(a) || (a = [a]);
    return a.every(function (b) {
      return Ck(b);
    });
  }
  function gl(a, b) {
    Hk(a, b);
  }
  function hl(a, b) {
    Kk(a, b);
  }
  function il(a, b) {
    Jk(a, b);
  }
  function jl() {
    var a = [P.g.R, P.g.ya, P.g.O];
    rk().waitForUpdate(a, 500, Bk);
  }
  function kl(a) {
    for (var b = ma(a), c = b.next(); !c.done; c = b.next()) {
      var d = c.value;
      rk().clearTimeout(d, void 0, Bk);
    }
    Ik();
  }
  var ll = function () {
    if (hi.pscdl === void 0) {
      var a = function (b) {
        hi.pscdl = b;
      };
      try {
        "cookieDeprecationLabel" in qc
          ? (a("pending"), qc.cookieDeprecationLabel.getValue().then(a))
          : a("noapi");
      } catch (b) {
        a("error");
      }
    }
  };
  function ml(a, b) {
    U(12) &&
      b &&
      z(b, function (c, d) {
        typeof d !== "object" && (a["1p." + c] = String(d));
      });
  }
  var nl = /[A-Z]+/,
    ol = /\s/;
  function pl(a, b) {
    if (l(a)) {
      a = Ab(a);
      var c = a.indexOf("-");
      if (!(c < 0)) {
        var d = a.substring(0, c);
        if (nl.test(d)) {
          var e = a.substring(c + 1),
            f;
          if (b) {
            var g = function (n) {
              var p = n.indexOf("/");
              return p < 0 ? [n] : [n.substring(0, p), n.substring(p + 1)];
            };
            f = g(e);
            if (d === "DC" && f.length === 2) {
              var k = g(f[1]);
              k.length === 2 && ((f[1] = k[0]), f.push(k[1]));
            }
          } else {
            f = e.split("/");
            for (var m = 0; m < f.length; m++)
              if (!f[m] || (ol.test(f[m]) && (d !== "AW" || m !== 1))) return;
          }
          return { id: a, prefix: d, ia: d + "-" + f[0], ma: f };
        }
      }
    }
  }
  function ql(a, b) {
    for (var c = {}, d = 0; d < a.length; ++d) {
      var e = pl(a[d], b);
      e && (c[e.id] = e);
    }
    rl(c);
    var f = [];
    z(c, function (g, k) {
      f.push(k);
    });
    return f;
  }
  function rl(a) {
    var b = [],
      c;
    for (c in a)
      if (a.hasOwnProperty(c)) {
        var d = a[c];
        d.prefix === "AW" && d.ma[sl[2]] && b.push(d.ia);
      }
    for (var e = 0; e < b.length; ++e) delete a[b[e]];
  }
  var tl = {},
    sl =
      ((tl[0] = 0),
      (tl[1] = 0),
      (tl[2] = 1),
      (tl[3] = 0),
      (tl[4] = 1),
      (tl[5] = 2),
      (tl[6] = 0),
      (tl[7] = 0),
      (tl[8] = 0),
      tl);
  var ul = Number("") || 500,
    vl = {},
    wl = {},
    xl = { initialized: 11, complete: 12, interactive: 13 },
    yl = {},
    zl = Object.freeze(((yl[P.g.Ja] = !0), yl)),
    Al =
      H.location.search.indexOf("?gtm_diagnostics=") >= 0 ||
      H.location.search.indexOf("&gtm_diagnostics=") >= 0,
    Bl = void 0;
  function Cl(a, b) {
    if (b.length && nj) {
      var c;
      (c = vl)[a] != null || (c[a] = []);
      wl[a] != null || (wl[a] = []);
      var d = b.filter(function (e) {
        return !wl[a].includes(e);
      });
      vl[a].push.apply(vl[a], pa(d));
      wl[a].push.apply(wl[a], pa(d));
      !Bl &&
        d.length > 0 &&
        (ck("tdc", !0),
        (Bl = G.setTimeout(function () {
          fk();
          vl = {};
          Bl = void 0;
        }, ul)));
    }
  }
  function Dl(a, b, c) {
    if (nj && a === "config") {
      var d,
        e = (d = pl(b)) == null ? void 0 : d.ma;
      if (!(e && e.length > 1)) {
        var f,
          g = uc("google_tag_data", {});
        g.td || (g.td = {});
        f = g.td;
        var k = h(c.K);
        h(c.j, k);
        var m = [],
          n;
        for (n in f)
          if (f.hasOwnProperty(n)) {
            var p = El(f[n], k);
            p.length && (Al && console.log(p), m.push(n));
          }
        m.length && (Cl(b, m), ib("TAGGING", xl[H.readyState] || 14));
        f[b] = k;
      }
    }
  }
  function Fl(a, b) {
    var c = {},
      d;
    for (d in b) b.hasOwnProperty(d) && (c[d] = !0);
    for (var e in a) a.hasOwnProperty(e) && (c[e] = !0);
    return c;
  }
  function El(a, b, c, d) {
    c = c === void 0 ? {} : c;
    d = d === void 0 ? "" : d;
    if (a === b) return [];
    var e = function (r, t) {
        var u;
        Qa(t) === "object" ? (u = t[r]) : Qa(t) === "array" && (u = t[r]);
        return u === void 0 ? zl[r] : u;
      },
      f = Fl(a, b),
      g;
    for (g in f)
      if (f.hasOwnProperty(g)) {
        var k = (d ? d + "." : "") + g,
          m = e(g, a),
          n = e(g, b),
          p = Qa(m) === "object" || Qa(m) === "array",
          q = Qa(n) === "object" || Qa(n) === "array";
        if (p && q) El(m, n, c, k);
        else if (p || q || m !== n) c[k] = !0;
      }
    return Object.keys(c);
  }
  function Gl() {
    bk(
      "tdc",
      function () {
        Bl && (G.clearTimeout(Bl), (Bl = void 0));
        var a = [],
          b;
        for (b in vl) vl.hasOwnProperty(b) && a.push(b + "*" + vl[b].join("."));
        return a.length ? a.join("!") : void 0;
      },
      !1
    );
  }
  var Hl = function (a, b, c, d, e, f, g, k, m, n, p) {
      this.eventId = a;
      this.priorityId = b;
      this.j = c;
      this.P = d;
      this.H = e;
      this.K = f;
      this.D = g;
      this.eventMetadata = k;
      this.onSuccess = m;
      this.onFailure = n;
      this.isGtmEvent = p;
    },
    Il = function (a, b) {
      var c = [];
      switch (b) {
        case 3:
          c.push(a.j);
          c.push(a.P);
          c.push(a.H);
          c.push(a.K);
          c.push(a.D);
          break;
        case 2:
          c.push(a.j);
          break;
        case 1:
          c.push(a.P);
          c.push(a.H);
          c.push(a.K);
          c.push(a.D);
          break;
        case 4:
          c.push(a.j), c.push(a.P), c.push(a.H), c.push(a.K);
      }
      return c;
    },
    Q = function (a, b, c, d) {
      for (
        var e = ma(Il(a, d === void 0 ? 3 : d)), f = e.next();
        !f.done;
        f = e.next()
      ) {
        var g = f.value;
        if (g[b] !== void 0) return g[b];
      }
      return c;
    },
    Jl = function (a) {
      for (
        var b = {}, c = Il(a, 4), d = ma(c), e = d.next();
        !e.done;
        e = d.next()
      )
        for (
          var f = Object.keys(e.value), g = ma(f), k = g.next();
          !k.done;
          k = g.next()
        )
          b[k.value] = 1;
      return Object.keys(b);
    },
    Kl = function (a, b, c) {
      function d(n) {
        Ta(n) &&
          z(n, function (p, q) {
            f = !0;
            e[p] = q;
          });
      }
      var e = {},
        f = !1,
        g = Il(a, c === void 0 ? 3 : c);
      g.reverse();
      for (var k = ma(g), m = k.next(); !m.done; m = k.next()) d(m.value[b]);
      return f ? e : void 0;
    },
    Ll = function (a) {
      for (
        var b = [P.g.Sc, P.g.Oc, P.g.Pc, P.g.Qc, P.g.Rc, P.g.Tc, P.g.Uc],
          c = Il(a, 3),
          d = ma(c),
          e = d.next();
        !e.done;
        e = d.next()
      ) {
        for (
          var f = e.value, g = {}, k = !1, m = ma(b), n = m.next();
          !n.done;
          n = m.next()
        ) {
          var p = n.value;
          f[p] !== void 0 && ((g[p] = f[p]), (k = !0));
        }
        var q = k ? g : void 0;
        if (q) return q;
      }
      return {};
    },
    Ml = function (a, b) {
      this.eventId = a;
      this.priorityId = b;
      this.D = {};
      this.P = {};
      this.j = {};
      this.H = {};
      this.Z = {};
      this.K = {};
      this.eventMetadata = {};
      this.isGtmEvent = !1;
      this.onSuccess = function () {};
      this.onFailure = function () {};
    },
    Nl = function (a, b) {
      a.D = b;
      return a;
    },
    Ol = function (a, b) {
      a.P = b;
      return a;
    },
    Pl = function (a, b) {
      a.j = b;
      return a;
    },
    Ql = function (a, b) {
      a.H = b;
      return a;
    },
    Rl = function (a, b) {
      a.Z = b;
      return a;
    },
    Sl = function (a, b) {
      a.K = b;
      return a;
    },
    Tl = function (a, b) {
      a.eventMetadata = b || {};
      return a;
    },
    Ul = function (a, b) {
      a.onSuccess = b;
      return a;
    },
    Vl = function (a, b) {
      a.onFailure = b;
      return a;
    },
    Wl = function (a, b) {
      a.isGtmEvent = b;
      return a;
    },
    Xl = function (a) {
      return new Hl(
        a.eventId,
        a.priorityId,
        a.D,
        a.P,
        a.j,
        a.H,
        a.K,
        a.eventMetadata,
        a.onSuccess,
        a.onFailure,
        a.isGtmEvent
      );
    };
  var Yl = { uk: Number("5"), Yn: Number("") },
    Zl = [];
  function $l(a) {
    Zl.push(a);
  }
  var am = "?id=" + Qf.ctid,
    bm = void 0,
    cm = {},
    dm = void 0,
    em = new (function () {
      var a = 5;
      Yl.uk > 0 && (a = Yl.uk);
      this.D = a;
      this.j = 0;
      this.H = [];
    })(),
    fm = 1e3;
  function gm(a, b) {
    var c = bm;
    if (c === void 0)
      if (b) c = xi();
      else return "";
    for (
      var d = [fj("https://www.googletagmanager.com"), "/a", am],
        e = ma(Zl),
        f = e.next();
      !f.done;
      f = e.next()
    )
      for (
        var g = f.value,
          k = g({ eventId: c, mc: !!a }),
          m = ma(k),
          n = m.next();
        !n.done;
        n = m.next()
      ) {
        var p = ma(n.value),
          q = p.next().value,
          r = p.next().value;
        d.push("&" + q + "=" + r);
      }
    d.push("&z=0");
    return d.join("");
  }
  function hm() {
    dm && (G.clearTimeout(dm), (dm = void 0));
    if (bm !== void 0 && im) {
      var a;
      (a = cm[bm]) || (a = em.j < em.D ? !1 : Cb() - em.H[em.j % em.D] < 1e3);
      if (a || fm-- <= 0) O(1), (cm[bm] = !0);
      else {
        var b = em.j++ % em.D;
        em.H[b] = Cb();
        var c = gm(!0);
        Dc(c);
        im = !1;
      }
    }
  }
  var im = !1;
  function jm(a) {
    cm[a] ||
      (a !== bm && (hm(), (bm = a)),
      (im = !0),
      dm || (dm = G.setTimeout(hm, 500)),
      gm().length >= 2022 && hm());
  }
  var km = tb();
  function lm() {
    km = tb();
  }
  function mm() {
    return [
      ["v", "3"],
      ["t", "t"],
      ["pid", String(km)],
    ];
  }
  var nm = {};
  function om(a, b, c) {
    mj && a !== void 0 && ((nm[a] = nm[a] || []), nm[a].push(c + b), jm(a));
  }
  function pm(a) {
    var b = a.eventId,
      c = a.mc,
      d = [],
      e = nm[b] || [];
    e.length && d.push(["epr", e.join(".")]);
    c && delete nm[b];
    return d;
  }
  function qm(a, b) {
    var c = pl(Dj(a), !0);
    c && rm.register(c, b);
  }
  function sm(a, b, c, d) {
    var e = pl(c, d.isGtmEvent);
    e && rm.push("event", [b, a], e, d);
  }
  function tm(a, b, c, d) {
    var e = pl(c, d.isGtmEvent);
    e && rm.push("get", [a, b], e, d);
  }
  function um(a) {
    var b = pl(Dj(a), !0),
      c;
    b ? (c = vm(rm, b).j) : (c = {});
    return c;
  }
  function wm(a, b) {
    var c = pl(Dj(a), !0);
    if (c) {
      var d = rm,
        e = h(b, null);
      h(vm(d, c).j, e);
      vm(d, c).j = e;
    }
  }
  var xm = function () {
      this.P = {};
      this.j = {};
      this.D = {};
      this.Z = null;
      this.K = {};
      this.H = !1;
      this.status = 1;
    },
    ym = function (a, b, c, d) {
      this.D = Cb();
      this.j = b;
      this.args = c;
      this.messageContext = d;
      this.type = a;
    },
    zm = function () {
      this.destinations = {};
      this.D = {};
      this.j = [];
    },
    vm = function (a, b) {
      var c = b.ia;
      return (a.destinations[c] = a.destinations[c] || new xm());
    },
    Am = function (a, b, c, d) {
      if (d.j) {
        var e = vm(a, d.j),
          f = e.Z;
        if (f) {
          var g = h(c, null),
            k = h(e.P[d.j.id], null),
            m = h(e.K, null),
            n = h(e.j, null),
            p = h(a.D, null),
            q = {};
          if (mj)
            try {
              q = h(Di);
            } catch (v) {
              O(72);
            }
          var r = d.j.prefix,
            t = function (v) {
              om(d.messageContext.eventId, r, v);
            },
            u = Xl(
              Wl(
                Vl(
                  Ul(
                    Tl(
                      Rl(
                        Ql(
                          Sl(
                            Pl(
                              Ol(
                                Nl(
                                  new Ml(
                                    d.messageContext.eventId,
                                    d.messageContext.priorityId
                                  ),
                                  g
                                ),
                                k
                              ),
                              m
                            ),
                            n
                          ),
                          p
                        ),
                        q
                      ),
                      d.messageContext.eventMetadata
                    ),
                    function () {
                      if (t) {
                        var v = t;
                        t = void 0;
                        v("2");
                        if (d.messageContext.onSuccess)
                          d.messageContext.onSuccess();
                      }
                    }
                  ),
                  function () {
                    if (t) {
                      var v = t;
                      t = void 0;
                      v("3");
                      if (d.messageContext.onFailure)
                        d.messageContext.onFailure();
                    }
                  }
                ),
                !!d.messageContext.isGtmEvent
              )
            );
          try {
            om(d.messageContext.eventId, r, "1"),
              Dl(d.type, d.j.id, u),
              f(d.j.id, b, d.D, u);
          } catch (v) {
            om(d.messageContext.eventId, r, "4");
          }
        }
      }
    };
  zm.prototype.register = function (a, b, c) {
    var d = vm(this, a);
    d.status !== 3 &&
      ((d.Z = b), (d.status = 3), c && (h(d.j, c), (d.j = c)), this.flush());
  };
  zm.prototype.push = function (a, b, c, d) {
    c !== void 0 &&
      (vm(this, c).status === 1 &&
        ((vm(this, c).status = 2), this.push("require", [{}], c, {})),
      vm(this, c).H && (d.deferrable = !1));
    this.j.push(new ym(a, c, b, d));
    d.deferrable || this.flush();
  };
  zm.prototype.flush = function (a) {
    for (
      var b = this, c = [], d = !1, e = {};
      this.j.length;
      e = { Ec: void 0, qh: void 0 }
    ) {
      var f = this.j[0],
        g = f.j;
      if (f.messageContext.deferrable)
        !g || vm(this, g).H
          ? ((f.messageContext.deferrable = !1), this.j.push(f))
          : c.push(f),
          this.j.shift();
      else {
        switch (f.type) {
          case "require":
            if (vm(this, g).status !== 3 && !a) {
              this.j.push.apply(this.j, c);
              return;
            }
            break;
          case "set":
            z(f.args[0], function (r, t) {
              h(Kb(r, t), b.D);
            });
            break;
          case "config":
            var k = vm(this, g);
            e.Ec = {};
            z(
              f.args[0],
              (function (r) {
                return function (t, u) {
                  h(Kb(t, u), r.Ec);
                };
              })(e)
            );
            var m = !!e.Ec[P.g.bc];
            delete e.Ec[P.g.bc];
            var n = g.ia === g.id;
            m || (n ? (k.K = {}) : (k.P[g.id] = {}));
            (k.H && m) || Am(this, P.g.ba, e.Ec, f);
            k.H = !0;
            n ? h(e.Ec, k.K) : (h(e.Ec, k.P[g.id]), O(70));
            d = !0;
            break;
          case "event":
            e.qh = {};
            z(
              f.args[0],
              (function (r) {
                return function (t, u) {
                  h(Kb(t, u), r.qh);
                };
              })(e)
            );
            Am(this, f.args[1], e.qh, f);
            break;
          case "get":
            var p = {},
              q = ((p[P.g.tb] = f.args[0]), (p[P.g.Ib] = f.args[1]), p);
            Am(this, P.g.Ua, q, f);
        }
        this.j.shift();
        Bm(this, f);
      }
    }
    this.j.push.apply(this.j, c);
    d && this.flush();
  };
  var Bm = function (a, b) {
      if (b.type !== "require")
        if (b.j)
          for (var c = vm(a, b.j).D[b.type] || [], d = 0; d < c.length; d++)
            c[d]();
        else
          for (var e in a.destinations)
            if (a.destinations.hasOwnProperty(e)) {
              var f = a.destinations[e];
              if (f && f.D)
                for (var g = f.D[b.type] || [], k = 0; k < g.length; k++)
                  g[k]();
            }
    },
    rm = new zm();
  var Cm = function (a, b) {
      var c = function () {};
      c.prototype = a.prototype;
      var d = new c();
      a.apply(d, Array.prototype.slice.call(arguments, 1));
      return d;
    },
    Dm = function (a) {
      var b = a;
      return function () {
        if (b) {
          var c = b;
          b = null;
          c();
        }
      };
    };
  var Em = function (a, b, c) {
      a.addEventListener && a.addEventListener(b, c, !1);
    },
    Fm = function (a, b, c) {
      a.removeEventListener && a.removeEventListener(b, c, !1);
    };
  var Gm, Hm;
  a: {
    for (var Im = ["CLOSURE_FLAGS"], Jm = Aa, Km = 0; Km < Im.length; Km++)
      if (((Jm = Jm[Im[Km]]), Jm == null)) {
        Hm = null;
        break a;
      }
    Hm = Jm;
  }
  var Lm = Hm && Hm[610401301];
  Gm = Lm != null ? Lm : !1;
  function Mm() {
    var a = Aa.navigator;
    if (a) {
      var b = a.userAgent;
      if (b) return b;
    }
    return "";
  }
  var Nm,
    Om = Aa.navigator;
  Nm = Om ? Om.userAgentData || null : null;
  function Pm(a) {
    return Gm
      ? Nm
        ? Nm.brands.some(function (b) {
            var c;
            return (c = b.brand) && c.indexOf(a) != -1;
          })
        : !1
      : !1;
  }
  function Qm(a) {
    return Mm().indexOf(a) != -1;
  }
  function Rm() {
    return Gm ? !!Nm && Nm.brands.length > 0 : !1;
  }
  function Sm() {
    return Rm() ? !1 : Qm("Opera");
  }
  function Tm() {
    return Qm("Firefox") || Qm("FxiOS");
  }
  function Um() {
    return Rm()
      ? Pm("Chromium")
      : ((Qm("Chrome") || Qm("CriOS")) && !(Rm() ? 0 : Qm("Edge"))) ||
          Qm("Silk");
  }
  function Vm() {
    return Gm ? !!Nm && !!Nm.platform : !1;
  }
  function Wm() {
    return Qm("iPhone") && !Qm("iPod") && !Qm("iPad");
  }
  function Xm() {
    Wm() || Qm("iPad") || Qm("iPod");
  }
  Sm();
  Rm() || Qm("Trident") || Qm("MSIE");
  Qm("Edge");
  !Qm("Gecko") ||
    (Mm().toLowerCase().indexOf("webkit") != -1 && !Qm("Edge")) ||
    Qm("Trident") ||
    Qm("MSIE") ||
    Qm("Edge");
  Mm().toLowerCase().indexOf("webkit") != -1 && !Qm("Edge") && Qm("Mobile");
  Vm() || Qm("Macintosh");
  Vm() || Qm("Windows");
  (Vm() ? Nm.platform === "Linux" : Qm("Linux")) || Vm() || Qm("CrOS");
  Vm() || Qm("Android");
  Wm();
  Qm("iPad");
  Qm("iPod");
  Xm();
  Mm().toLowerCase().indexOf("kaios");
  var Ym = function (a, b, c, d) {
      for (var e = b, f = c.length; (e = a.indexOf(c, e)) >= 0 && e < d; ) {
        var g = a.charCodeAt(e - 1);
        if (g == 38 || g == 63) {
          var k = a.charCodeAt(e + f);
          if (!k || k == 61 || k == 38 || k == 35) return e;
        }
        e += f + 1;
      }
      return -1;
    },
    Zm = /#|$/,
    $m = function (a, b) {
      var c = a.search(Zm),
        d = Ym(a, 0, b, c);
      if (d < 0) return null;
      var e = a.indexOf("&", d);
      if (e < 0 || e > c) e = c;
      d += b.length + 1;
      return decodeURIComponent(
        a.slice(d, e !== -1 ? e : 0).replace(/\+/g, " ")
      );
    },
    an = /[?&]($|#)/,
    bn = function (a, b, c) {
      for (
        var d, e = a.search(Zm), f = 0, g, k = [];
        (g = Ym(a, f, b, e)) >= 0;

      )
        k.push(a.substring(f, g)),
          (f = Math.min(a.indexOf("&", g) + 1 || e, e));
      k.push(a.slice(f));
      d = k.join("").replace(an, "$1");
      var m,
        n = c != null ? "=" + encodeURIComponent(String(c)) : "";
      var p = b + n;
      if (p) {
        var q,
          r = d.indexOf("#");
        r < 0 && (r = d.length);
        var t = d.indexOf("?"),
          u;
        t < 0 || t > r ? ((t = r), (u = "")) : (u = d.substring(t + 1, r));
        q = [d.slice(0, t), u, d.slice(r)];
        var v = q[1];
        q[1] = p ? (v ? v + "&" + p : p) : v;
        m = q[0] + (q[1] ? "?" + q[1] : "") + q[2];
      } else m = d;
      return m;
    };
  var cn = function (a) {
      try {
        var b;
        if ((b = !!a && a.location.href != null))
          a: {
            try {
              vk(a.foo);
              b = !0;
              break a;
            } catch (c) {}
            b = !1;
          }
        return b;
      } catch (c) {
        return !1;
      }
    },
    dn = function (a, b) {
      if (a)
        for (var c in a)
          Object.prototype.hasOwnProperty.call(a, c) && b(a[c], c, a);
    },
    en = function (a) {
      if (G.top == G) return 0;
      if (a === void 0 ? 0 : a) {
        var b = G.location.ancestorOrigins;
        if (b) return b[b.length - 1] == G.location.origin ? 1 : 2;
      }
      return cn(G.top) ? 1 : 2;
    },
    fn = function (a) {
      a = a === void 0 ? document : a;
      return a.createElement("img");
    };
  function gn(a, b, c, d) {
    d = d === void 0 ? !1 : d;
    a.google_image_requests || (a.google_image_requests = []);
    var e = fn(a.document);
    if (c) {
      var f = function () {
        if (c) {
          var g = a.google_image_requests,
            k = kc(g, e);
          k >= 0 && Array.prototype.splice.call(g, k, 1);
        }
        Fm(e, "load", f);
        Fm(e, "error", f);
      };
      Em(e, "load", f);
      Em(e, "error", f);
    }
    d && (e.attributionSrc = "");
    e.src = b;
    a.google_image_requests.push(e);
  }
  var jn = function (a) {
      var b;
      b = b === void 0 ? !1 : b;
      var c = "https://pagead2.googlesyndication.com/pagead/gen_204?id=tcfe";
      dn(a, function (d, e) {
        if (d || d === 0) c += "&" + e + "=" + encodeURIComponent("" + d);
      });
      hn(c, b);
    },
    hn = function (a, b) {
      var c = window,
        d;
      b = b === void 0 ? !1 : b;
      d = d === void 0 ? !1 : d;
      if (c.fetch) {
        var e = {
          keepalive: !0,
          credentials: "include",
          redirect: "follow",
          method: "get",
          mode: "no-cors",
        };
        d &&
          ((e.mode = "cors"),
          "setAttributionReporting" in XMLHttpRequest.prototype
            ? (e.attributionReporting = {
                eventSourceEligible: "true",
                triggerEligible: "false",
              })
            : (e.headers = {
                "Attribution-Reporting-Eligible": "event-source",
              }));
        c.fetch(a, e);
      } else gn(c, a, b === void 0 ? !1 : b, d === void 0 ? !1 : d);
    };
  var kn = function () {
    this.P = this.P;
    this.D = this.D;
  };
  kn.prototype.P = !1;
  kn.prototype.dispose = function () {
    this.P || ((this.P = !0), this.Ra());
  };
  kn.prototype[Symbol.dispose] = function () {
    this.dispose();
  };
  kn.prototype.addOnDisposeCallback = function (a, b) {
    this.P
      ? b !== void 0
        ? a.call(b)
        : a()
      : (this.D || (this.D = []), b && (a = a.bind(b)), this.D.push(a));
  };
  kn.prototype.Ra = function () {
    if (this.D) for (; this.D.length; ) this.D.shift()();
  };
  var ln = function (a) {
      a.addtlConsent !== void 0 &&
        typeof a.addtlConsent !== "string" &&
        (a.addtlConsent = void 0);
      a.gdprApplies !== void 0 &&
        typeof a.gdprApplies !== "boolean" &&
        (a.gdprApplies = void 0);
      return (a.tcString !== void 0 && typeof a.tcString !== "string") ||
        (a.listenerId !== void 0 && typeof a.listenerId !== "number")
        ? 2
        : a.cmpStatus && a.cmpStatus !== "error"
        ? 0
        : 3;
    },
    mn = function (a, b) {
      b = b === void 0 ? {} : b;
      kn.call(this);
      this.H = a;
      this.j = null;
      this.Z = {};
      this.nd = 0;
      var c;
      this.fc = (c = b.jn) != null ? c : 500;
      var d;
      this.fb = (d = b.Mn) != null ? d : !1;
      this.K = null;
    };
  xa(mn, kn);
  mn.prototype.Ra = function () {
    this.Z = {};
    this.K && (Fm(this.H, "message", this.K), delete this.K);
    delete this.Z;
    delete this.H;
    delete this.j;
    kn.prototype.Ra.call(this);
  };
  var on = function (a) {
    return typeof a.H.__tcfapi === "function" || nn(a) != null;
  };
  mn.prototype.addEventListener = function (a) {
    var b = this,
      c = { internalBlockOnErrors: this.fb },
      d = Dm(function () {
        return a(c);
      }),
      e = 0;
    this.fc !== -1 &&
      (e = setTimeout(function () {
        c.tcString = "tcunavailable";
        c.internalErrorState = 1;
        d();
      }, this.fc));
    var f = function (g, k) {
      clearTimeout(e);
      g
        ? ((c = g),
          (c.internalErrorState = ln(c)),
          (c.internalBlockOnErrors = b.fb),
          (k && c.internalErrorState === 0) ||
            ((c.tcString = "tcunavailable"), k || (c.internalErrorState = 3)))
        : ((c.tcString = "tcunavailable"), (c.internalErrorState = 3));
      a(c);
    };
    try {
      pn(this, "addEventListener", f);
    } catch (g) {
      (c.tcString = "tcunavailable"),
        (c.internalErrorState = 3),
        e && (clearTimeout(e), (e = 0)),
        d();
    }
  };
  mn.prototype.removeEventListener = function (a) {
    a && a.listenerId && pn(this, "removeEventListener", null, a.listenerId);
  };
  var rn = function (a, b, c) {
      var d;
      d = d === void 0 ? "755" : d;
      var e;
      a: {
        if (a.publisher && a.publisher.restrictions) {
          var f = a.publisher.restrictions[b];
          if (f !== void 0) {
            e = f[d === void 0 ? "755" : d];
            break a;
          }
        }
        e = void 0;
      }
      var g = e;
      if (g === 0) return !1;
      var k = c;
      c === 2
        ? ((k = 0), g === 2 && (k = 1))
        : c === 3 && ((k = 1), g === 1 && (k = 0));
      var m;
      if (k === 0)
        if (a.purpose && a.vendor) {
          var n = qn(a.vendor.consents, d === void 0 ? "755" : d);
          m =
            n && b === "1" && a.purposeOneTreatment && a.publisherCC === "CH"
              ? !0
              : n && qn(a.purpose.consents, b);
        } else m = !0;
      else
        m =
          k === 1
            ? a.purpose && a.vendor
              ? qn(a.purpose.legitimateInterests, b) &&
                qn(a.vendor.legitimateInterests, d === void 0 ? "755" : d)
              : !0
            : !0;
      return m;
    },
    qn = function (a, b) {
      return !(!a || !a[b]);
    },
    pn = function (a, b, c, d) {
      c || (c = function () {});
      if (typeof a.H.__tcfapi === "function") {
        var e = a.H.__tcfapi;
        e(b, 2, c, d);
      } else if (nn(a)) {
        sn(a);
        var f = ++a.nd;
        a.Z[f] = c;
        if (a.j) {
          var g = {};
          a.j.postMessage(
            ((g.__tcfapiCall = {
              command: b,
              version: 2,
              callId: f,
              parameter: d,
            }),
            g),
            "*"
          );
        }
      } else c({}, !1);
    },
    nn = function (a) {
      if (a.j) return a.j;
      var b;
      a: {
        for (var c = a.H, d = 0; d < 50; ++d) {
          var e;
          try {
            e = !(!c.frames || !c.frames.__tcfapiLocator);
          } catch (k) {
            e = !1;
          }
          if (e) {
            b = c;
            break a;
          }
          var f;
          b: {
            try {
              var g = c.parent;
              if (g && g != c) {
                f = g;
                break b;
              }
            } catch (k) {}
            f = null;
          }
          if (!(c = f)) break;
        }
        b = null;
      }
      a.j = b;
      return a.j;
    },
    sn = function (a) {
      a.K ||
        ((a.K = function (b) {
          try {
            var c;
            c = (typeof b.data === "string" ? JSON.parse(b.data) : b.data)
              .__tcfapiReturn;
            a.Z[c.callId](c.returnValue, c.success);
          } catch (d) {}
        }),
        Em(a.H, "message", a.K));
    },
    tn = function (a) {
      if (a.gdprApplies === !1) return !0;
      a.internalErrorState === void 0 && (a.internalErrorState = ln(a));
      return a.cmpStatus === "error" || a.internalErrorState !== 0
        ? a.internalBlockOnErrors
          ? (jn({ e: String(a.internalErrorState) }), !1)
          : !0
        : a.cmpStatus !== "loaded" ||
          (a.eventStatus !== "tcloaded" &&
            a.eventStatus !== "useractioncomplete")
        ? !1
        : !0;
    };
  var un = { 1: 0, 3: 0, 4: 0, 7: 3, 9: 3, 10: 3 };
  function vn() {
    var a = hi.tcf || {};
    return (hi.tcf = a);
  }
  var wn = function () {
    return new mn(G, { jn: -1 });
  };
  function xn() {
    var a = vn(),
      b = wn();
    on(b) && !yn() && !zn() && O(124);
    if (!a.active && on(b)) {
      yn() &&
        ((a.active = !0),
        (a.kc = {}),
        (a.cmpId = 0),
        (a.tcfPolicyVersion = 0),
        (rk().active = !0),
        (a.tcString = "tcunavailable"));
      jl();
      try {
        b.addEventListener(function (c) {
          if (c.internalErrorState !== 0)
            An(a), kl([P.g.R, P.g.ya, P.g.O]), (rk().active = !0);
          else if (
            ((a.gdprApplies = c.gdprApplies),
            (a.cmpId = c.cmpId),
            (a.enableAdvertiserConsentMode = c.enableAdvertiserConsentMode),
            zn() && (a.active = !0),
            !Bn(c) || yn() || zn())
          ) {
            a.tcfPolicyVersion = c.tcfPolicyVersion;
            var d;
            if (c.gdprApplies === !1) {
              var e = {},
                f;
              for (f in un) un.hasOwnProperty(f) && (e[f] = !0);
              d = e;
              b.removeEventListener(c);
            } else if (Bn(c)) {
              var g = {},
                k;
              for (k in un)
                if (un.hasOwnProperty(k))
                  if (k === "1") {
                    var m,
                      n = c,
                      p = { Nl: !0 };
                    p = p === void 0 ? {} : p;
                    m = tn(n)
                      ? n.gdprApplies === !1
                        ? !0
                        : n.tcString === "tcunavailable"
                        ? !p.Uj
                        : (p.Uj || n.gdprApplies !== void 0 || p.Nl) &&
                          (p.Uj ||
                            (typeof n.tcString === "string" &&
                              n.tcString.length))
                        ? rn(n, "1", 0)
                        : !0
                      : !1;
                    g["1"] = m;
                  } else g[k] = rn(c, k, un[k]);
              d = g;
            }
            if (d) {
              a.tcString = c.tcString || "tcempty";
              a.kc = d;
              var q = {},
                r = ((q[P.g.R] = a.kc["1"] ? "granted" : "denied"), q);
              a.gdprApplies !== !0
                ? (kl([P.g.R, P.g.ya, P.g.O]), (rk().active = !0))
                : ((r[P.g.ya] = a.kc["3"] && a.kc["4"] ? "granted" : "denied"),
                  typeof a.tcfPolicyVersion === "number" &&
                  a.tcfPolicyVersion >= 4
                    ? (r[P.g.O] = a.kc["1"] && a.kc["7"] ? "granted" : "denied")
                    : kl([P.g.O]),
                  el(
                    r,
                    { eventId: 0 },
                    {
                      gdprApplies: a ? a.gdprApplies : void 0,
                      tcString: Cn() || "",
                    }
                  ));
            }
          } else kl([P.g.R, P.g.ya, P.g.O]);
        });
      } catch (c) {
        An(a), kl([P.g.R, P.g.ya, P.g.O]), (rk().active = !0);
      }
    }
  }
  function An(a) {
    a.type = "e";
    a.tcString = "tcunavailable";
  }
  function Bn(a) {
    return (
      a.eventStatus === "tcloaded" ||
      a.eventStatus === "useractioncomplete" ||
      a.eventStatus === "cmpuishown"
    );
  }
  function yn() {
    return G.gtag_enable_tcf_support === !0;
  }
  function zn() {
    return vn().enableAdvertiserConsentMode === !0;
  }
  function Cn() {
    var a = vn();
    if (a.active) return a.tcString;
  }
  function Dn() {
    var a = vn();
    if (a.active && a.gdprApplies !== void 0) return a.gdprApplies ? "1" : "0";
  }
  function En(a) {
    if (!un.hasOwnProperty(String(a))) return !0;
    var b = vn();
    return b.active && b.kc ? !!b.kc[String(a)] : !0;
  }
  var Fn = [P.g.R, P.g.U, P.g.O, P.g.ya],
    Gn = {},
    Hn = ((Gn[P.g.R] = 1), (Gn[P.g.U] = 2), Gn);
  function In(a) {
    if (a === void 0) return 0;
    switch (Q(a, P.g.ka)) {
      case void 0:
        return 1;
      case !1:
        return 3;
      default:
        return 2;
    }
  }
  function Jn(a) {
    if (Tk() === "US-CO" && qc.globalPrivacyControl === !0) return !1;
    var b = In(a);
    if (b === 3) return !1;
    switch (Dk(P.g.ya)) {
      case 1:
      case 3:
        return !0;
      case 2:
        return !1;
      case 4:
        return b === 2;
      case 0:
        return !0;
      default:
        return !1;
    }
  }
  function Kn() {
    return Gk() || !Ck(P.g.R) || !Ck(P.g.U);
  }
  function Ln() {
    var a = {},
      b;
    for (b in Hn) Hn.hasOwnProperty(b) && (a[Hn[b]] = Dk(b));
    return "G1" + He(a[1] || 0) + He(a[2] || 0);
  }
  var Mn = {},
    Nn =
      ((Mn[P.g.R] = 0), (Mn[P.g.U] = 1), (Mn[P.g.O] = 2), (Mn[P.g.ya] = 3), Mn);
  function On(a) {
    switch (a) {
      case void 0:
        return 1;
      case !0:
        return 3;
      case !1:
        return 2;
      default:
        return 0;
    }
  }
  function Pn(a) {
    for (var b = "1", c = 0; c < Fn.length; c++) {
      var d = b,
        e,
        f = Fn[c],
        g = Bk.delegatedConsentTypes[f];
      e = g === void 0 ? 0 : Nn.hasOwnProperty(g) ? 12 | Nn[g] : 8;
      var k = rk();
      k.accessedAny = !0;
      var m = k.entries[f] || {};
      e = (e << 2) | On(m.implicit);
      b =
        d +
        ("" +
          "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"[
            e
          ] +
          "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"[
            (On(m.declare) << 4) | (On(m.default) << 2) | On(m.update)
          ]);
    }
    var n = b,
      p = (Tk() === "US-CO" && qc.globalPrivacyControl === !0 ? 1 : 0) << 3,
      q = (Gk() ? 1 : 0) << 2,
      r = In(a);
    b =
      n +
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"[
        p | q | r
      ];
    U(88) &&
      (b +=
        "" +
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"[
          (Bk.containerScopedDefaults.ad_storage << 4) |
            (Bk.containerScopedDefaults.analytics_storage << 2) |
            Bk.containerScopedDefaults.ad_user_data
        ] +
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"[
          ((nb(8) && Bk.usedContainerScopedDefaults ? 1 : 0) << 2) |
            Bk.containerScopedDefaults.ad_personalization
        ]);
    return b;
  }
  function Qn() {
    if (!Ck(P.g.O)) return "-";
    for (
      var a = Object.keys(fi), b = Ek(a), c = "", d = ma(a), e = d.next();
      !e.done;
      e = d.next()
    ) {
      var f = e.value;
      b[f] && (c += fi[f]);
    }
    (Bk.usedCorePlatformServices ? Bk.selectedAllCorePlatformServices : 1) &&
      (c += "o");
    return c || "-";
  }
  function Rn() {
    return Vk() || ((yn() || zn()) && Dn() === "1") ? "1" : "0";
  }
  function Yn() {
    return (Vk() ? !0 : !(!yn() && !zn()) && Dn() === "1") || !Ck(P.g.O);
  }
  function Zn() {
    var a = "0",
      b = "0",
      c;
    var d = vn();
    c = d.active ? d.cmpId : void 0;
    typeof c === "number" &&
      c >= 0 &&
      c <= 4095 &&
      ((a = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"[
        (c >> 6) & 63
      ]),
      (b = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"[
        c & 63
      ]));
    var e = "0",
      f;
    var g = vn();
    f = g.active ? g.tcfPolicyVersion : void 0;
    typeof f === "number" &&
      f >= 0 &&
      f <= 63 &&
      (e = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"[
        f
      ]);
    var k = 0;
    Vk() && (k |= 1);
    Dn() === "1" && (k |= 2);
    yn() && (k |= 4);
    var m;
    var n = vn();
    m =
      n.enableAdvertiserConsentMode !== void 0
        ? n.enableAdvertiserConsentMode
          ? "1"
          : "0"
        : void 0;
    m === "1" && (k |= 8);
    rk().waitPeriodTimedOut && (k |= 16);
    return (
      "1" +
      a +
      b +
      e +
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"[k]
    );
  }
  function $n() {
    return Tk() === "US-CO";
  }
  function ao() {
    var a = !1;
    return a;
  }
  var bo = { UA: 1, AW: 2, DC: 3, G: 4, GF: 5, GT: 12, GTM: 14, HA: 6, MC: 7 };
  function co(a) {
    a = a === void 0 ? {} : a;
    var b = Qf.ctid.split("-")[0].toUpperCase(),
      c = {};
    c.ctid = Qf.ctid;
    c.Om = gi.se;
    c.Sm = gi.Vg;
    c.qm = vj.oe ? 2 : 1;
    c.Zm = a.lk;
    c.ze = Qf.canonicalContainerId;
    c.ze !== a.xa && (c.xa = a.xa);
    var d = Fj();
    c.Em = d ? d.canonicalContainerId : void 0;
    mi ? ((c.Uf = bo[b]), c.Uf || (c.Uf = 0)) : (c.Uf = qi ? 13 : 10);
    zi.H
      ? ((c.Sf = 0), (c.tl = 2))
      : oi
      ? (c.Sf = 1)
      : ao()
      ? (c.Sf = 2)
      : (c.Sf = 3);
    var e = {};
    e[6] = wj;
    zi.P === 2 ? (e[7] = !0) : zi.P === 1 && (e[2] = !0);
    c.xl = e;
    var f = a.Lf,
      g;
    var k = c.Uf,
      m = c.Sf;
    k === void 0
      ? (g = "")
      : (m || (m = 0), (g = "" + Je(1, 1) + Ge((k << 2) | m)));
    var n = c.tl,
      p = "4" + g + (n ? "" + Je(2, 1) + Ge(n) : ""),
      q,
      r = c.Sm;
    q = r && Ie.test(r) ? "" + Je(3, 2) + r : "";
    var t,
      u = c.Om;
    t = u ? "" + Je(4, 1) + Ge(u) : "";
    var v;
    var w = c.ctid;
    if (w && f) {
      var x = w.split("-"),
        y = x[0].toUpperCase();
      if (y !== "GTM" && y !== "OPT") v = "";
      else {
        var B = x[1];
        v = "" + Je(5, 3) + Ge(1 + B.length) + (c.qm || 0) + B;
      }
    } else v = "";
    var A = c.Zm,
      C = c.ze,
      E = c.xa,
      D = c.Wn,
      F =
        p +
        q +
        t +
        v +
        (A ? "" + Je(6, 1) + Ge(A) : "") +
        (C ? "" + Je(7, 3) + Ge(C.length) + C : "") +
        (E ? "" + Je(8, 3) + Ge(E.length) + E : "") +
        (D ? "" + Je(9, 3) + Ge(D.length) + D : ""),
      L;
    var M = c.xl;
    M = M === void 0 ? {} : M;
    for (
      var R = [], V = ma(Object.keys(M)), aa = V.next();
      !aa.done;
      aa = V.next()
    ) {
      var X = aa.value;
      R[Number(X)] = M[X];
    }
    if (R.length) {
      var S = Je(10, 3),
        na;
      if (R.length === 0) na = Ge(0);
      else {
        for (var la = [], ha = 0, ya = !1, Na = 0; Na < R.length; Na++) {
          ya = !0;
          var Ga = Na % 6;
          R[Na] && (ha |= 1 << Ga);
          Ga === 5 && (la.push(Ge(ha)), (ha = 0), (ya = !1));
        }
        ya && la.push(Ge(ha));
        na = la.join("");
      }
      var Sa = na;
      L = "" + S + Ge(Sa.length) + Sa;
    } else L = "";
    var cb = c.Em;
    return F + L + (cb ? "" + Je(11, 3) + Ge(cb.length) + cb : "");
  }
  var eo = {
      Cj: "service_worker_endpoint",
      Wg: "shared_user_id",
      Xg: "shared_user_id_requested",
      ue: "shared_user_id_source",
    },
    fo;
  function go(a) {
    if (!fo) {
      fo = {};
      for (var b = ma(Object.keys(eo)), c = b.next(); !c.done; c = b.next())
        fo[eo[c.value]] = !0;
    }
    return !!fo[a];
  }
  function ho(a, b) {
    b = b === void 0 ? !1 : b;
    if (go(a)) {
      var c,
        d,
        e =
          (d = (c = uc("google_tag_data", {})).xcd) != null ? d : (c.xcd = {});
      if (e[a]) return e[a];
      if (b) {
        var f = void 0,
          g = 1,
          k = {},
          m = {
            set: function (n) {
              f = n;
              m.notify();
            },
            get: function () {
              return f;
            },
            subscribe: function (n) {
              k[String(g)] = n;
              return g++;
            },
            unsubscribe: function (n) {
              var p = String(n);
              return k.hasOwnProperty(p) ? (delete k[p], !0) : !1;
            },
            notify: function () {
              for (
                var n = ma(Object.keys(k)), p = n.next();
                !p.done;
                p = n.next()
              ) {
                var q = p.value;
                try {
                  k[q](a, f);
                } catch (r) {}
              }
            },
          };
        return (e[a] = m);
      }
    }
  }
  function io(a, b) {
    var c = ho(a, !0);
    c && c.set(b);
  }
  function jo(a) {
    var b;
    return (b = ho(a)) == null ? void 0 : b.get();
  }
  function ko(a, b) {
    if (typeof b === "function") {
      var c;
      return (c = ho(a, !0)) == null ? void 0 : c.subscribe(b);
    }
  }
  function lo(a, b) {
    var c = ho(a);
    return c ? c.unsubscribe(b) : !1;
  }
  function mo(a) {
    return a.origin !== "null";
  }
  function no(a, b, c, d) {
    var e;
    if (oo(d)) {
      for (
        var f = [], g = String(b || po()).split(";"), k = 0;
        k < g.length;
        k++
      ) {
        var m = g[k].split("="),
          n = m[0].replace(/^\s*|\s*$/g, "");
        if (n && n === a) {
          var p = m
            .slice(1)
            .join("=")
            .replace(/^\s*|\s*$/g, "");
          p && c && (p = decodeURIComponent(p));
          f.push(p);
        }
      }
      e = f;
    } else e = [];
    return e;
  }
  function qo(a, b, c, d, e) {
    if (oo(e)) {
      var f = ro(a, d, e);
      if (f.length === 1) return f[0].id;
      if (f.length !== 0) {
        f = so(
          f,
          function (g) {
            return g.Dl;
          },
          b
        );
        if (f.length === 1) return f[0].id;
        f = so(
          f,
          function (g) {
            return g.Gm;
          },
          c
        );
        return f[0] ? f[0].id : void 0;
      }
    }
  }
  function to(a, b, c, d) {
    var e = po(),
      f = window;
    mo(f) && (f.document.cookie = a);
    var g = po();
    return e !== g || (c !== void 0 && no(b, g, !1, d).indexOf(c) >= 0);
  }
  function uo(a, b, c, d) {
    function e(w, x, y) {
      if (y == null) return delete k[x], w;
      k[x] = y;
      return w + "; " + x + "=" + y;
    }
    function f(w, x) {
      if (x == null) return w;
      k[x] = !0;
      return w + "; " + x;
    }
    if (!oo(c.Cb)) return 2;
    var g;
    b == null
      ? (g = a + "=deleted; expires=" + new Date(0).toUTCString())
      : (c.encode && (b = encodeURIComponent(b)),
        (b = vo(b)),
        (g = a + "=" + b));
    var k = {};
    g = e(g, "path", c.path);
    var m;
    c.expires instanceof Date
      ? (m = c.expires.toUTCString())
      : c.expires != null && (m = "" + c.expires);
    g = e(g, "expires", m);
    g = e(g, "max-age", c.xm);
    g = e(g, "samesite", c.Tm);
    c.Um && (g = f(g, "secure"));
    var n = c.domain;
    if (n && n.toLowerCase() === "auto") {
      for (var p = wo(), q = void 0, r = !1, t = 0; t < p.length; ++t) {
        var u = p[t] !== "none" ? p[t] : void 0,
          v = e(g, "domain", u);
        v = f(v, c.flags);
        try {
          d && d(a, k);
        } catch (w) {
          q = w;
          continue;
        }
        r = !0;
        if (!xo(u, c.path) && to(v, a, b, c.Cb)) return 0;
      }
      if (q && !r) throw q;
      return 1;
    }
    n && n.toLowerCase() !== "none" && (g = e(g, "domain", n));
    g = f(g, c.flags);
    d && d(a, k);
    return xo(n, c.path) ? 1 : to(g, a, b, c.Cb) ? 0 : 1;
  }
  function yo(a, b, c) {
    c.path == null && (c.path = "/");
    c.domain || (c.domain = "auto");
    return uo(a, b, c);
  }
  function so(a, b, c) {
    for (var d = [], e = [], f, g = 0; g < a.length; g++) {
      var k = a[g],
        m = b(k);
      m === c
        ? d.push(k)
        : f === void 0 || m < f
        ? ((e = [k]), (f = m))
        : m === f && e.push(k);
    }
    return d.length > 0 ? d : e;
  }
  function ro(a, b, c) {
    for (var d = [], e = no(a, void 0, void 0, c), f = 0; f < e.length; f++) {
      var g = e[f].split("."),
        k = g.shift();
      if (!b || !k || b.indexOf(k) !== -1) {
        var m = g.shift();
        if (m) {
          var n = m.split("-");
          d.push({
            id: g.join("."),
            Dl: Number(n[0]) || 1,
            Gm: Number(n[1]) || 1,
          });
        }
      }
    }
    return d;
  }
  function vo(a) {
    a && a.length > 1200 && (a = a.substring(0, 1200));
    return a;
  }
  var zo = /^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,
    Ao = /(^|\.)doubleclick\.net$/i;
  function xo(a, b) {
    return (
      a !== void 0 &&
      (Ao.test(window.document.location.hostname) || (b === "/" && zo.test(a)))
    );
  }
  function Bo(a) {
    if (!a) return 1;
    var b = a;
    nb(11) && a === "none" && (b = window.document.location.hostname);
    b = b.indexOf(".") === 0 ? b.substring(1) : b;
    return b.split(".").length;
  }
  function Co(a) {
    if (!a || a === "/") return 1;
    a[0] !== "/" && (a = "/" + a);
    a[a.length - 1] !== "/" && (a += "/");
    return a.split("/").length - 1;
  }
  function Do(a, b) {
    var c = "" + Bo(a),
      d = Co(b);
    d > 1 && (c += "-" + d);
    return c;
  }
  var po = function () {
      return mo(window) ? window.document.cookie : "";
    },
    oo = function (a) {
      return a && xk().j()
        ? (Array.isArray(a) ? a : [a]).every(function (b) {
            return Fk(b) && Ck(b);
          })
        : !0;
    },
    wo = function () {
      var a = [],
        b = window.document.location.hostname.split(".");
      if (b.length === 4) {
        var c = b[b.length - 1];
        if (Number(c).toString() === c) return ["none"];
      }
      for (var d = b.length - 2; d >= 0; d--) a.push(b.slice(d).join("."));
      var e = window.document.location.hostname;
      Ao.test(e) || zo.test(e) || a.push("none");
      return a;
    };
  function Eo(a) {
    var b = Math.round(Math.random() * 2147483647),
      c;
    if (a) {
      var d = 1,
        e,
        f,
        g;
      if (a)
        for (d = 0, f = a.length - 1; f >= 0; f--)
          (g = a.charCodeAt(f)),
            (d = ((d << 6) & 268435455) + g + (g << 14)),
            (e = d & 266338304),
            (d = e !== 0 ? d ^ (e >> 21) : d);
      c = String(b ^ (d & 2147483647));
    } else c = String(b);
    return c;
  }
  function Fo(a) {
    return [Eo(a), Math.round(Cb() / 1e3)].join(".");
  }
  function Go(a, b, c, d, e) {
    var f = Bo(b);
    return qo(a, f, Co(c), d, e);
  }
  function Ho(a, b, c, d) {
    return [b, Do(c, d), a].join(".");
  }
  function Io(a, b, c, d) {
    var e,
      f = Number(a.Bb != null ? a.Bb : void 0);
    f !== 0 && (e = new Date((b || Cb()) + 1e3 * (f || 7776e3)));
    return {
      path: a.path,
      domain: a.domain,
      flags: a.flags,
      encode: !!c,
      expires: e,
      Cb: d,
    };
  }
  var Jo;
  function Ko() {
    function a(g) {
      c(g.target || g.srcElement || {});
    }
    function b(g) {
      d(g.target || g.srcElement || {});
    }
    var c = Lo,
      d = Mo,
      e = No();
    if (!e.init) {
      Ec(H, "mousedown", a);
      Ec(H, "keyup", a);
      Ec(H, "submit", b);
      var f = HTMLFormElement.prototype.submit;
      HTMLFormElement.prototype.submit = function () {
        d(this);
        f.call(this);
      };
      e.init = !0;
    }
  }
  function Oo(a, b, c, d, e) {
    var f = {
      callback: a,
      domains: b,
      fragment: c === 2,
      placement: c,
      forms: d,
      sameHost: e,
    };
    No().decorators.push(f);
  }
  function Po(a, b, c) {
    for (var d = No().decorators, e = {}, f = 0; f < d.length; ++f) {
      var g = d[f],
        k;
      if ((k = !c || g.forms))
        a: {
          var m = g.domains,
            n = a,
            p = !!g.sameHost;
          if (m && (p || n !== H.location.hostname))
            for (var q = 0; q < m.length; q++)
              if (m[q] instanceof RegExp) {
                if (m[q].test(n)) {
                  k = !0;
                  break a;
                }
              } else if (n.indexOf(m[q]) >= 0 || (p && m[q].indexOf(n) >= 0)) {
                k = !0;
                break a;
              }
          k = !1;
        }
      if (k) {
        var r = g.placement;
        r === void 0 && (r = g.fragment ? 2 : 1);
        r === b && Fb(e, g.callback());
      }
    }
    return e;
  }
  function No() {
    var a = uc("google_tag_data", {}),
      b = a.gl;
    (b && b.decorators) || ((b = { decorators: [] }), (a.gl = b));
    return b;
  }
  var Qo = /(.*?)\*(.*?)\*(.*)/,
    Ro = /^https?:\/\/([^\/]*?)\.?cdn\.ampproject\.org\/?(.*)/,
    So = /^(?:www\.|m\.|amp\.)+/,
    To = /([^?#]+)(\?[^#]*)?(#.*)?/;
  function Uo(a) {
    var b = To.exec(a);
    if (b) return { Mh: b[1], query: b[2], fragment: b[3] };
  }
  function Vo(a, b) {
    var c = [
        qc.userAgent,
        new Date().getTimezoneOffset(),
        qc.userLanguage || qc.language,
        Math.floor(Cb() / 60 / 1e3) - (b === void 0 ? 0 : b),
        a,
      ].join("*"),
      d;
    if (!(d = Jo)) {
      for (var e = Array(256), f = 0; f < 256; f++) {
        for (var g = f, k = 0; k < 8; k++)
          g = g & 1 ? (g >>> 1) ^ 3988292384 : g >>> 1;
        e[f] = g;
      }
      d = e;
    }
    Jo = d;
    for (var m = 4294967295, n = 0; n < c.length; n++)
      m = (m >>> 8) ^ Jo[(m ^ c.charCodeAt(n)) & 255];
    return ((m ^ -1) >>> 0).toString(36);
  }
  function Wo() {
    return function (a) {
      var b = Yi(G.location.href),
        c = b.search.replace("?", ""),
        d = Ri(c, "_gl", !1, !0) || "";
      a.query = Xo(d) || {};
      var e = Si(b, "fragment"),
        f;
      var g = -1;
      if (Hb(e, "_gl=")) g = 4;
      else {
        var k = e.indexOf("&_gl=");
        k > 0 && (g = k + 3 + 2);
      }
      if (g < 0) f = void 0;
      else {
        var m = e.indexOf("&", g);
        f = m < 0 ? e.substring(g) : e.substring(g, m);
      }
      a.fragment = Xo(f || "") || {};
    };
  }
  function Yo(a) {
    var b = Wo(),
      c = No();
    c.data || ((c.data = { query: {}, fragment: {} }), b(c.data));
    var d = {},
      e = c.data;
    e && (Fb(d, e.query), a && Fb(d, e.fragment));
    return d;
  }
  var Xo = function (a) {
    try {
      var b = Zo(a, 3);
      if (b !== void 0) {
        for (
          var c = {}, d = b ? b.split("*") : [], e = 0;
          e + 1 < d.length;
          e += 2
        ) {
          var f = d[e],
            g = gb(d[e + 1]);
          c[f] = g;
        }
        ib("TAGGING", 6);
        return c;
      }
    } catch (k) {
      ib("TAGGING", 8);
    }
  };
  function Zo(a, b) {
    if (a) {
      var c;
      a: {
        for (var d = a, e = 0; e < 3; ++e) {
          var f = Qo.exec(d);
          if (f) {
            c = f;
            break a;
          }
          d = decodeURIComponent(d);
        }
        c = void 0;
      }
      var g = c;
      if (g && g[1] === "1") {
        var k = g[3],
          m;
        a: {
          for (var n = g[2], p = 0; p < b; ++p)
            if (n === Vo(k, p)) {
              m = !0;
              break a;
            }
          m = !1;
        }
        if (m) return k;
        ib("TAGGING", 7);
      }
    }
  }
  function $o(a, b, c, d, e) {
    function f(p) {
      var q = p,
        r = new RegExp("(.*?)(^|&)" + a + "=([^&]*)&?(.*)").exec(q),
        t = q;
      if (r) {
        var u = r[2],
          v = r[4];
        t = r[1];
        v && (t = t + u + v);
      }
      p = t;
      var w = p.charAt(p.length - 1);
      p && w !== "&" && (p += "&");
      return p + n;
    }
    d = d === void 0 ? !1 : d;
    e = e === void 0 ? !1 : e;
    var g = Uo(c);
    if (!g) return "";
    var k = g.query || "",
      m = g.fragment || "",
      n = a + "=" + b;
    d
      ? (m.substring(1).length !== 0 && e) || (m = "#" + f(m.substring(1)))
      : (k = "?" + f(k.substring(1)));
    return "" + g.Mh + k + m;
  }
  function ap(a, b) {
    function c(n, p, q) {
      var r;
      a: {
        for (var t in n)
          if (n.hasOwnProperty(t)) {
            r = !0;
            break a;
          }
        r = !1;
      }
      if (r) {
        var u,
          v = [],
          w;
        for (w in n)
          if (n.hasOwnProperty(w)) {
            var x = n[w];
            x !== void 0 &&
              x === x &&
              x !== null &&
              x.toString() !== "[object Object]" &&
              (v.push(w), v.push(fb(String(x))));
          }
        var y = v.join("*");
        u = ["1", Vo(y), y].join("*");
        d
          ? (nb(4) || nb(1) || !p) && bp("_gl", u, a, p, q)
          : cp("_gl", u, a, p, q);
      }
    }
    var d = (a.tagName || "").toUpperCase() === "FORM",
      e = Po(b, 1, d),
      f = Po(b, 2, d),
      g = Po(b, 4, d),
      k = Po(b, 3, d);
    c(e, !1, !1);
    c(f, !0, !1);
    nb(1) && c(g, !0, !0);
    for (var m in k) k.hasOwnProperty(m) && dp(m, k[m], a);
  }
  function dp(a, b, c) {
    c.tagName.toLowerCase() === "a"
      ? cp(a, b, c)
      : c.tagName.toLowerCase() === "form" && bp(a, b, c);
  }
  function cp(a, b, c, d, e) {
    d = d === void 0 ? !1 : d;
    e = e === void 0 ? !1 : e;
    var f;
    if ((f = c.href)) {
      var g;
      if (!(g = !nb(5) || d)) {
        var k = G.location.href,
          m = Uo(c.href),
          n = Uo(k);
        g = !(m && n && m.Mh === n.Mh && m.query === n.query && m.fragment);
      }
      f = g;
    }
    if (f) {
      var p = $o(a, b, c.href, d, e);
      gc.test(p) && (c.href = p);
    }
  }
  function bp(a, b, c, d, e) {
    d = d === void 0 ? !1 : d;
    e = e === void 0 ? !1 : e;
    if (c && c.action) {
      var f = (c.method || "").toLowerCase();
      if (f !== "get" || d) {
        if (f === "get" || f === "post") {
          var g = $o(a, b, c.action, d, e);
          gc.test(g) && (c.action = g);
        }
      } else {
        for (var k = c.childNodes || [], m = !1, n = 0; n < k.length; n++) {
          var p = k[n];
          if (p.name === a) {
            p.setAttribute("value", b);
            m = !0;
            break;
          }
        }
        if (!m) {
          var q = H.createElement("input");
          q.setAttribute("type", "hidden");
          q.setAttribute("name", a);
          q.setAttribute("value", b);
          c.appendChild(q);
        }
      }
    }
  }
  function Lo(a) {
    try {
      var b;
      a: {
        for (var c = a, d = 100; c && d > 0; ) {
          if (c.href && c.nodeName.match(/^a(?:rea)?$/i)) {
            b = c;
            break a;
          }
          c = c.parentNode;
          d--;
        }
        b = null;
      }
      var e = b;
      if (e) {
        var f = e.protocol;
        (f !== "http:" && f !== "https:") || ap(e, e.hostname);
      }
    } catch (g) {}
  }
  function Mo(a) {
    try {
      if (a.action) {
        var b = Si(Yi(a.action), "host");
        ap(a, b);
      }
    } catch (c) {}
  }
  function ep(a, b, c, d) {
    Ko();
    var e = c === "fragment" ? 2 : 1;
    d = !!d;
    Oo(a, b, e, d, !1);
    e === 2 && ib("TAGGING", 23);
    d && ib("TAGGING", 24);
  }
  function fp(a, b) {
    Ko();
    Oo(a, [Ui(G.location, "host", !0)], b, !0, !0);
  }
  function gp() {
    var a = H.location.hostname,
      b = Ro.exec(H.referrer);
    if (!b) return !1;
    var c = b[2],
      d = b[1],
      e = "";
    if (c) {
      var f = c.split("/"),
        g = f[1];
      e = g === "s" ? decodeURIComponent(f[2]) : decodeURIComponent(g);
    } else if (d) {
      if (d.indexOf("xn--") === 0) return !1;
      e = d.replace(/-/g, ".").replace(/\.\./g, "-");
    }
    var k = a.replace(So, ""),
      m = e.replace(So, "");
    return k === m || Ib(k, "." + m);
  }
  function hp(a, b) {
    return a === !1 ? !1 : a || b || gp();
  }
  var ip = ["1"],
    jp = {},
    kp = {};
  function lp(a, b) {
    b = b === void 0 ? !0 : b;
    var c = mp(a.prefix);
    if (!jp[c])
      if (np(c, a.path, a.domain)) {
        var d = kp[mp(a.prefix)];
        op(a, d ? d.id : void 0, d ? d.Gh : void 0);
      } else {
        var e = $i("auiddc");
        if (e) ib("TAGGING", 17), (jp[c] = e);
        else if (b) {
          var f = mp(a.prefix),
            g = Fo();
          pp(f, g, a);
          np(c, a.path, a.domain);
        }
      }
  }
  function op(a, b, c) {
    var d = mp(a.prefix),
      e = jp[d];
    if (e) {
      var f = e.split(".");
      if (f.length === 2) {
        var g = Number(f[1]) || 0;
        if (g) {
          var k = e;
          b && (k = e + "." + b + "." + (c ? c : Math.floor(Cb() / 1e3)));
          pp(d, k, a, g * 1e3);
        }
      }
    }
  }
  function pp(a, b, c, d) {
    var e = Ho(b, "1", c.domain, c.path),
      f = Io(c, d);
    f.Cb = qp();
    yo(a, e, f);
  }
  function np(a, b, c) {
    var d = Go(a, b, c, ip, qp());
    if (!d) return !1;
    rp(a, d);
    return !0;
  }
  function rp(a, b) {
    var c = b.split(".");
    c.length === 5
      ? ((jp[a] = c.slice(0, 2).join(".")),
        (kp[a] = { id: c.slice(2, 4).join("."), Gh: Number(c[4]) || 0 }))
      : c.length === 3
      ? (kp[a] = { id: c.slice(0, 2).join("."), Gh: Number(c[2]) || 0 })
      : (jp[a] = b);
  }
  function mp(a) {
    return (a || "_gcl") + "_au";
  }
  function sp(a) {
    function b() {
      Ck(c) && a();
    }
    var c = qp();
    Jk(function () {
      b();
      Ck(c) || Kk(b, c);
    }, c);
  }
  function tp(a) {
    var b = Yo(!0),
      c = mp(a.prefix);
    sp(function () {
      var d = b[c];
      if (d) {
        rp(c, d);
        var e = Number(jp[c].split(".")[1]) * 1e3;
        if (e) {
          ib("TAGGING", 16);
          var f = Io(a, e);
          f.Cb = qp();
          var g = Ho(d, "1", a.domain, a.path);
          yo(c, g, f);
        }
      }
    });
  }
  function up(a, b, c, d, e) {
    e = e || {};
    var f = function () {
      var g = {},
        k = Go(a, e.path, e.domain, ip, qp());
      k && (g[a] = k);
      return g;
    };
    sp(function () {
      ep(f, b, c, d);
    });
  }
  function qp() {
    return ["ad_storage", "ad_user_data"];
  }
  function vp(a) {
    for (
      var b = [],
        c = H.cookie.split(";"),
        d = new RegExp(
          "^\\s*" + (a || "_gac") + "_(UA-\\d+-\\d+)=\\s*(.+?)\\s*$"
        ),
        e = 0;
      e < c.length;
      e++
    ) {
      var f = c[e].match(d);
      f &&
        b.push({
          ai: f[1],
          value: f[2],
          timestamp: Number(f[2].split(".")[1]) || 0,
        });
    }
    b.sort(function (g, k) {
      return k.timestamp - g.timestamp;
    });
    return b;
  }
  function wp(a, b) {
    var c = vp(a),
      d = {};
    if (!c || !c.length) return d;
    for (var e = 0; e < c.length; e++) {
      var f = c[e].value.split(".");
      if (
        !(f[0] !== "1" || (b && f.length < 3) || (!b && f.length !== 3)) &&
        Number(f[1])
      ) {
        d[c[e].ai] || (d[c[e].ai] = []);
        var g = { version: f[0], timestamp: Number(f[1]) * 1e3, aa: f[2] };
        b && f.length > 3 && (g.labels = f.slice(3));
        d[c[e].ai].push(g);
      }
    }
    return d;
  }
  var xp = {},
    yp =
      ((xp.k = { Ma: /^[\w-]+$/ }),
      (xp.b = { Ma: /^[\w-]+$/, Th: !0 }),
      (xp.i = { Ma: /^[1-9]\d*$/ }),
      xp);
  var zp = {},
    Cp =
      ((zp[5] = { wk: { 2: Ap }, gh: ["k", "i", "b"] }),
      (zp[4] = { wk: { 2: Ap, GCL: Bp }, gh: ["k", "i", "b"] }),
      zp);
  function Dp(a) {
    var b = Cp[5];
    if (b) {
      var c = a.split(".")[0];
      if (c) {
        var d = b.wk[c];
        if (d) return d(a, 5);
      }
    }
  }
  function Ap(a, b) {
    var c = a.split(".");
    if (c.length === 3) {
      var d = {},
        e = Cp[b];
      if (e) {
        for (
          var f = e.gh, g = ma(c[2].split("$")), k = g.next();
          !k.done;
          k = g.next()
        ) {
          var m = k.value,
            n = m[0];
          if (f.indexOf(n) !== -1)
            try {
              var p = decodeURIComponent(m.substring(1)),
                q = yp[n];
              q && (q.Th ? ((d[n] = d[n] || []), d[n].push(p)) : (d[n] = p));
            } catch (r) {}
        }
        return d;
      }
    }
  }
  function Ep(a, b) {
    var c = Cp[5];
    if (c) {
      for (var d = [], e = ma(c.gh), f = e.next(); !f.done; f = e.next()) {
        var g = f.value,
          k = yp[g];
        if (k) {
          var m = a[g];
          if (m !== void 0)
            if (k.Th && Array.isArray(m))
              for (var n = ma(m), p = n.next(); !p.done; p = n.next())
                d.push(encodeURIComponent("" + g + p.value));
            else d.push(encodeURIComponent("" + g + m));
        }
      }
      return ["2", b || "1", d.join("$")].join(".");
    }
  }
  function Bp(a) {
    var b = a.split(".");
    b.shift();
    var c = b.shift(),
      d = b.shift(),
      e = {};
    return (e.k = d), (e.i = c), (e.b = b), e;
  }
  var Fp = new Map([
    [5, "ad_storage"],
    [4, ["ad_storage", "ad_user_data"]],
  ]);
  function Gp(a) {
    if (Cp[5]) {
      for (
        var b = [],
          c = no(a, void 0, void 0, Fp.get(5)),
          d = ma(c),
          e = d.next();
        !e.done;
        e = d.next()
      ) {
        var f = Dp(e.value);
        f && (Hp(f), b.push(f));
      }
      return b;
    }
  }
  function Ip(a, b, c, d) {
    c = c || {};
    var e = Do(c.domain, c.path),
      f = Ep(b, e);
    if (f) {
      var g = Io(c, d, void 0, Fp.get(5));
      yo(a, f, g);
    }
  }
  function Jp(a, b) {
    var c = b.Ma;
    return typeof c === "function" ? c(a) : c.test(a);
  }
  function Hp(a) {
    for (
      var b = ma(Object.keys(a)), c = b.next(), d = {};
      !c.done;
      d = { Be: void 0 }, c = b.next()
    ) {
      var e = c.value,
        f = a[e];
      d.Be = yp[e];
      d.Be
        ? d.Be.Th
          ? (a[e] = Array.isArray(f)
              ? f.filter(
                  (function (g) {
                    return function (k) {
                      return Jp(k, g.Be);
                    };
                  })(d)
                )
              : void 0)
          : (typeof f === "string" && Jp(f, d.Be)) || (a[e] = void 0)
        : (a[e] = void 0);
    }
  }
  var Kp = /^\w+$/,
    Lp = /^[\w-]+$/,
    Mp = {},
    Np =
      ((Mp.aw = "_aw"),
      (Mp.dc = "_dc"),
      (Mp.gf = "_gf"),
      (Mp.gp = "_gp"),
      (Mp.gs = "_gs"),
      (Mp.ha = "_ha"),
      (Mp.ag = "_ag"),
      (Mp.gb = "_gb"),
      Mp);
  function Op() {
    return ["ad_storage", "ad_user_data"];
  }
  function Pp(a) {
    return !xk().j() || Ck(a);
  }
  function Qp(a, b) {
    function c() {
      var d = Pp(b);
      d && a();
      return d;
    }
    Jk(function () {
      c() || Kk(c, b);
    }, b);
  }
  function Rp(a) {
    return Sp(a).map(function (b) {
      return b.aa;
    });
  }
  function Tp(a) {
    return Up(a)
      .filter(function (b) {
        return b.aa;
      })
      .map(function (b) {
        return b.aa;
      });
  }
  function Up(a) {
    var b = Vp(a.prefix),
      c = Wp("gb", b),
      d = Wp("ag", b);
    if (!d || !c) return [];
    var e = function (k) {
        return function (m) {
          m.type = k;
          return m;
        };
      },
      f = Sp(c).map(e("gb")),
      g = (nb(7) ? Xp(d) : []).map(e("ag"));
    return f.concat(g).sort(function (k, m) {
      return m.timestamp - k.timestamp;
    });
  }
  function Yp(a, b, c, d, e) {
    var f = sb(a, function (g) {
      return g.aa === c;
    });
    f
      ? ((f.timestamp = Math.max(f.timestamp, d)),
        (f.labels = Zp(f.labels || [], e || [])))
      : a.push({ version: b, aa: c, timestamp: d, labels: e });
  }
  function Xp(a) {
    for (
      var b = Gp(a) || [], c = [], d = ma(b), e = d.next();
      !e.done;
      e = d.next()
    ) {
      var f = e.value,
        g = f,
        k = $p(f);
      k && Yp(c, "2", g.k, k, g.b || []);
    }
    return c.sort(function (m, n) {
      return n.timestamp - m.timestamp;
    });
  }
  function Sp(a) {
    for (
      var b = [], c = no(a, H.cookie, void 0, Op()), d = ma(c), e = d.next();
      !e.done;
      e = d.next()
    ) {
      var f = aq(e.value);
      if (f != null) {
        var g = f;
        Yp(b, g.version, g.aa, g.timestamp, g.labels);
      }
    }
    b.sort(function (k, m) {
      return m.timestamp - k.timestamp;
    });
    return bq(b);
  }
  function Zp(a, b) {
    if (!a.length) return b;
    if (!b.length) return a;
    var c = {};
    return a.concat(b).filter(function (d) {
      return c.hasOwnProperty(d) ? !1 : (c[d] = !0);
    });
  }
  function Vp(a) {
    return a && typeof a === "string" && a.match(Kp) ? a : "_gcl";
  }
  function cq(a, b) {
    var c = nb(7),
      d = Yi(a),
      e = Si(d, "query", !1, void 0, "gclid"),
      f = Si(d, "query", !1, void 0, "gclsrc"),
      g = Si(d, "query", !1, void 0, "wbraid");
    g = Ob(g);
    var k;
    c && (k = Si(d, "query", !1, void 0, "gbraid"));
    var m = Si(d, "query", !1, void 0, "gad_source"),
      n = Si(d, "query", !1, void 0, "dclid");
    if (b && (!e || !f || !g || (c && !k))) {
      var p = d.hash.replace("#", "");
      e = e || Ri(p, "gclid", !1);
      f = f || Ri(p, "gclsrc", !1);
      g = g || Ri(p, "wbraid", !1);
      c && (k = k || Ri(p, "gbraid", !1));
      m = m || Ri(p, "gad_source", !1);
    }
    return dq(e, f, n, g, k, m);
  }
  function eq() {
    return cq(G.location.href, !0);
  }
  function dq(a, b, c, d, e, f) {
    var g = {},
      k = function (m, n) {
        g[n] || (g[n] = []);
        g[n].push(m);
      };
    g.gclid = a;
    g.gclsrc = b;
    g.dclid = c;
    if (a !== void 0 && a.match(Lp))
      switch (b) {
        case void 0:
          k(a, "aw");
          break;
        case "aw.ds":
          k(a, "aw");
          k(a, "dc");
          break;
        case "ds":
          k(a, "dc");
          break;
        case "3p.ds":
          k(a, "dc");
          break;
        case "gf":
          k(a, "gf");
          break;
        case "ha":
          k(a, "ha");
      }
    c && k(c, "dc");
    d !== void 0 && Lp.test(d) && ((g.wbraid = d), k(d, "gb"));
    nb(7) && e !== void 0 && Lp.test(e) && ((g.gbraid = e), k(e, "ag"));
    f !== void 0 && Lp.test(f) && ((g.gad_source = f), k(f, "gs"));
    return g;
  }
  function fq(a) {
    var b = eq();
    if (nb(6)) {
      for (
        var c = !0, d = ma(Object.keys(b)), e = d.next();
        !e.done;
        e = d.next()
      )
        if (b[e.value] !== void 0) {
          c = !1;
          break;
        }
      c && (b = cq(G.document.referrer, !1));
    }
    gq(b, !1, a);
  }
  function gq(a, b, c, d, e) {
    c = c || {};
    e = e || [];
    var f = Vp(c.prefix),
      g = d || Cb(),
      k = Math.round(g / 1e3),
      m = Op(),
      n = !1,
      p = !1,
      q = function () {
        if (Pp(m)) {
          var r = Io(c, g, !0);
          r.Cb = m;
          for (
            var t = function (F, L) {
                var M = Wp(F, f);
                M && (yo(M, L, r), F !== "gb" && (n = !0));
              },
              u = function (F) {
                var L = ["GCL", k, F];
                e.length > 0 && L.push(e.join("."));
                return L.join(".");
              },
              v = ma(["aw", "dc", "gf", "ha", "gp"]),
              w = v.next();
            !w.done;
            w = v.next()
          ) {
            var x = w.value;
            a[x] && t(x, u(a[x][0]));
          }
          if (!n && a.gb) {
            var y = a.gb[0],
              B = Wp("gb", f);
            (!b &&
              Sp(B).some(function (F) {
                return F.aa === y && F.labels && F.labels.length > 0;
              })) ||
              t("gb", u(y));
          }
        }
        if (!p && nb(7) && a.gbraid && Pp("ad_storage") && ((p = !0), !n)) {
          var A = a.gbraid,
            C = Wp("ag", f);
          if (
            b ||
            !(nb(7) ? Xp(C) : []).some(function (F) {
              return F.aa === A && F.labels && F.labels.length > 0;
            })
          ) {
            var E = {},
              D = ((E.k = A), (E.i = "" + k), (E.b = e), E);
            Ip(C, D, c, g);
          }
        }
        hq(a, f, g, c);
      };
    Jk(function () {
      q();
      Pp(m) || Kk(q, m);
    }, m);
  }
  function hq(a, b, c, d) {
    if (a.gad_source !== void 0 && Pp("ad_storage")) {
      var e = Wp("gs", b);
      if (e) {
        var f = Math.round((Cb() - (Qc() || 0)) / 1e3),
          g = {},
          k = ((g.k = a.gad_source), (g.i = "" + f), g);
        Ip(e, k, d, c);
      }
    }
  }
  function iq(a, b) {
    var c = Yo(!0);
    Qp(function () {
      for (var d = Vp(b.prefix), e = 0; e < a.length; ++e) {
        var f = a[e];
        if (Np[f] !== void 0) {
          var g = Wp(f, d),
            k = c[g];
          if (k) {
            var m = Math.min(jq(k), Cb()),
              n;
            b: {
              for (
                var p = m, q = no(g, H.cookie, void 0, Op()), r = 0;
                r < q.length;
                ++r
              )
                if (jq(q[r]) > p) {
                  n = !0;
                  break b;
                }
              n = !1;
            }
            if (!n) {
              var t = Io(b, m, !0);
              t.Cb = Op();
              yo(g, k, t);
            }
          }
        }
      }
      gq(dq(c.gclid, c.gclsrc), !1, b);
    }, Op());
  }
  function kq(a) {
    var b = [];
    nb(7) && b.push("ag");
    if (b.length !== 0) {
      var c = Yo(!0),
        d = Vp(a.prefix);
      Qp(
        function () {
          for (var e = 0; e < b.length; ++e) {
            var f = Wp(b[e], d);
            if (f) {
              var g = c[f];
              if (g) {
                var k = Dp(g);
                if (k) {
                  var m = $p(k);
                  m || (m = Cb());
                  var n;
                  a: {
                    for (var p = m, q = Gp(f), r = 0; r < q.length; ++r)
                      if ($p(q[r]) > p) {
                        n = !0;
                        break a;
                      }
                    n = !1;
                  }
                  if (n) break;
                  k.i = "" + Math.round(m / 1e3);
                  Ip(f, k, a, m);
                }
              }
            }
          }
        },
        ["ad_storage"]
      );
    }
  }
  function Wp(a, b) {
    var c = Np[a];
    if (c !== void 0) return b + c;
  }
  function jq(a) {
    return lq(a.split(".")).length !== 0
      ? (Number(a.split(".")[1]) || 0) * 1e3
      : 0;
  }
  function $p(a) {
    return a ? (Number(a.i) || 0) * 1e3 : 0;
  }
  function aq(a) {
    var b = lq(a.split("."));
    return b.length === 0
      ? null
      : {
          version: b[0],
          aa: b[2],
          timestamp: (Number(b[1]) || 0) * 1e3,
          labels: b.slice(3),
        };
  }
  function lq(a) {
    return a.length < 3 ||
      (a[0] !== "GCL" && a[0] !== "1") ||
      !/^\d+$/.test(a[1]) ||
      !Lp.test(a[2])
      ? []
      : a;
  }
  function mq(a, b, c, d, e) {
    if (Array.isArray(b) && mo(G)) {
      var f = Vp(e),
        g = function () {
          for (var k = {}, m = 0; m < a.length; ++m) {
            var n = Wp(a[m], f);
            if (n) {
              var p = no(n, H.cookie, void 0, Op());
              p.length && (k[n] = p.sort()[p.length - 1]);
            }
          }
          return k;
        };
      Qp(function () {
        ep(g, b, c, d);
      }, Op());
    }
  }
  function nq(a, b, c, d) {
    if (Array.isArray(a) && mo(G)) {
      var e = [];
      nb(7) && e.push("ag");
      if (e.length !== 0) {
        var f = Vp(d),
          g = function () {
            for (var k = {}, m = 0; m < e.length; ++m) {
              var n = Wp(e[m], f);
              if (!n) return {};
              var p = Gp(n);
              if (p.length) {
                var q = p.sort(function (r, t) {
                  return $p(t) - $p(r);
                })[0];
                k[n] = Ep(q);
              }
            }
            return k;
          };
        Qp(
          function () {
            ep(g, a, b, c);
          },
          ["ad_storage"]
        );
      }
    }
  }
  function bq(a) {
    return a.filter(function (b) {
      return Lp.test(b.aa);
    });
  }
  function oq(a, b) {
    if (mo(G)) {
      for (var c = Vp(b.prefix), d = {}, e = 0; e < a.length; e++)
        Np[a[e]] && (d[a[e]] = Np[a[e]]);
      Qp(function () {
        z(d, function (f, g) {
          var k = no(c + g, H.cookie, void 0, Op());
          k.sort(function (t, u) {
            return jq(u) - jq(t);
          });
          if (k.length) {
            var m = k[0],
              n = jq(m),
              p = lq(m.split(".")).length !== 0 ? m.split(".").slice(3) : [],
              q = {},
              r;
            r = lq(m.split(".")).length !== 0 ? m.split(".")[2] : void 0;
            q[f] = [r];
            gq(q, !0, b, n, p);
          }
        });
      }, Op());
    }
  }
  function pq(a) {
    var b = [],
      c = [];
    nb(7) && (b.push("ag"), c.push("gbraid"));
    b.length !== 0 &&
      Qp(
        function () {
          for (var d = Vp(a.prefix), e = 0; e < b.length; ++e) {
            var f = Wp(b[e], d);
            if (!f) break;
            var g = Gp(f);
            if (g.length) {
              var k = g.sort(function (q, r) {
                  return $p(r) - $p(q);
                })[0],
                m = $p(k),
                n = k.b,
                p = {};
              p[c[e]] = k.k;
              gq(p, !0, a, m, n);
            }
          }
        },
        ["ad_storage"]
      );
  }
  function qq(a, b) {
    for (var c = 0; c < b.length; ++c) if (a[b[c]]) return !0;
    return !1;
  }
  function rq(a) {
    function b(e, f, g) {
      g && (e[f] = g);
    }
    if (Gk()) {
      var c = eq();
      if (qq(c, a)) {
        var d = {};
        b(d, "gclid", c.gclid);
        b(d, "dclid", c.dclid);
        b(d, "gclsrc", c.gclsrc);
        b(d, "wbraid", c.wbraid);
        nb(7) && b(d, "gbraid", c.gbraid);
        fp(function () {
          return d;
        }, 3);
        fp(function () {
          var e = {};
          return (e._up = "1"), e;
        }, 1);
      }
    }
  }
  function sq(a) {
    if (!nb(1)) return null;
    var b = Yo(!0).gad_source;
    if (b != null) return (G.location.hash = ""), b;
    if (nb(2)) {
      var c = Yi(G.location.href);
      b = Si(c, "query", !1, void 0, "gad_source");
      if (b != null) return b;
      var d = eq();
      if (qq(d, a)) return "0";
    }
    return null;
  }
  function tq(a) {
    var b = sq(a);
    b != null &&
      fp(function () {
        var c = {};
        return (c.gad_source = b), c;
      }, 4);
  }
  function uq(a, b, c) {
    var d = [];
    if (b.length === 0) return d;
    for (var e = {}, f = 0; f < b.length; f++) {
      var g = b[f],
        k = g.type ? g.type : "gcl";
      (g.labels || []).indexOf(c) === -1
        ? (a.push(0), e[k] || d.push(g))
        : a.push(1);
      e[k] = !0;
    }
    return d;
  }
  function vq(a, b, c, d) {
    var e = [];
    c = c || {};
    if (!Pp(Op())) return e;
    var f = Sp(a),
      g = uq(e, f, b);
    if (g.length && !d)
      for (var k = ma(g), m = k.next(); !m.done; m = k.next()) {
        var n = m.value,
          p = n.timestamp,
          q = [n.version, Math.round(p / 1e3), n.aa]
            .concat(n.labels || [], [b])
            .join("."),
          r = Io(c, p, !0);
        r.Cb = Op();
        yo(a, q, r);
      }
    return e;
  }
  function wq(a, b) {
    var c = [];
    b = b || {};
    var d = Up(b),
      e = uq(c, d, a);
    if (e.length)
      for (var f = ma(e), g = f.next(); !g.done; g = f.next()) {
        var k = g.value,
          m = Vp(b.prefix),
          n = Wp(k.type, m);
        if (!n) break;
        var p = k,
          q = p.version,
          r = p.aa,
          t = p.labels,
          u = p.timestamp,
          v = Math.round(u / 1e3);
        if (k.type === "ag") {
          var w = {},
            x = ((w.k = r), (w.i = "" + v), (w.b = (t || []).concat([a])), w);
          Ip(n, x, b, u);
        } else if (k.type === "gb") {
          var y = [q, v, r].concat(t || [], [a]).join("."),
            B = Io(b, u, !0);
          B.Cb = Op();
          yo(n, y, B);
        }
      }
    return c;
  }
  function xq(a, b) {
    var c = Vp(b),
      d = Wp(a, c);
    if (!d) return 0;
    var e;
    e = a === "ag" ? (nb(7) ? Xp(d) : []) : Sp(d);
    for (var f = 0, g = 0; g < e.length; g++) f = Math.max(f, e[g].timestamp);
    return f;
  }
  function yq(a) {
    for (var b = 0, c = ma(Object.keys(a)), d = c.next(); !d.done; d = c.next())
      for (var e = a[d.value], f = 0; f < e.length; f++)
        b = Math.max(b, Number(e[f].timestamp));
    return b;
  }
  function zq(a, b) {
    var c = Math.max(xq("aw", a), yq(Pp(Op()) ? wp() : {})),
      d = Math.max(xq("gb", a), yq(Pp(Op()) ? wp("_gac_gb", !0) : {}));
    nb(7) && b && (d = Math.max(d, xq("ag", a)));
    return d > c;
  }
  function Oq() {
    hi.dedupe_gclid || (hi.dedupe_gclid = Fo());
    return hi.dedupe_gclid;
  }
  var Pq = /^(www\.)?google(\.com?)?(\.[a-z]{2}t?)?$/,
    Qq = /^www.googleadservices.com$/;
  function Rq(a) {
    a || (a = Sq());
    return a.nn
      ? !1
      : a.Yl || a.Zl || a.bm || a.am || a.xh || a.sd || a.Ml || a.Ql
      ? !0
      : !1;
  }
  function Sq() {
    var a = {},
      b = Yo(!0);
    a.nn = !!b._up;
    var c = eq();
    a.Yl = c.aw !== void 0;
    a.Zl = c.dc !== void 0;
    a.bm = c.wbraid !== void 0;
    a.am = c.gbraid !== void 0;
    var d = Yi(G.location.href),
      e = Si(d, "query", !1, void 0, "gad");
    a.xh = e !== void 0;
    if (!a.xh) {
      var f = d.hash.replace("#", ""),
        g = Ri(f, "gad", !1);
      a.xh = g !== void 0;
    }
    a.sd = Si(d, "query", !1, void 0, "gad_source");
    if (a.sd === void 0) {
      var k = d.hash.replace("#", ""),
        m = Ri(k, "gad_source", !1);
      a.sd = m;
    }
    var n = H.referrer ? Si(Yi(H.referrer), "host") : "";
    a.Ql = Pq.test(n);
    a.Ml = Qq.test(n);
    return a;
  }
  var Tq = RegExp(
      "^UA-\\d+-\\d+%3A[\\w-]+(?:%2C[\\w-]+)*(?:%3BUA-\\d+-\\d+%3A[\\w-]+(?:%2C[\\w-]+)*)*$"
    ),
    Uq = /^~?[\w-]+(?:\.~?[\w-]+)*$/,
    Vq = /^\d+\.fls\.doubleclick\.net$/,
    Wq = /;gac=([^;?]+)/,
    Xq = /;gacgb=([^;?]+)/;
  function Yq(a, b) {
    if (Vq.test(H.location.host)) {
      var c = H.location.href.match(b);
      return c && c.length === 2 && c[1].match(Tq)
        ? decodeURIComponent(c[1])
        : "";
    }
    for (
      var d = [], e = ma(Object.keys(a)), f = e.next();
      !f.done;
      f = e.next()
    ) {
      for (var g = f.value, k = [], m = a[g], n = 0; n < m.length; n++)
        k.push(m[n].aa);
      d.push(g + ":" + k.join(","));
    }
    return d.length > 0 ? d.join(";") : "";
  }
  function Zq(a, b, c) {
    for (
      var d = Pp(Op()) ? wp("_gac_gb", !0) : {},
        e = [],
        f = !1,
        g = ma(Object.keys(d)),
        k = g.next();
      !k.done;
      k = g.next()
    ) {
      var m = k.value,
        n = vq("_gac_gb_" + m, a, b, c);
      f =
        f ||
        (n.length !== 0 &&
          n.some(function (p) {
            return p === 1;
          }));
      e.push(m + ":" + n.join(","));
    }
    return { Ll: f ? e.join(";") : "", Kl: Yq(d, Xq) };
  }
  function $q(a) {
    var b = H.location.href.match(new RegExp(";" + a + "=([^;?]+)"));
    return b && b.length === 2 && b[1].match(Uq) ? b[1] : void 0;
  }
  function ar(a) {
    var b = { th: void 0, uh: void 0 },
      c,
      d;
    Vq.test(H.location.host) && ((c = $q("gclgs")), (d = $q("gclst")));
    if (c && d) (b.th = c), (b.uh = d);
    else {
      var e = Cb(),
        f = Xp((a || "_gcl") + "_gs"),
        g = f.map(function (m) {
          return m.aa;
        }),
        k = f.map(function (m) {
          return e - m.timestamp;
        });
      g.length > 0 &&
        k.length > 0 &&
        ((b.th = g.join(".")), (b.uh = k.join(".")));
    }
    return b;
  }
  function br(a, b, c) {
    if (Vq.test(H.location.host)) {
      var d = $q(c);
      if (d) return [{ aa: d }];
    } else {
      if (b === "gclid") return Sp((a || "_gcl") + "_aw");
      if (b === "wbraid") return Sp((a || "_gcl") + "_gb");
      if (b === "braids") return Up({ prefix: a });
    }
    return [];
  }
  function cr(a) {
    return br(a, "gclid", "gclaw")
      .map(function (b) {
        return b.aa;
      })
      .join(".");
  }
  function dr(a) {
    return br(a, "wbraid", "gclgb")
      .map(function (b) {
        return b.aa;
      })
      .join(".");
  }
  function er(a) {
    return br(a, "braids", "gclgb")
      .map(function (b) {
        return b.aa;
      })
      .join(".");
  }
  function fr(a, b) {
    return Vq.test(H.location.host) ? !($q("gclaw") || $q("gac")) : zq(a, b);
  }
  function gr(a, b, c) {
    var d;
    d = c ? wq(a, b) : vq(((b && b.prefix) || "_gcl") + "_gb", a, b);
    return d.length === 0 ||
      d.every(function (e) {
        return e === 0;
      })
      ? ""
      : d.join(".");
  }
  function hr() {
    var a = G.__uspapi;
    if (pb(a)) {
      var b = "";
      try {
        a("getUSPData", 1, function (c, d) {
          if (d && c) {
            var e = c.uspString;
            e && RegExp("^[\\da-zA-Z-]{1,20}$").test(e) && (b = e);
          }
        });
      } catch (c) {}
      return b;
    }
  }
  function qr(a) {
    var b = Q(a.m, P.g.Kb),
      c = Q(a.m, P.g.Yb);
    b && !c
      ? (a.eventName !== P.g.ba && a.eventName !== P.g.Nc && O(131),
        (a.isAborted = !0))
      : !b && c && (O(132), (a.isAborted = !0));
  }
  function rr(a) {
    var b = W(P.g.R) ? hi.pscdl : "denied";
    b != null && (a.o[P.g.ff] = b);
  }
  function sr(a) {
    var b = en(!0);
    a.o[P.g.Jb] = b;
  }
  function tr(a) {
    $n() && (a.o[P.g.Bc] = 1);
  }
  function kr() {
    var a = H.title;
    if (a === void 0 || a === "") return "";
    var b = function (d) {
      try {
        return decodeURIComponent(d), !0;
      } catch (e) {
        return !1;
      }
    };
    a = encodeURIComponent(a);
    for (var c = 256; c > 0 && !b(a.substring(0, c)); ) c--;
    return decodeURIComponent(a.substring(0, c));
  }
  function ur(a) {
    if (U(12)) {
      var b = Q(a.m, P.g.Oa);
      a.o[P.g.me] || (a.o[P.g.me] = {});
      a.o[P.g.me].ce = b;
    }
  }
  function Br(a, b, c, d) {
    var e = Bc(),
      f;
    if (e === 1)
      a: {
        var g = si;
        g = g.toLowerCase();
        for (
          var k = "https://" + g,
            m = "http://" + g,
            n = 1,
            p = H.getElementsByTagName("script"),
            q = 0;
          q < p.length && q < 100;
          q++
        ) {
          var r = p[q].src;
          if (r) {
            r = r.toLowerCase();
            if (r.indexOf(m) === 0) {
              f = 3;
              break a;
            }
            n === 1 && r.indexOf(k) === 0 && (n = 2);
          }
        }
        f = n;
      }
    else f = e;
    return (f === 2 || d || "http:" != G.location.protocol ? a : b) + c;
  }
  function Or(a) {
    return {
      getDestinationId: function () {
        return a.target.ia;
      },
      getEventName: function () {
        return a.eventName;
      },
      setEventName: function (b) {
        a.eventName = b;
      },
      getHitData: function (b) {
        return a.o[b];
      },
      setHitData: function (b, c) {
        a.o[b] = c;
      },
      setHitDataIfNotDefined: function (b, c) {
        a.o[b] === void 0 && (a.o[b] = c);
      },
      copyToHitData: function (b, c) {
        a.copyToHitData(b, c);
      },
      getMetadata: function (b) {
        return a.metadata[b];
      },
      setMetadata: function (b, c) {
        a.metadata[b] = c;
      },
      isAborted: function () {
        return a.isAborted;
      },
      abort: function () {
        a.isAborted = !0;
      },
      getFromEventContext: function (b) {
        return Q(a.m, b);
      },
      Sj: function () {
        return a;
      },
      getHitKeys: function () {
        return Object.keys(a.o);
      },
    };
  }
  var Vr,
    Wr = !1;
  function Xr() {
    Wr = !0;
    Vr = Vr || {};
  }
  function Yr(a) {
    Wr || Xr();
    return Vr[a];
  }
  function Zr() {
    var a = G.screen;
    return { width: a ? a.width : 0, height: a ? a.height : 0 };
  }
  function $r(a) {
    if (H.hidden) return !0;
    var b = a.getBoundingClientRect();
    if (b.top === b.bottom || b.left === b.right || !G.getComputedStyle)
      return !0;
    var c = G.getComputedStyle(a, null);
    if (c.visibility === "hidden") return !0;
    for (var d = a, e = c; d; ) {
      if (e.display === "none") return !0;
      var f = e.opacity,
        g = e.filter;
      if (g) {
        var k = g.indexOf("opacity(");
        k >= 0 &&
          ((g = g.substring(k + 8, g.indexOf(")", k))),
          g.charAt(g.length - 1) === "%" && (g = g.substring(0, g.length - 1)),
          (f = String(Math.min(Number(g), Number(f)))));
      }
      if (f !== void 0 && Number(f) <= 0) return !0;
      (d = d.parentElement) && (e = G.getComputedStyle(d, null));
    }
    return !1;
  }
  var $s = Number("") || 5,
    at = Number("") || 50,
    bt = tb();
  var gt = {
    ml: Number("") || 500,
    Tk: Number("") || 5e3,
    sj: Number("20") || 10,
    Ak: Number("") || 5e3,
  };
  function ht(a) {
    return (a.performance && a.performance.now()) || Date.now();
  }
  var it = function (a, b) {
    var c;
    return c;
  };
  var jt = "https://" + gi.Gd + "/gtm/static/",
    kt;
  function pt(a, b) {}
  var qt = function (a, b, c, d) {};
  function rt(a, b, c, d) {}
  function st(a, b, c, d) {}
  var tt = void 0;
  function ut(a) {
    var b = [];
    return b;
  }
  var vt = function (a) {
    for (var b = [], c = 0, d = 0; d < a.length; d++) {
      var e = a.charCodeAt(d);
      e < 128
        ? (b[c++] = e)
        : (e < 2048
            ? (b[c++] = (e >> 6) | 192)
            : ((e & 64512) == 55296 &&
              d + 1 < a.length &&
              (a.charCodeAt(d + 1) & 64512) == 56320
                ? ((e =
                    65536 + ((e & 1023) << 10) + (a.charCodeAt(++d) & 1023)),
                  (b[c++] = (e >> 18) | 240),
                  (b[c++] = ((e >> 12) & 63) | 128))
                : (b[c++] = (e >> 12) | 224),
              (b[c++] = ((e >> 6) & 63) | 128)),
          (b[c++] = (e & 63) | 128));
    }
    return b;
  };
  Tm();
  Wm() || Qm("iPod");
  Qm("iPad");
  !Qm("Android") || Um() || Tm() || Sm() || Qm("Silk");
  Um();
  !Qm("Safari") ||
    Um() ||
    (Rm() ? 0 : Qm("Coast")) ||
    Sm() ||
    (Rm() ? 0 : Qm("Edge")) ||
    (Rm() ? Pm("Microsoft Edge") : Qm("Edg/")) ||
    (Rm() ? Pm("Opera") : Qm("OPR")) ||
    Tm() ||
    Qm("Silk") ||
    Qm("Android") ||
    Xm();
  var wt = {},
    xt = null,
    zt = function (a) {
      for (var b = [], c = 0, d = 0; d < a.length; d++) {
        var e = a.charCodeAt(d);
        e > 255 && ((b[c++] = e & 255), (e >>= 8));
        b[c++] = e;
      }
      var f = 4;
      f === void 0 && (f = 0);
      if (!xt) {
        xt = {};
        for (
          var g =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(
                ""
              ),
            k = ["+/=", "+/", "-_=", "-_.", "-_"],
            m = 0;
          m < 5;
          m++
        ) {
          var n = g.concat(k[m].split(""));
          wt[m] = n;
          for (var p = 0; p < n.length; p++) {
            var q = n[p];
            xt[q] === void 0 && (xt[q] = p);
          }
        }
      }
      for (
        var r = wt[f],
          t = Array(Math.floor(b.length / 3)),
          u = r[64] || "",
          v = 0,
          w = 0;
        v < b.length - 2;
        v += 3
      ) {
        var x = b[v],
          y = b[v + 1],
          B = b[v + 2],
          A = r[x >> 2],
          C = r[((x & 3) << 4) | (y >> 4)],
          E = r[((y & 15) << 2) | (B >> 6)],
          D = r[B & 63];
        t[w++] = "" + A + C + E + D;
      }
      var F = 0,
        L = u;
      switch (b.length - v) {
        case 2:
          (F = b[v + 1]), (L = r[(F & 15) << 2] || u);
        case 1:
          var M = b[v];
          t[w] = "" + r[M >> 2] + r[((M & 3) << 4) | (F >> 4)] + L + u;
      }
      return t.join("");
    };
  var At =
    "platform platformVersion architecture model uaFullVersion bitness fullVersionList wow64".split(
      " "
    );
  function Bt(a) {
    var b;
    return (b = a.google_tag_data) != null ? b : (a.google_tag_data = {});
  }
  function Ct() {
    var a = G.google_tag_data,
      b;
    if (a != null && a.uach) {
      var c = a.uach,
        d = Object.assign({}, c);
      c.fullVersionList && (d.fullVersionList = c.fullVersionList.slice(0));
      b = d;
    } else b = null;
    return b;
  }
  function Dt() {
    var a, b;
    return (b = (a = G.google_tag_data) == null ? void 0 : a.uach_promise) !=
      null
      ? b
      : null;
  }
  function Et(a) {
    var b, c;
    return (
      typeof ((b = a.navigator) == null
        ? void 0
        : (c = b.userAgentData) == null
        ? void 0
        : c.getHighEntropyValues) === "function"
    );
  }
  function Ft() {
    var a = G;
    if (!Et(a)) return null;
    var b = Bt(a);
    if (b.uach_promise) return b.uach_promise;
    var c = a.navigator.userAgentData
      .getHighEntropyValues(At)
      .then(function (d) {
        b.uach != null || (b.uach = d);
        return d;
      });
    return (b.uach_promise = c);
  }
  function Lt(a) {
    var b;
    b = b === void 0 ? document : b;
    var c;
    return !((c = b.featurePolicy) == null || !c.allowedFeatures().includes(a));
  }
  function Mt() {
    return Lt("join-ad-interest-group") && pb(qc.joinAdInterestGroup);
  }
  function Nt(a, b) {
    var c = mb[3] === void 0 ? 1 : mb[3],
      d = 'iframe[data-tagging-id="' + b + '"]',
      e = [];
    try {
      if (c === 1) {
        var f = H.querySelector(d);
        f && (e = [f]);
      } else e = Array.from(H.querySelectorAll(d));
    } catch (q) {}
    var g;
    a: {
      try {
        g = H.querySelectorAll(
          'iframe[allow="join-ad-interest-group"][data-tagging-id*="-"]'
        );
        break a;
      } catch (q) {}
      g = void 0;
    }
    var k = g,
      m =
        ((k == null ? void 0 : k.length) || 0) >=
        (mb[2] === void 0 ? 50 : mb[2]),
      n;
    if ((n = e.length >= 1)) {
      var p = Number(e[e.length - 1].dataset.loadTime);
      p !== void 0 && Cb() - p < (mb[1] === void 0 ? 6e4 : mb[1])
        ? (ib("TAGGING", 9), (n = !0))
        : (n = !1);
    }
    if (!n) {
      if (c === 1)
        if (e.length >= 1) Ot(e[0]);
        else {
          if (m) {
            ib("TAGGING", 10);
            return;
          }
        }
      else e.length >= c ? Ot(e[0]) : m && Ot(k[0]);
      Cc(
        a,
        void 0,
        { allow: "join-ad-interest-group" },
        { taggingId: b, loadTime: Cb() }
      );
    }
  }
  function Ot(a) {
    try {
      a.parentNode.removeChild(a);
    } catch (b) {}
  }
  function Pt() {
    return "https://td.doubleclick.net";
  }
  var Hu = {
    M: {
      di: "ads_conversion_hit",
      Fd: "container_execute_start",
      gi: "container_setup_end",
      Yf: "container_setup_start",
      ei: "container_blocking_end",
      fi: "container_execute_end",
      hi: "container_yield_end",
      Zf: "container_yield_start",
      gj: "event_execute_end",
      fj: "event_evaluation_end",
      Rg: "event_evaluation_start",
      ij: "event_setup_end",
      je: "event_setup_start",
      kj: "ga4_conversion_hit",
      pe: "page_load",
      Cn: "pageview",
      hc: "snippet_load",
      Fj: "tag_callback_error",
      Gj: "tag_callback_failure",
      Hj: "tag_callback_success",
      Ij: "tag_execute_end",
      od: "tag_execute_start",
    },
  };
  function Iu() {
    function a(c, d) {
      var e = jb(d);
      e && b.push([c, e]);
    }
    var b = [];
    a("u", "GTM");
    a("ut", "TAGGING");
    a("h", "HEALTH");
    return b;
  }
  var Ju = !1;
  function rv(a, b) {}
  function sv(a, b) {}
  function tv(a, b) {}
  function uv(a, b) {}
  function vv() {
    var a = {};
    return a;
  }
  function jv(a) {
    a = a === void 0 ? !0 : a;
    var b = {};
    return b;
  }
  function wv() {}
  function xv(a, b) {}
  function yv(a, b, c) {}
  function zv() {}
  function Av(a, b) {
    var c = G,
      d,
      e = c.GooglebQhCsO;
    e || ((e = {}), (c.GooglebQhCsO = e));
    d = e;
    if (d[a]) return !1;
    d[a] = [];
    d[a][0] = b;
    return !0;
  }
  var Bv = function (a, b, c) {
    var d = $m(a, "fmt");
    if (b) {
      var e = $m(a, "random"),
        f = $m(a, "label") || "";
      if (!e) return !1;
      var g = zt(
        decodeURIComponent(f.replace(/\+/g, " ")) +
          ":" +
          decodeURIComponent(e.replace(/\+/g, " "))
      );
      if (!Av(g, b)) return !1;
    }
    d && d != 4 && (a = bn(a, "rfmt", d));
    var k = bn(a, "fmt", 4);
    Ac(
      k,
      function () {
        G.google_noFurtherRedirects &&
          b &&
          b.call &&
          ((G.google_noFurtherRedirects = null), b());
      },
      void 0,
      c,
      H.getElementsByTagName("script")[0].parentElement || void 0
    );
    return !0;
  };
  function Tv(a, b) {
    if (data.entities) {
      var c = data.entities[a];
      if (c) return c[b];
    }
  }
  function Uv(a, b, c) {
    c = c === void 0 ? !1 : c;
    Vv().addRestriction(0, a, b, c);
  }
  function Wv(a, b, c) {
    c = c === void 0 ? !1 : c;
    Vv().addRestriction(1, a, b, c);
  }
  function Xv() {
    var a = Ej();
    return Vv().getRestrictions(1, a);
  }
  var Yv = function () {
      this.j = {};
      this.D = {};
    },
    Zv = function (a, b) {
      var c = a.j[b];
      c ||
        ((c = {
          _entity: { internal: [], external: [] },
          _event: { internal: [], external: [] },
        }),
        (a.j[b] = c));
      return c;
    };
  Yv.prototype.addRestriction = function (a, b, c, d) {
    d = d === void 0 ? !1 : d;
    if (!d || !this.D[b]) {
      var e = Zv(this, b);
      a === 0
        ? d
          ? e._entity.external.push(c)
          : e._entity.internal.push(c)
        : a === 1 &&
          (d ? e._event.external.push(c) : e._event.internal.push(c));
    }
  };
  Yv.prototype.getRestrictions = function (a, b) {
    var c = Zv(this, b);
    if (a === 0) {
      var d, e;
      return [].concat(
        pa(
          (c == null
            ? void 0
            : (d = c._entity) == null
            ? void 0
            : d.internal) || []
        ),
        pa(
          (c == null
            ? void 0
            : (e = c._entity) == null
            ? void 0
            : e.external) || []
        )
      );
    }
    if (a === 1) {
      var f, g;
      return [].concat(
        pa(
          (c == null ? void 0 : (f = c._event) == null ? void 0 : f.internal) ||
            []
        ),
        pa(
          (c == null ? void 0 : (g = c._event) == null ? void 0 : g.external) ||
            []
        )
      );
    }
    return [];
  };
  Yv.prototype.getExternalRestrictions = function (a, b) {
    var c = Zv(this, b),
      d,
      e;
    return a === 0
      ? (c == null ? void 0 : (d = c._entity) == null ? void 0 : d.external) ||
          []
      : (c == null ? void 0 : (e = c._event) == null ? void 0 : e.external) ||
          [];
  };
  Yv.prototype.removeExternalRestrictions = function (a) {
    var b = Zv(this, a);
    b._event && (b._event.external = []);
    b._entity && (b._entity.external = []);
    this.D[a] = !0;
  };
  function Vv() {
    var a = hi.r;
    a || ((a = new Yv()), (hi.r = a));
    return a;
  }
  var $v = new RegExp(
      /^(.*\.)?(google|youtube|blogger|withgoogle)(\.com?)?(\.[a-z]{2})?\.?$/
    ),
    aw = {
      cl: ["ecl"],
      customPixels: ["nonGooglePixels"],
      ecl: ["cl"],
      ehl: ["hl"],
      gaawc: ["googtag"],
      hl: ["ehl"],
      html: [
        "customScripts",
        "customPixels",
        "nonGooglePixels",
        "nonGoogleScripts",
        "nonGoogleIframes",
      ],
      customScripts: [
        "html",
        "customPixels",
        "nonGooglePixels",
        "nonGoogleScripts",
        "nonGoogleIframes",
      ],
      nonGooglePixels: [],
      nonGoogleScripts: ["nonGooglePixels"],
      nonGoogleIframes: ["nonGooglePixels"],
    },
    bw = {
      cl: ["ecl"],
      customPixels: ["customScripts", "html"],
      ecl: ["cl"],
      ehl: ["hl"],
      gaawc: ["googtag"],
      hl: ["ehl"],
      html: ["customScripts"],
      customScripts: ["html"],
      nonGooglePixels: [
        "customPixels",
        "customScripts",
        "html",
        "nonGoogleScripts",
        "nonGoogleIframes",
      ],
      nonGoogleScripts: ["customScripts", "html"],
      nonGoogleIframes: ["customScripts", "html", "nonGoogleScripts"],
    },
    cw =
      "google customPixels customScripts html nonGooglePixels nonGoogleScripts nonGoogleIframes".split(
        " "
      );
  function dw() {
    var a = Gi("gtm.allowlist") || Gi("gtm.whitelist");
    a && O(9);
    mi && (a = ["google", "gtagfl", "lcl", "zone"]);
    $v.test(G.location && G.location.hostname) &&
      (mi
        ? O(116)
        : (O(117),
          ew &&
            ((a = []),
            window.console &&
              window.console.log &&
              window.console.log("GTM blocked. See go/13687728."))));
    var b = a && Gb(zb(a), aw),
      c = Gi("gtm.blocklist") || Gi("gtm.blacklist");
    c || ((c = Gi("tagTypeBlacklist")) && O(3));
    c ? O(8) : (c = []);
    $v.test(G.location && G.location.hostname) &&
      ((c = zb(c)),
      c.push("nonGooglePixels", "nonGoogleScripts", "sandboxedScripts"));
    zb(c).indexOf("google") >= 0 && O(2);
    var d = c && Gb(zb(c), bw),
      e = {};
    return function (f) {
      var g = f && f[Ke.oa];
      if (!g || typeof g !== "string") return !0;
      g = g.replace(/^_*/, "");
      if (e[g] !== void 0) return e[g];
      var k = wi[g] || [],
        m = !0;
      if (a) {
        var n;
        if ((n = m))
          a: {
            if (b.indexOf(g) < 0)
              if (k && k.length > 0)
                for (var p = 0; p < k.length; p++) {
                  if (b.indexOf(k[p]) < 0) {
                    O(11);
                    n = !1;
                    break a;
                  }
                }
              else {
                n = !1;
                break a;
              }
            n = !0;
          }
        m = n;
      }
      var q = !1;
      if (c) {
        var r = d.indexOf(g) >= 0;
        if (r) q = r;
        else {
          var t = ub(d, k || []);
          t && O(10);
          q = t;
        }
      }
      var u = !m || q;
      u ||
        !(k.indexOf("sandboxedScripts") >= 0) ||
        (b && b.indexOf("sandboxedScripts") !== -1) ||
        (u = ub(d, cw));
      return (e[g] = u);
    };
  }
  var ew = !1;
  ew = !0;
  function fw() {
    wj &&
      Uv(Ej(), function (a) {
        var b = wf(a.entityId),
          c;
        if (zf(b)) {
          var d = b[Ke.oa];
          if (!d)
            throw Error("Error: No function name given for function call.");
          var e = of[d];
          c = !!e && !!e.runInSiloedMode;
        } else c = !!Tv(b[Ke.oa], 4);
        return c;
      });
  }
  function gw(a, b, c, d, e) {
    if (!hw()) {
      var f = d.siloed ? zj(a) : a;
      if (!Qj(f)) {
        var g = "?id=" + encodeURIComponent(a) + "&l=" + gi.Ya,
          k = Hb(a, "GTM-");
        k || (g += "&cx=c");
        U(67) && (g += "&gtm=" + co());
        var m = dj();
        m && (g += "&sign=" + gi.Jf);
        var n = c ? "/gtag/js" : "/gtm.js",
          p = cj(b, n + g);
        if (!p) {
          var q = gi.Gd + n;
          m && tc && k
            ? ((q = tc.replace(/^(?:https?:\/\/)?/i, "").split(/[?#]/)[0]),
              (p = Br("https://", "http://", q + g)))
            : (p = zi.D ? Ai() + n + g : Br("https://", "http://", q + g));
        }
        d.siloed && Sj({ ctid: f, isDestination: !1 });
        var r = Hj();
        tj().container[f] = { state: 1, context: d, parent: r };
        sj({ ctid: f, isDestination: !1 }, e);
        Ac(p);
      }
    }
  }
  function iw(a, b, c, d) {
    if (!hw()) {
      var e = c.siloed ? zj(a) : a;
      if (!Rj(e))
        if (!c.siloed && Tj())
          (tj().destination[e] = {
            state: 0,
            transportUrl: b,
            context: c,
            parent: Hj(),
          }),
            sj({ ctid: e, isDestination: !0 }, d),
            O(91);
        else {
          var f =
            "/gtag/destination?id=" +
            encodeURIComponent(a) +
            "&l=" +
            gi.Ya +
            "&cx=c";
          U(67) && (f += "&gtm=" + co());
          dj() && (f += "&sign=" + gi.Jf);
          var g = cj(b, f);
          g || (g = zi.D ? Ai() + f : Br("https://", "http://", gi.Gd + f));
          c.siloed && Sj({ ctid: e, isDestination: !0 });
          tj().destination[e] = { state: 1, context: c, parent: Hj() };
          sj({ ctid: e, isDestination: !0 }, d);
          Ac(g);
        }
    }
  }
  function hw() {
    if (ao()) {
      return !0;
    }
    return !1;
  }
  var jw = [];
  function kw() {
    var a = Qf.ctid;
    if (a) {
      var b = vj.oe ? 1 : 0,
        c,
        d = Gj(Hj());
      c = d && d.context;
      return (
        a +
        ";" +
        Qf.canonicalContainerId +
        ";" +
        (c && c.fromContainerExecution ? 1 : 0) +
        ";" +
        ((c && c.source) || 0) +
        ";" +
        b
      );
    }
  }
  function lw() {
    var a = Yi(G.location.href);
    return a.hostname + a.pathname;
  }
  function mw() {
    var a = lw();
    a && bk("dl", encodeURIComponent(a));
    if (U(83)) {
      var b = kw();
      b && bk("tdp", b);
    } else
      bk("tdp", function () {
        return jw.length > 0 ? jw.join(".") : void 0;
      });
    var c = en(!0);
    c !== void 0 && bk("frm", String(c));
  }
  var nw = !1,
    ow = 0,
    pw = [];
  function qw(a) {
    if (!nw) {
      var b = H.createEventObject,
        c = H.readyState === "complete",
        d = H.readyState === "interactive";
      if (!a || a.type !== "readystatechange" || c || (!b && d)) {
        nw = !0;
        for (var e = 0; e < pw.length; e++) I(pw[e]);
      }
      pw.push = function () {
        for (var f = za.apply(0, arguments), g = 0; g < f.length; g++) I(f[g]);
        return 0;
      };
    }
  }
  function rw() {
    if (!nw && ow < 140) {
      ow++;
      try {
        var a, b;
        (b = (a = H.documentElement).doScroll) == null || b.call(a, "left");
        qw();
      } catch (c) {
        G.setTimeout(rw, 50);
      }
    }
  }
  function sw(a) {
    nw ? a() : pw.push(a);
  }
  function uw(a, b, c) {
    return {
      entityType: a,
      indexInOriginContainer: b,
      nameInOriginContainer: c,
      originContainerId: Cj(),
    };
  }
  var ww = function (a, b) {
      this.j = !1;
      this.K = [];
      this.eventData = { tags: [] };
      this.P = !1;
      this.D = this.H = 0;
      vw(this, a, b);
    },
    xw = function (a, b, c, d) {
      if (ji.hasOwnProperty(b) || b === "__zone") return -1;
      var e = {};
      Ta(d) && (e = h(d, e));
      e.id = c;
      e.status = "timeout";
      return a.eventData.tags.push(e) - 1;
    },
    yw = function (a, b, c, d) {
      var e = a.eventData.tags[b];
      e && ((e.status = c), (e.executionTime = d));
    },
    zw = function (a) {
      if (!a.j) {
        for (var b = a.K, c = 0; c < b.length; c++) b[c]();
        a.j = !0;
        a.K.length = 0;
      }
    },
    vw = function (a, b, c) {
      b !== void 0 && a.we(b);
      c &&
        G.setTimeout(function () {
          zw(a);
        }, Number(c));
    };
  ww.prototype.we = function (a) {
    var b = this,
      c = Eb(function () {
        I(function () {
          a(Cj(), b.eventData);
        });
      });
    this.j ? c() : this.K.push(c);
  };
  var Aw = function (a) {
      a.H++;
      return Eb(function () {
        a.D++;
        a.P && a.D >= a.H && zw(a);
      });
    },
    Bw = function (a) {
      a.P = !0;
      a.D >= a.H && zw(a);
    };
  var Cw = {},
    Ew = function () {
      return G[Dw()];
    };
  function Dw() {
    return G.GoogleAnalyticsObject || "ga";
  }
  var Hw = function () {
      var a = Cj();
    },
    Iw = function (a, b) {
      return function () {
        var c = Ew(),
          d = c && c.getByName && c.getByName(a);
        if (d) {
          var e = d.get("sendHitTask");
          d.set("sendHitTask", function (f) {
            var g = f.get("hitPayload"),
              k = f.get("hitCallback"),
              m = g.indexOf("&tid=" + b) < 0;
            m &&
              (f.set(
                "hitPayload",
                g.replace(/&tid=UA-[0-9]+-[0-9]+/, "&tid=" + b),
                !0
              ),
              f.set("hitCallback", void 0, !0));
            e(f);
            m &&
              (f.set("hitPayload", g, !0),
              f.set("hitCallback", k, !0),
              f.set("_x_19", void 0, !0),
              e(f));
          });
        }
      };
    };
  var Nw = ["es", "1"],
    Ow = {},
    Pw = {};
  function Qw(a, b) {
    if (mj) {
      var c;
      c = b.match(/^(gtm|gtag)\./) ? encodeURIComponent(b) : "*";
      Ow[a] = [
        ["e", c],
        ["eid", a],
      ];
      jm(a);
    }
  }
  function Rw(a) {
    var b = a.eventId,
      c = a.mc;
    if (!Ow[b]) return [];
    var d = [];
    Pw[b] || d.push(Nw);
    d.push.apply(d, pa(Ow[b]));
    c && (Pw[b] = !0);
    return d;
  }
  var Sw = {},
    Tw = {},
    Uw = {};
  function Vw(a, b, c, d) {
    mj &&
      U(76) &&
      ((d === void 0 ? 0 : d)
        ? ((Uw[b] = Uw[b] || 0), ++Uw[b])
        : c !== void 0
        ? ((Tw[a] = Tw[a] || {}), (Tw[a][b] = Math.round(c)))
        : ((Sw[a] = Sw[a] || {}), (Sw[a][b] = (Sw[a][b] || 0) + 1)));
  }
  function Ww(a) {
    var b = a.eventId,
      c = a.mc,
      d = Sw[b] || {},
      e = [],
      f;
    for (f in d) d.hasOwnProperty(f) && e.push("" + f + d[f]);
    c && delete Sw[b];
    return e.length ? [["md", e.join(".")]] : [];
  }
  function Xw(a) {
    var b = a.eventId,
      c = a.mc,
      d = Tw[b] || {},
      e = [],
      f;
    for (f in d) d.hasOwnProperty(f) && e.push("" + f + d[f]);
    c && delete Tw[b];
    return e.length ? [["mtd", e.join(".")]] : [];
  }
  function Yw() {
    for (
      var a = [], b = ma(Object.keys(Uw)), c = b.next();
      !c.done;
      c = b.next()
    ) {
      var d = c.value;
      a.push("" + d + Uw[d]);
    }
    return a.length ? [["mec", a.join(".")]] : [];
  }
  var Zw = {},
    $w = {};
  function ax(a, b, c) {
    if (mj && b) {
      var d = gj(b);
      Zw[a] = Zw[a] || [];
      Zw[a].push(c + d);
      var e = (zf(b) ? "1" : "2") + d;
      $w[a] = $w[a] || [];
      $w[a].push(e);
      jm(a);
    }
  }
  function bx(a) {
    var b = a.eventId,
      c = a.mc,
      d = [],
      e = Zw[b] || [];
    e.length && d.push(["tr", e.join(".")]);
    var f = $w[b] || [];
    f.length && d.push(["ti", f.join(".")]);
    c && (delete Zw[b], delete $w[b]);
    return d;
  }
  function cx(a, b, c, d) {
    var e = mf[a],
      f = dx(a, b, c, d);
    if (!f) return null;
    var g = Af(e[Ke.Dj], c, []);
    if (g && g.length) {
      var k = g[0];
      f = cx(
        k.index,
        {
          onSuccess: f,
          onFailure: k.Qj === 1 ? b.terminate : f,
          terminate: b.terminate,
        },
        c,
        d
      );
    }
    return f;
  }
  function dx(a, b, c, d) {
    function e() {
      function w() {
        Qk(3);
        var D = Cb() - E;
        ax(c.id, f, "7");
        yw(c.ic, A, "exception", D);
        U(68) && yv(c, f, Hu.M.Fj);
        C || ((C = !0), k());
      }
      if (f[Ke.Yk]) k();
      else {
        var x = yf(f, c, []),
          y = x[Ke.yk];
        if (y != null)
          for (var B = 0; B < y.length; B++)
            if (!W(y[B])) {
              k();
              return;
            }
        var A = xw(c.ic, String(f[Ke.oa]), Number(f[Ke.ve]), x[Ke.Zk]),
          C = !1;
        x.vtp_gtmOnSuccess = function () {
          if (!C) {
            C = !0;
            var D = Cb() - E;
            ax(c.id, mf[a], "5");
            yw(c.ic, A, "success", D);
            U(68) && yv(c, f, Hu.M.Hj);
            g();
          }
        };
        x.vtp_gtmOnFailure = function () {
          if (!C) {
            C = !0;
            var D = Cb() - E;
            ax(c.id, mf[a], "6");
            yw(c.ic, A, "failure", D);
            U(68) && yv(c, f, Hu.M.Gj);
            k();
          }
        };
        x.vtp_gtmTagId = f.tag_id;
        x.vtp_gtmEventId = c.id;
        c.priorityId && (x.vtp_gtmPriorityId = c.priorityId);
        ax(c.id, f, "1");
        U(68) && xv(c, f);
        var E = Cb();
        try {
          Bf(x, { event: c, index: a, type: 1 });
        } catch (D) {
          w(D);
        }
        U(68) && yv(c, f, Hu.M.Ij);
      }
    }
    var f = mf[a],
      g = b.onSuccess,
      k = b.onFailure,
      m = b.terminate;
    if (c.isBlocked(f)) return null;
    var n = Af(f[Ke.Jj], c, []);
    if (n && n.length) {
      var p = n[0],
        q = cx(p.index, { onSuccess: g, onFailure: k, terminate: m }, c, d);
      if (!q) return null;
      g = q;
      k = p.Qj === 2 ? m : q;
    }
    if (f[Ke.vj] || f[Ke.bl]) {
      var r = f[Ke.vj] ? nf : c.bn,
        t = g,
        u = k;
      if (!r[a]) {
        var v = ex(a, r, Eb(e));
        g = v.onSuccess;
        k = v.onFailure;
      }
      return function () {
        r[a](t, u);
      };
    }
    return e;
  }
  function ex(a, b, c) {
    var d = [],
      e = [];
    b[a] = fx(d, e, c);
    return {
      onSuccess: function () {
        b[a] = gx;
        for (var f = 0; f < d.length; f++) d[f]();
      },
      onFailure: function () {
        b[a] = hx;
        for (var f = 0; f < e.length; f++) e[f]();
      },
    };
  }
  function fx(a, b, c) {
    return function (d, e) {
      a.push(d);
      b.push(e);
      c();
    };
  }
  function gx(a) {
    a();
  }
  function hx(a, b) {
    b();
  }
  var kx = function (a, b) {
    for (var c = [], d = 0; d < mf.length; d++)
      if (a[d]) {
        var e = mf[d];
        var f = Aw(b.ic);
        try {
          var g = cx(d, { onSuccess: f, onFailure: f, terminate: f }, b, d);
          if (g) {
            var k = e[Ke.oa];
            if (!k)
              throw Error("Error: No function name given for function call.");
            var m = of[k];
            c.push({
              pk: d,
              fk: (m ? m.priorityOverride || 0 : 0) || Tv(e[Ke.oa], 1) || 0,
              execute: g,
            });
          } else ix(d, b), f();
        } catch (p) {
          f();
        }
      }
    c.sort(jx);
    for (var n = 0; n < c.length; n++) c[n].execute();
    return c.length > 0;
  };
  function jx(a, b) {
    var c,
      d = b.fk,
      e = a.fk;
    c = d > e ? 1 : d < e ? -1 : 0;
    var f;
    if (c !== 0) f = c;
    else {
      var g = a.pk,
        k = b.pk;
      f = g > k ? 1 : g < k ? -1 : 0;
    }
    return f;
  }
  function ix(a, b) {
    if (mj) {
      var c = function (d) {
        var e = b.isBlocked(mf[d]) ? "3" : "4",
          f = Af(mf[d][Ke.Dj], b, []);
        f && f.length && c(f[0].index);
        ax(b.id, mf[d], e);
        var g = Af(mf[d][Ke.Jj], b, []);
        g && g.length && c(g[0].index);
      };
      c(a);
    }
  }
  var nx = !1,
    lx;
  var tx = function (a) {
    var b = a["gtm.uniqueEventId"],
      c = a["gtm.priorityId"],
      d = a.event;
    if (U(68)) {
    }
    if (d === "gtm.js") {
      if (nx) return !1;
      nx = !0;
    }
    var e = !1,
      f = Xv(),
      g = h(a);
    if (
      !f.every(function (t) {
        return t({ originalEventData: g });
      })
    ) {
      if (d !== "gtm.js" && d !== "gtm.init" && d !== "gtm.init_consent")
        return !1;
      e = !0;
    }
    Qw(b, d);
    var k = a.eventCallback,
      m = a.eventTimeout,
      n = {
        id: b,
        priorityId: c,
        name: d,
        isBlocked: px(g, e),
        bn: [],
        logMacroError: function () {
          O(6);
          Qk(0);
        },
        cachedModelValues: qx(),
        ic: new ww(function () {
          if (U(68)) {
          }
          k && k.apply(k, [].slice.call(arguments, 0));
        }, m),
        originalEventData: g,
      };
    U(76) && mj && (n.reportMacroDiscrepancy = Vw);
    U(68) && tv(n.id, n.name);
    var p = Hf(n);
    U(68) && uv(n.id, n.name);
    e && (p = rx(p));
    if (U(68)) {
    }
    var q = kx(p, n),
      r = !1;
    Bw(n.ic);
    (d !== "gtm.js" && d !== "gtm.sync") || Hw();
    return sx(p, q) || r;
  };
  function qx() {
    var a = {};
    a.event = Li("event", 1);
    a.ecommerce = Li("ecommerce", 1);
    a.gtm = Li("gtm");
    a.eventModel = Li("eventModel");
    return a;
  }
  function px(a, b) {
    var c = dw();
    return function (d) {
      if (c(d)) return !0;
      var e = d && d[Ke.oa];
      if (!e || typeof e != "string") return !0;
      e = e.replace(/^_*/, "");
      var f,
        g = Ej();
      f = Vv().getRestrictions(0, g);
      var k = a;
      b && ((k = h(a)), (k["gtm.uniqueEventId"] = Number.MAX_SAFE_INTEGER));
      for (
        var m = wi[e] || [], n = ma(f), p = n.next();
        !p.done;
        p = n.next()
      ) {
        var q = p.value;
        try {
          if (!q({ entityId: e, securityGroups: m, originalEventData: k }))
            return !0;
        } catch (r) {
          return !0;
        }
      }
      return !1;
    };
  }
  function rx(a) {
    for (var b = [], c = 0; c < a.length; c++)
      if (a[c]) {
        var d = String(mf[c][Ke.oa]);
        if (ii[d] || mf[c][Ke.fl] !== void 0 || Tv(d, 2)) b[c] = !0;
      }
    return b;
  }
  function sx(a, b) {
    if (!b) return b;
    for (var c = 0; c < a.length; c++)
      if (a[c] && mf[c] && !ji[String(mf[c][Ke.oa])]) return !0;
    return !1;
  }
  var ux = 0;
  function vx(a, b) {
    return arguments.length === 1 ? wx("set", a) : wx("set", a, b);
  }
  function xx(a, b) {
    return arguments.length === 1 ? wx("config", a) : wx("config", a, b);
  }
  function Dx(a, b, c) {
    c = c || {};
    c[P.g.ac] = a;
    return wx("event", b, c);
  }
  function wx() {
    return arguments;
  }
  var Ex = function () {
    this.messages = [];
    this.j = [];
  };
  Ex.prototype.enqueue = function (a, b, c) {
    var d = this.messages.length + 1;
    a["gtm.uniqueEventId"] = b;
    a["gtm.priorityId"] = d;
    var e = Object.assign({}, c, {
        eventId: b,
        priorityId: d,
        fromContainerExecution: !0,
      }),
      f = { message: a, notBeforeEventId: b, priorityId: d, messageContext: e };
    this.messages.push(f);
    for (var g = 0; g < this.j.length; g++)
      try {
        this.j[g](f);
      } catch (k) {}
  };
  Ex.prototype.listen = function (a) {
    this.j.push(a);
  };
  Ex.prototype.get = function () {
    for (var a = {}, b = 0; b < this.messages.length; b++) {
      var c = this.messages[b],
        d = a[c.notBeforeEventId];
      d || ((d = []), (a[c.notBeforeEventId] = d));
      d.push(c);
    }
    return a;
  };
  Ex.prototype.prune = function (a) {
    for (var b = [], c = [], d = 0; d < this.messages.length; d++) {
      var e = this.messages[d];
      e.notBeforeEventId === a ? b.push(e) : c.push(e);
    }
    this.messages = c;
    return b;
  };
  function Fx(a, b, c) {
    c.eventMetadata = c.eventMetadata || {};
    c.eventMetadata.source_canonical_id = Qf.canonicalContainerId;
    Gx().enqueue(a, b, c);
  }
  function Hx() {
    var a = Ix;
    Gx().listen(a);
  }
  function Gx() {
    var a = hi.mb;
    a || ((a = new Ex()), (hi.mb = a));
    return a;
  }
  var Mf;
  var Jx = {},
    Kx = {};
  function Lx(a, b) {
    for (
      var c = [], d = [], e = {}, f = 0;
      f < a.length;
      e = { Oh: void 0, wh: void 0 }, f++
    ) {
      var g = a[f];
      if (g.indexOf("-") >= 0) {
        if (((e.Oh = pl(g, b)), e.Oh)) {
          var k = Aj();
          sb(
            k,
            (function (r) {
              return function (t) {
                return r.Oh.ia === t;
              };
            })(e)
          )
            ? c.push(g)
            : d.push(g);
        }
      } else {
        var m = Jx[g] || [];
        e.wh = {};
        m.forEach(
          (function (r) {
            return function (t) {
              r.wh[t] = !0;
            };
          })(e)
        );
        for (var n = xj(), p = 0; p < n.length; p++)
          if (e.wh[n[p]]) {
            c = c.concat(Aj());
            break;
          }
        var q = Kx[g] || [];
        q.length && (c = c.concat(q));
      }
    }
    return { vm: c, ym: d };
  }
  function Mx(a) {
    z(Jx, function (b, c) {
      var d = c.indexOf(a);
      d >= 0 && c.splice(d, 1);
    });
  }
  function Nx(a) {
    z(Kx, function (b, c) {
      var d = c.indexOf(a);
      d >= 0 && c.splice(d, 1);
    });
  }
  var Ox = "HA GF G UA AW DC MC".split(" "),
    Px = !1,
    Qx = !1,
    Rx = !1,
    Sx = !1;
  function Tx(a, b) {
    a.hasOwnProperty("gtm.uniqueEventId") ||
      Object.defineProperty(a, "gtm.uniqueEventId", { value: xi() });
    b.eventId = a["gtm.uniqueEventId"];
    b.priorityId = a["gtm.priorityId"];
    return { eventId: b.eventId, priorityId: b.priorityId };
  }
  var Ux = void 0,
    Vx = void 0;
  function Wx(a, b, c) {
    var d = h(a, null);
    d.eventId = void 0;
    d.inheritParentConfig = void 0;
    Object.keys(b).some(function (f) {
      return b[f] !== void 0;
    }) && O(136);
    var e = h(b, null);
    h(c, e);
    Fx(xx(xj()[0], e), a.eventId, d);
  }
  function Xx(a) {
    for (var b = ma([P.g.jd, P.g.Nb]), c = b.next(); !c.done; c = b.next()) {
      var d = c.value,
        e = (a && a[d]) || rm.D[d];
      if (e) return e;
    }
  }
  var Yx = [
      P.g.jd,
      P.g.Nb,
      P.g.yc,
      P.g.pb,
      P.g.wb,
      P.g.Ba,
      P.g.sa,
      P.g.Pa,
      P.g.Wa,
      P.g.Hb,
    ],
    Zx = {
      config: function (a, b) {
        var c = Tx(a, b);
        if (!(a.length < 2) && l(a[1])) {
          var d = {};
          if (a.length > 2) {
            if ((a[2] !== void 0 && !Ta(a[2])) || a.length > 3) return;
            d = a[2];
          }
          var e = pl(a[1], b.isGtmEvent);
          if (e) {
            var f, g, k;
            a: {
              if (!vj.oe) {
                var m = Gj(Hj());
                if (Vj(m)) {
                  var n = m.parent,
                    p = n.isDestination;
                  k = { Fm: Gj(n), sm: p };
                  break a;
                }
              }
              k = void 0;
            }
            var q = k;
            q && ((f = q.Fm), (g = q.sm));
            Qw(c.eventId, "gtag.config");
            var r = e.ia,
              t = e.id !== r;
            if (t ? Aj().indexOf(r) === -1 : xj().indexOf(r) === -1) {
              if (!b.inheritParentConfig && !d[P.g.Kb]) {
                var u = Xx(d);
                if (t)
                  iw(r, u, {
                    source: 2,
                    fromContainerExecution: b.fromContainerExecution,
                  });
                else if (f !== void 0 && f.containers.indexOf(r) !== -1) {
                  var v = d;
                  Ux ? Wx(b, v, Ux) : Vx || (Vx = h(v, null));
                } else
                  gw(r, u, !0, {
                    source: 2,
                    fromContainerExecution: b.fromContainerExecution,
                  });
              }
            } else {
              if (f && (O(128), g && O(130), b.inheritParentConfig)) {
                var w;
                var x = d;
                Vx
                  ? (Wx(b, Vx, x), (w = !1))
                  : ((!x[P.g.bc] && li && Ux) || (Ux = h(x, null)), (w = !0));
                w && f.containers && f.containers.join(",");
                return;
              }
              var y = d;
              if (!Rx && ((Rx = !0), Qx))
                for (var B = ma(Yx), A = B.next(); !A.done; A = B.next())
                  if (y.hasOwnProperty(A.value)) {
                    Pk("erc");
                    break;
                  }
              nj && !wj && (ux === 1 && (Zj.mcc = !1), (ux = 2));
              Mk = !0;
              if (li && !t && !d[P.g.bc]) {
                var C = Sx;
                Sx = !0;
                if (C) return;
              }
              Px || O(43);
              if (!b.noTargetGroup)
                if (t) {
                  Nx(e.id);
                  var E = e.id,
                    D = d[P.g.Zd] || "default";
                  D = String(D).split(",");
                  for (var F = 0; F < D.length; F++) {
                    var L = Kx[D[F]] || [];
                    Kx[D[F]] = L;
                    L.indexOf(E) < 0 && L.push(E);
                  }
                } else {
                  Mx(e.id);
                  var M = e.id,
                    R = d[P.g.Zd] || "default";
                  R = R.toString().split(",");
                  for (var V = 0; V < R.length; V++) {
                    var aa = Jx[R[V]] || [];
                    Jx[R[V]] = aa;
                    aa.indexOf(M) < 0 && aa.push(M);
                  }
                }
              delete d[P.g.Zd];
              var X = b.eventMetadata || {};
              X.hasOwnProperty("is_external_event") ||
                (X.is_external_event = !b.fromContainerExecution);
              b.eventMetadata = X;
              delete d[P.g.bd];
              for (var S = t ? [e.id] : Aj(), na = 0; na < S.length; na++) {
                var la = d,
                  ha = S[na],
                  ya = h(b, null),
                  Na = pl(ha, ya.isGtmEvent);
                Na && rm.push("config", [la], Na, ya);
              }
            }
          }
        }
      },
      consent: function (a, b) {
        if (a.length === 3) {
          O(39);
          var c = Tx(a, b),
            d = a[1],
            e = a[2];
          b.fromContainerExecution || (e[P.g.O] && O(139), e[P.g.ya] && O(140));
          d === "default"
            ? cl(e)
            : d === "update"
            ? el(e, c)
            : d === "declare" && b.fromContainerExecution && bl(e);
        }
      },
      event: function (a, b) {
        var c = a[1];
        if (!(a.length < 2) && l(c)) {
          var d = void 0;
          if (a.length > 2) {
            if ((!Ta(a[2]) && a[2] !== void 0) || a.length > 3) return;
            d = a[2];
          }
          var e = d,
            f = {},
            g = ((f.event = c), f);
          e &&
            ((g.eventModel = h(e, null)),
            e[P.g.bd] && (g.eventCallback = e[P.g.bd]),
            e[P.g.Wd] && (g.eventTimeout = e[P.g.Wd]));
          var k = Tx(a, b),
            m = k.eventId,
            n = k.priorityId;
          g["gtm.uniqueEventId"] = m;
          n && (g["gtm.priorityId"] = n);
          if (c === "optimize.callback")
            return (g.eventModel = g.eventModel || {}), g;
          var p;
          var q = d,
            r = q && q[P.g.ac];
          r === void 0 &&
            ((r = Gi(P.g.ac, 2)), r === void 0 && (r = "default"));
          if (l(r) || Array.isArray(r)) {
            var t;
            t = b.isGtmEvent
              ? l(r)
                ? [r]
                : r
              : r.toString().replace(/\s+/g, "").split(",");
            var u = Lx(t, b.isGtmEvent),
              v = u.vm,
              w = u.ym;
            if (w.length)
              for (var x = Xx(q), y = 0; y < w.length; y++) {
                var B = pl(w[y], b.isGtmEvent);
                B &&
                  iw(B.ia, x, {
                    source: 3,
                    fromContainerExecution: b.fromContainerExecution,
                  });
              }
            p = ql(v, b.isGtmEvent);
          } else p = void 0;
          var A = p;
          if (A) {
            var C;
            !A.length ||
              ((C = b.eventMetadata) == null ? 0 : C.em_event) ||
              (Qx = !0);
            Qw(m, c);
            for (var E = [], D = 0; D < A.length; D++) {
              var F = A[D],
                L = h(b, null);
              if (Ox.indexOf(Ij(F.prefix)) !== -1) {
                var M = h(d, null),
                  R = L.eventMetadata || {};
                R.hasOwnProperty("is_external_event") ||
                  (R.is_external_event = !L.fromContainerExecution);
                L.eventMetadata = R;
                delete M[P.g.bd];
                sm(c, M, F.id, L);
                nj && !wj && ux === 0 && (bk("mcc", "1"), (ux = 1));
                Mk = !0;
              }
              E.push(F.id);
            }
            g.eventModel = g.eventModel || {};
            A.length > 0
              ? (g.eventModel[P.g.ac] = E.join())
              : delete g.eventModel[P.g.ac];
            Px || O(43);
            b.noGtmEvent === void 0 &&
              b.eventMetadata &&
              b.eventMetadata.syn_or_mod &&
              (b.noGtmEvent = !0);
            g.eventModel[P.g.Yb] && (b.noGtmEvent = !0);
            return b.noGtmEvent ? void 0 : g;
          }
        }
      },
      get: function (a, b) {
        O(53);
        if (a.length === 4 && l(a[1]) && l(a[2]) && pb(a[3])) {
          var c = pl(a[1], b.isGtmEvent),
            d = String(a[2]),
            e = a[3];
          if (c) {
            Px || O(43);
            var f = Xx();
            if (
              !sb(Aj(), function (k) {
                return c.ia === k;
              })
            )
              iw(c.ia, f, {
                source: 4,
                fromContainerExecution: b.fromContainerExecution,
              });
            else if (Ox.indexOf(Ij(c.prefix)) !== -1) {
              Mk = !0;
              Tx(a, b);
              var g = {};
              h(((g[P.g.tb] = d), (g[P.g.Ib] = e), g), null);
              tm(
                d,
                function (k) {
                  I(function () {
                    e(k);
                  });
                },
                c.id,
                b
              );
            }
          }
        }
      },
      js: function (a, b) {
        if (a.length === 2 && a[1].getTime) {
          Px = !0;
          var c = Tx(a, b),
            d = c.eventId,
            e = c.priorityId,
            f = {};
          return (
            (f.event = "gtm.js"),
            (f["gtm.start"] = a[1].getTime()),
            (f["gtm.uniqueEventId"] = d),
            (f["gtm.priorityId"] = e),
            f
          );
        }
      },
      policy: function (a) {
        if (a.length === 3 && l(a[1]) && pb(a[2])) {
          if ((Nf(a[1], a[2]), O(74), a[1] === "all")) {
            O(75);
            var b = !1;
            try {
              b = a[2](Cj(), "unknown", {});
            } catch (c) {}
            b || O(76);
          }
        } else O(73);
      },
      set: function (a, b) {
        var c = void 0;
        a.length === 2 && Ta(a[1])
          ? (c = h(a[1], null))
          : a.length === 3 &&
            l(a[1]) &&
            ((c = {}),
            Ta(a[2]) || Array.isArray(a[2])
              ? (c[a[1]] = h(a[2], null))
              : (c[a[1]] = a[2]));
        if (c) {
          var d = Tx(a, b),
            e = d.eventId,
            f = d.priorityId;
          h(c, null);
          var g = h(c, null);
          rm.push("set", [g], void 0, b);
          c["gtm.uniqueEventId"] = e;
          f && (c["gtm.priorityId"] = f);
          delete c.event;
          b.overwriteModelFields = !0;
          return c;
        }
      },
    },
    $x = { policy: !0 };
  var by = function (a) {
    if (ay(a)) return a;
    this.value = a;
  };
  by.prototype.getUntrustedMessageValue = function () {
    return this.value;
  };
  var ay = function (a) {
    return !a || Qa(a) !== "object" || Ta(a)
      ? !1
      : "getUntrustedMessageValue" in a;
  };
  by.prototype.getUntrustedMessageValue = by.prototype.getUntrustedMessageValue;
  var cy = !1,
    dy = [];
  function ey() {
    if (!cy) {
      cy = !0;
      for (var a = 0; a < dy.length; a++) I(dy[a]);
    }
  }
  function fy(a) {
    cy ? I(a) : dy.push(a);
  }
  var gy = 0,
    hy = {},
    iy = [],
    jy = [],
    ky = !1,
    ly = !1;
  function my(a, b) {
    return (
      a.messageContext.eventId - b.messageContext.eventId ||
      a.messageContext.priorityId - b.messageContext.priorityId
    );
  }
  var ny = function (a) {
      return G[gi.Ya].push(a);
    },
    oy = function (a, b, c) {
      a.eventCallback = b;
      c && (a.eventTimeout = c);
      return ny(a);
    },
    py = function (a, b) {
      if (!qb(b) || b < 0) b = 0;
      var c = hi[gi.Ya],
        d = 0,
        e = !1,
        f = void 0;
      f = G.setTimeout(function () {
        e || ((e = !0), a());
        f = void 0;
      }, b);
      return function () {
        var g = c ? c.subscribers : 1;
        ++d === g &&
          (f && (G.clearTimeout(f), (f = void 0)), e || (a(), (e = !0)));
      };
    };
  function qy(a, b) {
    var c = a._clear || b.overwriteModelFields;
    z(a, function (e, f) {
      e !== "_clear" && (c && Ji(e), Ji(e, f));
    });
    ti || (ti = a["gtm.start"]);
    var d = a["gtm.uniqueEventId"];
    if (!a.event) return !1;
    typeof d !== "number" &&
      ((d = xi()), (a["gtm.uniqueEventId"] = d), Ji("gtm.uniqueEventId", d));
    return tx(a);
  }
  function ry(a) {
    if (a == null || typeof a !== "object") return !1;
    if (a.event) return !0;
    if (wb(a)) {
      var b = a[0];
      if (b === "config" || b === "event" || b === "js" || b === "get")
        return !0;
    }
    return !1;
  }
  function sy() {
    var a;
    if (jy.length) a = jy.shift();
    else if (iy.length) a = iy.shift();
    else return;
    var b;
    var c = a;
    if (ky || !ry(c.message)) b = c;
    else {
      ky = !0;
      var d = c.message["gtm.uniqueEventId"];
      typeof d !== "number" && (d = c.message["gtm.uniqueEventId"] = xi());
      var e = {},
        f = {
          message:
            ((e.event = "gtm.init_consent"),
            (e["gtm.uniqueEventId"] = d - 2),
            e),
          messageContext: { eventId: d - 2 },
        },
        g = {},
        k = {
          message:
            ((g.event = "gtm.init"), (g["gtm.uniqueEventId"] = d - 1), g),
          messageContext: { eventId: d - 1 },
        };
      iy.unshift(k, c);
      if (nj) {
        if (!U(83)) {
          var m = kw();
          m && jw.push(m);
        }
        fk();
      }
      b = f;
    }
    return b;
  }
  function ty() {
    for (var a = !1, b; !ly && (b = sy()); ) {
      ly = !0;
      delete Di.eventModel;
      Fi();
      var c = b,
        d = c.message,
        e = c.messageContext;
      if (d == null) ly = !1;
      else {
        e.fromContainerExecution && Ki();
        try {
          if (pb(d))
            try {
              d.call(Hi);
            } catch (v) {}
          else if (Array.isArray(d)) {
            var f = d;
            if (l(f[0])) {
              var g = f[0].split("."),
                k = g.pop(),
                m = f.slice(1),
                n = Gi(g.join("."), 2);
              if (n != null)
                try {
                  n[k].apply(n, m);
                } catch (v) {}
            }
          } else {
            var p = void 0;
            if (wb(d))
              a: {
                if (d.length && l(d[0])) {
                  var q = Zx[d[0]];
                  if (q && (!e.fromContainerExecution || !$x[d[0]])) {
                    p = q(d, e);
                    break a;
                  }
                }
                p = void 0;
              }
            else p = d;
            p && (a = qy(p, e) || a);
          }
        } finally {
          e.fromContainerExecution && Fi(!0);
          var r = d["gtm.uniqueEventId"];
          if (typeof r === "number") {
            for (var t = hy[String(r)] || [], u = 0; u < t.length; u++)
              jy.push(uy(t[u]));
            t.length && jy.sort(my);
            delete hy[String(r)];
            r > gy && (gy = r);
          }
          ly = !1;
        }
      }
    }
    return !a;
  }
  function vy() {
    if (U(68)) {
      var a = wy();
    }
    var b = ty();
    if (U(68)) {
    }
    try {
      var c = Cj(),
        d = G[gi.Ya].hide;
      if (d && d[c] !== void 0 && d.end) {
        d[c] = !1;
        var e = !0,
          f;
        for (f in d)
          if (d.hasOwnProperty(f) && d[f] === !0) {
            e = !1;
            break;
          }
        e && (d.end(), (d.end = null));
      }
    } catch (g) {}
    return b;
  }
  function Ix(a) {
    if (gy < a.notBeforeEventId) {
      var b = String(a.notBeforeEventId);
      hy[b] = hy[b] || [];
      hy[b].push(a);
    } else
      jy.push(uy(a)),
        jy.sort(my),
        I(function () {
          ly || ty();
        });
  }
  function uy(a) {
    return { message: a.message, messageContext: a.messageContext };
  }
  var xy = function () {
      function a(f) {
        var g = {};
        if (ay(f)) {
          var k = f;
          f = ay(k) ? k.getUntrustedMessageValue() : void 0;
          g.fromContainerExecution = !0;
        }
        return { message: f, messageContext: g };
      }
      var b = uc(gi.Ya, []),
        c = (hi[gi.Ya] = hi[gi.Ya] || {});
      c.pruned === !0 && O(83);
      hy = Gx().get();
      Hx();
      sw(function () {
        if (!c.gtmDom) {
          c.gtmDom = !0;
          var f = {};
          b.push(((f.event = "gtm.dom"), f));
        }
      });
      fy(function () {
        if (!c.gtmLoad) {
          c.gtmLoad = !0;
          var f = {};
          b.push(((f.event = "gtm.load"), f));
        }
      });
      c.subscribers = (c.subscribers || 0) + 1;
      var d = b.push;
      b.push = function () {
        var f;
        if (hi.SANDBOXED_JS_SEMAPHORE > 0) {
          f = [];
          for (var g = 0; g < arguments.length; g++)
            f[g] = new by(arguments[g]);
        } else f = [].slice.call(arguments, 0);
        var k = f.map(function (q) {
          return a(q);
        });
        iy.push.apply(iy, k);
        var m = d.apply(b, f),
          n = Math.max(100, Number("1000") || 300);
        if (this.length > n)
          for (O(4), c.pruned = !0; this.length > n; ) this.shift();
        var p = typeof m !== "boolean" || m;
        return ty() && p;
      };
      var e = b.slice(0).map(function (f) {
        return a(f);
      });
      iy.push.apply(iy, e);
      if (wy()) {
        if (U(68)) {
        }
        I(vy);
      }
    },
    wy = function () {
      var a = !0;
      return a;
    };
  function yy(a) {
    if (a == null || a.length === 0) return !1;
    var b = Number(a),
      c = Cb();
    return b < c + 3e5 && b > c - 9e5;
  }
  function zy(a) {
    return a && a.indexOf("pending:") === 0 ? yy(a.substr(8)) : !1;
  }
  var Uy = function () {};
  var Vy = function () {};
  Vy.prototype.toString = function () {
    return "undefined";
  };
  var Wy = new Vy();
  function cz(a, b) {
    function c(g) {
      var k = Yi(g),
        m = Si(k, "protocol"),
        n = Si(k, "host", !0),
        p = Si(k, "port"),
        q = Si(k, "path").toLowerCase().replace(/\/$/, "");
      if (
        m === void 0 ||
        (m === "http" && p === "80") ||
        (m === "https" && p === "443")
      )
        (m = "web"), (p = "default");
      return [m, n, p, q];
    }
    for (var d = c(String(a)), e = c(String(b)), f = 0; f < d.length; f++)
      if (d[f] !== e[f]) return !1;
    return !0;
  }
  function dz(a) {
    return ez(a) ? 1 : 0;
  }
  function ez(a) {
    var b = a.arg0,
      c = a.arg1;
    if (a.any_of && Array.isArray(c)) {
      for (var d = 0; d < c.length; d++) {
        var e = h(a, {});
        h({ arg1: c[d], any_of: void 0 }, e);
        if (dz(e)) return !0;
      }
      return !1;
    }
    switch (a["function"]) {
      case "_cn":
        return pg(b, c);
      case "_css":
        var f;
        a: {
          if (b)
            try {
              for (var g = 0; g < lg.length; g++) {
                var k = lg[g];
                if (b[k] != null) {
                  f = b[k](c);
                  break a;
                }
              }
            } catch (m) {}
          f = !1;
        }
        return f;
      case "_ew":
        return mg(b, c);
      case "_eq":
        return qg(b, c);
      case "_ge":
        return rg(b, c);
      case "_gt":
        return tg(b, c);
      case "_lc":
        return String(b).split(",").indexOf(String(c)) >= 0;
      case "_le":
        return sg(b, c);
      case "_lt":
        return ug(b, c);
      case "_re":
        return og(b, c, a.ignore_case);
      case "_sw":
        return vg(b, c);
      case "_um":
        return cz(b, c);
    }
    return !1;
  }
  function fz() {
    var a;
    a = a === void 0 ? "" : a;
    var b, c;
    return (
      (b = data) == null ? 0 : (c = b.blob) == null ? 0 : c.hasOwnProperty(1)
    )
      ? String(data.blob[1])
      : a;
  }
  function gz() {
    var a = [
      ["cv", U(90) ? fz() : "2"],
      ["rv", gi.Vg],
      [
        "tc",
        mf.filter(function (b) {
          return b;
        }).length,
      ],
    ];
    gi.se && a.push(["x", gi.se]);
    zi.j && a.push(["tag_exp", zi.j]);
    return a;
  }
  var hz = {},
    iz = {};
  function jz() {
    var a = 0;
    return function (b) {
      switch (b) {
        case 1:
          a |= 1;
          break;
        case 2:
          a |= 2;
          break;
        case 3:
          a |= 4;
      }
      return a;
    };
  }
  function kz(a, b, c, d) {
    if (mj) {
      var e = String(c) + b;
      hz[a] = hz[a] || [];
      hz[a].push(e);
      iz[a] = iz[a] || [];
      iz[a].push(d + b);
    }
  }
  function lz(a) {
    var b = a.eventId,
      c = a.mc,
      d = [],
      e = hz[b] || [];
    e.length && d.push(["hf", e.join(".")]);
    var f = iz[b] || [];
    f.length && d.push(["ht", f.join(".")]);
    c && (delete hz[b], delete iz[b]);
    return d;
  }
  function mz() {
    return !1;
  }
  function nz() {
    var a = {};
    return function (b, c, d) {};
  }
  function oz() {
    var a = pz;
    return function (b, c, d) {
      var e = d && d.event;
      qz(c);
      var f = Hb(b, "__cvt_") ? void 0 : 1,
        g = new Za();
      z(c, function (r, t) {
        var u = fd(t, void 0, f);
        u === void 0 && t !== void 0 && O(44);
        g.set(r, u);
      });
      a.j.j.D = Ff();
      var k = {
        Nj: Uf(b),
        eventId: e == null ? void 0 : e.id,
        priorityId: e !== void 0 ? e.priorityId : void 0,
        we:
          e !== void 0
            ? function (r) {
                e.ic.we(r);
              }
            : void 0,
        hb: function () {
          return b;
        },
        log: function () {},
        Il: {
          index: d == null ? void 0 : d.index,
          type: d == null ? void 0 : d.type,
          name: d == null ? void 0 : d.name,
        },
        Pm: !!Tv(b, 3),
        originalEventData: e == null ? void 0 : e.originalEventData,
      };
      e &&
        e.cachedModelValues &&
        (k.cachedModelValues = {
          gtm: e.cachedModelValues.gtm,
          ecommerce: e.cachedModelValues.ecommerce,
        });
      if (mz()) {
        var m = nz(),
          n,
          p;
        k.Ta = {
          Zh: [],
          xe: {},
          zb: function (r, t, u) {
            t === 1 && (n = r);
            t === 7 && (p = u);
            m(r, t, u);
          },
          Tf: dh(),
        };
        k.log = function (r) {
          var t = za.apply(1, arguments);
          n && m(n, 4, { level: r, source: p, message: t });
        };
      }
      var q = Ee(a, k, [b, g]);
      a.j.j.D = void 0;
      q instanceof Ca && q.type === "return" && (q = q.data);
      return J(q, void 0, f);
    };
  }
  function qz(a) {
    var b = a.gtmOnSuccess,
      c = a.gtmOnFailure;
    pb(b) &&
      (a.gtmOnSuccess = function () {
        I(b);
      });
    pb(c) &&
      (a.gtmOnFailure = function () {
        I(c);
      });
  }
  function rz(a, b) {
    var c = this;
  }
  rz.T = "addConsentListener";
  var sz = !1;
  function tz(a) {
    for (var b = 0; b < a.length; ++b)
      if (sz)
        try {
          a[b]();
        } catch (c) {
          O(77);
        }
      else a[b]();
  }
  function uz(a, b, c) {
    var d = this,
      e;
    return e;
  }
  uz.J = "internal.addDataLayerEventListener";
  function vz(a, b, c) {}
  vz.T = "addDocumentEventListener";
  function wz(a, b, c, d) {}
  wz.T = "addElementEventListener";
  function xz(a) {
    return a.F.j;
  }
  function yz(a) {}
  yz.T = "addEventCallback";
  var zz = function (a) {
      return typeof a === "string" ? a : String(xi());
    },
    Cz = function (a, b) {
      Az(a, "init", !1) || (Bz(a, "init", !0), b());
    },
    Az = function (a, b, c) {
      var d = Dz(a);
      return Db(d, b, c);
    },
    Ez = function (a, b, c, d) {
      var e = Dz(a),
        f = Db(e, b, d);
      e[b] = c(f);
    },
    Bz = function (a, b, c) {
      Dz(a)[b] = c;
    },
    Dz = function (a) {
      hi.hasOwnProperty("autoEventsSettings") || (hi.autoEventsSettings = {});
      var b = hi.autoEventsSettings;
      b.hasOwnProperty(a) || (b[a] = {});
      return b[a];
    },
    Fz = function (a, b, c) {
      var d = {
        event: b,
        "gtm.element": a,
        "gtm.elementClasses": Pc(a, "className"),
        "gtm.elementId": a["for"] || Gc(a, "id") || "",
        "gtm.elementTarget": a.formTarget || Pc(a, "target") || "",
      };
      c && (d["gtm.triggers"] = c.join(","));
      d["gtm.elementUrl"] =
        (a.attributes && a.attributes.formaction ? a.formAction : "") ||
        a.action ||
        Pc(a, "href") ||
        a.src ||
        a.code ||
        a.codebase ||
        "";
      return d;
    };
  function Oz(a) {}
  Oz.J = "internal.addFormAbandonmentListener";
  function Pz(a, b, c, d) {}
  Pz.J = "internal.addFormData";
  var Qz = {},
    Rz = [],
    Sz = {},
    Tz = 0,
    Uz = 0;
  function aA(a, b) {}
  aA.J = "internal.addFormInteractionListener";
  function hA(a, b) {}
  hA.J = "internal.addFormSubmitListener";
  function mA(a) {}
  mA.J = "internal.addGaSendListener";
  function nA(a) {
    if (!a) return {};
    var b = a.Il;
    return uw(b.type, b.index, b.name);
  }
  function oA(a) {
    return a ? { originatingEntity: nA(a) } : {};
  }
  function wA(a) {
    var b = hi.zones;
    return b
      ? b.getIsAllowedFn(xj(), a)
      : function () {
          return !0;
        };
  }
  function xA() {
    Wv(Ej(), function (a) {
      var b = a.originalEventData["gtm.uniqueEventId"],
        c = hi.zones;
      return c ? c.isActive(xj(), b) : !0;
    });
    Uv(Ej(), function (a) {
      var b, c;
      b = a.entityId;
      c = a.securityGroups;
      return wA(Number(a.originalEventData["gtm.uniqueEventId"]))(b, c);
    });
  }
  var yA = function (a, b) {
    this.tagId = a;
    this.ze = b;
  };
  function zA(a, b) {
    var c = this,
      d;
    return d;
  }
  zA.J = "internal.loadGoogleTag";
  function AA(a) {
    return new Yc("", function (b) {
      var c = this.evaluate(b);
      if (c instanceof Yc)
        return new Yc("", function () {
          var d = za.apply(0, arguments),
            e = this,
            f = h(xz(this), null);
          f.eventId = a.eventId;
          f.priorityId = a.priorityId;
          f.originalEventData = a.originalEventData;
          var g = d.map(function (m) {
              return e.evaluate(m);
            }),
            k = Ia(this.F);
          k.j = f;
          return c.jb.apply(c, [k].concat(pa(g)));
        });
    });
  }
  function BA(a, b, c) {
    var d = this;
  }
  BA.J = "internal.addGoogleTagRestriction";
  var CA = {},
    DA = [];
  function KA(a, b) {}
  KA.J = "internal.addHistoryChangeListener";
  function LA(a, b, c) {}
  LA.T = "addWindowEventListener";
  function MA(a, b) {
    return !0;
  }
  MA.T = "aliasInWindow";
  function NA(a, b, c) {}
  NA.J = "internal.appendRemoteConfigParameter";
  function OA(a) {
    var b;
    return b;
  }
  OA.T = "callInWindow";
  function PA(a) {}
  PA.T = "callLater";
  function QA(a) {}
  QA.J = "callOnDomReady";
  function RA(a) {}
  RA.J = "callOnWindowLoad";
  function SA(a, b) {
    var c;
    return c;
  }
  SA.J = "internal.computeGtmParameter";
  function TA(a) {
    var b;
    return b;
  }
  TA.J = "internal.copyFromCrossContainerData";
  function UA(a, b) {
    var c;
    var d = fd(c, this.F, Hb(xz(this).hb(), "__cvt_") ? 2 : 1);
    d === void 0 && c !== void 0 && O(45);
    return d;
  }
  UA.T = "copyFromDataLayer";
  function VA(a) {
    var b = void 0;
    return b;
  }
  VA.J = "internal.copyFromDataLayerCache";
  function WA(a) {
    var b;
    return b;
  }
  WA.T = "copyFromWindow";
  function XA(a) {
    var b = void 0;
    return fd(b, this.F, 1);
  }
  XA.J = "internal.copyKeyFromWindow";
  var YA = function (a, b, c) {
    this.eventName = b;
    this.m = c;
    this.o = {};
    this.isAborted = !1;
    this.target = a;
    this.metadata = h(c.eventMetadata || {}, {});
  };
  YA.prototype.copyToHitData = function (a, b, c) {
    var d = Q(this.m, a);
    d === void 0 && (d = b);
    if (d !== void 0 && c !== void 0 && l(d) && U(62))
      try {
        d = c(d);
      } catch (e) {}
    d !== void 0 && (this.o[a] = d);
  };
  var Vs = function (a, b, c) {
    var d = Yr(a.target.ia);
    return d && d[b] !== void 0 ? d[b] : c;
  };
  function ZA(a, b) {
    var c;
    return c;
  }
  ZA.J = "internal.copyPreHit";
  function $A(a, b) {
    var c = null;
    return fd(c, this.F, 2);
  }
  $A.T = "createArgumentsQueue";
  function aB(a) {
    return fd(
      function (c) {
        var d = Ew();
        if (typeof c === "function")
          d(function () {
            c(function (f, g, k) {
              var m = Ew(),
                n = m && m.getByName && m.getByName(f);
              return Cm(G.gaplugins.Linker, n).decorate(g, k);
            });
          });
        else if (Array.isArray(c)) {
          var e = String(c[0]).split(".");
          b[e.length === 1 ? e[0] : e[1]] && d.apply(null, c);
        } else if (c === "isLoaded") return !!d.loaded;
      },
      this.F,
      1
    );
  }
  aB.J = "internal.createGaCommandQueue";
  function bB(a) {
    return fd(
      function () {
        if (!pb(e.push))
          throw Error("Object at " + a + " in window is not an array.");
        e.push.apply(e, Array.prototype.slice.call(arguments, 0));
      },
      this.F,
      Hb(xz(this).hb(), "__cvt_") ? 2 : 1
    );
  }
  bB.T = "createQueue";
  function cB(a, b) {
    var c = null;
    return c;
  }
  cB.J = "internal.createRegex";
  function dB() {
    var a = {};
    return a;
  }
  function eB(a) {}
  eB.J = "internal.declareConsentState";
  function fB(a) {
    var b = "";
    return b;
  }
  fB.J = "internal.decodeUrlHtmlEntities";
  function gB(a, b, c) {
    var d;
    return d;
  }
  gB.J = "internal.decorateUrlWithGaCookies";
  function hB(a) {
    var b;
    return b;
  }
  hB.J = "internal.detectUserProvidedData";
  function lB(a, b) {
    return b;
  }
  lB.J = "internal.enableAutoEventOnClick";
  function tB(a, b) {
    return b;
  }
  tB.J = "internal.enableAutoEventOnElementVisibility";
  function uB() {}
  uB.J = "internal.enableAutoEventOnError";
  var vB = {},
    wB = [],
    xB = {},
    yB = 0,
    zB = 0;
  function FB(a, b) {
    var c = this;
    return b;
  }
  FB.J = "internal.enableAutoEventOnFormInteraction";
  function KB(a, b) {
    var c = this;
    return b;
  }
  KB.J = "internal.enableAutoEventOnFormSubmit";
  function PB() {
    var a = this;
  }
  PB.J = "internal.enableAutoEventOnGaSend";
  var QB = {},
    RB = [];
  function YB(a, b) {
    var c = this;
    return b;
  }
  YB.J = "internal.enableAutoEventOnHistoryChange";
  var ZB = ["http://", "https://", "javascript:", "file://"];
  var $B = function (a, b) {
      if (a.which === 2 || a.ctrlKey || a.shiftKey || a.altKey || a.metaKey)
        return !1;
      var c = Pc(b, "href");
      if (
        c.indexOf(":") !== -1 &&
        !ZB.some(function (k) {
          return Hb(c, k);
        })
      )
        return !1;
      var d = c.indexOf("#"),
        e = Pc(b, "target");
      if ((e && e !== "_self" && e !== "_parent" && e !== "_top") || d === 0)
        return !1;
      if (d > 0) {
        var f = Vi(Yi(c)),
          g = Vi(Yi(G.location.href));
        return f !== g;
      }
      return !0;
    },
    aC = function (a, b) {
      for (
        var c = Si(
            Yi(
              (b.attributes && b.attributes.formaction ? b.formAction : "") ||
                b.action ||
                Pc(b, "href") ||
                b.src ||
                b.code ||
                b.codebase ||
                ""
            ),
            "host"
          ),
          d = 0;
        d < a.length;
        d++
      )
        try {
          if (new RegExp(a[d]).test(c)) return !1;
        } catch (e) {}
      return !0;
    },
    bC = function () {
      function a(c) {
        var d = c.target;
        if (
          d &&
          c.which !== 3 &&
          !(c.j || (c.timeStamp && c.timeStamp === b))
        ) {
          b = c.timeStamp;
          d = Jc(d, ["a", "area"], 100);
          if (!d) return c.returnValue;
          var e = c.defaultPrevented || c.returnValue === !1,
            f = Az("lcl", e ? "nv.mwt" : "mwt", 0),
            g;
          g = e ? Az("lcl", "nv.ids", []) : Az("lcl", "ids", []);
          for (var k = [], m = 0; m < g.length; m++) {
            var n = g[m],
              p = Az("lcl", "aff.map", {})[n];
            (p && !aC(p, d)) || k.push(n);
          }
          if (k.length) {
            var q = $B(c, d),
              r = Fz(d, "gtm.linkClick", k);
            r["gtm.elementText"] = Hc(d);
            r["gtm.willOpenInNewWindow"] = !q;
            if (q && !e && f && d.href) {
              var t = !!sb(String(Pc(d, "rel") || "").split(" "), function (x) {
                  return x.toLowerCase() === "noreferrer";
                }),
                u = G[(Pc(d, "target") || "_self").substring(1)],
                v = !0,
                w = py(function () {
                  var x;
                  if ((x = v && u)) {
                    var y;
                    a: if (t) {
                      var B;
                      try {
                        B = new MouseEvent(c.type, { bubbles: !0 });
                      } catch (A) {
                        if (!H.createEvent) {
                          y = !1;
                          break a;
                        }
                        B = H.createEvent("MouseEvents");
                        B.initEvent(c.type, !0, !0);
                      }
                      B.j = !0;
                      c.target.dispatchEvent(B);
                      y = !0;
                    } else y = !1;
                    x = !y;
                  }
                  x && (u.location.href = Pc(d, "href"));
                }, f);
              if (oy(r, w, f)) v = !1;
              else
                return (
                  c.preventDefault && c.preventDefault(), (c.returnValue = !1)
                );
            } else oy(r, function () {}, f || 2e3);
            return !0;
          }
        }
      }
      var b = 0;
      Ec(H, "click", a, !1);
      Ec(H, "auxclick", a, !1);
    };
  function cC(a, b) {
    var c = this;
    K(this.getName(), ["dustOptions:?PixieMap", "triggerId:?*"], arguments);
    var d = J(a);
    tz([
      function () {
        N(c, "detect_link_click_events", d);
      },
    ]);
    var e = d && !!d.waitForTags,
      f = d && !!d.checkValidation,
      g = d ? d.affiliateDomains : void 0;
    b = zz(b);
    if (e) {
      var k = Number(d.waitForTagsTimeout);
      (k > 0 && isFinite(k)) || (k = 2e3);
      var m = function (p) {
        return Math.max(k, p);
      };
      Ez("lcl", "mwt", m, 0);
      f || Ez("lcl", "nv.mwt", m, 0);
    }
    var n = function (p) {
      p.push(b);
      return p;
    };
    Ez("lcl", "ids", n, []);
    f || Ez("lcl", "nv.ids", n, []);
    g &&
      Ez(
        "lcl",
        "aff.map",
        function (p) {
          p[b] = g;
          return p;
        },
        {}
      );
    Az("lcl", "init", !1) || (bC(), Bz("lcl", "init", !0));
    return b;
  }
  cC.J = "internal.enableAutoEventOnLinkClick";
  var dC, eC;
  function pC(a, b) {
    var c = this;
    return b;
  }
  pC.J = "internal.enableAutoEventOnScroll";
  function qC(a) {
    return function () {
      if (a.Hh && a.Jh >= a.Hh) a.Rf && G.clearInterval(a.Rf);
      else {
        a.Jh++;
        var b = Cb();
        ny({
          event: a.eventName,
          "gtm.timerId": a.Rf,
          "gtm.timerEventNumber": a.Jh,
          "gtm.timerInterval": a.interval,
          "gtm.timerLimit": a.Hh,
          "gtm.timerStartTime": a.nk,
          "gtm.timerCurrentTime": b,
          "gtm.timerElapsedTime": b - a.nk,
          "gtm.triggers": a.ln,
        });
      }
    };
  }
  function rC(a, b) {
    return b;
  }
  rC.J = "internal.enableAutoEventOnTimer";
  var ic = ja(["data-gtm-yt-inspected-"]),
    tC = ["www.youtube.com", "www.youtube-nocookie.com"],
    uC,
    vC = !1;
  function FC(a, b) {
    var c = this;
    return b;
  }
  FC.J = "internal.enableAutoEventOnYouTubeActivity";
  function GC(a, b) {
    K(
      this.getName(),
      ["booleanExpression:!string", "context:?PixieMap"],
      arguments
    );
    var c = b ? J(b) : {},
      d = a,
      e = !1;
    return e;
  }
  GC.J = "internal.evaluateBooleanExpression";
  var HC;
  function IC(a) {
    var b = !1;
    return b;
  }
  IC.J = "internal.evaluateMatchingRules";
  function pD() {
    return En(7) && En(9) && En(10);
  }
  function kE(a, b, c, d) {}
  kE.J = "internal.executeEventProcessor";
  function lE(a) {
    var b;
    return fd(b, this.F, 1);
  }
  lE.J = "internal.executeJavascriptString";
  function mE(a) {
    var b;
    return b;
  }
  var nE = null;
  function oE() {
    var a = new Za();
    return a;
  }
  oE.T = "getContainerVersion";
  function pE(a, b) {
    b = b === void 0 ? !0 : b;
    var c;
    return c;
  }
  pE.T = "getCookieValues";
  function qE() {
    return Sk();
  }
  qE.J = "internal.getCountryCode";
  function rE() {
    var a = [];
    return fd(a);
  }
  rE.J = "internal.getDestinationIds";
  function sE(a, b) {
    var c = null;
    return c;
  }
  sE.J = "internal.getElementAttribute";
  function tE(a) {
    var b = null;
    return b;
  }
  tE.J = "internal.getElementById";
  function uE(a) {
    var b = "";
    return b;
  }
  uE.J = "internal.getElementInnerText";
  function vE(a, b) {
    var c = null;
    return c;
  }
  vE.J = "internal.getElementProperty";
  function wE(a) {
    var b;
    return b;
  }
  wE.J = "internal.getElementValue";
  function xE(a) {
    var b = 0;
    return b;
  }
  xE.J = "internal.getElementVisibilityRatio";
  function yE(a) {
    var b = null;
    return b;
  }
  yE.J = "internal.getElementsByCssSelector";
  function zE(a) {
    var b;
    K(this.getName(), ["keyPath:!string"], arguments);
    N(this, "read_event_data", a);
    var c;
    a: {
      var d = a,
        e = xz(this).originalEventData;
      if (e) {
        for (
          var f = e, g = {}, k = {}, m = {}, n = [], p = d.split("\\\\"), q = 0;
          q < p.length;
          q++
        ) {
          for (var r = p[q].split("\\."), t = 0; t < r.length; t++) {
            for (var u = r[t].split("."), v = 0; v < u.length; v++)
              n.push(u[v]), v !== u.length - 1 && n.push(m);
            t !== r.length - 1 && n.push(k);
          }
          q !== p.length - 1 && n.push(g);
        }
        for (
          var w = [], x = "", y = ma(n), B = y.next();
          !B.done;
          B = y.next()
        ) {
          var A = B.value;
          A === m
            ? (w.push(x), (x = ""))
            : (x = A === g ? x + "\\" : A === k ? x + "." : x + A);
        }
        x && w.push(x);
        for (var C = ma(w), E = C.next(); !E.done; E = C.next()) {
          if (f == null) {
            c = void 0;
            break a;
          }
          f = f[E.value];
        }
        c = f;
      } else c = void 0;
    }
    b = fd(c, this.F, 1);
    return b;
  }
  zE.J = "internal.getEventData";
  var AE = {};
  AE.enableAWFledge = U(26);
  AE.enableAdsConversionValidation = U(14);
  AE.enableAutoPiiOnPhoneAndAddress = U(25);
  AE.enableCachedEcommerceData = U(32);
  AE.enableCcdPreAutoPiiDetection = U(33);
  AE.enableCloudRecommentationsErrorLogging = U(34);
  AE.enableCloudRecommentationsSchemaIngestion = U(35);
  AE.enableCloudRetailInjectPurchaseMetadata = U(37);
  AE.enableCloudRetailLogging = U(36);
  AE.enableCloudRetailPageCategories = U(38);
  AE.enableConsentDisclosureActivity = U(39);
  AE.enableConversionMarkerPageViewRename = U(41);
  AE.enableDCFledge = U(45);
  AE.enableDecodeUri = U(62);
  AE.enableDeferAllEnhancedMeasurement = U(46);
  AE.enableDmaBlockDisclosure = U(48);
  AE.enableEuidAutoMode = U(53);
  AE.enableFormSkipValidation = U(58);
  AE.enableUrlDecodeEventUsage = U(89);
  AE.enableZoneConfigInChildContainers = U(91);
  AE.useEnableAutoEventOnFormApis = U(100);
  AE.autoPiiEligible = Xk();
  function BE() {
    return fd(AE);
  }
  BE.J = "internal.getFlags";
  function CE() {
    return new cd(Wy);
  }
  CE.J = "internal.getHtmlId";
  function DE(a, b) {
    var c;
    return c;
  }
  DE.J = "internal.getProductSettingsParameter";
  function EE(a, b) {
    var c;
    return c;
  }
  EE.T = "getQueryParameters";
  function FE(a, b) {
    var c;
    return c;
  }
  FE.T = "getReferrerQueryParameters";
  function GE(a) {
    var b = "";
    return b;
  }
  GE.T = "getReferrerUrl";
  function HE() {
    return Tk();
  }
  HE.J = "internal.getRegionCode";
  function IE(a, b) {
    var c;
    return c;
  }
  IE.J = "internal.getRemoteConfigParameter";
  function JE(a) {
    var b = "";
    return b;
  }
  JE.T = "getUrl";
  function KE() {
    N(this, "get_user_agent");
    return qc.userAgent;
  }
  KE.J = "internal.getUserAgent";
  function SE() {
    return (G.gaGlobal = G.gaGlobal || {});
  }
  function TE() {
    var a = SE();
    a.hid = a.hid || tb();
    return a.hid;
  }
  function UE(a, b) {
    var c = SE();
    if (c.vid === void 0 || (b && !c.from_cookie))
      (c.vid = a), (c.from_cookie = b);
  }
  function pF(a) {
    var b = U(59) && zi.D;
    if (Ys(a) || b) a.o[P.g.ej] = Tk() || Sk();
  }
  var FF = function (a) {
      this.D = a;
      this.H = "";
      this.j = this.D;
    },
    GF = function (a, b) {
      a.j = b;
      return a;
    },
    HF = function (a, b) {
      a.K = b;
      return a;
    },
    JF = function (a, b) {
      b = a.H + b;
      for (var c = b.indexOf("\n\n"); c !== -1; ) {
        var d = a,
          e;
        a: {
          var f = ma(b.substring(0, c).split("\n")),
            g = f.next().value,
            k = f.next().value;
          if (g.indexOf("event: message") === 0 && k.indexOf("data: ") === 0)
            try {
              e = JSON.parse(k.substring(k.indexOf(":") + 1));
              break a;
            } catch (x) {}
          e = void 0;
        }
        var m = d,
          n = e;
        if (n) {
          IF(n.send_pixel, n.options, m.D);
          IF(n.send_beacon, void 0, m.j);
          var p = n.create_iframe,
            q = n.options,
            r = m.K;
          if (p && r) {
            var t = p || [];
            if (Array.isArray(t))
              for (
                var u = Ta(q) ? q : {}, v = ma(t), w = v.next();
                !w.done;
                w = v.next()
              )
                r(w.value, u);
          }
        }
        b = b.substring(c + 2);
        c = b.indexOf("\n\n");
      }
      a.H = b;
    };
  function KF(a) {
    var b = a.search;
    return (
      a.protocol +
      "//" +
      a.hostname +
      a.pathname +
      (b ? b + "&richsstsse" : "?richsstsse")
    );
  }
  function IF(a, b, c) {
    if (a) {
      var d = a || [];
      if (Array.isArray(d))
        for (
          var e = Ta(b) ? b : {}, f = ma(d), g = f.next();
          !g.done;
          g = f.next()
        )
          c(g.value, e);
    }
  }
  var vG = window,
    wG = document,
    xG = function (a) {
      var b = vG._gaUserPrefs;
      if (
        (b && b.ioo && b.ioo()) ||
        wG.documentElement.hasAttribute("data-google-analytics-opt-out") ||
        (a && vG["ga-disable-" + a] === !0)
      )
        return !0;
      try {
        var c = vG.external;
        if (c && c._gaUserPrefs && c._gaUserPrefs == "oo") return !0;
      } catch (p) {}
      for (
        var d = [], e = String(wG.cookie).split(";"), f = 0;
        f < e.length;
        f++
      ) {
        var g = e[f].split("="),
          k = g[0].replace(/^\s*|\s*$/g, "");
        if (k && k == "AMP_TOKEN") {
          var m = g
            .slice(1)
            .join("=")
            .replace(/^\s*|\s*$/g, "");
          m && (m = decodeURIComponent(m));
          d.push(m);
        }
      }
      for (var n = 0; n < d.length; n++) if (d[n] == "$OPT_OUT") return !0;
      return wG.getElementById("__gaOptOutExtension") ? !0 : !1;
    };
  function HG(a) {
    z(a, function (c) {
      c.charAt(0) === "_" && delete a[c];
    });
    var b = a[P.g.eb] || {};
    z(b, function (c) {
      c.charAt(0) === "_" && delete b[c];
    });
  }
  var kH = function (a, b) {};
  function jH(a, b) {
    var c = function () {};
    return c;
  }
  function lH(a, b, c) {}
  var mH = jH;
  function oH(a, b, c) {
    var d = this;
  }
  oH.J = "internal.gtagConfig";
  function pH() {
    var a = {};
    return a;
  }
  function rH(a, b) {}
  rH.T = "gtagSet";
  function sH(a, b) {}
  sH.T = "injectHiddenIframe";
  var tH = jz();
  function uH(a, b, c, d, e) {}
  uH.J = "internal.injectHtml";
  var yH = {};
  function AH(a, b, c, d) {}
  var BH = { dl: 1, id: 1 },
    CH = {};
  function DH(a, b, c, d) {}
  AH.T = "injectScript";
  DH.J = "internal.injectScript";
  function EH(a) {
    var b = !0;
    return b;
  }
  EH.T = "isConsentGranted";
  function FH() {
    return Vk();
  }
  FH.J = "internal.isDmaRegion";
  function GH(a) {
    var b = !1;
    return b;
  }
  GH.J = "internal.isEntityInfrastructure";
  function HH() {
    var a = Zg(function (b) {
      xz(this).log("error", b);
    });
    a.T = "JSON";
    return a;
  }
  function IH(a) {
    var b = void 0;
    return fd(b);
  }
  IH.J = "internal.legacyParseUrl";
  function JH() {
    return !1;
  }
  var KH = {
    getItem: function (a) {
      var b = null;
      return b;
    },
    setItem: function (a, b) {
      return !1;
    },
    removeItem: function (a) {},
  };
  function LH() {}
  LH.T = "logToConsole";
  function MH(a, b) {}
  MH.J = "internal.mergeRemoteConfig";
  function NH(a, b, c) {
    c = c === void 0 ? !0 : c;
    var d = [];
    return fd(d);
  }
  NH.J = "internal.parseCookieValuesFromString";
  function OH(a) {
    var b = void 0;
    return b;
  }
  OH.T = "parseUrl";
  function PH(a) {}
  PH.J = "internal.processAsNewEvent";
  function QH(a, b, c) {
    var d;
    return d;
  }
  QH.J = "internal.pushToDataLayer";
  function RH(a) {
    var b = !1;
    return b;
  }
  RH.T = "queryPermission";
  function SH() {
    var a = "";
    return a;
  }
  SH.T = "readCharacterSet";
  function TH() {
    return gi.Ya;
  }
  TH.J = "internal.readDataLayerName";
  function UH() {
    var a = "";
    return a;
  }
  UH.T = "readTitle";
  function VH(a, b) {
    var c = this;
  }
  VH.J = "internal.registerCcdCallback";
  function WH(a) {
    return !0;
  }
  WH.J = "internal.registerDestination";
  var XH = ["config", "event", "get", "set"];
  function YH(a, b, c) {}
  YH.J = "internal.registerGtagCommandListener";
  function ZH(a, b) {
    var c = !1;
    return c;
  }
  ZH.J = "internal.removeDataLayerEventListener";
  function $H(a, b) {}
  $H.J = "internal.removeFormData";
  function aI() {}
  aI.T = "resetDataLayer";
  function bI(a, b, c, d) {}
  bI.J = "internal.sendGtagEvent";
  function cI(a, b, c) {}
  cI.T = "sendPixel";
  function dI(a, b) {}
  dI.J = "internal.setAnchorHref";
  function eI(a) {}
  eI.J = "internal.setContainerConsentDefaults";
  function fI(a, b, c, d) {
    var e = this;
    d = d === void 0 ? !0 : d;
    var f = !1;
    return f;
  }
  fI.T = "setCookie";
  function gI(a) {}
  gI.J = "internal.setCorePlatformServices";
  function hI(a, b) {}
  hI.J = "internal.setDataLayerValue";
  function iI(a) {}
  iI.T = "setDefaultConsentState";
  function jI(a, b) {}
  jI.J = "internal.setDelegatedConsentType";
  function kI(a, b) {}
  kI.J = "internal.setFormAction";
  function lI(a, b, c) {}
  lI.J = "internal.setInCrossContainerData";
  function mI(a, b, c) {
    return !1;
  }
  mI.T = "setInWindow";
  function nI(a, b, c) {}
  nI.J = "internal.setProductSettingsParameter";
  function oI(a, b, c) {}
  oI.J = "internal.setRemoteConfigParameter";
  function pI(a, b, c, d) {
    var e = this;
  }
  pI.T = "sha256";
  function qI(a, b, c) {}
  qI.J = "internal.sortRemoteConfigParameters";
  function rI(a, b) {
    var c = void 0;
    return c;
  }
  rI.J = "internal.subscribeToCrossContainerData";
  var sI = {},
    tI = {};
  sI.getItem = function (a) {
    var b = null;
    return b;
  };
  sI.setItem = function (a, b) {};
  sI.removeItem = function (a) {};
  sI.clear = function () {};
  sI.T = "templateStorage";
  function uI(a, b) {
    var c = !1;
    return c;
  }
  uI.J = "internal.testRegex";
  function vI(a) {
    var b;
    return b;
  }
  function wI(a) {
    var b;
    return b;
  }
  wI.J = "internal.unsiloId";
  function xI(a, b) {
    var c;
    return c;
  }
  xI.J = "internal.unsubscribeFromCrossContainerData";
  function yI(a) {}
  yI.T = "updateConsentState";
  var zI;
  function AI(a, b, c) {
    zI = zI || new jh();
    zI.add(a, b, c);
  }
  function BI(a, b) {
    var c = (zI = zI || new jh());
    if (c.D.hasOwnProperty(a))
      throw Error(
        "Attempting to add a private function which already exists: " + a + "."
      );
    if (c.j.hasOwnProperty(a))
      throw Error(
        "Attempting to add a private function with an existing API name: " +
          a +
          "."
      );
    c.D[a] = pb(b) ? Gg(a, b) : Hg(a, b);
  }
  function CI() {
    return function (a) {
      var b;
      var c = zI;
      if (c.j.hasOwnProperty(a)) b = c.get(a, this);
      else {
        var d;
        if ((d = c.D.hasOwnProperty(a))) {
          var e = !1,
            f = this.F.j;
          if (f) {
            var g = f.hb();
            if (g) {
              g.indexOf("__cvt_") !== 0 && (e = !0);
            }
          } else e = !0;
          d = e;
        }
        if (d) {
          var k = c.D.hasOwnProperty(a) ? c.D[a] : void 0;
          b = k;
        } else throw Error(a + " is not a valid API name.");
      }
      return b;
    };
  }
  var DI = function () {
    var a = function (c) {
        return BI(c.J, c);
      },
      b = function (c) {
        return AI(c.T, c);
      };
    b(rz);
    b(yz);
    b(MA);
    b(OA);
    b(PA);
    b(UA);
    b(WA);
    b($A);
    b(bB);
    b(oE);
    b(pE);
    b(EE);
    b(FE);
    b(GE);
    b(JE);
    b(rH);
    b(sH);
    b(AH);
    b(EH);
    b(LH);
    b(OH);
    b(RH);
    b(SH);
    b(UH);
    b(cI);
    b(fI);
    b(iI);
    b(mI);
    b(pI);
    b(sI);
    b(yI);
    b(HH());
    AI("Math", Lg());
    AI("Object", hh);
    AI("TestHelper", lh());
    AI("assertApi", Ig);
    AI("assertThat", Jg);
    AI("decodeUri", Ng);
    AI("decodeUriComponent", Og);
    AI("encodeUri", Pg);
    AI("encodeUriComponent", Qg);
    AI("fail", Vg);
    AI("generateRandom", Wg);
    AI("getTimestamp", Xg);
    AI("getTimestampMillis", Xg);
    AI("getType", Yg);
    AI("makeInteger", $g);
    AI("makeNumber", ah);
    AI("makeString", bh);
    AI("makeTableMap", ch);
    AI("mock", fh);
    AI("fromBase64", mE, !("atob" in G));
    AI("localStorage", KH, !JH());
    AI("toBase64", vI, !("btoa" in G));
    a(uz);
    a(Pz);
    a(aA);
    a(hA);
    a(mA);
    a(BA);
    a(KA);
    a(NA);
    a(QA);
    a(RA);
    a(SA);
    a(TA);
    a(VA);
    a(XA);
    a(ZA);
    a(aB);
    a(cB);
    a(eB);
    a(fB);
    a(gB);
    a(hB);
    a(lB);
    a(tB);
    a(uB);
    a(FB);
    a(KB);
    a(PB);
    a(YB);
    a(cC);
    a(pC);
    a(rC);
    a(FC);
    a(GC);
    a(IC);
    a(kE);
    a(lE);
    a(qE);
    a(rE);
    a(sE);
    a(tE);
    a(uE);
    a(vE);
    a(wE);
    a(xE);
    a(yE);
    a(zE);
    a(BE);
    a(CE);
    a(DE);
    a(HE);
    a(IE);
    a(oH);
    a(uH);
    a(DH);
    a(FH);
    a(GH);
    a(IH);
    a(zA);
    a(MH);
    a(NH);
    a(PH);
    a(QH);
    a(TH);
    a(VH);
    a(WH);
    a(YH);
    a(ZH);
    a($H);
    a(bI);
    a(dI);
    a(eI);
    a(gI);
    a(hI);
    a(jI);
    a(kI);
    a(lI);
    a(nI);
    a(oI);
    a(qI);
    a(rI);
    a(uI);
    a(wI);
    a(xI);
    BI("internal.CrossContainerSchema", dB());
    BI("internal.GtagSchema", pH());
    AI("mockObject", gh);
    return CI();
  };
  var pz;
  function EI() {
    pz.j.j.H = function (a, b, c) {
      hi.SANDBOXED_JS_SEMAPHORE = hi.SANDBOXED_JS_SEMAPHORE || 0;
      hi.SANDBOXED_JS_SEMAPHORE++;
      try {
        return a.apply(b, c);
      } finally {
        hi.SANDBOXED_JS_SEMAPHORE--;
      }
    };
  }
  function FI(a) {
    a &&
      z(a, function (b, c) {
        for (var d = 0; d < c.length; d++) {
          var e = c[d].replace(/^_*/, "");
          wi[e] = wi[e] || [];
          wi[e].push(b);
        }
      });
  }
  var GI = encodeURI,
    Y = encodeURIComponent,
    HI = Array.isArray,
    II = function (a, b, c) {
      Dc(a, b, c);
    },
    JI = function (a, b) {
      if (!a) return !1;
      var c = Si(Yi(a), "host");
      if (!c) return !1;
      for (var d = 0; b && d < b.length; d++) {
        var e = b[d] && b[d].toLowerCase();
        if (e) {
          var f = c.length - e.length;
          f > 0 && e.charAt(0) != "." && (f--, (e = "." + e));
          if (f >= 0 && c.indexOf(e, f) == f) return !0;
        }
      }
      return !1;
    },
    KI = function (a, b, c) {
      for (var d = {}, e = !1, f = 0; a && f < a.length; f++)
        a[f] &&
          a[f].hasOwnProperty(b) &&
          a[f].hasOwnProperty(c) &&
          ((d[a[f][b]] = a[f][c]), (e = !0));
      return e ? d : null;
    };
  var TI = G.clearTimeout,
    UI = G.setTimeout,
    VI = function (a, b, c) {
      if (ao()) {
        b && I(b);
      } else return Ac(a, b, c);
    },
    WI = function () {
      return G.location.href;
    },
    XI = function (a, b) {
      return Gi(a, b || 2);
    },
    YI = function (a, b) {
      G[a] = b;
    },
    ZI = function (a, b, c) {
      b && (G[a] === void 0 || (c && !G[a])) && (G[a] = b);
      return G[a];
    },
    $I = function (a, b) {
      if (ao()) {
        b && I(b);
      } else Cc(a, b);
    };
  var aJ = {};
  var Z = { securityGroups: {} };
  (Z.securityGroups.f = ["google"]),
    (Z.__f = function (a) {
      var b = XI("gtm.referrer", 1) || H.referrer;
      return b
        ? a.vtp_component && a.vtp_component != "URL"
          ? Si(
              Yi(String(b)),
              a.vtp_component,
              a.vtp_stripWww,
              a.vtp_defaultPages,
              a.vtp_queryKey
            )
          : Vi(Yi(String(b)))
        : String(b);
    }),
    (Z.__f.C = "f"),
    (Z.__f.isVendorTemplate = !0),
    (Z.__f.priorityOverride = 0),
    (Z.__f.isInfrastructure = !0),
    (Z.__f.runInSiloedMode = !1);

  (Z.securityGroups.u = ["google"]),
    (function () {
      var a = function (b) {
        return {
          toString: function () {
            return b;
          },
        };
      };
      (function (b) {
        Z.__u = b;
        Z.__u.C = "u";
        Z.__u.isVendorTemplate = !0;
        Z.__u.priorityOverride = 0;
        Z.__u.isInfrastructure = !0;
        Z.__u.runInSiloedMode = !1;
      })(function (b) {
        var c;
        c =
          (c = b.vtp_customUrlSource
            ? b.vtp_customUrlSource
            : XI("gtm.url", 1)) || WI();
        var d = b[a("vtp_component")];
        if (!d || d == "URL") return Vi(Yi(String(c)));
        var e = Yi(String(c)),
          f;
        if (d === "QUERY")
          a: {
            var g = b[a("vtp_multiQueryKeys").toString()],
              k = b[a("vtp_queryKey").toString()] || "",
              m = b[a("vtp_ignoreEmptyQueryParam").toString()],
              n;
            n = g
              ? Array.isArray(k)
                ? k
                : String(k).replace(/\s+/g, "").split(",")
              : [String(k)];
            for (var p = 0; p < n.length; p++) {
              var q = Si(e, "QUERY", void 0, void 0, n[p]);
              if (q != void 0 && (!m || q !== "")) {
                f = q;
                break a;
              }
            }
            f = void 0;
          }
        else
          f = Si(
            e,
            d,
            d == "HOST" ? b[a("vtp_stripWww")] : void 0,
            d == "PATH" ? b[a("vtp_defaultPages")] : void 0
          );
        return f;
      });
    })();

  (Z.securityGroups.read_event_data = ["google"]),
    (function () {
      function a(b, c) {
        return { key: c };
      }
      (function (b) {
        Z.__read_event_data = b;
        Z.__read_event_data.C = "read_event_data";
        Z.__read_event_data.isVendorTemplate = !0;
        Z.__read_event_data.priorityOverride = 0;
        Z.__read_event_data.isInfrastructure = !1;
        Z.__read_event_data.runInSiloedMode = !1;
      })(function (b) {
        var c = b.vtp_eventDataAccess,
          d = b.vtp_keyPatterns || [],
          e = b.vtp_createPermissionError;
        return {
          assert: function (f, g) {
            if (g != null && !l(g))
              throw e(f, { key: g }, "Key must be a string.");
            if (c !== "any") {
              try {
                if (c === "specific" && g != null && kg(g, d)) return;
              } catch (k) {
                throw e(f, { key: g }, "Invalid key filter.");
              }
              throw e(f, { key: g }, "Prohibited read from event data.");
            }
          },
          N: a,
        };
      });
    })();

  (Z.securityGroups.detect_link_click_events = ["google"]),
    (function () {
      function a(b, c) {
        return { options: c };
      }
      (function (b) {
        Z.__detect_link_click_events = b;
        Z.__detect_link_click_events.C = "detect_link_click_events";
        Z.__detect_link_click_events.isVendorTemplate = !0;
        Z.__detect_link_click_events.priorityOverride = 0;
        Z.__detect_link_click_events.isInfrastructure = !1;
        Z.__detect_link_click_events.runInSiloedMode = !1;
      })(function (b) {
        var c = b.vtp_allowWaitForTags,
          d = b.vtp_createPermissionError;
        return {
          assert: function (e, f) {
            if (!c && f && f.waitForTags)
              throw d(e, {}, "Prohibited option waitForTags.");
          },
          N: a,
        };
      });
    })();

  var bJ = {};
  bJ.dataLayer = Hi;
  bJ.callback = function (a) {
    vi.hasOwnProperty(a) && pb(vi[a]) && vi[a]();
    delete vi[a];
  };
  bJ.bootstrap = 0;
  bJ._spx = !1;
  function cJ() {
    hi[Cj()] = hi[Cj()] || bJ;
    Pj();
    Tj() ||
      z(Uj(), function (d, e) {
        iw(d, e.transportUrl, e.context);
        O(92);
      });
    Fb(wi, Z.securityGroups);
    var a = Gj(Hj()),
      b,
      c = a == null ? void 0 : (b = a.context) == null ? void 0 : b.source;
    (c !== 2 && c !== 4 && c !== 3) || O(142);
    tf = Kf;
  }
  var dJ = !1;
  (function (a) {
    function b() {
      n = H.documentElement.getAttribute("data-tag-assistant-present");
      yy(n) && (m = k.jj);
    }
    function c() {
      m && tc ? g(m) : a();
    }
    if (!G["__TAGGY_INSTALLED"]) {
      var d = !1;
      if (H.referrer) {
        var e = Yi(H.referrer);
        d = Ui(e, "host") === "cct.google";
      }
      if (!d) {
        var f = no("googTaggyReferrer");
        d = !(!f.length || !f[0].length);
      }
      d &&
        ((G["__TAGGY_INSTALLED"] = !0),
        Ac("https://cct.google/taggy/agent.js"));
    }
    var g = function (u) {
        var v = "GTM",
          w = "GTM";
        mi && ((v = "OGT"), (w = "GTAG"));
        var x = G["google.tagmanager.debugui2.queue"];
        x ||
          ((x = []),
          (G["google.tagmanager.debugui2.queue"] = x),
          Ac(
            "https://" +
              gi.Gd +
              "/debug/bootstrap?id=" +
              Qf.ctid +
              "&src=" +
              w +
              "&cond=" +
              u +
              "&gtm=" +
              co()
          ));
        var y = {
          messageType: "CONTAINER_STARTING",
          data: {
            scriptSource: tc,
            containerProduct: v,
            debug: !1,
            id: Qf.ctid,
            targetRef: { ctid: Qf.ctid, isDestination: vj.oe },
            aliases: yj(),
            destinations: Bj(),
          },
        };
        y.data.resume = function () {
          a();
        };
        gi.zk && (y.data.initialPublish = !0);
        x.push(y);
      },
      k = { Sk: 1, lj: 2, Aj: 3, ni: 4, jj: 5 };
    k[k.Sk] = "GTM_DEBUG_LEGACY_PARAM";
    k[k.lj] = "GTM_DEBUG_PARAM";
    k[k.Aj] = "REFERRER";
    k[k.ni] = "COOKIE";
    k[k.jj] = "EXTENSION_PARAM";
    var m = void 0,
      n = void 0,
      p = Si(G.location, "query", !1, void 0, "gtm_debug");
    yy(p) && (m = k.lj);
    if (!m && H.referrer) {
      var q = Yi(H.referrer);
      Ui(q, "host") === "tagassistant.google.com" && (m = k.Aj);
    }
    if (!m) {
      var r = no("__TAG_ASSISTANT");
      r.length && r[0].length && (m = k.ni);
    }
    m || b();
    if (!m && zy(n)) {
      var t = !1;
      Ec(
        H,
        "TADebugSignal",
        function () {
          t || ((t = !0), b(), c());
        },
        !1
      );
      G.setTimeout(function () {
        t || ((t = !0), b(), c());
      }, 200);
    } else c();
  })(function () {
    try {
      var a;
      if (!(a = !U(54))) {
        var b;
        if (!(b = dJ)) {
          var c;
          a: {
            for (
              var d = tj().injectedFirstPartyContainers,
                e = ma(xj()),
                f = e.next();
              !f.done;
              f = e.next()
            )
              if (d[f.value]) {
                c = !0;
                break a;
              }
            c = !1;
          }
          b = !c;
        }
        a = b;
      }
      if (a) {
        Nj();
        if (U(68)) {
        }
        xk().D();
        xn();
        ll();
        var g = Ej();
        if (tj().canonical[g]) {
          var k = hi.zones;
          k && k.unregisterChild(xj());
          Vv().removeExternalRestrictions(Ej());
        } else {
          a: {
          }
          zi.j = "0";
          zi.D = zi.H;
          zi.K = "";
          zi.Ra =
            "ad_storage|analytics_storage|ad_user_data|ad_personalization";
          zi.Z = "ad_storage|analytics_storage|ad_user_data";
          zi.fb = "";
          fw();
          for (
            var m = data.resource || {}, n = m.macros || [], p = 0;
            p < n.length;
            p++
          )
            jf.push(n[p]);
          for (var q = m.tags || [], r = 0; r < q.length; r++) mf.push(q[r]);
          for (var t = m.predicates || [], u = 0; u < t.length; u++)
            lf.push(t[u]);
          for (var v = m.rules || [], w = 0; w < v.length; w++) {
            for (var x = v[w], y = {}, B = 0; B < x.length; B++) {
              var A = x[B][0];
              y[A] = Array.prototype.slice.call(x[B], 1);
              (A !== "if" && A !== "unless") || sf(y[A]);
            }
            kf.push(y);
          }
          of = Z;
          pf = dz;
          Mf = new Tf();
          var C = data.sandboxed_scripts,
            E = data.security_groups;
          a: {
            var D = data.runtime || [],
              F = data.runtime_lines;
            pz = new Ce();
            EI();
            hf = oz();
            var L = pz,
              M = DI(),
              R = new Yc("require", M);
            R.La();
            L.j.j.set("require", R);
            for (var V = [], aa = 0; aa < D.length; aa++) {
              var X = D[aa];
              if (!Array.isArray(X) || X.length < 3) {
                if (X.length === 0) continue;
                break a;
              }
              F && F[aa] && F[aa].length && Df(X, F[aa]);
              try {
                pz.execute(X), U(76) && mj && X[0] === 50 && V.push(X[1]);
              } catch (Sn) {}
            }
            U(76) && (uf = V);
          }
          if (C && C.length)
            for (var S = ["sandboxedScripts"], na = 0; na < C.length; na++) {
              var la = C[na].replace(/^_*/, "");
              wi[la] = S;
            }
          FI(E);
          cJ();
          if (!qi)
            for (
              var ha = Vk() ? Bi(zi.Z) : Bi(zi.Ra), ya = 0;
              ya < Zk.length;
              ya++
            ) {
              var Na = Zk[ya],
                Ga = Na,
                Sa = ha[Na] ? "granted" : "denied";
              rk().implicit(Ga, Sa);
            }
          xy();
          nw = !1;
          ow = 0;
          if (
            (H.readyState === "interactive" && !H.createEventObject) ||
            H.readyState === "complete"
          )
            qw();
          else {
            Ec(H, "DOMContentLoaded", qw);
            Ec(H, "readystatechange", qw);
            if (H.createEventObject && H.documentElement.doScroll) {
              var cb = !0;
              try {
                cb = !G.frameElement;
              } catch (Sn) {}
              cb && rw();
            }
            Ec(G, "load", qw);
          }
          cy = !1;
          H.readyState === "complete" ? ey() : Ec(G, "load", ey);
          mj &&
            ($l(mm),
            G.setInterval(lm, 864e5),
            $l(gz),
            $l(Rw),
            $l(Iu),
            $l(pm),
            $l(lz),
            $l(bx),
            $l(ut),
            U(76) && ($l(Ww), $l(Xw), $l(Yw)));
          if (nj) {
            jk();
            Gl();
            mw();
            var td;
            var ud = Gj(Hj());
            if (ud) {
              for (; ud.parent; ) {
                var yx = Gj(ud.parent);
                if (!yx) break;
                ud = yx;
              }
              td = ud;
            } else td = void 0;
            var Ne = td;
            if (!Ne) O(144);
            else if (Ne.canonicalContainerId) {
              var Tn;
              a: {
                if (Ne.scriptSource) {
                  var Kj;
                  try {
                    var zx;
                    Kj =
                      (zx = Rc()) == null
                        ? void 0
                        : zx.getEntriesByType("resource");
                  } catch (Sn) {}
                  if (Kj) {
                    for (var Un = {}, Lj = 0; Lj < Kj.length; ++Lj) {
                      var Ax = Kj[Lj],
                        Vn = Ax.initiatorType;
                      if (Vn === "script" && Ax.name === Ne.scriptSource) {
                        Tn = { Qm: Lj, Rm: Un };
                        break a;
                      }
                      Un[Vn] = 1 + (Un[Vn] || 0);
                    }
                    O(146);
                  } else O(145);
                }
                Tn = void 0;
              }
              var Wn = Tn;
              Wn &&
                (bk("rtg", String(Ne.canonicalContainerId)),
                bk("rlo", String(Wn.Qm)),
                bk("slo", String(Wn.Rm.script || "0")),
                bk("hlo", Ne.htmlLoadOrder || "-1"),
                bk("lst", String(Ne.loadScriptType || "0")));
            }
            var Xn;
            var Mj = Fj();
            if (Mj) {
              var Bx;
              Xn =
                Mj.canonicalContainerId ||
                "_" +
                  (Mj.scriptContainerId ||
                    ((Bx = Mj.destinations) == null ? void 0 : Bx[0]));
            } else Xn = void 0;
            var Cx = Xn;
            Cx && bk("pcid", Cx);
            U(31) &&
              (bk("bt", String(zi.H ? 2 : oi ? 1 : 0)),
              bk("ct", String(zi.H ? 0 : oi ? 1 : ao() ? 2 : 3)));
          }
          Uy();
          Qk(1);
          xA();
          ui = Cb();
          bJ.bootstrap = ui;
          if (U(68)) {
          }
        }
      }
    } catch (Sn) {
      if ((Qk(4), mj)) {
        var eJ = gm(!0, !0);
        Dc(eJ);
      }
    }
  });
})();
