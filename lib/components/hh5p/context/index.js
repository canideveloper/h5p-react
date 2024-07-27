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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorContextProvider = exports.EditorContext = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var defaultConfig = {
    url: "http://localhost:1000/api/hh5p/",
    state: { value: "initial" },
};
exports.EditorContext = react_1.default.createContext(defaultConfig);
/**
 *
 *
 */
var EditorContextProvider = function (_a) {
    var children = _a.children, url = _a.url, _b = _a.defaultLang, defaultLang = _b === void 0 ? "en" : _b;
    var _c = (0, react_1.useState)({ value: "initial" }), state = _c[0], setState = _c[1];
    var _d = (0, react_1.useState)(defaultLang), lang = _d[0], setLang = _d[1];
    var _e = (0, react_1.useState)(new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
    })), headers = _e[0], setHeaders = _e[1];
    var getEditorConfig = (0, react_1.useCallback)(function (id) {
        var furl = id ? "".concat(url, "/editor/").concat(id) : "".concat(url, "/editor");
        furl = lang ? "".concat(furl, "?lang=").concat(lang) : furl;
        return fetch(furl, {
            headers: headers,
        })
            .then(function (response) {
            if (!response.ok) {
                throw Error("response error status ".concat(response.status));
            }
            return response.json();
        })
            .then(function (data) {
            setState(function (prevState) { return (__assign(__assign({}, prevState), { value: "loaded", settings: data.data })); });
            return data;
        })
            .catch(function (err) {
            setState(function (prevState) { return (__assign(__assign({}, prevState), { value: "error", error: err.toString() })); });
        });
    }, [url, headers, lang]);
    var seth5pObject = (0, react_1.useCallback)(function (h5pObject) {
        if (h5pObject) {
            setState(function (prevState) { return (__assign(__assign({}, prevState), { value: "loaded", settings: h5pObject })); });
        }
    }, [url, headers]);
    var getContentConfig = (0, react_1.useCallback)(function (id) {
        return fetch(id ? "".concat(url, "/content/").concat(id) : "".concat(url, "/content"), {
            headers: headers,
        })
            .then(function (response) {
            if (!response.ok) {
                throw Error("response error status ".concat(response.status));
            }
            return response.json();
        })
            .then(function (data) {
            setState(function (prevState) { return (__assign(__assign({}, prevState), { value: "loaded", settings: data.data })); });
            return data;
        })
            .catch(function (err) {
            setState(function (prevState) { return (__assign(__assign({}, prevState), { value: "error", error: err.toString() })); });
        });
    }, [url, headers]);
    var submitContent = (0, react_1.useCallback)(function (data, id) {
        return fetch(id ? "".concat(url, "/content/").concat(id) : "".concat(url, "/content"), {
            method: "POST",
            body: JSON.stringify(data),
            headers: headers,
        })
            .then(function (response) {
            if (!response.ok) {
                throw Error("response error status ".concat(response.status));
            }
            return response.json();
        })
            .then(function (data) {
            return data;
        })
            .catch(function (err) {
            setState(function (prevState) { return (__assign(__assign({}, prevState), { value: "error", error: err.toString() })); });
        });
    }, [url, headers]);
    return ((0, jsx_runtime_1.jsx)(exports.EditorContext.Provider, __assign({ value: {
            url: url,
            state: state,
            getEditorConfig: getEditorConfig,
            getContentConfig: getContentConfig,
            submitContent: submitContent,
            seth5pObject: seth5pObject,
            setLang: setLang,
            setHeaders: setHeaders,
        } }, { children: children })));
};
exports.EditorContextProvider = EditorContextProvider;
