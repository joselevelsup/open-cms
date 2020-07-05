"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var hookrouter_1 = require("hookrouter");
var styled_components_1 = require("styled-components");
var cmspage_1 = __importDefault(require("./components/cmspage"));
var userpage_1 = __importDefault(require("./components/userpage"));
var gate_1 = __importDefault(require("./components/gate"));
var util_1 = require("./util");
function OpenCms(_a) {
    var routes = _a.routes, _b = _a.theme, theme = _b === void 0 ? {} : _b, _c = _a.logo, logo = _c === void 0 ? null : _c, _d = _a.apiAddress, apiAddress = _d === void 0 ? "http://localhost:8080" : _d, _e = _a.components, components = _e === void 0 ? [] : _e, _f = _a.userPage, userPage = _f === void 0 ? true : _f, _g = _a.userMap, userMap = _g === void 0 ? [] : _g, _h = _a.userRoute, userRoute = _h === void 0 ? "/users" : _h, _j = _a.locked, locked = _j === void 0 ? true : _j, _k = _a.credentials, credentials = _k === void 0 ? { username: "admin", password: "password123" } : _k;
    var remappedRoutes = {};
    var _loop_1 = function (r) {
        remappedRoutes["/admin/" + util_1.slugify(routes[r].name)] = function () { return (React.createElement(styled_components_1.ThemeProvider, { theme: theme },
            React.createElement(gate_1.default, { creds: credentials, locked: locked, component: function () { return (React.createElement(cmspage_1.default, { otherRoutes: routes, apiRoute: "" + apiAddress + routes[r].apiRoute, logo: logo, customComponents: components })); } }))); };
    };
    for (var r in routes) {
        _loop_1(r);
    }
    if (userPage) {
        remappedRoutes["/admin/users"] = function () { return (React.createElement(styled_components_1.ThemeProvider, { theme: theme }, userMap && userMap.length >= 1 ?
            React.createElement(gate_1.default, { creds: credentials, locked: locked, component: function () { return (React.createElement(userpage_1.default, { userRoute: userRoute, userConfig: userMap, apiAddress: apiAddress, otherRoutes: routes })); } })
            :
                React.createElement(gate_1.default, { creds: credentials, locked: locked, component: function () { return (React.createElement(userpage_1.default, { apiAddress: apiAddress, otherRoutes: routes })); } }))); };
    }
    var router = hookrouter_1.useRoutes(remappedRoutes);
    return router;
}
exports.default = OpenCms;
