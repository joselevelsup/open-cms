"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var util_1 = require("../util");
var render_component_1 = __importDefault(require("./render-component"));
var axios_1 = __importDefault(require("axios"));
var io_1 = require("react-icons/io");
var button_1 = require("./styled/button");
var alert_1 = require("./styled/alert");
var cms_1 = require("./styled/cms");
require("../styles/index.scss");
var CmsPage = /** @class */ (function (_super) {
    __extends(CmsPage, _super);
    function CmsPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            componentsForThisPage: [],
            needsUpdateAlert: false,
            loadError: false,
            loadErrorMessage: "",
            componentList: [
                {
                    name: "short text",
                    slug: "short-text"
                },
                {
                    name: "long text",
                    slug: "long-text"
                },
                {
                    name: "nested",
                    slug: "nested"
                },
                {
                    name: "media",
                    slug: "media"
                },
                {
                    name: "link",
                    slug: "link"
                }
            ]
        };
        _this.loadComponentData = function () { return __awaiter(_this, void 0, void 0, function () {
            var apiRoute, self;
            return __generator(this, function (_a) {
                apiRoute = this.props.apiRoute;
                self = this;
                axios_1.default.get(apiRoute).then(function (resp) {
                    var data = resp.data;
                    var remappedData = data.map(function (t) {
                        var remappedComponent = {};
                        if (t.type == "nested") {
                            var remappedNestedComponents = t.components.map(function (tc) {
                                var _a;
                                return (_a = {},
                                    _a[tc.type + "-" + tc.id] = {
                                        "title": tc.title,
                                        "value": tc.value
                                    },
                                    _a);
                            });
                            remappedComponent[t.type + "-" + t.id] = {
                                "title": t.title,
                                "components": remappedNestedComponents
                            };
                        }
                        else {
                            remappedComponent[t.type + "-" + t.id] = {
                                "title": t.title,
                                "value": t.value
                            };
                        }
                        return remappedComponent;
                    });
                    self.setState({
                        componentsForThisPage: remappedData
                    });
                }).catch(function (err) {
                    self.setState({
                        loadError: true,
                        loadErrorMessage: err.message
                    });
                });
                return [2 /*return*/];
            });
        }); };
        _this.addComponentToList = function (slug) {
            _this.setState(function (state) {
                var _a, _b;
                var currentComponents = __spreadArrays(state.componentsForThisPage);
                if (slug.includes("nested")) {
                    currentComponents.push((_a = {},
                        _a[slug + "-" + (currentComponents.length + 1)] = {
                            components: [
                                {
                                    "short-text-1": {
                                        title: "",
                                        value: ""
                                    }
                                }
                            ]
                        },
                        _a));
                }
                else {
                    currentComponents.push((_b = {},
                        _b[slug + "-" + (currentComponents.length + 1)] = {
                            title: "",
                            value: ""
                        },
                        _b));
                }
                return {
                    componentsForThisPage: currentComponents
                };
            });
        };
        _this.setComponentAttr = function (slug, attr, parent, childSlug) {
            if (attr === void 0) { attr = "value"; }
            return function (e) {
                var val = e.target ? e.target : { value: e };
                _this.setState(function (state) {
                    var _a, _b, _c;
                    var currentComponents = __spreadArrays(state.componentsForThisPage);
                    var slugIndex = currentComponents.findIndex(function (s) {
                        var sl = util_1.firstObjectKey(s);
                        return slug == sl;
                    });
                    if (parent) {
                        var childSlugIndex = currentComponents[slugIndex][slug]["components"].findIndex(function (s) { return util_1.firstObjectKey(s) == childSlug; });
                        currentComponents[slugIndex][slug]["components"][childSlugIndex][childSlug] = __assign(__assign({}, currentComponents[slugIndex][slug]["components"][childSlugIndex][childSlug]), (_a = {}, _a[attr] = val.value, _a));
                    }
                    else {
                        currentComponents[slugIndex] = (_b = {},
                            _b[slug] = __assign(__assign({}, currentComponents[slugIndex][slug]), (_c = {}, _c[attr] = val.value, _c)),
                            _b);
                    }
                    return {
                        componentsForThisPage: currentComponents
                    };
                });
            };
        };
        _this.removeComponent = function (slug, parent, childSlug) {
            _this.setState(function (state) {
                var currentComponents = __spreadArrays(state.componentsForThisPage);
                var newSetComponents;
                if (parent) {
                    newSetComponents = currentComponents.map(function (cc) {
                        if (slug == util_1.firstObjectKey(cc)) {
                            cc[slug].components = cc[slug].components.filter(function (c) { return childSlug != util_1.firstObjectKey(c); });
                            return cc;
                        }
                        return cc;
                    });
                }
                else {
                    newSetComponents = currentComponents.filter(function (s) { return slug != util_1.firstObjectKey(s); });
                }
                return {
                    componentsForThisPage: newSetComponents
                };
            });
        };
        _this.saveCmsData = function () {
            var componentsForThisPage = _this.state.componentsForThisPage;
            var data = componentsForThisPage.map(function (c) {
                var key = util_1.firstObjectKey(c);
                var spl = key.split("-");
                var componentData;
                if (spl[0] == "nested") {
                    var id = parseInt(spl[1]);
                    var components = c[key]["components"].map(function (nc) {
                        var nestedKey = util_1.firstObjectKey(nc);
                        var nestedSpl = nestedKey.split("-");
                        console.log(nestedSpl);
                        var nestedId = nestedSpl.length == 3 ? parseInt(nestedSpl[2]) : parseInt(nestedSpl[1]);
                        var nestedTypeOfComponent = nestedSpl.length == 3 ? nestedSpl[0] + "-" + nestedSpl[1] : nestedSpl[0];
                        return {
                            id: nestedId,
                            title: util_1.slugify(nc[nestedKey]["title"]),
                            value: nc[nestedKey]["value"],
                            type: nestedTypeOfComponent
                        };
                    });
                    componentData = {
                        id: id,
                        title: c[key]["title"],
                        slug: util_1.slugify(c[key]["title"]),
                        components: components,
                        type: spl[0]
                    };
                }
                else {
                    var typeOfComponent = spl.length == 3 ? spl[0] + "-" + spl[1] : spl[0];
                    var id = spl.length == 3 ? parseInt(spl[2]) : parseInt(spl[1]);
                    componentData = {
                        id: id,
                        title: c[key]["title"],
                        slug: util_1.slugify(c[key]["title"]),
                        value: c[key]["value"],
                        type: typeOfComponent
                    };
                }
                return componentData;
            });
            console.log(data);
            /* axios.put(this.props.apiRoute, data).then((resp: AxiosResponse) => { */
            /* 	console.log(resp); */
            /* }).catch((err: AxiosError) => { */
            /* 	console.log(err); */
            /* }) */
        };
        _this.createNestedComponent = function (nestedSlug) {
            _this.setState(function (state) {
                var _a;
                var currentComponents = __spreadArrays(state.componentsForThisPage);
                var nestedIndex = currentComponents.findIndex(function (c) { return nestedSlug == util_1.firstObjectKey(c); });
                currentComponents[nestedIndex][nestedSlug]["components"].push((_a = {},
                    _a["short-text-" + (currentComponents[nestedIndex][nestedSlug]["components"].length + 1)] = {
                        title: "",
                        value: ""
                    },
                    _a));
                return {
                    componentsForThisPage: currentComponents
                };
            });
        };
        _this.changeNestedComponent = function (e, nestedSlug, oldComponent) {
            var val = e.target;
            _this.setState(function (state) {
                var currentComponents = __spreadArrays(state.componentsForThisPage);
                var nestedIndex = currentComponents.findIndex(function (c) { return nestedSlug == util_1.firstObjectKey(c); });
                var changedComponentList = currentComponents[nestedIndex][nestedSlug]["components"].map(function (c, i) {
                    var _a;
                    if (oldComponent == util_1.firstObjectKey(c)) {
                        var newComponent = __assign(__assign({}, c), (_a = {}, _a[val.value + "-" + (i + 1)] = c[oldComponent], _a));
                        delete newComponent[oldComponent];
                        return newComponent;
                    }
                    else {
                        return c;
                    }
                });
                currentComponents[nestedIndex][nestedSlug]["components"] = changedComponentList;
                return {
                    componentsForThisPage: currentComponents
                };
            });
        };
        return _this;
    }
    CmsPage.prototype.componentDidMount = function () {
        var customComponents = this.props.customComponents;
        if (customComponents) {
            var newComponents_1 = customComponents.map(function (c) { return (__assign(__assign({}, c), { slug: util_1.slugify(c.name) })); });
            this.setState(function (state) { return ({
                componentList: __spreadArrays(state.componentList, newComponents_1)
            }); });
        }
        this.loadComponentData();
    };
    CmsPage.prototype.componentDidUpdate = function (_prevProps, prevState) {
        var componentsForThisPage = this.state.componentsForThisPage;
        if (prevState.componentsForThisPage !== componentsForThisPage) {
            this.setState({
                needsUpdateAlert: true
            });
        }
    };
    CmsPage.prototype.render = function () {
        var _this = this;
        var _a = this.props, otherRoutes = _a.otherRoutes, logo = _a.logo, apiRoute = _a.apiRoute;
        var _b = this.state, componentsForThisPage = _b.componentsForThisPage, needsUpdateAlert = _b.needsUpdateAlert, componentList = _b.componentList, loadError = _b.loadError, loadErrorMessage = _b.loadErrorMessage;
        return (React.createElement(cms_1.Cms, { className: "cms-page" },
            React.createElement(cms_1.CmsHeader, { className: "cms-header", logo: logo },
                logo &&
                    React.createElement("div", { className: "header-logo" },
                        React.createElement("img", { src: logo })),
                otherRoutes.map(function (r, i) { return (React.createElement("div", { key: i, className: "route-link" },
                    React.createElement("a", { href: "/admin/" + util_1.slugify(r.name) }, r.name))); })),
            React.createElement("br", null),
            loadError &&
                React.createElement(alert_1.DangerAlert, null, "Unable to get CMS data from " + apiRoute + ". (" + loadErrorMessage + ")"),
            React.createElement("div", { className: "cms-page-options" },
                React.createElement(button_1.DangerButton, { className: "cms-option" }, "Cancel"),
                React.createElement(button_1.WarningButton, { className: "cms-option", onClick: this.loadComponentData }, "Load CMS Data"),
                React.createElement(button_1.SuccessButton, { onClick: function () { return _this.saveCmsData(); }, updateAlert: needsUpdateAlert, className: "cms-option" },
                    React.createElement("div", { style: { display: "flex" } },
                        needsUpdateAlert && React.createElement("p", null,
                            React.createElement(io_1.IoMdAlert, { color: "white", style: { width: "25px", height: "25px" } })),
                        React.createElement("p", null, " Save Changes")))),
            React.createElement(cms_1.CmsBody, { className: "cms-body" },
                React.createElement("div", { className: "components" }, componentList.map(function (c, i) { return (React.createElement("div", { className: "component-item", key: i },
                    React.createElement("p", null, c.name),
                    React.createElement(button_1.SuccessButton, { onClick: function () { return _this.addComponentToList(c.slug); } },
                        React.createElement(io_1.IoMdAdd, { color: "white", style: { width: "16px", height: "16px" } })))); })),
                React.createElement("div", { className: "main" }, componentsForThisPage.map(function (c, i) { return (React.createElement(render_component_1.default, { key: i, slug: c, changeComponentAttr: _this.setComponentAttr, deleteComponent: _this.removeComponent, addNestedComponent: _this.createNestedComponent, changeNestedComponent: _this.changeNestedComponent, componentList: componentList })); })))));
    };
    CmsPage.defaultProps = {
        otherRoutes: [],
        logo: null,
        customComponents: []
    };
    return CmsPage;
}(React.Component));
exports.default = CmsPage;
