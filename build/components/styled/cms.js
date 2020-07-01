"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmsBody = exports.CmsHeader = exports.Cms = void 0;
var styled_components_1 = __importStar(require("styled-components"));
var pageColor = "#d4e4ff";
var headerColor = "white";
var Cms = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\twidth: 100%;\n\theight: 100%;\n\tbackground-color: ", ";\n"], ["\n\twidth: 100%;\n\theight: 100%;\n\tbackground-color: ", ";\n"])), function (props) { return props.theme.pageColor ? props.theme.pageColor : pageColor; });
exports.Cms = Cms;
var CmsHeader = styled_components_1.default.div.attrs(function (props) { return ({
    logo: props.logo ? true : false
}); })(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n\tdisplay: flex;\n\tflex-direction: row;\n\tflex: 1;\n\tbackground-color: ", ";\n\t", "\n"], ["\n\tdisplay: flex;\n\tflex-direction: row;\n\tflex: 1;\n\tbackground-color: ", ";\n\t",
    "\n"])), function (props) { return props.theme.headerColor ? props.theme.headerColor : headerColor; }, function (props) { return props.logo ? styled_components_1.css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\t\t\tpadding: 6px 0;\n\t\t"], ["\n\t\t\tpadding: 6px 0;\n\t\t"]))) : styled_components_1.css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\t\t\tpadding: 25px 10px;\n\t\t"], ["\n\t\t\tpadding: 25px 10px;\n\t\t"]))); });
exports.CmsHeader = CmsHeader;
var CmsBody = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n\tdisplay: flex;\n\tflex-direction: row;\n\tpadding: 10px 5px 0px 5px;\n\tbackground-color: ", ";\n"], ["\n\tdisplay: flex;\n\tflex-direction: row;\n\tpadding: 10px 5px 0px 5px;\n\tbackground-color: ", ";\n"])), function (props) { return props.theme.pageColor ? props.theme.pageColor : pageColor; });
exports.CmsBody = CmsBody;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
