"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Editor = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var server_1 = require("react-dom/server");
var html_escaper_1 = require("html-escaper");
var loader_1 = __importDefault(require("./../loader"));
var context_1 = require("./../context");
// import './index.css';
var prepareMarkupForPassing = function (markup) {
  return (0, html_escaper_1.unescape)(markup);
};
var Editor = function (_a) {
  var id = _a.id,
    onSubmit = _a.onSubmit;
  var _b = (0, react_1.useState)(100),
    height = _b[0],
    setHeight = _b[1];
  var iFrameRef = (0, react_1.useRef)(null);
  var _c = (0, react_1.useState)({
      state: "initial",
    }),
    editorState = _c[0],
    setEditorState = _c[1];
  var _d = (0, react_1.useContext)(context_1.EditorContext),
    state = _d.state,
    getEditorConfig = _d.getEditorConfig,
    submitContent = _d.submitContent;
  (0, react_1.useEffect)(
    function () {
      getEditorConfig && getEditorConfig(id);
    },
    [id, getEditorConfig]
  );
  (0, react_1.useEffect)(
    function () {
      var onMessage = function (event) {
        if (!(event.origin === window.location.origin)) {
          return;
        }
        if (event.data.iFrameHeight) {
          setHeight(event.data.iFrameHeight);
        }
        if (event.data.h5pEditorStatus) {
          var status_1 = event.data;
          if (
            status_1.h5pEditorStatus === "success" &&
            state.value === "loaded"
          ) {
            setEditorState({ state: "loading" });
            submitContent &&
              submitContent(
                __assign(__assign({}, status_1.data), {
                  nonce: state.settings.nonce,
                }),
                id
              )
                .then(function (data) {
                  onSubmit && data && onSubmit(data);
                  setEditorState({ state: "loaded" });
                })
                .catch(function (err) {
                  setEditorState({ state: "error", error: err.toString() });
                });
          }
          status_1.h5pEditorStatus === "error" && console.log(status_1.error);
        }
      };
      window && window.addEventListener("message", onMessage);
      return function () {
        window && window.removeEventListener("message", onMessage);
      };
    },
    [iFrameRef, submitContent, state, onSubmit, id]
  );
  var src = (0, react_1.useMemo)(
    function () {
      var _a, _b, _c;
      var settings = state.value === "loaded" && state.settings;
      if (!settings) return "";
      var content =
        state.value === "loaded" &&
        ((_a = state.settings) === null || _a === void 0 ? void 0 : _a.contents)
          ? (_b = state.settings) === null || _b === void 0
            ? void 0
            : _b.contents[
                Object.keys(
                  (_c = state.settings) === null || _c === void 0
                    ? void 0
                    : _c.contents
                )[0]
              ]
          : null;
      var params = content ? content.jsonContent : "";
      try {
        params && JSON.parse(params);
      } catch (er) {
        setEditorState({ state: "error", error: er && er.toString() });
        return null;
      }
      var library = content ? content.library : "";
      var scriptInline =
        '\n    (function ($) {\n        const postMessage = (data) => parent.postMessage(data, "'
          .concat(
            window.location.origin,
            '");\n        const resizeObserver = new ResizeObserver((entries) =>\n            postMessage({ iFrameHeight: entries[0].contentRect.height })\n        );\n        const params = '
          )
          .concat("`")
          .concat(params)
          .concat(
            "`",
            ".split(\"\\n\").join('');\n            \n        ns.init = function () {\n            ns.$ = H5P.jQuery;\n            ns.basePath = H5PIntegration.editor.libraryUrl;\n            ns.fileIcon = H5PIntegration.editor.fileIcon;\n            ns.ajaxPath = H5PIntegration.editor.ajaxPath;\n            ns.filesPath = H5PIntegration.editor.filesPath;\n            ns.apiVersion = H5PIntegration.editor.apiVersion;\n            ns.copyrightSemantics = H5PIntegration.editor.copyrightSemantics;\n            ns.assets = H5PIntegration.editor.assets;\n            ns.baseUrl = H5PIntegration.baseUrl;\n            ns.metadataSemantics = H5PIntegration.editor.metadataSemantics;\n            if (H5PIntegration.editor.nodeVersionId !== undefined) {\n                ns.contentId = H5PIntegration.editor.nodeVersionId;\n            }\n            const h5peditor = new ns.Editor('"
          )
          .concat(
            library,
            '\', params, document.getElementById("h5p-editor"));\n            H5P.externalDispatcher.on("xAPI", (event) => postMessage(event));\n            H5P.externalDispatcher.on("resize", (event) => postMessage(event));\n            resizeObserver.observe(document.querySelector(".h5p-editor-wrapper"));\n            $("#h5p-editor-submit").click(() => {\n                h5peditor.getContent(data => postMessage({h5pEditorStatus:"success", data}), error =>  postMessage({h5pEditorStatus:"error", error}))\n            } );\n        };\n        ns.getAjaxUrl = function (action, parameters) {\n            var url = H5PIntegration.editor.ajaxPath + action;\n            url += action === "files" ? "/'
          )
          .concat(settings.nonce, '" : "";\n            url += "')
          .concat(
            settings.token ? "?_token=" + settings.token : "",
            '";\n            if (parameters !== undefined) {\n                var separator = url.indexOf("?") === -1 ? "?" : "&";\n                for (var property in parameters) {\n                    if (parameters.hasOwnProperty(property)) {\n                        url += separator + property + "=" + parameters[property];\n                        separator = "&";\n                    }\n                }\n            }\n            return url;\n        };\n        $(document).ready(ns.init);\n    })(H5P.jQuery);\n    '
          );
      var markup = (0, server_1.renderToStaticMarkup)(
        (0, jsx_runtime_1.jsxs)("html", {
          children: [
            (0, jsx_runtime_1.jsxs)("head", {
              children: [
                (0, jsx_runtime_1.jsx)("style", {
                  children: " body, html {margin:0; padding:0;}",
                }),
                (0, jsx_runtime_1.jsx)("script", {
                  dangerouslySetInnerHTML: {
                    __html:
                      "const H5PIntegration = window.H5PIntegration = ".concat(
                        JSON.stringify(settings),
                        "; "
                      ),
                  },
                }),
                settings.core.scripts.map(function (script) {
                  return (0,
                  jsx_runtime_1.jsx)("script", { src: script }, script);
                }),
                settings.core.styles.map(function (style) {
                  return (0,
                  jsx_runtime_1.jsx)("link", { type: "text/css", rel: "stylesheet", href: style }, style);
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)("body", {
              children: (0, jsx_runtime_1.jsxs)(
                "div",
                __assign(
                  { className: "h5p-editor-wrapper" },
                  {
                    children: [
                      (0, jsx_runtime_1.jsx)(
                        "div",
                        __assign(
                          { id: "h5p-editor", className: "height-observer" },
                          { children: "loading" }
                        )
                      ),
                      (0, jsx_runtime_1.jsx)("p", {}),
                      (0, jsx_runtime_1.jsx)(
                        "button",
                        __assign(
                          {
                            className: "h5p-core-button",
                            id: "h5p-editor-submit",
                          },
                          { children: "submit data" }
                        )
                      ),
                      (0, jsx_runtime_1.jsx)("script", {
                        dangerouslySetInnerHTML: { __html: scriptInline },
                      }),
                    ],
                  }
                )
              ),
            }),
          ],
        })
      );
      var pMarkup = prepareMarkupForPassing(markup);
      return window.URL.createObjectURL(
        new Blob([pMarkup], {
          type: "text/html",
        })
      );
    },
    [state]
  );
  return (0, jsx_runtime_1.jsxs)(
    "div",
    __assign(
      {
        className: "h5p-editor",
        style: { height: height, position: "relative" },
      },
      {
        children: [
          editorState.state === "loading" &&
            (0, jsx_runtime_1.jsx)(loader_1.default, {}),
          editorState.state === "error" &&
            (0, jsx_runtime_1.jsxs)("p", {
              children: [
                (0, jsx_runtime_1.jsx)("pre", { children: "Error:" }),
                " ",
                editorState.error,
              ],
            }),
          src &&
            (0, jsx_runtime_1.jsx)("iframe", {
              ref: iFrameRef,
              title: "editor",
              src: src,
              style: {
                width: "100%",
                height: "100%",
                margin: 0,
                padding: 0,
                border: "none",
              },
            }),
        ],
      }
    )
  );
};
exports.Editor = Editor;
exports.default = exports.Editor;
