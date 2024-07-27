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
// import "./index.css";
var loader_1 = __importDefault(require("./../loader"));
var context_1 = require("../context");
var Player = function (_a) {
    var h5pObject = _a.h5pObject, id = _a.id, onXAPI = _a.onXAPI, _b = _a.styles, styles = _b === void 0 ? [] : _b;
    var _c = (0, react_1.useState)(100), height = _c[0], setHeight = _c[1];
    var iFrameRef = (0, react_1.useRef)(null);
    var _d = (0, react_1.useState)(true), loading = _d[0], setLoading = _d[1];
    var _e = (0, react_1.useContext)(context_1.EditorContext), state = _e.state, seth5pObject = _e.seth5pObject;
    (0, react_1.useEffect)(function () {
        if (h5pObject && seth5pObject) {
            seth5pObject(h5pObject);
            setLoading(false);
        }
    }, [h5pObject]);
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
    }, [onXAPI, h5pObject, id]);
    (0, react_1.useEffect)(function () {
        window && window.addEventListener("message", onMessage);
        return function () {
            window && window.removeEventListener("message", onMessage);
        };
    }, [iFrameRef, state, onXAPI, id]);
    var src = (0, react_1.useMemo)(function () {
        var _a, _b, _c;
        var settings = state.value === "loaded" && state.settings;
        if (!settings)
            return "";
        var content = state.value === "loaded" && ((_a = state.settings) === null || _a === void 0 ? void 0 : _a.contents)
            ? (_b = state.settings) === null || _b === void 0 ? void 0 : _b.contents[Object.keys((_c = state.settings) === null || _c === void 0 ? void 0 : _c.contents)[0]]
            : null;
        settings.core.styles = settings.core.styles.concat(styles);
        var embedType = content === null || content === void 0 ? void 0 : content.content.library.embedTypes;
        var markup = (0, server_1.renderToStaticMarkup)((0, jsx_runtime_1.jsxs)("html", { children: [(0, jsx_runtime_1.jsxs)("head", { children: [(0, jsx_runtime_1.jsx)("style", { children: "\n          body, html {margin:0; padding:0;}\n          iframe { border:none; margin:0; padding:0; }\n          " }), (0, jsx_runtime_1.jsx)("script", { children: "const H5PIntegration = window.H5PIntegration = ".concat(JSON.stringify(settings), "; ") }), __spreadArray(__spreadArray([], settings.core.scripts, true), settings.loadedJs, true).map(function (script) { return ((0, jsx_runtime_1.jsx)("script", { src: script }, script)); }), __spreadArray(__spreadArray([], settings.core.styles, true), settings.loadedCss, true).map(function (style) { return ((0, jsx_runtime_1.jsx)("link", { type: "text/css", rel: "stylesheet", href: style }, style)); }), (0, jsx_runtime_1.jsx)("script", { children: "H5P.getCrossOrigin = function (source) { return \"anonymous\" }" })] }), (0, jsx_runtime_1.jsx)("body", { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "h5p-player-wrapper h5p-resize-observer" }, { children: [(embedType && embedType === "div") ||
                                (embedType === "" && ((0, jsx_runtime_1.jsx)("div", { className: "h5p-content", "data-content-id": id }))), embedType && embedType === "iframe" && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "h5p-iframe-wrapper" }, { children: (0, jsx_runtime_1.jsx)("iframe", { id: "h5p-iframe-".concat(id), className: "h5p-iframe", "data-content-id": id, src: "about:blank", frameBorder: "0", scrolling: "no", title: "player" }) }))), (0, jsx_runtime_1.jsx)("script", { children: "\n            (function ($) {\n                const replacerFunc = () => {\n                    const visited = new WeakSet();\n                    return (key, value) => {\n                      if (value.nodeType) return;\n                      if (typeof value === \"object\" && value !== null) {\n                        if (visited.has(value)) {\n                          return;\n                        }\n                        visited.add(value);\n                      }\n                      return value;\n                    };\n                  };\n                const postMessage = (data) => parent.postMessage(data, \"".concat(window.location.origin, "\");\n                const resizeObserver = new ResizeObserver((entries) =>\n                    postMessage({ iFrameHeight: entries[0].contentRect.height })\n                );\n                resizeObserver.observe(document.querySelector(\".h5p-resize-observer\"));\n                H5P.externalDispatcher.on('xAPI', function (event) {\n                    try {\n                      postMessage(event.data, replacerFunc())\n                    } catch(err) {\n                      console.error(event, err)\n                    }\n                });\n            })(H5P.jQuery);\n            ") })] })) })] }));
        return window.URL.createObjectURL(new Blob([(0, html_escaper_1.unescape)(markup).split("&#x27;").join("'")], {
            type: "text/html",
        }));
    }, [state, id, h5pObject]);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "h5p-player", style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            flexDirection: "row",
        } }, { children: [loading && (0, jsx_runtime_1.jsx)(loader_1.default, {}), !loading && ((0, jsx_runtime_1.jsx)("iframe", { ref: iFrameRef, title: "player", src: src, style: {
                    display: "block",
                    border: "none",
                    flexGrow: 1,
                    flexShrink: 1,
                    height: height,
                } }))] })));
};
exports.Player = Player;
exports.default = exports.Player;
