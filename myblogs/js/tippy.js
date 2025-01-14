!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e(require("@popperjs/core")))
    : "function" == typeof define && define.amd
    ? define(["@popperjs/core"], e)
    : ((t = t || self).tippy = e(t.Popper));
})(this, function (t) {
  "use strict";
  var e = "undefined" != typeof window && "undefined" != typeof document,
    n = e ? navigator.userAgent : "",
    i = /MSIE |Trident\//.test(n),
    r = { passive: !0, capture: !0 };
  function o(t, e, n) {
    if (Array.isArray(t)) {
      var i = t[e];
      return null == i ? (Array.isArray(n) ? n[e] : n) : i;
    }
    return t;
  }
  function a(t, e) {
    var n = {}.toString.call(t);
    return 0 === n.indexOf("[object") && n.indexOf(e + "]") > -1;
  }
  function s(t, e) {
    return "function" == typeof t ? t.apply(void 0, e) : t;
  }
  function p(t, e) {
    return 0 === e
      ? t
      : function (i) {
          clearTimeout(n),
            (n = setTimeout(function () {
              t(i);
            }, e));
        };
    var n;
  }
  function u(t, e) {
    var n = Object.assign({}, t);
    return (
      e.forEach(function (t) {
        delete n[t];
      }),
      n
    );
  }
  function c(t) {
    return [].concat(t);
  }
  function f(t, e) {
    -1 === t.indexOf(e) && t.push(e);
  }
  function l(t) {
    return t.split("-")[0];
  }
  function d(t) {
    return [].slice.call(t);
  }
  function v() {
    return document.createElement("div");
  }
  function m(t) {
    return ["Element", "Fragment"].some(function (e) {
      return a(t, e);
    });
  }
  function g(t) {
    return a(t, "MouseEvent");
  }
  function h(t) {
    return !(!t || !t._tippy || t._tippy.reference !== t);
  }
  function b(t) {
    return m(t)
      ? [t]
      : (function (t) {
          return a(t, "NodeList");
        })(t)
      ? d(t)
      : Array.isArray(t)
      ? t
      : d(document.querySelectorAll(t));
  }
  function y(t, e) {
    t.forEach(function (t) {
      t && (t.style.transitionDuration = e + "ms");
    });
  }
  function x(t, e) {
    t.forEach(function (t) {
      t && t.setAttribute("data-state", e);
    });
  }
  function w(t) {
    var e = c(t)[0];
    return (e && e.ownerDocument) || document;
  }
  function E(t, e, n) {
    var i = e + "EventListener";
    ["transitionend", "webkitTransitionEnd"].forEach(function (e) {
      t[i](e, n);
    });
  }
  var T = { isTouch: !1 },
    A = 0;
  function C() {
    T.isTouch ||
      ((T.isTouch = !0),
      window.performance && document.addEventListener("mousemove", O));
  }
  function O() {
    var t = performance.now();
    t - A < 20 &&
      ((T.isTouch = !1), document.removeEventListener("mousemove", O)),
      (A = t);
  }
  function L() {
    var t = document.activeElement;
    if (h(t)) {
      var e = t._tippy;
      t.blur && !e.state.isVisible && t.blur();
    }
  }
  var D = Object.assign(
      {
        appendTo: function () {
          return document.body;
        },
        aria: { content: "auto", expanded: "auto" },
        delay: 0,
        duration: [300, 250],
        getReferenceClientRect: null,
        hideOnClick: !0,
        ignoreAttributes: !1,
        interactive: !1,
        interactiveBorder: 2,
        interactiveDebounce: 0,
        moveTransition: "",
        offset: [0, 10],
        onAfterUpdate: function () {},
        onBeforeUpdate: function () {},
        onCreate: function () {},
        onDestroy: function () {},
        onHidden: function () {},
        onHide: function () {},
        onMount: function () {},
        onShow: function () {},
        onShown: function () {},
        onTrigger: function () {},
        onUntrigger: function () {},
        onClickOutside: function () {},
        placement: "top",
        plugins: [],
        popperOptions: {},
        render: null,
        showOnCreate: !1,
        touch: !0,
        trigger: "mouseenter focus",
        triggerTarget: null,
      },
      { animateFill: !1, followCursor: !1, inlinePositioning: !1, sticky: !1 },
      {},
      {
        allowHTML: !1,
        animation: "fade",
        arrow: !0,
        content: "",
        inertia: !1,
        maxWidth: 350,
        role: "tooltip",
        theme: "",
        zIndex: 9999,
      }
    ),
    k = Object.keys(D);
  function M(t) {
    var e = (t.plugins || []).reduce(function (e, n) {
      var i = n.name,
        r = n.defaultValue;
      return i && (e[i] = void 0 !== t[i] ? t[i] : r), e;
    }, {});
    return Object.assign({}, t, {}, e);
  }
  function V(t, e) {
    var n = Object.assign(
      {},
      e,
      { content: s(e.content, [t]) },
      e.ignoreAttributes
        ? {}
        : (function (t, e) {
            return (
              e ? Object.keys(M(Object.assign({}, D, { plugins: e }))) : k
            ).reduce(function (e, n) {
              var i = (t.getAttribute("data-tippy-" + n) || "").trim();
              if (!i) return e;
              if ("content" === n) e[n] = i;
              else
                try {
                  e[n] = JSON.parse(i);
                } catch (t) {
                  e[n] = i;
                }
              return e;
            }, {});
          })(t, e.plugins)
    );
    return (
      (n.aria = Object.assign({}, D.aria, {}, n.aria)),
      (n.aria = {
        expanded: "auto" === n.aria.expanded ? e.interactive : n.aria.expanded,
        content:
          "auto" === n.aria.content
            ? e.interactive
              ? null
              : "describedby"
            : n.aria.content,
      }),
      n
    );
  }
  function R(t, e) {
    t.innerHTML = e;
  }
  function j(t) {
    var e = v();
    return (
      !0 === t
        ? (e.className = "tippy-arrow")
        : ((e.className = "tippy-svg-arrow"),
          m(t) ? e.appendChild(t) : R(e, t)),
      e
    );
  }
  function P(t, e) {
    m(e.content)
      ? (R(t, ""), t.appendChild(e.content))
      : "function" != typeof e.content &&
        (e.allowHTML ? R(t, e.content) : (t.textContent = e.content));
  }
  function I(t) {
    var e = t.firstElementChild,
      n = d(e.children);
    return {
      box: e,
      content: n.find(function (t) {
        return t.classList.contains("tippy-content");
      }),
      arrow: n.find(function (t) {
        return (
          t.classList.contains("tippy-arrow") ||
          t.classList.contains("tippy-svg-arrow")
        );
      }),
      backdrop: n.find(function (t) {
        return t.classList.contains("tippy-backdrop");
      }),
    };
  }
  function S(t) {
    var e = v(),
      n = v();
    (n.className = "tippy-box"),
      n.setAttribute("data-state", "hidden"),
      n.setAttribute("tabindex", "-1");
    var i = v();
    function r(n, i) {
      var r = I(e),
        o = r.box,
        a = r.content,
        s = r.arrow;
      i.theme
        ? o.setAttribute("data-theme", i.theme)
        : o.removeAttribute("data-theme"),
        "string" == typeof i.animation
          ? o.setAttribute("data-animation", i.animation)
          : o.removeAttribute("data-animation"),
        i.inertia
          ? o.setAttribute("data-inertia", "")
          : o.removeAttribute("data-inertia"),
        (o.style.maxWidth =
          "number" == typeof i.maxWidth ? i.maxWidth + "px" : i.maxWidth),
        i.role ? o.setAttribute("role", i.role) : o.removeAttribute("role"),
        (n.content === i.content && n.allowHTML === i.allowHTML) ||
          P(a, t.props),
        i.arrow
          ? s
            ? n.arrow !== i.arrow &&
              (o.removeChild(s), o.appendChild(j(i.arrow)))
            : o.appendChild(j(i.arrow))
          : s && o.removeChild(s);
    }
    return (
      (i.className = "tippy-content"),
      i.setAttribute("data-state", "hidden"),
      P(i, t.props),
      e.appendChild(n),
      n.appendChild(i),
      r(t.props, t.props),
      { popper: e, onUpdate: r }
    );
  }
  S.$$tippy = !0;
  var B = 1,
    H = [],
    U = [];
  function N(e, n) {
    var a,
      u,
      m,
      h,
      b,
      A,
      C,
      O,
      L = V(e, Object.assign({}, D, {}, M(n))),
      k = !1,
      R = !1,
      j = !1,
      P = !1,
      S = [],
      N = p(ht, L.interactiveDebounce),
      X = w(L.triggerTarget || e),
      Y = B++,
      _ = (O = L.plugins).filter(function (t, e) {
        return O.indexOf(t) === e;
      }),
      z = {
        id: Y,
        reference: e,
        popper: v(),
        popperInstance: null,
        props: L,
        state: {
          isEnabled: !0,
          isVisible: !1,
          isDestroyed: !1,
          isMounted: !1,
          isShown: !1,
        },
        plugins: _,
        clearDelayTimeouts: function () {
          clearTimeout(a), clearTimeout(u), cancelAnimationFrame(m);
        },
        setProps: function (t) {
          if (z.state.isDestroyed) return;
          it("onBeforeUpdate", [z, t]), mt();
          var n = z.props,
            i = V(
              e,
              Object.assign({}, z.props, {}, t, { ignoreAttributes: !0 })
            );
          (z.props = i),
            vt(),
            n.interactiveDebounce !== i.interactiveDebounce &&
              (at(), (N = p(ht, i.interactiveDebounce)));
          n.triggerTarget && !i.triggerTarget
            ? c(n.triggerTarget).forEach(function (t) {
                t.removeAttribute("aria-expanded");
              })
            : i.triggerTarget && e.removeAttribute("aria-expanded");
          ot(), nt(), q && q(n, i);
          z.popperInstance &&
            (wt(),
            Tt().forEach(function (t) {
              requestAnimationFrame(t._tippy.popperInstance.forceUpdate);
            }));
          it("onAfterUpdate", [z, t]);
        },
        setContent: function (t) {
          z.setProps({ content: t });
        },
        show: function () {
          var t = z.state.isVisible,
            e = z.state.isDestroyed,
            n = !z.state.isEnabled,
            i = T.isTouch && !z.props.touch,
            r = o(z.props.duration, 0, D.duration);
          if (t || e || n || i) return;
          if (Z().hasAttribute("disabled")) return;
          if ((it("onShow", [z], !1), !1 === z.props.onShow(z))) return;
          (z.state.isVisible = !0), Q() && (W.style.visibility = "visible");
          nt(), ct(), z.state.isMounted || (W.style.transition = "none");
          if (Q()) {
            var a = tt(),
              p = a.box,
              u = a.content;
            y([p, u], 0);
          }
          (A = function () {
            if (z.state.isVisible && !P) {
              if (
                ((P = !0),
                W.offsetHeight,
                (W.style.transition = z.props.moveTransition),
                Q() && z.props.animation)
              ) {
                var t = tt(),
                  e = t.box,
                  n = t.content;
                y([e, n], r), x([e, n], "visible");
              }
              rt(),
                ot(),
                f(U, z),
                (z.state.isMounted = !0),
                it("onMount", [z]),
                z.props.animation &&
                  Q() &&
                  (function (t, e) {
                    lt(t, e);
                  })(r, function () {
                    (z.state.isShown = !0), it("onShown", [z]);
                  });
            }
          }),
            (function () {
              var t,
                e = z.props.appendTo,
                n = Z();
              t =
                (z.props.interactive && e === D.appendTo) || "parent" === e
                  ? n.parentNode
                  : s(e, [n]);
              t.contains(W) || t.appendChild(W);
              wt();
            })();
        },
        hide: function () {
          var t = !z.state.isVisible,
            e = z.state.isDestroyed,
            n = !z.state.isEnabled,
            i = o(z.props.duration, 1, D.duration);
          if (t || e || n) return;
          if ((it("onHide", [z], !1), !1 === z.props.onHide(z))) return;
          (z.state.isVisible = !1),
            (z.state.isShown = !1),
            (P = !1),
            Q() && (W.style.visibility = "hidden");
          if ((at(), ft(), nt(), Q())) {
            var r = tt(),
              a = r.box,
              s = r.content;
            z.props.animation && (y([a, s], i), x([a, s], "hidden"));
          }
          rt(),
            ot(),
            z.props.animation
              ? Q() &&
                (function (t, e) {
                  lt(t, function () {
                    !z.state.isVisible &&
                      W.parentNode &&
                      W.parentNode.contains(W) &&
                      e();
                  });
                })(i, z.unmount)
              : z.unmount();
        },
        hideWithInteractivity: function (t) {
          X.body.addEventListener("mouseleave", Ct),
            X.addEventListener("mousemove", N),
            f(H, N),
            N(t);
        },
        enable: function () {
          z.state.isEnabled = !0;
        },
        disable: function () {
          z.hide(), (z.state.isEnabled = !1);
        },
        unmount: function () {
          z.state.isVisible && z.hide();
          if (!z.state.isMounted) return;
          Et(),
            Tt().forEach(function (t) {
              t._tippy.unmount();
            }),
            W.parentNode && W.parentNode.removeChild(W);
          (U = U.filter(function (t) {
            return t !== z;
          })),
            (z.state.isMounted = !1),
            it("onHidden", [z]);
        },
        destroy: function () {
          if (z.state.isDestroyed) return;
          z.clearDelayTimeouts(),
            z.unmount(),
            mt(),
            delete e._tippy,
            (z.state.isDestroyed = !0),
            it("onDestroy", [z]);
        },
      };
    if (!L.render) return z;
    var F = L.render(z),
      W = F.popper,
      q = F.onUpdate;
    W.setAttribute("data-tippy-root", ""),
      (W.id = "tippy-" + z.id),
      (z.popper = W),
      (e._tippy = z),
      (W._tippy = z);
    var $ = _.map(function (t) {
        return t.fn(z);
      }),
      J = e.hasAttribute("aria-expanded");
    return (
      vt(),
      ot(),
      nt(),
      it("onCreate", [z]),
      L.showOnCreate && At(),
      W.addEventListener("mouseenter", function () {
        z.props.interactive && z.state.isVisible && z.clearDelayTimeouts();
      }),
      W.addEventListener("mouseleave", function (t) {
        z.props.interactive &&
          z.props.trigger.indexOf("mouseenter") >= 0 &&
          (X.addEventListener("mousemove", N), N(t));
      }),
      z
    );
    function G() {
      var t = z.props.touch;
      return Array.isArray(t) ? t : [t, 0];
    }
    function K() {
      return "hold" === G()[0];
    }
    function Q() {
      var t;
      return !!(null == (t = z.props.render) ? void 0 : t.$$tippy);
    }
    function Z() {
      return C || e;
    }
    function tt() {
      return I(W);
    }
    function et(t) {
      return (z.state.isMounted && !z.state.isVisible) ||
        T.isTouch ||
        (h && "focus" === h.type)
        ? 0
        : o(z.props.delay, t ? 0 : 1, D.delay);
    }
    function nt() {
      (W.style.pointerEvents =
        z.props.interactive && z.state.isVisible ? "" : "none"),
        (W.style.zIndex = "" + z.props.zIndex);
    }
    function it(t, e, n) {
      var i;
      (void 0 === n && (n = !0),
      $.forEach(function (n) {
        n[t] && n[t].apply(void 0, e);
      }),
      n) && (i = z.props)[t].apply(i, e);
    }
    function rt() {
      var t = z.props.aria;
      if (t.content) {
        var n = "aria-" + t.content,
          i = W.id;
        c(z.props.triggerTarget || e).forEach(function (t) {
          var e = t.getAttribute(n);
          if (z.state.isVisible) t.setAttribute(n, e ? e + " " + i : i);
          else {
            var r = e && e.replace(i, "").trim();
            r ? t.setAttribute(n, r) : t.removeAttribute(n);
          }
        });
      }
    }
    function ot() {
      !J &&
        z.props.aria.expanded &&
        c(z.props.triggerTarget || e).forEach(function (t) {
          z.props.interactive
            ? t.setAttribute(
                "aria-expanded",
                z.state.isVisible && t === Z() ? "true" : "false"
              )
            : t.removeAttribute("aria-expanded");
        });
    }
    function at() {
      X.body.removeEventListener("mouseleave", Ct),
        X.removeEventListener("mousemove", N),
        (H = H.filter(function (t) {
          return t !== N;
        }));
    }
    function st(t) {
      if (
        !(
          (T.isTouch && (j || "mousedown" === t.type)) ||
          (z.props.interactive && W.contains(t.target))
        )
      ) {
        if (Z().contains(t.target)) {
          if (T.isTouch) return;
          if (z.state.isVisible && z.props.trigger.indexOf("click") >= 0)
            return;
        } else it("onClickOutside", [z, t]);
        !0 === z.props.hideOnClick &&
          ((k = !1),
          z.clearDelayTimeouts(),
          z.hide(),
          (R = !0),
          setTimeout(function () {
            R = !1;
          }),
          z.state.isMounted || ft());
      }
    }
    function pt() {
      j = !0;
    }
    function ut() {
      j = !1;
    }
    function ct() {
      X.addEventListener("mousedown", st, !0),
        X.addEventListener("touchend", st, r),
        X.addEventListener("touchstart", ut, r),
        X.addEventListener("touchmove", pt, r);
    }
    function ft() {
      X.removeEventListener("mousedown", st, !0),
        X.removeEventListener("touchend", st, r),
        X.removeEventListener("touchstart", ut, r),
        X.removeEventListener("touchmove", pt, r);
    }
    function lt(t, e) {
      var n = tt().box;
      function i(t) {
        t.target === n && (E(n, "remove", i), e());
      }
      if (0 === t) return e();
      E(n, "remove", b), E(n, "add", i), (b = i);
    }
    function dt(t, n, i) {
      void 0 === i && (i = !1),
        c(z.props.triggerTarget || e).forEach(function (e) {
          e.addEventListener(t, n, i),
            S.push({ node: e, eventType: t, handler: n, options: i });
        });
    }
    function vt() {
      var t;
      K() &&
        (dt("touchstart", gt, { passive: !0 }),
        dt("touchend", bt, { passive: !0 })),
        ((t = z.props.trigger), t.split(/\s+/).filter(Boolean)).forEach(
          function (t) {
            if ("manual" !== t)
              switch ((dt(t, gt), t)) {
                case "mouseenter":
                  dt("mouseleave", bt);
                  break;
                case "focus":
                  dt(i ? "focusout" : "blur", yt);
                  break;
                case "focusin":
                  dt("focusout", yt);
              }
          }
        );
    }
    function mt() {
      S.forEach(function (t) {
        var e = t.node,
          n = t.eventType,
          i = t.handler,
          r = t.options;
        e.removeEventListener(n, i, r);
      }),
        (S = []);
    }
    function gt(t) {
      var e,
        n = !1;
      if (z.state.isEnabled && !xt(t) && !R) {
        var i = "focus" === (null == (e = h) ? void 0 : e.type);
        (h = t),
          (C = t.currentTarget),
          ot(),
          !z.state.isVisible &&
            g(t) &&
            H.forEach(function (e) {
              return e(t);
            }),
          "click" === t.type &&
          (z.props.trigger.indexOf("mouseenter") < 0 || k) &&
          !1 !== z.props.hideOnClick &&
          z.state.isVisible
            ? (n = !0)
            : At(t),
          "click" === t.type && (k = !n),
          n && !i && Ct(t);
      }
    }
    function ht(t) {
      var n = t.target,
        i = e.contains(n) || W.contains(n);
      ("mousemove" === t.type && i) ||
        ((function (t, e) {
          var n = e.clientX,
            i = e.clientY;
          return t.every(function (t) {
            var e = t.popperRect,
              r = t.popperState,
              o = t.props.interactiveBorder,
              a = l(r.placement),
              s = r.modifiersData.offset;
            if (!s) return !0;
            var p = "bottom" === a ? s.top.y : 0,
              u = "top" === a ? s.bottom.y : 0,
              c = "right" === a ? s.left.x : 0,
              f = "left" === a ? s.right.x : 0,
              d = e.top - i + p > o,
              v = i - e.bottom - u > o,
              m = e.left - n + c > o,
              g = n - e.right - f > o;
            return d || v || m || g;
          });
        })(
          Tt()
            .concat(W)
            .map(function (t) {
              var e,
                n = null == (e = t._tippy.popperInstance) ? void 0 : e.state;
              return n
                ? {
                    popperRect: t.getBoundingClientRect(),
                    popperState: n,
                    props: L,
                  }
                : null;
            })
            .filter(Boolean),
          t
        ) &&
          (at(), Ct(t)));
    }
    function bt(t) {
      xt(t) ||
        (z.props.trigger.indexOf("click") >= 0 && k) ||
        (z.props.interactive ? z.hideWithInteractivity(t) : Ct(t));
    }
    function yt(t) {
      (z.props.trigger.indexOf("focusin") < 0 && t.target !== Z()) ||
        (z.props.interactive &&
          t.relatedTarget &&
          W.contains(t.relatedTarget)) ||
        Ct(t);
    }
    function xt(t) {
      return !!T.isTouch && K() !== t.type.indexOf("touch") >= 0;
    }
    function wt() {
      Et();
      var n = z.props,
        i = n.popperOptions,
        r = n.placement,
        o = n.offset,
        a = n.getReferenceClientRect,
        s = n.moveTransition,
        p = Q() ? I(W).arrow : null,
        u = a
          ? {
              getBoundingClientRect: a,
              contextElement: a.contextElement || Z(),
            }
          : e,
        c = [
          { name: "offset", options: { offset: o } },
          {
            name: "preventOverflow",
            options: { padding: { top: 2, bottom: 2, left: 5, right: 5 } },
          },
          { name: "flip", options: { padding: 5 } },
          { name: "computeStyles", options: { adaptive: !s } },
          {
            name: "$$tippy",
            enabled: !0,
            phase: "beforeWrite",
            requires: ["computeStyles"],
            fn: function (t) {
              var e = t.state;
              if (Q()) {
                var n = tt().box;
                ["placement", "reference-hidden", "escaped"].forEach(function (
                  t
                ) {
                  "placement" === t
                    ? n.setAttribute("data-placement", e.placement)
                    : e.attributes.popper["data-popper-" + t]
                    ? n.setAttribute("data-" + t, "")
                    : n.removeAttribute("data-" + t);
                }),
                  (e.attributes.popper = {});
              }
            },
          },
        ];
      Q() &&
        p &&
        c.push({ name: "arrow", options: { element: p, padding: 3 } }),
        c.push.apply(c, (null == i ? void 0 : i.modifiers) || []),
        (z.popperInstance = t.createPopper(
          u,
          W,
          Object.assign({}, i, { placement: r, onFirstUpdate: A, modifiers: c })
        ));
    }
    function Et() {
      z.popperInstance &&
        (z.popperInstance.destroy(), (z.popperInstance = null));
    }
    function Tt() {
      return d(W.querySelectorAll("[data-tippy-root]"));
    }
    function At(t) {
      z.clearDelayTimeouts(), t && it("onTrigger", [z, t]), ct();
      var e = et(!0),
        n = G(),
        i = n[0],
        r = n[1];
      T.isTouch && "hold" === i && r && (e = r),
        e
          ? (a = setTimeout(function () {
              z.show();
            }, e))
          : z.show();
    }
    function Ct(t) {
      if (
        (z.clearDelayTimeouts(), it("onUntrigger", [z, t]), z.state.isVisible)
      ) {
        if (
          !(
            z.props.trigger.indexOf("mouseenter") >= 0 &&
            z.props.trigger.indexOf("click") >= 0 &&
            ["mouseleave", "mousemove"].indexOf(t.type) >= 0 &&
            k
          )
        ) {
          var e = et(!1);
          e
            ? (u = setTimeout(function () {
                z.state.isVisible && z.hide();
              }, e))
            : (m = requestAnimationFrame(function () {
                z.hide();
              }));
        }
      } else ft();
    }
  }
  function X(t, e) {
    void 0 === e && (e = {});
    var n = D.plugins.concat(e.plugins || []);
    document.addEventListener("touchstart", C, r),
      window.addEventListener("blur", L);
    var i = Object.assign({}, e, { plugins: n }),
      o = b(t).reduce(function (t, e) {
        var n = e && N(e, i);
        return n && t.push(n), t;
      }, []);
    return m(t) ? o[0] : o;
  }
  (X.defaultProps = D),
    (X.setDefaultProps = function (t) {
      Object.keys(t).forEach(function (e) {
        D[e] = t[e];
      });
    }),
    (X.currentInput = T);
  var Y = { mouseover: "mouseenter", focusin: "focus", click: "click" };
  var _ = {
    name: "animateFill",
    defaultValue: !1,
    fn: function (t) {
      var e;
      if (!(null == (e = t.props.render) ? void 0 : e.$$tippy)) return {};
      var n = I(t.popper),
        i = n.box,
        r = n.content,
        o = t.props.animateFill
          ? (function () {
              var t = v();
              return (t.className = "tippy-backdrop"), x([t], "hidden"), t;
            })()
          : null;
      return {
        onCreate: function () {
          o &&
            (i.insertBefore(o, i.firstElementChild),
            i.setAttribute("data-animatefill", ""),
            (i.style.overflow = "hidden"),
            t.setProps({ arrow: !1, animation: "shift-away" }));
        },
        onMount: function () {
          if (o) {
            var t = i.style.transitionDuration,
              e = Number(t.replace("ms", ""));
            (r.style.transitionDelay = Math.round(e / 10) + "ms"),
              (o.style.transitionDuration = t),
              x([o], "visible");
          }
        },
        onShow: function () {
          o && (o.style.transitionDuration = "0ms");
        },
        onHide: function () {
          o && x([o], "hidden");
        },
      };
    },
  };
  var z = {
    name: "followCursor",
    defaultValue: !1,
    fn: function (t) {
      var e = t.reference,
        n = w(t.props.triggerTarget || e),
        i = null;
      function r() {
        return "manual" === t.props.trigger.trim();
      }
      function o() {
        var e = !!r() || (null !== i && !(0 === i.clientX && 0 === i.clientY));
        return t.props.followCursor && e;
      }
      function a(e) {
        e && t.setProps({ getReferenceClientRect: null });
      }
      function s() {
        o() ? n.addEventListener("mousemove", u) : a(t.props.followCursor);
      }
      function p() {
        n.removeEventListener("mousemove", u);
      }
      function u(n) {
        i = { clientX: n.clientX, clientY: n.clientY };
        var r = !n.target || e.contains(n.target),
          o = t.props.followCursor,
          a = n.clientX,
          s = n.clientY,
          u = e.getBoundingClientRect(),
          c = a - u.left,
          f = s - u.top;
        (!r && t.props.interactive) ||
          t.setProps({
            getReferenceClientRect: function () {
              var t = e.getBoundingClientRect(),
                n = a,
                i = s;
              "initial" === o && ((n = t.left + c), (i = t.top + f));
              var r = "horizontal" === o ? t.top : i,
                p = "vertical" === o ? t.right : n,
                u = "horizontal" === o ? t.bottom : i,
                l = "vertical" === o ? t.left : n;
              return {
                width: p - l,
                height: u - r,
                top: r,
                right: p,
                bottom: u,
                left: l,
              };
            },
          }),
          (T.isTouch ||
            ("initial" === t.props.followCursor && t.state.isVisible)) &&
            p();
      }
      return {
        onAfterUpdate: function (t, e) {
          var n = e.followCursor;
          void 0 === n || n || a(!0);
        },
        onMount: function () {
          o() && u(i);
        },
        onShow: function () {
          r() && ((i = { clientX: 0, clientY: 0 }), s());
        },
        onTrigger: function (t, e) {
          i || (g(e) && (i = { clientX: e.clientX, clientY: e.clientY }), s());
        },
        onUntrigger: function () {
          t.state.isVisible || (p(), (i = null));
        },
        onHidden: function () {
          p(), (i = null);
        },
      };
    },
  };
  var F = {
    name: "inlinePositioning",
    defaultValue: !1,
    fn: function (t) {
      var e,
        n = t.reference;
      var i = -1,
        r = !1,
        o = {
          name: "tippyInlinePositioning",
          enabled: !0,
          phase: "afterWrite",
          fn: function (r) {
            var o = r.state;
            t.props.inlinePositioning &&
              (e !== o.placement &&
                t.setProps({
                  getReferenceClientRect: function () {
                    return (function (t) {
                      return (function (t, e, n, i) {
                        if (n.length < 2 || null === t) return e;
                        if (2 === n.length && i >= 0 && n[0].left > n[1].right)
                          return n[i] || e;
                        switch (t) {
                          case "top":
                          case "bottom":
                            var r = n[0],
                              o = n[n.length - 1],
                              a = "top" === t,
                              s = r.top,
                              p = o.bottom,
                              u = a ? r.left : o.left,
                              c = a ? r.right : o.right;
                            return {
                              top: s,
                              bottom: p,
                              left: u,
                              right: c,
                              width: c - u,
                              height: p - s,
                            };
                          case "left":
                          case "right":
                            var f = Math.min.apply(
                                Math,
                                n.map(function (t) {
                                  return t.left;
                                })
                              ),
                              l = Math.max.apply(
                                Math,
                                n.map(function (t) {
                                  return t.right;
                                })
                              ),
                              d = n.filter(function (e) {
                                return "left" === t
                                  ? e.left === f
                                  : e.right === l;
                              }),
                              v = d[0].top,
                              m = d[d.length - 1].bottom;
                            return {
                              top: v,
                              bottom: m,
                              left: f,
                              right: l,
                              width: l - f,
                              height: m - v,
                            };
                          default:
                            return e;
                        }
                      })(
                        l(t),
                        n.getBoundingClientRect(),
                        d(n.getClientRects()),
                        i
                      );
                    })(o.placement);
                  },
                }),
              (e = o.placement));
          },
        };
      function a() {
        var e;
        r ||
          ((e = (function (t, e) {
            var n;
            return {
              popperOptions: Object.assign({}, t.popperOptions, {
                modifiers: [].concat(
                  (
                    (null == (n = t.popperOptions) ? void 0 : n.modifiers) || []
                  ).filter(function (t) {
                    return t.name !== e.name;
                  }),
                  [e]
                ),
              }),
            };
          })(t.props, o)),
          (r = !0),
          t.setProps(e),
          (r = !1));
      }
      return {
        onCreate: a,
        onAfterUpdate: a,
        onTrigger: function (e, n) {
          if (g(n)) {
            var r = d(t.reference.getClientRects()),
              o = r.find(function (t) {
                return (
                  t.left - 2 <= n.clientX &&
                  t.right + 2 >= n.clientX &&
                  t.top - 2 <= n.clientY &&
                  t.bottom + 2 >= n.clientY
                );
              });
            i = r.indexOf(o);
          }
        },
        onUntrigger: function () {
          i = -1;
        },
      };
    },
  };
  var W = {
    name: "sticky",
    defaultValue: !1,
    fn: function (t) {
      var e = t.reference,
        n = t.popper;
      function i(e) {
        return !0 === t.props.sticky || t.props.sticky === e;
      }
      var r = null,
        o = null;
      function a() {
        var s = i("reference")
            ? (t.popperInstance
                ? t.popperInstance.state.elements.reference
                : e
              ).getBoundingClientRect()
            : null,
          p = i("popper") ? n.getBoundingClientRect() : null;
        ((s && q(r, s)) || (p && q(o, p))) &&
          t.popperInstance &&
          t.popperInstance.update(),
          (r = s),
          (o = p),
          t.state.isMounted && requestAnimationFrame(a);
      }
      return {
        onMount: function () {
          t.props.sticky && a();
        },
      };
    },
  };
  function q(t, e) {
    return (
      !t ||
      !e ||
      t.top !== e.top ||
      t.right !== e.right ||
      t.bottom !== e.bottom ||
      t.left !== e.left
    );
  }
  return (
    e &&
      (function (t) {
        var e = document.createElement("style");
        (e.textContent = t), e.setAttribute("data-tippy-stylesheet", "");
        var n = document.head,
          i = document.querySelector("head>style,head>link");
        i ? n.insertBefore(e, i) : n.appendChild(e);
      })(
        '.tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.tippy-box{position:relative;background-color:#333;color:#fff;border-radius:4px;font-size:14px;line-height:1.4;outline:0;transition-property:transform,visibility,opacity}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{bottom:-7px;left:0;border-width:8px 8px 0;border-top-color:initial;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{top:-7px;left:0;border-width:0 8px 8px;border-bottom-color:initial;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-width:8px 0 8px 8px;border-left-color:initial;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{left:-7px;border-width:8px 8px 8px 0;border-right-color:initial;transform-origin:center right}.tippy-box[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{width:16px;height:16px;color:#333}.tippy-arrow:before{content:"";position:absolute;border-color:transparent;border-style:solid}.tippy-content{position:relative;padding:5px 9px;z-index:1}'
      ),
    X.setDefaultProps({ plugins: [_, z, F, W], render: S }),
    (X.createSingleton = function (t, e) {
      void 0 === e && (e = {});
      var n,
        i = t,
        r = [],
        o = e.overrides;
      function a() {
        r = i.map(function (t) {
          return t.reference;
        });
      }
      function s(t) {
        i.forEach(function (e) {
          t ? e.enable() : e.disable();
        });
      }
      s(!1), a();
      var p = {
          fn: function () {
            return {
              onDestroy: function () {
                s(!0);
              },
              onTrigger: function (t, e) {
                var a = e.currentTarget,
                  s = r.indexOf(a);
                if (a !== n) {
                  n = a;
                  var p = (o || []).concat("content").reduce(function (t, e) {
                    return (t[e] = i[s].props[e]), t;
                  }, {});
                  t.setProps(
                    Object.assign({}, p, {
                      getReferenceClientRect: function () {
                        return a.getBoundingClientRect();
                      },
                    })
                  );
                }
              },
            };
          },
        },
        c = X(
          v(),
          Object.assign({}, u(e, ["overrides"]), {
            plugins: [p].concat(e.plugins || []),
            triggerTarget: r,
          })
        ),
        f = c.setProps;
      return (
        (c.setProps = function (t) {
          (o = t.overrides || o), f(t);
        }),
        (c.setInstances = function (t) {
          s(!0), (i = t), s(!1), a(), c.setProps({ triggerTarget: r });
        }),
        c
      );
    }),
    (X.delegate = function (t, e) {
      var n = [],
        i = [],
        r = e.target,
        o = u(e, ["target"]),
        a = Object.assign({}, o, { trigger: "manual", touch: !1 }),
        s = Object.assign({}, o, { showOnCreate: !0 }),
        p = X(t, a);
      function f(t) {
        if (t.target) {
          var n = t.target.closest(r);
          if (n) {
            var o =
              n.getAttribute("data-tippy-trigger") || e.trigger || D.trigger;
            if (
              !n._tippy &&
              !(
                ("touchstart" === t.type && "boolean" == typeof s.touch) ||
                ("touchstart" !== t.type && o.indexOf(Y[t.type]))
              )
            ) {
              var a = X(n, s);
              a && (i = i.concat(a));
            }
          }
        }
      }
      function l(t, e, i, r) {
        void 0 === r && (r = !1),
          t.addEventListener(e, i, r),
          n.push({ node: t, eventType: e, handler: i, options: r });
      }
      return (
        c(p).forEach(function (t) {
          var e = t.destroy;
          (t.destroy = function (t) {
            void 0 === t && (t = !0),
              t &&
                i.forEach(function (t) {
                  t.destroy();
                }),
              (i = []),
              n.forEach(function (t) {
                var e = t.node,
                  n = t.eventType,
                  i = t.handler,
                  r = t.options;
                e.removeEventListener(n, i, r);
              }),
              (n = []),
              e();
          }),
            (function (t) {
              var e = t.reference;
              l(e, "touchstart", f),
                l(e, "mouseover", f),
                l(e, "focusin", f),
                l(e, "click", f);
            })(t);
        }),
        p
      );
    }),
    (X.hideAll = function (t) {
      var e = void 0 === t ? {} : t,
        n = e.exclude,
        i = e.duration;
      U.forEach(function (t) {
        var e = !1;
        if ((n && (e = h(n) ? t.reference === n : t.popper === n.popper), !e)) {
          var r = t.props.duration;
          t.setProps({ duration: i }),
            t.hide(),
            t.state.isDestroyed || t.setProps({ duration: r });
        }
      });
    }),
    (X.roundArrow =
      '<svg width="16" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"></svg>'),
    X
  );
});
//# sourceMappingURL=tippy-bundle.umd.min.js.map
