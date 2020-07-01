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
var util_1 = require("./util");
function OpenCms(props) {
    var routes = props.routes, theme = props.theme, logo = props.logo, apiAddress = props.apiAddress, components = props.components, userPage = props.userPage, userMap = props.userMap, userRoute = props.userRoute;
    var remappedRoutes = {};
    var _loop_1 = function (r) {
        remappedRoutes["/admin/" + util_1.slugify(routes[r].name)] = function () { return (React.createElement(styled_components_1.ThemeProvider, { theme: theme },
            React.createElement(cmspage_1.default, { otherRoutes: routes, apiRoute: "" + apiAddress + routes[r].apiRoute, logo: logo, customComponents: components }))); };
    };
    for (var r in routes) {
        _loop_1(r);
    }
    if (userPage) {
        remappedRoutes["/admin/users"] = function () { return (React.createElement(styled_components_1.ThemeProvider, { theme: theme }, userMap && userMap.length >= 1 ?
            React.createElement(userpage_1.default, { userRoute: userRoute, userConfig: userMap, apiAddress: apiAddress, otherRoutes: routes })
            :
                React.createElement(userpage_1.default, { apiAddress: apiAddress, otherRoutes: routes }))); };
    }
    var router = hookrouter_1.useRoutes(remappedRoutes);
    return router;
}
OpenCms.defaultProps = {
    apiAddress: "http://localhost:8080",
    routes: [
        {
            name: "home page",
            apiRoute: "/home",
        }
    ],
    theme: {},
    logo: null,
    components: [],
    userPage: true
};
exports.default = OpenCms;
