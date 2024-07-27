"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var server_1 = require("react-dom/server");
var html_escaper_1 = require("html-escaper");
var lodash_throttle_1 = __importDefault(require("lodash.throttle"));
var srcIsAbsolute = function (src) { return src.includes("://"); };
function toBinary(r) {
    var e = Uint16Array.from({ length: r.length }, function (e, n) { return r.charCodeAt(n); }), n = new Uint8Array(e.buffer), o = "";
    return (n.forEach(function (r) {
        o += String.fromCharCode(r);
    }),
        o);
}
/*
function fromBinary(r: string) {
  let e = Uint8Array.from({ length: r.length }, (e, n) => r.charCodeAt(n)),
    n = new Uint16Array(e.buffer),
    o = "";
  return (
    n.forEach((r) => {
      o += String.fromCharCode(r);
    }),
    o
  );
}
*/
/*
const requiredScripts = [
  "js/jquery.js",
  "js/h5p.js",
  "js/h5p-event-dispatcher.js",
  "js/h5p-x-api-event.js",
  "js/h5p-x-api.js",
  "js/h5p-content-type.js",
  "js/h5p-confirmation-dialog.js",
  "js/h5p-action-bar.js",
  "js/request-queue.js",
];
*/
var Player = function (_a) {
    var onXAPI = _a.onXAPI, state = _a.state, _b = _a.styles, styles = _b === void 0 ? [] : _b, _c = _a.lang, lang = _c === void 0 ? "pl" : _c;
    var _d = (0, react_1.useState)(100), height = _d[0], setHeight = _d[1];
    var iFrameRef = (0, react_1.useRef)(null);
    var contentId = (0, react_1.useMemo)(function () {
        if (state === null || state === void 0 ? void 0 : state.contents) {
            var n = Number(Object.keys(state === null || state === void 0 ? void 0 : state.contents)[0].split("-")[1]);
            return isNaN(n) ? 0 : n;
        }
        return 0;
    }, [state]);
    var changeHeight = (0, react_1.useCallback)((0, lodash_throttle_1.default)(function (iFrameHeight) {
        setHeight(iFrameHeight);
    }, 200, { leading: false }), []);
    var onMessage = (0, react_1.useCallback)(function (event) {
        if (event.data.iFrameHeight) {
            changeHeight(event.data.iFrameHeight);
        }
        if (event.data.statement) {
            onXAPI && onXAPI(event.data);
        }
    }, [onXAPI, state, iFrameRef]);
    (0, react_1.useEffect)(function () {
        window && window.addEventListener("message", onMessage);
        return function () {
            window && window.removeEventListener("message", onMessage);
        };
    }, [iFrameRef, state, onXAPI]);
    var src = (0, react_1.useMemo)(function () {
        var settings = state;
        if (!settings)
            return "";
        settings.core.styles = settings.core.styles.concat(styles);
        /*
        if (
          !settings.core.scripts.some((src) => src.includes(requiredScripts[0]))
        ) {
        }
        */
        var content = (state === null || state === void 0 ? void 0 : state.contents)
            ? state === null || state === void 0 ? void 0 : state.contents[Object.keys(state === null || state === void 0 ? void 0 : state.contents)[0]]
            : null;
        if (content) {
        }
        var embedType = settings.loadedJs && settings.loadedJs.length > 0 ? "div" : "iframe";
        settings.core.scripts = settings.core.scripts.map(function (src) {
            if (srcIsAbsolute(src)) {
                return src;
            }
            if (srcIsAbsolute(settings.baseUrl)) {
                return "".concat(settings.baseUrl, "/").concat(src, ";");
            }
            return src;
        });
        var srcPrefix = srcIsAbsolute(settings.baseUrl)
            ? settings.baseUrl + "/"
            : "";
        var markup = (0, server_1.renderToStaticMarkup)((0, jsx_runtime_1.jsxs)("html", { children: [(0, jsx_runtime_1.jsxs)("head", { children: [(0, jsx_runtime_1.jsx)("style", { children: "\n            body, html {margin:0; padding:0;}\n            iframe { border:none; margin:0; padding:0; }\n            " }), (0, jsx_runtime_1.jsx)("script", { children: "\n            window._aaa = '".concat(btoa(toBinary(JSON.stringify(settings, null, 2))), "';          \n            function fromBinary(r){let e=Uint8Array.from({length:r.length},(e,n)=>r.charCodeAt(n)),n=new Uint16Array(e.buffer),o=\"\";return n.forEach(r=>{o+=String.fromCharCode(r)}),o};\n            const H5PIntegration = window.H5PIntegration = JSON.parse(fromBinary(atob('").concat(btoa(toBinary(JSON.stringify(settings, null, 2))), "')))\n            ") }), __spreadArray(__spreadArray(__spreadArray([], (settings.core.scripts ? settings.core.scripts : []), true), (settings.loadedJs ? settings.loadedJs : []), true), ((content === null || content === void 0 ? void 0 : content.scripts) ? content === null || content === void 0 ? void 0 : content.scripts : []), true).map(function (script) { return ((0, jsx_runtime_1.jsx)("script", { src: srcIsAbsolute(script) ? script : srcPrefix + script }, script)); }), __spreadArray(__spreadArray(__spreadArray([], (settings.core.styles ? settings.core.styles : []), true), (settings.loadedCss ? settings.loadedCss : []), true), ((content === null || content === void 0 ? void 0 : content.styles) ? content === null || content === void 0 ? void 0 : content.styles : []), true).map(function (style) { return ((0, jsx_runtime_1.jsx)("link", { type: "text/css", rel: "stylesheet", href: srcIsAbsolute(style) ? style : srcPrefix + style }, style)); }), (0, jsx_runtime_1.jsx)("script", { children: "H5P.getCrossOrigin = function (source) { return \"anonymous\" }" })] }), (0, jsx_runtime_1.jsx)("body", { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "h5p-player-wrapper h5p-resize-observer" }, { children: [embedType && embedType === "div" && ((0, jsx_runtime_1.jsx)("div", { className: "h5p-content", "data-content-id": contentId })), embedType && embedType === "iframe" && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "h5p-iframe-wrapper" }, { children: (0, jsx_runtime_1.jsx)("iframe", { id: "h5p-iframe-".concat(contentId), className: "h5p-iframe", "data-content-id": contentId, src: "about:blank", frameBorder: "0", scrolling: "no", title: "player" }) }))), (0, jsx_runtime_1.jsx)("script", { children: "\n              (function ($) {\n                  const replacerFunc = () => {\n                      const visited = new WeakSet();\n                      return (key, value) => {\n                        if (value.nodeType) return;\n                        if (typeof value === \"object\" && value !== null) {\n                          if (visited.has(value)) {\n                            return;\n                          }\n                          visited.add(value);\n                        }\n                        return value;\n                      };\n                    };\n                  const postMessage = (data) => parent.postMessage(data, \"".concat(window.location.origin, "\");\n                  const resizeObserver = new ResizeObserver((entries) =>\n                      postMessage({ iFrameHeight: entries[0].contentRect.height })\n                  );\n                  resizeObserver.observe(document.querySelector(\".h5p-resize-observer\"));\n                  H5P.externalDispatcher.on('xAPI', function (event) {\n                      try {\n                        postMessage(event.data, replacerFunc())\n                      } catch(err) {\n                        console.error(event, err)\n                      }\n                  });\n              })(H5P.jQuery);\n              ") })] })) })] }));
        return window.URL.createObjectURL(new Blob([(0, html_escaper_1.unescape)(markup).split("&#x27;").join("'")], {
            type: "text/html",
        }));
    }, [state]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "h5p-player", style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            flexDirection: "row",
        } }, { children: (0, jsx_runtime_1.jsx)("iframe", { ref: iFrameRef, title: "player", src: src, 
            // TODO test this
            // srcDoc={src}
            style: {
                display: "block",
                border: "none",
                flexGrow: 1,
                flexShrink: 1,
                height: height,
            } }) })));
};
exports.Player = Player;
exports.default = exports.Player;
