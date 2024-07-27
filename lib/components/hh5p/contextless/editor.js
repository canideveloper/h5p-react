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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Editor = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var server_1 = require("react-dom/server");
var html_escaper_1 = require("html-escaper");
var loader_1 = __importDefault(require("./../loader"));
var prepareMarkupForPassing = function (markup) {
    return (0, html_escaper_1.unescape)(markup);
};
var getLabel = function (id, lang) {
    var labels = {
        pl: {
            loading: "wgrywam dane",
            "submit data": "prześlij dane",
        },
        en: {
            loading: "loading",
            "submit data": "submit data",
        },
    };
    var langId = lang;
    if (labels[langId] && labels[langId][id]) {
        return labels[langId][id];
    }
    return id;
};
// TODO: make some kind of messaging system
// e.g. make interface for all of possible messages and sendMessage fn
// which will implement those interfaces
// now it's really loose, and you have to know the lib to use it
var Editor = function (_a) {
    var id = _a.id, onSubmit = _a.onSubmit, state = _a.state, _b = _a.allowSameOrigin, allowSameOrigin = _b === void 0 ? false : _b, onError = _a.onError, _c = _a.loading, loading = _c === void 0 ? false : _c, _d = _a.lang, lang = _d === void 0 ? "pl" : _d, _e = _a.iframeId, iframeId = _e === void 0 ? "h5p-editor" : _e;
    var _f = (0, react_1.useState)(100), height = _f[0], setHeight = _f[1];
    var iFrameRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var onMessage = function (event) {
            if (!(event.origin === window.location.origin) && !allowSameOrigin) {
                return;
            }
            if (event.data.iFrameHeight) {
                setHeight(event.data.iFrameHeight);
            }
            if (event.data.h5pEditorStatus) {
                var status_1 = event.data;
                if (status_1.h5pEditorStatus === "success") {
                    onSubmit &&
                        onSubmit(__assign(__assign({}, status_1.data), { nonce: state.nonce }), id);
                }
                status_1.h5pEditorStatus === "error" && onError && onError(status_1.error);
            }
        };
        window && window.addEventListener("message", onMessage);
        return function () {
            window && window.removeEventListener("message", onMessage);
        };
    }, [iFrameRef, state, onSubmit, id]);
    var src = (0, react_1.useMemo)(function () {
        var settings = state;
        if (!settings)
            return "";
        var content = state.contents
            ? state === null || state === void 0 ? void 0 : state.contents[Object.keys(state.contents)[0]]
            : null;
        var params = content ? content.jsonContent : "";
        try {
            params && JSON.parse(params);
        }
        catch (er) {
            onError && onError(er && er.toString());
            return null;
        }
        var library = content ? content.library : "";
        var scriptInline = "\n      (function ($) {\n          const postMessage = (data) => parent.postMessage(data, \"".concat(window.location.origin, "\");\n          const resizeObserver = new ResizeObserver((entries) =>\n              postMessage({ iFrameHeight: entries[0].contentRect.height })\n          );\n          const params = ").concat("`").concat(params).concat("`", ".split(\"\\n\").join('');\n          let token = \"").concat(state.token, "\";\n          \n          const onMessage = (e) => {\n            if(e.data?.type === \"TOKEN_CHANGED\") {\n              token = e.data?.token ?? null;\n            }\n          };\n          \n          window.addEventListener(\"message\", onMessage);\n              \n          ns.init = function () {\n              ns.$ = H5P.jQuery;\n              ns.basePath = H5PIntegration.editor.libraryUrl;\n              ns.fileIcon = H5PIntegration.editor.fileIcon;\n              ns.ajaxPath = H5PIntegration.editor.ajaxPath;\n              ns.filesPath = H5PIntegration.editor.filesPath;\n              ns.apiVersion = H5PIntegration.editor.apiVersion;\n              ns.copyrightSemantics = H5PIntegration.editor.copyrightSemantics;\n              ns.assets = H5PIntegration.editor.assets;\n              ns.baseUrl = H5PIntegration.baseUrl;\n              ns.metadataSemantics = H5PIntegration.editor.metadataSemantics;\n              if (H5PIntegration.editor.nodeVersionId !== undefined) {\n                  ns.contentId = H5PIntegration.editor.nodeVersionId;\n              }\n              const h5peditor = new ns.Editor('").concat(library, "', params, document.getElementById(\"h5p-editor\"));\n              H5P.externalDispatcher.on(\"xAPI\", (event) => postMessage(event));\n              H5P.externalDispatcher.on(\"resize\", (event) => postMessage(event));\n              resizeObserver.observe(document.querySelector(\".h5p-editor-wrapper\"));\n              $(\"#h5p-editor-submit\").click(() => {\n                  h5peditor.getContent(data => postMessage({h5pEditorStatus:\"success\", data}), error =>  postMessage({h5pEditorStatus:\"error\", error}))\n              } );\n          };\n          ns.getAjaxUrl = function (action, parameters) {\n              var url = H5PIntegration.editor.ajaxPath + action;\n              url += action === \"files\" ? \"/").concat(settings.nonce, "\" : \"\";\n              url += token ? \"?_token=\" + token : \"\";\n              url += \"").concat(lang ? "&lang=" + lang : "", "\";\n              if (parameters !== undefined) {\n                  var separator = url.indexOf(\"?\") === -1 ? \"?\" : \"&\";\n                  for (var property in parameters) {\n                      if (parameters.hasOwnProperty(property)) {\n                          url += separator + property + \"=\" + parameters[property];\n                          separator = \"&\";\n                      }\n                  }\n              }\n              return url;\n          };\n          $(document).ready(ns.init);\n      })(H5P.jQuery);\n      ");
        var markup = (0, server_1.renderToStaticMarkup)((0, jsx_runtime_1.jsxs)("html", { children: [(0, jsx_runtime_1.jsxs)("head", { children: [(0, jsx_runtime_1.jsx)("style", { children: " body, html {margin:0; padding:0;}" }), (0, jsx_runtime_1.jsx)("script", { children: "const H5PIntegration = window.H5PIntegration = ".concat(JSON.stringify(settings), "; ") }), settings.core.scripts.map(function (script) { return ((0, jsx_runtime_1.jsx)("script", { src: script }, script)); }), settings.core.styles.map(function (style) { return ((0, jsx_runtime_1.jsx)("link", { type: "text/css", rel: "stylesheet", href: style }, style)); })] }), (0, jsx_runtime_1.jsx)("body", { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "h5p-editor-wrapper" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ id: "h5p-editor", className: "height-observer" }, { children: getLabel("loading", lang) })), (0, jsx_runtime_1.jsx)("p", {}), (0, jsx_runtime_1.jsx)("button", __assign({ className: "h5p-core-button", id: "h5p-editor-submit" }, { children: getLabel("submit data", lang) })), (0, jsx_runtime_1.jsx)("script", { dangerouslySetInnerHTML: { __html: scriptInline } })] })) })] }));
        var pMarkup = prepareMarkupForPassing(markup);
        return window.URL.createObjectURL(new Blob([pMarkup], {
            type: "text/html",
        }));
    }, [state]);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "h5p-editor", style: { height: height, position: "relative" } }, { children: [loading && (0, jsx_runtime_1.jsx)(loader_1.default, {}), src && ((0, jsx_runtime_1.jsx)("iframe", { ref: iFrameRef, title: "editor", src: src, id: iframeId, 
                // TODO test this
                //srcDoc={src}
                style: {
                    width: "100%",
                    height: "100%",
                    margin: 0,
                    padding: 0,
                    border: "none",
                } }))] })));
};
exports.Editor = Editor;
exports.default = exports.Editor;
