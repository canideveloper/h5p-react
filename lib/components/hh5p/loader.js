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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
// import "./loader.css";
var css = {
    position: "absolute",
    width: "100%",
    height: "100",
    zIndex: "9999",
    background: "rgba(255, 255, 255, 0.4)",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
};
var Loader = function () {
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "h5p-loader", style: css }, { children: (0, jsx_runtime_1.jsxs)("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "101px", height: "101px", viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid" }, { children: [(0, jsx_runtime_1.jsx)("g", __assign({ transform: "rotate(0 50 50)" }, { children: (0, jsx_runtime_1.jsx)("rect", __assign({ x: "47.5", y: "24", rx: "2.5", ry: "6", width: "5", height: "12", fill: "#3080c9" }, { children: (0, jsx_runtime_1.jsx)("animate", { attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "1s", begin: "-0.9166666666666666s", repeatCount: "indefinite" }) })) })), (0, jsx_runtime_1.jsx)("g", __assign({ transform: "rotate(30 50 50)" }, { children: (0, jsx_runtime_1.jsx)("rect", __assign({ x: "47.5", y: "24", rx: "2.5", ry: "6", width: "5", height: "12", fill: "#3080c9" }, { children: (0, jsx_runtime_1.jsx)("animate", { attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "1s", begin: "-0.8333333333333334s", repeatCount: "indefinite" }) })) })), (0, jsx_runtime_1.jsx)("g", __assign({ transform: "rotate(60 50 50)" }, { children: (0, jsx_runtime_1.jsx)("rect", __assign({ x: "47.5", y: "24", rx: "2.5", ry: "6", width: "5", height: "12", fill: "#3080c9" }, { children: (0, jsx_runtime_1.jsx)("animate", { attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "1s", begin: "-0.75s", repeatCount: "indefinite" }) })) })), (0, jsx_runtime_1.jsx)("g", __assign({ transform: "rotate(90 50 50)" }, { children: (0, jsx_runtime_1.jsx)("rect", __assign({ x: "47.5", y: "24", rx: "2.5", ry: "6", width: "5", height: "12", fill: "#3080c9" }, { children: (0, jsx_runtime_1.jsx)("animate", { attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "1s", begin: "-0.6666666666666666s", repeatCount: "indefinite" }) })) })), (0, jsx_runtime_1.jsx)("g", __assign({ transform: "rotate(120 50 50)" }, { children: (0, jsx_runtime_1.jsx)("rect", __assign({ x: "47.5", y: "24", rx: "2.5", ry: "6", width: "5", height: "12", fill: "#3080c9" }, { children: (0, jsx_runtime_1.jsx)("animate", { attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "1s", begin: "-0.5833333333333334s", repeatCount: "indefinite" }) })) })), (0, jsx_runtime_1.jsx)("g", __assign({ transform: "rotate(150 50 50)" }, { children: (0, jsx_runtime_1.jsx)("rect", __assign({ x: "47.5", y: "24", rx: "2.5", ry: "6", width: "5", height: "12", fill: "#3080c9" }, { children: (0, jsx_runtime_1.jsx)("animate", { attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "1s", begin: "-0.5s", repeatCount: "indefinite" }) })) })), (0, jsx_runtime_1.jsx)("g", __assign({ transform: "rotate(180 50 50)" }, { children: (0, jsx_runtime_1.jsx)("rect", __assign({ x: "47.5", y: "24", rx: "2.5", ry: "6", width: "5", height: "12", fill: "#3080c9" }, { children: (0, jsx_runtime_1.jsx)("animate", { attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "1s", begin: "-0.4166666666666667s", repeatCount: "indefinite" }) })) })), (0, jsx_runtime_1.jsx)("g", __assign({ transform: "rotate(210 50 50)" }, { children: (0, jsx_runtime_1.jsx)("rect", __assign({ x: "47.5", y: "24", rx: "2.5", ry: "6", width: "5", height: "12", fill: "#3080c9" }, { children: (0, jsx_runtime_1.jsx)("animate", { attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "1s", begin: "-0.3333333333333333s", repeatCount: "indefinite" }) })) })), (0, jsx_runtime_1.jsx)("g", __assign({ transform: "rotate(240 50 50)" }, { children: (0, jsx_runtime_1.jsx)("rect", __assign({ x: "47.5", y: "24", rx: "2.5", ry: "6", width: "5", height: "12", fill: "#3080c9" }, { children: (0, jsx_runtime_1.jsx)("animate", { attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "1s", begin: "-0.25s", repeatCount: "indefinite" }) })) })), (0, jsx_runtime_1.jsx)("g", __assign({ transform: "rotate(270 50 50)" }, { children: (0, jsx_runtime_1.jsx)("rect", __assign({ x: "47.5", y: "24", rx: "2.5", ry: "6", width: "5", height: "12", fill: "#3080c9" }, { children: (0, jsx_runtime_1.jsx)("animate", { attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "1s", begin: "-0.16666666666666666s", repeatCount: "indefinite" }) })) })), (0, jsx_runtime_1.jsx)("g", __assign({ transform: "rotate(300 50 50)" }, { children: (0, jsx_runtime_1.jsx)("rect", __assign({ x: "47.5", y: "24", rx: "2.5", ry: "6", width: "5", height: "12", fill: "#3080c9" }, { children: (0, jsx_runtime_1.jsx)("animate", { attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "1s", begin: "-0.08333333333333333s", repeatCount: "indefinite" }) })) })), (0, jsx_runtime_1.jsx)("g", __assign({ transform: "rotate(330 50 50)" }, { children: (0, jsx_runtime_1.jsx)("rect", __assign({ x: "47.5", y: "24", rx: "2.5", ry: "6", width: "5", height: "12", fill: "#3080c9" }, { children: (0, jsx_runtime_1.jsx)("animate", { attributeName: "opacity", values: "1;0", keyTimes: "0;1", dur: "1s", begin: "0s", repeatCount: "indefinite" }) })) }))] })) })));
};
exports.Loader = Loader;
exports.default = exports.Loader;
