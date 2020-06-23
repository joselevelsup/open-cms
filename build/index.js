"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
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
    var routes = props.routes, theme = props.theme, logo = props.logo, apiAddress = props.apiAddress, components = props.components;
    var remappedRoutes = {};
    var _loop_1 = function (r) {
        remappedRoutes["/admin/" + util_1.slugify(routes[r].name)] = function () { return (React.createElement(styled_components_1.ThemeProvider, { theme: theme },
            React.createElement(cmspage_1.default, { otherRoutes: routes, apiRoute: "" + apiAddress + routes[r].apiRoute, logo: logo, customComponents: components }))); };
    };
    for (var r in routes) {
        _loop_1(r);
    }
    remappedRoutes["/admin/users"] = function () { return (React.createElement(styled_components_1.ThemeProvider, { theme: theme },
        React.createElement(userpage_1.default, null))); };
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
    components: []
};
exports.default = OpenCms;
