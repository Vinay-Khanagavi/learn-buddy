!(function (e) {
  "function" == typeof define && define.amd ? define(e) : e();
})(function () {
  "use strict";
  !(function () {
    const e = {};
    try {
      if (process)
        return (
          (process.env = Object.assign({}, process.env)),
          void Object.assign(process.env, e)
        );
    } catch (e) {}
    globalThis.process = { env: e };
  })();
  const e = (e) => !0 === e || "true" === e || "1" === e,
    t = e(process.env.CI),
    n = e(localStorage.getItem("nocodelytics:debug") || ""),
    o = document.querySelector("#nocodelytics-snippet"),
    i =
      window.__NOCODELYTICS_SITE_ID__ ||
      o?.dataset.siteId ||
      document.querySelector("html")?.getAttribute("data-wf-site") ||
      "";
  if (!i && !t)
    throw new Error(
      "siteId not found. Make sure you have the latest version of the snippet."
    );
  if (
    new Set([
      "95fbb9f8-d8b5-4301-8f7f-8d5af58394ba",
      "f17b27e5-253c-4f8d-9977-39746ba4b8e0",
      "de42fd9d-b089-4d78-a3bd-c867fd4a80d6",
      "7444ce58-dfa3-4250-94c6-6fa94b70f5cf",
      "79427bd2-7d86-46b5-837a-fef47ba0915b",
      "dccfc67f-61ad-4a8a-8804-8667809dd2fb",
      "27da6a80-d43d-4840-8b38-3b748f245bbc",
      "d661281f-7939-4e49-8ae9-41977deb2dc8",
      "3397e209-6fcf-4a05-ba5f-3d806c0ea3e8",
      "5877d590-98fd-4baa-bb1b-86172f70b538",
      "89d50da1-9aef-4cdc-9e5e-8474c2fe6325",
      "e94dbb50-7377-4dee-886c-a6d1b1f8bf77",
    ]).has(i)
  )
    throw new Error("Nocodelytics site disabled. Payment required.");
  const s = {
    app: {
      name: "nocodelytics",
      api: {
        url: (() => {
          const e = localStorage.getItem("nocodelytics:apiUrl");
          return "string" == typeof e
            ? e
            : "https://tracker.nocodelytics.com/api/tracker";
        })(),
      },
      siteId: i,
    },
    ci: t,
    debug: n,
  };
  n && console.info(s);
  const r = (e, t = 300) => {
      let n, o, i;
      return function () {
        const s = this,
          r = arguments;
        n
          ? (clearTimeout(o),
            (o = setTimeout(() => {
              Date.now() - i >= t && (e.apply(s, r), (i = Date.now()));
            }, Math.max(t - (Date.now() - i), 0))))
          : (e.apply(s, r), (i = Date.now()), (n = !0));
      };
    },
    a = [],
    c = r(async () => {
      if (0 === a.length) return;
      const e = await fetch(`${s.app.api.url}/uuid?c=${a.length}`, {
        headers: { Accept: "application/json" },
      });
      for (const t of await e.json()) {
        const e = a.pop();
        e && e(t);
      }
    }, 0),
    d = () => {
      const e = new Promise((e) => {
        a.push(e);
      });
      return c(), e;
    },
    l = "nocodelytics:visitor-id";
  let m = null,
    u = null;
  const f = () =>
      u
        ? Promise.resolve(u)
        : m ||
          ((m = new Promise(async (e, t) => {
            try {
              const t =
                localStorage.getItem(l) ||
                localStorage.getItem("Nocodelytics:visitor-id");
              if (t && "undefined" !== t && "null" !== t) return (u = t), e(t);
            } catch (e) {
              console.error(e),
                console.error(
                  "failed to get existingVisitorId from localStorage"
                ),
                t(e);
            }
            try {
              const t = await d();
              return localStorage.setItem(l, t), (u = t), e(t);
            } catch (e) {
              console.error("failed to get a new uuid for new visitor id"),
                t(e);
            }
          })),
          m),
    p = (e, t = 300) => {
      let n;
      return function (...o) {
        clearTimeout(n), (n = setTimeout(() => e.apply(this, o), t));
      };
    },
    y = (...e) => {
      s.debug && !s.ci && console.info(...e);
    },
    w = async (e) =>
      fetch(`${s.app.api.url}/identify`, {
        method: "post",
        cache: "no-cache",
        credentials: "omit",
        body: JSON.stringify({ ...e, visitorId: await f() }),
      }),
    g = async () => {
      const e = await new Promise((e) => {
        const n = t?.timeoutInSeconds || 1;
        if (window && window.$memberstackDom) return e(window.$memberstackDom);
        let o = 0;
        const i = setInterval(() => {
          o >= n - 1 && (clearInterval(i), e(null)),
            (o += 1),
            window.$memberstackDom &&
              (clearInterval(i), e(window.$memberstackDom));
        }, 1e3);
      });
      var t;
      if (!e) return;
      const n = await e.getCurrentMember();
      if (!n.data) return;
      if (!n.data.auth) return;
      const o = { emailAddress: n.data.auth.email, memberstackId: n.data.id };
      await w(o);
    },
    b = async () => {
      const e = await new Promise((e) => {
        const n = t?.timeoutInSeconds || 1;
        if (window && window.Outseta) return e(window.Outseta);
        let o = 0;
        const i = setInterval(() => {
          o >= n - 1 && (clearInterval(i), e(null)),
            (o += 1),
            window.Outseta && (clearInterval(i), e(window.Outseta));
        }, 1e3);
      });
      var t;
      if (!e) return;
      const n = await e.getUser();
      if (!n) return;
      const o = { emailAddress: n.Email, outsetaId: n.Uid };
      await w(o);
    };
  var v, h;
  !(function (e) {
    (e.Click = "click"),
      (e.Cms = "cms"),
      (e.Keyboard = "keyboard"),
      (e.View = "view"),
      (e.Form = "form");
  })(v || (v = {})),
    (function (e) {
      (e.Display = "display"), (e.Interact = "interact"), (e.Submit = "submit");
    })(h || (h = {}));
  const I = {
      [v.Click]: "c",
      [v.Cms]: "m",
      [v.Form]: "f",
      [v.Keyboard]: "k",
      [v.View]: "v",
    },
    S = { [h.Display]: "d", [h.Interact]: "i", [h.Submit]: "s" },
    E = async (e) => {
      const t = {
        id: e.id,
        s: s.app.siteId,
        t: I[e.eventType],
        p: window.location.pathname + window.location.search,
        c: e.cssClass,
        i: e.cssId,
        va: e.value,
        v: await f(),
        r: document.referrer,
        f: e.formStage && S[e.formStage],
        is: e.cmsItemSlug,
        cl: e.cmsListIndex?.toString(),
        ci: e.cmsItemIndex?.toString(),
        d: document.location.hostname,
      };
      await fetch(
        `${s.app.api.url}/n?${((e) => {
          const t = e,
            n = new URLSearchParams();
          for (const e of Object.keys(t)) {
            const o = t[e];
            o && n.append(e, o);
          }
          return n.toString();
        })(t)}`,
        { cache: "no-cache", credentials: "omit" }
      );
    },
    C = [],
    k = async (e, t) => {
      if (
        !e.id ||
        C.includes(e.id) ||
        !((e) => {
          if (!(e instanceof Element))
            throw new Error("DomUtil: elem is not an element.");
          const t = getComputedStyle(e);
          if ("none" === t.display) return !1;
          if ("visible" !== t.visibility) return !1;
          if (Number.parseInt(t.opacity, 10) < 0.1) return !1;
          if (
            e.offsetWidth +
              e.offsetHeight +
              e.getBoundingClientRect().height +
              e.getBoundingClientRect().width ===
            0
          )
            return !1;
          const n = {
            x: e.getBoundingClientRect().left + e.offsetWidth / 2,
            y: e.getBoundingClientRect().top + e.offsetHeight / 2,
          };
          if (n.x < 0) return !1;
          if (n.x > (document.documentElement.clientWidth || window.innerWidth))
            return !1;
          if (n.y < 0) return !1;
          if (
            n.y > (document.documentElement.clientHeight || window.innerHeight)
          )
            return !1;
          let o = document.elementFromPoint(n.x, n.y);
          do {
            if (o === e) return !0;
          } while ((o = o?.parentNode));
          return !1;
        })(e)
      )
        return;
      let n = await d();
      const o = e.id;
      t.onChange({ id: n, cssId: o, formStage: h.Display }), C.push(e.id);
      let i = !1;
      const s = { cssId: e.id },
        r = [...document.querySelectorAll("input[type=password]")].map(
          (e) => e.name
        );
      y("registerFormEventsListener", {
        passwordInputNames: r,
        metricEvent: s,
      });
      const a = p(() => {
          i || t.onChange({ id: n, cssId: e.id, formStage: h.Interact });
        }),
        c = () => {
          i ||
            ((i = !0),
            setTimeout(async () => {
              (i = !1), (n = await d());
            }, 1e3),
            t.onChange({ id: n, cssId: e.id, formStage: h.Submit }));
        };
      e.addEventListener("keydown", () => a(e)),
        e.addEventListener("click", () => a(e)),
        e.addEventListener("change", () => a(e));
      for (const t of ["input[type=submit]", "button[type=submit]"])
        for (const n of e.querySelectorAll(t))
          y("registerFormEventsListener", { submitBtn: n }),
            n.addEventListener("click", () => c()),
            n.addEventListener("pointerdown", () => c());
      e.addEventListener("submit", () => c());
    },
    x = (e) => {
      const t = e.root.querySelectorAll(e.cssSelectors.join(", "));
      for (const n of t) k(n, e);
    },
    L = async (e) => {
      E({ eventType: v.View }),
        (async () => {
          await Promise.all([g(), b()]);
        })(),
        (({ root: e, onEvent: t }) => {
          for (const [n, o] of e.querySelectorAll(".w-dyn-list").entries()) {
            y("registerCmsEventClick", { listIndex: n, listElement: o });
            for (const [e, i] of o.querySelectorAll(".w-dyn-item").entries())
              y("registerCmsEventClick", { itemIndex: e, itemElement: i }),
                i.addEventListener(
                  "pointerdown",
                  p(() => {
                    const s = o.className
                        .split(" ")
                        .find((e) => e.startsWith("nocodelytics-"))
                        ?.trim(),
                      r = i.querySelector(
                        "input.nocodelytics-list-item"
                      )?.value;
                    t({
                      listIndex: n,
                      itemIndex: e,
                      collectionCssClass: s,
                      collectionItemSlug: r,
                    });
                  })
                );
          }
        })({
          root: e,
          onEvent: ({
            collectionCssClass: e,
            collectionItemSlug: t,
            itemIndex: n,
            listIndex: o,
          }) =>
            E({
              eventType: v.Cms,
              cssClass: e,
              cmsItemSlug: t,
              cmsListIndex: o,
              cmsItemIndex: n,
            }),
        });
      const t =
        (await (async () =>
          (await (
            await fetch(`${s.app.api.url}/metrics?s=${s.app.siteId}`, {
              cache: "no-cache",
              credentials: "omit",
            })
          ).json()) || [])()) || [];
      ((e) => {
        if (0 === e.cssSelectors.length) return;
        y("registerFormEventsListener", e.root.querySelectorAll("form"));
        const { root: t } = e;
        new MutationObserver(
          r(() => {
            x(e);
          }, 1e3)
        ).observe(t, {
          attributes: !0,
          childList: !0,
          characterData: !0,
          subtree: !0,
        }),
          x(e);
      })({
        root: e,
        cssSelectors: t
          .filter(({ event_type: e }) => e === v.Form)
          .map(({ css_selector: e }) => e),
        onChange: (e) => E({ eventType: v.Form, ...e }),
      }),
        (({ root: e, cssSelectors: t, onEvent: n }) => {
          if (0 !== t.length)
            for (const o of e.querySelectorAll(t.join(", ")))
              o.addEventListener("pointerdown", async () => {
                n({ cssClass: o.className || void 0, cssId: o.id || void 0 });
              });
        })({
          root: e,
          cssSelectors: t
            .filter(({ event_type: e }) => e === v.Click)
            .map(({ css_selector: e }) => e),
          onEvent: (e) => E({ eventType: v.Click, ...e }),
        }),
        (async ({ root: e, cssSelectors: t, onEvent: n }) => {
          if (0 === t.length) return;
          y("registerKeyboardEventsListener");
          const o = [...e.querySelectorAll(t.join(", "))].filter(
            (e) =>
              !e.type ||
              [
                "color",
                "date",
                "datetime-local",
                "email",
                "month",
                "number",
                "range",
                "search",
                "tel",
                "text",
                "time",
                "url",
                "week",
              ].includes(e.type)
          );
          y({ inputElements: o });
          for (const [e, t] of o.entries())
            !t.type ||
            [
              "color",
              "date",
              "datetime-local",
              "email",
              "month",
              "number",
              "range",
              "search",
              "tel",
              "text",
              "time",
              "url",
              "week",
            ].includes(t.type)
              ? (y("registerKeyboardEventsListener", { inputElement: t }),
                t.addEventListener(
                  "keyup",
                  p(async (e) => {
                    const { id: o, className: i, value: s } = e.target;
                    (o || i) &&
                      (y("registerKeyboardEventsListener", t, "change", s),
                      n({
                        eventId: await d(),
                        cssId: o,
                        cssClass: i,
                        value: s,
                      }));
                  }, 1e3)
                ))
              : y(t, "rejected");
        })({
          root: e,
          cssSelectors: t
            .filter(({ event_type: e }) => e === v.Keyboard)
            .map(({ css_selector: e }) => e),
          onEvent: async (e) =>
            E({ id: e.eventId, eventType: v.Keyboard, ...e }),
        });
    };
  (async () => {
    localStorage.getItem("nocodelytics:disabled") ||
      ((navigator.doNotTrack ||
        (window.external &&
          "msTrackingProtectionEnabled" in window.external)) &&
        ("yes" == navigator.doNotTrack || "1" == navigator.doNotTrack)) ||
      (await L(document.body));
  })();
});
//# sourceMappingURL=nocodelytics.js.map
