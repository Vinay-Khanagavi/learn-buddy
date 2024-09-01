/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

(() => {
  var K_ = Object.create;
  var nn = Object.defineProperty;
  var Y_ = Object.getOwnPropertyDescriptor;
  var $_ = Object.getOwnPropertyNames;
  var Q_ = Object.getPrototypeOf,
    Z_ = Object.prototype.hasOwnProperty;
  var ye = (e, t) => () => (e && (t = e((e = 0))), t);
  var c = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
    Me = (e, t) => {
      for (var r in t) nn(e, r, { get: t[r], enumerable: !0 });
    },
    Ls = (e, t, r, n) => {
      if ((t && typeof t == "object") || typeof t == "function")
        for (let i of $_(t))
          !Z_.call(e, i) &&
            i !== r &&
            nn(e, i, {
              get: () => t[i],
              enumerable: !(n = Y_(t, i)) || n.enumerable,
            });
      return e;
    };
  var ce = (e, t, r) => (
      (r = e != null ? K_(Q_(e)) : {}),
      Ls(
        t || !e || !e.__esModule
          ? nn(r, "default", { value: e, enumerable: !0 })
          : r,
        e
      )
    ),
    et = (e) => Ls(nn({}, "__esModule", { value: !0 }), e);
  var Ns = c(() => {
    "use strict";
    (function () {
      if (typeof window > "u") return;
      let e = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
        t = e ? parseInt(e[1], 10) >= 16 : !1;
      if ("objectFit" in document.documentElement.style && !t) {
        window.objectFitPolyfill = function () {
          return !1;
        };
        return;
      }
      let n = function (a) {
          let u = window.getComputedStyle(a, null),
            l = u.getPropertyValue("position"),
            g = u.getPropertyValue("overflow"),
            d = u.getPropertyValue("display");
          (!l || l === "static") && (a.style.position = "relative"),
            g !== "hidden" && (a.style.overflow = "hidden"),
            (!d || d === "inline") && (a.style.display = "block"),
            a.clientHeight === 0 && (a.style.height = "100%"),
            a.className.indexOf("object-fit-polyfill") === -1 &&
              (a.className += " object-fit-polyfill");
        },
        i = function (a) {
          let u = window.getComputedStyle(a, null),
            l = {
              "max-width": "none",
              "max-height": "none",
              "min-width": "0px",
              "min-height": "0px",
              top: "auto",
              right: "auto",
              bottom: "auto",
              left: "auto",
              "margin-top": "0px",
              "margin-right": "0px",
              "margin-bottom": "0px",
              "margin-left": "0px",
            };
          for (let g in l)
            u.getPropertyValue(g) !== l[g] && (a.style[g] = l[g]);
        },
        o = function (a) {
          let u = a.parentNode;
          n(u),
            i(a),
            (a.style.position = "absolute"),
            (a.style.height = "100%"),
            (a.style.width = "auto"),
            a.clientWidth > u.clientWidth
              ? ((a.style.top = "0"),
                (a.style.marginTop = "0"),
                (a.style.left = "50%"),
                (a.style.marginLeft = a.clientWidth / -2 + "px"))
              : ((a.style.width = "100%"),
                (a.style.height = "auto"),
                (a.style.left = "0"),
                (a.style.marginLeft = "0"),
                (a.style.top = "50%"),
                (a.style.marginTop = a.clientHeight / -2 + "px"));
        },
        s = function (a) {
          if (typeof a > "u" || a instanceof Event)
            a = document.querySelectorAll("[data-object-fit]");
          else if (a && a.nodeName) a = [a];
          else if (typeof a == "object" && a.length && a[0].nodeName) a = a;
          else return !1;
          for (let u = 0; u < a.length; u++) {
            if (!a[u].nodeName) continue;
            let l = a[u].nodeName.toLowerCase();
            if (l === "img") {
              if (t) continue;
              a[u].complete
                ? o(a[u])
                : a[u].addEventListener("load", function () {
                    o(this);
                  });
            } else
              l === "video"
                ? a[u].readyState > 0
                  ? o(a[u])
                  : a[u].addEventListener("loadedmetadata", function () {
                      o(this);
                    })
                : o(a[u]);
          }
          return !0;
        };
      document.readyState === "loading"
        ? document.addEventListener("DOMContentLoaded", s)
        : s(),
        window.addEventListener("resize", s),
        (window.objectFitPolyfill = s);
    })();
  });
  var Ps = c(() => {
    "use strict";
    (function () {
      if (typeof window > "u") return;
      function e(n) {
        Webflow.env("design") ||
          ($("video").each(function () {
            n && $(this).prop("autoplay") ? this.play() : this.pause();
          }),
          $(".w-background-video--control").each(function () {
            n ? r($(this)) : t($(this));
          }));
      }
      function t(n) {
        n.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 0);
        });
      }
      function r(n) {
        n.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 1);
        });
      }
      $(document).ready(() => {
        let n = window.matchMedia("(prefers-reduced-motion: reduce)");
        n.addEventListener("change", (i) => {
          e(!i.matches);
        }),
          n.matches && e(!1),
          $("video:not([autoplay])").each(function () {
            $(this)
              .parent()
              .find(".w-background-video--control")
              .each(function () {
                t($(this));
              });
          }),
          $(document).on("click", ".w-background-video--control", function (i) {
            if (Webflow.env("design")) return;
            let o = $(i.currentTarget),
              s = $(`video#${o.attr("aria-controls")}`).get(0);
            if (s)
              if (s.paused) {
                let a = s.play();
                r(o),
                  a &&
                    typeof a.catch == "function" &&
                    a.catch(() => {
                      t(o);
                    });
              } else s.pause(), t(o);
          });
      });
    })();
  });
  var Li = c(() => {
    "use strict";
    window.tram = (function (e) {
      function t(f, E) {
        var I = new G.Bare();
        return I.init(f, E);
      }
      function r(f) {
        return f.replace(/[A-Z]/g, function (E) {
          return "-" + E.toLowerCase();
        });
      }
      function n(f) {
        var E = parseInt(f.slice(1), 16),
          I = (E >> 16) & 255,
          A = (E >> 8) & 255,
          T = 255 & E;
        return [I, A, T];
      }
      function i(f, E, I) {
        return (
          "#" + ((1 << 24) | (f << 16) | (E << 8) | I).toString(16).slice(1)
        );
      }
      function o() {}
      function s(f, E) {
        l("Type warning: Expected: [" + f + "] Got: [" + typeof E + "] " + E);
      }
      function a(f, E, I) {
        l("Units do not match [" + f + "]: " + E + ", " + I);
      }
      function u(f, E, I) {
        if ((E !== void 0 && (I = E), f === void 0)) return I;
        var A = I;
        return (
          xt.test(f) || !lt.test(f)
            ? (A = parseInt(f, 10))
            : lt.test(f) && (A = 1e3 * parseFloat(f)),
          0 > A && (A = 0),
          A === A ? A : I
        );
      }
      function l(f) {
        le.debug && window && window.console.warn(f);
      }
      function g(f) {
        for (var E = -1, I = f ? f.length : 0, A = []; ++E < I; ) {
          var T = f[E];
          T && A.push(T);
        }
        return A;
      }
      var d = (function (f, E, I) {
          function A(ie) {
            return typeof ie == "object";
          }
          function T(ie) {
            return typeof ie == "function";
          }
          function S() {}
          function Q(ie, ge) {
            function B() {
              var Re = new ae();
              return T(Re.init) && Re.init.apply(Re, arguments), Re;
            }
            function ae() {}
            ge === I && ((ge = ie), (ie = Object)), (B.Bare = ae);
            var se,
              be = (S[f] = ie[f]),
              Je = (ae[f] = B[f] = new S());
            return (
              (Je.constructor = B),
              (B.mixin = function (Re) {
                return (ae[f] = B[f] = Q(B, Re)[f]), B;
              }),
              (B.open = function (Re) {
                if (
                  ((se = {}),
                  T(Re) ? (se = Re.call(B, Je, be, B, ie)) : A(Re) && (se = Re),
                  A(se))
                )
                  for (var Er in se) E.call(se, Er) && (Je[Er] = se[Er]);
                return T(Je.init) || (Je.init = ie), B;
              }),
              B.open(ge)
            );
          }
          return Q;
        })("prototype", {}.hasOwnProperty),
        p = {
          ease: [
            "ease",
            function (f, E, I, A) {
              var T = (f /= A) * f,
                S = T * f;
              return (
                E +
                I * (-2.75 * S * T + 11 * T * T + -15.5 * S + 8 * T + 0.25 * f)
              );
            },
          ],
          "ease-in": [
            "ease-in",
            function (f, E, I, A) {
              var T = (f /= A) * f,
                S = T * f;
              return E + I * (-1 * S * T + 3 * T * T + -3 * S + 2 * T);
            },
          ],
          "ease-out": [
            "ease-out",
            function (f, E, I, A) {
              var T = (f /= A) * f,
                S = T * f;
              return (
                E +
                I * (0.3 * S * T + -1.6 * T * T + 2.2 * S + -1.8 * T + 1.9 * f)
              );
            },
          ],
          "ease-in-out": [
            "ease-in-out",
            function (f, E, I, A) {
              var T = (f /= A) * f,
                S = T * f;
              return E + I * (2 * S * T + -5 * T * T + 2 * S + 2 * T);
            },
          ],
          linear: [
            "linear",
            function (f, E, I, A) {
              return (I * f) / A + E;
            },
          ],
          "ease-in-quad": [
            "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
            function (f, E, I, A) {
              return I * (f /= A) * f + E;
            },
          ],
          "ease-out-quad": [
            "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
            function (f, E, I, A) {
              return -I * (f /= A) * (f - 2) + E;
            },
          ],
          "ease-in-out-quad": [
            "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
            function (f, E, I, A) {
              return (f /= A / 2) < 1
                ? (I / 2) * f * f + E
                : (-I / 2) * (--f * (f - 2) - 1) + E;
            },
          ],
          "ease-in-cubic": [
            "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
            function (f, E, I, A) {
              return I * (f /= A) * f * f + E;
            },
          ],
          "ease-out-cubic": [
            "cubic-bezier(0.215, 0.610, 0.355, 1)",
            function (f, E, I, A) {
              return I * ((f = f / A - 1) * f * f + 1) + E;
            },
          ],
          "ease-in-out-cubic": [
            "cubic-bezier(0.645, 0.045, 0.355, 1)",
            function (f, E, I, A) {
              return (f /= A / 2) < 1
                ? (I / 2) * f * f * f + E
                : (I / 2) * ((f -= 2) * f * f + 2) + E;
            },
          ],
          "ease-in-quart": [
            "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
            function (f, E, I, A) {
              return I * (f /= A) * f * f * f + E;
            },
          ],
          "ease-out-quart": [
            "cubic-bezier(0.165, 0.840, 0.440, 1)",
            function (f, E, I, A) {
              return -I * ((f = f / A - 1) * f * f * f - 1) + E;
            },
          ],
          "ease-in-out-quart": [
            "cubic-bezier(0.770, 0, 0.175, 1)",
            function (f, E, I, A) {
              return (f /= A / 2) < 1
                ? (I / 2) * f * f * f * f + E
                : (-I / 2) * ((f -= 2) * f * f * f - 2) + E;
            },
          ],
          "ease-in-quint": [
            "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
            function (f, E, I, A) {
              return I * (f /= A) * f * f * f * f + E;
            },
          ],
          "ease-out-quint": [
            "cubic-bezier(0.230, 1, 0.320, 1)",
            function (f, E, I, A) {
              return I * ((f = f / A - 1) * f * f * f * f + 1) + E;
            },
          ],
          "ease-in-out-quint": [
            "cubic-bezier(0.860, 0, 0.070, 1)",
            function (f, E, I, A) {
              return (f /= A / 2) < 1
                ? (I / 2) * f * f * f * f * f + E
                : (I / 2) * ((f -= 2) * f * f * f * f + 2) + E;
            },
          ],
          "ease-in-sine": [
            "cubic-bezier(0.470, 0, 0.745, 0.715)",
            function (f, E, I, A) {
              return -I * Math.cos((f / A) * (Math.PI / 2)) + I + E;
            },
          ],
          "ease-out-sine": [
            "cubic-bezier(0.390, 0.575, 0.565, 1)",
            function (f, E, I, A) {
              return I * Math.sin((f / A) * (Math.PI / 2)) + E;
            },
          ],
          "ease-in-out-sine": [
            "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
            function (f, E, I, A) {
              return (-I / 2) * (Math.cos((Math.PI * f) / A) - 1) + E;
            },
          ],
          "ease-in-expo": [
            "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
            function (f, E, I, A) {
              return f === 0 ? E : I * Math.pow(2, 10 * (f / A - 1)) + E;
            },
          ],
          "ease-out-expo": [
            "cubic-bezier(0.190, 1, 0.220, 1)",
            function (f, E, I, A) {
              return f === A
                ? E + I
                : I * (-Math.pow(2, (-10 * f) / A) + 1) + E;
            },
          ],
          "ease-in-out-expo": [
            "cubic-bezier(1, 0, 0, 1)",
            function (f, E, I, A) {
              return f === 0
                ? E
                : f === A
                ? E + I
                : (f /= A / 2) < 1
                ? (I / 2) * Math.pow(2, 10 * (f - 1)) + E
                : (I / 2) * (-Math.pow(2, -10 * --f) + 2) + E;
            },
          ],
          "ease-in-circ": [
            "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
            function (f, E, I, A) {
              return -I * (Math.sqrt(1 - (f /= A) * f) - 1) + E;
            },
          ],
          "ease-out-circ": [
            "cubic-bezier(0.075, 0.820, 0.165, 1)",
            function (f, E, I, A) {
              return I * Math.sqrt(1 - (f = f / A - 1) * f) + E;
            },
          ],
          "ease-in-out-circ": [
            "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
            function (f, E, I, A) {
              return (f /= A / 2) < 1
                ? (-I / 2) * (Math.sqrt(1 - f * f) - 1) + E
                : (I / 2) * (Math.sqrt(1 - (f -= 2) * f) + 1) + E;
            },
          ],
          "ease-in-back": [
            "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
            function (f, E, I, A, T) {
              return (
                T === void 0 && (T = 1.70158),
                I * (f /= A) * f * ((T + 1) * f - T) + E
              );
            },
          ],
          "ease-out-back": [
            "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
            function (f, E, I, A, T) {
              return (
                T === void 0 && (T = 1.70158),
                I * ((f = f / A - 1) * f * ((T + 1) * f + T) + 1) + E
              );
            },
          ],
          "ease-in-out-back": [
            "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
            function (f, E, I, A, T) {
              return (
                T === void 0 && (T = 1.70158),
                (f /= A / 2) < 1
                  ? (I / 2) * f * f * (((T *= 1.525) + 1) * f - T) + E
                  : (I / 2) *
                      ((f -= 2) * f * (((T *= 1.525) + 1) * f + T) + 2) +
                    E
              );
            },
          ],
        },
        h = {
          "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
          "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
          "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
        },
        b = document,
        _ = window,
        w = "bkwld-tram",
        m = /[\-\.0-9]/g,
        C = /[A-Z]/,
        O = "number",
        N = /^(rgb|#)/,
        P = /(em|cm|mm|in|pt|pc|px)$/,
        L = /(em|cm|mm|in|pt|pc|px|%)$/,
        H = /(deg|rad|turn)$/,
        X = "unitless",
        z = /(all|none) 0s ease 0s/,
        Z = /^(width|height)$/,
        k = " ",
        x = b.createElement("a"),
        v = ["Webkit", "Moz", "O", "ms"],
        R = ["-webkit-", "-moz-", "-o-", "-ms-"],
        F = function (f) {
          if (f in x.style) return { dom: f, css: f };
          var E,
            I,
            A = "",
            T = f.split("-");
          for (E = 0; E < T.length; E++)
            A += T[E].charAt(0).toUpperCase() + T[E].slice(1);
          for (E = 0; E < v.length; E++)
            if (((I = v[E] + A), I in x.style))
              return { dom: I, css: R[E] + f };
        },
        D = (t.support = {
          bind: Function.prototype.bind,
          transform: F("transform"),
          transition: F("transition"),
          backface: F("backface-visibility"),
          timing: F("transition-timing-function"),
        });
      if (D.transition) {
        var J = D.timing.dom;
        if (((x.style[J] = p["ease-in-back"][0]), !x.style[J]))
          for (var ee in h) p[ee][0] = h[ee];
      }
      var q = (t.frame = (function () {
          var f =
            _.requestAnimationFrame ||
            _.webkitRequestAnimationFrame ||
            _.mozRequestAnimationFrame ||
            _.oRequestAnimationFrame ||
            _.msRequestAnimationFrame;
          return f && D.bind
            ? f.bind(_)
            : function (E) {
                _.setTimeout(E, 16);
              };
        })()),
        V = (t.now = (function () {
          var f = _.performance,
            E = f && (f.now || f.webkitNow || f.msNow || f.mozNow);
          return E && D.bind
            ? E.bind(f)
            : Date.now ||
                function () {
                  return +new Date();
                };
        })()),
        K = d(function (f) {
          function E(te, ue) {
            var me = g(("" + te).split(k)),
              fe = me[0];
            ue = ue || {};
            var Le = W[fe];
            if (!Le) return l("Unsupported property: " + fe);
            if (!ue.weak || !this.props[fe]) {
              var We = Le[0],
                Fe = this.props[fe];
              return (
                Fe || (Fe = this.props[fe] = new We.Bare()),
                Fe.init(this.$el, me, Le, ue),
                Fe
              );
            }
          }
          function I(te, ue, me) {
            if (te) {
              var fe = typeof te;
              if (
                (ue ||
                  (this.timer && this.timer.destroy(),
                  (this.queue = []),
                  (this.active = !1)),
                fe == "number" && ue)
              )
                return (
                  (this.timer = new pe({
                    duration: te,
                    context: this,
                    complete: S,
                  })),
                  void (this.active = !0)
                );
              if (fe == "string" && ue) {
                switch (te) {
                  case "hide":
                    B.call(this);
                    break;
                  case "stop":
                    Q.call(this);
                    break;
                  case "redraw":
                    ae.call(this);
                    break;
                  default:
                    E.call(this, te, me && me[1]);
                }
                return S.call(this);
              }
              if (fe == "function") return void te.call(this, this);
              if (fe == "object") {
                var Le = 0;
                Je.call(
                  this,
                  te,
                  function (Te, z_) {
                    Te.span > Le && (Le = Te.span), Te.stop(), Te.animate(z_);
                  },
                  function (Te) {
                    "wait" in Te && (Le = u(Te.wait, 0));
                  }
                ),
                  be.call(this),
                  Le > 0 &&
                    ((this.timer = new pe({ duration: Le, context: this })),
                    (this.active = !0),
                    ue && (this.timer.complete = S));
                var We = this,
                  Fe = !1,
                  rn = {};
                q(function () {
                  Je.call(We, te, function (Te) {
                    Te.active && ((Fe = !0), (rn[Te.name] = Te.nextStyle));
                  }),
                    Fe && We.$el.css(rn);
                });
              }
            }
          }
          function A(te) {
            (te = u(te, 0)),
              this.active
                ? this.queue.push({ options: te })
                : ((this.timer = new pe({
                    duration: te,
                    context: this,
                    complete: S,
                  })),
                  (this.active = !0));
          }
          function T(te) {
            return this.active
              ? (this.queue.push({ options: te, args: arguments }),
                void (this.timer.complete = S))
              : l(
                  "No active transition timer. Use start() or wait() before then()."
                );
          }
          function S() {
            if (
              (this.timer && this.timer.destroy(),
              (this.active = !1),
              this.queue.length)
            ) {
              var te = this.queue.shift();
              I.call(this, te.options, !0, te.args);
            }
          }
          function Q(te) {
            this.timer && this.timer.destroy(),
              (this.queue = []),
              (this.active = !1);
            var ue;
            typeof te == "string"
              ? ((ue = {}), (ue[te] = 1))
              : (ue = typeof te == "object" && te != null ? te : this.props),
              Je.call(this, ue, Re),
              be.call(this);
          }
          function ie(te) {
            Q.call(this, te), Je.call(this, te, Er, X_);
          }
          function ge(te) {
            typeof te != "string" && (te = "block"),
              (this.el.style.display = te);
          }
          function B() {
            Q.call(this), (this.el.style.display = "none");
          }
          function ae() {
            this.el.offsetHeight;
          }
          function se() {
            Q.call(this), e.removeData(this.el, w), (this.$el = this.el = null);
          }
          function be() {
            var te,
              ue,
              me = [];
            this.upstream && me.push(this.upstream);
            for (te in this.props)
              (ue = this.props[te]), ue.active && me.push(ue.string);
            (me = me.join(",")),
              this.style !== me &&
                ((this.style = me), (this.el.style[D.transition.dom] = me));
          }
          function Je(te, ue, me) {
            var fe,
              Le,
              We,
              Fe,
              rn = ue !== Re,
              Te = {};
            for (fe in te)
              (We = te[fe]),
                fe in ve
                  ? (Te.transform || (Te.transform = {}),
                    (Te.transform[fe] = We))
                  : (C.test(fe) && (fe = r(fe)),
                    fe in W ? (Te[fe] = We) : (Fe || (Fe = {}), (Fe[fe] = We)));
            for (fe in Te) {
              if (((We = Te[fe]), (Le = this.props[fe]), !Le)) {
                if (!rn) continue;
                Le = E.call(this, fe);
              }
              ue.call(this, Le, We);
            }
            me && Fe && me.call(this, Fe);
          }
          function Re(te) {
            te.stop();
          }
          function Er(te, ue) {
            te.set(ue);
          }
          function X_(te) {
            this.$el.css(te);
          }
          function He(te, ue) {
            f[te] = function () {
              return this.children
                ? j_.call(this, ue, arguments)
                : (this.el && ue.apply(this, arguments), this);
            };
          }
          function j_(te, ue) {
            var me,
              fe = this.children.length;
            for (me = 0; fe > me; me++) te.apply(this.children[me], ue);
            return this;
          }
          (f.init = function (te) {
            if (
              ((this.$el = e(te)),
              (this.el = this.$el[0]),
              (this.props = {}),
              (this.queue = []),
              (this.style = ""),
              (this.active = !1),
              le.keepInherited && !le.fallback)
            ) {
              var ue = U(this.el, "transition");
              ue && !z.test(ue) && (this.upstream = ue);
            }
            D.backface &&
              le.hideBackface &&
              y(this.el, D.backface.css, "hidden");
          }),
            He("add", E),
            He("start", I),
            He("wait", A),
            He("then", T),
            He("next", S),
            He("stop", Q),
            He("set", ie),
            He("show", ge),
            He("hide", B),
            He("redraw", ae),
            He("destroy", se);
        }),
        G = d(K, function (f) {
          function E(I, A) {
            var T = e.data(I, w) || e.data(I, w, new K.Bare());
            return T.el || T.init(I), A ? T.start(A) : T;
          }
          f.init = function (I, A) {
            var T = e(I);
            if (!T.length) return this;
            if (T.length === 1) return E(T[0], A);
            var S = [];
            return (
              T.each(function (Q, ie) {
                S.push(E(ie, A));
              }),
              (this.children = S),
              this
            );
          };
        }),
        M = d(function (f) {
          function E() {
            var S = this.get();
            this.update("auto");
            var Q = this.get();
            return this.update(S), Q;
          }
          function I(S, Q, ie) {
            return Q !== void 0 && (ie = Q), S in p ? S : ie;
          }
          function A(S) {
            var Q = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(S);
            return (Q ? i(Q[1], Q[2], Q[3]) : S).replace(
              /#(\w)(\w)(\w)$/,
              "#$1$1$2$2$3$3"
            );
          }
          var T = { duration: 500, ease: "ease", delay: 0 };
          (f.init = function (S, Q, ie, ge) {
            (this.$el = S), (this.el = S[0]);
            var B = Q[0];
            ie[2] && (B = ie[2]),
              Y[B] && (B = Y[B]),
              (this.name = B),
              (this.type = ie[1]),
              (this.duration = u(Q[1], this.duration, T.duration)),
              (this.ease = I(Q[2], this.ease, T.ease)),
              (this.delay = u(Q[3], this.delay, T.delay)),
              (this.span = this.duration + this.delay),
              (this.active = !1),
              (this.nextStyle = null),
              (this.auto = Z.test(this.name)),
              (this.unit = ge.unit || this.unit || le.defaultUnit),
              (this.angle = ge.angle || this.angle || le.defaultAngle),
              le.fallback || ge.fallback
                ? (this.animate = this.fallback)
                : ((this.animate = this.transition),
                  (this.string =
                    this.name +
                    k +
                    this.duration +
                    "ms" +
                    (this.ease != "ease" ? k + p[this.ease][0] : "") +
                    (this.delay ? k + this.delay + "ms" : "")));
          }),
            (f.set = function (S) {
              (S = this.convert(S, this.type)), this.update(S), this.redraw();
            }),
            (f.transition = function (S) {
              (this.active = !0),
                (S = this.convert(S, this.type)),
                this.auto &&
                  (this.el.style[this.name] == "auto" &&
                    (this.update(this.get()), this.redraw()),
                  S == "auto" && (S = E.call(this))),
                (this.nextStyle = S);
            }),
            (f.fallback = function (S) {
              var Q =
                this.el.style[this.name] || this.convert(this.get(), this.type);
              (S = this.convert(S, this.type)),
                this.auto &&
                  (Q == "auto" && (Q = this.convert(this.get(), this.type)),
                  S == "auto" && (S = E.call(this))),
                (this.tween = new re({
                  from: Q,
                  to: S,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                  update: this.update,
                  context: this,
                }));
            }),
            (f.get = function () {
              return U(this.el, this.name);
            }),
            (f.update = function (S) {
              y(this.el, this.name, S);
            }),
            (f.stop = function () {
              (this.active || this.nextStyle) &&
                ((this.active = !1),
                (this.nextStyle = null),
                y(this.el, this.name, this.get()));
              var S = this.tween;
              S && S.context && S.destroy();
            }),
            (f.convert = function (S, Q) {
              if (S == "auto" && this.auto) return S;
              var ie,
                ge = typeof S == "number",
                B = typeof S == "string";
              switch (Q) {
                case O:
                  if (ge) return S;
                  if (B && S.replace(m, "") === "") return +S;
                  ie = "number(unitless)";
                  break;
                case N:
                  if (B) {
                    if (S === "" && this.original) return this.original;
                    if (Q.test(S))
                      return S.charAt(0) == "#" && S.length == 7 ? S : A(S);
                  }
                  ie = "hex or rgb string";
                  break;
                case P:
                  if (ge) return S + this.unit;
                  if (B && Q.test(S)) return S;
                  ie = "number(px) or string(unit)";
                  break;
                case L:
                  if (ge) return S + this.unit;
                  if (B && Q.test(S)) return S;
                  ie = "number(px) or string(unit or %)";
                  break;
                case H:
                  if (ge) return S + this.angle;
                  if (B && Q.test(S)) return S;
                  ie = "number(deg) or string(angle)";
                  break;
                case X:
                  if (ge || (B && L.test(S))) return S;
                  ie = "number(unitless) or string(unit or %)";
              }
              return s(ie, S), S;
            }),
            (f.redraw = function () {
              this.el.offsetHeight;
            });
        }),
        j = d(M, function (f, E) {
          f.init = function () {
            E.init.apply(this, arguments),
              this.original || (this.original = this.convert(this.get(), N));
          };
        }),
        oe = d(M, function (f, E) {
          (f.init = function () {
            E.init.apply(this, arguments), (this.animate = this.fallback);
          }),
            (f.get = function () {
              return this.$el[this.name]();
            }),
            (f.update = function (I) {
              this.$el[this.name](I);
            });
        }),
        ne = d(M, function (f, E) {
          function I(A, T) {
            var S, Q, ie, ge, B;
            for (S in A)
              (ge = ve[S]),
                (ie = ge[0]),
                (Q = ge[1] || S),
                (B = this.convert(A[S], ie)),
                T.call(this, Q, B, ie);
          }
          (f.init = function () {
            E.init.apply(this, arguments),
              this.current ||
                ((this.current = {}),
                ve.perspective &&
                  le.perspective &&
                  ((this.current.perspective = le.perspective),
                  y(this.el, this.name, this.style(this.current)),
                  this.redraw()));
          }),
            (f.set = function (A) {
              I.call(this, A, function (T, S) {
                this.current[T] = S;
              }),
                y(this.el, this.name, this.style(this.current)),
                this.redraw();
            }),
            (f.transition = function (A) {
              var T = this.values(A);
              this.tween = new ct({
                current: this.current,
                values: T,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
              });
              var S,
                Q = {};
              for (S in this.current) Q[S] = S in T ? T[S] : this.current[S];
              (this.active = !0), (this.nextStyle = this.style(Q));
            }),
            (f.fallback = function (A) {
              var T = this.values(A);
              this.tween = new ct({
                current: this.current,
                values: T,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
                update: this.update,
                context: this,
              });
            }),
            (f.update = function () {
              y(this.el, this.name, this.style(this.current));
            }),
            (f.style = function (A) {
              var T,
                S = "";
              for (T in A) S += T + "(" + A[T] + ") ";
              return S;
            }),
            (f.values = function (A) {
              var T,
                S = {};
              return (
                I.call(this, A, function (Q, ie, ge) {
                  (S[Q] = ie),
                    this.current[Q] === void 0 &&
                      ((T = 0),
                      ~Q.indexOf("scale") && (T = 1),
                      (this.current[Q] = this.convert(T, ge)));
                }),
                S
              );
            });
        }),
        re = d(function (f) {
          function E(B) {
            ie.push(B) === 1 && q(I);
          }
          function I() {
            var B,
              ae,
              se,
              be = ie.length;
            if (be)
              for (q(I), ae = V(), B = be; B--; )
                (se = ie[B]), se && se.render(ae);
          }
          function A(B) {
            var ae,
              se = e.inArray(B, ie);
            se >= 0 &&
              ((ae = ie.slice(se + 1)),
              (ie.length = se),
              ae.length && (ie = ie.concat(ae)));
          }
          function T(B) {
            return Math.round(B * ge) / ge;
          }
          function S(B, ae, se) {
            return i(
              B[0] + se * (ae[0] - B[0]),
              B[1] + se * (ae[1] - B[1]),
              B[2] + se * (ae[2] - B[2])
            );
          }
          var Q = { ease: p.ease[1], from: 0, to: 1 };
          (f.init = function (B) {
            (this.duration = B.duration || 0), (this.delay = B.delay || 0);
            var ae = B.ease || Q.ease;
            p[ae] && (ae = p[ae][1]),
              typeof ae != "function" && (ae = Q.ease),
              (this.ease = ae),
              (this.update = B.update || o),
              (this.complete = B.complete || o),
              (this.context = B.context || this),
              (this.name = B.name);
            var se = B.from,
              be = B.to;
            se === void 0 && (se = Q.from),
              be === void 0 && (be = Q.to),
              (this.unit = B.unit || ""),
              typeof se == "number" && typeof be == "number"
                ? ((this.begin = se), (this.change = be - se))
                : this.format(be, se),
              (this.value = this.begin + this.unit),
              (this.start = V()),
              B.autoplay !== !1 && this.play();
          }),
            (f.play = function () {
              this.active ||
                (this.start || (this.start = V()), (this.active = !0), E(this));
            }),
            (f.stop = function () {
              this.active && ((this.active = !1), A(this));
            }),
            (f.render = function (B) {
              var ae,
                se = B - this.start;
              if (this.delay) {
                if (se <= this.delay) return;
                se -= this.delay;
              }
              if (se < this.duration) {
                var be = this.ease(se, 0, 1, this.duration);
                return (
                  (ae = this.startRGB
                    ? S(this.startRGB, this.endRGB, be)
                    : T(this.begin + be * this.change)),
                  (this.value = ae + this.unit),
                  void this.update.call(this.context, this.value)
                );
              }
              (ae = this.endHex || this.begin + this.change),
                (this.value = ae + this.unit),
                this.update.call(this.context, this.value),
                this.complete.call(this.context),
                this.destroy();
            }),
            (f.format = function (B, ae) {
              if (((ae += ""), (B += ""), B.charAt(0) == "#"))
                return (
                  (this.startRGB = n(ae)),
                  (this.endRGB = n(B)),
                  (this.endHex = B),
                  (this.begin = 0),
                  void (this.change = 1)
                );
              if (!this.unit) {
                var se = ae.replace(m, ""),
                  be = B.replace(m, "");
                se !== be && a("tween", ae, B), (this.unit = se);
              }
              (ae = parseFloat(ae)),
                (B = parseFloat(B)),
                (this.begin = this.value = ae),
                (this.change = B - ae);
            }),
            (f.destroy = function () {
              this.stop(),
                (this.context = null),
                (this.ease = this.update = this.complete = o);
            });
          var ie = [],
            ge = 1e3;
        }),
        pe = d(re, function (f) {
          (f.init = function (E) {
            (this.duration = E.duration || 0),
              (this.complete = E.complete || o),
              (this.context = E.context),
              this.play();
          }),
            (f.render = function (E) {
              var I = E - this.start;
              I < this.duration ||
                (this.complete.call(this.context), this.destroy());
            });
        }),
        ct = d(re, function (f, E) {
          (f.init = function (I) {
            (this.context = I.context),
              (this.update = I.update),
              (this.tweens = []),
              (this.current = I.current);
            var A, T;
            for (A in I.values)
              (T = I.values[A]),
                this.current[A] !== T &&
                  this.tweens.push(
                    new re({
                      name: A,
                      from: this.current[A],
                      to: T,
                      duration: I.duration,
                      delay: I.delay,
                      ease: I.ease,
                      autoplay: !1,
                    })
                  );
            this.play();
          }),
            (f.render = function (I) {
              var A,
                T,
                S = this.tweens.length,
                Q = !1;
              for (A = S; A--; )
                (T = this.tweens[A]),
                  T.context &&
                    (T.render(I), (this.current[T.name] = T.value), (Q = !0));
              return Q
                ? void (this.update && this.update.call(this.context))
                : this.destroy();
            }),
            (f.destroy = function () {
              if ((E.destroy.call(this), this.tweens)) {
                var I,
                  A = this.tweens.length;
                for (I = A; I--; ) this.tweens[I].destroy();
                (this.tweens = null), (this.current = null);
              }
            });
        }),
        le = (t.config = {
          debug: !1,
          defaultUnit: "px",
          defaultAngle: "deg",
          keepInherited: !1,
          hideBackface: !1,
          perspective: "",
          fallback: !D.transition,
          agentTests: [],
        });
      (t.fallback = function (f) {
        if (!D.transition) return (le.fallback = !0);
        le.agentTests.push("(" + f + ")");
        var E = new RegExp(le.agentTests.join("|"), "i");
        le.fallback = E.test(navigator.userAgent);
      }),
        t.fallback("6.0.[2-5] Safari"),
        (t.tween = function (f) {
          return new re(f);
        }),
        (t.delay = function (f, E, I) {
          return new pe({ complete: E, duration: f, context: I });
        }),
        (e.fn.tram = function (f) {
          return t.call(null, this, f);
        });
      var y = e.style,
        U = e.css,
        Y = { transform: D.transform && D.transform.css },
        W = {
          color: [j, N],
          background: [j, N, "background-color"],
          "outline-color": [j, N],
          "border-color": [j, N],
          "border-top-color": [j, N],
          "border-right-color": [j, N],
          "border-bottom-color": [j, N],
          "border-left-color": [j, N],
          "border-width": [M, P],
          "border-top-width": [M, P],
          "border-right-width": [M, P],
          "border-bottom-width": [M, P],
          "border-left-width": [M, P],
          "border-spacing": [M, P],
          "letter-spacing": [M, P],
          margin: [M, P],
          "margin-top": [M, P],
          "margin-right": [M, P],
          "margin-bottom": [M, P],
          "margin-left": [M, P],
          padding: [M, P],
          "padding-top": [M, P],
          "padding-right": [M, P],
          "padding-bottom": [M, P],
          "padding-left": [M, P],
          "outline-width": [M, P],
          opacity: [M, O],
          top: [M, L],
          right: [M, L],
          bottom: [M, L],
          left: [M, L],
          "font-size": [M, L],
          "text-indent": [M, L],
          "word-spacing": [M, L],
          width: [M, L],
          "min-width": [M, L],
          "max-width": [M, L],
          height: [M, L],
          "min-height": [M, L],
          "max-height": [M, L],
          "line-height": [M, X],
          "scroll-top": [oe, O, "scrollTop"],
          "scroll-left": [oe, O, "scrollLeft"],
        },
        ve = {};
      D.transform &&
        ((W.transform = [ne]),
        (ve = {
          x: [L, "translateX"],
          y: [L, "translateY"],
          rotate: [H],
          rotateX: [H],
          rotateY: [H],
          scale: [O],
          scaleX: [O],
          scaleY: [O],
          skew: [H],
          skewX: [H],
          skewY: [H],
        })),
        D.transform &&
          D.backface &&
          ((ve.z = [L, "translateZ"]),
          (ve.rotateZ = [H]),
          (ve.scaleZ = [O]),
          (ve.perspective = [P]));
      var xt = /ms/,
        lt = /s|\./;
      return (e.tram = t);
    })(window.jQuery);
  });
  var Fs = c((HU, qs) => {
    "use strict";
    var J_ = window.$,
      eb = Li() && J_.tram;
    qs.exports = (function () {
      var e = {};
      e.VERSION = "1.6.0-Webflow";
      var t = {},
        r = Array.prototype,
        n = Object.prototype,
        i = Function.prototype,
        o = r.push,
        s = r.slice,
        a = r.concat,
        u = n.toString,
        l = n.hasOwnProperty,
        g = r.forEach,
        d = r.map,
        p = r.reduce,
        h = r.reduceRight,
        b = r.filter,
        _ = r.every,
        w = r.some,
        m = r.indexOf,
        C = r.lastIndexOf,
        O = Array.isArray,
        N = Object.keys,
        P = i.bind,
        L =
          (e.each =
          e.forEach =
            function (v, R, F) {
              if (v == null) return v;
              if (g && v.forEach === g) v.forEach(R, F);
              else if (v.length === +v.length) {
                for (var D = 0, J = v.length; D < J; D++)
                  if (R.call(F, v[D], D, v) === t) return;
              } else
                for (var ee = e.keys(v), D = 0, J = ee.length; D < J; D++)
                  if (R.call(F, v[ee[D]], ee[D], v) === t) return;
              return v;
            });
      (e.map = e.collect =
        function (v, R, F) {
          var D = [];
          return v == null
            ? D
            : d && v.map === d
            ? v.map(R, F)
            : (L(v, function (J, ee, q) {
                D.push(R.call(F, J, ee, q));
              }),
              D);
        }),
        (e.find = e.detect =
          function (v, R, F) {
            var D;
            return (
              H(v, function (J, ee, q) {
                if (R.call(F, J, ee, q)) return (D = J), !0;
              }),
              D
            );
          }),
        (e.filter = e.select =
          function (v, R, F) {
            var D = [];
            return v == null
              ? D
              : b && v.filter === b
              ? v.filter(R, F)
              : (L(v, function (J, ee, q) {
                  R.call(F, J, ee, q) && D.push(J);
                }),
                D);
          });
      var H =
        (e.some =
        e.any =
          function (v, R, F) {
            R || (R = e.identity);
            var D = !1;
            return v == null
              ? D
              : w && v.some === w
              ? v.some(R, F)
              : (L(v, function (J, ee, q) {
                  if (D || (D = R.call(F, J, ee, q))) return t;
                }),
                !!D);
          });
      (e.contains = e.include =
        function (v, R) {
          return v == null
            ? !1
            : m && v.indexOf === m
            ? v.indexOf(R) != -1
            : H(v, function (F) {
                return F === R;
              });
        }),
        (e.delay = function (v, R) {
          var F = s.call(arguments, 2);
          return setTimeout(function () {
            return v.apply(null, F);
          }, R);
        }),
        (e.defer = function (v) {
          return e.delay.apply(e, [v, 1].concat(s.call(arguments, 1)));
        }),
        (e.throttle = function (v) {
          var R, F, D;
          return function () {
            R ||
              ((R = !0),
              (F = arguments),
              (D = this),
              eb.frame(function () {
                (R = !1), v.apply(D, F);
              }));
          };
        }),
        (e.debounce = function (v, R, F) {
          var D,
            J,
            ee,
            q,
            V,
            K = function () {
              var G = e.now() - q;
              G < R
                ? (D = setTimeout(K, R - G))
                : ((D = null), F || ((V = v.apply(ee, J)), (ee = J = null)));
            };
          return function () {
            (ee = this), (J = arguments), (q = e.now());
            var G = F && !D;
            return (
              D || (D = setTimeout(K, R)),
              G && ((V = v.apply(ee, J)), (ee = J = null)),
              V
            );
          };
        }),
        (e.defaults = function (v) {
          if (!e.isObject(v)) return v;
          for (var R = 1, F = arguments.length; R < F; R++) {
            var D = arguments[R];
            for (var J in D) v[J] === void 0 && (v[J] = D[J]);
          }
          return v;
        }),
        (e.keys = function (v) {
          if (!e.isObject(v)) return [];
          if (N) return N(v);
          var R = [];
          for (var F in v) e.has(v, F) && R.push(F);
          return R;
        }),
        (e.has = function (v, R) {
          return l.call(v, R);
        }),
        (e.isObject = function (v) {
          return v === Object(v);
        }),
        (e.now =
          Date.now ||
          function () {
            return new Date().getTime();
          }),
        (e.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
        });
      var X = /(.)^/,
        z = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029",
        },
        Z = /\\|'|\r|\n|\u2028|\u2029/g,
        k = function (v) {
          return "\\" + z[v];
        },
        x = /^\s*(\w|\$)+\s*$/;
      return (
        (e.template = function (v, R, F) {
          !R && F && (R = F), (R = e.defaults({}, R, e.templateSettings));
          var D = RegExp(
              [
                (R.escape || X).source,
                (R.interpolate || X).source,
                (R.evaluate || X).source,
              ].join("|") + "|$",
              "g"
            ),
            J = 0,
            ee = "__p+='";
          v.replace(D, function (G, M, j, oe, ne) {
            return (
              (ee += v.slice(J, ne).replace(Z, k)),
              (J = ne + G.length),
              M
                ? (ee +=
                    `'+
((__t=(` +
                    M +
                    `))==null?'':_.escape(__t))+
'`)
                : j
                ? (ee +=
                    `'+
((__t=(` +
                    j +
                    `))==null?'':__t)+
'`)
                : oe &&
                  (ee +=
                    `';
` +
                    oe +
                    `
__p+='`),
              G
            );
          }),
            (ee += `';
`);
          var q = R.variable;
          if (q) {
            if (!x.test(q))
              throw new Error("variable is not a bare identifier: " + q);
          } else
            (ee =
              `with(obj||{}){
` +
              ee +
              `}
`),
              (q = "obj");
          ee =
            `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` +
            ee +
            `return __p;
`;
          var V;
          try {
            V = new Function(R.variable || "obj", "_", ee);
          } catch (G) {
            throw ((G.source = ee), G);
          }
          var K = function (G) {
            return V.call(this, G, e);
          };
          return (
            (K.source =
              "function(" +
              q +
              `){
` +
              ee +
              "}"),
            K
          );
        }),
        e
      );
    })();
  });
  var Ue = c((WU, Hs) => {
    "use strict";
    var de = {},
      Vt = {},
      Ut = [],
      Pi = window.Webflow || [],
      Et = window.jQuery,
      je = Et(window),
      tb = Et(document),
      tt = Et.isFunction,
      Xe = (de._ = Fs()),
      Ds = (de.tram = Li() && Et.tram),
      an = !1,
      qi = !1;
    Ds.config.hideBackface = !1;
    Ds.config.keepInherited = !0;
    de.define = function (e, t, r) {
      Vt[e] && Gs(Vt[e]);
      var n = (Vt[e] = t(Et, Xe, r) || {});
      return ks(n), n;
    };
    de.require = function (e) {
      return Vt[e];
    };
    function ks(e) {
      de.env() &&
        (tt(e.design) && je.on("__wf_design", e.design),
        tt(e.preview) && je.on("__wf_preview", e.preview)),
        tt(e.destroy) && je.on("__wf_destroy", e.destroy),
        e.ready && tt(e.ready) && rb(e);
    }
    function rb(e) {
      if (an) {
        e.ready();
        return;
      }
      Xe.contains(Ut, e.ready) || Ut.push(e.ready);
    }
    function Gs(e) {
      tt(e.design) && je.off("__wf_design", e.design),
        tt(e.preview) && je.off("__wf_preview", e.preview),
        tt(e.destroy) && je.off("__wf_destroy", e.destroy),
        e.ready && tt(e.ready) && nb(e);
    }
    function nb(e) {
      Ut = Xe.filter(Ut, function (t) {
        return t !== e.ready;
      });
    }
    de.push = function (e) {
      if (an) {
        tt(e) && e();
        return;
      }
      Pi.push(e);
    };
    de.env = function (e) {
      var t = window.__wf_design,
        r = typeof t < "u";
      if (!e) return r;
      if (e === "design") return r && t;
      if (e === "preview") return r && !t;
      if (e === "slug") return r && window.__wf_slug;
      if (e === "editor") return window.WebflowEditor;
      if (e === "test") return window.__wf_test;
      if (e === "frame") return window !== window.top;
    };
    var on = navigator.userAgent.toLowerCase(),
      Vs = (de.env.touch =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)),
      ib = (de.env.chrome =
        /chrome/.test(on) &&
        /Google/.test(navigator.vendor) &&
        parseInt(on.match(/chrome\/(\d+)\./)[1], 10)),
      ob = (de.env.ios = /(ipod|iphone|ipad)/.test(on));
    de.env.safari = /safari/.test(on) && !ib && !ob;
    var Ni;
    Vs &&
      tb.on("touchstart mousedown", function (e) {
        Ni = e.target;
      });
    de.validClick = Vs
      ? function (e) {
          return e === Ni || Et.contains(e, Ni);
        }
      : function () {
          return !0;
        };
    var Us = "resize.webflow orientationchange.webflow load.webflow",
      ab = "scroll.webflow " + Us;
    de.resize = Fi(je, Us);
    de.scroll = Fi(je, ab);
    de.redraw = Fi();
    function Fi(e, t) {
      var r = [],
        n = {};
      return (
        (n.up = Xe.throttle(function (i) {
          Xe.each(r, function (o) {
            o(i);
          });
        })),
        e && t && e.on(t, n.up),
        (n.on = function (i) {
          typeof i == "function" && (Xe.contains(r, i) || r.push(i));
        }),
        (n.off = function (i) {
          if (!arguments.length) {
            r = [];
            return;
          }
          r = Xe.filter(r, function (o) {
            return o !== i;
          });
        }),
        n
      );
    }
    de.location = function (e) {
      window.location = e;
    };
    de.env() && (de.location = function () {});
    de.ready = function () {
      (an = !0), qi ? sb() : Xe.each(Ut, Ms), Xe.each(Pi, Ms), de.resize.up();
    };
    function Ms(e) {
      tt(e) && e();
    }
    function sb() {
      (qi = !1), Xe.each(Vt, ks);
    }
    var Ct;
    de.load = function (e) {
      Ct.then(e);
    };
    function Bs() {
      Ct && (Ct.reject(), je.off("load", Ct.resolve)),
        (Ct = new Et.Deferred()),
        je.on("load", Ct.resolve);
    }
    de.destroy = function (e) {
      (e = e || {}),
        (qi = !0),
        je.triggerHandler("__wf_destroy"),
        e.domready != null && (an = e.domready),
        Xe.each(Vt, Gs),
        de.resize.off(),
        de.scroll.off(),
        de.redraw.off(),
        (Ut = []),
        (Pi = []),
        Ct.state() === "pending" && Bs();
    };
    Et(de.ready);
    Bs();
    Hs.exports = window.Webflow = de;
  });
  var js = c((XU, Xs) => {
    "use strict";
    var Ws = Ue();
    Ws.define(
      "brand",
      (Xs.exports = function (e) {
        var t = {},
          r = document,
          n = e("html"),
          i = e("body"),
          o = ".w-webflow-badge",
          s = window.location,
          a = /PhantomJS/i.test(navigator.userAgent),
          u =
            "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange",
          l;
        t.ready = function () {
          var h = n.attr("data-wf-status"),
            b = n.attr("data-wf-domain") || "";
          /\.webflow\.io$/i.test(b) && s.hostname !== b && (h = !0),
            h &&
              !a &&
              ((l = l || d()),
              p(),
              setTimeout(p, 500),
              e(r).off(u, g).on(u, g));
        };
        function g() {
          var h =
            r.fullScreen ||
            r.mozFullScreen ||
            r.webkitIsFullScreen ||
            r.msFullscreenElement ||
            !!r.webkitFullscreenElement;
          e(l).attr("style", h ? "display: none !important;" : "");
        }
        function d() {
          var h = e('<a class="w-webflow-badge"></a>').attr(
              "href",
              "https://webflow.com?utm_campaign=brandjs"
            ),
            b = e("<img>")
              .attr(
                "src",
                "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-icon-d2.89e12c322e.svg"
              )
              .attr("alt", "")
              .css({ marginRight: "4px", width: "26px" }),
            _ = e("<img>")
              .attr(
                "src",
                "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-text-d2.c82cec3b78.svg"
              )
              .attr("alt", "Made in Webflow");
          return h.append(b, _), h[0];
        }
        function p() {
          var h = i.children(o),
            b = h.length && h.get(0) === l,
            _ = Ws.env("editor");
          if (b) {
            _ && h.remove();
            return;
          }
          h.length && h.remove(), _ || i.append(l);
        }
        return t;
      })
    );
  });
  var Ks = c((jU, zs) => {
    "use strict";
    var Mi = Ue();
    Mi.define(
      "edit",
      (zs.exports = function (e, t, r) {
        if (
          ((r = r || {}),
          (Mi.env("test") || Mi.env("frame")) && !r.fixture && !ub())
        )
          return { exit: 1 };
        var n = {},
          i = e(window),
          o = e(document.documentElement),
          s = document.location,
          a = "hashchange",
          u,
          l = r.load || p,
          g = !1;
        try {
          g =
            localStorage &&
            localStorage.getItem &&
            localStorage.getItem("WebflowEditor");
        } catch {}
        g
          ? l()
          : s.search
          ? (/[?&](edit)(?:[=&?]|$)/.test(s.search) ||
              /\?edit$/.test(s.href)) &&
            l()
          : i.on(a, d).triggerHandler(a);
        function d() {
          u || (/\?edit/.test(s.hash) && l());
        }
        function p() {
          (u = !0),
            (window.WebflowEditor = !0),
            i.off(a, d),
            C(function (N) {
              e.ajax({
                url: m("https://editor-api.webflow.com/api/editor/view"),
                data: { siteId: o.attr("data-wf-site") },
                xhrFields: { withCredentials: !0 },
                dataType: "json",
                crossDomain: !0,
                success: h(N),
              });
            });
        }
        function h(N) {
          return function (P) {
            if (!P) {
              console.error("Could not load editor data");
              return;
            }
            (P.thirdPartyCookiesSupported = N),
              b(w(P.scriptPath), function () {
                window.WebflowEditor(P);
              });
          };
        }
        function b(N, P) {
          e.ajax({ type: "GET", url: N, dataType: "script", cache: !0 }).then(
            P,
            _
          );
        }
        function _(N, P, L) {
          throw (console.error("Could not load editor script: " + P), L);
        }
        function w(N) {
          return N.indexOf("//") >= 0
            ? N
            : m("https://editor-api.webflow.com" + N);
        }
        function m(N) {
          return N.replace(/([^:])\/\//g, "$1/");
        }
        function C(N) {
          var P = window.document.createElement("iframe");
          (P.src = "https://webflow.com/site/third-party-cookie-check.html"),
            (P.style.display = "none"),
            (P.sandbox = "allow-scripts allow-same-origin");
          var L = function (H) {
            H.data === "WF_third_party_cookies_unsupported"
              ? (O(P, L), N(!1))
              : H.data === "WF_third_party_cookies_supported" &&
                (O(P, L), N(!0));
          };
          (P.onerror = function () {
            O(P, L), N(!1);
          }),
            window.addEventListener("message", L, !1),
            window.document.body.appendChild(P);
        }
        function O(N, P) {
          window.removeEventListener("message", P, !1), N.remove();
        }
        return n;
      })
    );
    function ub() {
      try {
        return window.top.__Cypress__;
      } catch {
        return !1;
      }
    }
  });
  var $s = c((zU, Ys) => {
    "use strict";
    var cb = Ue();
    cb.define(
      "focus-visible",
      (Ys.exports = function () {
        function e(r) {
          var n = !0,
            i = !1,
            o = null,
            s = {
              text: !0,
              search: !0,
              url: !0,
              tel: !0,
              email: !0,
              password: !0,
              number: !0,
              date: !0,
              month: !0,
              week: !0,
              time: !0,
              datetime: !0,
              "datetime-local": !0,
            };
          function a(O) {
            return !!(
              O &&
              O !== document &&
              O.nodeName !== "HTML" &&
              O.nodeName !== "BODY" &&
              "classList" in O &&
              "contains" in O.classList
            );
          }
          function u(O) {
            var N = O.type,
              P = O.tagName;
            return !!(
              (P === "INPUT" && s[N] && !O.readOnly) ||
              (P === "TEXTAREA" && !O.readOnly) ||
              O.isContentEditable
            );
          }
          function l(O) {
            O.getAttribute("data-wf-focus-visible") ||
              O.setAttribute("data-wf-focus-visible", "true");
          }
          function g(O) {
            O.getAttribute("data-wf-focus-visible") &&
              O.removeAttribute("data-wf-focus-visible");
          }
          function d(O) {
            O.metaKey ||
              O.altKey ||
              O.ctrlKey ||
              (a(r.activeElement) && l(r.activeElement), (n = !0));
          }
          function p() {
            n = !1;
          }
          function h(O) {
            a(O.target) && (n || u(O.target)) && l(O.target);
          }
          function b(O) {
            a(O.target) &&
              O.target.hasAttribute("data-wf-focus-visible") &&
              ((i = !0),
              window.clearTimeout(o),
              (o = window.setTimeout(function () {
                i = !1;
              }, 100)),
              g(O.target));
          }
          function _() {
            document.visibilityState === "hidden" && (i && (n = !0), w());
          }
          function w() {
            document.addEventListener("mousemove", C),
              document.addEventListener("mousedown", C),
              document.addEventListener("mouseup", C),
              document.addEventListener("pointermove", C),
              document.addEventListener("pointerdown", C),
              document.addEventListener("pointerup", C),
              document.addEventListener("touchmove", C),
              document.addEventListener("touchstart", C),
              document.addEventListener("touchend", C);
          }
          function m() {
            document.removeEventListener("mousemove", C),
              document.removeEventListener("mousedown", C),
              document.removeEventListener("mouseup", C),
              document.removeEventListener("pointermove", C),
              document.removeEventListener("pointerdown", C),
              document.removeEventListener("pointerup", C),
              document.removeEventListener("touchmove", C),
              document.removeEventListener("touchstart", C),
              document.removeEventListener("touchend", C);
          }
          function C(O) {
            (O.target.nodeName && O.target.nodeName.toLowerCase() === "html") ||
              ((n = !1), m());
          }
          document.addEventListener("keydown", d, !0),
            document.addEventListener("mousedown", p, !0),
            document.addEventListener("pointerdown", p, !0),
            document.addEventListener("touchstart", p, !0),
            document.addEventListener("visibilitychange", _, !0),
            w(),
            r.addEventListener("focus", h, !0),
            r.addEventListener("blur", b, !0);
        }
        function t() {
          if (typeof document < "u")
            try {
              document.querySelector(":focus-visible");
            } catch {
              e(document);
            }
        }
        return { ready: t };
      })
    );
  });
  var Js = c((KU, Zs) => {
    "use strict";
    var Qs = Ue();
    Qs.define(
      "focus",
      (Zs.exports = function () {
        var e = [],
          t = !1;
        function r(s) {
          t &&
            (s.preventDefault(),
            s.stopPropagation(),
            s.stopImmediatePropagation(),
            e.unshift(s));
        }
        function n(s) {
          var a = s.target,
            u = a.tagName;
          return (
            (/^a$/i.test(u) && a.href != null) ||
            (/^(button|textarea)$/i.test(u) && a.disabled !== !0) ||
            (/^input$/i.test(u) &&
              /^(button|reset|submit|radio|checkbox)$/i.test(a.type) &&
              !a.disabled) ||
            (!/^(button|input|textarea|select|a)$/i.test(u) &&
              !Number.isNaN(Number.parseFloat(a.tabIndex))) ||
            /^audio$/i.test(u) ||
            (/^video$/i.test(u) && a.controls === !0)
          );
        }
        function i(s) {
          n(s) &&
            ((t = !0),
            setTimeout(() => {
              for (t = !1, s.target.focus(); e.length > 0; ) {
                var a = e.pop();
                a.target.dispatchEvent(new MouseEvent(a.type, a));
              }
            }, 0));
        }
        function o() {
          typeof document < "u" &&
            document.body.hasAttribute("data-wf-focus-within") &&
            Qs.env.safari &&
            (document.addEventListener("mousedown", i, !0),
            document.addEventListener("mouseup", r, !0),
            document.addEventListener("click", r, !0));
        }
        return { ready: o };
      })
    );
  });
  var ru = c((YU, tu) => {
    "use strict";
    var Di = window.jQuery,
      rt = {},
      sn = [],
      eu = ".w-ix",
      un = {
        reset: function (e, t) {
          t.__wf_intro = null;
        },
        intro: function (e, t) {
          t.__wf_intro ||
            ((t.__wf_intro = !0), Di(t).triggerHandler(rt.types.INTRO));
        },
        outro: function (e, t) {
          t.__wf_intro &&
            ((t.__wf_intro = null), Di(t).triggerHandler(rt.types.OUTRO));
        },
      };
    rt.triggers = {};
    rt.types = { INTRO: "w-ix-intro" + eu, OUTRO: "w-ix-outro" + eu };
    rt.init = function () {
      for (var e = sn.length, t = 0; t < e; t++) {
        var r = sn[t];
        r[0](0, r[1]);
      }
      (sn = []), Di.extend(rt.triggers, un);
    };
    rt.async = function () {
      for (var e in un) {
        var t = un[e];
        un.hasOwnProperty(e) &&
          (rt.triggers[e] = function (r, n) {
            sn.push([t, n]);
          });
      }
    };
    rt.async();
    tu.exports = rt;
  });
  var ln = c(($U, ou) => {
    "use strict";
    var ki = ru();
    function nu(e, t) {
      var r = document.createEvent("CustomEvent");
      r.initCustomEvent(t, !0, !0, null), e.dispatchEvent(r);
    }
    var lb = window.jQuery,
      cn = {},
      iu = ".w-ix",
      fb = {
        reset: function (e, t) {
          ki.triggers.reset(e, t);
        },
        intro: function (e, t) {
          ki.triggers.intro(e, t), nu(t, "COMPONENT_ACTIVE");
        },
        outro: function (e, t) {
          ki.triggers.outro(e, t), nu(t, "COMPONENT_INACTIVE");
        },
      };
    cn.triggers = {};
    cn.types = { INTRO: "w-ix-intro" + iu, OUTRO: "w-ix-outro" + iu };
    lb.extend(cn.triggers, fb);
    ou.exports = cn;
  });
  var au = c((QU, ft) => {
    function Gi(e) {
      return (
        (ft.exports = Gi =
          typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  typeof Symbol == "function" &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        (ft.exports.__esModule = !0),
        (ft.exports.default = ft.exports),
        Gi(e)
      );
    }
    (ft.exports = Gi),
      (ft.exports.__esModule = !0),
      (ft.exports.default = ft.exports);
  });
  var fn = c((ZU, mr) => {
    var db = au().default;
    function su(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        r = new WeakMap();
      return (su = function (i) {
        return i ? r : t;
      })(e);
    }
    function pb(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (db(e) != "object" && typeof e != "function"))
        return { default: e };
      var r = su(t);
      if (r && r.has(e)) return r.get(e);
      var n = { __proto__: null },
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && {}.hasOwnProperty.call(e, o)) {
          var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(n, o, s)
            : (n[o] = e[o]);
        }
      return (n.default = e), r && r.set(e, n), n;
    }
    (mr.exports = pb),
      (mr.exports.__esModule = !0),
      (mr.exports.default = mr.exports);
  });
  var uu = c((JU, _r) => {
    function gb(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (_r.exports = gb),
      (_r.exports.__esModule = !0),
      (_r.exports.default = _r.exports);
  });
  var Ee = c((eB, cu) => {
    var dn = function (e) {
      return e && e.Math == Math && e;
    };
    cu.exports =
      dn(typeof globalThis == "object" && globalThis) ||
      dn(typeof window == "object" && window) ||
      dn(typeof self == "object" && self) ||
      dn(typeof global == "object" && global) ||
      (function () {
        return this;
      })() ||
      Function("return this")();
  });
  var Bt = c((tB, lu) => {
    lu.exports = function (e) {
      try {
        return !!e();
      } catch {
        return !0;
      }
    };
  });
  var Rt = c((rB, fu) => {
    var vb = Bt();
    fu.exports = !vb(function () {
      return (
        Object.defineProperty({}, 1, {
          get: function () {
            return 7;
          },
        })[1] != 7
      );
    });
  });
  var pn = c((nB, du) => {
    var br = Function.prototype.call;
    du.exports = br.bind
      ? br.bind(br)
      : function () {
          return br.apply(br, arguments);
        };
  });
  var hu = c((vu) => {
    "use strict";
    var pu = {}.propertyIsEnumerable,
      gu = Object.getOwnPropertyDescriptor,
      hb = gu && !pu.call({ 1: 2 }, 1);
    vu.f = hb
      ? function (t) {
          var r = gu(this, t);
          return !!r && r.enumerable;
        }
      : pu;
  });
  var Vi = c((oB, yu) => {
    yu.exports = function (e, t) {
      return {
        enumerable: !(e & 1),
        configurable: !(e & 2),
        writable: !(e & 4),
        value: t,
      };
    };
  });
  var ze = c((aB, mu) => {
    var Eu = Function.prototype,
      Ui = Eu.bind,
      Bi = Eu.call,
      yb = Ui && Ui.bind(Bi);
    mu.exports = Ui
      ? function (e) {
          return e && yb(Bi, e);
        }
      : function (e) {
          return (
            e &&
            function () {
              return Bi.apply(e, arguments);
            }
          );
        };
  });
  var Tu = c((sB, bu) => {
    var _u = ze(),
      Eb = _u({}.toString),
      mb = _u("".slice);
    bu.exports = function (e) {
      return mb(Eb(e), 8, -1);
    };
  });
  var wu = c((uB, Iu) => {
    var _b = Ee(),
      bb = ze(),
      Tb = Bt(),
      Ib = Tu(),
      Hi = _b.Object,
      wb = bb("".split);
    Iu.exports = Tb(function () {
      return !Hi("z").propertyIsEnumerable(0);
    })
      ? function (e) {
          return Ib(e) == "String" ? wb(e, "") : Hi(e);
        }
      : Hi;
  });
  var Wi = c((cB, Ou) => {
    var Ob = Ee(),
      Ab = Ob.TypeError;
    Ou.exports = function (e) {
      if (e == null) throw Ab("Can't call method on " + e);
      return e;
    };
  });
  var Tr = c((lB, Au) => {
    var Sb = wu(),
      xb = Wi();
    Au.exports = function (e) {
      return Sb(xb(e));
    };
  });
  var nt = c((fB, Su) => {
    Su.exports = function (e) {
      return typeof e == "function";
    };
  });
  var Ht = c((dB, xu) => {
    var Cb = nt();
    xu.exports = function (e) {
      return typeof e == "object" ? e !== null : Cb(e);
    };
  });
  var Ir = c((pB, Cu) => {
    var Xi = Ee(),
      Rb = nt(),
      Lb = function (e) {
        return Rb(e) ? e : void 0;
      };
    Cu.exports = function (e, t) {
      return arguments.length < 2 ? Lb(Xi[e]) : Xi[e] && Xi[e][t];
    };
  });
  var Lu = c((gB, Ru) => {
    var Nb = ze();
    Ru.exports = Nb({}.isPrototypeOf);
  });
  var Pu = c((vB, Nu) => {
    var Pb = Ir();
    Nu.exports = Pb("navigator", "userAgent") || "";
  });
  var Vu = c((hB, Gu) => {
    var ku = Ee(),
      ji = Pu(),
      qu = ku.process,
      Fu = ku.Deno,
      Mu = (qu && qu.versions) || (Fu && Fu.version),
      Du = Mu && Mu.v8,
      Ke,
      gn;
    Du &&
      ((Ke = Du.split(".")),
      (gn = Ke[0] > 0 && Ke[0] < 4 ? 1 : +(Ke[0] + Ke[1])));
    !gn &&
      ji &&
      ((Ke = ji.match(/Edge\/(\d+)/)),
      (!Ke || Ke[1] >= 74) &&
        ((Ke = ji.match(/Chrome\/(\d+)/)), Ke && (gn = +Ke[1])));
    Gu.exports = gn;
  });
  var zi = c((yB, Bu) => {
    var Uu = Vu(),
      qb = Bt();
    Bu.exports =
      !!Object.getOwnPropertySymbols &&
      !qb(function () {
        var e = Symbol();
        return (
          !String(e) ||
          !(Object(e) instanceof Symbol) ||
          (!Symbol.sham && Uu && Uu < 41)
        );
      });
  });
  var Ki = c((EB, Hu) => {
    var Fb = zi();
    Hu.exports = Fb && !Symbol.sham && typeof Symbol.iterator == "symbol";
  });
  var Yi = c((mB, Wu) => {
    var Mb = Ee(),
      Db = Ir(),
      kb = nt(),
      Gb = Lu(),
      Vb = Ki(),
      Ub = Mb.Object;
    Wu.exports = Vb
      ? function (e) {
          return typeof e == "symbol";
        }
      : function (e) {
          var t = Db("Symbol");
          return kb(t) && Gb(t.prototype, Ub(e));
        };
  });
  var ju = c((_B, Xu) => {
    var Bb = Ee(),
      Hb = Bb.String;
    Xu.exports = function (e) {
      try {
        return Hb(e);
      } catch {
        return "Object";
      }
    };
  });
  var Ku = c((bB, zu) => {
    var Wb = Ee(),
      Xb = nt(),
      jb = ju(),
      zb = Wb.TypeError;
    zu.exports = function (e) {
      if (Xb(e)) return e;
      throw zb(jb(e) + " is not a function");
    };
  });
  var $u = c((TB, Yu) => {
    var Kb = Ku();
    Yu.exports = function (e, t) {
      var r = e[t];
      return r == null ? void 0 : Kb(r);
    };
  });
  var Zu = c((IB, Qu) => {
    var Yb = Ee(),
      $i = pn(),
      Qi = nt(),
      Zi = Ht(),
      $b = Yb.TypeError;
    Qu.exports = function (e, t) {
      var r, n;
      if (
        (t === "string" && Qi((r = e.toString)) && !Zi((n = $i(r, e)))) ||
        (Qi((r = e.valueOf)) && !Zi((n = $i(r, e)))) ||
        (t !== "string" && Qi((r = e.toString)) && !Zi((n = $i(r, e))))
      )
        return n;
      throw $b("Can't convert object to primitive value");
    };
  });
  var ec = c((wB, Ju) => {
    Ju.exports = !1;
  });
  var vn = c((OB, rc) => {
    var tc = Ee(),
      Qb = Object.defineProperty;
    rc.exports = function (e, t) {
      try {
        Qb(tc, e, { value: t, configurable: !0, writable: !0 });
      } catch {
        tc[e] = t;
      }
      return t;
    };
  });
  var hn = c((AB, ic) => {
    var Zb = Ee(),
      Jb = vn(),
      nc = "__core-js_shared__",
      eT = Zb[nc] || Jb(nc, {});
    ic.exports = eT;
  });
  var Ji = c((SB, ac) => {
    var tT = ec(),
      oc = hn();
    (ac.exports = function (e, t) {
      return oc[e] || (oc[e] = t !== void 0 ? t : {});
    })("versions", []).push({
      version: "3.19.0",
      mode: tT ? "pure" : "global",
      copyright: "\xA9 2021 Denis Pushkarev (zloirock.ru)",
    });
  });
  var uc = c((xB, sc) => {
    var rT = Ee(),
      nT = Wi(),
      iT = rT.Object;
    sc.exports = function (e) {
      return iT(nT(e));
    };
  });
  var mt = c((CB, cc) => {
    var oT = ze(),
      aT = uc(),
      sT = oT({}.hasOwnProperty);
    cc.exports =
      Object.hasOwn ||
      function (t, r) {
        return sT(aT(t), r);
      };
  });
  var eo = c((RB, lc) => {
    var uT = ze(),
      cT = 0,
      lT = Math.random(),
      fT = uT((1).toString);
    lc.exports = function (e) {
      return "Symbol(" + (e === void 0 ? "" : e) + ")_" + fT(++cT + lT, 36);
    };
  });
  var to = c((LB, vc) => {
    var dT = Ee(),
      pT = Ji(),
      fc = mt(),
      gT = eo(),
      dc = zi(),
      gc = Ki(),
      Wt = pT("wks"),
      Lt = dT.Symbol,
      pc = Lt && Lt.for,
      vT = gc ? Lt : (Lt && Lt.withoutSetter) || gT;
    vc.exports = function (e) {
      if (!fc(Wt, e) || !(dc || typeof Wt[e] == "string")) {
        var t = "Symbol." + e;
        dc && fc(Lt, e)
          ? (Wt[e] = Lt[e])
          : gc && pc
          ? (Wt[e] = pc(t))
          : (Wt[e] = vT(t));
      }
      return Wt[e];
    };
  });
  var mc = c((NB, Ec) => {
    var hT = Ee(),
      yT = pn(),
      hc = Ht(),
      yc = Yi(),
      ET = $u(),
      mT = Zu(),
      _T = to(),
      bT = hT.TypeError,
      TT = _T("toPrimitive");
    Ec.exports = function (e, t) {
      if (!hc(e) || yc(e)) return e;
      var r = ET(e, TT),
        n;
      if (r) {
        if (
          (t === void 0 && (t = "default"), (n = yT(r, e, t)), !hc(n) || yc(n))
        )
          return n;
        throw bT("Can't convert object to primitive value");
      }
      return t === void 0 && (t = "number"), mT(e, t);
    };
  });
  var ro = c((PB, _c) => {
    var IT = mc(),
      wT = Yi();
    _c.exports = function (e) {
      var t = IT(e, "string");
      return wT(t) ? t : t + "";
    };
  });
  var io = c((qB, Tc) => {
    var OT = Ee(),
      bc = Ht(),
      no = OT.document,
      AT = bc(no) && bc(no.createElement);
    Tc.exports = function (e) {
      return AT ? no.createElement(e) : {};
    };
  });
  var oo = c((FB, Ic) => {
    var ST = Rt(),
      xT = Bt(),
      CT = io();
    Ic.exports =
      !ST &&
      !xT(function () {
        return (
          Object.defineProperty(CT("div"), "a", {
            get: function () {
              return 7;
            },
          }).a != 7
        );
      });
  });
  var ao = c((Oc) => {
    var RT = Rt(),
      LT = pn(),
      NT = hu(),
      PT = Vi(),
      qT = Tr(),
      FT = ro(),
      MT = mt(),
      DT = oo(),
      wc = Object.getOwnPropertyDescriptor;
    Oc.f = RT
      ? wc
      : function (t, r) {
          if (((t = qT(t)), (r = FT(r)), DT))
            try {
              return wc(t, r);
            } catch {}
          if (MT(t, r)) return PT(!LT(NT.f, t, r), t[r]);
        };
  });
  var wr = c((DB, Sc) => {
    var Ac = Ee(),
      kT = Ht(),
      GT = Ac.String,
      VT = Ac.TypeError;
    Sc.exports = function (e) {
      if (kT(e)) return e;
      throw VT(GT(e) + " is not an object");
    };
  });
  var Or = c((Rc) => {
    var UT = Ee(),
      BT = Rt(),
      HT = oo(),
      xc = wr(),
      WT = ro(),
      XT = UT.TypeError,
      Cc = Object.defineProperty;
    Rc.f = BT
      ? Cc
      : function (t, r, n) {
          if ((xc(t), (r = WT(r)), xc(n), HT))
            try {
              return Cc(t, r, n);
            } catch {}
          if ("get" in n || "set" in n) throw XT("Accessors not supported");
          return "value" in n && (t[r] = n.value), t;
        };
  });
  var yn = c((GB, Lc) => {
    var jT = Rt(),
      zT = Or(),
      KT = Vi();
    Lc.exports = jT
      ? function (e, t, r) {
          return zT.f(e, t, KT(1, r));
        }
      : function (e, t, r) {
          return (e[t] = r), e;
        };
  });
  var uo = c((VB, Nc) => {
    var YT = ze(),
      $T = nt(),
      so = hn(),
      QT = YT(Function.toString);
    $T(so.inspectSource) ||
      (so.inspectSource = function (e) {
        return QT(e);
      });
    Nc.exports = so.inspectSource;
  });
  var Fc = c((UB, qc) => {
    var ZT = Ee(),
      JT = nt(),
      eI = uo(),
      Pc = ZT.WeakMap;
    qc.exports = JT(Pc) && /native code/.test(eI(Pc));
  });
  var co = c((BB, Dc) => {
    var tI = Ji(),
      rI = eo(),
      Mc = tI("keys");
    Dc.exports = function (e) {
      return Mc[e] || (Mc[e] = rI(e));
    };
  });
  var En = c((HB, kc) => {
    kc.exports = {};
  });
  var Wc = c((WB, Hc) => {
    var nI = Fc(),
      Bc = Ee(),
      lo = ze(),
      iI = Ht(),
      oI = yn(),
      fo = mt(),
      po = hn(),
      aI = co(),
      sI = En(),
      Gc = "Object already initialized",
      vo = Bc.TypeError,
      uI = Bc.WeakMap,
      mn,
      Ar,
      _n,
      cI = function (e) {
        return _n(e) ? Ar(e) : mn(e, {});
      },
      lI = function (e) {
        return function (t) {
          var r;
          if (!iI(t) || (r = Ar(t)).type !== e)
            throw vo("Incompatible receiver, " + e + " required");
          return r;
        };
      };
    nI || po.state
      ? ((_t = po.state || (po.state = new uI())),
        (Vc = lo(_t.get)),
        (go = lo(_t.has)),
        (Uc = lo(_t.set)),
        (mn = function (e, t) {
          if (go(_t, e)) throw new vo(Gc);
          return (t.facade = e), Uc(_t, e, t), t;
        }),
        (Ar = function (e) {
          return Vc(_t, e) || {};
        }),
        (_n = function (e) {
          return go(_t, e);
        }))
      : ((Nt = aI("state")),
        (sI[Nt] = !0),
        (mn = function (e, t) {
          if (fo(e, Nt)) throw new vo(Gc);
          return (t.facade = e), oI(e, Nt, t), t;
        }),
        (Ar = function (e) {
          return fo(e, Nt) ? e[Nt] : {};
        }),
        (_n = function (e) {
          return fo(e, Nt);
        }));
    var _t, Vc, go, Uc, Nt;
    Hc.exports = { set: mn, get: Ar, has: _n, enforce: cI, getterFor: lI };
  });
  var zc = c((XB, jc) => {
    var ho = Rt(),
      fI = mt(),
      Xc = Function.prototype,
      dI = ho && Object.getOwnPropertyDescriptor,
      yo = fI(Xc, "name"),
      pI = yo && function () {}.name === "something",
      gI = yo && (!ho || (ho && dI(Xc, "name").configurable));
    jc.exports = { EXISTS: yo, PROPER: pI, CONFIGURABLE: gI };
  });
  var Zc = c((jB, Qc) => {
    var vI = Ee(),
      Kc = nt(),
      hI = mt(),
      Yc = yn(),
      yI = vn(),
      EI = uo(),
      $c = Wc(),
      mI = zc().CONFIGURABLE,
      _I = $c.get,
      bI = $c.enforce,
      TI = String(String).split("String");
    (Qc.exports = function (e, t, r, n) {
      var i = n ? !!n.unsafe : !1,
        o = n ? !!n.enumerable : !1,
        s = n ? !!n.noTargetGet : !1,
        a = n && n.name !== void 0 ? n.name : t,
        u;
      if (
        (Kc(r) &&
          (String(a).slice(0, 7) === "Symbol(" &&
            (a = "[" + String(a).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"),
          (!hI(r, "name") || (mI && r.name !== a)) && Yc(r, "name", a),
          (u = bI(r)),
          u.source || (u.source = TI.join(typeof a == "string" ? a : ""))),
        e === vI)
      ) {
        o ? (e[t] = r) : yI(t, r);
        return;
      } else i ? !s && e[t] && (o = !0) : delete e[t];
      o ? (e[t] = r) : Yc(e, t, r);
    })(Function.prototype, "toString", function () {
      return (Kc(this) && _I(this).source) || EI(this);
    });
  });
  var Eo = c((zB, Jc) => {
    var II = Math.ceil,
      wI = Math.floor;
    Jc.exports = function (e) {
      var t = +e;
      return t !== t || t === 0 ? 0 : (t > 0 ? wI : II)(t);
    };
  });
  var tl = c((KB, el) => {
    var OI = Eo(),
      AI = Math.max,
      SI = Math.min;
    el.exports = function (e, t) {
      var r = OI(e);
      return r < 0 ? AI(r + t, 0) : SI(r, t);
    };
  });
  var nl = c((YB, rl) => {
    var xI = Eo(),
      CI = Math.min;
    rl.exports = function (e) {
      return e > 0 ? CI(xI(e), 9007199254740991) : 0;
    };
  });
  var ol = c(($B, il) => {
    var RI = nl();
    il.exports = function (e) {
      return RI(e.length);
    };
  });
  var mo = c((QB, sl) => {
    var LI = Tr(),
      NI = tl(),
      PI = ol(),
      al = function (e) {
        return function (t, r, n) {
          var i = LI(t),
            o = PI(i),
            s = NI(n, o),
            a;
          if (e && r != r) {
            for (; o > s; ) if (((a = i[s++]), a != a)) return !0;
          } else
            for (; o > s; s++)
              if ((e || s in i) && i[s] === r) return e || s || 0;
          return !e && -1;
        };
      };
    sl.exports = { includes: al(!0), indexOf: al(!1) };
  });
  var bo = c((ZB, cl) => {
    var qI = ze(),
      _o = mt(),
      FI = Tr(),
      MI = mo().indexOf,
      DI = En(),
      ul = qI([].push);
    cl.exports = function (e, t) {
      var r = FI(e),
        n = 0,
        i = [],
        o;
      for (o in r) !_o(DI, o) && _o(r, o) && ul(i, o);
      for (; t.length > n; ) _o(r, (o = t[n++])) && (~MI(i, o) || ul(i, o));
      return i;
    };
  });
  var bn = c((JB, ll) => {
    ll.exports = [
      "constructor",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toLocaleString",
      "toString",
      "valueOf",
    ];
  });
  var dl = c((fl) => {
    var kI = bo(),
      GI = bn(),
      VI = GI.concat("length", "prototype");
    fl.f =
      Object.getOwnPropertyNames ||
      function (t) {
        return kI(t, VI);
      };
  });
  var gl = c((pl) => {
    pl.f = Object.getOwnPropertySymbols;
  });
  var hl = c((r5, vl) => {
    var UI = Ir(),
      BI = ze(),
      HI = dl(),
      WI = gl(),
      XI = wr(),
      jI = BI([].concat);
    vl.exports =
      UI("Reflect", "ownKeys") ||
      function (t) {
        var r = HI.f(XI(t)),
          n = WI.f;
        return n ? jI(r, n(t)) : r;
      };
  });
  var El = c((n5, yl) => {
    var zI = mt(),
      KI = hl(),
      YI = ao(),
      $I = Or();
    yl.exports = function (e, t) {
      for (var r = KI(t), n = $I.f, i = YI.f, o = 0; o < r.length; o++) {
        var s = r[o];
        zI(e, s) || n(e, s, i(t, s));
      }
    };
  });
  var _l = c((i5, ml) => {
    var QI = Bt(),
      ZI = nt(),
      JI = /#|\.prototype\./,
      Sr = function (e, t) {
        var r = t0[e0(e)];
        return r == n0 ? !0 : r == r0 ? !1 : ZI(t) ? QI(t) : !!t;
      },
      e0 = (Sr.normalize = function (e) {
        return String(e).replace(JI, ".").toLowerCase();
      }),
      t0 = (Sr.data = {}),
      r0 = (Sr.NATIVE = "N"),
      n0 = (Sr.POLYFILL = "P");
    ml.exports = Sr;
  });
  var Tl = c((o5, bl) => {
    var To = Ee(),
      i0 = ao().f,
      o0 = yn(),
      a0 = Zc(),
      s0 = vn(),
      u0 = El(),
      c0 = _l();
    bl.exports = function (e, t) {
      var r = e.target,
        n = e.global,
        i = e.stat,
        o,
        s,
        a,
        u,
        l,
        g;
      if (
        (n
          ? (s = To)
          : i
          ? (s = To[r] || s0(r, {}))
          : (s = (To[r] || {}).prototype),
        s)
      )
        for (a in t) {
          if (
            ((l = t[a]),
            e.noTargetGet ? ((g = i0(s, a)), (u = g && g.value)) : (u = s[a]),
            (o = c0(n ? a : r + (i ? "." : "#") + a, e.forced)),
            !o && u !== void 0)
          ) {
            if (typeof l == typeof u) continue;
            u0(l, u);
          }
          (e.sham || (u && u.sham)) && o0(l, "sham", !0), a0(s, a, l, e);
        }
    };
  });
  var wl = c((a5, Il) => {
    var l0 = bo(),
      f0 = bn();
    Il.exports =
      Object.keys ||
      function (t) {
        return l0(t, f0);
      };
  });
  var Al = c((s5, Ol) => {
    var d0 = Rt(),
      p0 = Or(),
      g0 = wr(),
      v0 = Tr(),
      h0 = wl();
    Ol.exports = d0
      ? Object.defineProperties
      : function (t, r) {
          g0(t);
          for (var n = v0(r), i = h0(r), o = i.length, s = 0, a; o > s; )
            p0.f(t, (a = i[s++]), n[a]);
          return t;
        };
  });
  var xl = c((u5, Sl) => {
    var y0 = Ir();
    Sl.exports = y0("document", "documentElement");
  });
  var Ml = c((c5, Fl) => {
    var E0 = wr(),
      m0 = Al(),
      Cl = bn(),
      _0 = En(),
      b0 = xl(),
      T0 = io(),
      I0 = co(),
      Rl = ">",
      Ll = "<",
      wo = "prototype",
      Oo = "script",
      Pl = I0("IE_PROTO"),
      Io = function () {},
      ql = function (e) {
        return Ll + Oo + Rl + e + Ll + "/" + Oo + Rl;
      },
      Nl = function (e) {
        e.write(ql("")), e.close();
        var t = e.parentWindow.Object;
        return (e = null), t;
      },
      w0 = function () {
        var e = T0("iframe"),
          t = "java" + Oo + ":",
          r;
        return (
          (e.style.display = "none"),
          b0.appendChild(e),
          (e.src = String(t)),
          (r = e.contentWindow.document),
          r.open(),
          r.write(ql("document.F=Object")),
          r.close(),
          r.F
        );
      },
      Tn,
      In = function () {
        try {
          Tn = new ActiveXObject("htmlfile");
        } catch {}
        In =
          typeof document < "u"
            ? document.domain && Tn
              ? Nl(Tn)
              : w0()
            : Nl(Tn);
        for (var e = Cl.length; e--; ) delete In[wo][Cl[e]];
        return In();
      };
    _0[Pl] = !0;
    Fl.exports =
      Object.create ||
      function (t, r) {
        var n;
        return (
          t !== null
            ? ((Io[wo] = E0(t)), (n = new Io()), (Io[wo] = null), (n[Pl] = t))
            : (n = In()),
          r === void 0 ? n : m0(n, r)
        );
      };
  });
  var kl = c((l5, Dl) => {
    var O0 = to(),
      A0 = Ml(),
      S0 = Or(),
      Ao = O0("unscopables"),
      So = Array.prototype;
    So[Ao] == null && S0.f(So, Ao, { configurable: !0, value: A0(null) });
    Dl.exports = function (e) {
      So[Ao][e] = !0;
    };
  });
  var Gl = c(() => {
    "use strict";
    var x0 = Tl(),
      C0 = mo().includes,
      R0 = kl();
    x0(
      { target: "Array", proto: !0 },
      {
        includes: function (t) {
          return C0(this, t, arguments.length > 1 ? arguments[1] : void 0);
        },
      }
    );
    R0("includes");
  });
  var Ul = c((p5, Vl) => {
    var L0 = Ee(),
      N0 = ze();
    Vl.exports = function (e, t) {
      return N0(L0[e].prototype[t]);
    };
  });
  var Hl = c((g5, Bl) => {
    Gl();
    var P0 = Ul();
    Bl.exports = P0("Array", "includes");
  });
  var Xl = c((v5, Wl) => {
    var q0 = Hl();
    Wl.exports = q0;
  });
  var zl = c((h5, jl) => {
    var F0 = Xl();
    jl.exports = F0;
  });
  var xo = c((y5, Kl) => {
    var M0 =
      typeof global == "object" && global && global.Object === Object && global;
    Kl.exports = M0;
  });
  var Ye = c((E5, Yl) => {
    var D0 = xo(),
      k0 = typeof self == "object" && self && self.Object === Object && self,
      G0 = D0 || k0 || Function("return this")();
    Yl.exports = G0;
  });
  var Xt = c((m5, $l) => {
    var V0 = Ye(),
      U0 = V0.Symbol;
    $l.exports = U0;
  });
  var ef = c((_5, Jl) => {
    var Ql = Xt(),
      Zl = Object.prototype,
      B0 = Zl.hasOwnProperty,
      H0 = Zl.toString,
      xr = Ql ? Ql.toStringTag : void 0;
    function W0(e) {
      var t = B0.call(e, xr),
        r = e[xr];
      try {
        e[xr] = void 0;
        var n = !0;
      } catch {}
      var i = H0.call(e);
      return n && (t ? (e[xr] = r) : delete e[xr]), i;
    }
    Jl.exports = W0;
  });
  var rf = c((b5, tf) => {
    var X0 = Object.prototype,
      j0 = X0.toString;
    function z0(e) {
      return j0.call(e);
    }
    tf.exports = z0;
  });
  var bt = c((T5, af) => {
    var nf = Xt(),
      K0 = ef(),
      Y0 = rf(),
      $0 = "[object Null]",
      Q0 = "[object Undefined]",
      of = nf ? nf.toStringTag : void 0;
    function Z0(e) {
      return e == null
        ? e === void 0
          ? Q0
          : $0
        : of && of in Object(e)
        ? K0(e)
        : Y0(e);
    }
    af.exports = Z0;
  });
  var Co = c((I5, sf) => {
    function J0(e, t) {
      return function (r) {
        return e(t(r));
      };
    }
    sf.exports = J0;
  });
  var Ro = c((w5, uf) => {
    var ew = Co(),
      tw = ew(Object.getPrototypeOf, Object);
    uf.exports = tw;
  });
  var dt = c((O5, cf) => {
    function rw(e) {
      return e != null && typeof e == "object";
    }
    cf.exports = rw;
  });
  var Lo = c((A5, ff) => {
    var nw = bt(),
      iw = Ro(),
      ow = dt(),
      aw = "[object Object]",
      sw = Function.prototype,
      uw = Object.prototype,
      lf = sw.toString,
      cw = uw.hasOwnProperty,
      lw = lf.call(Object);
    function fw(e) {
      if (!ow(e) || nw(e) != aw) return !1;
      var t = iw(e);
      if (t === null) return !0;
      var r = cw.call(t, "constructor") && t.constructor;
      return typeof r == "function" && r instanceof r && lf.call(r) == lw;
    }
    ff.exports = fw;
  });
  var df = c((No) => {
    "use strict";
    Object.defineProperty(No, "__esModule", { value: !0 });
    No.default = dw;
    function dw(e) {
      var t,
        r = e.Symbol;
      return (
        typeof r == "function"
          ? r.observable
            ? (t = r.observable)
            : ((t = r("observable")), (r.observable = t))
          : (t = "@@observable"),
        t
      );
    }
  });
  var pf = c((qo, Po) => {
    "use strict";
    Object.defineProperty(qo, "__esModule", { value: !0 });
    var pw = df(),
      gw = vw(pw);
    function vw(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var jt;
    typeof self < "u"
      ? (jt = self)
      : typeof window < "u"
      ? (jt = window)
      : typeof global < "u"
      ? (jt = global)
      : typeof Po < "u"
      ? (jt = Po)
      : (jt = Function("return this")());
    var hw = (0, gw.default)(jt);
    qo.default = hw;
  });
  var Fo = c((Cr) => {
    "use strict";
    Cr.__esModule = !0;
    Cr.ActionTypes = void 0;
    Cr.default = yf;
    var yw = Lo(),
      Ew = hf(yw),
      mw = pf(),
      gf = hf(mw);
    function hf(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var vf = (Cr.ActionTypes = { INIT: "@@redux/INIT" });
    function yf(e, t, r) {
      var n;
      if (
        (typeof t == "function" && typeof r > "u" && ((r = t), (t = void 0)),
        typeof r < "u")
      ) {
        if (typeof r != "function")
          throw new Error("Expected the enhancer to be a function.");
        return r(yf)(e, t);
      }
      if (typeof e != "function")
        throw new Error("Expected the reducer to be a function.");
      var i = e,
        o = t,
        s = [],
        a = s,
        u = !1;
      function l() {
        a === s && (a = s.slice());
      }
      function g() {
        return o;
      }
      function d(_) {
        if (typeof _ != "function")
          throw new Error("Expected listener to be a function.");
        var w = !0;
        return (
          l(),
          a.push(_),
          function () {
            if (w) {
              (w = !1), l();
              var C = a.indexOf(_);
              a.splice(C, 1);
            }
          }
        );
      }
      function p(_) {
        if (!(0, Ew.default)(_))
          throw new Error(
            "Actions must be plain objects. Use custom middleware for async actions."
          );
        if (typeof _.type > "u")
          throw new Error(
            'Actions may not have an undefined "type" property. Have you misspelled a constant?'
          );
        if (u) throw new Error("Reducers may not dispatch actions.");
        try {
          (u = !0), (o = i(o, _));
        } finally {
          u = !1;
        }
        for (var w = (s = a), m = 0; m < w.length; m++) w[m]();
        return _;
      }
      function h(_) {
        if (typeof _ != "function")
          throw new Error("Expected the nextReducer to be a function.");
        (i = _), p({ type: vf.INIT });
      }
      function b() {
        var _,
          w = d;
        return (
          (_ = {
            subscribe: function (C) {
              if (typeof C != "object")
                throw new TypeError("Expected the observer to be an object.");
              function O() {
                C.next && C.next(g());
              }
              O();
              var N = w(O);
              return { unsubscribe: N };
            },
          }),
          (_[gf.default] = function () {
            return this;
          }),
          _
        );
      }
      return (
        p({ type: vf.INIT }),
        (n = { dispatch: p, subscribe: d, getState: g, replaceReducer: h }),
        (n[gf.default] = b),
        n
      );
    }
  });
  var Do = c((Mo) => {
    "use strict";
    Mo.__esModule = !0;
    Mo.default = _w;
    function _w(e) {
      typeof console < "u" &&
        typeof console.error == "function" &&
        console.error(e);
      try {
        throw new Error(e);
      } catch {}
    }
  });
  var _f = c((ko) => {
    "use strict";
    ko.__esModule = !0;
    ko.default = Ow;
    var Ef = Fo(),
      bw = Lo(),
      R5 = mf(bw),
      Tw = Do(),
      L5 = mf(Tw);
    function mf(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function Iw(e, t) {
      var r = t && t.type,
        n = (r && '"' + r.toString() + '"') || "an action";
      return (
        "Given action " +
        n +
        ', reducer "' +
        e +
        '" returned undefined. To ignore an action, you must explicitly return the previous state.'
      );
    }
    function ww(e) {
      Object.keys(e).forEach(function (t) {
        var r = e[t],
          n = r(void 0, { type: Ef.ActionTypes.INIT });
        if (typeof n > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.'
          );
        var i =
          "@@redux/PROBE_UNKNOWN_ACTION_" +
          Math.random().toString(36).substring(7).split("").join(".");
        if (typeof r(void 0, { type: i }) > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined when probed with a random type. ' +
              ("Don't try to handle " +
                Ef.ActionTypes.INIT +
                ' or other actions in "redux/*" ') +
              "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined."
          );
      });
    }
    function Ow(e) {
      for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
        var i = t[n];
        typeof e[i] == "function" && (r[i] = e[i]);
      }
      var o = Object.keys(r);
      if (!1) var s;
      var a;
      try {
        ww(r);
      } catch (u) {
        a = u;
      }
      return function () {
        var l =
            arguments.length <= 0 || arguments[0] === void 0
              ? {}
              : arguments[0],
          g = arguments[1];
        if (a) throw a;
        if (!1) var d;
        for (var p = !1, h = {}, b = 0; b < o.length; b++) {
          var _ = o[b],
            w = r[_],
            m = l[_],
            C = w(m, g);
          if (typeof C > "u") {
            var O = Iw(_, g);
            throw new Error(O);
          }
          (h[_] = C), (p = p || C !== m);
        }
        return p ? h : l;
      };
    }
  });
  var Tf = c((Go) => {
    "use strict";
    Go.__esModule = !0;
    Go.default = Aw;
    function bf(e, t) {
      return function () {
        return t(e.apply(void 0, arguments));
      };
    }
    function Aw(e, t) {
      if (typeof e == "function") return bf(e, t);
      if (typeof e != "object" || e === null)
        throw new Error(
          "bindActionCreators expected an object or a function, instead received " +
            (e === null ? "null" : typeof e) +
            '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
        );
      for (var r = Object.keys(e), n = {}, i = 0; i < r.length; i++) {
        var o = r[i],
          s = e[o];
        typeof s == "function" && (n[o] = bf(s, t));
      }
      return n;
    }
  });
  var Uo = c((Vo) => {
    "use strict";
    Vo.__esModule = !0;
    Vo.default = Sw;
    function Sw() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      if (t.length === 0)
        return function (o) {
          return o;
        };
      if (t.length === 1) return t[0];
      var n = t[t.length - 1],
        i = t.slice(0, -1);
      return function () {
        return i.reduceRight(function (o, s) {
          return s(o);
        }, n.apply(void 0, arguments));
      };
    }
  });
  var If = c((Bo) => {
    "use strict";
    Bo.__esModule = !0;
    var xw =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      };
    Bo.default = Nw;
    var Cw = Uo(),
      Rw = Lw(Cw);
    function Lw(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function Nw() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      return function (n) {
        return function (i, o, s) {
          var a = n(i, o, s),
            u = a.dispatch,
            l = [],
            g = {
              getState: a.getState,
              dispatch: function (p) {
                return u(p);
              },
            };
          return (
            (l = t.map(function (d) {
              return d(g);
            })),
            (u = Rw.default.apply(void 0, l)(a.dispatch)),
            xw({}, a, { dispatch: u })
          );
        };
      };
    }
  });
  var Ho = c((Be) => {
    "use strict";
    Be.__esModule = !0;
    Be.compose =
      Be.applyMiddleware =
      Be.bindActionCreators =
      Be.combineReducers =
      Be.createStore =
        void 0;
    var Pw = Fo(),
      qw = zt(Pw),
      Fw = _f(),
      Mw = zt(Fw),
      Dw = Tf(),
      kw = zt(Dw),
      Gw = If(),
      Vw = zt(Gw),
      Uw = Uo(),
      Bw = zt(Uw),
      Hw = Do(),
      M5 = zt(Hw);
    function zt(e) {
      return e && e.__esModule ? e : { default: e };
    }
    Be.createStore = qw.default;
    Be.combineReducers = Mw.default;
    Be.bindActionCreators = kw.default;
    Be.applyMiddleware = Vw.default;
    Be.compose = Bw.default;
  });
  var $e,
    Wo,
    it,
    Ww,
    Xw,
    wn,
    jw,
    Xo = ye(() => {
      "use strict";
      ($e = {
        NAVBAR_OPEN: "NAVBAR_OPEN",
        NAVBAR_CLOSE: "NAVBAR_CLOSE",
        TAB_ACTIVE: "TAB_ACTIVE",
        TAB_INACTIVE: "TAB_INACTIVE",
        SLIDER_ACTIVE: "SLIDER_ACTIVE",
        SLIDER_INACTIVE: "SLIDER_INACTIVE",
        DROPDOWN_OPEN: "DROPDOWN_OPEN",
        DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
        MOUSE_CLICK: "MOUSE_CLICK",
        MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
        MOUSE_DOWN: "MOUSE_DOWN",
        MOUSE_UP: "MOUSE_UP",
        MOUSE_OVER: "MOUSE_OVER",
        MOUSE_OUT: "MOUSE_OUT",
        MOUSE_MOVE: "MOUSE_MOVE",
        MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
        SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
        SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
        SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
        ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
        ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
        PAGE_START: "PAGE_START",
        PAGE_FINISH: "PAGE_FINISH",
        PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
        PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
        PAGE_SCROLL: "PAGE_SCROLL",
      }),
        (Wo = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" }),
        (it = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" }),
        (Ww = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" }),
        (Xw = {
          CHILDREN: "CHILDREN",
          SIBLINGS: "SIBLINGS",
          IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
        }),
        (wn = {
          FADE_EFFECT: "FADE_EFFECT",
          SLIDE_EFFECT: "SLIDE_EFFECT",
          GROW_EFFECT: "GROW_EFFECT",
          SHRINK_EFFECT: "SHRINK_EFFECT",
          SPIN_EFFECT: "SPIN_EFFECT",
          FLY_EFFECT: "FLY_EFFECT",
          POP_EFFECT: "POP_EFFECT",
          FLIP_EFFECT: "FLIP_EFFECT",
          JIGGLE_EFFECT: "JIGGLE_EFFECT",
          PULSE_EFFECT: "PULSE_EFFECT",
          DROP_EFFECT: "DROP_EFFECT",
          BLINK_EFFECT: "BLINK_EFFECT",
          BOUNCE_EFFECT: "BOUNCE_EFFECT",
          FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
          FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
          RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
          JELLO_EFFECT: "JELLO_EFFECT",
          GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
          SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
          PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
        }),
        (jw = {
          LEFT: "LEFT",
          RIGHT: "RIGHT",
          BOTTOM: "BOTTOM",
          TOP: "TOP",
          BOTTOM_LEFT: "BOTTOM_LEFT",
          BOTTOM_RIGHT: "BOTTOM_RIGHT",
          TOP_RIGHT: "TOP_RIGHT",
          TOP_LEFT: "TOP_LEFT",
          CLOCKWISE: "CLOCKWISE",
          COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
        });
    });
  var De,
    zw,
    On = ye(() => {
      "use strict";
      (De = {
        TRANSFORM_MOVE: "TRANSFORM_MOVE",
        TRANSFORM_SCALE: "TRANSFORM_SCALE",
        TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
        TRANSFORM_SKEW: "TRANSFORM_SKEW",
        STYLE_OPACITY: "STYLE_OPACITY",
        STYLE_SIZE: "STYLE_SIZE",
        STYLE_FILTER: "STYLE_FILTER",
        STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
        STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
        STYLE_BORDER: "STYLE_BORDER",
        STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
        OBJECT_VALUE: "OBJECT_VALUE",
        PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
        PLUGIN_SPLINE: "PLUGIN_SPLINE",
        PLUGIN_VARIABLE: "PLUGIN_VARIABLE",
        GENERAL_DISPLAY: "GENERAL_DISPLAY",
        GENERAL_START_ACTION: "GENERAL_START_ACTION",
        GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
        GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
        GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
        GENERAL_LOOP: "GENERAL_LOOP",
        STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
      }),
        (zw = {
          ELEMENT: "ELEMENT",
          ELEMENT_CLASS: "ELEMENT_CLASS",
          TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
        });
    });
  var Kw,
    wf = ye(() => {
      "use strict";
      Kw = {
        MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
        MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
        MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
        SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
        SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
        MOUSE_MOVE_IN_VIEWPORT_INTERACTION:
          "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
        PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
        PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
        PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
        NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
        DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
        ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
        TAB_INTERACTION: "TAB_INTERACTION",
        SLIDER_INTERACTION: "SLIDER_INTERACTION",
      };
    });
  var Yw,
    $w,
    Qw,
    Zw,
    Jw,
    eO,
    tO,
    jo,
    Of = ye(() => {
      "use strict";
      On();
      ({
        TRANSFORM_MOVE: Yw,
        TRANSFORM_SCALE: $w,
        TRANSFORM_ROTATE: Qw,
        TRANSFORM_SKEW: Zw,
        STYLE_SIZE: Jw,
        STYLE_FILTER: eO,
        STYLE_FONT_VARIATION: tO,
      } = De),
        (jo = {
          [Yw]: !0,
          [$w]: !0,
          [Qw]: !0,
          [Zw]: !0,
          [Jw]: !0,
          [eO]: !0,
          [tO]: !0,
        });
    });
  var Ie = {};
  Me(Ie, {
    IX2_ACTION_LIST_PLAYBACK_CHANGED: () => EO,
    IX2_ANIMATION_FRAME_CHANGED: () => dO,
    IX2_CLEAR_REQUESTED: () => cO,
    IX2_ELEMENT_STATE_CHANGED: () => yO,
    IX2_EVENT_LISTENER_ADDED: () => lO,
    IX2_EVENT_STATE_CHANGED: () => fO,
    IX2_INSTANCE_ADDED: () => gO,
    IX2_INSTANCE_REMOVED: () => hO,
    IX2_INSTANCE_STARTED: () => vO,
    IX2_MEDIA_QUERIES_DEFINED: () => _O,
    IX2_PARAMETER_CHANGED: () => pO,
    IX2_PLAYBACK_REQUESTED: () => sO,
    IX2_PREVIEW_REQUESTED: () => aO,
    IX2_RAW_DATA_IMPORTED: () => rO,
    IX2_SESSION_INITIALIZED: () => nO,
    IX2_SESSION_STARTED: () => iO,
    IX2_SESSION_STOPPED: () => oO,
    IX2_STOP_REQUESTED: () => uO,
    IX2_TEST_FRAME_RENDERED: () => bO,
    IX2_VIEWPORT_WIDTH_CHANGED: () => mO,
  });
  var rO,
    nO,
    iO,
    oO,
    aO,
    sO,
    uO,
    cO,
    lO,
    fO,
    dO,
    pO,
    gO,
    vO,
    hO,
    yO,
    EO,
    mO,
    _O,
    bO,
    Af = ye(() => {
      "use strict";
      (rO = "IX2_RAW_DATA_IMPORTED"),
        (nO = "IX2_SESSION_INITIALIZED"),
        (iO = "IX2_SESSION_STARTED"),
        (oO = "IX2_SESSION_STOPPED"),
        (aO = "IX2_PREVIEW_REQUESTED"),
        (sO = "IX2_PLAYBACK_REQUESTED"),
        (uO = "IX2_STOP_REQUESTED"),
        (cO = "IX2_CLEAR_REQUESTED"),
        (lO = "IX2_EVENT_LISTENER_ADDED"),
        (fO = "IX2_EVENT_STATE_CHANGED"),
        (dO = "IX2_ANIMATION_FRAME_CHANGED"),
        (pO = "IX2_PARAMETER_CHANGED"),
        (gO = "IX2_INSTANCE_ADDED"),
        (vO = "IX2_INSTANCE_STARTED"),
        (hO = "IX2_INSTANCE_REMOVED"),
        (yO = "IX2_ELEMENT_STATE_CHANGED"),
        (EO = "IX2_ACTION_LIST_PLAYBACK_CHANGED"),
        (mO = "IX2_VIEWPORT_WIDTH_CHANGED"),
        (_O = "IX2_MEDIA_QUERIES_DEFINED"),
        (bO = "IX2_TEST_FRAME_RENDERED");
    });
  var Ce = {};
  Me(Ce, {
    ABSTRACT_NODE: () => mA,
    AUTO: () => uA,
    BACKGROUND: () => rA,
    BACKGROUND_COLOR: () => tA,
    BAR_DELIMITER: () => fA,
    BORDER_COLOR: () => nA,
    BOUNDARY_SELECTOR: () => AO,
    CHILDREN: () => dA,
    COLON_DELIMITER: () => lA,
    COLOR: () => iA,
    COMMA_DELIMITER: () => cA,
    CONFIG_UNIT: () => qO,
    CONFIG_VALUE: () => RO,
    CONFIG_X_UNIT: () => LO,
    CONFIG_X_VALUE: () => SO,
    CONFIG_Y_UNIT: () => NO,
    CONFIG_Y_VALUE: () => xO,
    CONFIG_Z_UNIT: () => PO,
    CONFIG_Z_VALUE: () => CO,
    DISPLAY: () => oA,
    FILTER: () => QO,
    FLEX: () => aA,
    FONT_VARIATION_SETTINGS: () => ZO,
    HEIGHT: () => eA,
    HTML_ELEMENT: () => yA,
    IMMEDIATE_CHILDREN: () => pA,
    IX2_ID_DELIMITER: () => TO,
    OPACITY: () => $O,
    PARENT: () => vA,
    PLAIN_OBJECT: () => EA,
    PRESERVE_3D: () => hA,
    RENDER_GENERAL: () => bA,
    RENDER_PLUGIN: () => IA,
    RENDER_STYLE: () => TA,
    RENDER_TRANSFORM: () => _A,
    ROTATE_X: () => WO,
    ROTATE_Y: () => XO,
    ROTATE_Z: () => jO,
    SCALE_3D: () => HO,
    SCALE_X: () => VO,
    SCALE_Y: () => UO,
    SCALE_Z: () => BO,
    SIBLINGS: () => gA,
    SKEW: () => zO,
    SKEW_X: () => KO,
    SKEW_Y: () => YO,
    TRANSFORM: () => FO,
    TRANSLATE_3D: () => GO,
    TRANSLATE_X: () => MO,
    TRANSLATE_Y: () => DO,
    TRANSLATE_Z: () => kO,
    WF_PAGE: () => IO,
    WIDTH: () => JO,
    WILL_CHANGE: () => sA,
    W_MOD_IX: () => OO,
    W_MOD_JS: () => wO,
  });
  var TO,
    IO,
    wO,
    OO,
    AO,
    SO,
    xO,
    CO,
    RO,
    LO,
    NO,
    PO,
    qO,
    FO,
    MO,
    DO,
    kO,
    GO,
    VO,
    UO,
    BO,
    HO,
    WO,
    XO,
    jO,
    zO,
    KO,
    YO,
    $O,
    QO,
    ZO,
    JO,
    eA,
    tA,
    rA,
    nA,
    iA,
    oA,
    aA,
    sA,
    uA,
    cA,
    lA,
    fA,
    dA,
    pA,
    gA,
    vA,
    hA,
    yA,
    EA,
    mA,
    _A,
    bA,
    TA,
    IA,
    Sf = ye(() => {
      "use strict";
      (TO = "|"),
        (IO = "data-wf-page"),
        (wO = "w-mod-js"),
        (OO = "w-mod-ix"),
        (AO = ".w-dyn-item"),
        (SO = "xValue"),
        (xO = "yValue"),
        (CO = "zValue"),
        (RO = "value"),
        (LO = "xUnit"),
        (NO = "yUnit"),
        (PO = "zUnit"),
        (qO = "unit"),
        (FO = "transform"),
        (MO = "translateX"),
        (DO = "translateY"),
        (kO = "translateZ"),
        (GO = "translate3d"),
        (VO = "scaleX"),
        (UO = "scaleY"),
        (BO = "scaleZ"),
        (HO = "scale3d"),
        (WO = "rotateX"),
        (XO = "rotateY"),
        (jO = "rotateZ"),
        (zO = "skew"),
        (KO = "skewX"),
        (YO = "skewY"),
        ($O = "opacity"),
        (QO = "filter"),
        (ZO = "font-variation-settings"),
        (JO = "width"),
        (eA = "height"),
        (tA = "backgroundColor"),
        (rA = "background"),
        (nA = "borderColor"),
        (iA = "color"),
        (oA = "display"),
        (aA = "flex"),
        (sA = "willChange"),
        (uA = "AUTO"),
        (cA = ","),
        (lA = ":"),
        (fA = "|"),
        (dA = "CHILDREN"),
        (pA = "IMMEDIATE_CHILDREN"),
        (gA = "SIBLINGS"),
        (vA = "PARENT"),
        (hA = "preserve-3d"),
        (yA = "HTML_ELEMENT"),
        (EA = "PLAIN_OBJECT"),
        (mA = "ABSTRACT_NODE"),
        (_A = "RENDER_TRANSFORM"),
        (bA = "RENDER_GENERAL"),
        (TA = "RENDER_STYLE"),
        (IA = "RENDER_PLUGIN");
    });
  var xf = {};
  Me(xf, {
    ActionAppliesTo: () => zw,
    ActionTypeConsts: () => De,
    EventAppliesTo: () => Wo,
    EventBasedOn: () => it,
    EventContinuousMouseAxes: () => Ww,
    EventLimitAffectedElements: () => Xw,
    EventTypeConsts: () => $e,
    IX2EngineActionTypes: () => Ie,
    IX2EngineConstants: () => Ce,
    InteractionTypeConsts: () => Kw,
    QuickEffectDirectionConsts: () => jw,
    QuickEffectIds: () => wn,
    ReducedMotionTypes: () => jo,
  });
  var ke = ye(() => {
    "use strict";
    Xo();
    On();
    wf();
    Of();
    Af();
    Sf();
    On();
    Xo();
  });
  var wA,
    Cf,
    Rf = ye(() => {
      "use strict";
      ke();
      ({ IX2_RAW_DATA_IMPORTED: wA } = Ie),
        (Cf = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case wA:
              return t.payload.ixData || Object.freeze({});
            default:
              return e;
          }
        });
    });
  var Kt = c((_e) => {
    "use strict";
    Object.defineProperty(_e, "__esModule", { value: !0 });
    var OA =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == "function" &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          };
    _e.clone = Sn;
    _e.addLast = Pf;
    _e.addFirst = qf;
    _e.removeLast = Ff;
    _e.removeFirst = Mf;
    _e.insert = Df;
    _e.removeAt = kf;
    _e.replaceAt = Gf;
    _e.getIn = xn;
    _e.set = Cn;
    _e.setIn = Rn;
    _e.update = Uf;
    _e.updateIn = Bf;
    _e.merge = Hf;
    _e.mergeDeep = Wf;
    _e.mergeIn = Xf;
    _e.omit = jf;
    _e.addDefaults = zf;
    var Lf = "INVALID_ARGS";
    function Nf(e) {
      throw new Error(e);
    }
    function zo(e) {
      var t = Object.keys(e);
      return Object.getOwnPropertySymbols
        ? t.concat(Object.getOwnPropertySymbols(e))
        : t;
    }
    var AA = {}.hasOwnProperty;
    function Sn(e) {
      if (Array.isArray(e)) return e.slice();
      for (var t = zo(e), r = {}, n = 0; n < t.length; n++) {
        var i = t[n];
        r[i] = e[i];
      }
      return r;
    }
    function Ge(e, t, r) {
      var n = r;
      n == null && Nf(Lf);
      for (
        var i = !1, o = arguments.length, s = Array(o > 3 ? o - 3 : 0), a = 3;
        a < o;
        a++
      )
        s[a - 3] = arguments[a];
      for (var u = 0; u < s.length; u++) {
        var l = s[u];
        if (l != null) {
          var g = zo(l);
          if (g.length)
            for (var d = 0; d <= g.length; d++) {
              var p = g[d];
              if (!(e && n[p] !== void 0)) {
                var h = l[p];
                t && An(n[p]) && An(h) && (h = Ge(e, t, n[p], h)),
                  !(h === void 0 || h === n[p]) &&
                    (i || ((i = !0), (n = Sn(n))), (n[p] = h));
              }
            }
        }
      }
      return n;
    }
    function An(e) {
      var t = typeof e > "u" ? "undefined" : OA(e);
      return e != null && (t === "object" || t === "function");
    }
    function Pf(e, t) {
      return Array.isArray(t) ? e.concat(t) : e.concat([t]);
    }
    function qf(e, t) {
      return Array.isArray(t) ? t.concat(e) : [t].concat(e);
    }
    function Ff(e) {
      return e.length ? e.slice(0, e.length - 1) : e;
    }
    function Mf(e) {
      return e.length ? e.slice(1) : e;
    }
    function Df(e, t, r) {
      return e
        .slice(0, t)
        .concat(Array.isArray(r) ? r : [r])
        .concat(e.slice(t));
    }
    function kf(e, t) {
      return t >= e.length || t < 0 ? e : e.slice(0, t).concat(e.slice(t + 1));
    }
    function Gf(e, t, r) {
      if (e[t] === r) return e;
      for (var n = e.length, i = Array(n), o = 0; o < n; o++) i[o] = e[o];
      return (i[t] = r), i;
    }
    function xn(e, t) {
      if ((!Array.isArray(t) && Nf(Lf), e != null)) {
        for (var r = e, n = 0; n < t.length; n++) {
          var i = t[n];
          if (((r = r?.[i]), r === void 0)) return r;
        }
        return r;
      }
    }
    function Cn(e, t, r) {
      var n = typeof t == "number" ? [] : {},
        i = e ?? n;
      if (i[t] === r) return i;
      var o = Sn(i);
      return (o[t] = r), o;
    }
    function Vf(e, t, r, n) {
      var i = void 0,
        o = t[n];
      if (n === t.length - 1) i = r;
      else {
        var s =
          An(e) && An(e[o]) ? e[o] : typeof t[n + 1] == "number" ? [] : {};
        i = Vf(s, t, r, n + 1);
      }
      return Cn(e, o, i);
    }
    function Rn(e, t, r) {
      return t.length ? Vf(e, t, r, 0) : r;
    }
    function Uf(e, t, r) {
      var n = e?.[t],
        i = r(n);
      return Cn(e, t, i);
    }
    function Bf(e, t, r) {
      var n = xn(e, t),
        i = r(n);
      return Rn(e, t, i);
    }
    function Hf(e, t, r, n, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? Ge.call.apply(Ge, [null, !1, !1, e, t, r, n, i, o].concat(a))
        : Ge(!1, !1, e, t, r, n, i, o);
    }
    function Wf(e, t, r, n, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? Ge.call.apply(Ge, [null, !1, !0, e, t, r, n, i, o].concat(a))
        : Ge(!1, !0, e, t, r, n, i, o);
    }
    function Xf(e, t, r, n, i, o, s) {
      var a = xn(e, t);
      a == null && (a = {});
      for (
        var u = void 0,
          l = arguments.length,
          g = Array(l > 7 ? l - 7 : 0),
          d = 7;
        d < l;
        d++
      )
        g[d - 7] = arguments[d];
      return (
        g.length
          ? (u = Ge.call.apply(Ge, [null, !1, !1, a, r, n, i, o, s].concat(g)))
          : (u = Ge(!1, !1, a, r, n, i, o, s)),
        Rn(e, t, u)
      );
    }
    function jf(e, t) {
      for (var r = Array.isArray(t) ? t : [t], n = !1, i = 0; i < r.length; i++)
        if (AA.call(e, r[i])) {
          n = !0;
          break;
        }
      if (!n) return e;
      for (var o = {}, s = zo(e), a = 0; a < s.length; a++) {
        var u = s[a];
        r.indexOf(u) >= 0 || (o[u] = e[u]);
      }
      return o;
    }
    function zf(e, t, r, n, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? Ge.call.apply(Ge, [null, !0, !1, e, t, r, n, i, o].concat(a))
        : Ge(!0, !1, e, t, r, n, i, o);
    }
    var SA = {
      clone: Sn,
      addLast: Pf,
      addFirst: qf,
      removeLast: Ff,
      removeFirst: Mf,
      insert: Df,
      removeAt: kf,
      replaceAt: Gf,
      getIn: xn,
      set: Cn,
      setIn: Rn,
      update: Uf,
      updateIn: Bf,
      merge: Hf,
      mergeDeep: Wf,
      mergeIn: Xf,
      omit: jf,
      addDefaults: zf,
    };
    _e.default = SA;
  });
  var Yf,
    xA,
    CA,
    RA,
    LA,
    NA,
    Kf,
    $f,
    Qf = ye(() => {
      "use strict";
      ke();
      (Yf = ce(Kt())),
        ({
          IX2_PREVIEW_REQUESTED: xA,
          IX2_PLAYBACK_REQUESTED: CA,
          IX2_STOP_REQUESTED: RA,
          IX2_CLEAR_REQUESTED: LA,
        } = Ie),
        (NA = { preview: {}, playback: {}, stop: {}, clear: {} }),
        (Kf = Object.create(null, {
          [xA]: { value: "preview" },
          [CA]: { value: "playback" },
          [RA]: { value: "stop" },
          [LA]: { value: "clear" },
        })),
        ($f = (e = NA, t) => {
          if (t.type in Kf) {
            let r = [Kf[t.type]];
            return (0, Yf.setIn)(e, [r], { ...t.payload });
          }
          return e;
        });
    });
  var Ne,
    PA,
    qA,
    FA,
    MA,
    DA,
    kA,
    GA,
    VA,
    UA,
    BA,
    Zf,
    HA,
    Jf,
    ed = ye(() => {
      "use strict";
      ke();
      (Ne = ce(Kt())),
        ({
          IX2_SESSION_INITIALIZED: PA,
          IX2_SESSION_STARTED: qA,
          IX2_TEST_FRAME_RENDERED: FA,
          IX2_SESSION_STOPPED: MA,
          IX2_EVENT_LISTENER_ADDED: DA,
          IX2_EVENT_STATE_CHANGED: kA,
          IX2_ANIMATION_FRAME_CHANGED: GA,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: VA,
          IX2_VIEWPORT_WIDTH_CHANGED: UA,
          IX2_MEDIA_QUERIES_DEFINED: BA,
        } = Ie),
        (Zf = {
          active: !1,
          tick: 0,
          eventListeners: [],
          eventState: {},
          playbackState: {},
          viewportWidth: 0,
          mediaQueryKey: null,
          hasBoundaryNodes: !1,
          hasDefinedMediaQueries: !1,
          reducedMotion: !1,
        }),
        (HA = 20),
        (Jf = (e = Zf, t) => {
          switch (t.type) {
            case PA: {
              let { hasBoundaryNodes: r, reducedMotion: n } = t.payload;
              return (0, Ne.merge)(e, {
                hasBoundaryNodes: r,
                reducedMotion: n,
              });
            }
            case qA:
              return (0, Ne.set)(e, "active", !0);
            case FA: {
              let {
                payload: { step: r = HA },
              } = t;
              return (0, Ne.set)(e, "tick", e.tick + r);
            }
            case MA:
              return Zf;
            case GA: {
              let {
                payload: { now: r },
              } = t;
              return (0, Ne.set)(e, "tick", r);
            }
            case DA: {
              let r = (0, Ne.addLast)(e.eventListeners, t.payload);
              return (0, Ne.set)(e, "eventListeners", r);
            }
            case kA: {
              let { stateKey: r, newState: n } = t.payload;
              return (0, Ne.setIn)(e, ["eventState", r], n);
            }
            case VA: {
              let { actionListId: r, isPlaying: n } = t.payload;
              return (0, Ne.setIn)(e, ["playbackState", r], n);
            }
            case UA: {
              let { width: r, mediaQueries: n } = t.payload,
                i = n.length,
                o = null;
              for (let s = 0; s < i; s++) {
                let { key: a, min: u, max: l } = n[s];
                if (r >= u && r <= l) {
                  o = a;
                  break;
                }
              }
              return (0, Ne.merge)(e, { viewportWidth: r, mediaQueryKey: o });
            }
            case BA:
              return (0, Ne.set)(e, "hasDefinedMediaQueries", !0);
            default:
              return e;
          }
        });
    });
  var rd = c((rH, td) => {
    function WA() {
      (this.__data__ = []), (this.size = 0);
    }
    td.exports = WA;
  });
  var Ln = c((nH, nd) => {
    function XA(e, t) {
      return e === t || (e !== e && t !== t);
    }
    nd.exports = XA;
  });
  var Rr = c((iH, id) => {
    var jA = Ln();
    function zA(e, t) {
      for (var r = e.length; r--; ) if (jA(e[r][0], t)) return r;
      return -1;
    }
    id.exports = zA;
  });
  var ad = c((oH, od) => {
    var KA = Rr(),
      YA = Array.prototype,
      $A = YA.splice;
    function QA(e) {
      var t = this.__data__,
        r = KA(t, e);
      if (r < 0) return !1;
      var n = t.length - 1;
      return r == n ? t.pop() : $A.call(t, r, 1), --this.size, !0;
    }
    od.exports = QA;
  });
  var ud = c((aH, sd) => {
    var ZA = Rr();
    function JA(e) {
      var t = this.__data__,
        r = ZA(t, e);
      return r < 0 ? void 0 : t[r][1];
    }
    sd.exports = JA;
  });
  var ld = c((sH, cd) => {
    var eS = Rr();
    function tS(e) {
      return eS(this.__data__, e) > -1;
    }
    cd.exports = tS;
  });
  var dd = c((uH, fd) => {
    var rS = Rr();
    function nS(e, t) {
      var r = this.__data__,
        n = rS(r, e);
      return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
    }
    fd.exports = nS;
  });
  var Lr = c((cH, pd) => {
    var iS = rd(),
      oS = ad(),
      aS = ud(),
      sS = ld(),
      uS = dd();
    function Yt(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    Yt.prototype.clear = iS;
    Yt.prototype.delete = oS;
    Yt.prototype.get = aS;
    Yt.prototype.has = sS;
    Yt.prototype.set = uS;
    pd.exports = Yt;
  });
  var vd = c((lH, gd) => {
    var cS = Lr();
    function lS() {
      (this.__data__ = new cS()), (this.size = 0);
    }
    gd.exports = lS;
  });
  var yd = c((fH, hd) => {
    function fS(e) {
      var t = this.__data__,
        r = t.delete(e);
      return (this.size = t.size), r;
    }
    hd.exports = fS;
  });
  var md = c((dH, Ed) => {
    function dS(e) {
      return this.__data__.get(e);
    }
    Ed.exports = dS;
  });
  var bd = c((pH, _d) => {
    function pS(e) {
      return this.__data__.has(e);
    }
    _d.exports = pS;
  });
  var ot = c((gH, Td) => {
    function gS(e) {
      var t = typeof e;
      return e != null && (t == "object" || t == "function");
    }
    Td.exports = gS;
  });
  var Ko = c((vH, Id) => {
    var vS = bt(),
      hS = ot(),
      yS = "[object AsyncFunction]",
      ES = "[object Function]",
      mS = "[object GeneratorFunction]",
      _S = "[object Proxy]";
    function bS(e) {
      if (!hS(e)) return !1;
      var t = vS(e);
      return t == ES || t == mS || t == yS || t == _S;
    }
    Id.exports = bS;
  });
  var Od = c((hH, wd) => {
    var TS = Ye(),
      IS = TS["__core-js_shared__"];
    wd.exports = IS;
  });
  var xd = c((yH, Sd) => {
    var Yo = Od(),
      Ad = (function () {
        var e = /[^.]+$/.exec((Yo && Yo.keys && Yo.keys.IE_PROTO) || "");
        return e ? "Symbol(src)_1." + e : "";
      })();
    function wS(e) {
      return !!Ad && Ad in e;
    }
    Sd.exports = wS;
  });
  var $o = c((EH, Cd) => {
    var OS = Function.prototype,
      AS = OS.toString;
    function SS(e) {
      if (e != null) {
        try {
          return AS.call(e);
        } catch {}
        try {
          return e + "";
        } catch {}
      }
      return "";
    }
    Cd.exports = SS;
  });
  var Ld = c((mH, Rd) => {
    var xS = Ko(),
      CS = xd(),
      RS = ot(),
      LS = $o(),
      NS = /[\\^$.*+?()[\]{}|]/g,
      PS = /^\[object .+?Constructor\]$/,
      qS = Function.prototype,
      FS = Object.prototype,
      MS = qS.toString,
      DS = FS.hasOwnProperty,
      kS = RegExp(
        "^" +
          MS.call(DS)
            .replace(NS, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?"
            ) +
          "$"
      );
    function GS(e) {
      if (!RS(e) || CS(e)) return !1;
      var t = xS(e) ? kS : PS;
      return t.test(LS(e));
    }
    Rd.exports = GS;
  });
  var Pd = c((_H, Nd) => {
    function VS(e, t) {
      return e?.[t];
    }
    Nd.exports = VS;
  });
  var Tt = c((bH, qd) => {
    var US = Ld(),
      BS = Pd();
    function HS(e, t) {
      var r = BS(e, t);
      return US(r) ? r : void 0;
    }
    qd.exports = HS;
  });
  var Nn = c((TH, Fd) => {
    var WS = Tt(),
      XS = Ye(),
      jS = WS(XS, "Map");
    Fd.exports = jS;
  });
  var Nr = c((IH, Md) => {
    var zS = Tt(),
      KS = zS(Object, "create");
    Md.exports = KS;
  });
  var Gd = c((wH, kd) => {
    var Dd = Nr();
    function YS() {
      (this.__data__ = Dd ? Dd(null) : {}), (this.size = 0);
    }
    kd.exports = YS;
  });
  var Ud = c((OH, Vd) => {
    function $S(e) {
      var t = this.has(e) && delete this.__data__[e];
      return (this.size -= t ? 1 : 0), t;
    }
    Vd.exports = $S;
  });
  var Hd = c((AH, Bd) => {
    var QS = Nr(),
      ZS = "__lodash_hash_undefined__",
      JS = Object.prototype,
      ex = JS.hasOwnProperty;
    function tx(e) {
      var t = this.__data__;
      if (QS) {
        var r = t[e];
        return r === ZS ? void 0 : r;
      }
      return ex.call(t, e) ? t[e] : void 0;
    }
    Bd.exports = tx;
  });
  var Xd = c((SH, Wd) => {
    var rx = Nr(),
      nx = Object.prototype,
      ix = nx.hasOwnProperty;
    function ox(e) {
      var t = this.__data__;
      return rx ? t[e] !== void 0 : ix.call(t, e);
    }
    Wd.exports = ox;
  });
  var zd = c((xH, jd) => {
    var ax = Nr(),
      sx = "__lodash_hash_undefined__";
    function ux(e, t) {
      var r = this.__data__;
      return (
        (this.size += this.has(e) ? 0 : 1),
        (r[e] = ax && t === void 0 ? sx : t),
        this
      );
    }
    jd.exports = ux;
  });
  var Yd = c((CH, Kd) => {
    var cx = Gd(),
      lx = Ud(),
      fx = Hd(),
      dx = Xd(),
      px = zd();
    function $t(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    $t.prototype.clear = cx;
    $t.prototype.delete = lx;
    $t.prototype.get = fx;
    $t.prototype.has = dx;
    $t.prototype.set = px;
    Kd.exports = $t;
  });
  var Zd = c((RH, Qd) => {
    var $d = Yd(),
      gx = Lr(),
      vx = Nn();
    function hx() {
      (this.size = 0),
        (this.__data__ = {
          hash: new $d(),
          map: new (vx || gx)(),
          string: new $d(),
        });
    }
    Qd.exports = hx;
  });
  var ep = c((LH, Jd) => {
    function yx(e) {
      var t = typeof e;
      return t == "string" || t == "number" || t == "symbol" || t == "boolean"
        ? e !== "__proto__"
        : e === null;
    }
    Jd.exports = yx;
  });
  var Pr = c((NH, tp) => {
    var Ex = ep();
    function mx(e, t) {
      var r = e.__data__;
      return Ex(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    tp.exports = mx;
  });
  var np = c((PH, rp) => {
    var _x = Pr();
    function bx(e) {
      var t = _x(this, e).delete(e);
      return (this.size -= t ? 1 : 0), t;
    }
    rp.exports = bx;
  });
  var op = c((qH, ip) => {
    var Tx = Pr();
    function Ix(e) {
      return Tx(this, e).get(e);
    }
    ip.exports = Ix;
  });
  var sp = c((FH, ap) => {
    var wx = Pr();
    function Ox(e) {
      return wx(this, e).has(e);
    }
    ap.exports = Ox;
  });
  var cp = c((MH, up) => {
    var Ax = Pr();
    function Sx(e, t) {
      var r = Ax(this, e),
        n = r.size;
      return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
    }
    up.exports = Sx;
  });
  var Pn = c((DH, lp) => {
    var xx = Zd(),
      Cx = np(),
      Rx = op(),
      Lx = sp(),
      Nx = cp();
    function Qt(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    Qt.prototype.clear = xx;
    Qt.prototype.delete = Cx;
    Qt.prototype.get = Rx;
    Qt.prototype.has = Lx;
    Qt.prototype.set = Nx;
    lp.exports = Qt;
  });
  var dp = c((kH, fp) => {
    var Px = Lr(),
      qx = Nn(),
      Fx = Pn(),
      Mx = 200;
    function Dx(e, t) {
      var r = this.__data__;
      if (r instanceof Px) {
        var n = r.__data__;
        if (!qx || n.length < Mx - 1)
          return n.push([e, t]), (this.size = ++r.size), this;
        r = this.__data__ = new Fx(n);
      }
      return r.set(e, t), (this.size = r.size), this;
    }
    fp.exports = Dx;
  });
  var Qo = c((GH, pp) => {
    var kx = Lr(),
      Gx = vd(),
      Vx = yd(),
      Ux = md(),
      Bx = bd(),
      Hx = dp();
    function Zt(e) {
      var t = (this.__data__ = new kx(e));
      this.size = t.size;
    }
    Zt.prototype.clear = Gx;
    Zt.prototype.delete = Vx;
    Zt.prototype.get = Ux;
    Zt.prototype.has = Bx;
    Zt.prototype.set = Hx;
    pp.exports = Zt;
  });
  var vp = c((VH, gp) => {
    var Wx = "__lodash_hash_undefined__";
    function Xx(e) {
      return this.__data__.set(e, Wx), this;
    }
    gp.exports = Xx;
  });
  var yp = c((UH, hp) => {
    function jx(e) {
      return this.__data__.has(e);
    }
    hp.exports = jx;
  });
  var mp = c((BH, Ep) => {
    var zx = Pn(),
      Kx = vp(),
      Yx = yp();
    function qn(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.__data__ = new zx(); ++t < r; ) this.add(e[t]);
    }
    qn.prototype.add = qn.prototype.push = Kx;
    qn.prototype.has = Yx;
    Ep.exports = qn;
  });
  var bp = c((HH, _p) => {
    function $x(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
        if (t(e[r], r, e)) return !0;
      return !1;
    }
    _p.exports = $x;
  });
  var Ip = c((WH, Tp) => {
    function Qx(e, t) {
      return e.has(t);
    }
    Tp.exports = Qx;
  });
  var Zo = c((XH, wp) => {
    var Zx = mp(),
      Jx = bp(),
      eC = Ip(),
      tC = 1,
      rC = 2;
    function nC(e, t, r, n, i, o) {
      var s = r & tC,
        a = e.length,
        u = t.length;
      if (a != u && !(s && u > a)) return !1;
      var l = o.get(e),
        g = o.get(t);
      if (l && g) return l == t && g == e;
      var d = -1,
        p = !0,
        h = r & rC ? new Zx() : void 0;
      for (o.set(e, t), o.set(t, e); ++d < a; ) {
        var b = e[d],
          _ = t[d];
        if (n) var w = s ? n(_, b, d, t, e, o) : n(b, _, d, e, t, o);
        if (w !== void 0) {
          if (w) continue;
          p = !1;
          break;
        }
        if (h) {
          if (
            !Jx(t, function (m, C) {
              if (!eC(h, C) && (b === m || i(b, m, r, n, o))) return h.push(C);
            })
          ) {
            p = !1;
            break;
          }
        } else if (!(b === _ || i(b, _, r, n, o))) {
          p = !1;
          break;
        }
      }
      return o.delete(e), o.delete(t), p;
    }
    wp.exports = nC;
  });
  var Ap = c((jH, Op) => {
    var iC = Ye(),
      oC = iC.Uint8Array;
    Op.exports = oC;
  });
  var xp = c((zH, Sp) => {
    function aC(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n, i) {
          r[++t] = [i, n];
        }),
        r
      );
    }
    Sp.exports = aC;
  });
  var Rp = c((KH, Cp) => {
    function sC(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n) {
          r[++t] = n;
        }),
        r
      );
    }
    Cp.exports = sC;
  });
  var Fp = c((YH, qp) => {
    var Lp = Xt(),
      Np = Ap(),
      uC = Ln(),
      cC = Zo(),
      lC = xp(),
      fC = Rp(),
      dC = 1,
      pC = 2,
      gC = "[object Boolean]",
      vC = "[object Date]",
      hC = "[object Error]",
      yC = "[object Map]",
      EC = "[object Number]",
      mC = "[object RegExp]",
      _C = "[object Set]",
      bC = "[object String]",
      TC = "[object Symbol]",
      IC = "[object ArrayBuffer]",
      wC = "[object DataView]",
      Pp = Lp ? Lp.prototype : void 0,
      Jo = Pp ? Pp.valueOf : void 0;
    function OC(e, t, r, n, i, o, s) {
      switch (r) {
        case wC:
          if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
            return !1;
          (e = e.buffer), (t = t.buffer);
        case IC:
          return !(e.byteLength != t.byteLength || !o(new Np(e), new Np(t)));
        case gC:
        case vC:
        case EC:
          return uC(+e, +t);
        case hC:
          return e.name == t.name && e.message == t.message;
        case mC:
        case bC:
          return e == t + "";
        case yC:
          var a = lC;
        case _C:
          var u = n & dC;
          if ((a || (a = fC), e.size != t.size && !u)) return !1;
          var l = s.get(e);
          if (l) return l == t;
          (n |= pC), s.set(e, t);
          var g = cC(a(e), a(t), n, i, o, s);
          return s.delete(e), g;
        case TC:
          if (Jo) return Jo.call(e) == Jo.call(t);
      }
      return !1;
    }
    qp.exports = OC;
  });
  var Fn = c(($H, Mp) => {
    function AC(e, t) {
      for (var r = -1, n = t.length, i = e.length; ++r < n; ) e[i + r] = t[r];
      return e;
    }
    Mp.exports = AC;
  });
  var we = c((QH, Dp) => {
    var SC = Array.isArray;
    Dp.exports = SC;
  });
  var ea = c((ZH, kp) => {
    var xC = Fn(),
      CC = we();
    function RC(e, t, r) {
      var n = t(e);
      return CC(e) ? n : xC(n, r(e));
    }
    kp.exports = RC;
  });
  var Vp = c((JH, Gp) => {
    function LC(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, i = 0, o = []; ++r < n; ) {
        var s = e[r];
        t(s, r, e) && (o[i++] = s);
      }
      return o;
    }
    Gp.exports = LC;
  });
  var ta = c((eW, Up) => {
    function NC() {
      return [];
    }
    Up.exports = NC;
  });
  var ra = c((tW, Hp) => {
    var PC = Vp(),
      qC = ta(),
      FC = Object.prototype,
      MC = FC.propertyIsEnumerable,
      Bp = Object.getOwnPropertySymbols,
      DC = Bp
        ? function (e) {
            return e == null
              ? []
              : ((e = Object(e)),
                PC(Bp(e), function (t) {
                  return MC.call(e, t);
                }));
          }
        : qC;
    Hp.exports = DC;
  });
  var Xp = c((rW, Wp) => {
    function kC(e, t) {
      for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
      return n;
    }
    Wp.exports = kC;
  });
  var zp = c((nW, jp) => {
    var GC = bt(),
      VC = dt(),
      UC = "[object Arguments]";
    function BC(e) {
      return VC(e) && GC(e) == UC;
    }
    jp.exports = BC;
  });
  var qr = c((iW, $p) => {
    var Kp = zp(),
      HC = dt(),
      Yp = Object.prototype,
      WC = Yp.hasOwnProperty,
      XC = Yp.propertyIsEnumerable,
      jC = Kp(
        (function () {
          return arguments;
        })()
      )
        ? Kp
        : function (e) {
            return HC(e) && WC.call(e, "callee") && !XC.call(e, "callee");
          };
    $p.exports = jC;
  });
  var Zp = c((oW, Qp) => {
    function zC() {
      return !1;
    }
    Qp.exports = zC;
  });
  var Mn = c((Fr, Jt) => {
    var KC = Ye(),
      YC = Zp(),
      tg = typeof Fr == "object" && Fr && !Fr.nodeType && Fr,
      Jp = tg && typeof Jt == "object" && Jt && !Jt.nodeType && Jt,
      $C = Jp && Jp.exports === tg,
      eg = $C ? KC.Buffer : void 0,
      QC = eg ? eg.isBuffer : void 0,
      ZC = QC || YC;
    Jt.exports = ZC;
  });
  var Dn = c((aW, rg) => {
    var JC = 9007199254740991,
      eR = /^(?:0|[1-9]\d*)$/;
    function tR(e, t) {
      var r = typeof e;
      return (
        (t = t ?? JC),
        !!t &&
          (r == "number" || (r != "symbol" && eR.test(e))) &&
          e > -1 &&
          e % 1 == 0 &&
          e < t
      );
    }
    rg.exports = tR;
  });
  var kn = c((sW, ng) => {
    var rR = 9007199254740991;
    function nR(e) {
      return typeof e == "number" && e > -1 && e % 1 == 0 && e <= rR;
    }
    ng.exports = nR;
  });
  var og = c((uW, ig) => {
    var iR = bt(),
      oR = kn(),
      aR = dt(),
      sR = "[object Arguments]",
      uR = "[object Array]",
      cR = "[object Boolean]",
      lR = "[object Date]",
      fR = "[object Error]",
      dR = "[object Function]",
      pR = "[object Map]",
      gR = "[object Number]",
      vR = "[object Object]",
      hR = "[object RegExp]",
      yR = "[object Set]",
      ER = "[object String]",
      mR = "[object WeakMap]",
      _R = "[object ArrayBuffer]",
      bR = "[object DataView]",
      TR = "[object Float32Array]",
      IR = "[object Float64Array]",
      wR = "[object Int8Array]",
      OR = "[object Int16Array]",
      AR = "[object Int32Array]",
      SR = "[object Uint8Array]",
      xR = "[object Uint8ClampedArray]",
      CR = "[object Uint16Array]",
      RR = "[object Uint32Array]",
      he = {};
    he[TR] =
      he[IR] =
      he[wR] =
      he[OR] =
      he[AR] =
      he[SR] =
      he[xR] =
      he[CR] =
      he[RR] =
        !0;
    he[sR] =
      he[uR] =
      he[_R] =
      he[cR] =
      he[bR] =
      he[lR] =
      he[fR] =
      he[dR] =
      he[pR] =
      he[gR] =
      he[vR] =
      he[hR] =
      he[yR] =
      he[ER] =
      he[mR] =
        !1;
    function LR(e) {
      return aR(e) && oR(e.length) && !!he[iR(e)];
    }
    ig.exports = LR;
  });
  var sg = c((cW, ag) => {
    function NR(e) {
      return function (t) {
        return e(t);
      };
    }
    ag.exports = NR;
  });
  var cg = c((Mr, er) => {
    var PR = xo(),
      ug = typeof Mr == "object" && Mr && !Mr.nodeType && Mr,
      Dr = ug && typeof er == "object" && er && !er.nodeType && er,
      qR = Dr && Dr.exports === ug,
      na = qR && PR.process,
      FR = (function () {
        try {
          var e = Dr && Dr.require && Dr.require("util").types;
          return e || (na && na.binding && na.binding("util"));
        } catch {}
      })();
    er.exports = FR;
  });
  var Gn = c((lW, dg) => {
    var MR = og(),
      DR = sg(),
      lg = cg(),
      fg = lg && lg.isTypedArray,
      kR = fg ? DR(fg) : MR;
    dg.exports = kR;
  });
  var ia = c((fW, pg) => {
    var GR = Xp(),
      VR = qr(),
      UR = we(),
      BR = Mn(),
      HR = Dn(),
      WR = Gn(),
      XR = Object.prototype,
      jR = XR.hasOwnProperty;
    function zR(e, t) {
      var r = UR(e),
        n = !r && VR(e),
        i = !r && !n && BR(e),
        o = !r && !n && !i && WR(e),
        s = r || n || i || o,
        a = s ? GR(e.length, String) : [],
        u = a.length;
      for (var l in e)
        (t || jR.call(e, l)) &&
          !(
            s &&
            (l == "length" ||
              (i && (l == "offset" || l == "parent")) ||
              (o &&
                (l == "buffer" || l == "byteLength" || l == "byteOffset")) ||
              HR(l, u))
          ) &&
          a.push(l);
      return a;
    }
    pg.exports = zR;
  });
  var Vn = c((dW, gg) => {
    var KR = Object.prototype;
    function YR(e) {
      var t = e && e.constructor,
        r = (typeof t == "function" && t.prototype) || KR;
      return e === r;
    }
    gg.exports = YR;
  });
  var hg = c((pW, vg) => {
    var $R = Co(),
      QR = $R(Object.keys, Object);
    vg.exports = QR;
  });
  var Un = c((gW, yg) => {
    var ZR = Vn(),
      JR = hg(),
      eL = Object.prototype,
      tL = eL.hasOwnProperty;
    function rL(e) {
      if (!ZR(e)) return JR(e);
      var t = [];
      for (var r in Object(e)) tL.call(e, r) && r != "constructor" && t.push(r);
      return t;
    }
    yg.exports = rL;
  });
  var Pt = c((vW, Eg) => {
    var nL = Ko(),
      iL = kn();
    function oL(e) {
      return e != null && iL(e.length) && !nL(e);
    }
    Eg.exports = oL;
  });
  var kr = c((hW, mg) => {
    var aL = ia(),
      sL = Un(),
      uL = Pt();
    function cL(e) {
      return uL(e) ? aL(e) : sL(e);
    }
    mg.exports = cL;
  });
  var bg = c((yW, _g) => {
    var lL = ea(),
      fL = ra(),
      dL = kr();
    function pL(e) {
      return lL(e, dL, fL);
    }
    _g.exports = pL;
  });
  var wg = c((EW, Ig) => {
    var Tg = bg(),
      gL = 1,
      vL = Object.prototype,
      hL = vL.hasOwnProperty;
    function yL(e, t, r, n, i, o) {
      var s = r & gL,
        a = Tg(e),
        u = a.length,
        l = Tg(t),
        g = l.length;
      if (u != g && !s) return !1;
      for (var d = u; d--; ) {
        var p = a[d];
        if (!(s ? p in t : hL.call(t, p))) return !1;
      }
      var h = o.get(e),
        b = o.get(t);
      if (h && b) return h == t && b == e;
      var _ = !0;
      o.set(e, t), o.set(t, e);
      for (var w = s; ++d < u; ) {
        p = a[d];
        var m = e[p],
          C = t[p];
        if (n) var O = s ? n(C, m, p, t, e, o) : n(m, C, p, e, t, o);
        if (!(O === void 0 ? m === C || i(m, C, r, n, o) : O)) {
          _ = !1;
          break;
        }
        w || (w = p == "constructor");
      }
      if (_ && !w) {
        var N = e.constructor,
          P = t.constructor;
        N != P &&
          "constructor" in e &&
          "constructor" in t &&
          !(
            typeof N == "function" &&
            N instanceof N &&
            typeof P == "function" &&
            P instanceof P
          ) &&
          (_ = !1);
      }
      return o.delete(e), o.delete(t), _;
    }
    Ig.exports = yL;
  });
  var Ag = c((mW, Og) => {
    var EL = Tt(),
      mL = Ye(),
      _L = EL(mL, "DataView");
    Og.exports = _L;
  });
  var xg = c((_W, Sg) => {
    var bL = Tt(),
      TL = Ye(),
      IL = bL(TL, "Promise");
    Sg.exports = IL;
  });
  var Rg = c((bW, Cg) => {
    var wL = Tt(),
      OL = Ye(),
      AL = wL(OL, "Set");
    Cg.exports = AL;
  });
  var oa = c((TW, Lg) => {
    var SL = Tt(),
      xL = Ye(),
      CL = SL(xL, "WeakMap");
    Lg.exports = CL;
  });
  var Bn = c((IW, kg) => {
    var aa = Ag(),
      sa = Nn(),
      ua = xg(),
      ca = Rg(),
      la = oa(),
      Dg = bt(),
      tr = $o(),
      Ng = "[object Map]",
      RL = "[object Object]",
      Pg = "[object Promise]",
      qg = "[object Set]",
      Fg = "[object WeakMap]",
      Mg = "[object DataView]",
      LL = tr(aa),
      NL = tr(sa),
      PL = tr(ua),
      qL = tr(ca),
      FL = tr(la),
      qt = Dg;
    ((aa && qt(new aa(new ArrayBuffer(1))) != Mg) ||
      (sa && qt(new sa()) != Ng) ||
      (ua && qt(ua.resolve()) != Pg) ||
      (ca && qt(new ca()) != qg) ||
      (la && qt(new la()) != Fg)) &&
      (qt = function (e) {
        var t = Dg(e),
          r = t == RL ? e.constructor : void 0,
          n = r ? tr(r) : "";
        if (n)
          switch (n) {
            case LL:
              return Mg;
            case NL:
              return Ng;
            case PL:
              return Pg;
            case qL:
              return qg;
            case FL:
              return Fg;
          }
        return t;
      });
    kg.exports = qt;
  });
  var jg = c((wW, Xg) => {
    var fa = Qo(),
      ML = Zo(),
      DL = Fp(),
      kL = wg(),
      Gg = Bn(),
      Vg = we(),
      Ug = Mn(),
      GL = Gn(),
      VL = 1,
      Bg = "[object Arguments]",
      Hg = "[object Array]",
      Hn = "[object Object]",
      UL = Object.prototype,
      Wg = UL.hasOwnProperty;
    function BL(e, t, r, n, i, o) {
      var s = Vg(e),
        a = Vg(t),
        u = s ? Hg : Gg(e),
        l = a ? Hg : Gg(t);
      (u = u == Bg ? Hn : u), (l = l == Bg ? Hn : l);
      var g = u == Hn,
        d = l == Hn,
        p = u == l;
      if (p && Ug(e)) {
        if (!Ug(t)) return !1;
        (s = !0), (g = !1);
      }
      if (p && !g)
        return (
          o || (o = new fa()),
          s || GL(e) ? ML(e, t, r, n, i, o) : DL(e, t, u, r, n, i, o)
        );
      if (!(r & VL)) {
        var h = g && Wg.call(e, "__wrapped__"),
          b = d && Wg.call(t, "__wrapped__");
        if (h || b) {
          var _ = h ? e.value() : e,
            w = b ? t.value() : t;
          return o || (o = new fa()), i(_, w, r, n, o);
        }
      }
      return p ? (o || (o = new fa()), kL(e, t, r, n, i, o)) : !1;
    }
    Xg.exports = BL;
  });
  var da = c((OW, Yg) => {
    var HL = jg(),
      zg = dt();
    function Kg(e, t, r, n, i) {
      return e === t
        ? !0
        : e == null || t == null || (!zg(e) && !zg(t))
        ? e !== e && t !== t
        : HL(e, t, r, n, Kg, i);
    }
    Yg.exports = Kg;
  });
  var Qg = c((AW, $g) => {
    var WL = Qo(),
      XL = da(),
      jL = 1,
      zL = 2;
    function KL(e, t, r, n) {
      var i = r.length,
        o = i,
        s = !n;
      if (e == null) return !o;
      for (e = Object(e); i--; ) {
        var a = r[i];
        if (s && a[2] ? a[1] !== e[a[0]] : !(a[0] in e)) return !1;
      }
      for (; ++i < o; ) {
        a = r[i];
        var u = a[0],
          l = e[u],
          g = a[1];
        if (s && a[2]) {
          if (l === void 0 && !(u in e)) return !1;
        } else {
          var d = new WL();
          if (n) var p = n(l, g, u, e, t, d);
          if (!(p === void 0 ? XL(g, l, jL | zL, n, d) : p)) return !1;
        }
      }
      return !0;
    }
    $g.exports = KL;
  });
  var pa = c((SW, Zg) => {
    var YL = ot();
    function $L(e) {
      return e === e && !YL(e);
    }
    Zg.exports = $L;
  });
  var ev = c((xW, Jg) => {
    var QL = pa(),
      ZL = kr();
    function JL(e) {
      for (var t = ZL(e), r = t.length; r--; ) {
        var n = t[r],
          i = e[n];
        t[r] = [n, i, QL(i)];
      }
      return t;
    }
    Jg.exports = JL;
  });
  var ga = c((CW, tv) => {
    function eN(e, t) {
      return function (r) {
        return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
      };
    }
    tv.exports = eN;
  });
  var nv = c((RW, rv) => {
    var tN = Qg(),
      rN = ev(),
      nN = ga();
    function iN(e) {
      var t = rN(e);
      return t.length == 1 && t[0][2]
        ? nN(t[0][0], t[0][1])
        : function (r) {
            return r === e || tN(r, e, t);
          };
    }
    rv.exports = iN;
  });
  var Gr = c((LW, iv) => {
    var oN = bt(),
      aN = dt(),
      sN = "[object Symbol]";
    function uN(e) {
      return typeof e == "symbol" || (aN(e) && oN(e) == sN);
    }
    iv.exports = uN;
  });
  var Wn = c((NW, ov) => {
    var cN = we(),
      lN = Gr(),
      fN = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      dN = /^\w*$/;
    function pN(e, t) {
      if (cN(e)) return !1;
      var r = typeof e;
      return r == "number" ||
        r == "symbol" ||
        r == "boolean" ||
        e == null ||
        lN(e)
        ? !0
        : dN.test(e) || !fN.test(e) || (t != null && e in Object(t));
    }
    ov.exports = pN;
  });
  var uv = c((PW, sv) => {
    var av = Pn(),
      gN = "Expected a function";
    function va(e, t) {
      if (typeof e != "function" || (t != null && typeof t != "function"))
        throw new TypeError(gN);
      var r = function () {
        var n = arguments,
          i = t ? t.apply(this, n) : n[0],
          o = r.cache;
        if (o.has(i)) return o.get(i);
        var s = e.apply(this, n);
        return (r.cache = o.set(i, s) || o), s;
      };
      return (r.cache = new (va.Cache || av)()), r;
    }
    va.Cache = av;
    sv.exports = va;
  });
  var lv = c((qW, cv) => {
    var vN = uv(),
      hN = 500;
    function yN(e) {
      var t = vN(e, function (n) {
          return r.size === hN && r.clear(), n;
        }),
        r = t.cache;
      return t;
    }
    cv.exports = yN;
  });
  var dv = c((FW, fv) => {
    var EN = lv(),
      mN =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      _N = /\\(\\)?/g,
      bN = EN(function (e) {
        var t = [];
        return (
          e.charCodeAt(0) === 46 && t.push(""),
          e.replace(mN, function (r, n, i, o) {
            t.push(i ? o.replace(_N, "$1") : n || r);
          }),
          t
        );
      });
    fv.exports = bN;
  });
  var ha = c((MW, pv) => {
    function TN(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, i = Array(n); ++r < n; )
        i[r] = t(e[r], r, e);
      return i;
    }
    pv.exports = TN;
  });
  var mv = c((DW, Ev) => {
    var gv = Xt(),
      IN = ha(),
      wN = we(),
      ON = Gr(),
      AN = 1 / 0,
      vv = gv ? gv.prototype : void 0,
      hv = vv ? vv.toString : void 0;
    function yv(e) {
      if (typeof e == "string") return e;
      if (wN(e)) return IN(e, yv) + "";
      if (ON(e)) return hv ? hv.call(e) : "";
      var t = e + "";
      return t == "0" && 1 / e == -AN ? "-0" : t;
    }
    Ev.exports = yv;
  });
  var bv = c((kW, _v) => {
    var SN = mv();
    function xN(e) {
      return e == null ? "" : SN(e);
    }
    _v.exports = xN;
  });
  var Vr = c((GW, Tv) => {
    var CN = we(),
      RN = Wn(),
      LN = dv(),
      NN = bv();
    function PN(e, t) {
      return CN(e) ? e : RN(e, t) ? [e] : LN(NN(e));
    }
    Tv.exports = PN;
  });
  var rr = c((VW, Iv) => {
    var qN = Gr(),
      FN = 1 / 0;
    function MN(e) {
      if (typeof e == "string" || qN(e)) return e;
      var t = e + "";
      return t == "0" && 1 / e == -FN ? "-0" : t;
    }
    Iv.exports = MN;
  });
  var Xn = c((UW, wv) => {
    var DN = Vr(),
      kN = rr();
    function GN(e, t) {
      t = DN(t, e);
      for (var r = 0, n = t.length; e != null && r < n; ) e = e[kN(t[r++])];
      return r && r == n ? e : void 0;
    }
    wv.exports = GN;
  });
  var jn = c((BW, Ov) => {
    var VN = Xn();
    function UN(e, t, r) {
      var n = e == null ? void 0 : VN(e, t);
      return n === void 0 ? r : n;
    }
    Ov.exports = UN;
  });
  var Sv = c((HW, Av) => {
    function BN(e, t) {
      return e != null && t in Object(e);
    }
    Av.exports = BN;
  });
  var Cv = c((WW, xv) => {
    var HN = Vr(),
      WN = qr(),
      XN = we(),
      jN = Dn(),
      zN = kn(),
      KN = rr();
    function YN(e, t, r) {
      t = HN(t, e);
      for (var n = -1, i = t.length, o = !1; ++n < i; ) {
        var s = KN(t[n]);
        if (!(o = e != null && r(e, s))) break;
        e = e[s];
      }
      return o || ++n != i
        ? o
        : ((i = e == null ? 0 : e.length),
          !!i && zN(i) && jN(s, i) && (XN(e) || WN(e)));
    }
    xv.exports = YN;
  });
  var Lv = c((XW, Rv) => {
    var $N = Sv(),
      QN = Cv();
    function ZN(e, t) {
      return e != null && QN(e, t, $N);
    }
    Rv.exports = ZN;
  });
  var Pv = c((jW, Nv) => {
    var JN = da(),
      eP = jn(),
      tP = Lv(),
      rP = Wn(),
      nP = pa(),
      iP = ga(),
      oP = rr(),
      aP = 1,
      sP = 2;
    function uP(e, t) {
      return rP(e) && nP(t)
        ? iP(oP(e), t)
        : function (r) {
            var n = eP(r, e);
            return n === void 0 && n === t ? tP(r, e) : JN(t, n, aP | sP);
          };
    }
    Nv.exports = uP;
  });
  var zn = c((zW, qv) => {
    function cP(e) {
      return e;
    }
    qv.exports = cP;
  });
  var ya = c((KW, Fv) => {
    function lP(e) {
      return function (t) {
        return t?.[e];
      };
    }
    Fv.exports = lP;
  });
  var Dv = c((YW, Mv) => {
    var fP = Xn();
    function dP(e) {
      return function (t) {
        return fP(t, e);
      };
    }
    Mv.exports = dP;
  });
  var Gv = c(($W, kv) => {
    var pP = ya(),
      gP = Dv(),
      vP = Wn(),
      hP = rr();
    function yP(e) {
      return vP(e) ? pP(hP(e)) : gP(e);
    }
    kv.exports = yP;
  });
  var It = c((QW, Vv) => {
    var EP = nv(),
      mP = Pv(),
      _P = zn(),
      bP = we(),
      TP = Gv();
    function IP(e) {
      return typeof e == "function"
        ? e
        : e == null
        ? _P
        : typeof e == "object"
        ? bP(e)
          ? mP(e[0], e[1])
          : EP(e)
        : TP(e);
    }
    Vv.exports = IP;
  });
  var Ea = c((ZW, Uv) => {
    var wP = It(),
      OP = Pt(),
      AP = kr();
    function SP(e) {
      return function (t, r, n) {
        var i = Object(t);
        if (!OP(t)) {
          var o = wP(r, 3);
          (t = AP(t)),
            (r = function (a) {
              return o(i[a], a, i);
            });
        }
        var s = e(t, r, n);
        return s > -1 ? i[o ? t[s] : s] : void 0;
      };
    }
    Uv.exports = SP;
  });
  var ma = c((JW, Bv) => {
    function xP(e, t, r, n) {
      for (var i = e.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i; )
        if (t(e[o], o, e)) return o;
      return -1;
    }
    Bv.exports = xP;
  });
  var Wv = c((eX, Hv) => {
    var CP = /\s/;
    function RP(e) {
      for (var t = e.length; t-- && CP.test(e.charAt(t)); );
      return t;
    }
    Hv.exports = RP;
  });
  var jv = c((tX, Xv) => {
    var LP = Wv(),
      NP = /^\s+/;
    function PP(e) {
      return e && e.slice(0, LP(e) + 1).replace(NP, "");
    }
    Xv.exports = PP;
  });
  var Kn = c((rX, Yv) => {
    var qP = jv(),
      zv = ot(),
      FP = Gr(),
      Kv = 0 / 0,
      MP = /^[-+]0x[0-9a-f]+$/i,
      DP = /^0b[01]+$/i,
      kP = /^0o[0-7]+$/i,
      GP = parseInt;
    function VP(e) {
      if (typeof e == "number") return e;
      if (FP(e)) return Kv;
      if (zv(e)) {
        var t = typeof e.valueOf == "function" ? e.valueOf() : e;
        e = zv(t) ? t + "" : t;
      }
      if (typeof e != "string") return e === 0 ? e : +e;
      e = qP(e);
      var r = DP.test(e);
      return r || kP.test(e) ? GP(e.slice(2), r ? 2 : 8) : MP.test(e) ? Kv : +e;
    }
    Yv.exports = VP;
  });
  var Zv = c((nX, Qv) => {
    var UP = Kn(),
      $v = 1 / 0,
      BP = 17976931348623157e292;
    function HP(e) {
      if (!e) return e === 0 ? e : 0;
      if (((e = UP(e)), e === $v || e === -$v)) {
        var t = e < 0 ? -1 : 1;
        return t * BP;
      }
      return e === e ? e : 0;
    }
    Qv.exports = HP;
  });
  var _a = c((iX, Jv) => {
    var WP = Zv();
    function XP(e) {
      var t = WP(e),
        r = t % 1;
      return t === t ? (r ? t - r : t) : 0;
    }
    Jv.exports = XP;
  });
  var th = c((oX, eh) => {
    var jP = ma(),
      zP = It(),
      KP = _a(),
      YP = Math.max;
    function $P(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var i = r == null ? 0 : KP(r);
      return i < 0 && (i = YP(n + i, 0)), jP(e, zP(t, 3), i);
    }
    eh.exports = $P;
  });
  var ba = c((aX, rh) => {
    var QP = Ea(),
      ZP = th(),
      JP = QP(ZP);
    rh.exports = JP;
  });
  var oh = {};
  Me(oh, {
    ELEMENT_MATCHES: () => eq,
    FLEX_PREFIXED: () => Ta,
    IS_BROWSER_ENV: () => Qe,
    TRANSFORM_PREFIXED: () => wt,
    TRANSFORM_STYLE_PREFIXED: () => $n,
    withBrowser: () => Yn,
  });
  var ih,
    Qe,
    Yn,
    eq,
    Ta,
    wt,
    nh,
    $n,
    Qn = ye(() => {
      "use strict";
      (ih = ce(ba())),
        (Qe = typeof window < "u"),
        (Yn = (e, t) => (Qe ? e() : t)),
        (eq = Yn(() =>
          (0, ih.default)(
            [
              "matches",
              "matchesSelector",
              "mozMatchesSelector",
              "msMatchesSelector",
              "oMatchesSelector",
              "webkitMatchesSelector",
            ],
            (e) => e in Element.prototype
          )
        )),
        (Ta = Yn(() => {
          let e = document.createElement("i"),
            t = [
              "flex",
              "-webkit-flex",
              "-ms-flexbox",
              "-moz-box",
              "-webkit-box",
            ],
            r = "";
          try {
            let { length: n } = t;
            for (let i = 0; i < n; i++) {
              let o = t[i];
              if (((e.style.display = o), e.style.display === o)) return o;
            }
            return r;
          } catch {
            return r;
          }
        }, "flex")),
        (wt = Yn(() => {
          let e = document.createElement("i");
          if (e.style.transform == null) {
            let t = ["Webkit", "Moz", "ms"],
              r = "Transform",
              { length: n } = t;
            for (let i = 0; i < n; i++) {
              let o = t[i] + r;
              if (e.style[o] !== void 0) return o;
            }
          }
          return "transform";
        }, "transform")),
        (nh = wt.split("transform")[0]),
        ($n = nh ? nh + "TransformStyle" : "transformStyle");
    });
  var Ia = c((sX, lh) => {
    var tq = 4,
      rq = 0.001,
      nq = 1e-7,
      iq = 10,
      Ur = 11,
      Zn = 1 / (Ur - 1),
      oq = typeof Float32Array == "function";
    function ah(e, t) {
      return 1 - 3 * t + 3 * e;
    }
    function sh(e, t) {
      return 3 * t - 6 * e;
    }
    function uh(e) {
      return 3 * e;
    }
    function Jn(e, t, r) {
      return ((ah(t, r) * e + sh(t, r)) * e + uh(t)) * e;
    }
    function ch(e, t, r) {
      return 3 * ah(t, r) * e * e + 2 * sh(t, r) * e + uh(t);
    }
    function aq(e, t, r, n, i) {
      var o,
        s,
        a = 0;
      do
        (s = t + (r - t) / 2), (o = Jn(s, n, i) - e), o > 0 ? (r = s) : (t = s);
      while (Math.abs(o) > nq && ++a < iq);
      return s;
    }
    function sq(e, t, r, n) {
      for (var i = 0; i < tq; ++i) {
        var o = ch(t, r, n);
        if (o === 0) return t;
        var s = Jn(t, r, n) - e;
        t -= s / o;
      }
      return t;
    }
    lh.exports = function (t, r, n, i) {
      if (!(0 <= t && t <= 1 && 0 <= n && n <= 1))
        throw new Error("bezier x values must be in [0, 1] range");
      var o = oq ? new Float32Array(Ur) : new Array(Ur);
      if (t !== r || n !== i)
        for (var s = 0; s < Ur; ++s) o[s] = Jn(s * Zn, t, n);
      function a(u) {
        for (var l = 0, g = 1, d = Ur - 1; g !== d && o[g] <= u; ++g) l += Zn;
        --g;
        var p = (u - o[g]) / (o[g + 1] - o[g]),
          h = l + p * Zn,
          b = ch(h, t, n);
        return b >= rq ? sq(u, h, t, n) : b === 0 ? h : aq(u, l, l + Zn, t, n);
      }
      return function (l) {
        return t === r && n === i
          ? l
          : l === 0
          ? 0
          : l === 1
          ? 1
          : Jn(a(l), r, i);
      };
    };
  });
  var Hr = {};
  Me(Hr, {
    bounce: () => Hq,
    bouncePast: () => Wq,
    ease: () => uq,
    easeIn: () => cq,
    easeInOut: () => fq,
    easeOut: () => lq,
    inBack: () => qq,
    inCirc: () => Rq,
    inCubic: () => vq,
    inElastic: () => Dq,
    inExpo: () => Sq,
    inOutBack: () => Mq,
    inOutCirc: () => Nq,
    inOutCubic: () => yq,
    inOutElastic: () => Gq,
    inOutExpo: () => Cq,
    inOutQuad: () => gq,
    inOutQuart: () => _q,
    inOutQuint: () => Iq,
    inOutSine: () => Aq,
    inQuad: () => dq,
    inQuart: () => Eq,
    inQuint: () => bq,
    inSine: () => wq,
    outBack: () => Fq,
    outBounce: () => Pq,
    outCirc: () => Lq,
    outCubic: () => hq,
    outElastic: () => kq,
    outExpo: () => xq,
    outQuad: () => pq,
    outQuart: () => mq,
    outQuint: () => Tq,
    outSine: () => Oq,
    swingFrom: () => Uq,
    swingFromTo: () => Vq,
    swingTo: () => Bq,
  });
  function dq(e) {
    return Math.pow(e, 2);
  }
  function pq(e) {
    return -(Math.pow(e - 1, 2) - 1);
  }
  function gq(e) {
    return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 2) : -0.5 * ((e -= 2) * e - 2);
  }
  function vq(e) {
    return Math.pow(e, 3);
  }
  function hq(e) {
    return Math.pow(e - 1, 3) + 1;
  }
  function yq(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 3)
      : 0.5 * (Math.pow(e - 2, 3) + 2);
  }
  function Eq(e) {
    return Math.pow(e, 4);
  }
  function mq(e) {
    return -(Math.pow(e - 1, 4) - 1);
  }
  function _q(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 4)
      : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
  }
  function bq(e) {
    return Math.pow(e, 5);
  }
  function Tq(e) {
    return Math.pow(e - 1, 5) + 1;
  }
  function Iq(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 5)
      : 0.5 * (Math.pow(e - 2, 5) + 2);
  }
  function wq(e) {
    return -Math.cos(e * (Math.PI / 2)) + 1;
  }
  function Oq(e) {
    return Math.sin(e * (Math.PI / 2));
  }
  function Aq(e) {
    return -0.5 * (Math.cos(Math.PI * e) - 1);
  }
  function Sq(e) {
    return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
  }
  function xq(e) {
    return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
  }
  function Cq(e) {
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (e /= 0.5) < 1
      ? 0.5 * Math.pow(2, 10 * (e - 1))
      : 0.5 * (-Math.pow(2, -10 * --e) + 2);
  }
  function Rq(e) {
    return -(Math.sqrt(1 - e * e) - 1);
  }
  function Lq(e) {
    return Math.sqrt(1 - Math.pow(e - 1, 2));
  }
  function Nq(e) {
    return (e /= 0.5) < 1
      ? -0.5 * (Math.sqrt(1 - e * e) - 1)
      : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
  }
  function Pq(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
      : e < 2.5 / 2.75
      ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
      : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function qq(e) {
    let t = pt;
    return e * e * ((t + 1) * e - t);
  }
  function Fq(e) {
    let t = pt;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function Mq(e) {
    let t = pt;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function Dq(e) {
    let t = pt,
      r = 0,
      n = 1;
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (r || (r = 0.3),
        n < 1
          ? ((n = 1), (t = r / 4))
          : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
        -(
          n *
          Math.pow(2, 10 * (e -= 1)) *
          Math.sin(((e - t) * (2 * Math.PI)) / r)
        ));
  }
  function kq(e) {
    let t = pt,
      r = 0,
      n = 1;
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (r || (r = 0.3),
        n < 1
          ? ((n = 1), (t = r / 4))
          : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
        n * Math.pow(2, -10 * e) * Math.sin(((e - t) * (2 * Math.PI)) / r) + 1);
  }
  function Gq(e) {
    let t = pt,
      r = 0,
      n = 1;
    return e === 0
      ? 0
      : (e /= 1 / 2) === 2
      ? 1
      : (r || (r = 0.3 * 1.5),
        n < 1
          ? ((n = 1), (t = r / 4))
          : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
        e < 1
          ? -0.5 *
            (n *
              Math.pow(2, 10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / r))
          : n *
              Math.pow(2, -10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / r) *
              0.5 +
            1);
  }
  function Vq(e) {
    let t = pt;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function Uq(e) {
    let t = pt;
    return e * e * ((t + 1) * e - t);
  }
  function Bq(e) {
    let t = pt;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function Hq(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
      : e < 2.5 / 2.75
      ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
      : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function Wq(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
      : e < 2.5 / 2.75
      ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
      : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
  }
  var Br,
    pt,
    uq,
    cq,
    lq,
    fq,
    wa = ye(() => {
      "use strict";
      (Br = ce(Ia())),
        (pt = 1.70158),
        (uq = (0, Br.default)(0.25, 0.1, 0.25, 1)),
        (cq = (0, Br.default)(0.42, 0, 1, 1)),
        (lq = (0, Br.default)(0, 0, 0.58, 1)),
        (fq = (0, Br.default)(0.42, 0, 0.58, 1));
    });
  var dh = {};
  Me(dh, {
    applyEasing: () => jq,
    createBezierEasing: () => Xq,
    optimizeFloat: () => Wr,
  });
  function Wr(e, t = 5, r = 10) {
    let n = Math.pow(r, t),
      i = Number(Math.round(e * n) / n);
    return Math.abs(i) > 1e-4 ? i : 0;
  }
  function Xq(e) {
    return (0, fh.default)(...e);
  }
  function jq(e, t, r) {
    return t === 0
      ? 0
      : t === 1
      ? 1
      : Wr(r ? (t > 0 ? r(t) : t) : t > 0 && e && Hr[e] ? Hr[e](t) : t);
  }
  var fh,
    Oa = ye(() => {
      "use strict";
      wa();
      fh = ce(Ia());
    });
  var vh = {};
  Me(vh, {
    createElementState: () => gh,
    ixElements: () => aF,
    mergeActionState: () => Aa,
  });
  function gh(e, t, r, n, i) {
    let o =
      r === zq ? (0, nr.getIn)(i, ["config", "target", "objectId"]) : null;
    return (0, nr.mergeIn)(e, [n], { id: n, ref: t, refId: o, refType: r });
  }
  function Aa(e, t, r, n, i) {
    let o = uF(i);
    return (0, nr.mergeIn)(e, [t, oF, r], n, o);
  }
  function uF(e) {
    let { config: t } = e;
    return sF.reduce((r, n) => {
      let i = n[0],
        o = n[1],
        s = t[i],
        a = t[o];
      return s != null && a != null && (r[o] = a), r;
    }, {});
  }
  var nr,
    cX,
    zq,
    lX,
    Kq,
    Yq,
    $q,
    Qq,
    Zq,
    Jq,
    eF,
    tF,
    rF,
    nF,
    iF,
    ph,
    oF,
    aF,
    sF,
    hh = ye(() => {
      "use strict";
      nr = ce(Kt());
      ke();
      ({
        HTML_ELEMENT: cX,
        PLAIN_OBJECT: zq,
        ABSTRACT_NODE: lX,
        CONFIG_X_VALUE: Kq,
        CONFIG_Y_VALUE: Yq,
        CONFIG_Z_VALUE: $q,
        CONFIG_VALUE: Qq,
        CONFIG_X_UNIT: Zq,
        CONFIG_Y_UNIT: Jq,
        CONFIG_Z_UNIT: eF,
        CONFIG_UNIT: tF,
      } = Ce),
        ({
          IX2_SESSION_STOPPED: rF,
          IX2_INSTANCE_ADDED: nF,
          IX2_ELEMENT_STATE_CHANGED: iF,
        } = Ie),
        (ph = {}),
        (oF = "refState"),
        (aF = (e = ph, t = {}) => {
          switch (t.type) {
            case rF:
              return ph;
            case nF: {
              let {
                  elementId: r,
                  element: n,
                  origin: i,
                  actionItem: o,
                  refType: s,
                } = t.payload,
                { actionTypeId: a } = o,
                u = e;
              return (
                (0, nr.getIn)(u, [r, n]) !== n && (u = gh(u, n, s, r, o)),
                Aa(u, r, a, i, o)
              );
            }
            case iF: {
              let {
                elementId: r,
                actionTypeId: n,
                current: i,
                actionItem: o,
              } = t.payload;
              return Aa(e, r, n, i, o);
            }
            default:
              return e;
          }
        });
      sF = [
        [Kq, Zq],
        [Yq, Jq],
        [$q, eF],
        [Qq, tF],
      ];
    });
  var yh = c((Oe) => {
    "use strict";
    Object.defineProperty(Oe, "__esModule", { value: !0 });
    Oe.renderPlugin =
      Oe.getPluginOrigin =
      Oe.getPluginDuration =
      Oe.getPluginDestination =
      Oe.getPluginConfig =
      Oe.createPluginInstance =
      Oe.clearPlugin =
        void 0;
    var cF = (e) => e.value;
    Oe.getPluginConfig = cF;
    var lF = (e, t) => {
      if (t.config.duration !== "auto") return null;
      let r = parseFloat(e.getAttribute("data-duration"));
      return r > 0
        ? r * 1e3
        : parseFloat(e.getAttribute("data-default-duration")) * 1e3;
    };
    Oe.getPluginDuration = lF;
    var fF = (e) => e || { value: 0 };
    Oe.getPluginOrigin = fF;
    var dF = (e) => ({ value: e.value });
    Oe.getPluginDestination = dF;
    var pF = (e) => {
      let t = window.Webflow.require("lottie").createInstance(e);
      return t.stop(), t.setSubframe(!0), t;
    };
    Oe.createPluginInstance = pF;
    var gF = (e, t, r) => {
      if (!e) return;
      let n = t[r.actionTypeId].value / 100;
      e.goToFrame(e.frames * n);
    };
    Oe.renderPlugin = gF;
    var vF = (e) => {
      window.Webflow.require("lottie").createInstance(e).stop();
    };
    Oe.clearPlugin = vF;
  });
  var mh = c((Ae) => {
    "use strict";
    Object.defineProperty(Ae, "__esModule", { value: !0 });
    Ae.renderPlugin =
      Ae.getPluginOrigin =
      Ae.getPluginDuration =
      Ae.getPluginDestination =
      Ae.getPluginConfig =
      Ae.createPluginInstance =
      Ae.clearPlugin =
        void 0;
    var hF = (e) => document.querySelector(`[data-w-id="${e}"]`),
      yF = () => window.Webflow.require("spline"),
      EF = (e, t) => e.filter((r) => !t.includes(r)),
      mF = (e, t) => e.value[t];
    Ae.getPluginConfig = mF;
    var _F = () => null;
    Ae.getPluginDuration = _F;
    var Eh = Object.freeze({
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
      }),
      bF = (e, t) => {
        let r = t.config.value,
          n = Object.keys(r);
        if (e) {
          let o = Object.keys(e),
            s = EF(n, o);
          return s.length ? s.reduce((u, l) => ((u[l] = Eh[l]), u), e) : e;
        }
        return n.reduce((o, s) => ((o[s] = Eh[s]), o), {});
      };
    Ae.getPluginOrigin = bF;
    var TF = (e) => e.value;
    Ae.getPluginDestination = TF;
    var IF = (e, t) => {
      var r;
      let n =
        t == null ||
        (r = t.config) === null ||
        r === void 0 ||
        (r = r.target) === null ||
        r === void 0
          ? void 0
          : r.pluginElement;
      return n ? hF(n) : null;
    };
    Ae.createPluginInstance = IF;
    var wF = (e, t, r) => {
      let n = yF(),
        i = n.getInstance(e),
        o = r.config.target.objectId,
        s = (a) => {
          if (!a) throw new Error("Invalid spline app passed to renderSpline");
          let u = o && a.findObjectById(o);
          if (!u) return;
          let { PLUGIN_SPLINE: l } = t;
          l.positionX != null && (u.position.x = l.positionX),
            l.positionY != null && (u.position.y = l.positionY),
            l.positionZ != null && (u.position.z = l.positionZ),
            l.rotationX != null && (u.rotation.x = l.rotationX),
            l.rotationY != null && (u.rotation.y = l.rotationY),
            l.rotationZ != null && (u.rotation.z = l.rotationZ),
            l.scaleX != null && (u.scale.x = l.scaleX),
            l.scaleY != null && (u.scale.y = l.scaleY),
            l.scaleZ != null && (u.scale.z = l.scaleZ);
        };
      i ? s(i.spline) : n.setLoadHandler(e, s);
    };
    Ae.renderPlugin = wF;
    var OF = () => null;
    Ae.clearPlugin = OF;
  });
  var xa = c((Sa) => {
    "use strict";
    Object.defineProperty(Sa, "__esModule", { value: !0 });
    Sa.normalizeColor = AF;
    var _h = {
      aliceblue: "#F0F8FF",
      antiquewhite: "#FAEBD7",
      aqua: "#00FFFF",
      aquamarine: "#7FFFD4",
      azure: "#F0FFFF",
      beige: "#F5F5DC",
      bisque: "#FFE4C4",
      black: "#000000",
      blanchedalmond: "#FFEBCD",
      blue: "#0000FF",
      blueviolet: "#8A2BE2",
      brown: "#A52A2A",
      burlywood: "#DEB887",
      cadetblue: "#5F9EA0",
      chartreuse: "#7FFF00",
      chocolate: "#D2691E",
      coral: "#FF7F50",
      cornflowerblue: "#6495ED",
      cornsilk: "#FFF8DC",
      crimson: "#DC143C",
      cyan: "#00FFFF",
      darkblue: "#00008B",
      darkcyan: "#008B8B",
      darkgoldenrod: "#B8860B",
      darkgray: "#A9A9A9",
      darkgreen: "#006400",
      darkgrey: "#A9A9A9",
      darkkhaki: "#BDB76B",
      darkmagenta: "#8B008B",
      darkolivegreen: "#556B2F",
      darkorange: "#FF8C00",
      darkorchid: "#9932CC",
      darkred: "#8B0000",
      darksalmon: "#E9967A",
      darkseagreen: "#8FBC8F",
      darkslateblue: "#483D8B",
      darkslategray: "#2F4F4F",
      darkslategrey: "#2F4F4F",
      darkturquoise: "#00CED1",
      darkviolet: "#9400D3",
      deeppink: "#FF1493",
      deepskyblue: "#00BFFF",
      dimgray: "#696969",
      dimgrey: "#696969",
      dodgerblue: "#1E90FF",
      firebrick: "#B22222",
      floralwhite: "#FFFAF0",
      forestgreen: "#228B22",
      fuchsia: "#FF00FF",
      gainsboro: "#DCDCDC",
      ghostwhite: "#F8F8FF",
      gold: "#FFD700",
      goldenrod: "#DAA520",
      gray: "#808080",
      green: "#008000",
      greenyellow: "#ADFF2F",
      grey: "#808080",
      honeydew: "#F0FFF0",
      hotpink: "#FF69B4",
      indianred: "#CD5C5C",
      indigo: "#4B0082",
      ivory: "#FFFFF0",
      khaki: "#F0E68C",
      lavender: "#E6E6FA",
      lavenderblush: "#FFF0F5",
      lawngreen: "#7CFC00",
      lemonchiffon: "#FFFACD",
      lightblue: "#ADD8E6",
      lightcoral: "#F08080",
      lightcyan: "#E0FFFF",
      lightgoldenrodyellow: "#FAFAD2",
      lightgray: "#D3D3D3",
      lightgreen: "#90EE90",
      lightgrey: "#D3D3D3",
      lightpink: "#FFB6C1",
      lightsalmon: "#FFA07A",
      lightseagreen: "#20B2AA",
      lightskyblue: "#87CEFA",
      lightslategray: "#778899",
      lightslategrey: "#778899",
      lightsteelblue: "#B0C4DE",
      lightyellow: "#FFFFE0",
      lime: "#00FF00",
      limegreen: "#32CD32",
      linen: "#FAF0E6",
      magenta: "#FF00FF",
      maroon: "#800000",
      mediumaquamarine: "#66CDAA",
      mediumblue: "#0000CD",
      mediumorchid: "#BA55D3",
      mediumpurple: "#9370DB",
      mediumseagreen: "#3CB371",
      mediumslateblue: "#7B68EE",
      mediumspringgreen: "#00FA9A",
      mediumturquoise: "#48D1CC",
      mediumvioletred: "#C71585",
      midnightblue: "#191970",
      mintcream: "#F5FFFA",
      mistyrose: "#FFE4E1",
      moccasin: "#FFE4B5",
      navajowhite: "#FFDEAD",
      navy: "#000080",
      oldlace: "#FDF5E6",
      olive: "#808000",
      olivedrab: "#6B8E23",
      orange: "#FFA500",
      orangered: "#FF4500",
      orchid: "#DA70D6",
      palegoldenrod: "#EEE8AA",
      palegreen: "#98FB98",
      paleturquoise: "#AFEEEE",
      palevioletred: "#DB7093",
      papayawhip: "#FFEFD5",
      peachpuff: "#FFDAB9",
      peru: "#CD853F",
      pink: "#FFC0CB",
      plum: "#DDA0DD",
      powderblue: "#B0E0E6",
      purple: "#800080",
      rebeccapurple: "#663399",
      red: "#FF0000",
      rosybrown: "#BC8F8F",
      royalblue: "#4169E1",
      saddlebrown: "#8B4513",
      salmon: "#FA8072",
      sandybrown: "#F4A460",
      seagreen: "#2E8B57",
      seashell: "#FFF5EE",
      sienna: "#A0522D",
      silver: "#C0C0C0",
      skyblue: "#87CEEB",
      slateblue: "#6A5ACD",
      slategray: "#708090",
      slategrey: "#708090",
      snow: "#FFFAFA",
      springgreen: "#00FF7F",
      steelblue: "#4682B4",
      tan: "#D2B48C",
      teal: "#008080",
      thistle: "#D8BFD8",
      tomato: "#FF6347",
      turquoise: "#40E0D0",
      violet: "#EE82EE",
      wheat: "#F5DEB3",
      white: "#FFFFFF",
      whitesmoke: "#F5F5F5",
      yellow: "#FFFF00",
      yellowgreen: "#9ACD32",
    };
    function AF(e) {
      let t,
        r,
        n,
        i = 1,
        o = e.replace(/\s/g, "").toLowerCase(),
        a = (typeof _h[o] == "string" ? _h[o].toLowerCase() : null) || o;
      if (a.startsWith("#")) {
        let u = a.substring(1);
        u.length === 3 || u.length === 4
          ? ((t = parseInt(u[0] + u[0], 16)),
            (r = parseInt(u[1] + u[1], 16)),
            (n = parseInt(u[2] + u[2], 16)),
            u.length === 4 && (i = parseInt(u[3] + u[3], 16) / 255))
          : (u.length === 6 || u.length === 8) &&
            ((t = parseInt(u.substring(0, 2), 16)),
            (r = parseInt(u.substring(2, 4), 16)),
            (n = parseInt(u.substring(4, 6), 16)),
            u.length === 8 && (i = parseInt(u.substring(6, 8), 16) / 255));
      } else if (a.startsWith("rgba")) {
        let u = a.match(/rgba\(([^)]+)\)/)[1].split(",");
        (t = parseInt(u[0], 10)),
          (r = parseInt(u[1], 10)),
          (n = parseInt(u[2], 10)),
          (i = parseFloat(u[3]));
      } else if (a.startsWith("rgb")) {
        let u = a.match(/rgb\(([^)]+)\)/)[1].split(",");
        (t = parseInt(u[0], 10)),
          (r = parseInt(u[1], 10)),
          (n = parseInt(u[2], 10));
      } else if (a.startsWith("hsla")) {
        let u = a.match(/hsla\(([^)]+)\)/)[1].split(","),
          l = parseFloat(u[0]),
          g = parseFloat(u[1].replace("%", "")) / 100,
          d = parseFloat(u[2].replace("%", "")) / 100;
        i = parseFloat(u[3]);
        let p = (1 - Math.abs(2 * d - 1)) * g,
          h = p * (1 - Math.abs(((l / 60) % 2) - 1)),
          b = d - p / 2,
          _,
          w,
          m;
        l >= 0 && l < 60
          ? ((_ = p), (w = h), (m = 0))
          : l >= 60 && l < 120
          ? ((_ = h), (w = p), (m = 0))
          : l >= 120 && l < 180
          ? ((_ = 0), (w = p), (m = h))
          : l >= 180 && l < 240
          ? ((_ = 0), (w = h), (m = p))
          : l >= 240 && l < 300
          ? ((_ = h), (w = 0), (m = p))
          : ((_ = p), (w = 0), (m = h)),
          (t = Math.round((_ + b) * 255)),
          (r = Math.round((w + b) * 255)),
          (n = Math.round((m + b) * 255));
      } else if (a.startsWith("hsl")) {
        let u = a.match(/hsl\(([^)]+)\)/)[1].split(","),
          l = parseFloat(u[0]),
          g = parseFloat(u[1].replace("%", "")) / 100,
          d = parseFloat(u[2].replace("%", "")) / 100,
          p = (1 - Math.abs(2 * d - 1)) * g,
          h = p * (1 - Math.abs(((l / 60) % 2) - 1)),
          b = d - p / 2,
          _,
          w,
          m;
        l >= 0 && l < 60
          ? ((_ = p), (w = h), (m = 0))
          : l >= 60 && l < 120
          ? ((_ = h), (w = p), (m = 0))
          : l >= 120 && l < 180
          ? ((_ = 0), (w = p), (m = h))
          : l >= 180 && l < 240
          ? ((_ = 0), (w = h), (m = p))
          : l >= 240 && l < 300
          ? ((_ = h), (w = 0), (m = p))
          : ((_ = p), (w = 0), (m = h)),
          (t = Math.round((_ + b) * 255)),
          (r = Math.round((w + b) * 255)),
          (n = Math.round((m + b) * 255));
      }
      if (Number.isNaN(t) || Number.isNaN(r) || Number.isNaN(n))
        throw new Error(
          `Invalid color in [ix2/shared/utils/normalizeColor.js] '${e}'`
        );
      return { red: t, green: r, blue: n, alpha: i };
    }
  });
  var bh = c((Se) => {
    "use strict";
    Object.defineProperty(Se, "__esModule", { value: !0 });
    Se.renderPlugin =
      Se.getPluginOrigin =
      Se.getPluginDuration =
      Se.getPluginDestination =
      Se.getPluginConfig =
      Se.createPluginInstance =
      Se.clearPlugin =
        void 0;
    var SF = xa(),
      xF = (e, t) => e.value[t];
    Se.getPluginConfig = xF;
    var CF = () => null;
    Se.getPluginDuration = CF;
    var RF = (e, t) => {
      if (e) return e;
      let r = t.config.value,
        n = t.config.target.objectId,
        i = getComputedStyle(document.documentElement).getPropertyValue(n);
      if (r.size != null) return { size: parseInt(i, 10) };
      if (r.red != null && r.green != null && r.blue != null)
        return (0, SF.normalizeColor)(i);
    };
    Se.getPluginOrigin = RF;
    var LF = (e) => e.value;
    Se.getPluginDestination = LF;
    var NF = () => null;
    Se.createPluginInstance = NF;
    var PF = (e, t, r) => {
      let n = r.config.target.objectId,
        i = r.config.value.unit,
        { PLUGIN_VARIABLE: o } = t,
        { size: s, red: a, green: u, blue: l, alpha: g } = o,
        d;
      s != null && (d = s + i),
        a != null &&
          l != null &&
          u != null &&
          g != null &&
          (d = `rgba(${a}, ${u}, ${l}, ${g})`),
        d != null && document.documentElement.style.setProperty(n, d);
    };
    Se.renderPlugin = PF;
    var qF = (e, t) => {
      let r = t.config.target.objectId;
      document.documentElement.style.removeProperty(r);
    };
    Se.clearPlugin = qF;
  });
  var Th = c((ei) => {
    "use strict";
    var Ra = fn().default;
    Object.defineProperty(ei, "__esModule", { value: !0 });
    ei.pluginMethodMap = void 0;
    var Ca = (ke(), et(xf)),
      FF = Ra(yh()),
      MF = Ra(mh()),
      DF = Ra(bh()),
      vX = (ei.pluginMethodMap = new Map([
        [Ca.ActionTypeConsts.PLUGIN_LOTTIE, { ...FF }],
        [Ca.ActionTypeConsts.PLUGIN_SPLINE, { ...MF }],
        [Ca.ActionTypeConsts.PLUGIN_VARIABLE, { ...DF }],
      ]));
  });
  var Ih = {};
  Me(Ih, {
    clearPlugin: () => Ma,
    createPluginInstance: () => GF,
    getPluginConfig: () => Na,
    getPluginDestination: () => qa,
    getPluginDuration: () => kF,
    getPluginOrigin: () => Pa,
    isPluginType: () => Ft,
    renderPlugin: () => Fa,
  });
  function Ft(e) {
    return La.pluginMethodMap.has(e);
  }
  var La,
    Mt,
    Na,
    Pa,
    kF,
    qa,
    GF,
    Fa,
    Ma,
    Da = ye(() => {
      "use strict";
      Qn();
      La = ce(Th());
      (Mt = (e) => (t) => {
        if (!Qe) return () => null;
        let r = La.pluginMethodMap.get(t);
        if (!r) throw new Error(`IX2 no plugin configured for: ${t}`);
        let n = r[e];
        if (!n) throw new Error(`IX2 invalid plugin method: ${e}`);
        return n;
      }),
        (Na = Mt("getPluginConfig")),
        (Pa = Mt("getPluginOrigin")),
        (kF = Mt("getPluginDuration")),
        (qa = Mt("getPluginDestination")),
        (GF = Mt("createPluginInstance")),
        (Fa = Mt("renderPlugin")),
        (Ma = Mt("clearPlugin"));
    });
  var Oh = c((EX, wh) => {
    function VF(e, t) {
      return e == null || e !== e ? t : e;
    }
    wh.exports = VF;
  });
  var Sh = c((mX, Ah) => {
    function UF(e, t, r, n) {
      var i = -1,
        o = e == null ? 0 : e.length;
      for (n && o && (r = e[++i]); ++i < o; ) r = t(r, e[i], i, e);
      return r;
    }
    Ah.exports = UF;
  });
  var Ch = c((_X, xh) => {
    function BF(e) {
      return function (t, r, n) {
        for (var i = -1, o = Object(t), s = n(t), a = s.length; a--; ) {
          var u = s[e ? a : ++i];
          if (r(o[u], u, o) === !1) break;
        }
        return t;
      };
    }
    xh.exports = BF;
  });
  var Lh = c((bX, Rh) => {
    var HF = Ch(),
      WF = HF();
    Rh.exports = WF;
  });
  var ka = c((TX, Nh) => {
    var XF = Lh(),
      jF = kr();
    function zF(e, t) {
      return e && XF(e, t, jF);
    }
    Nh.exports = zF;
  });
  var qh = c((IX, Ph) => {
    var KF = Pt();
    function YF(e, t) {
      return function (r, n) {
        if (r == null) return r;
        if (!KF(r)) return e(r, n);
        for (
          var i = r.length, o = t ? i : -1, s = Object(r);
          (t ? o-- : ++o < i) && n(s[o], o, s) !== !1;

        );
        return r;
      };
    }
    Ph.exports = YF;
  });
  var Ga = c((wX, Fh) => {
    var $F = ka(),
      QF = qh(),
      ZF = QF($F);
    Fh.exports = ZF;
  });
  var Dh = c((OX, Mh) => {
    function JF(e, t, r, n, i) {
      return (
        i(e, function (o, s, a) {
          r = n ? ((n = !1), o) : t(r, o, s, a);
        }),
        r
      );
    }
    Mh.exports = JF;
  });
  var Gh = c((AX, kh) => {
    var eM = Sh(),
      tM = Ga(),
      rM = It(),
      nM = Dh(),
      iM = we();
    function oM(e, t, r) {
      var n = iM(e) ? eM : nM,
        i = arguments.length < 3;
      return n(e, rM(t, 4), r, i, tM);
    }
    kh.exports = oM;
  });
  var Uh = c((SX, Vh) => {
    var aM = ma(),
      sM = It(),
      uM = _a(),
      cM = Math.max,
      lM = Math.min;
    function fM(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var i = n - 1;
      return (
        r !== void 0 &&
          ((i = uM(r)), (i = r < 0 ? cM(n + i, 0) : lM(i, n - 1))),
        aM(e, sM(t, 3), i, !0)
      );
    }
    Vh.exports = fM;
  });
  var Hh = c((xX, Bh) => {
    var dM = Ea(),
      pM = Uh(),
      gM = dM(pM);
    Bh.exports = gM;
  });
  function Wh(e, t) {
    return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
  }
  function vM(e, t) {
    if (Wh(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    let r = Object.keys(e),
      n = Object.keys(t);
    if (r.length !== n.length) return !1;
    for (let i = 0; i < r.length; i++)
      if (!Object.hasOwn(t, r[i]) || !Wh(e[r[i]], t[r[i]])) return !1;
    return !0;
  }
  var Va,
    Xh = ye(() => {
      "use strict";
      Va = vM;
    });
  var cy = {};
  Me(cy, {
    cleanupHTMLElement: () => dD,
    clearAllStyles: () => fD,
    clearObjectCache: () => NM,
    getActionListProgress: () => gD,
    getAffectedElements: () => Xa,
    getComputedStyle: () => VM,
    getDestinationValues: () => zM,
    getElementId: () => MM,
    getInstanceId: () => qM,
    getInstanceOrigin: () => HM,
    getItemConfigByKey: () => jM,
    getMaxDurationItemIndex: () => uy,
    getNamespacedParameterId: () => yD,
    getRenderType: () => oy,
    getStyleProp: () => KM,
    mediaQueriesEqual: () => mD,
    observeStore: () => GM,
    reduceListToGroup: () => vD,
    reifyState: () => DM,
    renderHTMLElement: () => YM,
    shallowEqual: () => Va,
    shouldAllowMediaQuery: () => ED,
    shouldNamespaceEventParameter: () => hD,
    stringifyTarget: () => _D,
  });
  function NM() {
    ti.clear();
  }
  function qM() {
    return "i" + PM++;
  }
  function MM(e, t) {
    for (let r in e) {
      let n = e[r];
      if (n && n.ref === t) return n.id;
    }
    return "e" + FM++;
  }
  function DM({ events: e, actionLists: t, site: r } = {}) {
    let n = (0, oi.default)(
        e,
        (s, a) => {
          let { eventTypeId: u } = a;
          return s[u] || (s[u] = {}), (s[u][a.id] = a), s;
        },
        {}
      ),
      i = r && r.mediaQueries,
      o = [];
    return (
      i
        ? (o = i.map((s) => s.key))
        : ((i = []), console.warn("IX2 missing mediaQueries in site data")),
      {
        ixData: {
          events: e,
          actionLists: t,
          eventTypeMap: n,
          mediaQueries: i,
          mediaQueryKeys: o,
        },
      }
    );
  }
  function GM({ store: e, select: t, onChange: r, comparator: n = kM }) {
    let { getState: i, subscribe: o } = e,
      s = o(u),
      a = t(i());
    function u() {
      let l = t(i());
      if (l == null) {
        s();
        return;
      }
      n(l, a) || ((a = l), r(a, e));
    }
    return s;
  }
  function Kh(e) {
    let t = typeof e;
    if (t === "string") return { id: e };
    if (e != null && t === "object") {
      let {
        id: r,
        objectId: n,
        selector: i,
        selectorGuids: o,
        appliesTo: s,
        useEventTarget: a,
      } = e;
      return {
        id: r,
        objectId: n,
        selector: i,
        selectorGuids: o,
        appliesTo: s,
        useEventTarget: a,
      };
    }
    return {};
  }
  function Xa({
    config: e,
    event: t,
    eventTarget: r,
    elementRoot: n,
    elementApi: i,
  }) {
    if (!i) throw new Error("IX2 missing elementApi");
    let { targets: o } = e;
    if (Array.isArray(o) && o.length > 0)
      return o.reduce(
        (x, v) =>
          x.concat(
            Xa({
              config: { target: v },
              event: t,
              eventTarget: r,
              elementRoot: n,
              elementApi: i,
            })
          ),
        []
      );
    let {
        getValidDocument: s,
        getQuerySelector: a,
        queryDocument: u,
        getChildElements: l,
        getSiblingElements: g,
        matchSelector: d,
        elementContains: p,
        isSiblingNode: h,
      } = i,
      { target: b } = e;
    if (!b) return [];
    let {
      id: _,
      objectId: w,
      selector: m,
      selectorGuids: C,
      appliesTo: O,
      useEventTarget: N,
    } = Kh(b);
    if (w) return [ti.has(w) ? ti.get(w) : ti.set(w, {}).get(w)];
    if (O === Wo.PAGE) {
      let x = s(_);
      return x ? [x] : [];
    }
    let L = (t?.action?.config?.affectedElements ?? {})[_ || m] || {},
      H = !!(L.id || L.selector),
      X,
      z,
      Z,
      k = t && a(Kh(t.target));
    if (
      (H
        ? ((X = L.limitAffectedElements), (z = k), (Z = a(L)))
        : (z = Z = a({ id: _, selector: m, selectorGuids: C })),
      t && N)
    ) {
      let x = r && (Z || N === !0) ? [r] : u(k);
      if (Z) {
        if (N === CM) return u(Z).filter((v) => x.some((R) => p(v, R)));
        if (N === jh) return u(Z).filter((v) => x.some((R) => p(R, v)));
        if (N === zh) return u(Z).filter((v) => x.some((R) => h(R, v)));
      }
      return x;
    }
    return z == null || Z == null
      ? []
      : Qe && n
      ? u(Z).filter((x) => n.contains(x))
      : X === jh
      ? u(z, Z)
      : X === xM
      ? l(u(z)).filter(d(Z))
      : X === zh
      ? g(u(z)).filter(d(Z))
      : u(Z);
  }
  function VM({ element: e, actionItem: t }) {
    if (!Qe) return {};
    let { actionTypeId: r } = t;
    switch (r) {
      case ur:
      case cr:
      case lr:
      case fr:
      case si:
        return window.getComputedStyle(e);
      default:
        return {};
    }
  }
  function HM(e, t = {}, r = {}, n, i) {
    let { getStyle: o } = i,
      { actionTypeId: s } = n;
    if (Ft(s)) return Pa(s)(t[s], n);
    switch (n.actionTypeId) {
      case or:
      case ar:
      case sr:
      case Kr:
        return t[n.actionTypeId] || ja[n.actionTypeId];
      case Yr:
        return UM(t[n.actionTypeId], n.config.filters);
      case $r:
        return BM(t[n.actionTypeId], n.config.fontVariations);
      case ry:
        return { value: (0, gt.default)(parseFloat(o(e, ni)), 1) };
      case ur: {
        let a = o(e, at),
          u = o(e, st),
          l,
          g;
        return (
          n.config.widthUnit === Ot
            ? (l = Yh.test(a) ? parseFloat(a) : parseFloat(r.width))
            : (l = (0, gt.default)(parseFloat(a), parseFloat(r.width))),
          n.config.heightUnit === Ot
            ? (g = Yh.test(u) ? parseFloat(u) : parseFloat(r.height))
            : (g = (0, gt.default)(parseFloat(u), parseFloat(r.height))),
          { widthValue: l, heightValue: g }
        );
      }
      case cr:
      case lr:
      case fr:
        return uD({
          element: e,
          actionTypeId: n.actionTypeId,
          computedStyle: r,
          getStyle: o,
        });
      case si:
        return { value: (0, gt.default)(o(e, ii), r.display) };
      case LM:
        return t[n.actionTypeId] || { value: 0 };
      default:
        return;
    }
  }
  function zM({ element: e, actionItem: t, elementApi: r }) {
    if (Ft(t.actionTypeId)) return qa(t.actionTypeId)(t.config);
    switch (t.actionTypeId) {
      case or:
      case ar:
      case sr:
      case Kr: {
        let { xValue: n, yValue: i, zValue: o } = t.config;
        return { xValue: n, yValue: i, zValue: o };
      }
      case ur: {
        let { getStyle: n, setStyle: i, getProperty: o } = r,
          { widthUnit: s, heightUnit: a } = t.config,
          { widthValue: u, heightValue: l } = t.config;
        if (!Qe) return { widthValue: u, heightValue: l };
        if (s === Ot) {
          let g = n(e, at);
          i(e, at, ""), (u = o(e, "offsetWidth")), i(e, at, g);
        }
        if (a === Ot) {
          let g = n(e, st);
          i(e, st, ""), (l = o(e, "offsetHeight")), i(e, st, g);
        }
        return { widthValue: u, heightValue: l };
      }
      case cr:
      case lr:
      case fr: {
        let {
          rValue: n,
          gValue: i,
          bValue: o,
          aValue: s,
          globalSwatchId: a,
        } = t.config;
        if (a && a.startsWith("--")) {
          let { getStyle: u } = r,
            l = u(e, a),
            g = (0, Zh.normalizeColor)(l);
          return {
            rValue: g.red,
            gValue: g.green,
            bValue: g.blue,
            aValue: g.alpha,
          };
        }
        return { rValue: n, gValue: i, bValue: o, aValue: s };
      }
      case Yr:
        return t.config.filters.reduce(WM, {});
      case $r:
        return t.config.fontVariations.reduce(XM, {});
      default: {
        let { value: n } = t.config;
        return { value: n };
      }
    }
  }
  function oy(e) {
    if (/^TRANSFORM_/.test(e)) return ey;
    if (/^STYLE_/.test(e)) return Ha;
    if (/^GENERAL_/.test(e)) return Ba;
    if (/^PLUGIN_/.test(e)) return ty;
  }
  function KM(e, t) {
    return e === Ha ? t.replace("STYLE_", "").toLowerCase() : null;
  }
  function YM(e, t, r, n, i, o, s, a, u) {
    switch (a) {
      case ey:
        return eD(e, t, r, i, s);
      case Ha:
        return cD(e, t, r, i, o, s);
      case Ba:
        return lD(e, i, s);
      case ty: {
        let { actionTypeId: l } = i;
        if (Ft(l)) return Fa(l)(u, t, i);
      }
    }
  }
  function eD(e, t, r, n, i) {
    let o = JM.map((a) => {
        let u = ja[a],
          {
            xValue: l = u.xValue,
            yValue: g = u.yValue,
            zValue: d = u.zValue,
            xUnit: p = "",
            yUnit: h = "",
            zUnit: b = "",
          } = t[a] || {};
        switch (a) {
          case or:
            return `${EM}(${l}${p}, ${g}${h}, ${d}${b})`;
          case ar:
            return `${mM}(${l}${p}, ${g}${h}, ${d}${b})`;
          case sr:
            return `${_M}(${l}${p}) ${bM}(${g}${h}) ${TM}(${d}${b})`;
          case Kr:
            return `${IM}(${l}${p}, ${g}${h})`;
          default:
            return "";
        }
      }).join(" "),
      { setStyle: s } = i;
    Dt(e, wt, i), s(e, wt, o), nD(n, r) && s(e, $n, wM);
  }
  function tD(e, t, r, n) {
    let i = (0, oi.default)(t, (s, a, u) => `${s} ${u}(${a}${ZM(u, r)})`, ""),
      { setStyle: o } = n;
    Dt(e, Xr, n), o(e, Xr, i);
  }
  function rD(e, t, r, n) {
    let i = (0, oi.default)(
        t,
        (s, a, u) => (s.push(`"${u}" ${a}`), s),
        []
      ).join(", "),
      { setStyle: o } = n;
    Dt(e, jr, n), o(e, jr, i);
  }
  function nD({ actionTypeId: e }, { xValue: t, yValue: r, zValue: n }) {
    return (
      (e === or && n !== void 0) ||
      (e === ar && n !== void 0) ||
      (e === sr && (t !== void 0 || r !== void 0))
    );
  }
  function sD(e, t) {
    let r = e.exec(t);
    return r ? r[1] : "";
  }
  function uD({ element: e, actionTypeId: t, computedStyle: r, getStyle: n }) {
    let i = Wa[t],
      o = n(e, i),
      s = oD.test(o) ? o : r[i],
      a = sD(aD, s).split(zr);
    return {
      rValue: (0, gt.default)(parseInt(a[0], 10), 255),
      gValue: (0, gt.default)(parseInt(a[1], 10), 255),
      bValue: (0, gt.default)(parseInt(a[2], 10), 255),
      aValue: (0, gt.default)(parseFloat(a[3]), 1),
    };
  }
  function cD(e, t, r, n, i, o) {
    let { setStyle: s } = o;
    switch (n.actionTypeId) {
      case ur: {
        let { widthUnit: a = "", heightUnit: u = "" } = n.config,
          { widthValue: l, heightValue: g } = r;
        l !== void 0 && (a === Ot && (a = "px"), Dt(e, at, o), s(e, at, l + a)),
          g !== void 0 &&
            (u === Ot && (u = "px"), Dt(e, st, o), s(e, st, g + u));
        break;
      }
      case Yr: {
        tD(e, r, n.config, o);
        break;
      }
      case $r: {
        rD(e, r, n.config, o);
        break;
      }
      case cr:
      case lr:
      case fr: {
        let a = Wa[n.actionTypeId],
          u = Math.round(r.rValue),
          l = Math.round(r.gValue),
          g = Math.round(r.bValue),
          d = r.aValue;
        Dt(e, a, o),
          s(e, a, d >= 1 ? `rgb(${u},${l},${g})` : `rgba(${u},${l},${g},${d})`);
        break;
      }
      default: {
        let { unit: a = "" } = n.config;
        Dt(e, i, o), s(e, i, r.value + a);
        break;
      }
    }
  }
  function lD(e, t, r) {
    let { setStyle: n } = r;
    switch (t.actionTypeId) {
      case si: {
        let { value: i } = t.config;
        i === OM && Qe ? n(e, ii, Ta) : n(e, ii, i);
        return;
      }
    }
  }
  function Dt(e, t, r) {
    if (!Qe) return;
    let n = iy[t];
    if (!n) return;
    let { getStyle: i, setStyle: o } = r,
      s = i(e, ir);
    if (!s) {
      o(e, ir, n);
      return;
    }
    let a = s.split(zr).map(ny);
    a.indexOf(n) === -1 && o(e, ir, a.concat(n).join(zr));
  }
  function ay(e, t, r) {
    if (!Qe) return;
    let n = iy[t];
    if (!n) return;
    let { getStyle: i, setStyle: o } = r,
      s = i(e, ir);
    !s ||
      s.indexOf(n) === -1 ||
      o(
        e,
        ir,
        s
          .split(zr)
          .map(ny)
          .filter((a) => a !== n)
          .join(zr)
      );
  }
  function fD({ store: e, elementApi: t }) {
    let { ixData: r } = e.getState(),
      { events: n = {}, actionLists: i = {} } = r;
    Object.keys(n).forEach((o) => {
      let s = n[o],
        { config: a } = s.action,
        { actionListId: u } = a,
        l = i[u];
      l && $h({ actionList: l, event: s, elementApi: t });
    }),
      Object.keys(i).forEach((o) => {
        $h({ actionList: i[o], elementApi: t });
      });
  }
  function $h({ actionList: e = {}, event: t, elementApi: r }) {
    let { actionItemGroups: n, continuousParameterGroups: i } = e;
    n &&
      n.forEach((o) => {
        Qh({ actionGroup: o, event: t, elementApi: r });
      }),
      i &&
        i.forEach((o) => {
          let { continuousActionGroups: s } = o;
          s.forEach((a) => {
            Qh({ actionGroup: a, event: t, elementApi: r });
          });
        });
  }
  function Qh({ actionGroup: e, event: t, elementApi: r }) {
    let { actionItems: n } = e;
    n.forEach((i) => {
      let { actionTypeId: o, config: s } = i,
        a;
      Ft(o)
        ? (a = (u) => Ma(o)(u, i))
        : (a = sy({ effect: pD, actionTypeId: o, elementApi: r })),
        Xa({ config: s, event: t, elementApi: r }).forEach(a);
    });
  }
  function dD(e, t, r) {
    let { setStyle: n, getStyle: i } = r,
      { actionTypeId: o } = t;
    if (o === ur) {
      let { config: s } = t;
      s.widthUnit === Ot && n(e, at, ""), s.heightUnit === Ot && n(e, st, "");
    }
    i(e, ir) && sy({ effect: ay, actionTypeId: o, elementApi: r })(e);
  }
  function pD(e, t, r) {
    let { setStyle: n } = r;
    ay(e, t, r), n(e, t, ""), t === wt && n(e, $n, "");
  }
  function uy(e) {
    let t = 0,
      r = 0;
    return (
      e.forEach((n, i) => {
        let { config: o } = n,
          s = o.delay + o.duration;
        s >= t && ((t = s), (r = i));
      }),
      r
    );
  }
  function gD(e, t) {
    let { actionItemGroups: r, useFirstGroupAsInitialState: n } = e,
      { actionItem: i, verboseTimeElapsed: o = 0 } = t,
      s = 0,
      a = 0;
    return (
      r.forEach((u, l) => {
        if (n && l === 0) return;
        let { actionItems: g } = u,
          d = g[uy(g)],
          { config: p, actionTypeId: h } = d;
        i.id === d.id && (a = s + o);
        let b = oy(h) === Ba ? 0 : p.duration;
        s += p.delay + b;
      }),
      s > 0 ? Wr(a / s) : 0
    );
  }
  function vD({ actionList: e, actionItemId: t, rawData: r }) {
    let { actionItemGroups: n, continuousParameterGroups: i } = e,
      o = [],
      s = (a) => (
        o.push((0, ai.mergeIn)(a, ["config"], { delay: 0, duration: 0 })),
        a.id === t
      );
    return (
      n && n.some(({ actionItems: a }) => a.some(s)),
      i &&
        i.some((a) => {
          let { continuousActionGroups: u } = a;
          return u.some(({ actionItems: l }) => l.some(s));
        }),
      (0, ai.setIn)(r, ["actionLists"], {
        [e.id]: { id: e.id, actionItemGroups: [{ actionItems: o }] },
      })
    );
  }
  function hD(e, { basedOn: t }) {
    return (
      (e === $e.SCROLLING_IN_VIEW && (t === it.ELEMENT || t == null)) ||
      (e === $e.MOUSE_MOVE && t === it.ELEMENT)
    );
  }
  function yD(e, t) {
    return e + RM + t;
  }
  function ED(e, t) {
    return t == null ? !0 : e.indexOf(t) !== -1;
  }
  function mD(e, t) {
    return Va(e && e.sort(), t && t.sort());
  }
  function _D(e) {
    if (typeof e == "string") return e;
    if (e.pluginElement && e.objectId) return e.pluginElement + Ua + e.objectId;
    if (e.objectId) return e.objectId;
    let { id: t = "", selector: r = "", useEventTarget: n = "" } = e;
    return t + Ua + r + Ua + n;
  }
  var gt,
    oi,
    ri,
    ai,
    Zh,
    hM,
    yM,
    EM,
    mM,
    _M,
    bM,
    TM,
    IM,
    wM,
    OM,
    ni,
    Xr,
    jr,
    at,
    st,
    Jh,
    AM,
    SM,
    jh,
    xM,
    zh,
    CM,
    ii,
    ir,
    Ot,
    zr,
    RM,
    Ua,
    ey,
    Ba,
    Ha,
    ty,
    or,
    ar,
    sr,
    Kr,
    ry,
    Yr,
    $r,
    ur,
    cr,
    lr,
    fr,
    si,
    LM,
    ny,
    Wa,
    iy,
    ti,
    PM,
    FM,
    kM,
    Yh,
    UM,
    BM,
    WM,
    XM,
    jM,
    ja,
    $M,
    QM,
    ZM,
    JM,
    iD,
    oD,
    aD,
    sy,
    ly = ye(() => {
      "use strict";
      (gt = ce(Oh())), (oi = ce(Gh())), (ri = ce(Hh())), (ai = ce(Kt()));
      ke();
      Xh();
      Oa();
      Zh = ce(xa());
      Da();
      Qn();
      ({
        BACKGROUND: hM,
        TRANSFORM: yM,
        TRANSLATE_3D: EM,
        SCALE_3D: mM,
        ROTATE_X: _M,
        ROTATE_Y: bM,
        ROTATE_Z: TM,
        SKEW: IM,
        PRESERVE_3D: wM,
        FLEX: OM,
        OPACITY: ni,
        FILTER: Xr,
        FONT_VARIATION_SETTINGS: jr,
        WIDTH: at,
        HEIGHT: st,
        BACKGROUND_COLOR: Jh,
        BORDER_COLOR: AM,
        COLOR: SM,
        CHILDREN: jh,
        IMMEDIATE_CHILDREN: xM,
        SIBLINGS: zh,
        PARENT: CM,
        DISPLAY: ii,
        WILL_CHANGE: ir,
        AUTO: Ot,
        COMMA_DELIMITER: zr,
        COLON_DELIMITER: RM,
        BAR_DELIMITER: Ua,
        RENDER_TRANSFORM: ey,
        RENDER_GENERAL: Ba,
        RENDER_STYLE: Ha,
        RENDER_PLUGIN: ty,
      } = Ce),
        ({
          TRANSFORM_MOVE: or,
          TRANSFORM_SCALE: ar,
          TRANSFORM_ROTATE: sr,
          TRANSFORM_SKEW: Kr,
          STYLE_OPACITY: ry,
          STYLE_FILTER: Yr,
          STYLE_FONT_VARIATION: $r,
          STYLE_SIZE: ur,
          STYLE_BACKGROUND_COLOR: cr,
          STYLE_BORDER: lr,
          STYLE_TEXT_COLOR: fr,
          GENERAL_DISPLAY: si,
          OBJECT_VALUE: LM,
        } = De),
        (ny = (e) => e.trim()),
        (Wa = Object.freeze({ [cr]: Jh, [lr]: AM, [fr]: SM })),
        (iy = Object.freeze({
          [wt]: yM,
          [Jh]: hM,
          [ni]: ni,
          [Xr]: Xr,
          [at]: at,
          [st]: st,
          [jr]: jr,
        })),
        (ti = new Map());
      PM = 1;
      FM = 1;
      kM = (e, t) => e === t;
      (Yh = /px/),
        (UM = (e, t) =>
          t.reduce(
            (r, n) => (r[n.type] == null && (r[n.type] = $M[n.type]), r),
            e || {}
          )),
        (BM = (e, t) =>
          t.reduce(
            (r, n) => (
              r[n.type] == null &&
                (r[n.type] = QM[n.type] || n.defaultValue || 0),
              r
            ),
            e || {}
          ));
      (WM = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (XM = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (jM = (e, t, r) => {
          if (Ft(e)) return Na(e)(r, t);
          switch (e) {
            case Yr: {
              let n = (0, ri.default)(r.filters, ({ type: i }) => i === t);
              return n ? n.value : 0;
            }
            case $r: {
              let n = (0, ri.default)(
                r.fontVariations,
                ({ type: i }) => i === t
              );
              return n ? n.value : 0;
            }
            default:
              return r[t];
          }
        });
      (ja = {
        [or]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [ar]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
        [sr]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [Kr]: Object.freeze({ xValue: 0, yValue: 0 }),
      }),
        ($M = Object.freeze({
          blur: 0,
          "hue-rotate": 0,
          invert: 0,
          grayscale: 0,
          saturate: 100,
          sepia: 0,
          contrast: 100,
          brightness: 100,
        })),
        (QM = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 })),
        (ZM = (e, t) => {
          let r = (0, ri.default)(t.filters, ({ type: n }) => n === e);
          if (r && r.unit) return r.unit;
          switch (e) {
            case "blur":
              return "px";
            case "hue-rotate":
              return "deg";
            default:
              return "%";
          }
        }),
        (JM = Object.keys(ja));
      (iD = "\\(([^)]+)\\)"), (oD = /^rgb/), (aD = RegExp(`rgba?${iD}`));
      sy =
        ({ effect: e, actionTypeId: t, elementApi: r }) =>
        (n) => {
          switch (t) {
            case or:
            case ar:
            case sr:
            case Kr:
              e(n, wt, r);
              break;
            case Yr:
              e(n, Xr, r);
              break;
            case $r:
              e(n, jr, r);
              break;
            case ry:
              e(n, ni, r);
              break;
            case ur:
              e(n, at, r), e(n, st, r);
              break;
            case cr:
            case lr:
            case fr:
              e(n, Wa[t], r);
              break;
            case si:
              e(n, ii, r);
              break;
          }
        };
    });
  var kt = c((Pe) => {
    "use strict";
    var dr = fn().default;
    Object.defineProperty(Pe, "__esModule", { value: !0 });
    Pe.IX2VanillaUtils =
      Pe.IX2VanillaPlugins =
      Pe.IX2ElementsReducer =
      Pe.IX2Easings =
      Pe.IX2EasingUtils =
      Pe.IX2BrowserSupport =
        void 0;
    var bD = dr((Qn(), et(oh)));
    Pe.IX2BrowserSupport = bD;
    var TD = dr((wa(), et(Hr)));
    Pe.IX2Easings = TD;
    var ID = dr((Oa(), et(dh)));
    Pe.IX2EasingUtils = ID;
    var wD = dr((hh(), et(vh)));
    Pe.IX2ElementsReducer = wD;
    var OD = dr((Da(), et(Ih)));
    Pe.IX2VanillaPlugins = OD;
    var AD = dr((ly(), et(cy)));
    Pe.IX2VanillaUtils = AD;
  });
  var ci,
    vt,
    SD,
    xD,
    CD,
    RD,
    LD,
    ND,
    ui,
    fy,
    PD,
    qD,
    za,
    FD,
    MD,
    DD,
    kD,
    dy,
    py = ye(() => {
      "use strict";
      ke();
      (ci = ce(kt())),
        (vt = ce(Kt())),
        ({
          IX2_RAW_DATA_IMPORTED: SD,
          IX2_SESSION_STOPPED: xD,
          IX2_INSTANCE_ADDED: CD,
          IX2_INSTANCE_STARTED: RD,
          IX2_INSTANCE_REMOVED: LD,
          IX2_ANIMATION_FRAME_CHANGED: ND,
        } = Ie),
        ({
          optimizeFloat: ui,
          applyEasing: fy,
          createBezierEasing: PD,
        } = ci.IX2EasingUtils),
        ({ RENDER_GENERAL: qD } = Ce),
        ({
          getItemConfigByKey: za,
          getRenderType: FD,
          getStyleProp: MD,
        } = ci.IX2VanillaUtils),
        (DD = (e, t) => {
          let {
              position: r,
              parameterId: n,
              actionGroups: i,
              destinationKeys: o,
              smoothing: s,
              restingValue: a,
              actionTypeId: u,
              customEasingFn: l,
              skipMotion: g,
              skipToValue: d,
            } = e,
            { parameters: p } = t.payload,
            h = Math.max(1 - s, 0.01),
            b = p[n];
          b == null && ((h = 1), (b = a));
          let _ = Math.max(b, 0) || 0,
            w = ui(_ - r),
            m = g ? d : ui(r + w * h),
            C = m * 100;
          if (m === r && e.current) return e;
          let O, N, P, L;
          for (let X = 0, { length: z } = i; X < z; X++) {
            let { keyframe: Z, actionItems: k } = i[X];
            if ((X === 0 && (O = k[0]), C >= Z)) {
              O = k[0];
              let x = i[X + 1],
                v = x && C !== Z;
              (N = v ? x.actionItems[0] : null),
                v && ((P = Z / 100), (L = (x.keyframe - Z) / 100));
            }
          }
          let H = {};
          if (O && !N)
            for (let X = 0, { length: z } = o; X < z; X++) {
              let Z = o[X];
              H[Z] = za(u, Z, O.config);
            }
          else if (O && N && P !== void 0 && L !== void 0) {
            let X = (m - P) / L,
              z = O.config.easing,
              Z = fy(z, X, l);
            for (let k = 0, { length: x } = o; k < x; k++) {
              let v = o[k],
                R = za(u, v, O.config),
                J = (za(u, v, N.config) - R) * Z + R;
              H[v] = J;
            }
          }
          return (0, vt.merge)(e, { position: m, current: H });
        }),
        (kD = (e, t) => {
          let {
              active: r,
              origin: n,
              start: i,
              immediate: o,
              renderType: s,
              verbose: a,
              actionItem: u,
              destination: l,
              destinationKeys: g,
              pluginDuration: d,
              instanceDelay: p,
              customEasingFn: h,
              skipMotion: b,
            } = e,
            _ = u.config.easing,
            { duration: w, delay: m } = u.config;
          d != null && (w = d),
            (m = p ?? m),
            s === qD ? (w = 0) : (o || b) && (w = m = 0);
          let { now: C } = t.payload;
          if (r && n) {
            let O = C - (i + m);
            if (a) {
              let X = C - i,
                z = w + m,
                Z = ui(Math.min(Math.max(0, X / z), 1));
              e = (0, vt.set)(e, "verboseTimeElapsed", z * Z);
            }
            if (O < 0) return e;
            let N = ui(Math.min(Math.max(0, O / w), 1)),
              P = fy(_, N, h),
              L = {},
              H = null;
            return (
              g.length &&
                (H = g.reduce((X, z) => {
                  let Z = l[z],
                    k = parseFloat(n[z]) || 0,
                    v = (parseFloat(Z) - k) * P + k;
                  return (X[z] = v), X;
                }, {})),
              (L.current = H),
              (L.position = N),
              N === 1 && ((L.active = !1), (L.complete = !0)),
              (0, vt.merge)(e, L)
            );
          }
          return e;
        }),
        (dy = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case SD:
              return t.payload.ixInstances || Object.freeze({});
            case xD:
              return Object.freeze({});
            case CD: {
              let {
                  instanceId: r,
                  elementId: n,
                  actionItem: i,
                  eventId: o,
                  eventTarget: s,
                  eventStateKey: a,
                  actionListId: u,
                  groupIndex: l,
                  isCarrier: g,
                  origin: d,
                  destination: p,
                  immediate: h,
                  verbose: b,
                  continuous: _,
                  parameterId: w,
                  actionGroups: m,
                  smoothing: C,
                  restingValue: O,
                  pluginInstance: N,
                  pluginDuration: P,
                  instanceDelay: L,
                  skipMotion: H,
                  skipToValue: X,
                } = t.payload,
                { actionTypeId: z } = i,
                Z = FD(z),
                k = MD(Z, z),
                x = Object.keys(p).filter(
                  (R) => p[R] != null && typeof p[R] != "string"
                ),
                { easing: v } = i.config;
              return (0, vt.set)(e, r, {
                id: r,
                elementId: n,
                active: !1,
                position: 0,
                start: 0,
                origin: d,
                destination: p,
                destinationKeys: x,
                immediate: h,
                verbose: b,
                current: null,
                actionItem: i,
                actionTypeId: z,
                eventId: o,
                eventTarget: s,
                eventStateKey: a,
                actionListId: u,
                groupIndex: l,
                renderType: Z,
                isCarrier: g,
                styleProp: k,
                continuous: _,
                parameterId: w,
                actionGroups: m,
                smoothing: C,
                restingValue: O,
                pluginInstance: N,
                pluginDuration: P,
                instanceDelay: L,
                skipMotion: H,
                skipToValue: X,
                customEasingFn:
                  Array.isArray(v) && v.length === 4 ? PD(v) : void 0,
              });
            }
            case RD: {
              let { instanceId: r, time: n } = t.payload;
              return (0, vt.mergeIn)(e, [r], {
                active: !0,
                complete: !1,
                start: n,
              });
            }
            case LD: {
              let { instanceId: r } = t.payload;
              if (!e[r]) return e;
              let n = {},
                i = Object.keys(e),
                { length: o } = i;
              for (let s = 0; s < o; s++) {
                let a = i[s];
                a !== r && (n[a] = e[a]);
              }
              return n;
            }
            case ND: {
              let r = e,
                n = Object.keys(e),
                { length: i } = n;
              for (let o = 0; o < i; o++) {
                let s = n[o],
                  a = e[s],
                  u = a.continuous ? DD : kD;
                r = (0, vt.set)(r, s, u(a, t));
              }
              return r;
            }
            default:
              return e;
          }
        });
    });
  var GD,
    VD,
    UD,
    gy,
    vy = ye(() => {
      "use strict";
      ke();
      ({
        IX2_RAW_DATA_IMPORTED: GD,
        IX2_SESSION_STOPPED: VD,
        IX2_PARAMETER_CHANGED: UD,
      } = Ie),
        (gy = (e = {}, t) => {
          switch (t.type) {
            case GD:
              return t.payload.ixParameters || {};
            case VD:
              return {};
            case UD: {
              let { key: r, value: n } = t.payload;
              return (e[r] = n), e;
            }
            default:
              return e;
          }
        });
    });
  var Ey = {};
  Me(Ey, { default: () => HD });
  var hy,
    yy,
    BD,
    HD,
    my = ye(() => {
      "use strict";
      hy = ce(Ho());
      Rf();
      Qf();
      ed();
      yy = ce(kt());
      py();
      vy();
      ({ ixElements: BD } = yy.IX2ElementsReducer),
        (HD = (0, hy.combineReducers)({
          ixData: Cf,
          ixRequest: $f,
          ixSession: Jf,
          ixElements: BD,
          ixInstances: dy,
          ixParameters: gy,
        }));
    });
  var by = c((XX, _y) => {
    var WD = bt(),
      XD = we(),
      jD = dt(),
      zD = "[object String]";
    function KD(e) {
      return typeof e == "string" || (!XD(e) && jD(e) && WD(e) == zD);
    }
    _y.exports = KD;
  });
  var Iy = c((jX, Ty) => {
    var YD = ya(),
      $D = YD("length");
    Ty.exports = $D;
  });
  var Oy = c((zX, wy) => {
    var QD = "\\ud800-\\udfff",
      ZD = "\\u0300-\\u036f",
      JD = "\\ufe20-\\ufe2f",
      e1 = "\\u20d0-\\u20ff",
      t1 = ZD + JD + e1,
      r1 = "\\ufe0e\\ufe0f",
      n1 = "\\u200d",
      i1 = RegExp("[" + n1 + QD + t1 + r1 + "]");
    function o1(e) {
      return i1.test(e);
    }
    wy.exports = o1;
  });
  var qy = c((KX, Py) => {
    var Sy = "\\ud800-\\udfff",
      a1 = "\\u0300-\\u036f",
      s1 = "\\ufe20-\\ufe2f",
      u1 = "\\u20d0-\\u20ff",
      c1 = a1 + s1 + u1,
      l1 = "\\ufe0e\\ufe0f",
      f1 = "[" + Sy + "]",
      Ka = "[" + c1 + "]",
      Ya = "\\ud83c[\\udffb-\\udfff]",
      d1 = "(?:" + Ka + "|" + Ya + ")",
      xy = "[^" + Sy + "]",
      Cy = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      Ry = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      p1 = "\\u200d",
      Ly = d1 + "?",
      Ny = "[" + l1 + "]?",
      g1 = "(?:" + p1 + "(?:" + [xy, Cy, Ry].join("|") + ")" + Ny + Ly + ")*",
      v1 = Ny + Ly + g1,
      h1 = "(?:" + [xy + Ka + "?", Ka, Cy, Ry, f1].join("|") + ")",
      Ay = RegExp(Ya + "(?=" + Ya + ")|" + h1 + v1, "g");
    function y1(e) {
      for (var t = (Ay.lastIndex = 0); Ay.test(e); ) ++t;
      return t;
    }
    Py.exports = y1;
  });
  var My = c((YX, Fy) => {
    var E1 = Iy(),
      m1 = Oy(),
      _1 = qy();
    function b1(e) {
      return m1(e) ? _1(e) : E1(e);
    }
    Fy.exports = b1;
  });
  var ky = c(($X, Dy) => {
    var T1 = Un(),
      I1 = Bn(),
      w1 = Pt(),
      O1 = by(),
      A1 = My(),
      S1 = "[object Map]",
      x1 = "[object Set]";
    function C1(e) {
      if (e == null) return 0;
      if (w1(e)) return O1(e) ? A1(e) : e.length;
      var t = I1(e);
      return t == S1 || t == x1 ? e.size : T1(e).length;
    }
    Dy.exports = C1;
  });
  var Vy = c((QX, Gy) => {
    var R1 = "Expected a function";
    function L1(e) {
      if (typeof e != "function") throw new TypeError(R1);
      return function () {
        var t = arguments;
        switch (t.length) {
          case 0:
            return !e.call(this);
          case 1:
            return !e.call(this, t[0]);
          case 2:
            return !e.call(this, t[0], t[1]);
          case 3:
            return !e.call(this, t[0], t[1], t[2]);
        }
        return !e.apply(this, t);
      };
    }
    Gy.exports = L1;
  });
  var $a = c((ZX, Uy) => {
    var N1 = Tt(),
      P1 = (function () {
        try {
          var e = N1(Object, "defineProperty");
          return e({}, "", {}), e;
        } catch {}
      })();
    Uy.exports = P1;
  });
  var Qa = c((JX, Hy) => {
    var By = $a();
    function q1(e, t, r) {
      t == "__proto__" && By
        ? By(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 })
        : (e[t] = r);
    }
    Hy.exports = q1;
  });
  var Xy = c((ej, Wy) => {
    var F1 = Qa(),
      M1 = Ln(),
      D1 = Object.prototype,
      k1 = D1.hasOwnProperty;
    function G1(e, t, r) {
      var n = e[t];
      (!(k1.call(e, t) && M1(n, r)) || (r === void 0 && !(t in e))) &&
        F1(e, t, r);
    }
    Wy.exports = G1;
  });
  var Ky = c((tj, zy) => {
    var V1 = Xy(),
      U1 = Vr(),
      B1 = Dn(),
      jy = ot(),
      H1 = rr();
    function W1(e, t, r, n) {
      if (!jy(e)) return e;
      t = U1(t, e);
      for (var i = -1, o = t.length, s = o - 1, a = e; a != null && ++i < o; ) {
        var u = H1(t[i]),
          l = r;
        if (u === "__proto__" || u === "constructor" || u === "prototype")
          return e;
        if (i != s) {
          var g = a[u];
          (l = n ? n(g, u, a) : void 0),
            l === void 0 && (l = jy(g) ? g : B1(t[i + 1]) ? [] : {});
        }
        V1(a, u, l), (a = a[u]);
      }
      return e;
    }
    zy.exports = W1;
  });
  var $y = c((rj, Yy) => {
    var X1 = Xn(),
      j1 = Ky(),
      z1 = Vr();
    function K1(e, t, r) {
      for (var n = -1, i = t.length, o = {}; ++n < i; ) {
        var s = t[n],
          a = X1(e, s);
        r(a, s) && j1(o, z1(s, e), a);
      }
      return o;
    }
    Yy.exports = K1;
  });
  var Zy = c((nj, Qy) => {
    var Y1 = Fn(),
      $1 = Ro(),
      Q1 = ra(),
      Z1 = ta(),
      J1 = Object.getOwnPropertySymbols,
      e2 = J1
        ? function (e) {
            for (var t = []; e; ) Y1(t, Q1(e)), (e = $1(e));
            return t;
          }
        : Z1;
    Qy.exports = e2;
  });
  var eE = c((ij, Jy) => {
    function t2(e) {
      var t = [];
      if (e != null) for (var r in Object(e)) t.push(r);
      return t;
    }
    Jy.exports = t2;
  });
  var rE = c((oj, tE) => {
    var r2 = ot(),
      n2 = Vn(),
      i2 = eE(),
      o2 = Object.prototype,
      a2 = o2.hasOwnProperty;
    function s2(e) {
      if (!r2(e)) return i2(e);
      var t = n2(e),
        r = [];
      for (var n in e)
        (n == "constructor" && (t || !a2.call(e, n))) || r.push(n);
      return r;
    }
    tE.exports = s2;
  });
  var iE = c((aj, nE) => {
    var u2 = ia(),
      c2 = rE(),
      l2 = Pt();
    function f2(e) {
      return l2(e) ? u2(e, !0) : c2(e);
    }
    nE.exports = f2;
  });
  var aE = c((sj, oE) => {
    var d2 = ea(),
      p2 = Zy(),
      g2 = iE();
    function v2(e) {
      return d2(e, g2, p2);
    }
    oE.exports = v2;
  });
  var uE = c((uj, sE) => {
    var h2 = ha(),
      y2 = It(),
      E2 = $y(),
      m2 = aE();
    function _2(e, t) {
      if (e == null) return {};
      var r = h2(m2(e), function (n) {
        return [n];
      });
      return (
        (t = y2(t)),
        E2(e, r, function (n, i) {
          return t(n, i[0]);
        })
      );
    }
    sE.exports = _2;
  });
  var lE = c((cj, cE) => {
    var b2 = It(),
      T2 = Vy(),
      I2 = uE();
    function w2(e, t) {
      return I2(e, T2(b2(t)));
    }
    cE.exports = w2;
  });
  var dE = c((lj, fE) => {
    var O2 = Un(),
      A2 = Bn(),
      S2 = qr(),
      x2 = we(),
      C2 = Pt(),
      R2 = Mn(),
      L2 = Vn(),
      N2 = Gn(),
      P2 = "[object Map]",
      q2 = "[object Set]",
      F2 = Object.prototype,
      M2 = F2.hasOwnProperty;
    function D2(e) {
      if (e == null) return !0;
      if (
        C2(e) &&
        (x2(e) ||
          typeof e == "string" ||
          typeof e.splice == "function" ||
          R2(e) ||
          N2(e) ||
          S2(e))
      )
        return !e.length;
      var t = A2(e);
      if (t == P2 || t == q2) return !e.size;
      if (L2(e)) return !O2(e).length;
      for (var r in e) if (M2.call(e, r)) return !1;
      return !0;
    }
    fE.exports = D2;
  });
  var gE = c((fj, pE) => {
    var k2 = Qa(),
      G2 = ka(),
      V2 = It();
    function U2(e, t) {
      var r = {};
      return (
        (t = V2(t, 3)),
        G2(e, function (n, i, o) {
          k2(r, i, t(n, i, o));
        }),
        r
      );
    }
    pE.exports = U2;
  });
  var hE = c((dj, vE) => {
    function B2(e, t) {
      for (
        var r = -1, n = e == null ? 0 : e.length;
        ++r < n && t(e[r], r, e) !== !1;

      );
      return e;
    }
    vE.exports = B2;
  });
  var EE = c((pj, yE) => {
    var H2 = zn();
    function W2(e) {
      return typeof e == "function" ? e : H2;
    }
    yE.exports = W2;
  });
  var _E = c((gj, mE) => {
    var X2 = hE(),
      j2 = Ga(),
      z2 = EE(),
      K2 = we();
    function Y2(e, t) {
      var r = K2(e) ? X2 : j2;
      return r(e, z2(t));
    }
    mE.exports = Y2;
  });
  var TE = c((vj, bE) => {
    var $2 = Ye(),
      Q2 = function () {
        return $2.Date.now();
      };
    bE.exports = Q2;
  });
  var OE = c((hj, wE) => {
    var Z2 = ot(),
      Za = TE(),
      IE = Kn(),
      J2 = "Expected a function",
      ek = Math.max,
      tk = Math.min;
    function rk(e, t, r) {
      var n,
        i,
        o,
        s,
        a,
        u,
        l = 0,
        g = !1,
        d = !1,
        p = !0;
      if (typeof e != "function") throw new TypeError(J2);
      (t = IE(t) || 0),
        Z2(r) &&
          ((g = !!r.leading),
          (d = "maxWait" in r),
          (o = d ? ek(IE(r.maxWait) || 0, t) : o),
          (p = "trailing" in r ? !!r.trailing : p));
      function h(L) {
        var H = n,
          X = i;
        return (n = i = void 0), (l = L), (s = e.apply(X, H)), s;
      }
      function b(L) {
        return (l = L), (a = setTimeout(m, t)), g ? h(L) : s;
      }
      function _(L) {
        var H = L - u,
          X = L - l,
          z = t - H;
        return d ? tk(z, o - X) : z;
      }
      function w(L) {
        var H = L - u,
          X = L - l;
        return u === void 0 || H >= t || H < 0 || (d && X >= o);
      }
      function m() {
        var L = Za();
        if (w(L)) return C(L);
        a = setTimeout(m, _(L));
      }
      function C(L) {
        return (a = void 0), p && n ? h(L) : ((n = i = void 0), s);
      }
      function O() {
        a !== void 0 && clearTimeout(a), (l = 0), (n = u = i = a = void 0);
      }
      function N() {
        return a === void 0 ? s : C(Za());
      }
      function P() {
        var L = Za(),
          H = w(L);
        if (((n = arguments), (i = this), (u = L), H)) {
          if (a === void 0) return b(u);
          if (d) return clearTimeout(a), (a = setTimeout(m, t)), h(u);
        }
        return a === void 0 && (a = setTimeout(m, t)), s;
      }
      return (P.cancel = O), (P.flush = N), P;
    }
    wE.exports = rk;
  });
  var SE = c((yj, AE) => {
    var nk = OE(),
      ik = ot(),
      ok = "Expected a function";
    function ak(e, t, r) {
      var n = !0,
        i = !0;
      if (typeof e != "function") throw new TypeError(ok);
      return (
        ik(r) &&
          ((n = "leading" in r ? !!r.leading : n),
          (i = "trailing" in r ? !!r.trailing : i)),
        nk(e, t, { leading: n, maxWait: t, trailing: i })
      );
    }
    AE.exports = ak;
  });
  var CE = {};
  Me(CE, {
    actionListPlaybackChanged: () => gr,
    animationFrameChanged: () => fi,
    clearRequested: () => Lk,
    elementStateChanged: () => as,
    eventListenerAdded: () => li,
    eventStateChanged: () => ns,
    instanceAdded: () => is,
    instanceRemoved: () => os,
    instanceStarted: () => di,
    mediaQueriesDefined: () => us,
    parameterChanged: () => pr,
    playbackRequested: () => Ck,
    previewRequested: () => xk,
    rawDataImported: () => Ja,
    sessionInitialized: () => es,
    sessionStarted: () => ts,
    sessionStopped: () => rs,
    stopRequested: () => Rk,
    testFrameRendered: () => Nk,
    viewportWidthChanged: () => ss,
  });
  var xE,
    sk,
    uk,
    ck,
    lk,
    fk,
    dk,
    pk,
    gk,
    vk,
    hk,
    yk,
    Ek,
    mk,
    _k,
    bk,
    Tk,
    Ik,
    wk,
    Ok,
    Ak,
    Sk,
    Ja,
    es,
    ts,
    rs,
    xk,
    Ck,
    Rk,
    Lk,
    li,
    Nk,
    ns,
    fi,
    pr,
    is,
    di,
    os,
    as,
    gr,
    ss,
    us,
    pi = ye(() => {
      "use strict";
      ke();
      (xE = ce(kt())),
        ({
          IX2_RAW_DATA_IMPORTED: sk,
          IX2_SESSION_INITIALIZED: uk,
          IX2_SESSION_STARTED: ck,
          IX2_SESSION_STOPPED: lk,
          IX2_PREVIEW_REQUESTED: fk,
          IX2_PLAYBACK_REQUESTED: dk,
          IX2_STOP_REQUESTED: pk,
          IX2_CLEAR_REQUESTED: gk,
          IX2_EVENT_LISTENER_ADDED: vk,
          IX2_TEST_FRAME_RENDERED: hk,
          IX2_EVENT_STATE_CHANGED: yk,
          IX2_ANIMATION_FRAME_CHANGED: Ek,
          IX2_PARAMETER_CHANGED: mk,
          IX2_INSTANCE_ADDED: _k,
          IX2_INSTANCE_STARTED: bk,
          IX2_INSTANCE_REMOVED: Tk,
          IX2_ELEMENT_STATE_CHANGED: Ik,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: wk,
          IX2_VIEWPORT_WIDTH_CHANGED: Ok,
          IX2_MEDIA_QUERIES_DEFINED: Ak,
        } = Ie),
        ({ reifyState: Sk } = xE.IX2VanillaUtils),
        (Ja = (e) => ({ type: sk, payload: { ...Sk(e) } })),
        (es = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
          type: uk,
          payload: { hasBoundaryNodes: e, reducedMotion: t },
        })),
        (ts = () => ({ type: ck })),
        (rs = () => ({ type: lk })),
        (xk = ({ rawData: e, defer: t }) => ({
          type: fk,
          payload: { defer: t, rawData: e },
        })),
        (Ck = ({
          actionTypeId: e = De.GENERAL_START_ACTION,
          actionListId: t,
          actionItemId: r,
          eventId: n,
          allowEvents: i,
          immediate: o,
          testManual: s,
          verbose: a,
          rawData: u,
        }) => ({
          type: dk,
          payload: {
            actionTypeId: e,
            actionListId: t,
            actionItemId: r,
            testManual: s,
            eventId: n,
            allowEvents: i,
            immediate: o,
            verbose: a,
            rawData: u,
          },
        })),
        (Rk = (e) => ({ type: pk, payload: { actionListId: e } })),
        (Lk = () => ({ type: gk })),
        (li = (e, t) => ({
          type: vk,
          payload: { target: e, listenerParams: t },
        })),
        (Nk = (e = 1) => ({ type: hk, payload: { step: e } })),
        (ns = (e, t) => ({ type: yk, payload: { stateKey: e, newState: t } })),
        (fi = (e, t) => ({ type: Ek, payload: { now: e, parameters: t } })),
        (pr = (e, t) => ({ type: mk, payload: { key: e, value: t } })),
        (is = (e) => ({ type: _k, payload: { ...e } })),
        (di = (e, t) => ({ type: bk, payload: { instanceId: e, time: t } })),
        (os = (e) => ({ type: Tk, payload: { instanceId: e } })),
        (as = (e, t, r, n) => ({
          type: Ik,
          payload: { elementId: e, actionTypeId: t, current: r, actionItem: n },
        })),
        (gr = ({ actionListId: e, isPlaying: t }) => ({
          type: wk,
          payload: { actionListId: e, isPlaying: t },
        })),
        (ss = ({ width: e, mediaQueries: t }) => ({
          type: Ok,
          payload: { width: e, mediaQueries: t },
        })),
        (us = () => ({ type: Ak }));
    });
  var qe = {};
  Me(qe, {
    elementContains: () => fs,
    getChildElements: () => Bk,
    getClosestElement: () => Qr,
    getProperty: () => Dk,
    getQuerySelector: () => ls,
    getRefType: () => ds,
    getSiblingElements: () => Hk,
    getStyle: () => Mk,
    getValidDocument: () => Gk,
    isSiblingNode: () => Uk,
    matchSelector: () => kk,
    queryDocument: () => Vk,
    setStyle: () => Fk,
  });
  function Fk(e, t, r) {
    e.style[t] = r;
  }
  function Mk(e, t) {
    return t.startsWith("--")
      ? window.getComputedStyle(document.documentElement).getPropertyValue(t)
      : e.style[t];
  }
  function Dk(e, t) {
    return e[t];
  }
  function kk(e) {
    return (t) => t[cs](e);
  }
  function ls({ id: e, selector: t }) {
    if (e) {
      let r = e;
      if (e.indexOf(RE) !== -1) {
        let n = e.split(RE),
          i = n[0];
        if (((r = n[1]), i !== document.documentElement.getAttribute(NE)))
          return null;
      }
      return `[data-w-id="${r}"], [data-w-id^="${r}_instance"]`;
    }
    return t;
  }
  function Gk(e) {
    return e == null || e === document.documentElement.getAttribute(NE)
      ? document
      : null;
  }
  function Vk(e, t) {
    return Array.prototype.slice.call(
      document.querySelectorAll(t ? e + " " + t : e)
    );
  }
  function fs(e, t) {
    return e.contains(t);
  }
  function Uk(e, t) {
    return e !== t && e.parentNode === t.parentNode;
  }
  function Bk(e) {
    let t = [];
    for (let r = 0, { length: n } = e || []; r < n; r++) {
      let { children: i } = e[r],
        { length: o } = i;
      if (o) for (let s = 0; s < o; s++) t.push(i[s]);
    }
    return t;
  }
  function Hk(e = []) {
    let t = [],
      r = [];
    for (let n = 0, { length: i } = e; n < i; n++) {
      let { parentNode: o } = e[n];
      if (!o || !o.children || !o.children.length || r.indexOf(o) !== -1)
        continue;
      r.push(o);
      let s = o.firstElementChild;
      for (; s != null; )
        e.indexOf(s) === -1 && t.push(s), (s = s.nextElementSibling);
    }
    return t;
  }
  function ds(e) {
    return e != null && typeof e == "object"
      ? e instanceof Element
        ? Pk
        : qk
      : null;
  }
  var LE,
    cs,
    RE,
    Pk,
    qk,
    NE,
    Qr,
    PE = ye(() => {
      "use strict";
      LE = ce(kt());
      ke();
      ({ ELEMENT_MATCHES: cs } = LE.IX2BrowserSupport),
        ({
          IX2_ID_DELIMITER: RE,
          HTML_ELEMENT: Pk,
          PLAIN_OBJECT: qk,
          WF_PAGE: NE,
        } = Ce);
      Qr = Element.prototype.closest
        ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
        : (e, t) => {
            if (!document.documentElement.contains(e)) return null;
            let r = e;
            do {
              if (r[cs] && r[cs](t)) return r;
              r = r.parentNode;
            } while (r != null);
            return null;
          };
    });
  var ps = c((_j, FE) => {
    var Wk = ot(),
      qE = Object.create,
      Xk = (function () {
        function e() {}
        return function (t) {
          if (!Wk(t)) return {};
          if (qE) return qE(t);
          e.prototype = t;
          var r = new e();
          return (e.prototype = void 0), r;
        };
      })();
    FE.exports = Xk;
  });
  var gi = c((bj, ME) => {
    function jk() {}
    ME.exports = jk;
  });
  var hi = c((Tj, DE) => {
    var zk = ps(),
      Kk = gi();
    function vi(e, t) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__chain__ = !!t),
        (this.__index__ = 0),
        (this.__values__ = void 0);
    }
    vi.prototype = zk(Kk.prototype);
    vi.prototype.constructor = vi;
    DE.exports = vi;
  });
  var UE = c((Ij, VE) => {
    var kE = Xt(),
      Yk = qr(),
      $k = we(),
      GE = kE ? kE.isConcatSpreadable : void 0;
    function Qk(e) {
      return $k(e) || Yk(e) || !!(GE && e && e[GE]);
    }
    VE.exports = Qk;
  });
  var WE = c((wj, HE) => {
    var Zk = Fn(),
      Jk = UE();
    function BE(e, t, r, n, i) {
      var o = -1,
        s = e.length;
      for (r || (r = Jk), i || (i = []); ++o < s; ) {
        var a = e[o];
        t > 0 && r(a)
          ? t > 1
            ? BE(a, t - 1, r, n, i)
            : Zk(i, a)
          : n || (i[i.length] = a);
      }
      return i;
    }
    HE.exports = BE;
  });
  var jE = c((Oj, XE) => {
    var eG = WE();
    function tG(e) {
      var t = e == null ? 0 : e.length;
      return t ? eG(e, 1) : [];
    }
    XE.exports = tG;
  });
  var KE = c((Aj, zE) => {
    function rG(e, t, r) {
      switch (r.length) {
        case 0:
          return e.call(t);
        case 1:
          return e.call(t, r[0]);
        case 2:
          return e.call(t, r[0], r[1]);
        case 3:
          return e.call(t, r[0], r[1], r[2]);
      }
      return e.apply(t, r);
    }
    zE.exports = rG;
  });
  var QE = c((Sj, $E) => {
    var nG = KE(),
      YE = Math.max;
    function iG(e, t, r) {
      return (
        (t = YE(t === void 0 ? e.length - 1 : t, 0)),
        function () {
          for (
            var n = arguments, i = -1, o = YE(n.length - t, 0), s = Array(o);
            ++i < o;

          )
            s[i] = n[t + i];
          i = -1;
          for (var a = Array(t + 1); ++i < t; ) a[i] = n[i];
          return (a[t] = r(s)), nG(e, this, a);
        }
      );
    }
    $E.exports = iG;
  });
  var JE = c((xj, ZE) => {
    function oG(e) {
      return function () {
        return e;
      };
    }
    ZE.exports = oG;
  });
  var rm = c((Cj, tm) => {
    var aG = JE(),
      em = $a(),
      sG = zn(),
      uG = em
        ? function (e, t) {
            return em(e, "toString", {
              configurable: !0,
              enumerable: !1,
              value: aG(t),
              writable: !0,
            });
          }
        : sG;
    tm.exports = uG;
  });
  var im = c((Rj, nm) => {
    var cG = 800,
      lG = 16,
      fG = Date.now;
    function dG(e) {
      var t = 0,
        r = 0;
      return function () {
        var n = fG(),
          i = lG - (n - r);
        if (((r = n), i > 0)) {
          if (++t >= cG) return arguments[0];
        } else t = 0;
        return e.apply(void 0, arguments);
      };
    }
    nm.exports = dG;
  });
  var am = c((Lj, om) => {
    var pG = rm(),
      gG = im(),
      vG = gG(pG);
    om.exports = vG;
  });
  var um = c((Nj, sm) => {
    var hG = jE(),
      yG = QE(),
      EG = am();
    function mG(e) {
      return EG(yG(e, void 0, hG), e + "");
    }
    sm.exports = mG;
  });
  var fm = c((Pj, lm) => {
    var cm = oa(),
      _G = cm && new cm();
    lm.exports = _G;
  });
  var pm = c((qj, dm) => {
    function bG() {}
    dm.exports = bG;
  });
  var gs = c((Fj, vm) => {
    var gm = fm(),
      TG = pm(),
      IG = gm
        ? function (e) {
            return gm.get(e);
          }
        : TG;
    vm.exports = IG;
  });
  var ym = c((Mj, hm) => {
    var wG = {};
    hm.exports = wG;
  });
  var vs = c((Dj, mm) => {
    var Em = ym(),
      OG = Object.prototype,
      AG = OG.hasOwnProperty;
    function SG(e) {
      for (
        var t = e.name + "", r = Em[t], n = AG.call(Em, t) ? r.length : 0;
        n--;

      ) {
        var i = r[n],
          o = i.func;
        if (o == null || o == e) return i.name;
      }
      return t;
    }
    mm.exports = SG;
  });
  var Ei = c((kj, _m) => {
    var xG = ps(),
      CG = gi(),
      RG = 4294967295;
    function yi(e) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__dir__ = 1),
        (this.__filtered__ = !1),
        (this.__iteratees__ = []),
        (this.__takeCount__ = RG),
        (this.__views__ = []);
    }
    yi.prototype = xG(CG.prototype);
    yi.prototype.constructor = yi;
    _m.exports = yi;
  });
  var Tm = c((Gj, bm) => {
    function LG(e, t) {
      var r = -1,
        n = e.length;
      for (t || (t = Array(n)); ++r < n; ) t[r] = e[r];
      return t;
    }
    bm.exports = LG;
  });
  var wm = c((Vj, Im) => {
    var NG = Ei(),
      PG = hi(),
      qG = Tm();
    function FG(e) {
      if (e instanceof NG) return e.clone();
      var t = new PG(e.__wrapped__, e.__chain__);
      return (
        (t.__actions__ = qG(e.__actions__)),
        (t.__index__ = e.__index__),
        (t.__values__ = e.__values__),
        t
      );
    }
    Im.exports = FG;
  });
  var Sm = c((Uj, Am) => {
    var MG = Ei(),
      Om = hi(),
      DG = gi(),
      kG = we(),
      GG = dt(),
      VG = wm(),
      UG = Object.prototype,
      BG = UG.hasOwnProperty;
    function mi(e) {
      if (GG(e) && !kG(e) && !(e instanceof MG)) {
        if (e instanceof Om) return e;
        if (BG.call(e, "__wrapped__")) return VG(e);
      }
      return new Om(e);
    }
    mi.prototype = DG.prototype;
    mi.prototype.constructor = mi;
    Am.exports = mi;
  });
  var Cm = c((Bj, xm) => {
    var HG = Ei(),
      WG = gs(),
      XG = vs(),
      jG = Sm();
    function zG(e) {
      var t = XG(e),
        r = jG[t];
      if (typeof r != "function" || !(t in HG.prototype)) return !1;
      if (e === r) return !0;
      var n = WG(r);
      return !!n && e === n[0];
    }
    xm.exports = zG;
  });
  var Pm = c((Hj, Nm) => {
    var Rm = hi(),
      KG = um(),
      YG = gs(),
      hs = vs(),
      $G = we(),
      Lm = Cm(),
      QG = "Expected a function",
      ZG = 8,
      JG = 32,
      eV = 128,
      tV = 256;
    function rV(e) {
      return KG(function (t) {
        var r = t.length,
          n = r,
          i = Rm.prototype.thru;
        for (e && t.reverse(); n--; ) {
          var o = t[n];
          if (typeof o != "function") throw new TypeError(QG);
          if (i && !s && hs(o) == "wrapper") var s = new Rm([], !0);
        }
        for (n = s ? n : r; ++n < r; ) {
          o = t[n];
          var a = hs(o),
            u = a == "wrapper" ? YG(o) : void 0;
          u &&
          Lm(u[0]) &&
          u[1] == (eV | ZG | JG | tV) &&
          !u[4].length &&
          u[9] == 1
            ? (s = s[hs(u[0])].apply(s, u[3]))
            : (s = o.length == 1 && Lm(o) ? s[a]() : s.thru(o));
        }
        return function () {
          var l = arguments,
            g = l[0];
          if (s && l.length == 1 && $G(g)) return s.plant(g).value();
          for (var d = 0, p = r ? t[d].apply(this, l) : g; ++d < r; )
            p = t[d].call(this, p);
          return p;
        };
      });
    }
    Nm.exports = rV;
  });
  var Fm = c((Wj, qm) => {
    var nV = Pm(),
      iV = nV();
    qm.exports = iV;
  });
  var Dm = c((Xj, Mm) => {
    function oV(e, t, r) {
      return (
        e === e &&
          (r !== void 0 && (e = e <= r ? e : r),
          t !== void 0 && (e = e >= t ? e : t)),
        e
      );
    }
    Mm.exports = oV;
  });
  var Gm = c((jj, km) => {
    var aV = Dm(),
      ys = Kn();
    function sV(e, t, r) {
      return (
        r === void 0 && ((r = t), (t = void 0)),
        r !== void 0 && ((r = ys(r)), (r = r === r ? r : 0)),
        t !== void 0 && ((t = ys(t)), (t = t === t ? t : 0)),
        aV(ys(e), t, r)
      );
    }
    km.exports = sV;
  });
  var Km,
    Ym,
    $m,
    Qm,
    uV,
    cV,
    lV,
    fV,
    dV,
    pV,
    gV,
    vV,
    hV,
    yV,
    EV,
    mV,
    _V,
    bV,
    TV,
    Zm,
    Jm,
    IV,
    wV,
    OV,
    e_,
    AV,
    SV,
    t_,
    xV,
    Es,
    r_,
    Vm,
    Um,
    n_,
    Jr,
    CV,
    ut,
    i_,
    RV,
    Ve,
    Ze,
    en,
    o_,
    ms,
    Bm,
    _s,
    LV,
    Zr,
    NV,
    PV,
    qV,
    a_,
    Hm,
    FV,
    Wm,
    MV,
    DV,
    kV,
    Xm,
    _i,
    bi,
    jm,
    zm,
    s_,
    u_ = ye(() => {
      "use strict";
      (Km = ce(Fm())), (Ym = ce(jn())), ($m = ce(Gm()));
      ke();
      bs();
      pi();
      (Qm = ce(kt())),
        ({
          MOUSE_CLICK: uV,
          MOUSE_SECOND_CLICK: cV,
          MOUSE_DOWN: lV,
          MOUSE_UP: fV,
          MOUSE_OVER: dV,
          MOUSE_OUT: pV,
          DROPDOWN_CLOSE: gV,
          DROPDOWN_OPEN: vV,
          SLIDER_ACTIVE: hV,
          SLIDER_INACTIVE: yV,
          TAB_ACTIVE: EV,
          TAB_INACTIVE: mV,
          NAVBAR_CLOSE: _V,
          NAVBAR_OPEN: bV,
          MOUSE_MOVE: TV,
          PAGE_SCROLL_DOWN: Zm,
          SCROLL_INTO_VIEW: Jm,
          SCROLL_OUT_OF_VIEW: IV,
          PAGE_SCROLL_UP: wV,
          SCROLLING_IN_VIEW: OV,
          PAGE_FINISH: e_,
          ECOMMERCE_CART_CLOSE: AV,
          ECOMMERCE_CART_OPEN: SV,
          PAGE_START: t_,
          PAGE_SCROLL: xV,
        } = $e),
        (Es = "COMPONENT_ACTIVE"),
        (r_ = "COMPONENT_INACTIVE"),
        ({ COLON_DELIMITER: Vm } = Ce),
        ({ getNamespacedParameterId: Um } = Qm.IX2VanillaUtils),
        (n_ = (e) => (t) => typeof t == "object" && e(t) ? !0 : t),
        (Jr = n_(({ element: e, nativeEvent: t }) => e === t.target)),
        (CV = n_(({ element: e, nativeEvent: t }) => e.contains(t.target))),
        (ut = (0, Km.default)([Jr, CV])),
        (i_ = (e, t) => {
          if (t) {
            let { ixData: r } = e.getState(),
              { events: n } = r,
              i = n[t];
            if (i && !LV[i.eventTypeId]) return i;
          }
          return null;
        }),
        (RV = ({ store: e, event: t }) => {
          let { action: r } = t,
            { autoStopEventId: n } = r.config;
          return !!i_(e, n);
        }),
        (Ve = ({ store: e, event: t, element: r, eventStateKey: n }, i) => {
          let { action: o, id: s } = t,
            { actionListId: a, autoStopEventId: u } = o.config,
            l = i_(e, u);
          return (
            l &&
              vr({
                store: e,
                eventId: u,
                eventTarget: r,
                eventStateKey: u + Vm + n.split(Vm)[1],
                actionListId: (0, Ym.default)(l, "action.config.actionListId"),
              }),
            vr({
              store: e,
              eventId: s,
              eventTarget: r,
              eventStateKey: n,
              actionListId: a,
            }),
            tn({
              store: e,
              eventId: s,
              eventTarget: r,
              eventStateKey: n,
              actionListId: a,
            }),
            i
          );
        }),
        (Ze = (e, t) => (r, n) => e(r, n) === !0 ? t(r, n) : n),
        (en = { handler: Ze(ut, Ve) }),
        (o_ = { ...en, types: [Es, r_].join(" ") }),
        (ms = [
          { target: window, types: "resize orientationchange", throttle: !0 },
          {
            target: document,
            types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
            throttle: !0,
          },
        ]),
        (Bm = "mouseover mouseout"),
        (_s = { types: ms }),
        (LV = { PAGE_START: t_, PAGE_FINISH: e_ }),
        (Zr = (() => {
          let e = window.pageXOffset !== void 0,
            r =
              document.compatMode === "CSS1Compat"
                ? document.documentElement
                : document.body;
          return () => ({
            scrollLeft: e ? window.pageXOffset : r.scrollLeft,
            scrollTop: e ? window.pageYOffset : r.scrollTop,
            stiffScrollTop: (0, $m.default)(
              e ? window.pageYOffset : r.scrollTop,
              0,
              r.scrollHeight - window.innerHeight
            ),
            scrollWidth: r.scrollWidth,
            scrollHeight: r.scrollHeight,
            clientWidth: r.clientWidth,
            clientHeight: r.clientHeight,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
          });
        })()),
        (NV = (e, t) =>
          !(
            e.left > t.right ||
            e.right < t.left ||
            e.top > t.bottom ||
            e.bottom < t.top
          )),
        (PV = ({ element: e, nativeEvent: t }) => {
          let { type: r, target: n, relatedTarget: i } = t,
            o = e.contains(n);
          if (r === "mouseover" && o) return !0;
          let s = e.contains(i);
          return !!(r === "mouseout" && o && s);
        }),
        (qV = (e) => {
          let {
              element: t,
              event: { config: r },
            } = e,
            { clientWidth: n, clientHeight: i } = Zr(),
            o = r.scrollOffsetValue,
            u = r.scrollOffsetUnit === "PX" ? o : (i * (o || 0)) / 100;
          return NV(t.getBoundingClientRect(), {
            left: 0,
            top: u,
            right: n,
            bottom: i - u,
          });
        }),
        (a_ = (e) => (t, r) => {
          let { type: n } = t.nativeEvent,
            i = [Es, r_].indexOf(n) !== -1 ? n === Es : r.isActive,
            o = { ...r, isActive: i };
          return ((!r || o.isActive !== r.isActive) && e(t, o)) || o;
        }),
        (Hm = (e) => (t, r) => {
          let n = { elementHovered: PV(t) };
          return (
            ((r ? n.elementHovered !== r.elementHovered : n.elementHovered) &&
              e(t, n)) ||
            n
          );
        }),
        (FV = (e) => (t, r) => {
          let n = { ...r, elementVisible: qV(t) };
          return (
            ((r ? n.elementVisible !== r.elementVisible : n.elementVisible) &&
              e(t, n)) ||
            n
          );
        }),
        (Wm =
          (e) =>
          (t, r = {}) => {
            let { stiffScrollTop: n, scrollHeight: i, innerHeight: o } = Zr(),
              {
                event: { config: s, eventTypeId: a },
              } = t,
              { scrollOffsetValue: u, scrollOffsetUnit: l } = s,
              g = l === "PX",
              d = i - o,
              p = Number((n / d).toFixed(2));
            if (r && r.percentTop === p) return r;
            let h = (g ? u : (o * (u || 0)) / 100) / d,
              b,
              _,
              w = 0;
            r &&
              ((b = p > r.percentTop),
              (_ = r.scrollingDown !== b),
              (w = _ ? p : r.anchorTop));
            let m = a === Zm ? p >= w + h : p <= w - h,
              C = {
                ...r,
                percentTop: p,
                inBounds: m,
                anchorTop: w,
                scrollingDown: b,
              };
            return (r && m && (_ || C.inBounds !== r.inBounds) && e(t, C)) || C;
          }),
        (MV = (e, t) =>
          e.left > t.left &&
          e.left < t.right &&
          e.top > t.top &&
          e.top < t.bottom),
        (DV = (e) => (t, r) => {
          let n = { finished: document.readyState === "complete" };
          return n.finished && !(r && r.finshed) && e(t), n;
        }),
        (kV = (e) => (t, r) => {
          let n = { started: !0 };
          return r || e(t), n;
        }),
        (Xm =
          (e) =>
          (t, r = { clickCount: 0 }) => {
            let n = { clickCount: (r.clickCount % 2) + 1 };
            return (n.clickCount !== r.clickCount && e(t, n)) || n;
          }),
        (_i = (e = !0) => ({
          ...o_,
          handler: Ze(
            e ? ut : Jr,
            a_((t, r) => (r.isActive ? en.handler(t, r) : r))
          ),
        })),
        (bi = (e = !0) => ({
          ...o_,
          handler: Ze(
            e ? ut : Jr,
            a_((t, r) => (r.isActive ? r : en.handler(t, r)))
          ),
        })),
        (jm = {
          ..._s,
          handler: FV((e, t) => {
            let { elementVisible: r } = t,
              { event: n, store: i } = e,
              { ixData: o } = i.getState(),
              { events: s } = o;
            return !s[n.action.config.autoStopEventId] && t.triggered
              ? t
              : (n.eventTypeId === Jm) === r
              ? (Ve(e), { ...t, triggered: !0 })
              : t;
          }),
        }),
        (zm = 0.05),
        (s_ = {
          [hV]: _i(),
          [yV]: bi(),
          [vV]: _i(),
          [gV]: bi(),
          [bV]: _i(!1),
          [_V]: bi(!1),
          [EV]: _i(),
          [mV]: bi(),
          [SV]: { types: "ecommerce-cart-open", handler: Ze(ut, Ve) },
          [AV]: { types: "ecommerce-cart-close", handler: Ze(ut, Ve) },
          [uV]: {
            types: "click",
            handler: Ze(
              ut,
              Xm((e, { clickCount: t }) => {
                RV(e) ? t === 1 && Ve(e) : Ve(e);
              })
            ),
          },
          [cV]: {
            types: "click",
            handler: Ze(
              ut,
              Xm((e, { clickCount: t }) => {
                t === 2 && Ve(e);
              })
            ),
          },
          [lV]: { ...en, types: "mousedown" },
          [fV]: { ...en, types: "mouseup" },
          [dV]: {
            types: Bm,
            handler: Ze(
              ut,
              Hm((e, t) => {
                t.elementHovered && Ve(e);
              })
            ),
          },
          [pV]: {
            types: Bm,
            handler: Ze(
              ut,
              Hm((e, t) => {
                t.elementHovered || Ve(e);
              })
            ),
          },
          [TV]: {
            types: "mousemove mouseout scroll",
            handler: (
              {
                store: e,
                element: t,
                eventConfig: r,
                nativeEvent: n,
                eventStateKey: i,
              },
              o = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 }
            ) => {
              let {
                  basedOn: s,
                  selectedAxis: a,
                  continuousParameterGroupId: u,
                  reverse: l,
                  restingState: g = 0,
                } = r,
                {
                  clientX: d = o.clientX,
                  clientY: p = o.clientY,
                  pageX: h = o.pageX,
                  pageY: b = o.pageY,
                } = n,
                _ = a === "X_AXIS",
                w = n.type === "mouseout",
                m = g / 100,
                C = u,
                O = !1;
              switch (s) {
                case it.VIEWPORT: {
                  m = _
                    ? Math.min(d, window.innerWidth) / window.innerWidth
                    : Math.min(p, window.innerHeight) / window.innerHeight;
                  break;
                }
                case it.PAGE: {
                  let {
                    scrollLeft: N,
                    scrollTop: P,
                    scrollWidth: L,
                    scrollHeight: H,
                  } = Zr();
                  m = _ ? Math.min(N + h, L) / L : Math.min(P + b, H) / H;
                  break;
                }
                case it.ELEMENT:
                default: {
                  C = Um(i, u);
                  let N = n.type.indexOf("mouse") === 0;
                  if (N && ut({ element: t, nativeEvent: n }) !== !0) break;
                  let P = t.getBoundingClientRect(),
                    { left: L, top: H, width: X, height: z } = P;
                  if (!N && !MV({ left: d, top: p }, P)) break;
                  (O = !0), (m = _ ? (d - L) / X : (p - H) / z);
                  break;
                }
              }
              return (
                w && (m > 1 - zm || m < zm) && (m = Math.round(m)),
                (s !== it.ELEMENT || O || O !== o.elementHovered) &&
                  ((m = l ? 1 - m : m), e.dispatch(pr(C, m))),
                {
                  elementHovered: O,
                  clientX: d,
                  clientY: p,
                  pageX: h,
                  pageY: b,
                }
              );
            },
          },
          [xV]: {
            types: ms,
            handler: ({ store: e, eventConfig: t }) => {
              let { continuousParameterGroupId: r, reverse: n } = t,
                { scrollTop: i, scrollHeight: o, clientHeight: s } = Zr(),
                a = i / (o - s);
              (a = n ? 1 - a : a), e.dispatch(pr(r, a));
            },
          },
          [OV]: {
            types: ms,
            handler: (
              { element: e, store: t, eventConfig: r, eventStateKey: n },
              i = { scrollPercent: 0 }
            ) => {
              let {
                  scrollLeft: o,
                  scrollTop: s,
                  scrollWidth: a,
                  scrollHeight: u,
                  clientHeight: l,
                } = Zr(),
                {
                  basedOn: g,
                  selectedAxis: d,
                  continuousParameterGroupId: p,
                  startsEntering: h,
                  startsExiting: b,
                  addEndOffset: _,
                  addStartOffset: w,
                  addOffsetValue: m = 0,
                  endOffsetValue: C = 0,
                } = r,
                O = d === "X_AXIS";
              if (g === it.VIEWPORT) {
                let N = O ? o / a : s / u;
                return (
                  N !== i.scrollPercent && t.dispatch(pr(p, N)),
                  { scrollPercent: N }
                );
              } else {
                let N = Um(n, p),
                  P = e.getBoundingClientRect(),
                  L = (w ? m : 0) / 100,
                  H = (_ ? C : 0) / 100;
                (L = h ? L : 1 - L), (H = b ? H : 1 - H);
                let X = P.top + Math.min(P.height * L, l),
                  Z = P.top + P.height * H - X,
                  k = Math.min(l + Z, u),
                  v = Math.min(Math.max(0, l - X), k) / k;
                return (
                  v !== i.scrollPercent && t.dispatch(pr(N, v)),
                  { scrollPercent: v }
                );
              }
            },
          },
          [Jm]: jm,
          [IV]: jm,
          [Zm]: {
            ..._s,
            handler: Wm((e, t) => {
              t.scrollingDown && Ve(e);
            }),
          },
          [wV]: {
            ..._s,
            handler: Wm((e, t) => {
              t.scrollingDown || Ve(e);
            }),
          },
          [e_]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: Ze(Jr, DV(Ve)),
          },
          [t_]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: Ze(Jr, kV(Ve)),
          },
        });
    });
  var O_ = {};
  Me(O_, {
    observeRequests: () => iU,
    startActionGroup: () => tn,
    startEngine: () => Si,
    stopActionGroup: () => vr,
    stopAllActionGroups: () => T_,
    stopEngine: () => xi,
  });
  function iU(e) {
    Gt({ store: e, select: ({ ixRequest: t }) => t.preview, onChange: sU }),
      Gt({ store: e, select: ({ ixRequest: t }) => t.playback, onChange: uU }),
      Gt({ store: e, select: ({ ixRequest: t }) => t.stop, onChange: cU }),
      Gt({ store: e, select: ({ ixRequest: t }) => t.clear, onChange: lU });
  }
  function oU(e) {
    Gt({
      store: e,
      select: ({ ixSession: t }) => t.mediaQueryKey,
      onChange: () => {
        xi(e),
          E_({ store: e, elementApi: qe }),
          Si({ store: e, allowEvents: !0 }),
          m_();
      },
    });
  }
  function aU(e, t) {
    let r = Gt({
      store: e,
      select: ({ ixSession: n }) => n.tick,
      onChange: (n) => {
        t(n), r();
      },
    });
  }
  function sU({ rawData: e, defer: t }, r) {
    let n = () => {
      Si({ store: r, rawData: e, allowEvents: !0 }), m_();
    };
    t ? setTimeout(n, 0) : n();
  }
  function m_() {
    document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
  }
  function uU(e, t) {
    let {
        actionTypeId: r,
        actionListId: n,
        actionItemId: i,
        eventId: o,
        allowEvents: s,
        immediate: a,
        testManual: u,
        verbose: l = !0,
      } = e,
      { rawData: g } = e;
    if (n && i && g && a) {
      let d = g.actionLists[n];
      d && (g = zV({ actionList: d, actionItemId: i, rawData: g }));
    }
    if (
      (Si({ store: t, rawData: g, allowEvents: s, testManual: u }),
      (n && r === De.GENERAL_START_ACTION) || Ts(r))
    ) {
      vr({ store: t, actionListId: n }),
        b_({ store: t, actionListId: n, eventId: o });
      let d = tn({
        store: t,
        eventId: o,
        actionListId: n,
        immediate: a,
        verbose: l,
      });
      l && d && t.dispatch(gr({ actionListId: n, isPlaying: !a }));
    }
  }
  function cU({ actionListId: e }, t) {
    e ? vr({ store: t, actionListId: e }) : T_({ store: t }), xi(t);
  }
  function lU(e, t) {
    xi(t), E_({ store: t, elementApi: qe });
  }
  function Si({ store: e, rawData: t, allowEvents: r, testManual: n }) {
    let { ixSession: i } = e.getState();
    t && e.dispatch(Ja(t)),
      i.active ||
        (e.dispatch(
          es({
            hasBoundaryNodes: !!document.querySelector(Ii),
            reducedMotion:
              document.body.hasAttribute("data-wf-ix-vacation") &&
              window.matchMedia("(prefers-reduced-motion)").matches,
          })
        ),
        r &&
          (hU(e), fU(), e.getState().ixSession.hasDefinedMediaQueries && oU(e)),
        e.dispatch(ts()),
        dU(e, n));
  }
  function fU() {
    let { documentElement: e } = document;
    e.className.indexOf(c_) === -1 && (e.className += ` ${c_}`);
  }
  function dU(e, t) {
    let r = (n) => {
      let { ixSession: i, ixParameters: o } = e.getState();
      i.active &&
        (e.dispatch(fi(n, o)), t ? aU(e, r) : requestAnimationFrame(r));
    };
    r(window.performance.now());
  }
  function xi(e) {
    let { ixSession: t } = e.getState();
    if (t.active) {
      let { eventListeners: r } = t;
      r.forEach(pU), QV(), e.dispatch(rs());
    }
  }
  function pU({ target: e, listenerParams: t }) {
    e.removeEventListener.apply(e, t);
  }
  function gU({
    store: e,
    eventStateKey: t,
    eventTarget: r,
    eventId: n,
    eventConfig: i,
    actionListId: o,
    parameterGroup: s,
    smoothing: a,
    restingValue: u,
  }) {
    let { ixData: l, ixSession: g } = e.getState(),
      { events: d } = l,
      p = d[n],
      { eventTypeId: h } = p,
      b = {},
      _ = {},
      w = [],
      { continuousActionGroups: m } = s,
      { id: C } = s;
    KV(h, i) && (C = YV(t, C));
    let O = g.hasBoundaryNodes && r ? Qr(r, Ii) : null;
    m.forEach((N) => {
      let { keyframe: P, actionItems: L } = N;
      L.forEach((H) => {
        let { actionTypeId: X } = H,
          { target: z } = H.config;
        if (!z) return;
        let Z = z.boundaryMode ? O : null,
          k = ZV(z) + Is + X;
        if (((_[k] = vU(_[k], P, H)), !b[k])) {
          b[k] = !0;
          let { config: x } = H;
          wi({
            config: x,
            event: p,
            eventTarget: r,
            elementRoot: Z,
            elementApi: qe,
          }).forEach((v) => {
            w.push({ element: v, key: k });
          });
        }
      });
    }),
      w.forEach(({ element: N, key: P }) => {
        let L = _[P],
          H = (0, ht.default)(L, "[0].actionItems[0]", {}),
          { actionTypeId: X } = H,
          z = Ai(X) ? Os(X)(N, H) : null,
          Z = ws({ element: N, actionItem: H, elementApi: qe }, z);
        As({
          store: e,
          element: N,
          eventId: n,
          actionListId: o,
          actionItem: H,
          destination: Z,
          continuous: !0,
          parameterId: C,
          actionGroups: L,
          smoothing: a,
          restingValue: u,
          pluginInstance: z,
        });
      });
  }
  function vU(e = [], t, r) {
    let n = [...e],
      i;
    return (
      n.some((o, s) => (o.keyframe === t ? ((i = s), !0) : !1)),
      i == null && ((i = n.length), n.push({ keyframe: t, actionItems: [] })),
      n[i].actionItems.push(r),
      n
    );
  }
  function hU(e) {
    let { ixData: t } = e.getState(),
      { eventTypeMap: r } = t;
    __(e),
      (0, hr.default)(r, (i, o) => {
        let s = s_[o];
        if (!s) {
          console.warn(`IX2 event type not configured: ${o}`);
          return;
        }
        TU({ logic: s, store: e, events: i });
      });
    let { ixSession: n } = e.getState();
    n.eventListeners.length && EU(e);
  }
  function EU(e) {
    let t = () => {
      __(e);
    };
    yU.forEach((r) => {
      window.addEventListener(r, t), e.dispatch(li(window, [r, t]));
    }),
      t();
  }
  function __(e) {
    let { ixSession: t, ixData: r } = e.getState(),
      n = window.innerWidth;
    if (n !== t.viewportWidth) {
      let { mediaQueries: i } = r;
      e.dispatch(ss({ width: n, mediaQueries: i }));
    }
  }
  function TU({ logic: e, store: t, events: r }) {
    IU(r);
    let { types: n, handler: i } = e,
      { ixData: o } = t.getState(),
      { actionLists: s } = o,
      a = mU(r, bU);
    if (!(0, d_.default)(a)) return;
    (0, hr.default)(a, (d, p) => {
      let h = r[p],
        { action: b, id: _, mediaQueries: w = o.mediaQueryKeys } = h,
        { actionListId: m } = b.config;
      JV(w, o.mediaQueryKeys) || t.dispatch(us()),
        b.actionTypeId === De.GENERAL_CONTINUOUS_ACTION &&
          (Array.isArray(h.config) ? h.config : [h.config]).forEach((O) => {
            let { continuousParameterGroupId: N } = O,
              P = (0, ht.default)(s, `${m}.continuousParameterGroups`, []),
              L = (0, f_.default)(P, ({ id: z }) => z === N),
              H = (O.smoothing || 0) / 100,
              X = (O.restingState || 0) / 100;
            L &&
              d.forEach((z, Z) => {
                let k = _ + Is + Z;
                gU({
                  store: t,
                  eventStateKey: k,
                  eventTarget: z,
                  eventId: _,
                  eventConfig: O,
                  actionListId: m,
                  parameterGroup: L,
                  smoothing: H,
                  restingValue: X,
                });
              });
          }),
        (b.actionTypeId === De.GENERAL_START_ACTION || Ts(b.actionTypeId)) &&
          b_({ store: t, actionListId: m, eventId: _ });
    });
    let u = (d) => {
        let { ixSession: p } = t.getState();
        _U(a, (h, b, _) => {
          let w = r[b],
            m = p.eventState[_],
            { action: C, mediaQueries: O = o.mediaQueryKeys } = w;
          if (!Oi(O, p.mediaQueryKey)) return;
          let N = (P = {}) => {
            let L = i(
              {
                store: t,
                element: h,
                event: w,
                eventConfig: P,
                nativeEvent: d,
                eventStateKey: _,
              },
              m
            );
            eU(L, m) || t.dispatch(ns(_, L));
          };
          C.actionTypeId === De.GENERAL_CONTINUOUS_ACTION
            ? (Array.isArray(w.config) ? w.config : [w.config]).forEach(N)
            : N();
        });
      },
      l = (0, h_.default)(u, nU),
      g = ({ target: d = document, types: p, throttle: h }) => {
        p.split(" ")
          .filter(Boolean)
          .forEach((b) => {
            let _ = h ? l : u;
            d.addEventListener(b, _), t.dispatch(li(d, [b, _]));
          });
      };
    Array.isArray(n) ? n.forEach(g) : typeof n == "string" && g(e);
  }
  function IU(e) {
    if (!rU) return;
    let t = {},
      r = "";
    for (let n in e) {
      let { eventTypeId: i, target: o } = e[n],
        s = ls(o);
      t[s] ||
        ((i === $e.MOUSE_CLICK || i === $e.MOUSE_SECOND_CLICK) &&
          ((t[s] = !0),
          (r += s + "{cursor: pointer;touch-action: manipulation;}")));
    }
    if (r) {
      let n = document.createElement("style");
      (n.textContent = r), document.body.appendChild(n);
    }
  }
  function b_({ store: e, actionListId: t, eventId: r }) {
    let { ixData: n, ixSession: i } = e.getState(),
      { actionLists: o, events: s } = n,
      a = s[r],
      u = o[t];
    if (u && u.useFirstGroupAsInitialState) {
      let l = (0, ht.default)(u, "actionItemGroups[0].actionItems", []),
        g = (0, ht.default)(a, "mediaQueries", n.mediaQueryKeys);
      if (!Oi(g, i.mediaQueryKey)) return;
      l.forEach((d) => {
        let { config: p, actionTypeId: h } = d,
          b =
            p?.target?.useEventTarget === !0 && p?.target?.objectId == null
              ? { target: a.target, targets: a.targets }
              : p,
          _ = wi({ config: b, event: a, elementApi: qe }),
          w = Ai(h);
        _.forEach((m) => {
          let C = w ? Os(h)(m, d) : null;
          As({
            destination: ws({ element: m, actionItem: d, elementApi: qe }, C),
            immediate: !0,
            store: e,
            element: m,
            eventId: r,
            actionItem: d,
            actionListId: t,
            pluginInstance: C,
          });
        });
      });
    }
  }
  function T_({ store: e }) {
    let { ixInstances: t } = e.getState();
    (0, hr.default)(t, (r) => {
      if (!r.continuous) {
        let { actionListId: n, verbose: i } = r;
        Ss(r, e), i && e.dispatch(gr({ actionListId: n, isPlaying: !1 }));
      }
    });
  }
  function vr({
    store: e,
    eventId: t,
    eventTarget: r,
    eventStateKey: n,
    actionListId: i,
  }) {
    let { ixInstances: o, ixSession: s } = e.getState(),
      a = s.hasBoundaryNodes && r ? Qr(r, Ii) : null;
    (0, hr.default)(o, (u) => {
      let l = (0, ht.default)(u, "actionItem.config.target.boundaryMode"),
        g = n ? u.eventStateKey === n : !0;
      if (u.actionListId === i && u.eventId === t && g) {
        if (a && l && !fs(a, u.element)) return;
        Ss(u, e),
          u.verbose && e.dispatch(gr({ actionListId: i, isPlaying: !1 }));
      }
    });
  }
  function tn({
    store: e,
    eventId: t,
    eventTarget: r,
    eventStateKey: n,
    actionListId: i,
    groupIndex: o = 0,
    immediate: s,
    verbose: a,
  }) {
    let { ixData: u, ixSession: l } = e.getState(),
      { events: g } = u,
      d = g[t] || {},
      { mediaQueries: p = u.mediaQueryKeys } = d,
      h = (0, ht.default)(u, `actionLists.${i}`, {}),
      { actionItemGroups: b, useFirstGroupAsInitialState: _ } = h;
    if (!b || !b.length) return !1;
    o >= b.length && (0, ht.default)(d, "config.loop") && (o = 0),
      o === 0 && _ && o++;
    let m =
        (o === 0 || (o === 1 && _)) && Ts(d.action?.actionTypeId)
          ? d.config.delay
          : void 0,
      C = (0, ht.default)(b, [o, "actionItems"], []);
    if (!C.length || !Oi(p, l.mediaQueryKey)) return !1;
    let O = l.hasBoundaryNodes && r ? Qr(r, Ii) : null,
      N = WV(C),
      P = !1;
    return (
      C.forEach((L, H) => {
        let { config: X, actionTypeId: z } = L,
          Z = Ai(z),
          { target: k } = X;
        if (!k) return;
        let x = k.boundaryMode ? O : null;
        wi({
          config: X,
          event: d,
          eventTarget: r,
          elementRoot: x,
          elementApi: qe,
        }).forEach((R, F) => {
          let D = Z ? Os(z)(R, L) : null,
            J = Z ? tU(z)(R, L) : null;
          P = !0;
          let ee = N === H && F === 0,
            q = XV({ element: R, actionItem: L }),
            V = ws({ element: R, actionItem: L, elementApi: qe }, D);
          As({
            store: e,
            element: R,
            actionItem: L,
            eventId: t,
            eventTarget: r,
            eventStateKey: n,
            actionListId: i,
            groupIndex: o,
            isCarrier: ee,
            computedStyle: q,
            destination: V,
            immediate: s,
            verbose: a,
            pluginInstance: D,
            pluginDuration: J,
            instanceDelay: m,
          });
        });
      }),
      P
    );
  }
  function As(e) {
    let { store: t, computedStyle: r, ...n } = e,
      {
        element: i,
        actionItem: o,
        immediate: s,
        pluginInstance: a,
        continuous: u,
        restingValue: l,
        eventId: g,
      } = n,
      d = !u,
      p = BV(),
      { ixElements: h, ixSession: b, ixData: _ } = t.getState(),
      w = UV(h, i),
      { refState: m } = h[w] || {},
      C = ds(i),
      O = b.reducedMotion && jo[o.actionTypeId],
      N;
    if (O && u)
      switch (_.events[g]?.eventTypeId) {
        case $e.MOUSE_MOVE:
        case $e.MOUSE_MOVE_IN_VIEWPORT:
          N = l;
          break;
        default:
          N = 0.5;
          break;
      }
    let P = jV(i, m, r, o, qe, a);
    if (
      (t.dispatch(
        is({
          instanceId: p,
          elementId: w,
          origin: P,
          refType: C,
          skipMotion: O,
          skipToValue: N,
          ...n,
        })
      ),
      I_(document.body, "ix2-animation-started", p),
      s)
    ) {
      wU(t, p);
      return;
    }
    Gt({ store: t, select: ({ ixInstances: L }) => L[p], onChange: w_ }),
      d && t.dispatch(di(p, b.tick));
  }
  function Ss(e, t) {
    I_(document.body, "ix2-animation-stopping", {
      instanceId: e.id,
      state: t.getState(),
    });
    let { elementId: r, actionItem: n } = e,
      { ixElements: i } = t.getState(),
      { ref: o, refType: s } = i[r] || {};
    s === y_ && $V(o, n, qe), t.dispatch(os(e.id));
  }
  function I_(e, t, r) {
    let n = document.createEvent("CustomEvent");
    n.initCustomEvent(t, !0, !0, r), e.dispatchEvent(n);
  }
  function wU(e, t) {
    let { ixParameters: r } = e.getState();
    e.dispatch(di(t, 0)), e.dispatch(fi(performance.now(), r));
    let { ixInstances: n } = e.getState();
    w_(n[t], e);
  }
  function w_(e, t) {
    let {
        active: r,
        continuous: n,
        complete: i,
        elementId: o,
        actionItem: s,
        actionTypeId: a,
        renderType: u,
        current: l,
        groupIndex: g,
        eventId: d,
        eventTarget: p,
        eventStateKey: h,
        actionListId: b,
        isCarrier: _,
        styleProp: w,
        verbose: m,
        pluginInstance: C,
      } = e,
      { ixData: O, ixSession: N } = t.getState(),
      { events: P } = O,
      L = P[d] || {},
      { mediaQueries: H = O.mediaQueryKeys } = L;
    if (Oi(H, N.mediaQueryKey) && (n || r || i)) {
      if (l || (u === VV && i)) {
        t.dispatch(as(o, a, l, s));
        let { ixElements: X } = t.getState(),
          { ref: z, refType: Z, refState: k } = X[o] || {},
          x = k && k[a];
        (Z === y_ || Ai(a)) && HV(z, k, x, d, s, w, qe, u, C);
      }
      if (i) {
        if (_) {
          let X = tn({
            store: t,
            eventId: d,
            eventTarget: p,
            eventStateKey: h,
            actionListId: b,
            groupIndex: g + 1,
            verbose: m,
          });
          m && !X && t.dispatch(gr({ actionListId: b, isPlaying: !1 }));
        }
        Ss(e, t);
      }
    }
  }
  var f_,
    ht,
    d_,
    p_,
    g_,
    v_,
    hr,
    h_,
    Ti,
    GV,
    Ts,
    Is,
    Ii,
    y_,
    VV,
    c_,
    wi,
    UV,
    ws,
    Gt,
    BV,
    HV,
    E_,
    WV,
    XV,
    jV,
    zV,
    KV,
    YV,
    Oi,
    $V,
    QV,
    ZV,
    JV,
    eU,
    Ai,
    Os,
    tU,
    l_,
    rU,
    nU,
    yU,
    mU,
    _U,
    bU,
    bs = ye(() => {
      "use strict";
      (f_ = ce(ba())),
        (ht = ce(jn())),
        (d_ = ce(ky())),
        (p_ = ce(lE())),
        (g_ = ce(dE())),
        (v_ = ce(gE())),
        (hr = ce(_E())),
        (h_ = ce(SE()));
      ke();
      Ti = ce(kt());
      pi();
      PE();
      u_();
      (GV = Object.keys(wn)),
        (Ts = (e) => GV.includes(e)),
        ({
          COLON_DELIMITER: Is,
          BOUNDARY_SELECTOR: Ii,
          HTML_ELEMENT: y_,
          RENDER_GENERAL: VV,
          W_MOD_IX: c_,
        } = Ce),
        ({
          getAffectedElements: wi,
          getElementId: UV,
          getDestinationValues: ws,
          observeStore: Gt,
          getInstanceId: BV,
          renderHTMLElement: HV,
          clearAllStyles: E_,
          getMaxDurationItemIndex: WV,
          getComputedStyle: XV,
          getInstanceOrigin: jV,
          reduceListToGroup: zV,
          shouldNamespaceEventParameter: KV,
          getNamespacedParameterId: YV,
          shouldAllowMediaQuery: Oi,
          cleanupHTMLElement: $V,
          clearObjectCache: QV,
          stringifyTarget: ZV,
          mediaQueriesEqual: JV,
          shallowEqual: eU,
        } = Ti.IX2VanillaUtils),
        ({
          isPluginType: Ai,
          createPluginInstance: Os,
          getPluginDuration: tU,
        } = Ti.IX2VanillaPlugins),
        (l_ = navigator.userAgent),
        (rU = l_.match(/iPad/i) || l_.match(/iPhone/)),
        (nU = 12);
      yU = ["resize", "orientationchange"];
      (mU = (e, t) => (0, p_.default)((0, v_.default)(e, t), g_.default)),
        (_U = (e, t) => {
          (0, hr.default)(e, (r, n) => {
            r.forEach((i, o) => {
              let s = n + Is + o;
              t(i, n, s);
            });
          });
        }),
        (bU = (e) => {
          let t = { target: e.target, targets: e.targets };
          return wi({ config: t, elementApi: qe });
        });
    });
  var S_ = c((yt) => {
    "use strict";
    var OU = fn().default,
      AU = uu().default;
    Object.defineProperty(yt, "__esModule", { value: !0 });
    yt.actions = void 0;
    yt.destroy = A_;
    yt.init = LU;
    yt.setEnv = RU;
    yt.store = void 0;
    zl();
    var SU = Ho(),
      xU = AU((my(), et(Ey))),
      xs = (bs(), et(O_)),
      CU = OU((pi(), et(CE)));
    yt.actions = CU;
    var Cs = (yt.store = (0, SU.createStore)(xU.default));
    function RU(e) {
      e() && (0, xs.observeRequests)(Cs);
    }
    function LU(e) {
      A_(), (0, xs.startEngine)({ store: Cs, rawData: e, allowEvents: !0 });
    }
    function A_() {
      (0, xs.stopEngine)(Cs);
    }
  });
  var L_ = c((tz, R_) => {
    "use strict";
    var x_ = Ue(),
      C_ = S_();
    C_.setEnv(x_.env);
    x_.define(
      "ix2",
      (R_.exports = function () {
        return C_;
      })
    );
  });
  var P_ = c((rz, N_) => {
    "use strict";
    var yr = Ue();
    yr.define(
      "links",
      (N_.exports = function (e, t) {
        var r = {},
          n = e(window),
          i,
          o = yr.env(),
          s = window.location,
          a = document.createElement("a"),
          u = "w--current",
          l = /index\.(html|php)$/,
          g = /\/$/,
          d,
          p;
        r.ready = r.design = r.preview = h;
        function h() {
          (i = o && yr.env("design")),
            (p = yr.env("slug") || s.pathname || ""),
            yr.scroll.off(_),
            (d = []);
          for (var m = document.links, C = 0; C < m.length; ++C) b(m[C]);
          d.length && (yr.scroll.on(_), _());
        }
        function b(m) {
          if (!m.getAttribute("hreflang")) {
            var C =
              (i && m.getAttribute("href-disabled")) || m.getAttribute("href");
            if (((a.href = C), !(C.indexOf(":") >= 0))) {
              var O = e(m);
              if (
                a.hash.length > 1 &&
                a.host + a.pathname === s.host + s.pathname
              ) {
                if (!/^#[a-zA-Z0-9\-\_]+$/.test(a.hash)) return;
                var N = e(a.hash);
                N.length && d.push({ link: O, sec: N, active: !1 });
                return;
              }
              if (!(C === "#" || C === "")) {
                var P =
                  a.href === s.href || C === p || (l.test(C) && g.test(p));
                w(O, u, P);
              }
            }
          }
        }
        function _() {
          var m = n.scrollTop(),
            C = n.height();
          t.each(d, function (O) {
            if (!O.link.attr("hreflang")) {
              var N = O.link,
                P = O.sec,
                L = P.offset().top,
                H = P.outerHeight(),
                X = C * 0.5,
                z = P.is(":visible") && L + H - X >= m && L + X <= m + C;
              O.active !== z && ((O.active = z), w(N, u, z));
            }
          });
        }
        function w(m, C, O) {
          var N = m.hasClass(C);
          (O && N) || (!O && !N) || (O ? m.addClass(C) : m.removeClass(C));
        }
        return r;
      })
    );
  });
  var F_ = c((nz, q_) => {
    "use strict";
    var Ci = Ue();
    Ci.define(
      "scroll",
      (q_.exports = function (e) {
        var t = {
            WF_CLICK_EMPTY: "click.wf-empty-link",
            WF_CLICK_SCROLL: "click.wf-scroll",
          },
          r = window.location,
          n = b() ? null : window.history,
          i = e(window),
          o = e(document),
          s = e(document.body),
          a =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (x) {
              window.setTimeout(x, 15);
            },
          u = Ci.env("editor") ? ".w-editor-body" : "body",
          l =
            "header, " +
            u +
            " > .header, " +
            u +
            " > .w-nav:not([data-no-scroll])",
          g = 'a[href="#"]',
          d = 'a[href*="#"]:not(.w-tab-link):not(' + g + ")",
          p = '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
          h = document.createElement("style");
        h.appendChild(document.createTextNode(p));
        function b() {
          try {
            return !!window.frameElement;
          } catch {
            return !0;
          }
        }
        var _ = /^#[a-zA-Z0-9][\w:.-]*$/;
        function w(x) {
          return _.test(x.hash) && x.host + x.pathname === r.host + r.pathname;
        }
        let m =
          typeof window.matchMedia == "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)");
        function C() {
          return (
            document.body.getAttribute("data-wf-scroll-motion") === "none" ||
            m.matches
          );
        }
        function O(x, v) {
          var R;
          switch (v) {
            case "add":
              (R = x.attr("tabindex")),
                R
                  ? x.attr("data-wf-tabindex-swap", R)
                  : x.attr("tabindex", "-1");
              break;
            case "remove":
              (R = x.attr("data-wf-tabindex-swap")),
                R
                  ? (x.attr("tabindex", R),
                    x.removeAttr("data-wf-tabindex-swap"))
                  : x.removeAttr("tabindex");
              break;
          }
          x.toggleClass("wf-force-outline-none", v === "add");
        }
        function N(x) {
          var v = x.currentTarget;
          if (
            !(
              Ci.env("design") ||
              (window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(v.className))
            )
          ) {
            var R = w(v) ? v.hash : "";
            if (R !== "") {
              var F = e(R);
              F.length &&
                (x && (x.preventDefault(), x.stopPropagation()),
                P(R, x),
                window.setTimeout(
                  function () {
                    L(F, function () {
                      O(F, "add"),
                        F.get(0).focus({ preventScroll: !0 }),
                        O(F, "remove");
                    });
                  },
                  x ? 0 : 300
                ));
            }
          }
        }
        function P(x) {
          if (
            r.hash !== x &&
            n &&
            n.pushState &&
            !(Ci.env.chrome && r.protocol === "file:")
          ) {
            var v = n.state && n.state.hash;
            v !== x && n.pushState({ hash: x }, "", x);
          }
        }
        function L(x, v) {
          var R = i.scrollTop(),
            F = H(x);
          if (R !== F) {
            var D = X(x, R, F),
              J = Date.now(),
              ee = function () {
                var q = Date.now() - J;
                window.scroll(0, z(R, F, q, D)),
                  q <= D ? a(ee) : typeof v == "function" && v();
              };
            a(ee);
          }
        }
        function H(x) {
          var v = e(l),
            R = v.css("position") === "fixed" ? v.outerHeight() : 0,
            F = x.offset().top - R;
          if (x.data("scroll") === "mid") {
            var D = i.height() - R,
              J = x.outerHeight();
            J < D && (F -= Math.round((D - J) / 2));
          }
          return F;
        }
        function X(x, v, R) {
          if (C()) return 0;
          var F = 1;
          return (
            s.add(x).each(function (D, J) {
              var ee = parseFloat(J.getAttribute("data-scroll-time"));
              !isNaN(ee) && ee >= 0 && (F = ee);
            }),
            (472.143 * Math.log(Math.abs(v - R) + 125) - 2e3) * F
          );
        }
        function z(x, v, R, F) {
          return R > F ? v : x + (v - x) * Z(R / F);
        }
        function Z(x) {
          return x < 0.5
            ? 4 * x * x * x
            : (x - 1) * (2 * x - 2) * (2 * x - 2) + 1;
        }
        function k() {
          var { WF_CLICK_EMPTY: x, WF_CLICK_SCROLL: v } = t;
          o.on(v, d, N),
            o.on(x, g, function (R) {
              R.preventDefault();
            }),
            document.head.insertBefore(h, document.head.firstChild);
        }
        return { ready: k };
      })
    );
  });
  var D_ = c((iz, M_) => {
    "use strict";
    var NU = Ue();
    NU.define(
      "touch",
      (M_.exports = function (e) {
        var t = {},
          r = window.getSelection;
        (e.event.special.tap = { bindType: "click", delegateType: "click" }),
          (t.init = function (o) {
            return (
              (o = typeof o == "string" ? e(o).get(0) : o), o ? new n(o) : null
            );
          });
        function n(o) {
          var s = !1,
            a = !1,
            u = Math.min(Math.round(window.innerWidth * 0.04), 40),
            l,
            g;
          o.addEventListener("touchstart", d, !1),
            o.addEventListener("touchmove", p, !1),
            o.addEventListener("touchend", h, !1),
            o.addEventListener("touchcancel", b, !1),
            o.addEventListener("mousedown", d, !1),
            o.addEventListener("mousemove", p, !1),
            o.addEventListener("mouseup", h, !1),
            o.addEventListener("mouseout", b, !1);
          function d(w) {
            var m = w.touches;
            (m && m.length > 1) ||
              ((s = !0),
              m ? ((a = !0), (l = m[0].clientX)) : (l = w.clientX),
              (g = l));
          }
          function p(w) {
            if (s) {
              if (a && w.type === "mousemove") {
                w.preventDefault(), w.stopPropagation();
                return;
              }
              var m = w.touches,
                C = m ? m[0].clientX : w.clientX,
                O = C - g;
              (g = C),
                Math.abs(O) > u &&
                  r &&
                  String(r()) === "" &&
                  (i("swipe", w, { direction: O > 0 ? "right" : "left" }), b());
            }
          }
          function h(w) {
            if (s && ((s = !1), a && w.type === "mouseup")) {
              w.preventDefault(), w.stopPropagation(), (a = !1);
              return;
            }
          }
          function b() {
            s = !1;
          }
          function _() {
            o.removeEventListener("touchstart", d, !1),
              o.removeEventListener("touchmove", p, !1),
              o.removeEventListener("touchend", h, !1),
              o.removeEventListener("touchcancel", b, !1),
              o.removeEventListener("mousedown", d, !1),
              o.removeEventListener("mousemove", p, !1),
              o.removeEventListener("mouseup", h, !1),
              o.removeEventListener("mouseout", b, !1),
              (o = null);
          }
          this.destroy = _;
        }
        function i(o, s, a) {
          var u = e.Event(o, { originalEvent: s });
          e(s.target).trigger(u, a);
        }
        return (t.instance = t.init(document)), t;
      })
    );
  });
  var k_ = c((Rs) => {
    "use strict";
    Object.defineProperty(Rs, "__esModule", { value: !0 });
    Rs.default = PU;
    function PU(e, t, r, n, i, o, s, a, u, l, g, d, p) {
      return function (h) {
        e(h);
        var b = h.form,
          _ = {
            name: b.attr("data-name") || b.attr("name") || "Untitled Form",
            pageId: b.attr("data-wf-page-id") || "",
            elementId: b.attr("data-wf-element-id") || "",
            source: t.href,
            test: r.env(),
            fields: {},
            fileUploads: {},
            dolphin: /pass[\s-_]?(word|code)|secret|login|credentials/i.test(
              b.html()
            ),
            trackingCookies: n(),
          };
        let w = b.attr("data-wf-flow");
        w && (_.wfFlow = w), i(h);
        var m = o(b, _.fields);
        if (m) return s(m);
        if (((_.fileUploads = a(b)), u(h), !l)) {
          g(h);
          return;
        }
        d.ajax({
          url: p,
          type: "POST",
          data: _,
          dataType: "json",
          crossDomain: !0,
        })
          .done(function (C) {
            C && C.code === 200 && (h.success = !0), g(h);
          })
          .fail(function () {
            g(h);
          });
      };
    }
  });
  var V_ = c((az, G_) => {
    "use strict";
    var Ri = Ue();
    Ri.define(
      "forms",
      (G_.exports = function (e, t) {
        var r = {},
          n = e(document),
          i,
          o = window.location,
          s = window.XDomainRequest && !window.atob,
          a = ".w-form",
          u,
          l = /e(-)?mail/i,
          g = /^\S+@\S+$/,
          d = window.alert,
          p = Ri.env(),
          h,
          b,
          _,
          w = /list-manage[1-9]?.com/i,
          m = t.debounce(function () {
            d(
              "Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue."
            );
          }, 100);
        r.ready =
          r.design =
          r.preview =
            function () {
              C(), !p && !h && N();
            };
        function C() {
          (u = e("html").attr("data-wf-site")),
            (b = "https://webflow.com/api/v1/form/" + u),
            s &&
              b.indexOf("https://webflow.com") >= 0 &&
              (b = b.replace(
                "https://webflow.com",
                "https://formdata.webflow.com"
              )),
            (_ = `${b}/signFile`),
            (i = e(a + " form")),
            i.length && i.each(O);
        }
        function O(q, V) {
          var K = e(V),
            G = e.data(V, a);
          G || (G = e.data(V, a, { form: K })), P(G);
          var M = K.closest("div.w-form");
          (G.done = M.find("> .w-form-done")),
            (G.fail = M.find("> .w-form-fail")),
            (G.fileUploads = M.find(".w-file-upload")),
            G.fileUploads.each(function (ne) {
              D(ne, G);
            });
          var j =
            G.form.attr("aria-label") || G.form.attr("data-name") || "Form";
          G.done.attr("aria-label") || G.form.attr("aria-label", j),
            G.done.attr("tabindex", "-1"),
            G.done.attr("role", "region"),
            G.done.attr("aria-label") ||
              G.done.attr("aria-label", j + " success"),
            G.fail.attr("tabindex", "-1"),
            G.fail.attr("role", "region"),
            G.fail.attr("aria-label") ||
              G.fail.attr("aria-label", j + " failure");
          var oe = (G.action = K.attr("action"));
          if (
            ((G.handler = null),
            (G.redirect = K.attr("data-redirect")),
            w.test(oe))
          ) {
            G.handler = v;
            return;
          }
          if (!oe) {
            if (u) {
              G.handler = (() => {
                let ne = k_().default;
                return ne(P, o, Ri, Z, F, H, d, X, L, u, R, e, b);
              })();
              return;
            }
            m();
          }
        }
        function N() {
          (h = !0),
            n.on("submit", a + " form", function (ne) {
              var re = e.data(this, a);
              re.handler && ((re.evt = ne), re.handler(re));
            });
          let q = ".w-checkbox-input",
            V = ".w-radio-input",
            K = "w--redirected-checked",
            G = "w--redirected-focus",
            M = "w--redirected-focus-visible",
            j = ":focus-visible, [data-wf-focus-visible]",
            oe = [
              ["checkbox", q],
              ["radio", V],
            ];
          n.on(
            "change",
            a + ' form input[type="checkbox"]:not(' + q + ")",
            (ne) => {
              e(ne.target).siblings(q).toggleClass(K);
            }
          ),
            n.on("change", a + ' form input[type="radio"]', (ne) => {
              e(`input[name="${ne.target.name}"]:not(${q})`).map((pe, ct) =>
                e(ct).siblings(V).removeClass(K)
              );
              let re = e(ne.target);
              re.hasClass("w-radio-input") || re.siblings(V).addClass(K);
            }),
            oe.forEach(([ne, re]) => {
              n.on(
                "focus",
                a + ` form input[type="${ne}"]:not(` + re + ")",
                (pe) => {
                  e(pe.target).siblings(re).addClass(G),
                    e(pe.target).filter(j).siblings(re).addClass(M);
                }
              ),
                n.on(
                  "blur",
                  a + ` form input[type="${ne}"]:not(` + re + ")",
                  (pe) => {
                    e(pe.target).siblings(re).removeClass(`${G} ${M}`);
                  }
                );
            });
        }
        function P(q) {
          var V = (q.btn = q.form.find(':input[type="submit"]'));
          (q.wait = q.btn.attr("data-wait") || null),
            (q.success = !1),
            V.prop("disabled", !1),
            q.label && V.val(q.label);
        }
        function L(q) {
          var V = q.btn,
            K = q.wait;
          V.prop("disabled", !0), K && ((q.label = V.val()), V.val(K));
        }
        function H(q, V) {
          var K = null;
          return (
            (V = V || {}),
            q
              .find(':input:not([type="submit"]):not([type="file"])')
              .each(function (G, M) {
                var j = e(M),
                  oe = j.attr("type"),
                  ne =
                    j.attr("data-name") || j.attr("name") || "Field " + (G + 1);
                ne = encodeURIComponent(ne);
                var re = j.val();
                if (oe === "checkbox") re = j.is(":checked");
                else if (oe === "radio") {
                  if (V[ne] === null || typeof V[ne] == "string") return;
                  re =
                    q
                      .find('input[name="' + j.attr("name") + '"]:checked')
                      .val() || null;
                }
                typeof re == "string" && (re = e.trim(re)),
                  (V[ne] = re),
                  (K = K || k(j, oe, ne, re));
              }),
            K
          );
        }
        function X(q) {
          var V = {};
          return (
            q.find(':input[type="file"]').each(function (K, G) {
              var M = e(G),
                j = M.attr("data-name") || M.attr("name") || "File " + (K + 1),
                oe = M.attr("data-value");
              typeof oe == "string" && (oe = e.trim(oe)), (V[j] = oe);
            }),
            V
          );
        }
        let z = { _mkto_trk: "marketo" };
        function Z() {
          return document.cookie.split("; ").reduce(function (V, K) {
            let G = K.split("="),
              M = G[0];
            if (M in z) {
              let j = z[M],
                oe = G.slice(1).join("=");
              V[j] = oe;
            }
            return V;
          }, {});
        }
        function k(q, V, K, G) {
          var M = null;
          return (
            V === "password"
              ? (M = "Passwords cannot be submitted.")
              : q.attr("required")
              ? G
                ? l.test(q.attr("type")) &&
                  (g.test(G) ||
                    (M = "Please enter a valid email address for: " + K))
                : (M = "Please fill out the required field: " + K)
              : K === "g-recaptcha-response" &&
                !G &&
                (M = "Please confirm you\u2019re not a robot."),
            M
          );
        }
        function x(q) {
          F(q), R(q);
        }
        function v(q) {
          P(q);
          var V = q.form,
            K = {};
          if (/^https/.test(o.href) && !/^https/.test(q.action)) {
            V.attr("method", "post");
            return;
          }
          F(q);
          var G = H(V, K);
          if (G) return d(G);
          L(q);
          var M;
          t.each(K, function (re, pe) {
            l.test(pe) && (K.EMAIL = re),
              /^((full[ _-]?)?name)$/i.test(pe) && (M = re),
              /^(first[ _-]?name)$/i.test(pe) && (K.FNAME = re),
              /^(last[ _-]?name)$/i.test(pe) && (K.LNAME = re);
          }),
            M &&
              !K.FNAME &&
              ((M = M.split(" ")),
              (K.FNAME = M[0]),
              (K.LNAME = K.LNAME || M[1]));
          var j = q.action.replace("/post?", "/post-json?") + "&c=?",
            oe = j.indexOf("u=") + 2;
          oe = j.substring(oe, j.indexOf("&", oe));
          var ne = j.indexOf("id=") + 3;
          (ne = j.substring(ne, j.indexOf("&", ne))),
            (K["b_" + oe + "_" + ne] = ""),
            e
              .ajax({ url: j, data: K, dataType: "jsonp" })
              .done(function (re) {
                (q.success = re.result === "success" || /already/.test(re.msg)),
                  q.success || console.info("MailChimp error: " + re.msg),
                  R(q);
              })
              .fail(function () {
                R(q);
              });
        }
        function R(q) {
          var V = q.form,
            K = q.redirect,
            G = q.success;
          if (G && K) {
            Ri.location(K);
            return;
          }
          q.done.toggle(G),
            q.fail.toggle(!G),
            G ? q.done.focus() : q.fail.focus(),
            V.toggle(!G),
            P(q);
        }
        function F(q) {
          q.evt && q.evt.preventDefault(), (q.evt = null);
        }
        function D(q, V) {
          if (!V.fileUploads || !V.fileUploads[q]) return;
          var K,
            G = e(V.fileUploads[q]),
            M = G.find("> .w-file-upload-default"),
            j = G.find("> .w-file-upload-uploading"),
            oe = G.find("> .w-file-upload-success"),
            ne = G.find("> .w-file-upload-error"),
            re = M.find(".w-file-upload-input"),
            pe = M.find(".w-file-upload-label"),
            ct = pe.children(),
            le = ne.find(".w-file-upload-error-msg"),
            y = oe.find(".w-file-upload-file"),
            U = oe.find(".w-file-remove-link"),
            Y = y.find(".w-file-upload-file-name"),
            W = le.attr("data-w-size-error"),
            ve = le.attr("data-w-type-error"),
            xt = le.attr("data-w-generic-error");
          if (
            (p ||
              pe.on("click keydown", function (T) {
                (T.type === "keydown" && T.which !== 13 && T.which !== 32) ||
                  (T.preventDefault(), re.click());
              }),
            pe.find(".w-icon-file-upload-icon").attr("aria-hidden", "true"),
            U.find(".w-icon-file-upload-remove").attr("aria-hidden", "true"),
            p)
          )
            re.on("click", function (T) {
              T.preventDefault();
            }),
              pe.on("click", function (T) {
                T.preventDefault();
              }),
              ct.on("click", function (T) {
                T.preventDefault();
              });
          else {
            U.on("click keydown", function (T) {
              if (T.type === "keydown") {
                if (T.which !== 13 && T.which !== 32) return;
                T.preventDefault();
              }
              re.removeAttr("data-value"),
                re.val(""),
                Y.html(""),
                M.toggle(!0),
                oe.toggle(!1),
                pe.focus();
            }),
              re.on("change", function (T) {
                (K = T.target && T.target.files && T.target.files[0]),
                  K &&
                    (M.toggle(!1),
                    ne.toggle(!1),
                    j.toggle(!0),
                    j.focus(),
                    Y.text(K.name),
                    A() || L(V),
                    (V.fileUploads[q].uploading = !0),
                    J(K, E));
              });
            var lt = pe.outerHeight();
            re.height(lt), re.width(1);
          }
          function f(T) {
            var S = T.responseJSON && T.responseJSON.msg,
              Q = xt;
            typeof S == "string" && S.indexOf("InvalidFileTypeError") === 0
              ? (Q = ve)
              : typeof S == "string" &&
                S.indexOf("MaxFileSizeError") === 0 &&
                (Q = W),
              le.text(Q),
              re.removeAttr("data-value"),
              re.val(""),
              j.toggle(!1),
              M.toggle(!0),
              ne.toggle(!0),
              ne.focus(),
              (V.fileUploads[q].uploading = !1),
              A() || P(V);
          }
          function E(T, S) {
            if (T) return f(T);
            var Q = S.fileName,
              ie = S.postData,
              ge = S.fileId,
              B = S.s3Url;
            re.attr("data-value", ge), ee(B, ie, K, Q, I);
          }
          function I(T) {
            if (T) return f(T);
            j.toggle(!1),
              oe.css("display", "inline-block"),
              oe.focus(),
              (V.fileUploads[q].uploading = !1),
              A() || P(V);
          }
          function A() {
            var T = (V.fileUploads && V.fileUploads.toArray()) || [];
            return T.some(function (S) {
              return S.uploading;
            });
          }
        }
        function J(q, V) {
          var K = new URLSearchParams({ name: q.name, size: q.size });
          e.ajax({ type: "GET", url: `${_}?${K}`, crossDomain: !0 })
            .done(function (G) {
              V(null, G);
            })
            .fail(function (G) {
              V(G);
            });
        }
        function ee(q, V, K, G, M) {
          var j = new FormData();
          for (var oe in V) j.append(oe, V[oe]);
          j.append("file", K, G),
            e
              .ajax({
                type: "POST",
                url: q,
                data: j,
                processData: !1,
                contentType: !1,
              })
              .done(function () {
                M(null);
              })
              .fail(function (ne) {
                M(ne);
              });
        }
        return r;
      })
    );
  });
  var B_ = c((sz, U_) => {
    "use strict";
    var At = Ue(),
      qU = ln(),
      xe = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      };
    At.define(
      "navbar",
      (U_.exports = function (e, t) {
        var r = {},
          n = e.tram,
          i = e(window),
          o = e(document),
          s = t.debounce,
          a,
          u,
          l,
          g,
          d = At.env(),
          p = '<div class="w-nav-overlay" data-wf-ignore />',
          h = ".w-nav",
          b = "w--open",
          _ = "w--nav-dropdown-open",
          w = "w--nav-dropdown-toggle-open",
          m = "w--nav-dropdown-list-open",
          C = "w--nav-link-open",
          O = qU.triggers,
          N = e();
        (r.ready = r.design = r.preview = P),
          (r.destroy = function () {
            (N = e()), L(), u && u.length && u.each(Z);
          });
        function P() {
          (l = d && At.env("design")),
            (g = At.env("editor")),
            (a = e(document.body)),
            (u = o.find(h)),
            u.length && (u.each(z), L(), H());
        }
        function L() {
          At.resize.off(X);
        }
        function H() {
          At.resize.on(X);
        }
        function X() {
          u.each(M);
        }
        function z(y, U) {
          var Y = e(U),
            W = e.data(U, h);
          W ||
            (W = e.data(U, h, {
              open: !1,
              el: Y,
              config: {},
              selectedIdx: -1,
            })),
            (W.menu = Y.find(".w-nav-menu")),
            (W.links = W.menu.find(".w-nav-link")),
            (W.dropdowns = W.menu.find(".w-dropdown")),
            (W.dropdownToggle = W.menu.find(".w-dropdown-toggle")),
            (W.dropdownList = W.menu.find(".w-dropdown-list")),
            (W.button = Y.find(".w-nav-button")),
            (W.container = Y.find(".w-container")),
            (W.overlayContainerId = "w-nav-overlay-" + y),
            (W.outside = K(W));
          var ve = Y.find(".w-nav-brand");
          ve &&
            ve.attr("href") === "/" &&
            ve.attr("aria-label") == null &&
            ve.attr("aria-label", "home"),
            W.button.attr("style", "-webkit-user-select: text;"),
            W.button.attr("aria-label") == null &&
              W.button.attr("aria-label", "menu"),
            W.button.attr("role", "button"),
            W.button.attr("tabindex", "0"),
            W.button.attr("aria-controls", W.overlayContainerId),
            W.button.attr("aria-haspopup", "menu"),
            W.button.attr("aria-expanded", "false"),
            W.el.off(h),
            W.button.off(h),
            W.menu.off(h),
            v(W),
            l
              ? (k(W), W.el.on("setting" + h, R(W)))
              : (x(W),
                W.button.on("click" + h, q(W)),
                W.menu.on("click" + h, "a", V(W)),
                W.button.on("keydown" + h, F(W)),
                W.el.on("keydown" + h, D(W))),
            M(y, U);
        }
        function Z(y, U) {
          var Y = e.data(U, h);
          Y && (k(Y), e.removeData(U, h));
        }
        function k(y) {
          y.overlay && (le(y, !0), y.overlay.remove(), (y.overlay = null));
        }
        function x(y) {
          y.overlay ||
            ((y.overlay = e(p).appendTo(y.el)),
            y.overlay.attr("id", y.overlayContainerId),
            (y.parent = y.menu.parent()),
            le(y, !0));
        }
        function v(y) {
          var U = {},
            Y = y.config || {},
            W = (U.animation = y.el.attr("data-animation") || "default");
          (U.animOver = /^over/.test(W)),
            (U.animDirect = /left$/.test(W) ? -1 : 1),
            Y.animation !== W && y.open && t.defer(ee, y),
            (U.easing = y.el.attr("data-easing") || "ease"),
            (U.easing2 = y.el.attr("data-easing2") || "ease");
          var ve = y.el.attr("data-duration");
          (U.duration = ve != null ? Number(ve) : 400),
            (U.docHeight = y.el.attr("data-doc-height")),
            (y.config = U);
        }
        function R(y) {
          return function (U, Y) {
            Y = Y || {};
            var W = i.width();
            v(y),
              Y.open === !0 && pe(y, !0),
              Y.open === !1 && le(y, !0),
              y.open &&
                t.defer(function () {
                  W !== i.width() && ee(y);
                });
          };
        }
        function F(y) {
          return function (U) {
            switch (U.keyCode) {
              case xe.SPACE:
              case xe.ENTER:
                return q(y)(), U.preventDefault(), U.stopPropagation();
              case xe.ESCAPE:
                return le(y), U.preventDefault(), U.stopPropagation();
              case xe.ARROW_RIGHT:
              case xe.ARROW_DOWN:
              case xe.HOME:
              case xe.END:
                return y.open
                  ? (U.keyCode === xe.END
                      ? (y.selectedIdx = y.links.length - 1)
                      : (y.selectedIdx = 0),
                    J(y),
                    U.preventDefault(),
                    U.stopPropagation())
                  : (U.preventDefault(), U.stopPropagation());
            }
          };
        }
        function D(y) {
          return function (U) {
            if (y.open)
              switch (
                ((y.selectedIdx = y.links.index(document.activeElement)),
                U.keyCode)
              ) {
                case xe.HOME:
                case xe.END:
                  return (
                    U.keyCode === xe.END
                      ? (y.selectedIdx = y.links.length - 1)
                      : (y.selectedIdx = 0),
                    J(y),
                    U.preventDefault(),
                    U.stopPropagation()
                  );
                case xe.ESCAPE:
                  return (
                    le(y),
                    y.button.focus(),
                    U.preventDefault(),
                    U.stopPropagation()
                  );
                case xe.ARROW_LEFT:
                case xe.ARROW_UP:
                  return (
                    (y.selectedIdx = Math.max(-1, y.selectedIdx - 1)),
                    J(y),
                    U.preventDefault(),
                    U.stopPropagation()
                  );
                case xe.ARROW_RIGHT:
                case xe.ARROW_DOWN:
                  return (
                    (y.selectedIdx = Math.min(
                      y.links.length - 1,
                      y.selectedIdx + 1
                    )),
                    J(y),
                    U.preventDefault(),
                    U.stopPropagation()
                  );
              }
          };
        }
        function J(y) {
          if (y.links[y.selectedIdx]) {
            var U = y.links[y.selectedIdx];
            U.focus(), V(U);
          }
        }
        function ee(y) {
          y.open && (le(y, !0), pe(y, !0));
        }
        function q(y) {
          return s(function () {
            y.open ? le(y) : pe(y);
          });
        }
        function V(y) {
          return function (U) {
            var Y = e(this),
              W = Y.attr("href");
            if (!At.validClick(U.currentTarget)) {
              U.preventDefault();
              return;
            }
            W && W.indexOf("#") === 0 && y.open && le(y);
          };
        }
        function K(y) {
          return (
            y.outside && o.off("click" + h, y.outside),
            function (U) {
              var Y = e(U.target);
              (g && Y.closest(".w-editor-bem-EditorOverlay").length) || G(y, Y);
            }
          );
        }
        var G = s(function (y, U) {
          if (y.open) {
            var Y = U.closest(".w-nav-menu");
            y.menu.is(Y) || le(y);
          }
        });
        function M(y, U) {
          var Y = e.data(U, h),
            W = (Y.collapsed = Y.button.css("display") !== "none");
          if ((Y.open && !W && !l && le(Y, !0), Y.container.length)) {
            var ve = oe(Y);
            Y.links.each(ve), Y.dropdowns.each(ve);
          }
          Y.open && ct(Y);
        }
        var j = "max-width";
        function oe(y) {
          var U = y.container.css(j);
          return (
            U === "none" && (U = ""),
            function (Y, W) {
              (W = e(W)), W.css(j, ""), W.css(j) === "none" && W.css(j, U);
            }
          );
        }
        function ne(y, U) {
          U.setAttribute("data-nav-menu-open", "");
        }
        function re(y, U) {
          U.removeAttribute("data-nav-menu-open");
        }
        function pe(y, U) {
          if (y.open) return;
          (y.open = !0),
            y.menu.each(ne),
            y.links.addClass(C),
            y.dropdowns.addClass(_),
            y.dropdownToggle.addClass(w),
            y.dropdownList.addClass(m),
            y.button.addClass(b);
          var Y = y.config,
            W = Y.animation;
          (W === "none" || !n.support.transform || Y.duration <= 0) && (U = !0);
          var ve = ct(y),
            xt = y.menu.outerHeight(!0),
            lt = y.menu.outerWidth(!0),
            f = y.el.height(),
            E = y.el[0];
          if (
            (M(0, E),
            O.intro(0, E),
            At.redraw.up(),
            l || o.on("click" + h, y.outside),
            U)
          ) {
            T();
            return;
          }
          var I = "transform " + Y.duration + "ms " + Y.easing;
          if (
            (y.overlay &&
              ((N = y.menu.prev()), y.overlay.show().append(y.menu)),
            Y.animOver)
          ) {
            n(y.menu)
              .add(I)
              .set({ x: Y.animDirect * lt, height: ve })
              .start({ x: 0 })
              .then(T),
              y.overlay && y.overlay.width(lt);
            return;
          }
          var A = f + xt;
          n(y.menu).add(I).set({ y: -A }).start({ y: 0 }).then(T);
          function T() {
            y.button.attr("aria-expanded", "true");
          }
        }
        function ct(y) {
          var U = y.config,
            Y = U.docHeight ? o.height() : a.height();
          return (
            U.animOver
              ? y.menu.height(Y)
              : y.el.css("position") !== "fixed" && (Y -= y.el.outerHeight(!0)),
            y.overlay && y.overlay.height(Y),
            Y
          );
        }
        function le(y, U) {
          if (!y.open) return;
          (y.open = !1), y.button.removeClass(b);
          var Y = y.config;
          if (
            ((Y.animation === "none" ||
              !n.support.transform ||
              Y.duration <= 0) &&
              (U = !0),
            O.outro(0, y.el[0]),
            o.off("click" + h, y.outside),
            U)
          ) {
            n(y.menu).stop(), E();
            return;
          }
          var W = "transform " + Y.duration + "ms " + Y.easing2,
            ve = y.menu.outerHeight(!0),
            xt = y.menu.outerWidth(!0),
            lt = y.el.height();
          if (Y.animOver) {
            n(y.menu)
              .add(W)
              .start({ x: xt * Y.animDirect })
              .then(E);
            return;
          }
          var f = lt + ve;
          n(y.menu).add(W).start({ y: -f }).then(E);
          function E() {
            y.menu.height(""),
              n(y.menu).set({ x: 0, y: 0 }),
              y.menu.each(re),
              y.links.removeClass(C),
              y.dropdowns.removeClass(_),
              y.dropdownToggle.removeClass(w),
              y.dropdownList.removeClass(m),
              y.overlay &&
                y.overlay.children().length &&
                (N.length ? y.menu.insertAfter(N) : y.menu.prependTo(y.parent),
                y.overlay.attr("style", "").hide()),
              y.el.triggerHandler("w-close"),
              y.button.attr("aria-expanded", "false");
          }
        }
        return r;
      })
    );
  });
  var W_ = c((uz, H_) => {
    "use strict";
    var St = Ue(),
      FU = ln();
    St.define(
      "tabs",
      (H_.exports = function (e) {
        var t = {},
          r = e.tram,
          n = e(document),
          i,
          o,
          s = St.env,
          a = s.safari,
          u = s(),
          l = "data-w-tab",
          g = "data-w-pane",
          d = ".w-tabs",
          p = "w--current",
          h = "w--tab-active",
          b = FU.triggers,
          _ = !1;
        (t.ready = t.design = t.preview = w),
          (t.redraw = function () {
            (_ = !0), w(), (_ = !1);
          }),
          (t.destroy = function () {
            (i = n.find(d)), i.length && (i.each(O), m());
          });
        function w() {
          (o = u && St.env("design")),
            (i = n.find(d)),
            i.length &&
              (i.each(N), St.env("preview") && !_ && i.each(O), m(), C());
        }
        function m() {
          St.redraw.off(t.redraw);
        }
        function C() {
          St.redraw.on(t.redraw);
        }
        function O(k, x) {
          var v = e.data(x, d);
          v &&
            (v.links && v.links.each(b.reset),
            v.panes && v.panes.each(b.reset));
        }
        function N(k, x) {
          var v = d.substr(1) + "-" + k,
            R = e(x),
            F = e.data(x, d);
          if (
            (F || (F = e.data(x, d, { el: R, config: {} })),
            (F.current = null),
            (F.tabIdentifier = v + "-" + l),
            (F.paneIdentifier = v + "-" + g),
            (F.menu = R.children(".w-tab-menu")),
            (F.links = F.menu.children(".w-tab-link")),
            (F.content = R.children(".w-tab-content")),
            (F.panes = F.content.children(".w-tab-pane")),
            F.el.off(d),
            F.links.off(d),
            F.menu.attr("role", "tablist"),
            F.links.attr("tabindex", "-1"),
            P(F),
            !o)
          ) {
            F.links.on("click" + d, H(F)), F.links.on("keydown" + d, X(F));
            var D = F.links.filter("." + p),
              J = D.attr(l);
            J && z(F, { tab: J, immediate: !0 });
          }
        }
        function P(k) {
          var x = {};
          x.easing = k.el.attr("data-easing") || "ease";
          var v = parseInt(k.el.attr("data-duration-in"), 10);
          v = x.intro = v === v ? v : 0;
          var R = parseInt(k.el.attr("data-duration-out"), 10);
          (R = x.outro = R === R ? R : 0),
            (x.immediate = !v && !R),
            (k.config = x);
        }
        function L(k) {
          var x = k.current;
          return Array.prototype.findIndex.call(
            k.links,
            (v) => v.getAttribute(l) === x,
            null
          );
        }
        function H(k) {
          return function (x) {
            x.preventDefault();
            var v = x.currentTarget.getAttribute(l);
            v && z(k, { tab: v });
          };
        }
        function X(k) {
          return function (x) {
            var v = L(k),
              R = x.key,
              F = {
                ArrowLeft: v - 1,
                ArrowUp: v - 1,
                ArrowRight: v + 1,
                ArrowDown: v + 1,
                End: k.links.length - 1,
                Home: 0,
              };
            if (R in F) {
              x.preventDefault();
              var D = F[R];
              D === -1 && (D = k.links.length - 1),
                D === k.links.length && (D = 0);
              var J = k.links[D],
                ee = J.getAttribute(l);
              ee && z(k, { tab: ee });
            }
          };
        }
        function z(k, x) {
          x = x || {};
          var v = k.config,
            R = v.easing,
            F = x.tab;
          if (F !== k.current) {
            k.current = F;
            var D;
            k.links.each(function (M, j) {
              var oe = e(j);
              if (x.immediate || v.immediate) {
                var ne = k.panes[M];
                j.id || (j.id = k.tabIdentifier + "-" + M),
                  ne.id || (ne.id = k.paneIdentifier + "-" + M),
                  (j.href = "#" + ne.id),
                  j.setAttribute("role", "tab"),
                  j.setAttribute("aria-controls", ne.id),
                  j.setAttribute("aria-selected", "false"),
                  ne.setAttribute("role", "tabpanel"),
                  ne.setAttribute("aria-labelledby", j.id);
              }
              j.getAttribute(l) === F
                ? ((D = j),
                  oe
                    .addClass(p)
                    .removeAttr("tabindex")
                    .attr({ "aria-selected": "true" })
                    .each(b.intro))
                : oe.hasClass(p) &&
                  oe
                    .removeClass(p)
                    .attr({ tabindex: "-1", "aria-selected": "false" })
                    .each(b.outro);
            });
            var J = [],
              ee = [];
            k.panes.each(function (M, j) {
              var oe = e(j);
              j.getAttribute(l) === F
                ? J.push(j)
                : oe.hasClass(h) && ee.push(j);
            });
            var q = e(J),
              V = e(ee);
            if (x.immediate || v.immediate) {
              q.addClass(h).each(b.intro),
                V.removeClass(h),
                _ || St.redraw.up();
              return;
            } else {
              var K = window.scrollX,
                G = window.scrollY;
              D.focus(), window.scrollTo(K, G);
            }
            V.length && v.outro
              ? (V.each(b.outro),
                r(V)
                  .add("opacity " + v.outro + "ms " + R, { fallback: a })
                  .start({ opacity: 0 })
                  .then(() => Z(v, V, q)))
              : Z(v, V, q);
          }
        }
        function Z(k, x, v) {
          if (
            (x
              .removeClass(h)
              .css({
                opacity: "",
                transition: "",
                transform: "",
                width: "",
                height: "",
              }),
            v.addClass(h).each(b.intro),
            St.redraw.up(),
            !k.intro)
          )
            return r(v).set({ opacity: 1 });
          r(v)
            .set({ opacity: 0 })
            .redraw()
            .add("opacity " + k.intro + "ms " + k.easing, { fallback: a })
            .start({ opacity: 1 });
        }
        return t;
      })
    );
  });
  Ns();
  Ps();
  js();
  Ks();
  $s();
  Js();
  ln();
  L_();
  P_();
  F_();
  D_();
  V_();
  B_();
  W_();
})();
/*!
 * tram.js v0.8.2-global
 * Cross-browser CSS3 transitions in JavaScript
 * https://github.com/bkwld/tram
 * MIT License
 */
/*!
 * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
 *
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Underscore may be freely distributed under the MIT license.
 * @license MIT
 */
/*! Bundled license information:

timm/lib/timm.js:
  (*!
   * Timm
   *
   * Immutability helpers with fast reads and acceptable writes.
   *
   * @copyright Guillermo Grau Panea 2016
   * @license MIT
   *)
*/
/**
 * ----------------------------------------------------------------------
 * Webflow: Interactions 2.0: Init
 */
Webflow.require("ix2").init({
  events: {
    "e-30": {
      id: "e-30",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-76",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-93",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "d9662ec0-5376-5684-d7dd-bdaaac572a7d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "d9662ec0-5376-5684-d7dd-bdaaac572a7d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692205307930,
    },
    "e-31": {
      id: "e-31",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-76",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-30",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "d9662ec0-5376-5684-d7dd-bdaaac572a7d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "d9662ec0-5376-5684-d7dd-bdaaac572a7d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692205307930,
    },
    "e-36": {
      id: "e-36",
      name: "",
      animationType: "custom",
      eventTypeId: "NAVBAR_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-10",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-247",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "d9662ec0-5376-5684-d7dd-bdaaac572a5b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "d9662ec0-5376-5684-d7dd-bdaaac572a5b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692221665095,
    },
    "e-37": {
      id: "e-37",
      name: "",
      animationType: "custom",
      eventTypeId: "NAVBAR_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-11",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-36",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "d9662ec0-5376-5684-d7dd-bdaaac572a5b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "d9662ec0-5376-5684-d7dd-bdaaac572a5b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692221665096,
    },
    "e-45": {
      id: "e-45",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-46",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "b2ad0d73-e5d4-a19e-c533-dc7c15ceea89",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "b2ad0d73-e5d4-a19e-c533-dc7c15ceea89",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692277916939,
    },
    "e-46": {
      id: "e-46",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-45",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "b2ad0d73-e5d4-a19e-c533-dc7c15ceea89",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "b2ad0d73-e5d4-a19e-c533-dc7c15ceea89",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692277916939,
    },
    "e-47": {
      id: "e-47",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-48",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "b2ad0d73-e5d4-a19e-c533-dc7c15ceea8c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "b2ad0d73-e5d4-a19e-c533-dc7c15ceea8c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692277916939,
    },
    "e-114": {
      id: "e-114",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-95" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".wrap_faq-2",
        originalId: "ae07735c-f015-a2c3-764e-bde487ab940d",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".wrap_faq-2",
          originalId: "ae07735c-f015-a2c3-764e-bde487ab940d",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1690963805536,
    },
    "e-157": {
      id: "e-157",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-34", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-34-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1692565877508,
    },
    "e-172": {
      id: "e-172",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-35", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dfe",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dfe",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-35-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1692617247063,
    },
    "e-173": {
      id: "e-173",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-174",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dfe|9753625d-442a-d5d3-1188-1c070ffe6919",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dfe|9753625d-442a-d5d3-1188-1c070ffe6919",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692617749212,
    },
    "e-174": {
      id: "e-174",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-33",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-173",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dfe|9753625d-442a-d5d3-1188-1c070ffe6919",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dfe|9753625d-442a-d5d3-1188-1c070ffe6919",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692617749212,
    },
    "e-175": {
      id: "e-175",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-36",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-176",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "d50656fc-6404-aeea-2173-eb0abc5b894e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "d50656fc-6404-aeea-2173-eb0abc5b894e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692788166087,
    },
    "e-177": {
      id: "e-177",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-36",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-178",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "d50656fc-6404-aeea-2173-eb0abc5b8951",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "d50656fc-6404-aeea-2173-eb0abc5b8951",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692788166087,
    },
    "e-179": {
      id: "e-179",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-180",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "d9662ec0-5376-5684-d7dd-bdaaac572a66",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "d9662ec0-5376-5684-d7dd-bdaaac572a66",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692789850203,
    },
    "e-180": {
      id: "e-180",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-179",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "d9662ec0-5376-5684-d7dd-bdaaac572a66",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "d9662ec0-5376-5684-d7dd-bdaaac572a66",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692789850204,
    },
    "e-181": {
      id: "e-181",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-41",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-182",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "38ac6dd6-4707-bfcb-ed67-c53ca0324ad1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "38ac6dd6-4707-bfcb-ed67-c53ca0324ad1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692790351498,
    },
    "e-182": {
      id: "e-182",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-41",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-181",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "38ac6dd6-4707-bfcb-ed67-c53ca0324ad1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "38ac6dd6-4707-bfcb-ed67-c53ca0324ad1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692790351499,
    },
    "e-183": {
      id: "e-183",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-41",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-184",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "38ac6dd6-4707-bfcb-ed67-c53ca0324ad4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "38ac6dd6-4707-bfcb-ed67-c53ca0324ad4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692790491281,
    },
    "e-185": {
      id: "e-185",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-42",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-186",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "9ffb0b45-1306-0029-5aa5-0bab0be08360",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "9ffb0b45-1306-0029-5aa5-0bab0be08360",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692790523467,
    },
    "e-186": {
      id: "e-186",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-42",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-185",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "9ffb0b45-1306-0029-5aa5-0bab0be08360",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "9ffb0b45-1306-0029-5aa5-0bab0be08360",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692790523468,
    },
    "e-187": {
      id: "e-187",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-42",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-188",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "9ffb0b45-1306-0029-5aa5-0bab0be08363",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "9ffb0b45-1306-0029-5aa5-0bab0be08363",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692790531971,
    },
    "e-189": {
      id: "e-189",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-43",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-190",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "b2ad0d73-e5d4-a19e-c533-dc7c15ceeaaa",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "b2ad0d73-e5d4-a19e-c533-dc7c15ceeaaa",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692790682348,
    },
    "e-191": {
      id: "e-191",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-44",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-192",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "38ac6dd6-4707-bfcb-ed67-c53ca0324aec",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "38ac6dd6-4707-bfcb-ed67-c53ca0324aec",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692792350806,
    },
    "e-193": {
      id: "e-193",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-45",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-194",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "38ac6dd6-4707-bfcb-ed67-c53ca0324ae6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "38ac6dd6-4707-bfcb-ed67-c53ca0324ae6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692792492499,
    },
    "e-195": {
      id: "e-195",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-46",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-196",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "9ffb0b45-1306-0029-5aa5-0bab0be08372",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "9ffb0b45-1306-0029-5aa5-0bab0be08372",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692799802306,
    },
    "e-197": {
      id: "e-197",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-47", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e59",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e59",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-47-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1692802857273,
    },
    "e-198": {
      id: "e-198",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        instant: false,
        config: { actionListId: "growIn", autoStopEventId: "e-199" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".modal",
        originalId:
          "6479c64eafd3d46ed50e5843|c10025c7-461b-5640-3fb1-2acd4fed5d74",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".modal",
          originalId:
            "6479c64eafd3d46ed50e5843|c10025c7-461b-5640-3fb1-2acd4fed5d74",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 500,
        direction: null,
        effectIn: true,
      },
      createdOn: 1685702237862,
    },
    "e-200": {
      id: "e-200",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-48", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e28",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e28",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-48-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1692815103361,
    },
    "e-201": {
      id: "e-201",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-202",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e28|abab0730-cd62-e127-2be6-6f4fb170d3a3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e28|abab0730-cd62-e127-2be6-6f4fb170d3a3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692815278427,
    },
    "e-202": {
      id: "e-202",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-201",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e28|abab0730-cd62-e127-2be6-6f4fb170d3a3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e28|abab0730-cd62-e127-2be6-6f4fb170d3a3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692815278428,
    },
    "e-230": {
      id: "e-230",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-54",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-231",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "1a633a25-0823-68cf-5889-2b3c3bee8236",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "1a633a25-0823-68cf-5889-2b3c3bee8236",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692871477038,
    },
    "e-231": {
      id: "e-231",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-55",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-230",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "1a633a25-0823-68cf-5889-2b3c3bee8236",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "1a633a25-0823-68cf-5889-2b3c3bee8236",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692871477040,
    },
    "e-232": {
      id: "e-232",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-233",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e57|60ffae41-c320-5404-53ab-9a14315198cd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e57|60ffae41-c320-5404-53ab-9a14315198cd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692872604420,
    },
    "e-233": {
      id: "e-233",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-232",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e57|60ffae41-c320-5404-53ab-9a14315198cd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e57|60ffae41-c320-5404-53ab-9a14315198cd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692872604420,
    },
    "e-236": {
      id: "e-236",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-237",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e1f|60ffae41-c320-5404-53ab-9a14315198cd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e1f|60ffae41-c320-5404-53ab-9a14315198cd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692960865318,
    },
    "e-237": {
      id: "e-237",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-236",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e1f|60ffae41-c320-5404-53ab-9a14315198cd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e1f|60ffae41-c320-5404-53ab-9a14315198cd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692960865318,
    },
    "e-247": {
      id: "e-247",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-56",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-250",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".edit-profile",
        originalId:
          "65e99f481cdee511e5862e57|f8ab1419-a81e-24bd-e5c3-bedcafe18d7a",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".edit-profile",
          originalId:
            "65e99f481cdee511e5862e57|f8ab1419-a81e-24bd-e5c3-bedcafe18d7a",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1688454414630,
    },
    "e-252": {
      id: "e-252",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-57",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-253",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".save-button",
        originalId:
          "65e99f481cdee511e5862e57|f8ab1419-a81e-24bd-e5c3-bedcafe18d7d",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".save-button",
          originalId:
            "65e99f481cdee511e5862e57|f8ab1419-a81e-24bd-e5c3-bedcafe18d7d",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1688454414630,
    },
    "e-257": {
      id: "e-257",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-61",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-264",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".modal_close",
        originalId:
          "633edbaee14b60dd1ce3f164|bea631ae-7094-f997-fa9a-0cd3d03ffb27",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".modal_close",
          originalId:
            "633edbaee14b60dd1ce3f164|bea631ae-7094-f997-fa9a-0cd3d03ffb27",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1665074964622,
    },
    "e-266": {
      id: "e-266",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-59",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-267",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".modal_open",
        originalId:
          "65e99f481cdee511e5862e57|48d9face-f773-39a5-501a-ab9900cf7eab",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".modal_open",
          originalId:
            "65e99f481cdee511e5862e57|48d9face-f773-39a5-501a-ab9900cf7eab",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1665423919834,
    },
    "e-268": {
      id: "e-268",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-67",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-269",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "54879178-c744-bc69-60ff-e2132e73311b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "54879178-c744-bc69-60ff-e2132e73311b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692995171751,
    },
    "e-269": {
      id: "e-269",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-67",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-268",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "54879178-c744-bc69-60ff-e2132e73311b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "54879178-c744-bc69-60ff-e2132e73311b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692995171751,
    },
    "e-270": {
      id: "e-270",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-67",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-271",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "54879178-c744-bc69-60ff-e2132e73311e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "54879178-c744-bc69-60ff-e2132e73311e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692995171751,
    },
    "e-274": {
      id: "e-274",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-73",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-275",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ab97100-f37a-a56f-1ab3-5046fe68bb2f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ab97100-f37a-a56f-1ab3-5046fe68bb2f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692995326717,
    },
    "e-275": {
      id: "e-275",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-73",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-274",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ab97100-f37a-a56f-1ab3-5046fe68bb2f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ab97100-f37a-a56f-1ab3-5046fe68bb2f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692995326717,
    },
    "e-280": {
      id: "e-280",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-72",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-281",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "df58c0be-7f78-ce73-e96f-1ccac539c779",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "df58c0be-7f78-ce73-e96f-1ccac539c779",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692995328057,
    },
    "e-281": {
      id: "e-281",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-72",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-280",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "df58c0be-7f78-ce73-e96f-1ccac539c779",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "df58c0be-7f78-ce73-e96f-1ccac539c779",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692995328057,
    },
    "e-286": {
      id: "e-286",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-72",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-287",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "df58c0be-7f78-ce73-e96f-1ccac539c77c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "df58c0be-7f78-ce73-e96f-1ccac539c77c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692996194965,
    },
    "e-288": {
      id: "e-288",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-45",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-289",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e57|67410394-4752-cace-8d52-db643e54f7b1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e57|67410394-4752-cace-8d52-db643e54f7b1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692996428889,
    },
    "e-290": {
      id: "e-290",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-73",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-291",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ab97100-f37a-a56f-1ab3-5046fe68bb32",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ab97100-f37a-a56f-1ab3-5046fe68bb32",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692996713696,
    },
    "e-292": {
      id: "e-292",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-69",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-293",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e57|6549916b-d8f2-881d-4004-55386d280a7b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e57|6549916b-d8f2-881d-4004-55386d280a7b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692998797066,
    },
    "e-293": {
      id: "e-293",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-69",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-292",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e57|6549916b-d8f2-881d-4004-55386d280a7b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e57|6549916b-d8f2-881d-4004-55386d280a7b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692998797067,
    },
    "e-294": {
      id: "e-294",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-70",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-295",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e57|538f7c63-86a7-f636-4f90-26a4d7183978",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e57|538f7c63-86a7-f636-4f90-26a4d7183978",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692998878331,
    },
    "e-295": {
      id: "e-295",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-70",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-294",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e57|538f7c63-86a7-f636-4f90-26a4d7183978",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e57|538f7c63-86a7-f636-4f90-26a4d7183978",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692998878333,
    },
    "e-296": {
      id: "e-296",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-71",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-297",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e57|3bee718e-d103-5d06-1934-ff13622534af",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e57|3bee718e-d103-5d06-1934-ff13622534af",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692998936327,
    },
    "e-297": {
      id: "e-297",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-71",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-296",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e57|3bee718e-d103-5d06-1934-ff13622534af",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e57|3bee718e-d103-5d06-1934-ff13622534af",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692998936329,
    },
    "e-298": {
      id: "e-298",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-299",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5d8e2155-895d-7fd6-5802-c17f11d51d19",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5d8e2155-895d-7fd6-5802-c17f11d51d19",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693662330590,
    },
    "e-299": {
      id: "e-299",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-298",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5d8e2155-895d-7fd6-5802-c17f11d51d19",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5d8e2155-895d-7fd6-5802-c17f11d51d19",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693662330591,
    },
    "e-300": {
      id: "e-300",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-74",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-301",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "cbac013e-8dc8-8059-235a-1255fb20e29f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "cbac013e-8dc8-8059-235a-1255fb20e29f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693741969775,
    },
    "e-301": {
      id: "e-301",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-74",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-300",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "cbac013e-8dc8-8059-235a-1255fb20e29f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "cbac013e-8dc8-8059-235a-1255fb20e29f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693741969775,
    },
    "e-302": {
      id: "e-302",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-74",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-303",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "cbac013e-8dc8-8059-235a-1255fb20e2a2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "cbac013e-8dc8-8059-235a-1255fb20e2a2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693741969775,
    },
    "e-304": {
      id: "e-304",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-160",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-305",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "cbac013e-8dc8-8059-235a-1255fb20e2b9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "cbac013e-8dc8-8059-235a-1255fb20e2b9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693741969775,
    },
    "e-306": {
      id: "e-306",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-307",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "7af6140a-dceb-0e36-f278-2106bfcb6b52",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "7af6140a-dceb-0e36-f278-2106bfcb6b52",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693742126269,
    },
    "e-307": {
      id: "e-307",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-306",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "7af6140a-dceb-0e36-f278-2106bfcb6b52",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "7af6140a-dceb-0e36-f278-2106bfcb6b52",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693742126269,
    },
    "e-308": {
      id: "e-308",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-309",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "7af6140a-dceb-0e36-f278-2106bfcb6b55",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "7af6140a-dceb-0e36-f278-2106bfcb6b55",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693742126269,
    },
    "e-310": {
      id: "e-310",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-75",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-311",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "7af6140a-dceb-0e36-f278-2106bfcb6b6c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "7af6140a-dceb-0e36-f278-2106bfcb6b6c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693742126269,
    },
    "e-318": {
      id: "e-318",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-319",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e58|60ffae41-c320-5404-53ab-9a14315198cd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e58|60ffae41-c320-5404-53ab-9a14315198cd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693808415059,
    },
    "e-319": {
      id: "e-319",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-318",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e58|60ffae41-c320-5404-53ab-9a14315198cd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e58|60ffae41-c320-5404-53ab-9a14315198cd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693808415059,
    },
    "e-320": {
      id: "e-320",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-45",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-321",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e58|67410394-4752-cace-8d52-db643e54f7b1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e58|67410394-4752-cace-8d52-db643e54f7b1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693808415059,
    },
    "e-322": {
      id: "e-322",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-80",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-323",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e58|6549916b-d8f2-881d-4004-55386d280a7b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e58|6549916b-d8f2-881d-4004-55386d280a7b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693808415059,
    },
    "e-323": {
      id: "e-323",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-80",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-322",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e58|6549916b-d8f2-881d-4004-55386d280a7b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e58|6549916b-d8f2-881d-4004-55386d280a7b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693808415059,
    },
    "e-324": {
      id: "e-324",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-70",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-325",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e58|538f7c63-86a7-f636-4f90-26a4d7183978",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e58|538f7c63-86a7-f636-4f90-26a4d7183978",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693808415059,
    },
    "e-325": {
      id: "e-325",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-70",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-324",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e58|538f7c63-86a7-f636-4f90-26a4d7183978",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e58|538f7c63-86a7-f636-4f90-26a4d7183978",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693808415059,
    },
    "e-326": {
      id: "e-326",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-71",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-327",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e58|3bee718e-d103-5d06-1934-ff13622534af",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e58|3bee718e-d103-5d06-1934-ff13622534af",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693808415059,
    },
    "e-327": {
      id: "e-327",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-71",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-326",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e58|3bee718e-d103-5d06-1934-ff13622534af",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e58|3bee718e-d103-5d06-1934-ff13622534af",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693808415059,
    },
    "e-328": {
      id: "e-328",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-329",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e1e|60ffae41-c320-5404-53ab-9a14315198cd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e1e|60ffae41-c320-5404-53ab-9a14315198cd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693808472347,
    },
    "e-329": {
      id: "e-329",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-328",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e1e|60ffae41-c320-5404-53ab-9a14315198cd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e1e|60ffae41-c320-5404-53ab-9a14315198cd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693808472347,
    },
    "e-332": {
      id: "e-332",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-69",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-333",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e58|3497d1ec-bbd7-8a67-2722-b04e1fc9540e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e58|3497d1ec-bbd7-8a67-2722-b04e1fc9540e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693808822267,
    },
    "e-333": {
      id: "e-333",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-69",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-332",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e58|3497d1ec-bbd7-8a67-2722-b04e1fc9540e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e58|3497d1ec-bbd7-8a67-2722-b04e1fc9540e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693808822267,
    },
    "e-334": {
      id: "e-334",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-335",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "ba37c115-1fa0-5951-8996-8c36c20edd63",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "ba37c115-1fa0-5951-8996-8c36c20edd63",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693808876157,
    },
    "e-335": {
      id: "e-335",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-334",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "ba37c115-1fa0-5951-8996-8c36c20edd63",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "ba37c115-1fa0-5951-8996-8c36c20edd63",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693808876157,
    },
    "e-336": {
      id: "e-336",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-337",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "ba37c115-1fa0-5951-8996-8c36c20edd66",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "ba37c115-1fa0-5951-8996-8c36c20edd66",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693808876157,
    },
    "e-360": {
      id: "e-360",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-88",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-361",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "0b35ddd5-d407-9b4e-b7d8-095a279079e5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "0b35ddd5-d407-9b4e-b7d8-095a279079e5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697441328027,
    },
    "e-361": {
      id: "e-361",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-88",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-360",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "0b35ddd5-d407-9b4e-b7d8-095a279079e5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "0b35ddd5-d407-9b4e-b7d8-095a279079e5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697441328029,
    },
    "e-366": {
      id: "e-366",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-367",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e5a|6a3337fa-e009-83e4-74df-f2c77241977b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e5a|6a3337fa-e009-83e4-74df-f2c77241977b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697464469583,
    },
    "e-367": {
      id: "e-367",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-366",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e5a|6a3337fa-e009-83e4-74df-f2c77241977b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e5a|6a3337fa-e009-83e4-74df-f2c77241977b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697464469584,
    },
    "e-509": {
      id: "e-509",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-92", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main"],
      target: {
        id: "65e99f481cdee511e5862dc5",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-92-p",
          selectedAxis: "X_AXIS",
          basedOn: "VIEWPORT",
          reverse: false,
          smoothing: 50,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-92-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "VIEWPORT",
          reverse: false,
          smoothing: 50,
          restingState: 50,
        },
      ],
      createdOn: 1699006818233,
    },
    "e-510": {
      id: "e-510",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-93",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-511",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699009470805,
    },
    "e-512": {
      id: "e-512",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-94", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main"],
      target: {
        id: "65e99f481cdee511e5862dc5",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-94-p",
          selectedAxis: "X_AXIS",
          basedOn: "VIEWPORT",
          reverse: false,
          smoothing: 50,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-94-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "VIEWPORT",
          reverse: false,
          smoothing: 50,
          restingState: 50,
        },
      ],
      createdOn: 1699259879479,
    },
    "e-516": {
      id: "e-516",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-95",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-517",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|a735e068-1abb-2cb0-79fa-9325b7a99718",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|a735e068-1abb-2cb0-79fa-9325b7a99718",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699260944489,
    },
    "e-518": {
      id: "e-518",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-96",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1713",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699260967258,
    },
    "e-654": {
      id: "e-654",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-115",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-655",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|a8373962-8f65-2885-c1b8-4907900e0d89",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|a8373962-8f65-2885-c1b8-4907900e0d89",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699559276346,
    },
    "e-700": {
      id: "e-700",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-95",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-701",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|a71b8915-6747-e749-13a7-8a833ead1d48",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|a71b8915-6747-e749-13a7-8a833ead1d48",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699865862125,
    },
    "e-702": {
      id: "e-702",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-97",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-703",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|a71b8915-6747-e749-13a7-8a833ead1d4f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|a71b8915-6747-e749-13a7-8a833ead1d4f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699865862125,
    },
    "e-708": {
      id: "e-708",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-98",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-709",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|a71b8915-6747-e749-13a7-8a833ead1d52",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|a71b8915-6747-e749-13a7-8a833ead1d52",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699865862125,
    },
    "e-710": {
      id: "e-710",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-102",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-711",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|a71b8915-6747-e749-13a7-8a833ead1d59",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|a71b8915-6747-e749-13a7-8a833ead1d59",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699865862125,
    },
    "e-712": {
      id: "e-712",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-99",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-713",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|a71b8915-6747-e749-13a7-8a833ead1d60",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|a71b8915-6747-e749-13a7-8a833ead1d60",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699865862125,
    },
    "e-714": {
      id: "e-714",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-100",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-715",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|a71b8915-6747-e749-13a7-8a833ead1d67",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|a71b8915-6747-e749-13a7-8a833ead1d67",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699865862125,
    },
    "e-716": {
      id: "e-716",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-115",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-717",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|a71b8915-6747-e749-13a7-8a833ead1d70",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|a71b8915-6747-e749-13a7-8a833ead1d70",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699865862125,
    },
    "e-854": {
      id: "e-854",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-95",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-855",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|92993be2-0315-bf4b-9a5c-539464fe3a1d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|92993be2-0315-bf4b-9a5c-539464fe3a1d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699866536861,
    },
    "e-856": {
      id: "e-856",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-101",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-857",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|92993be2-0315-bf4b-9a5c-539464fe3a24",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|92993be2-0315-bf4b-9a5c-539464fe3a24",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699866536861,
    },
    "e-858": {
      id: "e-858",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-103",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-859",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|92993be2-0315-bf4b-9a5c-539464fe3a29",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|92993be2-0315-bf4b-9a5c-539464fe3a29",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699866536861,
    },
    "e-860": {
      id: "e-860",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-104",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-861",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|92993be2-0315-bf4b-9a5c-539464fe3a2e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|92993be2-0315-bf4b-9a5c-539464fe3a2e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699866536861,
    },
    "e-998": {
      id: "e-998",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-95",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-999",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|46d28023-485e-c474-0dec-eb03bb357681",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|46d28023-485e-c474-0dec-eb03bb357681",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699866609866,
    },
    "e-1000": {
      id: "e-1000",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-106",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1001",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|46d28023-485e-c474-0dec-eb03bb357688",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|46d28023-485e-c474-0dec-eb03bb357688",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699866609866,
    },
    "e-1002": {
      id: "e-1002",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-107",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1003",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|46d28023-485e-c474-0dec-eb03bb357689",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|46d28023-485e-c474-0dec-eb03bb357689",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699866609866,
    },
    "e-1004": {
      id: "e-1004",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-106",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1005",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|46d28023-485e-c474-0dec-eb03bb35768a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|46d28023-485e-c474-0dec-eb03bb35768a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699866609866,
    },
    "e-1006": {
      id: "e-1006",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-108",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1007",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|46d28023-485e-c474-0dec-eb03bb35768b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|46d28023-485e-c474-0dec-eb03bb35768b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699866609866,
    },
    "e-1008": {
      id: "e-1008",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-109",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1009",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|46d28023-485e-c474-0dec-eb03bb35768c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|46d28023-485e-c474-0dec-eb03bb35768c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699866609866,
    },
    "e-1010": {
      id: "e-1010",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-109",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1011",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|46d28023-485e-c474-0dec-eb03bb35768d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|46d28023-485e-c474-0dec-eb03bb35768d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699866609866,
    },
    "e-1012": {
      id: "e-1012",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-106",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1013",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|46d28023-485e-c474-0dec-eb03bb35768e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|46d28023-485e-c474-0dec-eb03bb35768e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699866609866,
    },
    "e-1014": {
      id: "e-1014",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-106",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1015",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|46d28023-485e-c474-0dec-eb03bb35768f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|46d28023-485e-c474-0dec-eb03bb35768f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699866609866,
    },
    "e-1016": {
      id: "e-1016",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-106",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1017",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|46d28023-485e-c474-0dec-eb03bb357690",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|46d28023-485e-c474-0dec-eb03bb357690",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699866609866,
    },
    "e-1018": {
      id: "e-1018",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-95",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1019",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|46d28023-485e-c474-0dec-eb03bb357691",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|46d28023-485e-c474-0dec-eb03bb357691",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699866609866,
    },
    "e-1020": {
      id: "e-1020",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-76",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1021",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|46d28023-485e-c474-0dec-eb03bb357697",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|46d28023-485e-c474-0dec-eb03bb357697",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699866609866,
    },
    "e-1021": {
      id: "e-1021",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-76",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1020",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|46d28023-485e-c474-0dec-eb03bb357697",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|46d28023-485e-c474-0dec-eb03bb357697",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699866609866,
    },
    "e-1200": {
      id: "e-1200",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-95",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1201",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|cae81ea6-7072-ed22-5e42-dcf7b811f6e9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|cae81ea6-7072-ed22-5e42-dcf7b811f6e9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699866738176,
    },
    "e-1202": {
      id: "e-1202",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-115",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1203",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|cae81ea6-7072-ed22-5e42-dcf7b811f6f3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|cae81ea6-7072-ed22-5e42-dcf7b811f6f3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699866738176,
    },
    "e-1204": {
      id: "e-1204",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-76",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1205",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|cae81ea6-7072-ed22-5e42-dcf7b811f6f4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|cae81ea6-7072-ed22-5e42-dcf7b811f6f4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699866738176,
    },
    "e-1205": {
      id: "e-1205",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-76",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1204",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|cae81ea6-7072-ed22-5e42-dcf7b811f6f4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|cae81ea6-7072-ed22-5e42-dcf7b811f6f4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699866738176,
    },
    "e-1230": {
      id: "e-1230",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-95",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1231",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|d598b70b-46d7-01c4-82f1-72e48659397f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|d598b70b-46d7-01c4-82f1-72e48659397f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867028807,
    },
    "e-1232": {
      id: "e-1232",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-97",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1233",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|d598b70b-46d7-01c4-82f1-72e486593986",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|d598b70b-46d7-01c4-82f1-72e486593986",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867028807,
    },
    "e-1234": {
      id: "e-1234",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-98",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1235",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|d598b70b-46d7-01c4-82f1-72e486593987",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|d598b70b-46d7-01c4-82f1-72e486593987",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867028807,
    },
    "e-1236": {
      id: "e-1236",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-102",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1237",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|d598b70b-46d7-01c4-82f1-72e48659398e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|d598b70b-46d7-01c4-82f1-72e48659398e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867028807,
    },
    "e-1238": {
      id: "e-1238",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-99",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1239",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|d598b70b-46d7-01c4-82f1-72e486593995",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|d598b70b-46d7-01c4-82f1-72e486593995",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867028807,
    },
    "e-1240": {
      id: "e-1240",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-100",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1241",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|d598b70b-46d7-01c4-82f1-72e48659399c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|d598b70b-46d7-01c4-82f1-72e48659399c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867028807,
    },
    "e-1322": {
      id: "e-1322",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-95",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1323",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|0deebbd3-8d5a-fd7e-f11e-47011bd283c7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|0deebbd3-8d5a-fd7e-f11e-47011bd283c7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867051570,
    },
    "e-1412": {
      id: "e-1412",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-113",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1413",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d41d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d41d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867066817,
    },
    "e-1414": {
      id: "e-1414",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-114",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1415",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d425",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d425",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867066817,
    },
    "e-1416": {
      id: "e-1416",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1417",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d425",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d425",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867066817,
    },
    "e-1417": {
      id: "e-1417",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1416",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d425",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d425",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867066817,
    },
    "e-1418": {
      id: "e-1418",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-114",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1419",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d43e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d43e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867066817,
    },
    "e-1420": {
      id: "e-1420",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1421",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d43e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d43e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867066817,
    },
    "e-1421": {
      id: "e-1421",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1420",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d43e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d43e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867066817,
    },
    "e-1422": {
      id: "e-1422",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-114",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1423",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d44b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d44b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867066817,
    },
    "e-1424": {
      id: "e-1424",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1425",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d44b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d44b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867066817,
    },
    "e-1425": {
      id: "e-1425",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1424",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d44b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d44b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867066817,
    },
    "e-1426": {
      id: "e-1426",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1427",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d459",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d459",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867066817,
    },
    "e-1427": {
      id: "e-1427",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1426",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d459",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d459",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867066817,
    },
    "e-1428": {
      id: "e-1428",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-114",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1429",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d459",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d459",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867066817,
    },
    "e-1430": {
      id: "e-1430",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-114",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1431",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d468",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d468",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867066817,
    },
    "e-1432": {
      id: "e-1432",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1433",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d468",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d468",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867066817,
    },
    "e-1433": {
      id: "e-1433",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1432",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d468",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d468",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867066817,
    },
    "e-1434": {
      id: "e-1434",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1435",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d473",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d473",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867066817,
    },
    "e-1435": {
      id: "e-1435",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1434",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d473",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d473",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867066817,
    },
    "e-1436": {
      id: "e-1436",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-114",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1437",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d473",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d473",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867066817,
    },
    "e-1438": {
      id: "e-1438",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1439",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d483",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d483",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867066817,
    },
    "e-1439": {
      id: "e-1439",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1438",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d483",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d483",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867066817,
    },
    "e-1440": {
      id: "e-1440",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-114",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1441",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d483",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d483",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867066817,
    },
    "e-1442": {
      id: "e-1442",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-114",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1443",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d48e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d48e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867066817,
    },
    "e-1444": {
      id: "e-1444",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1445",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d48e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d48e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867066817,
    },
    "e-1445": {
      id: "e-1445",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1444",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d48e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d48e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867066817,
    },
    "e-1446": {
      id: "e-1446",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-116",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1447",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d4a3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|808b74aa-007a-70f6-9f49-0bf41994d4a3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867066817,
    },
    "e-1494": {
      id: "e-1494",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-95",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1495",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|94f07b7a-98f0-e7ad-bb23-9129f0036445",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|94f07b7a-98f0-e7ad-bb23-9129f0036445",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867079795,
    },
    "e-1496": {
      id: "e-1496",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-95",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1497",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|94f07b7a-98f0-e7ad-bb23-9129f0036450",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|94f07b7a-98f0-e7ad-bb23-9129f0036450",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699867079795,
    },
    "e-1498": {
      id: "e-1498",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-119",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1499",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|94f07b7a-98f0-e7ad-bb23-9129f003644a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|94f07b7a-98f0-e7ad-bb23-9129f003644a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699868052971,
    },
    "e-1500": {
      id: "e-1500",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-120",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1501",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|94f07b7a-98f0-e7ad-bb23-9129f003644c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|94f07b7a-98f0-e7ad-bb23-9129f003644c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699868129732,
    },
    "e-1502": {
      id: "e-1502",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-121",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1503",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|94f07b7a-98f0-e7ad-bb23-9129f003644e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|94f07b7a-98f0-e7ad-bb23-9129f003644e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699868187658,
    },
    "e-1504": {
      id: "e-1504",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-95",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1505",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6c01327c-33fc-c37e-5a3e-8205881f7d53",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6c01327c-33fc-c37e-5a3e-8205881f7d53",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886398864,
    },
    "e-1506": {
      id: "e-1506",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-119",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1507",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6c01327c-33fc-c37e-5a3e-8205881f7d58",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6c01327c-33fc-c37e-5a3e-8205881f7d58",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886398864,
    },
    "e-1508": {
      id: "e-1508",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-120",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1509",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6c01327c-33fc-c37e-5a3e-8205881f7d5a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6c01327c-33fc-c37e-5a3e-8205881f7d5a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886398864,
    },
    "e-1510": {
      id: "e-1510",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-121",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1511",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6c01327c-33fc-c37e-5a3e-8205881f7d5c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6c01327c-33fc-c37e-5a3e-8205881f7d5c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886398864,
    },
    "e-1512": {
      id: "e-1512",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-95",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1513",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6c01327c-33fc-c37e-5a3e-8205881f7d5e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6c01327c-33fc-c37e-5a3e-8205881f7d5e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886398864,
    },
    "e-1514": {
      id: "e-1514",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-95",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1515",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862e3e|24c085bb-1b96-a782-3899-618726819a87",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|24c085bb-1b96-a782-3899-618726819a87",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886434215,
    },
    "e-1516": {
      id: "e-1516",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-115",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1517",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862e3e|24c085bb-1b96-a782-3899-618726819a91",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|24c085bb-1b96-a782-3899-618726819a91",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886434215,
    },
    "e-1540": {
      id: "e-1540",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-95",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1541",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862e3e|971b6772-1ba4-b05d-a6d0-a0fd6a53f781",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|971b6772-1ba4-b05d-a6d0-a0fd6a53f781",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886484238,
    },
    "e-1542": {
      id: "e-1542",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-113",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1543",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c01",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c01",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886535712,
    },
    "e-1544": {
      id: "e-1544",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1545",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c09",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c09",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886535712,
    },
    "e-1545": {
      id: "e-1545",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1544",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c09",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c09",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886535712,
    },
    "e-1546": {
      id: "e-1546",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-114",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1547",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c09",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c09",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886535712,
    },
    "e-1548": {
      id: "e-1548",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-114",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1549",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c22",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c22",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886535712,
    },
    "e-1550": {
      id: "e-1550",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1551",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c22",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c22",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886535712,
    },
    "e-1551": {
      id: "e-1551",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1550",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c22",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c22",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886535712,
    },
    "e-1552": {
      id: "e-1552",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1553",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c2f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c2f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886535712,
    },
    "e-1553": {
      id: "e-1553",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1552",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c2f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c2f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886535712,
    },
    "e-1554": {
      id: "e-1554",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-114",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1555",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c2f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c2f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886535712,
    },
    "e-1556": {
      id: "e-1556",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-114",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1557",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c3d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c3d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886535712,
    },
    "e-1558": {
      id: "e-1558",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1559",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c3d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c3d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886535712,
    },
    "e-1559": {
      id: "e-1559",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1558",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c3d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c3d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886535712,
    },
    "e-1560": {
      id: "e-1560",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1561",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c4c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c4c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886535712,
    },
    "e-1561": {
      id: "e-1561",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1560",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c4c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c4c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886535712,
    },
    "e-1562": {
      id: "e-1562",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-114",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1563",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c4c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c4c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886535712,
    },
    "e-1564": {
      id: "e-1564",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-114",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1565",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c57",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c57",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886535712,
    },
    "e-1566": {
      id: "e-1566",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1567",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c57",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c57",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886535712,
    },
    "e-1567": {
      id: "e-1567",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1566",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c57",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c57",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886535712,
    },
    "e-1568": {
      id: "e-1568",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-114",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1569",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c67",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c67",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886535712,
    },
    "e-1570": {
      id: "e-1570",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1571",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c67",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c67",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886535712,
    },
    "e-1571": {
      id: "e-1571",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1570",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c67",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c67",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886535712,
    },
    "e-1572": {
      id: "e-1572",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-114",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1573",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c72",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c72",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886535712,
    },
    "e-1574": {
      id: "e-1574",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1575",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c72",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c72",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886535712,
    },
    "e-1575": {
      id: "e-1575",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1574",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c72",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c72",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886535712,
    },
    "e-1576": {
      id: "e-1576",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-116",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1577",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c85",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|519f2123-7497-0b75-5949-4b5258de4c85",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699886535712,
    },
    "e-1600": {
      id: "e-1600",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-122", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main"],
      target: {
        id: "65e99f481cdee511e5862e3e",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-122-p",
          selectedAxis: "X_AXIS",
          basedOn: "VIEWPORT",
          reverse: false,
          smoothing: 50,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-122-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "VIEWPORT",
          reverse: false,
          smoothing: 50,
          restingState: 50,
        },
      ],
      createdOn: 1699901505925,
    },
    "e-1601": {
      id: "e-1601",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-123",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1602",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "078502ac-0c4e-d0a7-4f83-4501ed2e4c34",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "078502ac-0c4e-d0a7-4f83-4501ed2e4c34",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699901634336,
    },
    "e-1602": {
      id: "e-1602",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-123",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1601",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "078502ac-0c4e-d0a7-4f83-4501ed2e4c34",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "078502ac-0c4e-d0a7-4f83-4501ed2e4c34",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699901634336,
    },
    "e-1603": {
      id: "e-1603",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-123",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1604",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "078502ac-0c4e-d0a7-4f83-4501ed2e4c37",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "078502ac-0c4e-d0a7-4f83-4501ed2e4c37",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699901634336,
    },
    "e-1605": {
      id: "e-1605",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1606",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "c431bc45-54ee-2373-0a95-0500094270a6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c431bc45-54ee-2373-0a95-0500094270a6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699903946431,
    },
    "e-1606": {
      id: "e-1606",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-33",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1605",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "c431bc45-54ee-2373-0a95-0500094270a6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c431bc45-54ee-2373-0a95-0500094270a6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699903946431,
    },
    "e-1629": {
      id: "e-1629",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-134",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1630",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "c431bc45-54ee-2373-0a95-0500094270a6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c431bc45-54ee-2373-0a95-0500094270a6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700057153985,
    },
    "e-1649": {
      id: "e-1649",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1688",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e9e6cd4e66485312d6fe13|287a23cf-d8a8-6632-d52e-e9bd7a32f4fc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e9e6cd4e66485312d6fe13|287a23cf-d8a8-6632-d52e-e9bd7a32f4fc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709827790569,
    },
    "e-1650": {
      id: "e-1650",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1693",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e9e6cd4e66485312d6fe13|287a23cf-d8a8-6632-d52e-e9bd7a32f4fc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e9e6cd4e66485312d6fe13|287a23cf-d8a8-6632-d52e-e9bd7a32f4fc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709827790569,
    },
    "e-1651": {
      id: "e-1651",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1704",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e9e6cd4e66485312d6fe13|6340d9d3-4d95-eecf-1483-4cd040324e35",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e9e6cd4e66485312d6fe13|6340d9d3-4d95-eecf-1483-4cd040324e35",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709827790569,
    },
    "e-1653": {
      id: "e-1653",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-89",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1705",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "65e9e6cd4e66485312d6fe13|4b5259d2-cac8-d500-cf8c-7aefd70fdbc4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e9e6cd4e66485312d6fe13|4b5259d2-cac8-d500-cf8c-7aefd70fdbc4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709827790569,
    },
    "e-1654": {
      id: "e-1654",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-89",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1715",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "65e9e6cd4e66485312d6fe13|4b5259d2-cac8-d500-cf8c-7aefd70fdbc4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e9e6cd4e66485312d6fe13|4b5259d2-cac8-d500-cf8c-7aefd70fdbc4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709827790569,
    },
    "e-1657": {
      id: "e-1657",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-126",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1703",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e9e6cd4e66485312d6fe13|8d5240fc-9a10-d3fe-c494-b3a5f57b9a20",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e9e6cd4e66485312d6fe13|8d5240fc-9a10-d3fe-c494-b3a5f57b9a20",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709827790569,
    },
    "e-1659": {
      id: "e-1659",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-129",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1716",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "65e9e6cd4e66485312d6fe13|6340d9d3-4d95-eecf-1483-4cd040324e35",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e9e6cd4e66485312d6fe13|6340d9d3-4d95-eecf-1483-4cd040324e35",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709827790569,
    },
    "e-1660": {
      id: "e-1660",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-130",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1707",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "65e9e6cd4e66485312d6fe13|6340d9d3-4d95-eecf-1483-4cd040324e35",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e9e6cd4e66485312d6fe13|6340d9d3-4d95-eecf-1483-4cd040324e35",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709827790569,
    },
    "e-1661": {
      id: "e-1661",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-131",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1711",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "65e9e6cd4e66485312d6fe13|e54cac12-bd0c-a88a-0c58-3c328b5de0c0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e9e6cd4e66485312d6fe13|e54cac12-bd0c-a88a-0c58-3c328b5de0c0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709827790569,
    },
    "e-1662": {
      id: "e-1662",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-132",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1712",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "65e9e6cd4e66485312d6fe13|e54cac12-bd0c-a88a-0c58-3c328b5de0c0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e9e6cd4e66485312d6fe13|e54cac12-bd0c-a88a-0c58-3c328b5de0c0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709827790569,
    },
    "e-1663": {
      id: "e-1663",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1695",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e9e6cd4e66485312d6fe13|63b205d0-f086-5687-38f4-90960ed1a8be",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e9e6cd4e66485312d6fe13|63b205d0-f086-5687-38f4-90960ed1a8be",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709827790569,
    },
    "e-1664": {
      id: "e-1664",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-33",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1696",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e9e6cd4e66485312d6fe13|63b205d0-f086-5687-38f4-90960ed1a8be",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e9e6cd4e66485312d6fe13|63b205d0-f086-5687-38f4-90960ed1a8be",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709827790569,
    },
    "e-1665": {
      id: "e-1665",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-90",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1666",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e9e6cd4e66485312d6fe13",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e9e6cd4e66485312d6fe13",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709993160319,
    },
    "e-1667": {
      id: "e-1667",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1668",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65ec76a55f4b692b317117e4|287a23cf-d8a8-6632-d52e-e9bd7a32f4fc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65ec76a55f4b692b317117e4|287a23cf-d8a8-6632-d52e-e9bd7a32f4fc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709995686153,
    },
    "e-1668": {
      id: "e-1668",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1667",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65ec76a55f4b692b317117e4|287a23cf-d8a8-6632-d52e-e9bd7a32f4fc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65ec76a55f4b692b317117e4|287a23cf-d8a8-6632-d52e-e9bd7a32f4fc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709995686153,
    },
    "e-1669": {
      id: "e-1669",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1670",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65ec76a55f4b692b317117e4|6340d9d3-4d95-eecf-1483-4cd040324e35",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65ec76a55f4b692b317117e4|6340d9d3-4d95-eecf-1483-4cd040324e35",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709995686153,
    },
    "e-1671": {
      id: "e-1671",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-89",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1672",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "65ec76a55f4b692b317117e4|4b5259d2-cac8-d500-cf8c-7aefd70fdbc4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65ec76a55f4b692b317117e4|4b5259d2-cac8-d500-cf8c-7aefd70fdbc4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709995686153,
    },
    "e-1672": {
      id: "e-1672",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-89",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1671",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "65ec76a55f4b692b317117e4|4b5259d2-cac8-d500-cf8c-7aefd70fdbc4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65ec76a55f4b692b317117e4|4b5259d2-cac8-d500-cf8c-7aefd70fdbc4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709995686153,
    },
    "e-1675": {
      id: "e-1675",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-126",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1676",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65ec76a55f4b692b317117e4|8d5240fc-9a10-d3fe-c494-b3a5f57b9a20",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65ec76a55f4b692b317117e4|8d5240fc-9a10-d3fe-c494-b3a5f57b9a20",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709995686153,
    },
    "e-1677": {
      id: "e-1677",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-129",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1678",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "65ec76a55f4b692b317117e4|6340d9d3-4d95-eecf-1483-4cd040324e35",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65ec76a55f4b692b317117e4|6340d9d3-4d95-eecf-1483-4cd040324e35",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709995686153,
    },
    "e-1678": {
      id: "e-1678",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-130",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1677",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "65ec76a55f4b692b317117e4|6340d9d3-4d95-eecf-1483-4cd040324e35",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65ec76a55f4b692b317117e4|6340d9d3-4d95-eecf-1483-4cd040324e35",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709995686153,
    },
    "e-1679": {
      id: "e-1679",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-131",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1680",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "65ec76a55f4b692b317117e4|e54cac12-bd0c-a88a-0c58-3c328b5de0c0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65ec76a55f4b692b317117e4|e54cac12-bd0c-a88a-0c58-3c328b5de0c0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709995686153,
    },
    "e-1680": {
      id: "e-1680",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-132",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1679",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "65ec76a55f4b692b317117e4|e54cac12-bd0c-a88a-0c58-3c328b5de0c0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65ec76a55f4b692b317117e4|e54cac12-bd0c-a88a-0c58-3c328b5de0c0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709995686153,
    },
    "e-1681": {
      id: "e-1681",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1682",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65ec76a55f4b692b317117e4|63b205d0-f086-5687-38f4-90960ed1a8be",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65ec76a55f4b692b317117e4|63b205d0-f086-5687-38f4-90960ed1a8be",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709995686153,
    },
    "e-1682": {
      id: "e-1682",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-33",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1681",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65ec76a55f4b692b317117e4|63b205d0-f086-5687-38f4-90960ed1a8be",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65ec76a55f4b692b317117e4|63b205d0-f086-5687-38f4-90960ed1a8be",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709995686153,
    },
    "e-1683": {
      id: "e-1683",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-135",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1684",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65ec76a55f4b692b317117e4",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65ec76a55f4b692b317117e4",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709995686153,
    },
    "e-1685": {
      id: "e-1685",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-137",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1718",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84918",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84918",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298802995,
    },
    "e-1686": {
      id: "e-1686",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-137",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1702",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb849ae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb849ae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298880074,
    },
    "e-1687": {
      id: "e-1687",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-137",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1691",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84963",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84963",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298843862,
    },
    "e-1688": {
      id: "e-1688",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-137",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1693",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb849d8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb849d8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298868410,
    },
    "e-1689": {
      id: "e-1689",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-137",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1709",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84955",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84955",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298839848,
    },
    "e-1690": {
      id: "e-1690",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-137",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1717",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb8497f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb8497f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298852400,
    },
    "e-1691": {
      id: "e-1691",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-136",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1687",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84963",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84963",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298843862,
    },
    "e-1692": {
      id: "e-1692",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-96",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1713",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699260967258,
    },
    "e-1693": {
      id: "e-1693",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-136",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1688",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb849d8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb849d8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298868410,
    },
    "e-1694": {
      id: "e-1694",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-136",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1704",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb849ca",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb849ca",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298872572,
    },
    "e-1695": {
      id: "e-1695",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-137",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1696",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84a07",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84a07",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298910298,
    },
    "e-1696": {
      id: "e-1696",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-136",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1695",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84a07",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84a07",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298910298,
    },
    "e-1697": {
      id: "e-1697",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-137",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1699",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84926",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84926",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298807529,
    },
    "e-1698": {
      id: "e-1698",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-137",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1714",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb8490a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb8490a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298791372,
    },
    "e-1699": {
      id: "e-1699",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-136",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1697",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84926",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84926",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298807529,
    },
    "e-1700": {
      id: "e-1700",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-136",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1710",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84971",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84971",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298848029,
    },
    "e-1701": {
      id: "e-1701",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-137",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1706",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848fb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848fb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709297624569,
    },
    "e-1702": {
      id: "e-1702",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-136",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1686",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb849ae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb849ae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298880074,
    },
    "e-1703": {
      id: "e-1703",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-137",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1708",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84a31",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84a31",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298900349,
    },
    "e-1704": {
      id: "e-1704",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-137",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1694",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb849ca",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb849ca",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298872572,
    },
    "e-1705": {
      id: "e-1705",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-137",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1715",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb849bc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb849bc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298875763,
    },
    "e-1706": {
      id: "e-1706",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-136",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1701",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848fb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848fb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709297624566,
    },
    "e-1707": {
      id: "e-1707",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-136",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1716",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84a23",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84a23",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298903486,
    },
    "e-1708": {
      id: "e-1708",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-136",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1703",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84a31",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84a31",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298900349,
    },
    "e-1709": {
      id: "e-1709",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-136",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1689",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84955",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84955",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298839848,
    },
    "e-1710": {
      id: "e-1710",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-137",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1700",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84971",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84971",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298848029,
    },
    "e-1711": {
      id: "e-1711",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-137",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1712",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84a15",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84a15",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298906785,
    },
    "e-1712": {
      id: "e-1712",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-136",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1711",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84a15",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84a15",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298906785,
    },
    "e-1714": {
      id: "e-1714",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-136",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1698",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb8490a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb8490a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298791372,
    },
    "e-1715": {
      id: "e-1715",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-136",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1705",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb849bc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb849bc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298875763,
    },
    "e-1716": {
      id: "e-1716",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-137",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1707",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84a23",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84a23",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298903486,
    },
    "e-1717": {
      id: "e-1717",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-136",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1690",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb8497f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb8497f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298852400,
    },
    "e-1718": {
      id: "e-1718",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-136",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1685",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84918",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb84918",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1709298802995,
    },
    "e-1719": {
      id: "e-1719",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1720",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65ecc4c7325e0dfc07a2efbb|287a23cf-d8a8-6632-d52e-e9bd7a32f4fc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65ecc4c7325e0dfc07a2efbb|287a23cf-d8a8-6632-d52e-e9bd7a32f4fc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710015687850,
    },
    "e-1720": {
      id: "e-1720",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1719",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65ecc4c7325e0dfc07a2efbb|287a23cf-d8a8-6632-d52e-e9bd7a32f4fc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65ecc4c7325e0dfc07a2efbb|287a23cf-d8a8-6632-d52e-e9bd7a32f4fc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710015687850,
    },
    "e-1721": {
      id: "e-1721",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1722",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65ecc4c7325e0dfc07a2efbb|6340d9d3-4d95-eecf-1483-4cd040324e35",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65ecc4c7325e0dfc07a2efbb|6340d9d3-4d95-eecf-1483-4cd040324e35",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710015687850,
    },
    "e-1723": {
      id: "e-1723",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-89",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1724",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "65ecc4c7325e0dfc07a2efbb|4b5259d2-cac8-d500-cf8c-7aefd70fdbc4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65ecc4c7325e0dfc07a2efbb|4b5259d2-cac8-d500-cf8c-7aefd70fdbc4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710015687850,
    },
    "e-1724": {
      id: "e-1724",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-89",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1723",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "65ecc4c7325e0dfc07a2efbb|4b5259d2-cac8-d500-cf8c-7aefd70fdbc4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65ecc4c7325e0dfc07a2efbb|4b5259d2-cac8-d500-cf8c-7aefd70fdbc4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710015687850,
    },
    "e-1729": {
      id: "e-1729",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-129",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1730",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "65ecc4c7325e0dfc07a2efbb|6340d9d3-4d95-eecf-1483-4cd040324e35",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65ecc4c7325e0dfc07a2efbb|6340d9d3-4d95-eecf-1483-4cd040324e35",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710015687850,
    },
    "e-1730": {
      id: "e-1730",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-130",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1729",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "65ecc4c7325e0dfc07a2efbb|6340d9d3-4d95-eecf-1483-4cd040324e35",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65ecc4c7325e0dfc07a2efbb|6340d9d3-4d95-eecf-1483-4cd040324e35",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710015687850,
    },
    "e-1731": {
      id: "e-1731",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-131",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1732",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "65ecc4c7325e0dfc07a2efbb|e54cac12-bd0c-a88a-0c58-3c328b5de0c0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65ecc4c7325e0dfc07a2efbb|e54cac12-bd0c-a88a-0c58-3c328b5de0c0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710015687850,
    },
    "e-1732": {
      id: "e-1732",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-132",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1731",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "65ecc4c7325e0dfc07a2efbb|e54cac12-bd0c-a88a-0c58-3c328b5de0c0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65ecc4c7325e0dfc07a2efbb|e54cac12-bd0c-a88a-0c58-3c328b5de0c0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710015687850,
    },
    "e-1733": {
      id: "e-1733",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1734",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65ecc4c7325e0dfc07a2efbb|63b205d0-f086-5687-38f4-90960ed1a8be",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65ecc4c7325e0dfc07a2efbb|63b205d0-f086-5687-38f4-90960ed1a8be",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710015687850,
    },
    "e-1734": {
      id: "e-1734",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-33",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1733",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65ecc4c7325e0dfc07a2efbb|63b205d0-f086-5687-38f4-90960ed1a8be",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65ecc4c7325e0dfc07a2efbb|63b205d0-f086-5687-38f4-90960ed1a8be",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710015687850,
    },
    "e-1735": {
      id: "e-1735",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-138",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1736",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65ecc4c7325e0dfc07a2efbb",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65ecc4c7325e0dfc07a2efbb",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710015687850,
    },
    "e-1749": {
      id: "e-1749",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-89",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1750",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e24|663c2ec5-17a7-b76f-1628-47df604153dd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e24|663c2ec5-17a7-b76f-1628-47df604153dd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710016404759,
    },
    "e-1750": {
      id: "e-1750",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-89",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1749",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e24|663c2ec5-17a7-b76f-1628-47df604153dd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e24|663c2ec5-17a7-b76f-1628-47df604153dd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710016404759,
    },
    "e-1753": {
      id: "e-1753",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1754",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e24|663c2ec5-17a7-b76f-1628-47df6041545e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e24|663c2ec5-17a7-b76f-1628-47df6041545e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710016404759,
    },
    "e-1754": {
      id: "e-1754",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1753",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e24|663c2ec5-17a7-b76f-1628-47df6041545e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e24|663c2ec5-17a7-b76f-1628-47df6041545e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710016404759,
    },
    "e-1757": {
      id: "e-1757",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-131",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1758",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "65e99f481cdee511e5862e24|663c2ec5-17a7-b76f-1628-47df6041546f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e24|663c2ec5-17a7-b76f-1628-47df6041546f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710016404759,
    },
    "e-1758": {
      id: "e-1758",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-132",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1757",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "65e99f481cdee511e5862e24|663c2ec5-17a7-b76f-1628-47df6041546f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e24|663c2ec5-17a7-b76f-1628-47df6041546f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710016404759,
    },
    "e-1759": {
      id: "e-1759",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1760",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e24|663c2ec5-17a7-b76f-1628-47df60415472",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e24|663c2ec5-17a7-b76f-1628-47df60415472",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710016404759,
    },
    "e-1761": {
      id: "e-1761",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-129",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1762",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "65e99f481cdee511e5862e24|663c2ec5-17a7-b76f-1628-47df60415472",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e24|663c2ec5-17a7-b76f-1628-47df60415472",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710016404759,
    },
    "e-1762": {
      id: "e-1762",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-130",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1761",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "65e99f481cdee511e5862e24|663c2ec5-17a7-b76f-1628-47df60415472",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e24|663c2ec5-17a7-b76f-1628-47df60415472",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710016404759,
    },
    "e-1763": {
      id: "e-1763",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-138",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1764",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e24",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e24",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710078950834,
    },
    "e-1765": {
      id: "e-1765",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-139", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-139-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1710082888734,
    },
    "e-1776": {
      id: "e-1776",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-95",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1777",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65edcb48bebb9ab36fb39064|24c085bb-1b96-a782-3899-618726819a87",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|24c085bb-1b96-a782-3899-618726819a87",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1778": {
      id: "e-1778",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-115",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1779",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65edcb48bebb9ab36fb39064|24c085bb-1b96-a782-3899-618726819a91",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|24c085bb-1b96-a782-3899-618726819a91",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1792": {
      id: "e-1792",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-95",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1793",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65edcb48bebb9ab36fb39064|971b6772-1ba4-b05d-a6d0-a0fd6a53f781",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|971b6772-1ba4-b05d-a6d0-a0fd6a53f781",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1794": {
      id: "e-1794",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-113",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1795",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c01",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c01",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1796": {
      id: "e-1796",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1797",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c09",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c09",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1797": {
      id: "e-1797",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1796",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c09",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c09",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1798": {
      id: "e-1798",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-114",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1799",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c09",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c09",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1800": {
      id: "e-1800",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-114",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1801",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c22",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c22",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1802": {
      id: "e-1802",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1803",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c22",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c22",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1803": {
      id: "e-1803",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1802",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c22",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c22",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1804": {
      id: "e-1804",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1805",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c2f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c2f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1805": {
      id: "e-1805",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1804",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c2f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c2f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1806": {
      id: "e-1806",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-114",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1807",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c2f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c2f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1808": {
      id: "e-1808",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-114",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1809",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c3d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c3d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1810": {
      id: "e-1810",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1811",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c3d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c3d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1811": {
      id: "e-1811",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1810",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c3d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c3d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1812": {
      id: "e-1812",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1813",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c4c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c4c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1813": {
      id: "e-1813",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1812",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c4c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c4c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1814": {
      id: "e-1814",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-114",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1815",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c4c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c4c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1816": {
      id: "e-1816",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-114",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1817",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c57",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c57",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1818": {
      id: "e-1818",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1819",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c57",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c57",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1819": {
      id: "e-1819",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1818",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c57",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c57",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1820": {
      id: "e-1820",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-114",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1821",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c67",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c67",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1822": {
      id: "e-1822",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1823",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c67",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c67",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1823": {
      id: "e-1823",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1822",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c67",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c67",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1824": {
      id: "e-1824",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-114",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1825",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c72",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c72",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1826": {
      id: "e-1826",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1827",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c72",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c72",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1827": {
      id: "e-1827",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1826",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c72",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c72",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1828": {
      id: "e-1828",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-116",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1829",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c85",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|519f2123-7497-0b75-5949-4b5258de4c85",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082888734,
    },
    "e-1830": {
      id: "e-1830",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-140", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main"],
      target: {
        id: "65edcb48bebb9ab36fb39064",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-140-p",
          selectedAxis: "X_AXIS",
          basedOn: "VIEWPORT",
          reverse: false,
          smoothing: 50,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-140-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "VIEWPORT",
          reverse: false,
          smoothing: 50,
          restingState: 50,
        },
      ],
      createdOn: 1710082888734,
    },
    "e-1833": {
      id: "e-1833",
      name: "",
      animationType: "preset",
      eventTypeId: "NAVBAR_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-142",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1834",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|23416bd7-8790-9bac-c160-3faee13eab22",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|23416bd7-8790-9bac-c160-3faee13eab22",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082994979,
    },
    "e-1834": {
      id: "e-1834",
      name: "",
      animationType: "preset",
      eventTypeId: "NAVBAR_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-143",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1833",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|23416bd7-8790-9bac-c160-3faee13eab22",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|23416bd7-8790-9bac-c160-3faee13eab22",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082994979,
    },
    "e-1839": {
      id: "e-1839",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-147",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1840",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|23416bd7-8790-9bac-c160-3faee13eaba9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|23416bd7-8790-9bac-c160-3faee13eaba9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082994979,
    },
    "e-1840": {
      id: "e-1840",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-147",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1839",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|23416bd7-8790-9bac-c160-3faee13eaba9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|23416bd7-8790-9bac-c160-3faee13eaba9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710082994979,
    },
    "e-1841": {
      id: "e-1841",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-76",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1842",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|a2b0d946-743a-6fcd-0cef-496b1ec0a2a2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|a2b0d946-743a-6fcd-0cef-496b1ec0a2a2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710106557488,
    },
    "e-1842": {
      id: "e-1842",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-76",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1841",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|a2b0d946-743a-6fcd-0cef-496b1ec0a2a2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|a2b0d946-743a-6fcd-0cef-496b1ec0a2a2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710106557493,
    },
    "e-1909": {
      id: "e-1909",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-154",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1910",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "596cccaa-54dd-56fc-9ad0-684fbc8cef20",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "596cccaa-54dd-56fc-9ad0-684fbc8cef20",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710416195786,
    },
    "e-1910": {
      id: "e-1910",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-154",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1909",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "596cccaa-54dd-56fc-9ad0-684fbc8cef20",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "596cccaa-54dd-56fc-9ad0-684fbc8cef20",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710416195786,
    },
    "e-1911": {
      id: "e-1911",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-154",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1912",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "596cccaa-54dd-56fc-9ad0-684fbc8cef23",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "596cccaa-54dd-56fc-9ad0-684fbc8cef23",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710416195786,
    },
    "e-1913": {
      id: "e-1913",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-152",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1914",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "596cccaa-54dd-56fc-9ad0-684fbc8cef43",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "596cccaa-54dd-56fc-9ad0-684fbc8cef43",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710416195786,
    },
    "e-2039": {
      id: "e-2039",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2040",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|865b2f75-b12b-5d16-937c-89e86874ffc9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|865b2f75-b12b-5d16-937c-89e86874ffc9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711147880560,
    },
    "e-2040": {
      id: "e-2040",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-33",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2039",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|865b2f75-b12b-5d16-937c-89e86874ffc9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|865b2f75-b12b-5d16-937c-89e86874ffc9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711147880560,
    },
    "e-2041": {
      id: "e-2041",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-76",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2042",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|865b2f75-b12b-5d16-937c-89e86874ffc9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|865b2f75-b12b-5d16-937c-89e86874ffc9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711147880560,
    },
    "e-2042": {
      id: "e-2042",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-76",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2041",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|865b2f75-b12b-5d16-937c-89e86874ffc9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|865b2f75-b12b-5d16-937c-89e86874ffc9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711147880560,
    },
    "e-2043": {
      id: "e-2043",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-77",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2044",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|865b2f75-b12b-5d16-937c-89e86875000f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|865b2f75-b12b-5d16-937c-89e86875000f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711147880560,
    },
    "e-2044": {
      id: "e-2044",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-77",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2043",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|865b2f75-b12b-5d16-937c-89e86875000f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|865b2f75-b12b-5d16-937c-89e86875000f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711147880560,
    },
    "e-2045": {
      id: "e-2045",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2046",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|865b2f75-b12b-5d16-937c-89e86875000f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|865b2f75-b12b-5d16-937c-89e86875000f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711147880560,
    },
    "e-2046": {
      id: "e-2046",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-33",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2045",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|865b2f75-b12b-5d16-937c-89e86875000f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|865b2f75-b12b-5d16-937c-89e86875000f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711147880560,
    },
    "e-2047": {
      id: "e-2047",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-153",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2048",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|865b2f75-b12b-5d16-937c-89e868750056",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|865b2f75-b12b-5d16-937c-89e868750056",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711147880560,
    },
    "e-2048": {
      id: "e-2048",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-153",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2047",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|865b2f75-b12b-5d16-937c-89e868750056",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|865b2f75-b12b-5d16-937c-89e868750056",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711147880560,
    },
    "e-2049": {
      id: "e-2049",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2050",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|865b2f75-b12b-5d16-937c-89e868750056",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|865b2f75-b12b-5d16-937c-89e868750056",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711147880560,
    },
    "e-2050": {
      id: "e-2050",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-33",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2049",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862e3e|865b2f75-b12b-5d16-937c-89e868750056",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862e3e|865b2f75-b12b-5d16-937c-89e868750056",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711147880560,
    },
    "e-2063": {
      id: "e-2063",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-76",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2064",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687ee1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687ee1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716989538079,
    },
    "e-2064": {
      id: "e-2064",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-76",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2063",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687ee1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687ee1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716989538079,
    },
    "e-2065": {
      id: "e-2065",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2066",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687ee1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687ee1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716989538079,
    },
    "e-2066": {
      id: "e-2066",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-33",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2065",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687ee1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687ee1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716989538079,
    },
    "e-2067": {
      id: "e-2067",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-77",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2068",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687f26",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687f26",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716989538079,
    },
    "e-2068": {
      id: "e-2068",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-77",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2067",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687f26",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687f26",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716989538079,
    },
    "e-2069": {
      id: "e-2069",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2070",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687f26",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687f26",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716989538079,
    },
    "e-2070": {
      id: "e-2070",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-33",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2069",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687f26",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687f26",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716989538079,
    },
    "e-2071": {
      id: "e-2071",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2072",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687f6e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687f6e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716989538079,
    },
    "e-2072": {
      id: "e-2072",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-33",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2071",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687f6e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687f6e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716989538079,
    },
    "e-2073": {
      id: "e-2073",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-153",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2074",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687f6e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687f6e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716989538079,
    },
    "e-2074": {
      id: "e-2074",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-153",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2073",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687f6e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687f6e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716989538079,
    },
    "e-2075": {
      id: "e-2075",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-76",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2076",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|8e7fcf8c-3275-ea27-063a-d8cb7cc98fb2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|8e7fcf8c-3275-ea27-063a-d8cb7cc98fb2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716989608326,
    },
    "e-2076": {
      id: "e-2076",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-76",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2075",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|8e7fcf8c-3275-ea27-063a-d8cb7cc98fb2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|8e7fcf8c-3275-ea27-063a-d8cb7cc98fb2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716989608326,
    },
    "e-2077": {
      id: "e-2077",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2078",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|8e7fcf8c-3275-ea27-063a-d8cb7cc98fb2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|8e7fcf8c-3275-ea27-063a-d8cb7cc98fb2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716989608326,
    },
    "e-2078": {
      id: "e-2078",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-33",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2077",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|8e7fcf8c-3275-ea27-063a-d8cb7cc98fb2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|8e7fcf8c-3275-ea27-063a-d8cb7cc98fb2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716989608326,
    },
    "e-2079": {
      id: "e-2079",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-77",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2080",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|8e7fcf8c-3275-ea27-063a-d8cb7cc98ff7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|8e7fcf8c-3275-ea27-063a-d8cb7cc98ff7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716989608326,
    },
    "e-2080": {
      id: "e-2080",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-77",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2079",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|8e7fcf8c-3275-ea27-063a-d8cb7cc98ff7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|8e7fcf8c-3275-ea27-063a-d8cb7cc98ff7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716989608326,
    },
    "e-2081": {
      id: "e-2081",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2082",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|8e7fcf8c-3275-ea27-063a-d8cb7cc98ff7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|8e7fcf8c-3275-ea27-063a-d8cb7cc98ff7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716989608326,
    },
    "e-2082": {
      id: "e-2082",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-33",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2081",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|8e7fcf8c-3275-ea27-063a-d8cb7cc98ff7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|8e7fcf8c-3275-ea27-063a-d8cb7cc98ff7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716989608326,
    },
    "e-2083": {
      id: "e-2083",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2084",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|8e7fcf8c-3275-ea27-063a-d8cb7cc9903f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|8e7fcf8c-3275-ea27-063a-d8cb7cc9903f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716989608326,
    },
    "e-2084": {
      id: "e-2084",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-33",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2083",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|8e7fcf8c-3275-ea27-063a-d8cb7cc9903f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|8e7fcf8c-3275-ea27-063a-d8cb7cc9903f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716989608326,
    },
    "e-2085": {
      id: "e-2085",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-153",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2086",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|8e7fcf8c-3275-ea27-063a-d8cb7cc9903f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|8e7fcf8c-3275-ea27-063a-d8cb7cc9903f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716989608326,
    },
    "e-2086": {
      id: "e-2086",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-153",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2085",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65edcb48bebb9ab36fb39064|8e7fcf8c-3275-ea27-063a-d8cb7cc9903f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65edcb48bebb9ab36fb39064|8e7fcf8c-3275-ea27-063a-d8cb7cc9903f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716989608326,
    },
    "e-2087": {
      id: "e-2087",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-157",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2088",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "a10479d1-ca1d-d7f9-adab-9b55a51042c8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "a10479d1-ca1d-d7f9-adab-9b55a51042c8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1719507708317,
    },
    "e-2089": {
      id: "e-2089",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-110",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2090",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687ed2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687ed2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1719511982974,
    },
    "e-2091": {
      id: "e-2091",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-111",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2092",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687f17",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687f17",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1719511999949,
    },
    "e-2093": {
      id: "e-2093",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-112",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2094",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687f5f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65e99f481cdee511e5862dc5|bdc5991e-cf78-44f9-cd0d-f4c6f4687f5f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1719512015834,
    },
    "e-2097": {
      id: "e-2097",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-158",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2098",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "368655bd-64ae-f353-cbea-edddbeb88ba5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "368655bd-64ae-f353-cbea-edddbeb88ba5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1720176088027,
    },
    "e-2098": {
      id: "e-2098",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-158",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2097",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "368655bd-64ae-f353-cbea-edddbeb88ba5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "368655bd-64ae-f353-cbea-edddbeb88ba5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1720176088027,
    },
    "e-2099": {
      id: "e-2099",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-158",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2100",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "368655bd-64ae-f353-cbea-edddbeb88ba8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "368655bd-64ae-f353-cbea-edddbeb88ba8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1720176088027,
    },
  },
  actionLists: {
    "a-76": {
      id: "a-76",
      title: "Open Signup Modal Pro Personal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-76-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".signup-modal-pro-personal",
                  selectorGuids: ["6c160b99-033e-2e28-46ef-7796583aaecf"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-76-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".signup-modal-pro-personal",
                  selectorGuids: ["6c160b99-033e-2e28-46ef-7796583aaecf"],
                },
                value: "flex",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-76-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  selector: ".signup-modal-pro-personal",
                  selectorGuids: ["6c160b99-033e-2e28-46ef-7796583aaecf"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1656488921465,
    },
    "a-10": {
      id: "a-10",
      title: "menu-button-open",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-10-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".dimm-layer",
                  selectorGuids: ["1c2a5a40-869c-98b3-b2b7-f04a3d7c66dc"],
                },
                value: "block",
              },
            },
            {
              id: "a-10-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon__28px",
                  selectorGuids: ["2836249c-ef6e-0909-18f6-e21b7d449fe3"],
                },
                value: "none",
              },
            },
            {
              id: "a-10-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon__28px-close",
                  selectorGuids: ["6e6bc2a9-b9fc-b1b9-75a5-bda0b5f14d81"],
                },
                value: "inline-block",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-10-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 300,
                target: {
                  selector: ".dimm-layer",
                  selectorGuids: ["1c2a5a40-869c-98b3-b2b7-f04a3d7c66dc"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1692221078518,
    },
    "a-11": {
      id: "a-11",
      title: "menu-button-close",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-11-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  selector: ".dimm-layer",
                  selectorGuids: ["1c2a5a40-869c-98b3-b2b7-f04a3d7c66dc"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-11-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon__28px-close",
                  selectorGuids: ["6e6bc2a9-b9fc-b1b9-75a5-bda0b5f14d81"],
                },
                value: "none",
              },
            },
            {
              id: "a-11-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon__28px",
                  selectorGuids: ["2836249c-ef6e-0909-18f6-e21b7d449fe3"],
                },
                value: "inline-block",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-11-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".dimm-layer",
                  selectorGuids: ["1c2a5a40-869c-98b3-b2b7-f04a3d7c66dc"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1692221233647,
    },
    "a-7": {
      id: "a-7",
      title: "Close Signup Free Modal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-7-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".signup-modal-free",
                  selectorGuids: ["afd9da91-8710-8c1f-bb52-b0eb282f74b3"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-7-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 200,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".signup-modal-free",
                  selectorGuids: ["afd9da91-8710-8c1f-bb52-b0eb282f74b3"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1656488921465,
    },
    "a-34": {
      id: "a-34",
      title: "graphic-element-animation",
      continuousParameterGroups: [
        {
          id: "a-34-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-34-n",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862e3e|3b0a2807-b53e-1815-aa84-ce619b1ac504",
                    },
                    xValue: null,
                    zValue: 0,
                    xUnit: "deg",
                    yUnit: "DEG",
                    zUnit: "deg",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-34-n-2",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862e3e|3b0a2807-b53e-1815-aa84-ce619b1ac504",
                    },
                    xValue: null,
                    zValue: 360,
                    xUnit: "deg",
                    yUnit: "DEG",
                    zUnit: "deg",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1692565884855,
    },
    "a-35": {
      id: "a-35",
      title: "graphic-element-animation 2",
      continuousParameterGroups: [
        {
          id: "a-35-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-35-n",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dfe|3b0a2807-b53e-1815-aa84-ce619b1ac504",
                    },
                    xValue: null,
                    zValue: 0,
                    xUnit: "deg",
                    yUnit: "DEG",
                    zUnit: "deg",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-35-n-2",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dfe|3b0a2807-b53e-1815-aa84-ce619b1ac504",
                    },
                    xValue: null,
                    zValue: 360,
                    xUnit: "deg",
                    yUnit: "DEG",
                    zUnit: "deg",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1692565884855,
    },
    "a-32": {
      id: "a-32",
      title: "pricing-button-arrow-hover-on",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-32-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon__28px",
                  selectorGuids: ["2836249c-ef6e-0909-18f6-e21b7d449fe3"],
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-32-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon__28px",
                  selectorGuids: ["2836249c-ef6e-0909-18f6-e21b7d449fe3"],
                },
                xValue: 33,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1692450780267,
    },
    "a-33": {
      id: "a-33",
      title: "pricing-button-arrow-hover-out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-33-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon__28px",
                  selectorGuids: ["2836249c-ef6e-0909-18f6-e21b7d449fe3"],
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1692450848896,
    },
    "a-36": {
      id: "a-36",
      title: "Close Modal 2",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-36-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".signup-modal-free",
                  selectorGuids: ["afd9da91-8710-8c1f-bb52-b0eb282f74b3"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-36-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 200,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".signup-modal-free",
                  selectorGuids: ["afd9da91-8710-8c1f-bb52-b0eb282f74b3"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1656488921465,
    },
    "a-40": {
      id: "a-40",
      title: "Open Login Modal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-40-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".login-modal",
                  selectorGuids: ["2ea84ebb-23aa-3d17-94dc-e311cbb4605d"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-40-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".login-modal",
                  selectorGuids: ["2ea84ebb-23aa-3d17-94dc-e311cbb4605d"],
                },
                value: "flex",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-40-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  selector: ".login-modal",
                  selectorGuids: ["2ea84ebb-23aa-3d17-94dc-e311cbb4605d"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1656488921465,
    },
    "a-41": {
      id: "a-41",
      title: "Close Login Modal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-41-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".login-modal",
                  selectorGuids: ["2ea84ebb-23aa-3d17-94dc-e311cbb4605d"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-41-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 200,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".login-modal",
                  selectorGuids: ["2ea84ebb-23aa-3d17-94dc-e311cbb4605d"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1656488921465,
    },
    "a-42": {
      id: "a-42",
      title: "Close Forgot Password Modal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-42-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".forgot-password-modal",
                  selectorGuids: ["02abb93b-5290-3091-718e-df9ef78f0092"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-42-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 200,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".forgot-password-modal",
                  selectorGuids: ["02abb93b-5290-3091-718e-df9ef78f0092"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1656488921465,
    },
    "a-43": {
      id: "a-43",
      title: "Close Signup Free Open Login",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-43-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".signup-modal-free",
                  selectorGuids: ["afd9da91-8710-8c1f-bb52-b0eb282f74b3"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-43-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".signup-modal-free",
                  selectorGuids: ["afd9da91-8710-8c1f-bb52-b0eb282f74b3"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-43-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".login-modal",
                  selectorGuids: ["2ea84ebb-23aa-3d17-94dc-e311cbb4605d"],
                },
                value: "flex",
              },
            },
            {
              id: "a-43-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 0,
                target: {
                  selector: ".login-modal",
                  selectorGuids: ["2ea84ebb-23aa-3d17-94dc-e311cbb4605d"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1656488921465,
    },
    "a-44": {
      id: "a-44",
      title: "Close Login Open Signup Pro Personal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-44-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".login-modal",
                  selectorGuids: ["2ea84ebb-23aa-3d17-94dc-e311cbb4605d"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-44-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".login-modal",
                  selectorGuids: ["2ea84ebb-23aa-3d17-94dc-e311cbb4605d"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-44-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".signup-modal-pro-personal",
                  selectorGuids: ["6c160b99-033e-2e28-46ef-7796583aaecf"],
                },
                value: "flex",
              },
            },
            {
              id: "a-44-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 0,
                target: {
                  selector: ".signup-modal-pro-personal",
                  selectorGuids: ["6c160b99-033e-2e28-46ef-7796583aaecf"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1656488921465,
    },
    "a-45": {
      id: "a-45",
      title: "Close Login Open Forgot Password",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-45-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".login-modal",
                  selectorGuids: ["2ea84ebb-23aa-3d17-94dc-e311cbb4605d"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-45-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".login-modal",
                  selectorGuids: ["2ea84ebb-23aa-3d17-94dc-e311cbb4605d"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-45-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".forgot-password-modal",
                  selectorGuids: ["02abb93b-5290-3091-718e-df9ef78f0092"],
                },
                value: "flex",
              },
            },
            {
              id: "a-45-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 0,
                target: {
                  selector: ".forgot-password-modal",
                  selectorGuids: ["02abb93b-5290-3091-718e-df9ef78f0092"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1656488921465,
    },
    "a-46": {
      id: "a-46",
      title: "Close Forgot Password Open Login",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-46-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 0,
                target: {
                  selector: ".forgot-password-modal",
                  selectorGuids: ["02abb93b-5290-3091-718e-df9ef78f0092"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-46-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".forgot-password-modal",
                  selectorGuids: ["02abb93b-5290-3091-718e-df9ef78f0092"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-46-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".login-modal",
                  selectorGuids: ["2ea84ebb-23aa-3d17-94dc-e311cbb4605d"],
                },
                value: "flex",
              },
            },
            {
              id: "a-46-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 0,
                target: {
                  selector: ".login-modal",
                  selectorGuids: ["2ea84ebb-23aa-3d17-94dc-e311cbb4605d"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1656488921465,
    },
    "a-47": {
      id: "a-47",
      title: "graphic-element-animation 3",
      continuousParameterGroups: [
        {
          id: "a-47-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-47-n",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862e59|3b0a2807-b53e-1815-aa84-ce619b1ac504",
                    },
                    xValue: null,
                    zValue: 0,
                    xUnit: "deg",
                    yUnit: "DEG",
                    zUnit: "deg",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-47-n-2",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862e59|3b0a2807-b53e-1815-aa84-ce619b1ac504",
                    },
                    xValue: null,
                    zValue: 360,
                    xUnit: "deg",
                    yUnit: "DEG",
                    zUnit: "deg",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1692565884855,
    },
    "a-48": {
      id: "a-48",
      title: "graphic-element-animation 4",
      continuousParameterGroups: [
        {
          id: "a-48-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-48-n",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862e28|3b0a2807-b53e-1815-aa84-ce619b1ac504",
                    },
                    xValue: null,
                    zValue: 0,
                    xUnit: "deg",
                    yUnit: "DEG",
                    zUnit: "deg",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-48-n-2",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862e28|3b0a2807-b53e-1815-aa84-ce619b1ac504",
                    },
                    xValue: null,
                    zValue: 360,
                    xUnit: "deg",
                    yUnit: "DEG",
                    zUnit: "deg",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1692565884855,
    },
    "a-54": {
      id: "a-54",
      title: "dropdown-menu-open",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-54-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown__content",
                  selectorGuids: ["fd95ff2c-c010-1a5d-d6ac-db378c59c2eb"],
                },
                yValue: -6,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-54-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown__content",
                  selectorGuids: ["fd95ff2c-c010-1a5d-d6ac-db378c59c2eb"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-54-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown__content",
                  selectorGuids: ["fd95ff2c-c010-1a5d-d6ac-db378c59c2eb"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-54-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown__content",
                  selectorGuids: ["fd95ff2c-c010-1a5d-d6ac-db378c59c2eb"],
                },
                value: "flex",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-54-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown__content",
                  selectorGuids: ["fd95ff2c-c010-1a5d-d6ac-db378c59c2eb"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-54-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown__content",
                  selectorGuids: ["fd95ff2c-c010-1a5d-d6ac-db378c59c2eb"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1692866216237,
    },
    "a-55": {
      id: "a-55",
      title: "dropdown-menu-close",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-55-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown__content",
                  selectorGuids: ["fd95ff2c-c010-1a5d-d6ac-db378c59c2eb"],
                },
                yValue: -6,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-55-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown__content",
                  selectorGuids: ["fd95ff2c-c010-1a5d-d6ac-db378c59c2eb"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-55-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown__content",
                  selectorGuids: ["fd95ff2c-c010-1a5d-d6ac-db378c59c2eb"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1692866216237,
    },
    "a-56": {
      id: "a-56",
      title: "Edit Form",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-56-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862e57|f8ab1419-a81e-24bd-e5c3-bedcafe18d7a",
                },
                value: "none",
              },
            },
            {
              id: "a-56-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".save-button",
                  selectorGuids: ["96c8d32c-ebbd-c762-6b17-690ad7f3b1dc"],
                },
                value: "block",
              },
            },
            {
              id: "a-56-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".block-inputs",
                  selectorGuids: ["96c8d32c-ebbd-c762-6b17-690ad7f3b1e5"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1688451075611,
    },
    "a-57": {
      id: "a-57",
      title: "Save Info",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-57-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862e57|f8ab1419-a81e-24bd-e5c3-bedcafe18d7a",
                },
                value: "none",
              },
            },
            {
              id: "a-57-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".edit-profile",
                  selectorGuids: ["96c8d32c-ebbd-c762-6b17-690ad7f3b1dd"],
                },
                value: "block",
              },
            },
            {
              id: "a-57-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".block-inputs",
                  selectorGuids: ["96c8d32c-ebbd-c762-6b17-690ad7f3b1e5"],
                },
                value: "block",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1688451075611,
    },
    "a-61": {
      id: "a-61",
      title: "Close Modal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-61-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".dash_modal",
                  selectorGuids: ["f343a2d1-3d9e-5778-7ae5-ce36a074030d"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-61-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".dash_modal",
                  selectorGuids: ["f343a2d1-3d9e-5778-7ae5-ce36a074030d"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1656488921465,
    },
    "a-59": {
      id: "a-59",
      title: "Open Modal 2",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-59-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".dash_modal",
                  selectorGuids: ["f343a2d1-3d9e-5778-7ae5-ce36a074030d"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-59-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".dash_modal",
                  selectorGuids: ["f343a2d1-3d9e-5778-7ae5-ce36a074030d"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-59-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".dash_modal",
                  selectorGuids: ["f343a2d1-3d9e-5778-7ae5-ce36a074030d"],
                },
                value: "flex",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-59-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".dash_modal",
                  selectorGuids: ["f343a2d1-3d9e-5778-7ae5-ce36a074030d"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1656488921465,
    },
    "a-67": {
      id: "a-67",
      title: "Close Change Name Modal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-67-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".modal-change-name",
                  selectorGuids: ["fdafa31c-0033-9d3a-db85-ad50da4d0800"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-67-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 200,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".modal-change-name",
                  selectorGuids: ["fdafa31c-0033-9d3a-db85-ad50da4d0800"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1656488921465,
    },
    "a-73": {
      id: "a-73",
      title: "Close Change Password Modal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-73-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".modal-change-password",
                  selectorGuids: ["b39bbef0-ea7f-b60a-9e5f-2d00c38ee576"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-73-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 200,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".modal-change-password",
                  selectorGuids: ["b39bbef0-ea7f-b60a-9e5f-2d00c38ee576"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1656488921465,
    },
    "a-72": {
      id: "a-72",
      title: "Close Change Email Modal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-72-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".modal-change-email",
                  selectorGuids: ["0867a5f3-f3c2-84ea-a683-0fb1a00b9231"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-72-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 200,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".modal-change-email",
                  selectorGuids: ["0867a5f3-f3c2-84ea-a683-0fb1a00b9231"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1656488921465,
    },
    "a-69": {
      id: "a-69",
      title: "Open Change Name Modal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-69-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".modal-change-name",
                  selectorGuids: ["fdafa31c-0033-9d3a-db85-ad50da4d0800"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-69-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".modal-change-name",
                  selectorGuids: ["fdafa31c-0033-9d3a-db85-ad50da4d0800"],
                },
                value: "flex",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-69-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  selector: ".modal-change-name",
                  selectorGuids: ["fdafa31c-0033-9d3a-db85-ad50da4d0800"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1656488921465,
    },
    "a-70": {
      id: "a-70",
      title: "Open Change Email Modal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-70-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".modal-change-email",
                  selectorGuids: ["0867a5f3-f3c2-84ea-a683-0fb1a00b9231"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-70-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".modal-change-email",
                  selectorGuids: ["0867a5f3-f3c2-84ea-a683-0fb1a00b9231"],
                },
                value: "flex",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-70-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  selector: ".modal-change-email",
                  selectorGuids: ["0867a5f3-f3c2-84ea-a683-0fb1a00b9231"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1656488921465,
    },
    "a-71": {
      id: "a-71",
      title: "Open Change Password Modal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-71-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".modal-change-password",
                  selectorGuids: ["b39bbef0-ea7f-b60a-9e5f-2d00c38ee576"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-71-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".modal-change-password",
                  selectorGuids: ["b39bbef0-ea7f-b60a-9e5f-2d00c38ee576"],
                },
                value: "flex",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-71-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  selector: ".modal-change-password",
                  selectorGuids: ["b39bbef0-ea7f-b60a-9e5f-2d00c38ee576"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1656488921465,
    },
    "a-74": {
      id: "a-74",
      title: "Close Signup Pro Personal Modal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-74-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".signup-modal-pro-personal",
                  selectorGuids: ["6c160b99-033e-2e28-46ef-7796583aaecf"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-74-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 200,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".signup-modal-pro-personal",
                  selectorGuids: ["6c160b99-033e-2e28-46ef-7796583aaecf"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1656488921465,
    },
    "a-160": {
      id: "a-160",
      title: "Close Signup Pro Personal Open Login",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-160-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".signup-modal-pro-personal",
                  selectorGuids: ["6c160b99-033e-2e28-46ef-7796583aaecf"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-160-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".signup-modal-pro-personal",
                  selectorGuids: ["6c160b99-033e-2e28-46ef-7796583aaecf"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-160-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".login-modal",
                  selectorGuids: ["2ea84ebb-23aa-3d17-94dc-e311cbb4605d"],
                },
                value: "flex",
              },
            },
            {
              id: "a-160-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 0,
                target: {
                  selector: ".login-modal",
                  selectorGuids: ["2ea84ebb-23aa-3d17-94dc-e311cbb4605d"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1656488921465,
    },
    "a-78": {
      id: "a-78",
      title: "Close Signup Pro Team Modal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-78-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".signup-modal-pro-team",
                  selectorGuids: ["871b63f6-f21a-36ae-a4a8-747af024b5be"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-78-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 200,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".signup-modal-pro-team",
                  selectorGuids: ["871b63f6-f21a-36ae-a4a8-747af024b5be"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1656488921465,
    },
    "a-75": {
      id: "a-75",
      title: "Close Signup Pro Team Open Login",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-75-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".signup-modal-pro-team",
                  selectorGuids: ["871b63f6-f21a-36ae-a4a8-747af024b5be"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-75-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".signup-modal-pro-team",
                  selectorGuids: ["871b63f6-f21a-36ae-a4a8-747af024b5be"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-75-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".login-modal",
                  selectorGuids: ["2ea84ebb-23aa-3d17-94dc-e311cbb4605d"],
                },
                value: "flex",
              },
            },
            {
              id: "a-75-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 0,
                target: {
                  selector: ".login-modal",
                  selectorGuids: ["2ea84ebb-23aa-3d17-94dc-e311cbb4605d"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1656488921465,
    },
    "a-80": {
      id: "a-80",
      title: "Open Change Team Name Modal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-80-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".modal-change-team-name",
                  selectorGuids: ["ef02fe14-e234-2a00-e4bd-4cdfa08b40a0"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-80-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".modal-change-team-name",
                  selectorGuids: ["ef02fe14-e234-2a00-e4bd-4cdfa08b40a0"],
                },
                value: "flex",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-80-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  selector: ".modal-change-team-name",
                  selectorGuids: ["ef02fe14-e234-2a00-e4bd-4cdfa08b40a0"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1656488921465,
    },
    "a-79": {
      id: "a-79",
      title: "Close Change Team Name Modal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-79-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".modal-change-team-name",
                  selectorGuids: ["ef02fe14-e234-2a00-e4bd-4cdfa08b40a0"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-79-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 200,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".modal-change-team-name",
                  selectorGuids: ["ef02fe14-e234-2a00-e4bd-4cdfa08b40a0"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1656488921465,
    },
    "a-88": {
      id: "a-88",
      title: "open-filter-on-mobile",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-88-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".filter",
                  selectorGuids: ["f722e3d8-95af-882e-a082-9e1f2e4947c1"],
                },
                value: "none",
              },
            },
            {
              id: "a-88-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".filter",
                  selectorGuids: ["f722e3d8-95af-882e-a082-9e1f2e4947c1"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-88-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".filter",
                  selectorGuids: ["f722e3d8-95af-882e-a082-9e1f2e4947c1"],
                },
                value: "flex",
              },
            },
            {
              id: "a-88-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 400,
                target: {
                  selector: ".filter",
                  selectorGuids: ["f722e3d8-95af-882e-a082-9e1f2e4947c1"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1697441334604,
    },
    "a-6": {
      id: "a-6",
      title: "Open Signup Modal Free",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-6-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".signup-modal-free",
                  selectorGuids: ["afd9da91-8710-8c1f-bb52-b0eb282f74b3"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-6-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".signup-modal-free",
                  selectorGuids: ["afd9da91-8710-8c1f-bb52-b0eb282f74b3"],
                },
                value: "flex",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-6-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  selector: ".signup-modal-free",
                  selectorGuids: ["afd9da91-8710-8c1f-bb52-b0eb282f74b3"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1656488921465,
    },
    "a-92": {
      id: "a-92",
      title: "hero-paralax",
      continuousParameterGroups: [
        {
          id: "a-92-p",
          type: "MOUSE_X",
          parameterLabel: "Mouse X",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-92-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa6",
                    },
                    xValue: -10,
                    yValue: null,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-5",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa7",
                    },
                    xValue: -10,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-9",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa8",
                    },
                    xValue: -10,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-13",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa9",
                    },
                    xValue: -10,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-17",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa5",
                    },
                    xValue: -15,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-21",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa4",
                    },
                    xValue: -20,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-25",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa2",
                    },
                    xValue: -20,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-29",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa3",
                    },
                    xValue: -20,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-33",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa1",
                    },
                    xValue: -30,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-37",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa0",
                    },
                    xValue: -30,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-41",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5af9f",
                    },
                    xValue: -40,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-45",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5af9e",
                    },
                    xValue: -40,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-49",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afaa",
                    },
                    xValue: -10,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-92-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa6",
                    },
                    xValue: 10,
                    yValue: null,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-6",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa7",
                    },
                    xValue: 10,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-10",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa8",
                    },
                    xValue: 10,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-14",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa9",
                    },
                    xValue: 10,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-18",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa5",
                    },
                    xValue: 15,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-22",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa4",
                    },
                    xValue: 20,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-26",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa2",
                    },
                    xValue: 20,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-30",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa3",
                    },
                    xValue: 20,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-34",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa1",
                    },
                    xValue: 30,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-38",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa0",
                    },
                    xValue: 30,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-42",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5af9f",
                    },
                    xValue: 40,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-46",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5af9e",
                    },
                    xValue: 40,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-50",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afaa",
                    },
                    xValue: 10,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "a-92-p-2",
          type: "MOUSE_Y",
          parameterLabel: "Mouse Y",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-92-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa6",
                    },
                    xValue: null,
                    yValue: -10,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-7",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa7",
                    },
                    yValue: -10,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-11",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa8",
                    },
                    yValue: -10,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-15",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa9",
                    },
                    yValue: -10,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-19",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa5",
                    },
                    yValue: -15,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-23",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa4",
                    },
                    yValue: -20,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-27",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa2",
                    },
                    xValue: null,
                    yValue: -20,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-31",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa3",
                    },
                    xValue: null,
                    yValue: -20,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-35",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa1",
                    },
                    yValue: -30,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-39",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa0",
                    },
                    yValue: -30,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-43",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5af9f",
                    },
                    yValue: -40,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-47",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5af9e",
                    },
                    yValue: -40,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-51",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afaa",
                    },
                    yValue: -10,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-92-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa6",
                    },
                    xValue: null,
                    yValue: 10,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-8",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa7",
                    },
                    yValue: 10,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-12",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa8",
                    },
                    yValue: 10,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-16",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa9",
                    },
                    yValue: 10,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-20",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa5",
                    },
                    yValue: 15,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-24",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa4",
                    },
                    yValue: 20,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-28",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa2",
                    },
                    xValue: null,
                    yValue: 20,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-32",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa3",
                    },
                    yValue: 20,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-36",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa1",
                    },
                    yValue: 30,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-40",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afa0",
                    },
                    yValue: 30,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-44",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5af9f",
                    },
                    yValue: 40,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-48",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5af9e",
                    },
                    yValue: 40,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-92-n-52",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afaa",
                    },
                    yValue: 10,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1699006831836,
    },
    "a-93": {
      id: "a-93",
      title: "benefits-banner-moving",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-93-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afc3",
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-93-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 48000,
                target: {
                  id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afc3",
                },
                xValue: -5050,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-93-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afc3",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699009481128,
    },
    "a-94": {
      id: "a-94",
      title: "cta-section-paralax",
      continuousParameterGroups: [
        {
          id: "a-94-p",
          type: "MOUSE_X",
          parameterLabel: "Mouse X",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-94-n-13",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|cae81ea6-7072-ed22-5e42-dcf7b811f6ea",
                    },
                    xValue: -40,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-94-n-14",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|cae81ea6-7072-ed22-5e42-dcf7b811f6ea",
                    },
                    xValue: 40,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "a-94-p-2",
          type: "MOUSE_Y",
          parameterLabel: "Mouse Y",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-94-n-15",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|cae81ea6-7072-ed22-5e42-dcf7b811f6ea",
                    },
                    yValue: -40,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-94-n-16",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862dc5|cae81ea6-7072-ed22-5e42-dcf7b811f6ea",
                    },
                    yValue: 40,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1699006831836,
    },
    "a-95": {
      id: "a-95",
      title: "fade-in-content-wrapper",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-95-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".content-wrapper",
                  selectorGuids: ["87750ce8-cfc4-2d5c-ec37-db8b7f32fafa"],
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-95-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".content-wrapper",
                  selectorGuids: ["87750ce8-cfc4-2d5c-ec37-db8b7f32fafa"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-95-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".content-wrapper",
                  selectorGuids: ["87750ce8-cfc4-2d5c-ec37-db8b7f32fafa"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-95-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".content-wrapper",
                  selectorGuids: ["87750ce8-cfc4-2d5c-ec37-db8b7f32fafa"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699260714600,
    },
    "a-96": {
      id: "a-96",
      title: "fade-in-tabs",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-96-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-96-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-96-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-96-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699260714600,
    },
    "a-115": {
      id: "a-115",
      title: "fade-in-cta-button__wrapper",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-115-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-115-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-115-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-115-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699260714600,
    },
    "a-97": {
      id: "a-97",
      title: "fade-in-lp-grid__img-fullbleed",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-97-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-97-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-97-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-97-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699260714600,
    },
    "a-98": {
      id: "a-98",
      title: "lp-feature-wrapper",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-98-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-98-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-98-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-98-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699260714600,
    },
    "a-102": {
      id: "a-102",
      title: "lp-feature-wrapper 2",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-102-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-102-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-102-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 150,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-102-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 150,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699260714600,
    },
    "a-99": {
      id: "a-99",
      title: "lp-feature-wrapper-3",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-99-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-99-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-99-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 300,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-99-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 300,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699260714600,
    },
    "a-100": {
      id: "a-100",
      title: "lp-feature-wrapper-4",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-100-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-100-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-100-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 450,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-100-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 450,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699260714600,
    },
    "a-101": {
      id: "a-101",
      title: "lp-grid__grid-img-1",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-101-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-101-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-101-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-101-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699260714600,
    },
    "a-103": {
      id: "a-103",
      title: "lp-grid__grid-img-2",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-103-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-103-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-103-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-103-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 200,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699260714600,
    },
    "a-104": {
      id: "a-104",
      title: "lp-grid__grid-img-2 2",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-104-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-104-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-104-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 400,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-104-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 400,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699260714600,
    },
    "a-106": {
      id: "a-106",
      title: "lp-grid__grid-img-ratio-1-1",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-106-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-106-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-106-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-106-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699260714600,
    },
    "a-107": {
      id: "a-107",
      title: "lp-grid__grid-img-ratio-2-1",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-107-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-107-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-107-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 250,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-107-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 250,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699260714600,
    },
    "a-108": {
      id: "a-108",
      title: "lp-grid__grid-img-ratio-1-2-delay",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-108-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-108-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-108-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 250,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-108-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 250,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699260714600,
    },
    "a-109": {
      id: "a-109",
      title: "lp-grid__grid-img-ratio-1-2",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-109-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-109-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-109-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-109-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699260714600,
    },
    "a-113": {
      id: "a-113",
      title: "fade-in-faq__text-wrapper",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-113-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-113-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-113-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-113-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699260714600,
    },
    "a-114": {
      id: "a-114",
      title: "fade-in-wrap_faq",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-114-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-114-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-114-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-114-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699260714600,
    },
    "a-28": {
      id: "a-28",
      title: "FAQ [Open]",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-28-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".wrap-faq-icon",
                  selectorGuids: ["ca88b3d1-0969-7ccd-34ef-dc6ae8fb1919"],
                },
                zValue: -180,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-28-n-2",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".wrap_faq_a",
                  selectorGuids: ["ca88b3d1-0969-7ccd-34ef-dc6ae8fb194a"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
            {
              id: "a-28-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".wrap_faq_a",
                  selectorGuids: ["ca88b3d1-0969-7ccd-34ef-dc6ae8fb194a"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-28-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".wrap-faq-icon",
                  selectorGuids: ["ca88b3d1-0969-7ccd-34ef-dc6ae8fb1919"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-28-n-4",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 100,
                easing: "inOutQuart",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".wrap_faq_a",
                  selectorGuids: ["ca88b3d1-0969-7ccd-34ef-dc6ae8fb194a"],
                },
                widthUnit: "PX",
                heightUnit: "AUTO",
                locked: false,
              },
            },
            {
              id: "a-28-n-6",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 100,
                easing: "inOutQuart",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".wrap_faq_a",
                  selectorGuids: ["ca88b3d1-0969-7ccd-34ef-dc6ae8fb194a"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1630703978872,
    },
    "a-29": {
      id: "a-29",
      title: "FAQ  [Close]",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-29-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".wrap-faq-icon",
                  selectorGuids: ["ca88b3d1-0969-7ccd-34ef-dc6ae8fb1919"],
                },
                zValue: -180,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-29-n-2",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 100,
                easing: "inOutQuart",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".wrap_faq_a",
                  selectorGuids: ["ca88b3d1-0969-7ccd-34ef-dc6ae8fb194a"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
            {
              id: "a-29-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 100,
                easing: "inOutQuart",
                duration: 250,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".wrap_faq_a",
                  selectorGuids: ["ca88b3d1-0969-7ccd-34ef-dc6ae8fb194a"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1630703978872,
    },
    "a-116": {
      id: "a-116",
      title: "fade-in-cta-button__wrapper 2",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-116-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-116-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-116-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-116-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699260714600,
    },
    "a-119": {
      id: "a-119",
      title: "lp-testimonial-01",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-119-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-119-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-119-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-119-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699260714600,
    },
    "a-120": {
      id: "a-120",
      title: "lp-testimonial-02",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-120-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-120-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-120-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 250,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-120-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 250,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699260714600,
    },
    "a-121": {
      id: "a-121",
      title: "lp-testimonial-03",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-121-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-121-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-121-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 500,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-121-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 500,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699260714600,
    },
    "a-122": {
      id: "a-122",
      title: "cta-section-paralax-pricing",
      continuousParameterGroups: [
        {
          id: "a-122-p",
          type: "MOUSE_X",
          parameterLabel: "Mouse X",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-122-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862e3e|24c085bb-1b96-a782-3899-618726819a89",
                    },
                    xValue: -40,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-122-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862e3e|24c085bb-1b96-a782-3899-618726819a89",
                    },
                    xValue: 40,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "a-122-p-2",
          type: "MOUSE_Y",
          parameterLabel: "Mouse Y",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-122-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862e3e|24c085bb-1b96-a782-3899-618726819a89",
                    },
                    yValue: -40,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-122-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65e99f481cdee511e5862e3e|24c085bb-1b96-a782-3899-618726819a89",
                    },
                    yValue: 40,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1699006831836,
    },
    "a-123": {
      id: "a-123",
      title: "Close Pro Modal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-123-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".pro-modal",
                  selectorGuids: ["17a65d65-ec70-9d4e-3df7-d5aba8634742"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-123-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 200,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".pro-modal",
                  selectorGuids: ["17a65d65-ec70-9d4e-3df7-d5aba8634742"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1656488921465,
    },
    "a-134": {
      id: "a-134",
      title: "Close Pro and open Pro Signup",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-134-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".pro-modal",
                  selectorGuids: ["17a65d65-ec70-9d4e-3df7-d5aba8634742"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-134-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 200,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".pro-modal",
                  selectorGuids: ["17a65d65-ec70-9d4e-3df7-d5aba8634742"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-134-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".signup-modal-pro-personal",
                  selectorGuids: ["6c160b99-033e-2e28-46ef-7796583aaecf"],
                },
                value: "flex",
              },
            },
            {
              id: "a-134-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 200,
                target: {
                  selector: ".signup-modal-pro-personal",
                  selectorGuids: ["6c160b99-033e-2e28-46ef-7796583aaecf"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1656488921465,
    },
    "a-3": {
      id: "a-3",
      title: "icon-tile__hover--in",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-3-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon-tile__hover--free",
                  selectorGuids: ["265d494d-404d-c9a6-cee5-a93388f598b5"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-3-n-11",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon-tile__hover--paid",
                  selectorGuids: ["2049967a-509d-8be8-3766-65f564dcb133"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-3-n-12",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon-tile__hover--paid",
                  selectorGuids: ["2049967a-509d-8be8-3766-65f564dcb133"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-3-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon-tile__hover--free",
                  selectorGuids: ["265d494d-404d-c9a6-cee5-a93388f598b5"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1687946745913,
    },
    "a-4": {
      id: "a-4",
      title: "icon-tile__hover--out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-4-n-7",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon-tile__hover--paid",
                  selectorGuids: ["2049967a-509d-8be8-3766-65f564dcb133"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-4-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon-tile__hover--free",
                  selectorGuids: ["265d494d-404d-c9a6-cee5-a93388f598b5"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1687946745913,
    },
    "a-5": {
      id: "a-5",
      title: "icon-tile__copied-in",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-5-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon-tile__copied",
                  selectorGuids: ["5759d1e2-de7d-2759-e702-a63d0ae170bf"],
                },
                value: "none",
              },
            },
            {
              id: "a-5-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon-tile__copied",
                  selectorGuids: ["5759d1e2-de7d-2759-e702-a63d0ae170bf"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-5-n-7",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".tooltip__copied",
                  selectorGuids: ["27678447-1bbe-79fd-b529-e70455058cac"],
                },
                value: "none",
              },
            },
            {
              id: "a-5-n-8",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".tooltip__copied",
                  selectorGuids: ["27678447-1bbe-79fd-b529-e70455058cac"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-5-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon-tile__copied",
                  selectorGuids: ["5759d1e2-de7d-2759-e702-a63d0ae170bf"],
                },
                value: "flex",
              },
            },
            {
              id: "a-5-n-9",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".tooltip__copied",
                  selectorGuids: ["27678447-1bbe-79fd-b529-e70455058cac"],
                },
                value: "block",
              },
            },
            {
              id: "a-5-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon-tile__copied",
                  selectorGuids: ["5759d1e2-de7d-2759-e702-a63d0ae170bf"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-5-n-10",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  selector: ".tooltip__copied",
                  selectorGuids: ["27678447-1bbe-79fd-b529-e70455058cac"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-5-n-13",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  selector: ".tooltip__copy",
                  selectorGuids: ["fee7b8e3-630c-840b-9ea2-890379b75820"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-5-n-14",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 500,
                easing: "",
                duration: 0,
                target: {
                  selector: ".tooltip__copy",
                  selectorGuids: ["fee7b8e3-630c-840b-9ea2-890379b75820"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-5-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 500,
                easing: "ease",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon-tile__copied",
                  selectorGuids: ["5759d1e2-de7d-2759-e702-a63d0ae170bf"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-5-n-11",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 500,
                easing: "ease",
                duration: 200,
                target: {
                  selector: ".tooltip__copied",
                  selectorGuids: ["27678447-1bbe-79fd-b529-e70455058cac"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-5-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon-tile__copied",
                  selectorGuids: ["5759d1e2-de7d-2759-e702-a63d0ae170bf"],
                },
                value: "none",
              },
            },
            {
              id: "a-5-n-12",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".tooltip__copied",
                  selectorGuids: ["27678447-1bbe-79fd-b529-e70455058cac"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1688133017391,
    },
    "a-89": {
      id: "a-89",
      title: "close-filter-on-mobile",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-89-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 400,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".filter",
                  selectorGuids: ["f722e3d8-95af-882e-a082-9e1f2e4947c1"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-89-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 400,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".filter",
                  selectorGuids: ["f722e3d8-95af-882e-a082-9e1f2e4947c1"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1697441334604,
    },
    "a-126": {
      id: "a-126",
      title: "Open Pro Modal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-126-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".pro-modal",
                  selectorGuids: ["17a65d65-ec70-9d4e-3df7-d5aba8634742"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-126-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".pro-modal",
                  selectorGuids: ["17a65d65-ec70-9d4e-3df7-d5aba8634742"],
                },
                value: "flex",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-126-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  selector: ".pro-modal",
                  selectorGuids: ["17a65d65-ec70-9d4e-3df7-d5aba8634742"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1656488921465,
    },
    "a-129": {
      id: "a-129",
      title: "tooltip-copy-hover-in",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-129-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".tooltip__copy",
                  selectorGuids: ["fee7b8e3-630c-840b-9ea2-890379b75820"],
                },
                value: "none",
              },
            },
            {
              id: "a-129-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".tooltip__copy",
                  selectorGuids: ["fee7b8e3-630c-840b-9ea2-890379b75820"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-129-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".tooltip__copy",
                  selectorGuids: ["fee7b8e3-630c-840b-9ea2-890379b75820"],
                },
                value: "block",
              },
            },
            {
              id: "a-129-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  selector: ".tooltip__copy",
                  selectorGuids: ["fee7b8e3-630c-840b-9ea2-890379b75820"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1700037990428,
    },
    "a-130": {
      id: "a-130",
      title: "tooltip-copy-hover-out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-130-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".tooltip__copy",
                  selectorGuids: ["fee7b8e3-630c-840b-9ea2-890379b75820"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-130-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".tooltip__copy",
                  selectorGuids: ["fee7b8e3-630c-840b-9ea2-890379b75820"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1700037990428,
    },
    "a-131": {
      id: "a-131",
      title: "tooltip-download-hover-in",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-131-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".tooltip__download",
                  selectorGuids: ["5e04fddc-f5eb-dbad-0655-8e41079df697"],
                },
                value: "none",
              },
            },
            {
              id: "a-131-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".tooltip__download",
                  selectorGuids: ["5e04fddc-f5eb-dbad-0655-8e41079df697"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-131-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".tooltip__download",
                  selectorGuids: ["5e04fddc-f5eb-dbad-0655-8e41079df697"],
                },
                value: "block",
              },
            },
            {
              id: "a-131-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  selector: ".tooltip__download",
                  selectorGuids: ["5e04fddc-f5eb-dbad-0655-8e41079df697"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1700037990428,
    },
    "a-132": {
      id: "a-132",
      title: "tooltip-download-hover-out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-132-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".tooltip__download",
                  selectorGuids: ["5e04fddc-f5eb-dbad-0655-8e41079df697"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-132-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".tooltip__download",
                  selectorGuids: ["5e04fddc-f5eb-dbad-0655-8e41079df697"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1700037990428,
    },
    "a-90": {
      id: "a-90",
      title: "hide-applied-filters-in-the-beginning 5",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-90-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "65e9e6cd4e66485312d6fe13|509c41ff-f35c-2ac6-32a2-34a4597ab87b",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-90-n-7",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 500,
                easing: "inOutQuart",
                duration: 200,
                target: {
                  id: "65e9e6cd4e66485312d6fe13|509c41ff-f35c-2ac6-32a2-34a4597ab87b",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1686602052697,
    },
    "a-135": {
      id: "a-135",
      title: "hide-applied-filters-in-the-beginning 6",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-135-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "65ec76a55f4b692b317117e4|509c41ff-f35c-2ac6-32a2-34a4597ab87b",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-135-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 500,
                easing: "inOutQuart",
                duration: 200,
                target: {
                  id: "65ec76a55f4b692b317117e4|509c41ff-f35c-2ac6-32a2-34a4597ab87b",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1686602052697,
    },
    "a-137": {
      id: "a-137",
      title: "icon-preview-hover-out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-137-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon-preview__hover-layer",
                  selectorGuids: ["12fc908e-397a-ca43-57b9-c5b087c8be71"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-137-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 200,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon-preview__hover-layer",
                  selectorGuids: ["12fc908e-397a-ca43-57b9-c5b087c8be71"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1709297629825,
    },
    "a-136": {
      id: "a-136",
      title: "icon-preview-hover-in",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-136-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon-preview__hover-layer",
                  selectorGuids: ["12fc908e-397a-ca43-57b9-c5b087c8be71"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-136-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon-preview__hover-layer",
                  selectorGuids: ["12fc908e-397a-ca43-57b9-c5b087c8be71"],
                },
                value: "flex",
              },
            },
            {
              id: "a-136-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon-preview__hover-layer",
                  selectorGuids: ["12fc908e-397a-ca43-57b9-c5b087c8be71"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1709297629825,
    },
    "a-138": {
      id: "a-138",
      title: "hide-applied-filters-in-the-beginning 7",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-138-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "65e99f481cdee511e5862e24|663c2ec5-17a7-b76f-1628-47df6041543c",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-138-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 500,
                easing: "inOutQuart",
                duration: 200,
                target: {
                  id: "65e99f481cdee511e5862e24|663c2ec5-17a7-b76f-1628-47df6041543c",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1686602052697,
    },
    "a-139": {
      id: "a-139",
      title: "graphic-element-animation 7",
      continuousParameterGroups: [
        {
          id: "a-139-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-139-n",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65edcb48bebb9ab36fb39064|3b0a2807-b53e-1815-aa84-ce619b1ac504",
                    },
                    xValue: null,
                    zValue: 0,
                    xUnit: "deg",
                    yUnit: "DEG",
                    zUnit: "deg",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-139-n-2",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65edcb48bebb9ab36fb39064|3b0a2807-b53e-1815-aa84-ce619b1ac504",
                    },
                    xValue: null,
                    zValue: 360,
                    xUnit: "deg",
                    yUnit: "DEG",
                    zUnit: "deg",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1692565884855,
    },
    "a-140": {
      id: "a-140",
      title: "cta-section-paralax-pricing 2",
      continuousParameterGroups: [
        {
          id: "a-140-p",
          type: "MOUSE_X",
          parameterLabel: "Mouse X",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-140-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65edcb48bebb9ab36fb39064|24c085bb-1b96-a782-3899-618726819a89",
                    },
                    xValue: -40,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-140-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65edcb48bebb9ab36fb39064|24c085bb-1b96-a782-3899-618726819a89",
                    },
                    xValue: 40,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "a-140-p-2",
          type: "MOUSE_Y",
          parameterLabel: "Mouse Y",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-140-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65edcb48bebb9ab36fb39064|24c085bb-1b96-a782-3899-618726819a89",
                    },
                    yValue: -40,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-140-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "65edcb48bebb9ab36fb39064|24c085bb-1b96-a782-3899-618726819a89",
                    },
                    yValue: 40,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1699006831836,
    },
    "a-142": {
      id: "a-142",
      title: "menu-button-open 3",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-142-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".dimm-layer",
                  selectorGuids: ["1c2a5a40-869c-98b3-b2b7-f04a3d7c66dc"],
                },
                value: "block",
              },
            },
            {
              id: "a-142-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon__28px",
                  selectorGuids: ["2836249c-ef6e-0909-18f6-e21b7d449fe3"],
                },
                value: "none",
              },
            },
            {
              id: "a-142-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon__28px-close",
                  selectorGuids: ["6e6bc2a9-b9fc-b1b9-75a5-bda0b5f14d81"],
                },
                value: "inline-block",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-142-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 300,
                target: {
                  selector: ".dimm-layer",
                  selectorGuids: ["1c2a5a40-869c-98b3-b2b7-f04a3d7c66dc"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1692221078518,
    },
    "a-143": {
      id: "a-143",
      title: "menu-button-close 3",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-143-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  selector: ".dimm-layer",
                  selectorGuids: ["1c2a5a40-869c-98b3-b2b7-f04a3d7c66dc"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-143-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon__28px-close",
                  selectorGuids: ["6e6bc2a9-b9fc-b1b9-75a5-bda0b5f14d81"],
                },
                value: "none",
              },
            },
            {
              id: "a-143-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".icon__28px",
                  selectorGuids: ["2836249c-ef6e-0909-18f6-e21b7d449fe3"],
                },
                value: "inline-block",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-143-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".dimm-layer",
                  selectorGuids: ["1c2a5a40-869c-98b3-b2b7-f04a3d7c66dc"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1692221233647,
    },
    "a-147": {
      id: "a-147",
      title: "open-filter-on-mobile 2",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-147-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".filter",
                  selectorGuids: ["f722e3d8-95af-882e-a082-9e1f2e4947c1"],
                },
                value: "none",
              },
            },
            {
              id: "a-147-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".filter",
                  selectorGuids: ["f722e3d8-95af-882e-a082-9e1f2e4947c1"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-147-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".filter",
                  selectorGuids: ["f722e3d8-95af-882e-a082-9e1f2e4947c1"],
                },
                value: "flex",
              },
            },
            {
              id: "a-147-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 400,
                target: {
                  selector: ".filter",
                  selectorGuids: ["f722e3d8-95af-882e-a082-9e1f2e4947c1"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1697441334604,
    },
    "a-154": {
      id: "a-154",
      title: "Close Signup Pro Enterprise Modal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-154-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".signup-modal-pro-enterprise",
                  selectorGuids: ["33c34662-77bf-19d5-e0ec-e752e916ef5f"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-154-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 200,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".signup-modal-pro-enterprise",
                  selectorGuids: ["33c34662-77bf-19d5-e0ec-e752e916ef5f"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1656488921465,
    },
    "a-152": {
      id: "a-152",
      title: "Close Signup Pro Enterprise Open Login",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-152-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".signup-modal-pro-enterprise",
                  selectorGuids: ["33c34662-77bf-19d5-e0ec-e752e916ef5f"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-152-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".signup-modal-pro-enterprise",
                  selectorGuids: ["33c34662-77bf-19d5-e0ec-e752e916ef5f"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-152-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".login-modal",
                  selectorGuids: ["2ea84ebb-23aa-3d17-94dc-e311cbb4605d"],
                },
                value: "flex",
              },
            },
            {
              id: "a-152-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 0,
                target: {
                  selector: ".login-modal",
                  selectorGuids: ["2ea84ebb-23aa-3d17-94dc-e311cbb4605d"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1656488921465,
    },
    "a-77": {
      id: "a-77",
      title: "Open Signup Modal Pro Team",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-77-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".signup-modal-pro-team",
                  selectorGuids: ["871b63f6-f21a-36ae-a4a8-747af024b5be"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-77-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".signup-modal-pro-team",
                  selectorGuids: ["871b63f6-f21a-36ae-a4a8-747af024b5be"],
                },
                value: "flex",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-77-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  selector: ".signup-modal-pro-team",
                  selectorGuids: ["871b63f6-f21a-36ae-a4a8-747af024b5be"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1656488921465,
    },
    "a-153": {
      id: "a-153",
      title: "Open Signup Modal Pro Enterprise",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-153-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".signup-modal-pro-enterprise",
                  selectorGuids: ["33c34662-77bf-19d5-e0ec-e752e916ef5f"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-153-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".signup-modal-pro-enterprise",
                  selectorGuids: ["33c34662-77bf-19d5-e0ec-e752e916ef5f"],
                },
                value: "flex",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-153-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  selector: ".signup-modal-pro-enterprise",
                  selectorGuids: ["33c34662-77bf-19d5-e0ec-e752e916ef5f"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1656488921465,
    },
    "a-157": {
      id: "a-157",
      title: "fade-in-trust-section",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-157-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afb0",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-157-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afb0",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-157-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afb0",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-157-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|802f3ea7-eb99-d3f1-04fe-8d4087e5afb0",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699260714600,
    },
    "a-110": {
      id: "a-110",
      title: "fade-in-pricing-card-01",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-110-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-110-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-110-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-110-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699260714600,
    },
    "a-111": {
      id: "a-111",
      title: "fade-in-pricing-card-02",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-111-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-111-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-111-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 250,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-111-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 250,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699260714600,
    },
    "a-112": {
      id: "a-112",
      title: "fade-in-pricing-card-03",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-112-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-112-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-112-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 500,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-112-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 500,
                easing: "inOutQuart",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "65e99f481cdee511e5862dc5|3321ee7e-41a9-291e-1b10-bdb8abb848b9",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699260714600,
    },
    "a-158": {
      id: "a-158",
      title: "Close Change Password Modal Without Current",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-158-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 200,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".modal-change-password-without-current",
                  selectorGuids: ["190e3521-1946-cf17-18b9-a512d7ef02e1"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-158-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 200,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".modal-change-password-without-current",
                  selectorGuids: ["190e3521-1946-cf17-18b9-a512d7ef02e1"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1656488921465,
    },
    slideInBottom: {
      id: "slideInBottom",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 100,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
          ],
        },
      ],
    },
    growIn: {
      id: "growIn",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0.7500000000000001,
                yValue: 0.7500000000000001,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 1,
                yValue: 1,
              },
            },
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
          ],
        },
      ],
    },
  },
  site: {
    mediaQueries: [
      { key: "main", min: 992, max: 10000 },
      { key: "medium", min: 768, max: 991 },
      { key: "small", min: 480, max: 767 },
      { key: "tiny", min: 0, max: 479 },
    ],
  },
});
