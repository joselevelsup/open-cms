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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var util_1 = require("../util");
var input_1 = require("./styled/input");
var button_1 = require("./styled/button");
var ComponentHeader = function (_a) {
    var name = _a.name, value = _a.value, onChange = _a.onChange, removeComponent = _a.removeComponent, type = _a.type, changeComponent = _a.changeComponent, changeAvailable = _a.changeAvailable, componentlist = _a.componentlist;
    var _b = React.useState("short-text"), newComponentType = _b[0], setNewComponentType = _b[1];
    var changeThisComponent = function (e) {
        setNewComponentType(e.target.value);
        changeComponent(e);
    };
    return (React.createElement("div", { className: "component-header" },
        React.createElement(input_1.CmsInputHeader, { name: name, value: value, onChange: onChange, placeholder: "Title?", type: "text" }),
        !type.includes("nested") &&
            React.createElement(React.Fragment, null, changeAvailable &&
                React.createElement("select", { className: "change-component", name: "change-component", onChange: changeThisComponent, value: newComponentType }, componentlist.map(function (c) { return (React.createElement(React.Fragment, null, c.name !== "nested" &&
                    React.createElement("option", { value: c.slug }, c.name))); }))),
        React.createElement(button_1.DangerButton, { className: "delete-component", onClick: removeComponent }, "Delete")));
};
var renderActualComponent = function (slug, onCompTextChange, slugKey, child, parentSlugKey) {
    var splitKey = slugKey.split("-");
    var typeOfInput = util_1.removeLastItem(splitKey);
    switch (typeOfInput) {
        case "short-text":
            return (React.createElement(input_1.CmsInput, { name: slugKey + "-value", type: "text", value: slug[slugKey].value, onChange: !child ? onCompTextChange(slugKey, "value") : onCompTextChange(parentSlugKey, "value", true, slugKey), className: "component-input" }));
        case "long-text":
            return (React.createElement(input_1.CmsTextarea, { name: slugKey + "-value", value: slug[slugKey].value, onChange: !child ? onCompTextChange(slugKey, "value") : onCompTextChange(parentSlugKey, "value", true, slugKey), className: "component-input textarea" }));
        case "media":
            return (React.createElement("div", { className: "media-container" }));
        case "link":
            return (React.createElement("div", { className: "link-container" },
                React.createElement(input_1.CmsInput, { name: slugKey + "-value", type: "text", value: slug[slugKey].value, onChange: !child ? onCompTextChange(slugKey, "value") : onCompTextChange(parentSlugKey, "value", true, slugKey), className: "component-input link" }),
                React.createElement("a", { href: slug[slugKey].value }, "Test this link")));
        default:
            return React.createElement(React.Fragment, null);
    }
};
var renderCustomComponent = function (slug, onCompTextChange, slugKey, componentList, child, parentSlugKey) {
    var splitKey = slugKey.split("-");
    var typeOfInput = util_1.removeLastItem(splitKey);
    var CustomComponent = componentList.find(function (c) { return c.slug == typeOfInput; }).component;
    return (React.createElement("div", { className: "custom" },
        React.createElement(CustomComponent, { onComponentChange: !child ? onCompTextChange(slugKey, "value") : onCompTextChange(parentSlugKey, "value", true, slugKey), nested: child, name: slugKey })));
};
function default_1(_a) {
    var componentList = _a.componentList, changeComponentAttr = _a.changeComponentAttr, slug = _a.slug, deleteComponent = _a.deleteComponent, addNestedComponent = _a.addNestedComponent, changeNestedComponent = _a.changeNestedComponent;
    var slugKey = util_1.firstObjectKey(slug);
    return (React.createElement("div", { className: "component-container" },
        React.createElement(ComponentHeader, { name: slugKey + "-title", value: slug[slugKey].title, onChange: changeComponentAttr(slugKey, "title"), type: slugKey, removeComponent: function () { return deleteComponent(slugKey); } }),
        React.createElement("div", { className: "component" }, !slugKey.includes("nested") ?
            React.createElement(React.Fragment, null, util_1.containsAny(slugKey, ["short", "long", "media", "link"]) ?
                React.createElement(React.Fragment, null, renderActualComponent(slug, changeComponentAttr, slugKey))
                :
                    React.createElement(React.Fragment, null, renderCustomComponent(slug, changeComponentAttr, slugKey, componentList)))
            :
                React.createElement(React.Fragment, null,
                    slug[slugKey].components.length >= 1 && slug[slugKey].components.map(function (c) {
                        var thisSlugKey = util_1.firstObjectKey(c);
                        return (React.createElement(React.Fragment, null,
                            React.createElement(ComponentHeader, { name: thisSlugKey + "-title", value: c[thisSlugKey].title, onChange: changeComponentAttr(slugKey, "title", true, thisSlugKey), type: thisSlugKey, removeComponent: function () { return deleteComponent(slugKey, true, thisSlugKey); }, changeComponent: function (e) { return changeNestedComponent(e, slugKey, thisSlugKey); }, changeAvailable: true, componentlist: componentList }),
                            util_1.containsAny(thisSlugKey, ["short", "long", "media", "link"]) ?
                                React.createElement(React.Fragment, null, renderActualComponent(c, changeComponentAttr, thisSlugKey, true, slugKey))
                                :
                                    React.createElement(React.Fragment, null, renderCustomComponent(c, changeComponentAttr, thisSlugKey, componentList, true, slugKey))));
                    }),
                    React.createElement("div", { className: "nested-component-footer" },
                        React.createElement(button_1.SuccessButton, { onClick: function () { return addNestedComponent(slugKey); }, className: "add-component" }, "+ Add"))))));
}
exports.default = default_1;
