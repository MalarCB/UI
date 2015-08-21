/*
(function() {
  var g = window["UT-VR"] = (window["UT-VR"] || {});
  g.experimentId = (g.experimentId || "131800");
  g.ioAddress = "wss://usabilitytools.com";
  g.ioResource = "nuvr-rec/socket.io";
  g.sessionKey = "NUVR_131800_";
})();
(function() {
  var experimentId = "131800";
  var globalKey = "UT-VR";;
  (function() {
    var define = null;
    ! function e(t, n, r) {
      function o(s, u) {
        if (!n[s]) {
          if (!t[s]) {
            var a = "function" == typeof require && require;
            if (!u && a) return a(s, !0);
            if (i) return i(s, !0);
            var c = new Error("Cannot find module '" + s + "'");
            throw c.code = "MODULE_NOT_FOUND", c
          }
          var l = n[s] = {
            exports: {}
          };
          t[s][0].call(l.exports, function(e) {
            var n = t[s][1][e];
            return o(n ? n : e)
          }, l, l.exports, e, t, n, r)
        }
        return n[s].exports
      }
      for (var i = "function" == typeof require && require, s = 0; s < r.length; s++) o(r[s]);
      return o
    }({
      1: [function(e, t, n) {
        ! function() {
          if (!window["-=UTC-NO-REC"] && !window.name.match(/key(?:G|E|H|A)[0-9a-z]{40}/)) {
            var t = e("./support");
            if (t) {
              var n = e("./domrecorder"),
                  r = e("./persist"),
                  o = e("./eventmachine"),
                  i = e("../lib/ripper"),
                  s = e("../lib/domid"),
                  u = e("../lib/domready"),
                  a = i({
                    dictionary: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!~*;:/$,",
                    numberLength: 3,
                    heuristic: !1,
                    compress: !1
                  });
              r.handleDeath(function() {
                o.destroy(), n.destroy()
              });
              var c = Date.now();
              r.init(c), u(function() {
                if (!window["-=UTC-NO-REC"]) {
                  var e = s.init(document);
                  o.init(e, {
                    moveTimespan: 100,
                    actionTimespan: 500
                  }), n.init(r, a, e)
                }
              })
            }
          }
        }()
      }, {
        "../lib/domid": 5,
        "../lib/domready": 6,
        "../lib/ripper": 7,
        "./domrecorder": 24,
        "./eventmachine": 25,
        "./persist": 28,
        "./support": 34
      }],
      2: [function(e, t, n) {
        t.exports = function() {
          function t(e) {
            this._map = {}, this._settings = n.extend({
              valueKey: null,
              allowFalsy: !0
            }, e)
          }
          var n = e("underscore");
          return n.extend(t.prototype, {
            name: "KeyMap",
            add: function(e, t) {
              if (void 0 !== this._map[e]) throw new Error('key "' + e + '" already exists in map');
              if (!this._settings.allowFalsy && !t) throw new Error('value can not be falsy but it is "' + t + '"');
              return this._settings.valueKey ? (this._map[e] = {}, this._map[e][this._settings.valueKey] = t) : this._map[e] = t, this._map[e]
            },
            has: function(e) {
              return !!this._map.hasOwnProperty(e)
            },
            get: function(e) {
              if (this.has(e)) return this._map[e];
              throw new Error('no key "' + e + '" in map')
            }
          }), t
        }()
      }, {
        underscore: 22
      }],
      3: [function(e, t, n) {
        t.exports = function() {
          function t(e) {
            if (!e || !e.length) throw new Error(this.name + " constructor: not empty Array required as first argument");
            this._maps = {
              longToShort: new r({
                valueKey: "short",
                allowFalsy: !1
              }),
              shortToLong: new r({
                valueKey: "long",
                allowFalsy: !1
              })
            }, e.forEach(function(e) {
              var t = this._maps.longToShort.add(e["long"], e["short"]),
                  n = this._maps.shortToLong.add(e["short"], e["long"]);
              e.values && e.values.length && (t.values = new r({
                allowFalsy: !1
              }), n.values = new r({
                allowFalsy: !1
              }), e.values.forEach(function(e) {
                t.values.add(e["long"], e["short"]), n.values.add(e["short"], e["long"])
              }))
            }, this)
          }
          var n = e("underscore"),
              r = e("./KeyMap");
          return n.extend(t.prototype, {
            name: "Translate",
            _translate: function(e, t, r, o) {
              var i = o ? r : {};
              return n.each(r, function(n, r) {
                if (void 0 !== n) {
                  var s = e.get(r),
                      u = s.values && s.values.get(n) || n;
                  i[s[t]] = u
                }
                o && delete i[r]
              }), i
            },
            toLong: function(e, t) {
              return this._translate(this._maps.shortToLong, "long", e, !!t)
            },
            toShort: function(e, t) {
              return this._translate(this._maps.longToShort, "short", e, !!t)
            }
          }), t
        }()
      }, {
        "./KeyMap": 2,
        underscore: 22
      }],
      4: [function(e, t, n) {
        ! function() {
          function e(e) {
            var t = String(e).replace(/^\s+|\s+$/g, "").match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
            return t ? {
              href: t[0] || "",
              protocol: t[1] || "",
              authority: t[2] || "",
              host: t[3] || "",
              hostname: t[4] || "",
              port: t[5] || "",
              pathname: t[6] || "",
              search: t[7] || "",
              hash: t[8] || ""
            } : null
          }

          function n(t, n) {
            function r(e) {
              var t = [];
              return e.replace(/^(\.\.?(\/|$))+/, "").replace(/\/(\.(\/|$))+/g, "/").replace(/\/\.\.$/, "/../").replace(/\/?[^\/]*!/g, function(e) {
                "/.." === e ? t.pop() : t.push(e)
              }), t.join("").replace(/^\//, "/" === e.charAt(0) ? "/" : "")
            }
            return n = e(n || ""), t = e(t || ""), n && t ? (n.protocol || t.protocol) + (n.protocol || n.authority ? n.authority : t.authority) + r(n.protocol || n.authority || "/" === n.pathname.charAt(0) ? n.pathname : n.pathname ? (t.authority && !t.pathname ? "/" : "") + t.pathname.slice(0, t.pathname.lastIndexOf("/") + 1) + n.pathname : t.pathname) + (n.protocol || n.authority || n.pathname ? n.search : n.search || t.search) + n.hash : null
          }
          var r = {
            LINK: "href",
            IMG: "src",
            AREA: "href",
            IMAGE: "src",
            A: "href"
          };
          t.exports = {
            init: function(e) {
              function t(t) {
                return e(function(e, t) {
                  r[e.nodeName] && e.hasAttribute(r[e.nodeName]) && e.setAttribute(r[e.nodeName], o(e.getAttribute(r[e.nodeName])))
                })(t, 0), t
              }
              var o = function() {
                var e = {},
                    t = window.location.origin + window.location.pathname;
                return function(r) {
                  return e[r] ? e[r] : (e[r] = n(t, r), e[r])
                }
              }();
              return {
                absify: t
              }
            },
            parseURI: e
          }
        }()
      }, {}],
      5: [function(e, t, n) {
        ! function(n) {
          function r(e) {
            return e === a
          }

          function o(e) {
            function t(e) {
              return function t(r, o, i) {
                var u, a = e(r, o, i);
                if (a)
                  for (i = 0, u = r.firstChild; u; u = u.nextSibling) u === n || 1 !== u.nodeType || s.hasOwnProperty(u.tagName) || (i++, t(u, o + "" + S(i + r.nodeName.substr(0, 2))))
              }
            }

            function o(e, r, o) {
              return x.documentElement[u] = a, t(function(e, t) {
                return (o || e[u] === n) && (e[u] = t), e[u]
              })(e, r, 0), !0
            }

            function p(e, t) {
              return o(e, t, !0)
            }

            function d(e, t) {
              return o(e, t)
            }

            function h(e) {
              return E[e]
            }

            function m() {
              return d(e.head, c), d(e.body, l), !0
            }

            function g(e, r) {
              t(function(e, t) {
                return e[u] === n ? e[u] = t : t = e[u], E[t] = e, t
              })(e, r, 0)
            }

            function v() {
              g(e.head, c), g(e.body, l)
            }

            function y(e, t) {
              e[u] = t, E[t] = e
            }

            function b(e) {

              console.log(e)
              var t;
              return e === x.documentElement ? t = a : e[u] ? t = e[u] : ! function() {}("ho ho ho, we have no id for this node!", e), t
            }

            function w(e) {
              return e[u] !== n
            }

            function _() {
              i.each(E, function(e, t) {
                delete e[u], delete E[t]
              }), E = {}
            }
            var x = e,
                S = function(e) {
                  e += "";
                  var t, n = 0,
                      r = e.length;
                  for (t = 0; r > t; t++) n += e.charCodeAt(t) * (t + 1);
                  return f(Math.abs(n) % 4900)
                },
                E = {};
            console.log(b)

            return E[a] = e.documentElement, {
              traverseDomWith: t,
              run: d,
              forceRun: p,
              mapTree: g,
              getId: b,
              hasId: w,
              markNode: y,
              getNodeById: h,
              mapDocument: v,
              identifyDocument: m,
              isDocumentRoot: r,
              getTag: function() {
                return u
              },
              destroy: _
            }
          }
          var i = e("./underscore"),
              s = {
                SCRIPT: 1,
                NOSCRIPT: 1
              },
              u = "utcid",
              a = "R",
              c = "H",
              l = "B",
              f = function(e) {
                var t = e.split(""),
                    n = e.length,
                    r = n * n;
                return function(e) {
                  if ("number" != typeof e) return "";
                  var o = "";
                  if (e >= r) throw "Number too big to convert. Use bigger dictionary or numberLength.";
                  return o = t[e % n], e = Math.floor(e / n), o = t[e % n] + o
                }
              }("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!~*;:/$,");
          t.exports = {
            init: o,
            isDocumentRoot: r
          }
        }()
      }, {
        "./underscore": 9
      }],
      6: [function(e, t, n) {
        var r = function() {
          var e, t = !1;
          return "complete" === document.readyState || "loaded" === document.readyState || "interactive" === document.readyState ? t = !0 : document.addEventListener("DOMContentLoaded", function n() {
            document.removeEventListener("DOMContentLoaded", n, !1), t = !0, e && e()
          }, !1),
              function(n) {
                n && !e && (e = function() {
                  setTimeout(n, 1)
                }, t && e())
              }
        }();
        t && (t.exports = r)
      }, {}],
      7: [function(e, t, n) {
        var r = function(e) {
          "use strict";

          function t(t) {
            function n(t, i, s, u) {
              var a, c = i + "" + o(s);
              for (r(t, c), s = 0, a = t.firstChild; a; a = a.nextSibling) a === u || 1 !== a.nodeType || !e.keepJS && "SCRIPT" === a.nodeName || n(a, c, ++s)
            }
            var r = t,
                o = u.makeConverter(2);
            return n
          }

          function n(t, n, r) {
            var o, i, s;
            if (i = document.createElement(t.nodeName), i = t.cloneNode(!0), "function" == typeof n && n(i), e.keepJS) o = i.innerHTML, r || (o = o.replace(/\sstyle=("[^"<]*")|('[^'<]*')/gi, ""));
            else {
              s = i.getElementsByTagName("script");
              for (var u = s.length; u--;) s[u].parentNode.removeChild(s[u]);
              o = i.innerHTML, o = r ? o.replace(/\s(on[^ =]*)=("[^"<]*")|('[^'<]*')/gi, "") : o.replace(/\s(style|on[^ =]*)=("[^"<]*")|('[^'<]*')/gi, "")
            }
            return o = o.replace(/\s+/g, " ")
          }

          function r(e) {
            for (var t = [], n = 0; n < e.attributes.length; n += 1) t.push({
              name: e.attributes[n].name,
              value: e.attributes[n].value
            });
            return t
          }

          function o(o, i, s) {
            var f, p, d;
            f = n(o, i, s), p = {
              html: f,
              attrs: r(o),
              name: o.nodeName,
              css: {}
            }, s || t(function(e, t) {
              p.css[t] = a.get(e)
            })(o, "", 1);
            var h = JSON.stringify(p);
            return e.compress ? (e.heuristic && (h = c.compress(h)), d = l.compress(h, u.makeConverter(e.numberLength))) : h
          }

          function i(t) {
            var n = t;
            return e.compress && (n = l.decompress(t, u.reverseConverter, e.numberLength), e.heuristic && (n = c.decompress(n))), n = JSON.parse(n)
          }

          function s(e, n) {
            var r, o, s = i(e),
                u = s.name ? s.name : "div";
            if (n ? r = n : (o = s.html.substring(0, 5), (o.indexOf("<tr") > -1 || o.indexOf("<th") > -1 || o.indexOf("<td") > -1) && (u = "table"), r = document.createElement(u)), r.innerHTML = s.html, s.attrs)
              for (var c = 0; c < s.attrs.length; c += 1) r.setAttribute(s.attrs[c].name, s.attrs[c].value);
            return t(function(e, t) {
              var n, r = s.css[t];
              for (var o in r) n = a.camelize(o), e.style[n] = a.prefixify(r[o]), "float" === n && (e.style.cssFloat = r[o])
            })(r, "", 1), r
          }
          e || (e = {}), e.dictionary || (e.dictionary = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!~*;:/$,-_"), e.numberLength || (e.numberLength = 2), e.heuristic || (e.heuristic = !1), e.keepJS || (e.keepJS = !1), e.compress || (e.compress = !1);
          var u = function() {
                function t(e) {
                  var t;
                  return 2 === e ? (t = o * o, function(e) {
                    if ("number" != typeof e) return "";
                    var n = "";
                    if (e >= t) throw "Number too big to convert. Use bigger dictionary or numberLength.";
                    return n = r[e % o], e = Math.floor(e / o), n = r[e % o] + n
                  }) : (t = Math.pow(o, e), function(n) {
                    if ("number" != typeof n) return "";
                    var i = "";
                    if (n >= t) throw "Number too big to convert. Use bigger dictionary or numberLength.";
                    for (var s = 0; e > s; s += 1) i = r[n % o] + i, n = Math.floor(n / o);
                    return i
                  })
                }

                function n(t) {
                  for (var n = 0, r = 1; t.length > 0; r *= o) n += e.dictionary.indexOf(t.charAt(t.length - 1)) * r, t = t.substr(0, t.length - 1);
                  return n
                }
                var r = e.dictionary.split(""),
                    o = e.dictionary.length;
                return {
                  makeConverter: t,
                  reverseConverter: n
                }
              }(),
              a = function() {
                function e() {
                  if (s) return s;
                  var e = document.getElementsByTagName("script")[0],
                      t = /^(Moz|Webkit|Khtml|O|ms)(?=[A-Z])/;
                  for (var n in e.style)
                    if (t.test(n)) return s = n.match(t)[0];
                  return s = "WebkitOpacity" in e.style ? "Webkit" : "KhtmlOpacity" in e.style ? "Khtml" : ""
                }

                function t(t, n) {
                  return "undefined" == typeof n && (n = "-" + e().toLowerCase() + "-"), t.replace(/(^|[\s,])-rr-/, n)
                }

                function n(n) {
                  n = t(n, e() + "-");
                  var r = function(e, t) {
                    return t.toUpperCase()
                  };
                  return n.replace(/\-([a-z])/g, r)
                }

                function r(e) {
                  var t, n = {};
                  if (window.getComputedStyle) {
                    t = window.getComputedStyle(e, null);
                    for (var r = 0, o = t.length; o > r; r += 1) {
                      var i = t[r],
                          s = t.getPropertyValue(i);
                      n[i] = s
                    }
                    return n
                  }
                  if (t = e.currentStyle) {
                    for (var i in t) n[i] = t[i];
                    return n
                  }
                  if (t = e.style) {
                    for (var i in t) "function" != typeof t[i] && (n[i] = t[i]);
                    return n
                  }
                  return n
                }

                function o(e, t) {
                  var n = e + t;
                  if (u[n]) return u[n];
                  var o = a(),
                      i = document.createElement(e);
                  return t && (i.type = t), i.style.visibility = "hidden", o.appendChild(i), u[n] = r(i), u[n].visibility = "visible", o.removeChild(i), u[n]
                }

                function i(e) {
                  var n, i = r(e),
                      s = e.nodeName,
                      u = !1;
                  n = "INPUT" === s ? o(s, e.getAttribute("type")) : o(s, "");
                  for (var a in n) n.hasOwnProperty(a) && (i[a] === n[a] ? delete i[a] : (i[a] = t(i[a], "-rr-"), "-" === a.substr(0, 1) && (i[a.replace(/^-[a-z]*-/, "-rr-")] = i[a], delete i[a]), u = !0));
                  return i.cssFloat && (i["float"] = i.cssFloat, delete i.cssFloat), u ? i : {}
                }
                var s, u = {},
                    a = function() {
                      var e, t = !1;
                      return e = document.createElement("iframe"), e.title = "UsabilityTools Visitor Recording", e.style.display = "none", document.documentElement.appendChild(e),
                          function() {
                            return t ? t : t = e.contentDocument.body
                          }
                    }();
                return {
                  get: i,
                  camelize: n,
                  prefixify: t
                }
              }(),
              c = function() {
                function e(e) {
                  var t;
                  t = e.replace(/~/g, "~~");
                  for (var o = 0, i = n.length; i > o; o += 1) t = t.replace(RegExp(n[o], "g"), "~" + r[o]);
                  return t
                }

                function t(e) {
                  for (var t = e, o = 0, i = n.length; i > o; o += 1) t = t.replace(RegExp("~" + r[o], "g"), n[o]);
                  return t = t.replace(/~~/g, "~")
                }
                var n = ["color", "div", "border", "font", "text", "origin", "left", "width", "right", "bottom", "size", "height", "family", "padding", "transform", "perspective", "align", "none", "type", "option", "background", "value", "collapse", "margin", "outline", "display", "serif", "sans", "solid", "spacing", "cursor", "href", "Arial", "auto", "position", "block", "vertical", "Tahoma", "span", "name", "input", "line", "default", "float", "label", "Helvetica", "hidden", "horizontal", "repeat", "center", "absolute", "Verdana", "recaptcha", "overflow", "image", "relative"],
                    r = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
                return {
                  compress: e,
                  decompress: t
                }
              }(),
              l = function() {
                function e(e) {
                  var t, r, o, i = {},
                      s = "",
                      u = [],
                      a = n;
                  for (t = 0; n > t; t += 1) i[String.fromCharCode(t)] = t;
                  for (t = 0; t < e.length; t += 1) r = e.charAt(t), r.charCodeAt(0) > n || (o = s + r, i[o] ? s = o : (u[u.length] = i[s], i[o] = a++, s = String(r)));
                  return "" !== s && (u[u.length] = i[s]), u
                }

                function t(e) {
                  var t, r, o, i, s = [],
                      u = "",
                      a = n;
                  for (t = 0; n > t; t += 1) s[t] = String.fromCharCode(t);
                  for (r = String.fromCharCode(e[0]), o = r, t = 1; t < e.length; t += 1) {
                    if (i = e[t], s[i]) u = s[i];
                    else {
                      if (i !== a) throw "Unexpected character in decompression";
                      u = r + r.charAt(0)
                    }
                    o += u, s[a++] = r + u.charAt(0), r = u
                  }
                  return o
                }
                var n = 382;
                return {
                  compress: function(t, n) {
                    return e(t).map(function(e) {
                      return n(e)
                    }).join("")
                  },
                  decompress: function(e, n, r) {
                    var o, i = [];
                    for (e = e.split(""); e.length;) {
                      if (o = n(e.splice(0, r).join("")), 32 > o) throw "Unexpected entity in decoding";
                      i[i.length] = o
                    }
                    return t(i)
                  }
                }
              }();
          return {
            copy: o,
            paste: s,
            tools: {
              extract: i,
              M: u,
              Heuristic: c,
              makeRecursiveTraverser: t
            },
            testCompression: function(t) {
              var n = l.compress(t, u.makeConverter(e.numberLength));
              console.log(n)
              console.log('compressebion')
              return [n, l.decompress(n, u.reverseConverter, e.numberLength)]
            }
          }
        };
        t && (t.exports = r)
      }, {}],
      8: [function(e, t, n) {
        t.exports = function() {
          var t = e("./Translate");
          return {
            content: new t([{
              "long": "node",
              "short": "node"
            }, {
              "long": "prev",
              "short": "prev"
            }, {
              "long": "parent",
              "short": "parent"
            }, {
              "long": "rip",
              "short": "rip"
            }, {
              "long": "version",
              "short": "version"
            }, {
              "long": "tagname",
              "short": "tagname"
            }, {
              "long": "source",
              "short": "source",
              values: [{
                "long": "insertion",
                "short": "insertion"
              }, {
                "long": "attr",
                "short": "attr"
              }]
            }, {
              "long": "page",
              "short": "page"
            }]),
            event: new t([{
              "long": "type",
              "short": "e",
              values: [{
                "long": "focus",
                "short": "focus"
              }, {
                "long": "blur",
                "short": "blue"
              }, {
                "long": "change",
                "short": "change"
              }, {
                "long": "mousemove",
                "short": "mousemove"
              }, {
                "long": "mousedragging",
                "short": "mousedragging"
              }, {
                "long": "click",
                "short": "click"
              }, {
                "long": "keypress",
                "short": "keypress"
              }, {
                "long": "create",
                "short": "create"
              }, {
                "long": "remove",
                "short": "remove"
              }, {
                "long": "attrChange",
                "short": "attrChange"
              }, {
                "long": "resize",
                "short": "resize"
              }, {
                "long": "page",
                "short": "page"
              }]
            }, {
              "long": "nodeId",
              "short": "nodeId"
            }, {
              "long": "timestamp",
              "short": "timestamp"
            }, {
              "long": "offset",
              "short": "offset"
            }, {
              "long": "mouseButton",
              "short": "mouseButton"
            }, {
              "long": "windowSize",
              "short": "windowSize"
            }, {
              "long": "version",
              "short": "version"
            }, {
              "long": "page",
              "short": "page"
            }])
          }
        }()
      }, {
        "./Translate": 3
      }],
      9: [function(e, t, n) {
        ! function() {
          var n = e("underscore");
          n.mixin({
            deepClone: function(e) {
              return JSON.parse(JSON.stringify(e))
            }
          }), t.exports = n
        }()
      }, {
        underscore: 22
      }],
      10: [function(e, t, n) {
        function r() {
          this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
        }

        function o(e) {
          return "function" == typeof e
        }

        function i(e) {
          return "number" == typeof e
        }

        function s(e) {
          return "object" == typeof e && null !== e
        }

        function u(e) {
          return void 0 === e
        }
        t.exports = r, r.EventEmitter = r, r.prototype._events = void 0, r.prototype._maxListeners = void 0, r.defaultMaxListeners = 10, r.prototype.setMaxListeners = function(e) {
          if (!i(e) || 0 > e || isNaN(e)) throw TypeError("n must be a positive number");
          return this._maxListeners = e, this
        }, r.prototype.emit = function(e) {
          var t, n, r, i, a, c;
          if (this._events || (this._events = {}), "error" === e && (!this._events.error || s(this._events.error) && !this._events.error.length)) {
            if (t = arguments[1], t instanceof Error) throw t;
            throw TypeError('Uncaught, unspecified "error" event.')
          }
          if (n = this._events[e], u(n)) return !1;
          if (o(n)) switch (arguments.length) {
            case 1:
              n.call(this);
              break;
            case 2:
              n.call(this, arguments[1]);
              break;
            case 3:
              n.call(this, arguments[1], arguments[2]);
              break;
            default:
              for (r = arguments.length, i = new Array(r - 1), a = 1; r > a; a++) i[a - 1] = arguments[a];
              n.apply(this, i)
          } else if (s(n)) {
            for (r = arguments.length, i = new Array(r - 1), a = 1; r > a; a++) i[a - 1] = arguments[a];
            for (c = n.slice(), r = c.length, a = 0; r > a; a++) c[a].apply(this, i)
          }
          return !0
        }, r.prototype.addListener = function(e, t) {
          var n;
          if (!o(t)) throw TypeError("listener must be a function");
          if (this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, o(t.listener) ? t.listener : t), this._events[e] ? s(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, s(this._events[e]) && !this._events[e].warned) {
            var n;
            n = u(this._maxListeners) ? r.defaultMaxListeners : this._maxListeners, n && n > 0 && this._events[e].length > n && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace())
          }
          return this
        }, r.prototype.on = r.prototype.addListener, r.prototype.once = function(e, t) {
          function n() {
            this.removeListener(e, n), r || (r = !0, t.apply(this, arguments))
          }
          if (!o(t)) throw TypeError("listener must be a function");
          var r = !1;
          return n.listener = t, this.on(e, n), this
        }, r.prototype.removeListener = function(e, t) {
          var n, r, i, u;
          if (!o(t)) throw TypeError("listener must be a function");
          if (!this._events || !this._events[e]) return this;
          if (n = this._events[e], i = n.length, r = -1, n === t || o(n.listener) && n.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);
          else if (s(n)) {
            for (u = i; u-- > 0;)
              if (n[u] === t || n[u].listener && n[u].listener === t) {
                r = u;
                break
              }
            if (0 > r) return this;
            1 === n.length ? (n.length = 0, delete this._events[e]) : n.splice(r, 1), this._events.removeListener && this.emit("removeListener", e, t)
          }
          return this
        }, r.prototype.removeAllListeners = function(e) {
          var t, n;
          if (!this._events) return this;
          if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
          if (0 === arguments.length) {
            for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
            return this.removeAllListeners("removeListener"), this._events = {}, this
          }
          if (n = this._events[e], o(n)) this.removeListener(e, n);
          else
            for (; n.length;) this.removeListener(e, n[n.length - 1]);
          return delete this._events[e], this
        }, r.prototype.listeners = function(e) {
          var t;
          return t = this._events && this._events[e] ? o(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
        }, r.listenerCount = function(e, t) {
          var n;
          return n = e._events && e._events[t] ? o(e._events[t]) ? 1 : e._events[t].length : 0
        }
      }, {}],
      11: [function(e, t, n) {
        "function" == typeof Object.create ? t.exports = function(e, t) {
          e.super_ = t, e.prototype = Object.create(t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          })
        } : t.exports = function(e, t) {
          e.super_ = t;
          var n = function() {};
          n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e
        }
      }, {}],
      12: [function(e, t, n) {
        function r() {
          if (!u) {
            u = !0;
            for (var e, t = s.length; t;) {
              e = s, s = [];
              for (var n = -1; ++n < t;) e[n]();
              t = s.length
            }
            u = !1
          }
        }

        function o() {}
        var i = t.exports = {},
            s = [],
            u = !1;
        i.nextTick = function(e) {
          s.push(e), u || setTimeout(r, 0)
        }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = o, i.addListener = o, i.once = o, i.off = o, i.removeListener = o, i.removeAllListeners = o, i.emit = o, i.binding = function(e) {
          throw new Error("process.binding is not supported")
        }, i.cwd = function() {
          return "/"
        }, i.chdir = function(e) {
          throw new Error("process.chdir is not supported")
        }, i.umask = function() {
          return 0
        }
      }, {}],
      13: [function(e, t, n) {
        t.exports = function(e) {
          return e && "object" == typeof e && "function" == typeof e.copy && "function" == typeof e.fill && "function" == typeof e.readUInt8
        }
      }, {}],
      14: [function(e, t, n) {
        (function(t, r) {
          function o(e, t) {
            var r = {
              seen: [],
              stylize: s
            };
            return arguments.length >= 3 && (r.depth = arguments[2]), arguments.length >= 4 && (r.colors = arguments[3]), m(t) ? r.showHidden = t : t && n._extend(r, t), _(r.showHidden) && (r.showHidden = !1), _(r.depth) && (r.depth = 2), _(r.colors) && (r.colors = !1), _(r.customInspect) && (r.customInspect = !0), r.colors && (r.stylize = i), a(r, e, r.depth)
          }

          function i(e, t) {
            var n = o.styles[t];
            return n ? "[" + o.colors[n][0] + "m" + e + "[" + o.colors[n][1] + "m" : e
          }

          function s(e, t) {
            return e
          }

          function u(e) {
            var t = {};
            return e.forEach(function(e, n) {
              t[e] = !0
            }), t
          }

          function a(e, t, r) {
            if (e.customInspect && t && T(t.inspect) && t.inspect !== n.inspect && (!t.constructor || t.constructor.prototype !== t)) {
              var o = t.inspect(r, e);
              return b(o) || (o = a(e, o, r)), o
            }
            var i = c(e, t);
            if (i) return i;
            var s = Object.keys(t),
                m = u(s);
            if (e.showHidden && (s = Object.getOwnPropertyNames(t)), O(t) && (s.indexOf("message") >= 0 || s.indexOf("description") >= 0)) return l(t);
            if (0 === s.length) {
              if (T(t)) {
                var g = t.name ? ": " + t.name : "";
                return e.stylize("[Function" + g + "]", "special")
              }
              if (x(t)) return e.stylize(RegExp.prototype.toString.call(t), "regexp");
              if (E(t)) return e.stylize(Date.prototype.toString.call(t), "date");
              if (O(t)) return l(t)
            }
            var v = "",
                y = !1,
                w = ["{", "}"];
            if (h(t) && (y = !0, w = ["[", "]"]), T(t)) {
              var _ = t.name ? ": " + t.name : "";
              v = " [Function" + _ + "]"
            }
            if (x(t) && (v = " " + RegExp.prototype.toString.call(t)), E(t) && (v = " " + Date.prototype.toUTCString.call(t)), O(t) && (v = " " + l(t)), 0 === s.length && (!y || 0 == t.length)) return w[0] + v + w[1];
            if (0 > r) return x(t) ? e.stylize(RegExp.prototype.toString.call(t), "regexp") : e.stylize("[Object]", "special");
            e.seen.push(t);
            var S;
            return S = y ? f(e, t, r, m, s) : s.map(function(n) {
              return p(e, t, r, m, n, y)
            }), e.seen.pop(), d(S, v, w)
          }

          function c(e, t) {
            if (_(t)) return e.stylize("undefined", "undefined");
            if (b(t)) {
              var n = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
              return e.stylize(n, "string")
            }
            return y(t) ? e.stylize("" + t, "number") : m(t) ? e.stylize("" + t, "boolean") : g(t) ? e.stylize("null", "null") : void 0
          }

          function l(e) {
            return "[" + Error.prototype.toString.call(e) + "]"
          }

          function f(e, t, n, r, o) {
            for (var i = [], s = 0, u = t.length; u > s; ++s) N(t, String(s)) ? i.push(p(e, t, n, r, String(s), !0)) : i.push("");
            return o.forEach(function(o) {
              o.match(/^\d+$/) || i.push(p(e, t, n, r, o, !0))
            }), i
          }

          function p(e, t, n, r, o, i) {
            var s, u, c;
            if (c = Object.getOwnPropertyDescriptor(t, o) || {
                  value: t[o]
                }, c.get ? u = c.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : c.set && (u = e.stylize("[Setter]", "special")), N(r, o) || (s = "[" + o + "]"), u || (e.seen.indexOf(c.value) < 0 ? (u = g(n) ? a(e, c.value, null) : a(e, c.value, n - 1), u.indexOf("\n") > -1 && (u = i ? u.split("\n").map(function(e) {
                  return "  " + e
                }).join("\n").substr(2) : "\n" + u.split("\n").map(function(e) {
                  return "   " + e
                }).join("\n"))) : u = e.stylize("[Circular]", "special")), _(s)) {
              if (i && o.match(/^\d+$/)) return u;
              s = JSON.stringify("" + o), s.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (s = s.substr(1, s.length - 2), s = e.stylize(s, "name")) : (s = s.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), s = e.stylize(s, "string"))
            }
            return s + ": " + u
          }

          function d(e, t, n) {
            var r = 0,
                o = e.reduce(function(e, t) {
                  return r++, t.indexOf("\n") >= 0 && r++, e + t.replace(/\u001b\[\d\d?m/g, "").length + 1
                }, 0);
            return o > 60 ? n[0] + ("" === t ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + n[1] : n[0] + t + " " + e.join(", ") + " " + n[1]
          }

          function h(e) {
            return Array.isArray(e)
          }

          function m(e) {
            return "boolean" == typeof e
          }

          function g(e) {
            return null === e
          }

          function v(e) {
            return null == e
          }

          function y(e) {
            return "number" == typeof e
          }

          function b(e) {
            return "string" == typeof e
          }

          function w(e) {
            return "symbol" == typeof e
          }

          function _(e) {
            return void 0 === e
          }

          function x(e) {
            return S(e) && "[object RegExp]" === C(e)
          }

          function S(e) {
            return "object" == typeof e && null !== e
          }

          function E(e) {
            return S(e) && "[object Date]" === C(e)
          }

          function O(e) {
            return S(e) && ("[object Error]" === C(e) || e instanceof Error)
          }

          function T(e) {
            return "function" == typeof e
          }

          function k(e) {
            return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || "undefined" == typeof e
          }

          function C(e) {
            return Object.prototype.toString.call(e)
          }

          function j(e) {
            return 10 > e ? "0" + e.toString(10) : e.toString(10)
          }

          function L() {
            var e = new Date,
                t = [j(e.getHours()), j(e.getMinutes()), j(e.getSeconds())].join(":");
            return [e.getDate(), M[e.getMonth()], t].join(" ")
          }

          function N(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
          }
          var A = /%[sdj%]/g;
          n.format = function(e) {
            if (!b(e)) {
              for (var t = [], n = 0; n < arguments.length; n++) t.push(o(arguments[n]));
              return t.join(" ")
            }
            for (var n = 1, r = arguments, i = r.length, s = String(e).replace(A, function(e) {
              if ("%%" === e) return "%";
              if (n >= i) return e;
              switch (e) {
                case "%s":
                  return String(r[n++]);
                case "%d":
                  return Number(r[n++]);
                case "%j":
                  try {
                    return JSON.stringify(r[n++])
                  } catch (t) {
                    return "[Circular]"
                  }
                default:
                  return e
              }
            }), u = r[n]; i > n; u = r[++n]) s += g(u) || !S(u) ? " " + u : " " + o(u);
            return s
          }, n.deprecate = function(e, o) {
            function i() {
              if (!s) {
                if (t.throwDeprecation) throw new Error(o);
                t.traceDeprecation ? console.trace(o) : console.error(o), s = !0
              }
              return e.apply(this, arguments)
            }
            if (_(r.process)) return function() {
              return n.deprecate(e, o).apply(this, arguments)
            };
            if (t.noDeprecation === !0) return e;
            var s = !1;
            return i
          };
          var I, D = {};
          n.debuglog = function(e) {
            if (_(I) && (I = t.env.NODE_DEBUG || ""), e = e.toUpperCase(), !D[e])
              if (new RegExp("\\b" + e + "\\b", "i").test(I)) {
                var r = t.pid;
                D[e] = function() {
                  var t = n.format.apply(n, arguments);
                  console.error("%s %d: %s", e, r, t)
                }
              } else D[e] = function() {};
            return D[e]
          }, n.inspect = o, o.colors = {
            bold: [1, 22],
            italic: [3, 23],
            underline: [4, 24],
            inverse: [7, 27],
            white: [37, 39],
            grey: [90, 39],
            black: [30, 39],
            blue: [34, 39],
            cyan: [36, 39],
            green: [32, 39],
            magenta: [35, 39],
            red: [31, 39],
            yellow: [33, 39]
          }, o.styles = {
            special: "cyan",
            number: "yellow",
            "boolean": "yellow",
            undefined: "grey",
            "null": "bold",
            string: "green",
            date: "magenta",
            regexp: "red"
          }, n.isArray = h, n.isBoolean = m, n.isNull = g, n.isNullOrUndefined = v, n.isNumber = y, n.isString = b, n.isSymbol = w, n.isUndefined = _, n.isRegExp = x, n.isObject = S, n.isDate = E, n.isError = O, n.isFunction = T, n.isPrimitive = k, n.isBuffer = e("./support/isBuffer");
          var M = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          n.log = function() {
            console.log("%s - %s", L(), n.format.apply(n, arguments))
          }, n.inherits = e("inherits"), n._extend = function(e, t) {
            if (!t || !S(t)) return e;
            for (var n = Object.keys(t), r = n.length; r--;) e[n[r]] = t[n[r]];
            return e
          }
        }).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
      }, {
        "./support/isBuffer": 13,
        _process: 12,
        inherits: 11
      }],
      15: [function(e, t, n) {
        ! function(e, r) {
          "use strict";
          var o = function(e) {
                if ("object" != typeof e.document) throw new Error("Cookies.js requires a `window` with a `document` object");
                var t = function(e, n, r) {
                  return 1 === arguments.length ? t.get(e) : t.set(e, n, r)
                };
                return t._document = e.document, t._cacheKeyPrefix = "cookey.", t._maxExpireDate = new Date("Fri, 31 Dec 9999 23:59:59 UTC"), t.defaults = {
                  path: "/",
                  secure: !1
                }, t.get = function(e) {
                  return t._cachedDocumentCookie !== t._document.cookie && t._renewCache(), t._cache[t._cacheKeyPrefix + e]
                }, t.set = function(e, n, o) {
                  return o = t._getExtendedOptions(o), o.expires = t._getExpiresDate(n === r ? -1 : o.expires), t._document.cookie = t._generateCookieString(e, n, o), t
                }, t.expire = function(e, n) {
                  return t.set(e, r, n)
                }, t._getExtendedOptions = function(e) {
                  return {
                    path: e && e.path || t.defaults.path,
                    domain: e && e.domain || t.defaults.domain,
                    expires: e && e.expires || t.defaults.expires,
                    secure: e && e.secure !== r ? e.secure : t.defaults.secure
                  }
                }, t._isValidDate = function(e) {
                  return "[object Date]" === Object.prototype.toString.call(e) && !isNaN(e.getTime())
                }, t._getExpiresDate = function(e, n) {
                  if (n = n || new Date, "number" == typeof e ? e = e === 1 / 0 ? t._maxExpireDate : new Date(n.getTime() + 1e3 * e) : "string" == typeof e && (e = new Date(e)), e && !t._isValidDate(e)) throw new Error("`expires` parameter cannot be converted to a valid Date instance");
                  return e
                }, t._generateCookieString = function(e, t, n) {
                  e = e.replace(/[^#$&+\^`|]/g, encodeURIComponent), e = e.replace(/\(/g, "%28").replace(/\)/g, "%29"), t = (t + "").replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent), n = n || {};
                  var r = e + "=" + t;
                  return r += n.path ? ";path=" + n.path : "", r += n.domain ? ";domain=" + n.domain : "", r += n.expires ? ";expires=" + n.expires.toUTCString() : "", r += n.secure ? ";secure" : ""
                }, t._getCacheFromString = function(e) {
                  for (var n = {}, o = e ? e.split("; ") : [], i = 0; i < o.length; i++) {
                    var s = t._getKeyValuePairFromCookieString(o[i]);
                    n[t._cacheKeyPrefix + s.key] === r && (n[t._cacheKeyPrefix + s.key] = s.value)
                  }
                  return n
                }, t._getKeyValuePairFromCookieString = function(e) {
                  var t = e.indexOf("=");
                  return t = 0 > t ? e.length : t, {
                    key: decodeURIComponent(e.substr(0, t)),
                    value: decodeURIComponent(e.substr(t + 1))
                  }
                }, t._renewCache = function() {
                  t._cache = t._getCacheFromString(t._document.cookie), t._cachedDocumentCookie = t._document.cookie
                }, t._areEnabled = function() {
                  var e = "cookies.js",
                      n = "1" === t.set(e, 1).get(e);
                  return t.expire(e), n
                }, t.enabled = t._areEnabled(), t
              },
              i = "object" == typeof e.document ? o(e) : o;
          "function" == typeof define && define.amd ? define(function() {
            return i
          }) : "object" == typeof n ? ("object" == typeof t && "object" == typeof t.exports && (n = t.exports = i), n.Cookies = i) : e.Cookies = i
        }("undefined" == typeof window ? this : window)
      }, {}],
      16: [function(e, t, n) {
        var r = Object.prototype.hasOwnProperty,
            o = Object.prototype.toString;
        t.exports = function(e, t, n) {
          if ("[object Function]" !== o.call(t)) throw new TypeError("iterator must be a function");
          var i = e.length;
          if (i === +i)
            for (var s = 0; i > s; s++) t.call(n, e[s], s, e);
          else
            for (var u in e) r.call(e, u) && t.call(n, e[u], u, e)
        }
      }, {}],
      17: [function(e, t, n) {
        (function(n) {
          t.exports = function() {
            function t(e) {
              o.prototype.constructor.call(this), this._queue = i({
                timeout: 100,
                concurrency: 1
              }), this.engine = null, this._connecting = !1, this._disconnected = !0, this._options = s({
                autoConnect: !1,
                autoReconnect: !0
              }, e), this.url = this._options.url, this._options.autoConnect && this.connect(this.url)
            }
            var r = e("util"),
                o = e("events").EventEmitter,
                i = e("queue"),
                s = e("extend"),
                u = e("./lib/web-socket");
            return t.supported = !!u, r.inherits(t, o), s(t.prototype, {
              connect: function(e) {
                return this._disconnected ? (this.engine && (this._queue.end(), this.engine.close(), this.engine = null), this._disconnected = !1, this._closedManually = !1, this._connected = !0, this.url = this.url || e, this._createSocket()) : this.emit("error", "socket connection is already estabilished"), this
              },
              disconnect: function() {
                return this._disconnected || this._closedManually ? this.emit("error", "socket connection is already closed or closing") : (this._closedManually = !0, this.engine.close()), this
              },
              isConnected: function() {
                return this.engine && this.engine.readyState === this.engine.OPEN
              },
              send: function(e) {
                var t;
                try {
                  t = JSON.stringify(e)
                  console.log(t);
                  alert('d')
                } catch (n) {
                  return this.emit("error", "cannot parse message to JSON"), !1
                }
                if (this.isConnected()) this.engine.send(t);
                else if (this._queue.push(this.send.bind(this, e)), this._connected) {
                  if (!this._options.autoReconnect || this._closedManually || this._connecting) return this.emit("error", "try to send a message but socket was closed manually or is disconnected and autoReconnect option is not enabled"), !1;
                  this._reconnect()
                } else this.emit("error", "try to send a message but socket has never been connected");
                return this
              },
              receive: function(e, t) {
                var n = e.split(" ").map(function(e) {
                  return e.toLowerCase()
                });
                return n.forEach(function() {
                  this.addListener("message_" + n, t)
                }, this),
                    function() {
                      n.forEach(function() {
                        this.removeListener("message_" + n, t)
                      }, this)
                    }
              },
              _reconnect: function() {
                this._reconnecting = !0, this._createSocket()
              },
              _createSocket: function() {
                try {
                  this.engine = new u(this.url)
                } catch (e) {
                  return this.emit("error", e)
                }
                this._connecting = !0, this.engine.addEventListener("open", this._engineHandlers.open.bind(this)), this.engine.addEventListener("message", this._engineHandlers.message.bind(this)), this.engine.addEventListener("error", this._engineHandlers.error.bind(this)), this.engine.addEventListener("close", this._engineHandlers.close.bind(this))
              },
              _engineHandlers: {
                open: function() {
                  this.engine.readyState === this.engine.OPEN && (this._reconnecting ? (this.emit("reconnect"), this._reconnecting = !1) : this.emit("connect"), this._connecting = !1, n.nextTick(function() {
                    this._queue.start()
                  }.bind(this)))
                },
                message: function(e) {
                  var t;
                  try {
                    t = JSON.parse(e.data), t.type = t.type.toLowerCase()
                  } catch (n) {
                    return this.emit("error", "cannot parse message to JSON", t), !1
                  }
                  return "undefined" != typeof t.type && null !== t.type && "" !== t.type ? (this.emit("message", t), this.emit("message_" + t.type, t.data), !0) : (this.emit("error", "message has not a valid type", t), !1)
                },
                close: function(e) {
                  (this._closedManually || !this._options.autoReconnect) && (this._disconnected = !0, this.engine = null), this.emit("disconnect", e)
                },
                error: function(e) {
                  this.emit("error", e)
                }
              }
            }), t
          }()
        }).call(this, e("_process"))
      }, {
        "./lib/web-socket": 18,
        _process: 12,
        events: 10,
        extend: 19,
        queue: 20,
        util: 14
      }],
      18: [function(e, t, n) {
        t.exports = window.WebSocket || window.mozWebSocket || window.webkitWebSocket
      }, {}],
      19: [function(e, t, n) {
        var r, o = Object.prototype.hasOwnProperty,
            i = Object.prototype.toString,
            s = function(e) {
              "use strict";
              if (!e || "[object Object]" !== i.call(e) || e.nodeType || e.setInterval) return !1;
              var t = o.call(e, "constructor"),
                  n = e.constructor && e.constructor.prototype && o.call(e.constructor.prototype, "isPrototypeOf");
              if (e.constructor && !t && !n) return !1;
              var s;
              for (s in e);
              return s === r || o.call(e, s)
            };
        t.exports = function u() {
          "use strict";
          var e, t, n, o, i, a, c = arguments[0],
              l = 1,
              f = arguments.length,
              p = !1;
          for ("boolean" == typeof c ? (p = c, c = arguments[1] || {}, l = 2) : ("object" != typeof c && "function" != typeof c || c == r) && (c = {}); f > l; ++l)
            if (null != (e = arguments[l]))
              for (t in e) n = c[t], o = e[t], c !== o && (p && o && (s(o) || (i = Array.isArray(o))) ? (i ? (i = !1, a = n && Array.isArray(n) ? n : []) : a = n && s(n) ? n : {}, c[t] = u(p, a, o)) : o !== r && (c[t] = o));
          return c
        }
      }, {}],
      20: [function(e, t, n) {
        function r(e) {
          return this instanceof r ? (u.call(this), e = e || {}, this.concurrency = e.concurrency || 1 / 0, this.timeout = e.timeout || 0, this.pending = 0, this.session = 0, this.running = !1, void(this.jobs = [])) : new r(e)
        }

        function o(e) {
          function t(e) {
            r.end(e)
          }

          function n(o) {
            r.removeListener("error", t), r.removeListener("end", n), e(o)
          }
          var r = this;
          this.on("error", t), this.on("end", n)
        }

        function i(e) {
          this.session++, this.running = !1, this.emit("end", e)
        }
        var s = e("inherits"),
            u = e("events").EventEmitter;
        t.exports = r, s(r, u);
        var a = ["push", "unshift", "splice", "pop", "shift", "slice", "reverse", "indexOf", "lastIndexOf"];
        for (var c in a)(function(e) {
          r.prototype[e] = function() {
            return Array.prototype[e].apply(this.jobs, arguments)
          }
        })(a[c]);
        Object.defineProperty(r.prototype, "length", {
          get: function() {
            return this.pending + this.jobs.length
          }
        }), r.prototype.start = function(e) {
          function t(e, t) {
            s && n.session === u && (s = !1, n.pending--, null !== a && clearTimeout(a), e ? n.emit("error", e, r) : c === !1 && n.emit("success", t, r), n.session === u && (0 === n.pending && 0 === n.jobs.length ? i.call(n) : n.running && n.start()))
          }
          if (e && o.call(this, e), this.pending !== this.concurrency) {
            if (0 === this.jobs.length) return void(0 === this.pending && i.call(this));
            var n = this,
                r = this.jobs.shift(),
                s = !0,
                u = this.session,
                a = null,
                c = !1;
            this.timeout && (a = setTimeout(function() {
              c = !0, n.listeners("timeout").length > 0 ? n.emit("timeout", t, r) : t()
            }, this.timeout)), this.pending++, this.running = !0, r(t), this.jobs.length > 0 && this.start()
          }
        }, r.prototype.stop = function() {
          this.running = !1
        }, r.prototype.end = function(e) {
          this.jobs.length = 0, this.pending = 0, i.call(this, e)
        }
      }, {
        events: 10,
        inherits: 21
      }],
      21: [function(e, t, n) {
        arguments[4][11][0].apply(n, arguments)
      }, {
        dup: 11
      }],
      22: [function(e, t, n) {
        (function() {
          function e(e) {
            function t(t, n, r, o, i, s) {
              for (; i >= 0 && s > i; i += e) {
                var u = o ? o[i] : i;
                r = n(r, t[u], u, t)
              }
              return r
            }
            return function(n, r, o, i) {
              r = _(r, i, 4);
              var s = !C(n) && w.keys(n),
                  u = (s || n).length,
                  a = e > 0 ? 0 : u - 1;
              return arguments.length < 3 && (o = n[s ? s[a] : a], a += e), t(n, r, o, s, a, u)
            }
          }

          function r(e) {
            return function(t, n, r) {
              n = x(n, r);
              for (var o = k(t), i = e > 0 ? 0 : o - 1; i >= 0 && o > i; i += e)
                if (n(t[i], i, t)) return i;
              return -1
            }
          }

          function o(e, t, n) {
            return function(r, o, i) {
              var s = 0,
                  u = k(r);
              if ("number" == typeof i) e > 0 ? s = i >= 0 ? i : Math.max(i + u, s) : u = i >= 0 ? Math.min(i + 1, u) : i + u + 1;
              else if (n && i && u) return i = n(r, o), r[i] === o ? i : -1;
              if (o !== o) return i = t(p.call(r, s, u), w.isNaN), i >= 0 ? i + s : -1;
              for (i = e > 0 ? s : u - 1; i >= 0 && u > i; i += e)
                if (r[i] === o) return i;
              return -1
            }
          }

          function i(e, t) {
            var n = I.length,
                r = e.constructor,
                o = w.isFunction(r) && r.prototype || c,
                i = "constructor";
            for (w.has(e, i) && !w.contains(t, i) && t.push(i); n--;) i = I[n], i in e && e[i] !== o[i] && !w.contains(t, i) && t.push(i)
          }
          var s = this,
              u = s._,
              a = Array.prototype,
              c = Object.prototype,
              l = Function.prototype,
              f = a.push,
              p = a.slice,
              d = c.toString,
              h = c.hasOwnProperty,
              m = Array.isArray,
              g = Object.keys,
              v = l.bind,
              y = Object.create,
              b = function() {},
              w = function(e) {
                return e instanceof w ? e : this instanceof w ? void(this._wrapped = e) : new w(e)
              };
          "undefined" != typeof n ? ("undefined" != typeof t && t.exports && (n = t.exports = w), n._ = w) : s._ = w, w.VERSION = "1.8.3";
          var _ = function(e, t, n) {
                if (void 0 === t) return e;
                switch (null == n ? 3 : n) {
                  case 1:
                    return function(n) {
                      return e.call(t, n)
                    };
                  case 2:
                    return function(n, r) {
                      return e.call(t, n, r)
                    };
                  case 3:
                    return function(n, r, o) {
                      return e.call(t, n, r, o)
                    };
                  case 4:
                    return function(n, r, o, i) {
                      return e.call(t, n, r, o, i)
                    }
                }
                return function() {
                  return e.apply(t, arguments)
                }
              },
              x = function(e, t, n) {
                return null == e ? w.identity : w.isFunction(e) ? _(e, t, n) : w.isObject(e) ? w.matcher(e) : w.property(e)
              };
          w.iteratee = function(e, t) {
            return x(e, t, 1 / 0)
          };
          var S = function(e, t) {
                return function(n) {
                  var r = arguments.length;
                  if (2 > r || null == n) return n;
                  for (var o = 1; r > o; o++)
                    for (var i = arguments[o], s = e(i), u = s.length, a = 0; u > a; a++) {
                      var c = s[a];
                      t && void 0 !== n[c] || (n[c] = i[c])
                    }
                  return n
                }
              },
              E = function(e) {
                if (!w.isObject(e)) return {};
                if (y) return y(e);
                b.prototype = e;
                var t = new b;
                return b.prototype = null, t
              },
              O = function(e) {
                return function(t) {
                  return null == t ? void 0 : t[e]
                }
              },
              T = Math.pow(2, 53) - 1,
              k = O("length"),
              C = function(e) {
                var t = k(e);
                return "number" == typeof t && t >= 0 && T >= t
              };
          w.each = w.forEach = function(e, t, n) {
            t = _(t, n);
            var r, o;
            if (C(e))
              for (r = 0, o = e.length; o > r; r++) t(e[r], r, e);
            else {
              var i = w.keys(e);
              for (r = 0, o = i.length; o > r; r++) t(e[i[r]], i[r], e)
            }
            return e
          }, w.map = w.collect = function(e, t, n) {
            t = x(t, n);
            for (var r = !C(e) && w.keys(e), o = (r || e).length, i = Array(o), s = 0; o > s; s++) {
              var u = r ? r[s] : s;
              i[s] = t(e[u], u, e)
            }
            return i
          }, w.reduce = w.foldl = w.inject = e(1), w.reduceRight = w.foldr = e(-1), w.find = w.detect = function(e, t, n) {
            var r;
            return r = C(e) ? w.findIndex(e, t, n) : w.findKey(e, t, n), void 0 !== r && -1 !== r ? e[r] : void 0
          }, w.filter = w.select = function(e, t, n) {
            var r = [];
            return t = x(t, n), w.each(e, function(e, n, o) {
              t(e, n, o) && r.push(e)
            }), r
          }, w.reject = function(e, t, n) {
            return w.filter(e, w.negate(x(t)), n)
          }, w.every = w.all = function(e, t, n) {
            t = x(t, n);
            for (var r = !C(e) && w.keys(e), o = (r || e).length, i = 0; o > i; i++) {
              var s = r ? r[i] : i;
              if (!t(e[s], s, e)) return !1
            }
            return !0
          }, w.some = w.any = function(e, t, n) {
            t = x(t, n);
            for (var r = !C(e) && w.keys(e), o = (r || e).length, i = 0; o > i; i++) {
              var s = r ? r[i] : i;
              if (t(e[s], s, e)) return !0
            }
            return !1
          }, w.contains = w.includes = w.include = function(e, t, n, r) {
            return C(e) || (e = w.values(e)), ("number" != typeof n || r) && (n = 0), w.indexOf(e, t, n) >= 0
          }, w.invoke = function(e, t) {
            var n = p.call(arguments, 2),
                r = w.isFunction(t);
            return w.map(e, function(e) {
              var o = r ? t : e[t];
              return null == o ? o : o.apply(e, n)
            })
          }, w.pluck = function(e, t) {
            return w.map(e, w.property(t))
          }, w.where = function(e, t) {
            return w.filter(e, w.matcher(t))
          }, w.findWhere = function(e, t) {
            return w.find(e, w.matcher(t))
          }, w.max = function(e, t, n) {
            var r, o, i = -(1 / 0),
                s = -(1 / 0);
            if (null == t && null != e) {
              e = C(e) ? e : w.values(e);
              for (var u = 0, a = e.length; a > u; u++) r = e[u], r > i && (i = r)
            } else t = x(t, n), w.each(e, function(e, n, r) {
              o = t(e, n, r), (o > s || o === -(1 / 0) && i === -(1 / 0)) && (i = e, s = o)
            });
            return i
          }, w.min = function(e, t, n) {
            var r, o, i = 1 / 0,
                s = 1 / 0;
            if (null == t && null != e) {
              e = C(e) ? e : w.values(e);
              for (var u = 0, a = e.length; a > u; u++) r = e[u], i > r && (i = r)
            } else t = x(t, n), w.each(e, function(e, n, r) {
              o = t(e, n, r), (s > o || o === 1 / 0 && i === 1 / 0) && (i = e, s = o)
            });
            return i
          }, w.shuffle = function(e) {
            for (var t, n = C(e) ? e : w.values(e), r = n.length, o = Array(r), i = 0; r > i; i++) t = w.random(0, i), t !== i && (o[i] = o[t]), o[t] = n[i];
            return o
          }, w.sample = function(e, t, n) {
            return null == t || n ? (C(e) || (e = w.values(e)), e[w.random(e.length - 1)]) : w.shuffle(e).slice(0, Math.max(0, t))
          }, w.sortBy = function(e, t, n) {
            return t = x(t, n), w.pluck(w.map(e, function(e, n, r) {
              return {
                value: e,
                index: n,
                criteria: t(e, n, r)
              }
            }).sort(function(e, t) {
              var n = e.criteria,
                  r = t.criteria;
              if (n !== r) {
                if (n > r || void 0 === n) return 1;
                if (r > n || void 0 === r) return -1
              }
              return e.index - t.index
            }), "value")
          };
          var j = function(e) {
            return function(t, n, r) {
              var o = {};
              return n = x(n, r), w.each(t, function(r, i) {
                var s = n(r, i, t);
                e(o, r, s)
              }), o
            }
          };
          w.groupBy = j(function(e, t, n) {
            w.has(e, n) ? e[n].push(t) : e[n] = [t]
          }), w.indexBy = j(function(e, t, n) {
            e[n] = t
          }), w.countBy = j(function(e, t, n) {
            w.has(e, n) ? e[n]++ : e[n] = 1
          }), w.toArray = function(e) {
            return e ? w.isArray(e) ? p.call(e) : C(e) ? w.map(e, w.identity) : w.values(e) : []
          }, w.size = function(e) {
            return null == e ? 0 : C(e) ? e.length : w.keys(e).length
          }, w.partition = function(e, t, n) {
            t = x(t, n);
            var r = [],
                o = [];
            return w.each(e, function(e, n, i) {
              (t(e, n, i) ? r : o).push(e)
            }), [r, o]
          }, w.first = w.head = w.take = function(e, t, n) {
            return null == e ? void 0 : null == t || n ? e[0] : w.initial(e, e.length - t)
          }, w.initial = function(e, t, n) {
            return p.call(e, 0, Math.max(0, e.length - (null == t || n ? 1 : t)))
          }, w.last = function(e, t, n) {
            return null == e ? void 0 : null == t || n ? e[e.length - 1] : w.rest(e, Math.max(0, e.length - t))
          }, w.rest = w.tail = w.drop = function(e, t, n) {
            return p.call(e, null == t || n ? 1 : t)
          }, w.compact = function(e) {
            return w.filter(e, w.identity)
          };
          var L = function(e, t, n, r) {
            for (var o = [], i = 0, s = r || 0, u = k(e); u > s; s++) {
              var a = e[s];
              if (C(a) && (w.isArray(a) || w.isArguments(a))) {
                t || (a = L(a, t, n));
                var c = 0,
                    l = a.length;
                for (o.length += l; l > c;) o[i++] = a[c++]
              } else n || (o[i++] = a)
            }
            return o
          };
          w.flatten = function(e, t) {
            return L(e, t, !1)
          }, w.without = function(e) {
            return w.difference(e, p.call(arguments, 1))
          }, w.uniq = w.unique = function(e, t, n, r) {
            w.isBoolean(t) || (r = n, n = t, t = !1), null != n && (n = x(n, r));
            for (var o = [], i = [], s = 0, u = k(e); u > s; s++) {
              var a = e[s],
                  c = n ? n(a, s, e) : a;
              t ? (s && i === c || o.push(a), i = c) : n ? w.contains(i, c) || (i.push(c), o.push(a)) : w.contains(o, a) || o.push(a)
            }
            return o
          }, w.union = function() {
            return w.uniq(L(arguments, !0, !0))
          }, w.intersection = function(e) {
            for (var t = [], n = arguments.length, r = 0, o = k(e); o > r; r++) {
              var i = e[r];
              if (!w.contains(t, i)) {
                for (var s = 1; n > s && w.contains(arguments[s], i); s++);
                s === n && t.push(i)
              }
            }
            return t
          }, w.difference = function(e) {
            var t = L(arguments, !0, !0, 1);
            return w.filter(e, function(e) {
              return !w.contains(t, e)
            })
          }, w.zip = function() {
            return w.unzip(arguments)
          }, w.unzip = function(e) {
            for (var t = e && w.max(e, k).length || 0, n = Array(t), r = 0; t > r; r++) n[r] = w.pluck(e, r);
            return n
          }, w.object = function(e, t) {
            for (var n = {}, r = 0, o = k(e); o > r; r++) t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
            return n
          }, w.findIndex = r(1), w.findLastIndex = r(-1), w.sortedIndex = function(e, t, n, r) {
            n = x(n, r, 1);
            for (var o = n(t), i = 0, s = k(e); s > i;) {
              var u = Math.floor((i + s) / 2);
              n(e[u]) < o ? i = u + 1 : s = u
            }
            return i
          }, w.indexOf = o(1, w.findIndex, w.sortedIndex), w.lastIndexOf = o(-1, w.findLastIndex), w.range = function(e, t, n) {
            null == t && (t = e || 0, e = 0), n = n || 1;
            for (var r = Math.max(Math.ceil((t - e) / n), 0), o = Array(r), i = 0; r > i; i++, e += n) o[i] = e;
            return o
          };
          var N = function(e, t, n, r, o) {
            if (!(r instanceof t)) return e.apply(n, o);
            var i = E(e.prototype),
                s = e.apply(i, o);
            return w.isObject(s) ? s : i
          };
          w.bind = function(e, t) {
            if (v && e.bind === v) return v.apply(e, p.call(arguments, 1));
            if (!w.isFunction(e)) throw new TypeError("Bind must be called on a function");
            var n = p.call(arguments, 2),
                r = function() {
                  return N(e, r, t, this, n.concat(p.call(arguments)))
                };
            return r
          }, w.partial = function(e) {
            var t = p.call(arguments, 1),
                n = function() {
                  for (var r = 0, o = t.length, i = Array(o), s = 0; o > s; s++) i[s] = t[s] === w ? arguments[r++] : t[s];
                  for (; r < arguments.length;) i.push(arguments[r++]);
                  return N(e, n, this, this, i)
                };
            return n
          }, w.bindAll = function(e) {
            var t, n, r = arguments.length;
            if (1 >= r) throw new Error("bindAll must be passed function names");
            for (t = 1; r > t; t++) n = arguments[t], e[n] = w.bind(e[n], e);
            return e
          }, w.memoize = function(e, t) {
            var n = function(r) {
              var o = n.cache,
                  i = "" + (t ? t.apply(this, arguments) : r);
              return w.has(o, i) || (o[i] = e.apply(this, arguments)), o[i]
            };
            return n.cache = {}, n
          }, w.delay = function(e, t) {
            var n = p.call(arguments, 2);
            return setTimeout(function() {
              return e.apply(null, n)
            }, t)
          }, w.defer = w.partial(w.delay, w, 1), w.throttle = function(e, t, n) {
            var r, o, i, s = null,
                u = 0;
            n || (n = {});
            var a = function() {
              u = n.leading === !1 ? 0 : w.now(), s = null, i = e.apply(r, o), s || (r = o = null)
            };
            return function() {
              var c = w.now();
              u || n.leading !== !1 || (u = c);
              var l = t - (c - u);
              return r = this, o = arguments, 0 >= l || l > t ? (s && (clearTimeout(s), s = null), u = c, i = e.apply(r, o), s || (r = o = null)) : s || n.trailing === !1 || (s = setTimeout(a, l)), i
            }
          }, w.debounce = function(e, t, n) {
            var r, o, i, s, u, a = function() {
              var c = w.now() - s;
              t > c && c >= 0 ? r = setTimeout(a, t - c) : (r = null, n || (u = e.apply(i, o), r || (i = o = null)))
            };
            return function() {
              i = this, o = arguments, s = w.now();
              var c = n && !r;
              return r || (r = setTimeout(a, t)), c && (u = e.apply(i, o), i = o = null), u
            }
          }, w.wrap = function(e, t) {
            return w.partial(t, e)
          }, w.negate = function(e) {
            return function() {
              return !e.apply(this, arguments)
            }
          }, w.compose = function() {
            var e = arguments,
                t = e.length - 1;
            return function() {
              for (var n = t, r = e[t].apply(this, arguments); n--;) r = e[n].call(this, r);
              return r
            }
          }, w.after = function(e, t) {
            return function() {
              return --e < 1 ? t.apply(this, arguments) : void 0
            }
          }, w.before = function(e, t) {
            var n;
            return function() {
              return --e > 0 && (n = t.apply(this, arguments)), 1 >= e && (t = null), n
            }
          }, w.once = w.partial(w.before, 2);
          var A = !{
                toString: null
              }.propertyIsEnumerable("toString"),
              I = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
          w.keys = function(e) {
            if (!w.isObject(e)) return [];
            if (g) return g(e);
            var t = [];
            for (var n in e) w.has(e, n) && t.push(n);
            return A && i(e, t), t
          }, w.allKeys = function(e) {
            if (!w.isObject(e)) return [];
            var t = [];
            for (var n in e) t.push(n);
            return A && i(e, t), t
          }, w.values = function(e) {
            for (var t = w.keys(e), n = t.length, r = Array(n), o = 0; n > o; o++) r[o] = e[t[o]];
            return r
          }, w.mapObject = function(e, t, n) {
            t = x(t, n);
            for (var r, o = w.keys(e), i = o.length, s = {}, u = 0; i > u; u++) r = o[u], s[r] = t(e[r], r, e);
            return s
          }, w.pairs = function(e) {
            for (var t = w.keys(e), n = t.length, r = Array(n), o = 0; n > o; o++) r[o] = [t[o], e[t[o]]];
            return r
          }, w.invert = function(e) {
            for (var t = {}, n = w.keys(e), r = 0, o = n.length; o > r; r++) t[e[n[r]]] = n[r];
            return t
          }, w.functions = w.methods = function(e) {
            var t = [];
            for (var n in e) w.isFunction(e[n]) && t.push(n);
            return t.sort()
          }, w.extend = S(w.allKeys), w.extendOwn = w.assign = S(w.keys), w.findKey = function(e, t, n) {
            t = x(t, n);
            for (var r, o = w.keys(e), i = 0, s = o.length; s > i; i++)
              if (r = o[i], t(e[r], r, e)) return r
          }, w.pick = function(e, t, n) {
            var r, o, i = {},
                s = e;
            if (null == s) return i;
            w.isFunction(t) ? (o = w.allKeys(s), r = _(t, n)) : (o = L(arguments, !1, !1, 1), r = function(e, t, n) {
              return t in n
            }, s = Object(s));
            for (var u = 0, a = o.length; a > u; u++) {
              var c = o[u],
                  l = s[c];
              r(l, c, s) && (i[c] = l)
            }
            return i
          }, w.omit = function(e, t, n) {
            if (w.isFunction(t)) t = w.negate(t);
            else {
              var r = w.map(L(arguments, !1, !1, 1), String);
              t = function(e, t) {
                return !w.contains(r, t)
              }
            }
            return w.pick(e, t, n)
          }, w.defaults = S(w.allKeys, !0), w.create = function(e, t) {
            var n = E(e);
            return t && w.extendOwn(n, t), n
          }, w.clone = function(e) {
            return w.isObject(e) ? w.isArray(e) ? e.slice() : w.extend({}, e) : e
          }, w.tap = function(e, t) {
            return t(e), e
          }, w.isMatch = function(e, t) {
            var n = w.keys(t),
                r = n.length;
            if (null == e) return !r;
            for (var o = Object(e), i = 0; r > i; i++) {
              var s = n[i];
              if (t[s] !== o[s] || !(s in o)) return !1
            }
            return !0
          };
          var D = function(e, t, n, r) {
            if (e === t) return 0 !== e || 1 / e === 1 / t;
            if (null == e || null == t) return e === t;
            e instanceof w && (e = e._wrapped), t instanceof w && (t = t._wrapped);
            var o = d.call(e);
            if (o !== d.call(t)) return !1;
            switch (o) {
              case "[object RegExp]":
              case "[object String]":
                return "" + e == "" + t;
              case "[object Number]":
                return +e !== +e ? +t !== +t : 0 === +e ? 1 / +e === 1 / t : +e === +t;
              case "[object Date]":
              case "[object Boolean]":
                return +e === +t
            }
            var i = "[object Array]" === o;
            if (!i) {
              if ("object" != typeof e || "object" != typeof t) return !1;
              var s = e.constructor,
                  u = t.constructor;
              if (s !== u && !(w.isFunction(s) && s instanceof s && w.isFunction(u) && u instanceof u) && "constructor" in e && "constructor" in t) return !1
            }
            n = n || [], r = r || [];
            for (var a = n.length; a--;)
              if (n[a] === e) return r[a] === t;
            if (n.push(e), r.push(t), i) {
              if (a = e.length, a !== t.length) return !1;
              for (; a--;)
                if (!D(e[a], t[a], n, r)) return !1
            } else {
              var c, l = w.keys(e);
              if (a = l.length, w.keys(t).length !== a) return !1;
              for (; a--;)
                if (c = l[a], !w.has(t, c) || !D(e[c], t[c], n, r)) return !1
            }
            return n.pop(), r.pop(), !0
          };
          w.isEqual = function(e, t) {
            return D(e, t)
          }, w.isEmpty = function(e) {
            return null == e ? !0 : C(e) && (w.isArray(e) || w.isString(e) || w.isArguments(e)) ? 0 === e.length : 0 === w.keys(e).length
          }, w.isElement = function(e) {
            return !(!e || 1 !== e.nodeType)
          }, w.isArray = m || function(e) {
            return "[object Array]" === d.call(e)
          }, w.isObject = function(e) {
            var t = typeof e;
            return "function" === t || "object" === t && !!e
          }, w.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(e) {
            w["is" + e] = function(t) {
              return d.call(t) === "[object " + e + "]"
            }
          }), w.isArguments(arguments) || (w.isArguments = function(e) {
            return w.has(e, "callee")
          }), "function" != typeof /./ && "object" != typeof Int8Array && (w.isFunction = function(e) {
            return "function" == typeof e || !1
          }), w.isFinite = function(e) {
            return isFinite(e) && !isNaN(parseFloat(e))
          }, w.isNaN = function(e) {
            return w.isNumber(e) && e !== +e
          }, w.isBoolean = function(e) {
            return e === !0 || e === !1 || "[object Boolean]" === d.call(e)
          }, w.isNull = function(e) {
            return null === e
          }, w.isUndefined = function(e) {
            return void 0 === e
          }, w.has = function(e, t) {
            return null != e && h.call(e, t)
          }, w.noConflict = function() {
            return s._ = u, this
          }, w.identity = function(e) {
            return e
          }, w.constant = function(e) {
            return function() {
              return e
            }
          }, w.noop = function() {}, w.property = O, w.propertyOf = function(e) {
            return null == e ? function() {} : function(t) {
              return e[t]
            }
          }, w.matcher = w.matches = function(e) {
            return e = w.extendOwn({}, e),
                function(t) {
                  return w.isMatch(t, e)
                }
          }, w.times = function(e, t, n) {
            var r = Array(Math.max(0, e));
            t = _(t, n, 1);
            for (var o = 0; e > o; o++) r[o] = t(o);
            return r
          }, w.random = function(e, t) {
            return null == t && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
          }, w.now = Date.now || function() {
            return (new Date).getTime()
          };
          var M = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
              },
              F = w.invert(M),
              z = function(e) {
                var t = function(t) {
                      return e[t]
                    },
                    n = "(?:" + w.keys(e).join("|") + ")",
                    r = RegExp(n),
                    o = RegExp(n, "g");
                return function(e) {
                  return e = null == e ? "" : "" + e, r.test(e) ? e.replace(o, t) : e
                }
              };
          w.escape = z(M), w.unescape = z(F), w.result = function(e, t, n) {
            var r = null == e ? void 0 : e[t];
            return void 0 === r && (r = n), w.isFunction(r) ? r.call(e) : r
          };
          var R = 0;
          w.uniqueId = function(e) {
            var t = ++R + "";
            return e ? e + t : t
          }, w.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
          };
          var B = /(.)^/,
              P = {
                "'": "'",
                "\\": "\\",
                "\r": "r",
                "\n": "n",
                "\u2028": "u2028",
                "\u2029": "u2029"
              },
              U = /\\|'|\r|\n|\u2028|\u2029/g,
              K = function(e) {
                return "\\" + P[e]
              };
          w.template = function(e, t, n) {
            !t && n && (t = n), t = w.defaults({}, t, w.templateSettings);
            var r = RegExp([(t.escape || B).source, (t.interpolate || B).source, (t.evaluate || B).source].join("|") + "|$", "g"),
                o = 0,
                i = "__p+='";
            e.replace(r, function(t, n, r, s, u) {
              return i += e.slice(o, u).replace(U, K), o = u + t.length, n ? i += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : r ? i += "'+\n((__t=(" + r + "))==null?'':__t)+\n'" : s && (i += "';\n" + s + "\n__p+='"), t
            }), i += "';\n", t.variable || (i = "with(obj||{}){\n" + i + "}\n"), i = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";
            try {
              var s = new Function(t.variable || "obj", "_", i)
            } catch (u) {
              throw u.source = i, u
            }
            var a = function(e) {
                  return s.call(this, e, w)
                },
                c = t.variable || "obj";
            return a.source = "function(" + c + "){\n" + i + "}", a
          }, w.chain = function(e) {
            var t = w(e);
            return t._chain = !0, t
          };
          var W = function(e, t) {
            return e._chain ? w(t).chain() : t
          };
          w.mixin = function(e) {
            w.each(w.functions(e), function(t) {
              var n = w[t] = e[t];
              w.prototype[t] = function() {
                var e = [this._wrapped];
                return f.apply(e, arguments), W(this, n.apply(w, e))
              }
            })
          }, w.mixin(w), w.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
            var t = a[e];
            w.prototype[e] = function() {
              var n = this._wrapped;
              return t.apply(n, arguments), "shift" !== e && "splice" !== e || 0 !== n.length || delete n[0], W(this, n)
            }
          }), w.each(["concat", "join", "slice"], function(e) {
            var t = a[e];
            w.prototype[e] = function() {
              return W(this, t.apply(this._wrapped, arguments))
            }
          }), w.prototype.value = function() {
            return this._wrapped
          }, w.prototype.valueOf = w.prototype.toJSON = w.prototype.value, w.prototype.toString = function() {
            return "" + this._wrapped
          }, "function" == typeof define && define.amd && define("underscore", [], function() {
            return w
          })
        }).call(this)
      }, {}],
      23: [function(e, t, n) {
        ! function() {
          function e() {
            c = new MutationObserver(function(e) {
              e && e.forEach(function(e) {
                if (e.addedNodes.length) {
                  var t = Array.prototype.filter.call(e.addedNodes, function(e) {
                    return 1 === e.nodeType && p.indexOf(("" + e.nodeName).toLowerCase()) < 0
                  });
                  t.length && setTimeout(function(e) {
                    l.insertion && l.insertion(e)
                  }, 0, t)
                }
                if (e.removedNodes.length) {
                  var t = Array.prototype.filter.call(e.removedNodes, function(e) {
                    return 1 === e.nodeType
                  });
                  t.length && setTimeout(function(e) {
                    l.removal && l.removal(e)
                  }, 0, t)
                }
                if (e.attributeName) {
                  var n = e.target,
                      r = e.attributeName,
                      o = n.getAttribute(r);
                  d(r + u(n), n, r, o, e.oldValue)
                }
              })
            }), c.observe(document.body, {
              childList: !0,
              subtree: !0,
              attributes: !0,
              attributeOldValue: !0,
              attributeFilter: f
            })
          }

          function n(t) {
            r(), e(), a = t
          }

          function r() {
            c && c.disconnect()
          }

          function o(e) {
            if (null !== l.insertion) throw "there is already a callback for insertions";
            l.insertion = e
          }

          function i(e) {
            if (null !== l.removal) throw "there is already a callback for removal";
            l.removal = e
          }

          function s(e) {
            if (null !== l.attrChange) throw "there is already a callback for attrChange";
            l.attrChange = e
          }

          function u(e) {
            return e[a]
          }
          var a, c, l = {
                insertion: null,
                removal: null,
                attrChange: null
              },
              f = ["class", "style", "id"],
              p = ["script", "meta"],
              d = function() {
                var e = 1100,
                    t = {},
                    n = {};
                return function(r, o, i, s, u) {
                  n[r] || (n[r] = {
                    value: u ? u.trim() : "",
                    timestamp: Date.now()
                  }), clearTimeout(t[r]), t[r] = setTimeout(function(e, t) {
                    e.value !== t && l.attrChange && l.attrChange(o, i, t, e.timestamp), delete n[r]
                  }, e, n[r], s ? s.trim() : "")
                }
              }();
          t.exports = {
            init: n,
            destroy: r,
            catchInsertions: o,
            catchRemovals: i,
            catchAttrChanges: s
          }
        }()
      }, {}],
      24: [function(e, t, n) {
        ! function() {
          function n(e, t, n) {
            return t.copy(e.documentElement, function(e) {
              var t = e.getElementsByTagName("head")[0] || e.querySelector("head"),
                  r = e.getElementsByTagName("body")[0] || e.querySelector("body");
              if (t)
                for (var o = ["LINK", "STYLE", "TITLE", "META"], i = Array.prototype.filter.call(t.children, function(e) {
                  return o.indexOf(e.tagName) < 0
                }), s = i.length; s--;) i[s].parentNode.removeChild(i[s]);
              var u = e.querySelector("meta[http-equiv=X-Frame-Options]");
              u && u.parentNode.removeChild(u);
              for (var a = e.getElementsByTagName("iframe"), s = a.length; s--;) a[s].removeAttribute("src");
              if (t)
                for (; t.previousElementSibling;) t.parentNode.removeChild(t.previousElementSibling);
              if (r) {
                for (; r.previousElementSibling && r.previousElementSibling !== t;) r.parentNode.removeChild(r.previousElementSibling);
                for (; r.nextElementSibling;) r.parentNode.removeChild(r.nextElementSibling)
              }
              return n(e)
            }, !0)
          }

          function r(e, t, r) {
            var o = t,
                l = i.init(o.tools.makeRecursiveTraverser).absify;
            s.init(r.getTag()), r.identifyDocument();
            var f = r.getId(document.documentElement),
                p = n(document, o, l);
            u.injectEvent({
              targetId: f,
              type: "create",
              time: 1
            }, !0), e.saveContent({
              source: "insertion",
              rip: p,
              node: f,
              prev: 0,
              parent: 0
            });
            var d = o.tools.M.makeConverter(2),
                h = 0;
            s.catchInsertions(function(t) {
              for (var n, i, s, f, p, m = 0; m < t.length; m += 1) n = t[m], c.isWaiting(n) || (i = "in" + d(a++), n.parentNode && (c.wait(n), r.run(n, i)), setTimeout(function(t, n, i) {
                if (t.parentNode && r.hasId(t)) {
                  for (r.forceRun(t, n), s = o.copy(t, function(e) {
                    for (var t = e.getElementsByTagName("iframe"), n = t.length; n--;) t[n].removeAttribute("src");
                    return l(e)
                  }, !0), c.done(t), f = t.previousSibling; f && (void 0 === f || 1 !== f.nodeType || !r.hasId(f)); f = f.previousSibling);
                  p = {
                    source: "insertion",
                    rip: s,
                    node: n,
                    tagname: t.nodeName,
                    parent: r.getId(t.parentNode),
                    version: h++
                  }, f && (p.prev = r.getId(f)), e.saveContent(p), u.injectEvent({
                    targetId: n,
                    type: "create",
                    time: i
                  })
                }
              }, 700, n, i, Date.now()))
            }), s.catchRemovals(function(e) {
              for (var t, n = 0; n < e.length; n += 1) t = e[n], r.hasId(t) && !c.isWaiting(t) ? (! function() {}("element removed", t), u.injectEvent({
                targetId: r.getId(t),
                type: "remove",
                time: Date.now() + 1
              })) : ! function() {}("removed element has no tag", t)
            });
            var m = 0;
            s.catchAttrChanges(function(t, n, o, i) {
              var s;
              if (r.hasId(t) && !c.isWaiting(t)) {
                r.getId(t);
                setTimeout(function(t, r) {
                  m++, s = {
                    source: "attr",
                    rip: n + "=" + o,
                    node: t,
                    version: m
                  }, e.saveContent(s),
                      function() {}("attr changed: ", s), u.injectEvent({
                    targetId: t,
                    type: "attrChange",
                    time: r,
                    version: m
                  })
                }, 0, r.getId(t), i)
              } else r.hasId(t) ? ! function() {}("attr change won't be saved - waiting for rip", t) : ! function() {}("changed element has no tag", t)
            })
          }

          function o() {
            s.destroy()
          }
          var i = e("../lib/absURL"),
              s = e("./domObserver"),
              u = e("./eventmachine"),
              a = 0,
              c = e("./ripsemaphore");
          t.exports = {
            init: r,
            destroy: o
          }
        }()
      }, {
        "../lib/absURL": 4,
        "./domObserver": 23,
        "./eventmachine": 25,
        "./ripsemaphore": 30
      }],
      25: [function(e, t, n) {
        ! function() {
          function n(e, t, n) {
            e.forEach(function(e) {
              w.push({
                event: e,
                handler: t
              }), (n || document).addEventListener(e, t, !1)
            })
          }

          function r(e, t, n) {
            (n || document).removeEventListener(e, t)
          }

          function o(e, t, n, r) {
            var o, s, u, a, c = !1,
                l = function() {
                  u = null, c = !c, t.apply(o, Array.prototype.slice.call(s).concat(a))
                };
            return function(t) {
              r && 0 === t.clientX && 0 === t.clientY || (o = this, s = arguments, clearTimeout(u), c || (c = !c, e && e.apply(this, arguments)), u = setTimeout(l, n), a = i())
            }
          }

          function i() {
            return Date.now()
          }

          function s(e) {
            "SELECT" === e.target.nodeName && (e.type = "click", a(e))
          }

          function u(e) {
            var t = c({
              target: document.documentElement
            }, "resize");
            return t && x !== window.innerWidth ? (x = window.innerWidth, t.windowSize = new Array(x, window.innerHeight), t) : null
          }

          function a(e) {
            var t = e.target,
                n = null;
            if ("mousedown" === e.type) {
              if (3 !== e.which) return null;
              n = "click"
            }
            var r = c(e, n);
            if (r) {
              var o = v(r.nodeId, t, r.e, e.pageX, e.pageY);
              return o && (r.offset = Array.prototype.slice.call(o)), 3 === e.which ? r.mouseButton = 3 : r.mouseButton = 1, r
            }
            return null
          }

          function c(e, t) {
            var n;
            switch (e.type) {
              case "focusin":
                n = "focus";
                break;
              case "focusout":
                n = "blur";
                break;
              default:
                n = e.type
            }
            return {
              type: t ? t : n,
              nodeId: m.getId(e.target),
              timestamp: i()
            }
          }

          function l(e, t, n, r, o) {
            return function() {
              var s = o || {};
              return s.type = n, s.nodeId = t, s.timestamp = void 0 !== e ? e : i(), s.version = r, s
            }
          }

          function f(e) {
            e && e.nodeId && y.saveEvent(e)
          }

          function p(t, r) {
            if (_) {
              var i = e("./offset");
              v = function() {
                function e(e) {
                  return "SELECT" === e.nodeName ? !0 : e.offsetWidth > g.resaonableSize || e.offsetHeight > g.resaonableSize ? !0 : void 0
                }
                var t = i(),
                    n = {},
                    r = 1e3;
                return function(o, i, s, u, a) {
                  return n[o] && n[o].ok || (n[o] = {
                    ok: !0
                  }, e(i) ? n[o].o = t(i) : n[o].o = null, setTimeout(function() {
                    n[o].ok = !1
                  }, r)), n[o].o ? [u - n[o].o.left, a - n[o].o.top] : null
                }
              }(), m = t, _ = !1, r || (r = {}), r.moveTimespan || (r.moveTimespan = 50), r.actionTimespan || (r.actionTimespan = 500), r.resaonableSize || (r.resaonableSize = 200), g = r, n(["click"], S.report(a)), n(["mousedown"], S.report(a)), n(["mousedown"], S.report(s)), n(["mousemove"], o(S.start(a), S.end(a), g.moveTimespan, !0)), n(["focus", "blur", "focusin", "focusout", "change", "copy", "cut", "paste", "submit", "unload"], S.report(c)), n(["keypress"], o(S.report(c), function() {}, g.actionTimespan)), n(["resize", "orientationchange"], o(null, S.report(u), g.moveTimespan), window), h({
                type: "page",
                time: 0,
                targetId: window.location.href
              }, !0), h({
                type: "resize",
                time: 2,
                extendData: {
                  windowSize: new Array(window.innerWidth, window.innerHeight)
                }
              }, !0)
            }
          }

          function d() {
            w.forEach(function(e) {
              r(e.event, e.handler)
            }), w = []
          }

          function h(e, t) {
            e.time = t ? parseInt(e.time, 10) + b() : parseInt(e.time, 10), e.targetId = e.targetId ? e.targetId : m.getId(document.documentElement);
            var n = S.report(l(e.time, e.targetId, e.type, e.version, e.extendData));
            n({})
          }
          var m, g, v, y = e("./persist"),
              b = e("./page-start-time"),
              w = [],
              _ = !0,
              x = window.innerWidth,
              S = function() {
                var e = {};
                return {
                  start: function(t) {
                    return function() {
                      var n = t.apply(this, arguments);
                      n && (e[n.type] = n)
                    }
                  },
                  end: function(t) {
                    return function() {
                      var n = t.apply(this, arguments);
                      if (n) {
                        var r = e[n.type],
                            o = arguments[arguments.length - 1];
                        n.timestamp = o, r && n && (f(r), f(n), e[n.type] = null)
                      }
                    }
                  },
                  report: function(e) {
                    return function() {
                      var t = e.apply(this, arguments);
                      t ? f(t) : setTimeout(function(t, n) {
                        var r = e.apply(t, n);
                        r && f(r)
                      }, 10, this, arguments)
                    }
                  }
                }
              }();
          t.exports = {
            init: p,
            destroy: d,
            injectEvent: h
          }
        }()
      }, {
        "./offset": 26,
        "./page-start-time": 27,
        "./persist": 28
      }],
      26: [function(e, t, n) {
        var r = document,
            o = r.documentElement;
        t.exports = function() {
          function e(e, t) {
            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
            return e
          }

          function t(e) {
            return e && "object" == typeof e && "setInterval" in e ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
          }
          var n = {},
              i = /^t(?:able|d|h)$/i,
              s = /^-?\d+(?:px)?$/i,
              u = r.createElement("div"),
              a = r.body || r.getElementsByTagName("body")[0];
          u.style.width = u.style.paddingLeft = "1px", a.appendChild(u);
          var c = 2 === u.offsetWidth;
          if (a.removeChild(u).style.display = "none", u = null, r.defaultView && r.defaultView.getComputedStyle) var l = function(e, t) {
            var n, r, o;
            return (r = e.ownerDocument.defaultView) ? ((o = r.getComputedStyle(e, null)) && (n = o.getPropertyValue(t)), n) : void 0
          };
          else if (o.currentStyle) var l = function(e, t) {
            var n, r = e.currentStyle && e.currentStyle[t],
                o = e.runtimeStyle && e.runtimeStyle[t],
                i = e.style;
            return !s.test(r) && rnum.test(r) && (n = i.left, o && (e.runtimeStyle.left = e.currentStyle.left), i.left = "fontSize" === t ? "1em" : r || 0, r = i.pixelLeft + "px", i.left = n, o && (e.runtimeStyle.left = o)), r
          };
          var f = {
            initialize: function() {
              var t, n, o, i = r.body,
                  s = r.createElement("div"),
                  u = parseFloat(l(i, "marginTop")) || 0,
                  a = "position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;",
                  c = "<div style='" + a + "'><div></div></div><table style='" + a + "' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
              e(s.style, {
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                border: 0,
                width: "1px",
                height: "1px",
                visibility: "hidden"
              }), s.innerHTML = c, i.insertBefore(s, i.firstChild), t = s.firstChild, n = t.firstChild, o = t.nextSibling.firstChild.firstChild, this.doesNotAddBorder = 5 !== n.offsetTop, this.doesAddBorderForTableAndCells = 5 === o.offsetTop, n.style.position = "fixed", n.style.top = "20px", this.supportsFixedPosition = 20 === n.offsetTop || 15 === n.offsetTop, n.style.position = n.style.top = "", t.style.overflow = "hidden", t.style.position = "relative", this.subtractsBorderForOverflowNotVisible = -5 === n.offsetTop, this.doesNotIncludeMarginInBodyOffset = i.offsetTop !== u, i.removeChild(s), f.initialize = function() {}
            },
            bodyOffset: function(e) {
              var t = e.offsetTop,
                  n = e.offsetLeft;
              return f.doesNotIncludeMarginInBodyOffset && (t += parseFloat(l(e, "marginTop")) || 0, n += parseFloat(l(e, "marginLeft")) || 0), {
                top: ~~t,
                left: ~~n
              }
            }
          };
          return f.initialize(), "getBoundingClientRect" in o ? n.offset = function(e) {
            if (e === e.ownerDocument.body) return f.bodyOffset(e);
            try {
              var n = e.getBoundingClientRect()
            } catch (e) {}
            var r = e.ownerDocument,
                o = r.documentElement,
                i = r.body,
                s = t(r),
                u = o.clientTop || i.clientTop || 0,
                a = o.clientLeft || i.clientLeft || 0,
                l = s.pageYOffset || c && o.scrollTop || i.scrollTop,
                p = s.pageXOffset || c && o.scrollLeft || i.scrollLeft,
                d = n.top + l - u,
                h = n.left + p - a;
            return {
              top: ~~d,
              left: ~~h
            }
          } : n.offset = function(e) {
            if (!e || !e.ownerDocument) return null;
            if (e === e.ownerDocument.body) return f.bodyOffset(e);
            for (var t, n = e.offsetParent, r = e, o = e.ownerDocument, s = o.documentElement, u = o.body, a = o.defaultView, c = a ? a.getComputedStyle(e, null) : e.currentStyle, l = e.offsetTop, p = e.offsetLeft;
                 (e = e.parentNode) && e !== u && e !== s && (!f.supportsFixedPosition || "fixed" !== c.position);) t = a ? a.getComputedStyle(e, null) : e.currentStyle, l -= e.scrollTop, p -= e.scrollLeft, e === n && (l += e.offsetTop, p += e.offsetLeft, !f.doesNotAddBorder || f.doesAddBorderForTableAndCells && i.test(e.nodeName) || (l += parseFloat(t.borderTopWidth) || 0, p += parseFloat(t.borderLeftWidth) || 0), r = n, n = e.offsetParent), f.subtractsBorderForOverflowNotVisible && "visible" !== t.overflow && (l += parseFloat(t.borderTopWidth) || 0, p += parseFloat(t.borderLeftWidth) || 0), c = t;
            return ("relative" === c.position || "static" === c.position) && (l += u.offsetTop, p += u.offsetLeft), f.supportsFixedPosition && "fixed" === c.position && (l += Math.max(s.scrollTop, u.scrollTop), p += Math.max(s.scrollLeft, u.scrollLeft)), {
              top: ~~l,
              left: ~~p
            }
          }, n.offset
        }
      }, {}],
      27: [function(e, t, n) {
        t.exports = function() {
          var e;
          return function(t) {
            return "undefined" == typeof t || e || (e = t), e
          }
        }()
      }, {}],
      28: [function(e, t, n) {
        ! function() {
          function n(e) {
            a = m.start(e), g.on("connect", function() {
              g.send({
                type: "hi",
                data: a
              })
            }), g.on("disconnect", function() {
              sendingAllowed = !1
            }), g.on("reconnect", function() {
              g.send({
                type: "reconnect",
                data: a
              })
            }), g.on("error", function() {}), g.on("message_die", s), window.addEventListener("beforeunload", function() {
              g && g.disconnect()
            }), g.connect(h.get("ioAddress") + "/" + h.get("ioResource"))
          }

          function r(e) {
            e.page = a.pid, g && g.send({
              type: "content",
              data: i(d.content.toShort(e))
            })

            console.log(i(d.content.toShort(e)))
          }

          function o(e) {
            e.page = a.pid, e.timestamp -= p(), g && (g.send({
              type: "event",
              data: i(d.event.toShort(e))
            }), -1 !== ["focus", "blur", "change", "mousemove", "mousedragging", "click", "keypress", "resize"].indexOf(e.type) && m.extend())

            console.log(i(d.event.toShort(e)))
          }

          function i(e) {
            return l(e, function(e) {
              e.toJSON = void 0, e instanceof String || "string" == typeof e || i(e)
            }), e

          }

          function s() {
            m.destroy(), g.disconnect(), g = null, c && c()
          }

          function u(e) {
            c = e
          }
          var a, c, l = e("foreach"),
              f = e("simple-socket"),
              p = e("./recording-start-time"),
              d = e("../lib/translatedata"),
              h = e("./settings"),
              m = e("./session"),
              g = new f;
          t.exports = {
            init: n,
            saveContent: r,
            saveEvent: o,
            handleDeath: u
          }
        }()
      }, {
        "../lib/translatedata": 8,
        "./recording-start-time": 29,
        "./session": 31,
        "./settings": 32,
        foreach: 16,
        "simple-socket": 17
      }],
      29: [function(e, t, n) {
        t.exports = function() {
          var e;
          return function(t) {
            return "undefined" == typeof t || e || (e = t), e
          }
        }()
      }, {}],
      30: [function(e, t, n) {
        function r(e) {
          e[s] = !0
        }

        function o(e) {
          delete e[s]
        }

        function i(e) {
          return e && e !== document.documentElement ? e[s] === !0 ? !0 : i(e.parentNode) : !1
        }
        var s = ".:rips";
        t.exports = {
          wait: r,
          done: o,
          isWaiting: i
        }
      }, {}],
      31: [function(e, t, n) {
        t.exports = function() {
          function t() {
            var e = Date.now(),
                t = e;
            a = p.get("experimentId"), c = f.get("rid"), l = "0";
            var n = parseInt(f.get("end"), 10);
            return !c || isNaN(n) || e > n ? (c = p.get("recordingId") || r(e), f.set("eid", a), f.set("rid", c), f.set("pid", l), f.set("inittime", t), i(Date.now())) : (t = parseInt(f.get("inittime"), 10), l = ~~f.get("pid") + 1 + "", f.set("pid", l)), d(t), h(e), {
              pid: l,
              rid: c,
              eid: a
            }
          }

          function n() {
            u() && (f.set("eid", ""), f.set("rid", ""), f.set("pid", ""), f.set("end", ""), f.set("inittime", ""))
          }

          function r(e) {
            return Math.round(1e17 * Math.random()).toString(36).substr(0, 5) + e.toString(36).substr(1, 8) + Math.round(1e17 * Math.random()).toString(36).substr(6, 11)
          }

          function o(e, t) {
            var n, r;
            return function() {
              r = Date.now(), n || (n = setTimeout(function() {
                n = null, e(r)
              }, t))
            }
          }

          function i(e) {
            u() && f.set("end", e + m)
          }

          function s() {
            return u() && parseInt(f.get("end"), 10) > Date.now()
          }

          function u() {
            return a === f.get("eid") && c === f.get("rid")
          }
          var a, c, l, f = e("./store"),
              p = e("./settings"),
              d = e("./recording-start-time"),
              h = e("./page-start-time"),
              m = 3e5;
          return {
            start: t,
            destroy: n,
            extend: o(i, 1e4),
            isValid: s
          }
        }()
      }, {
        "./page-start-time": 27,
        "./recording-start-time": 29,
        "./settings": 32,
        "./store": 33
      }],
      32: [function(e, t, n) {
        t.exports = function() {
          function e(e) {
            return t[e]
          }
          var t = {};
          if (window.hasOwnProperty(globalKey)) {
            var n = window[globalKey];
            for (var r in n)("recordingId" !== r || n.experimentId === experimentId) && ("experimentId" === r ? t[r] = experimentId : t[r] = n[r])
          }
          return {
            get: e
          }
        }()
      }, {}],
      33: [function(e, t, n) {
        t.exports = function() {
          function t(e) {
            var t;
            if (n.enabled) {
              var r = window.location.hostname.split(".").reverse().map(function(e, t, n) {
                return "." + n.slice(0, t + 1).reverse().join(".")
              }).slice(1);
              n.defaults = {
                path: "/"
              }, t = {
                get: function(t) {
                  return n.get(e + t)
                },
                set: function(t, o) {
                  return o = -1 === [null, void 0].indexOf(o) ? o + "" : "", r.some(function(r) {
                    return n.set(e + t, o, {
                      domain: r
                    }), n.get(e + t) === o
                  })
                }
              }
            } else "undefined" != typeof window.localStorage && (t = {
              get: function(t) {
                return localStorage.getItem(e + t)
              },
              set: function(t, n) {
                return localStorage.setItem(e + t, n)
              }
            });
            return t
          }
          var n = e("cookies-js"),
              r = (e("../lib/absURL"), e("./settings"));
          return t(r.get("sessionKey"))
        }()
      }, {
        "../lib/absURL": 4,
        "./settings": 32,
        "cookies-js": 15
      }],
      34: [function(e, t, n) {
        t.exports = function() {
          return e("simple-socket").supported && window.MutationObserver
        }()
      }, {
        "simple-socket": 17
      }]
    }, {}, [1]);
  })();
})();*/
