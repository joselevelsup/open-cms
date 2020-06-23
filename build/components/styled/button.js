"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = __importStar(require("styled-components"));
var danger = "#f6511dff";
var success = "#7fb800ff";
var warning = "#ffb400ff";
var Button = styled_components_1.default.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tcolor: white;\n\tpadding: 10px 17px;\n\tcursor: pointer;\n"], ["\n\tcolor: white;\n\tpadding: 10px 17px;\n\tcursor: pointer;\n"])));
var DangerButton = styled_components_1.default(Button)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\tborder: solid 2px ", ";\n\tbackground-color: ", ";\n"], ["\n\tborder: solid 2px ", ";\n\tbackground-color: ", ";\n"])), function (props) { return props.theme.danger ? props.theme.danger : danger; }, function (props) { return props.theme.danger ? props.theme.danger : danger; });
exports.DangerButton = DangerButton;
var SuccessButton = styled_components_1.default(Button).attrs(function (props) { return ({
    updateAlert: props.updateAlert
}); })(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n\tborder: solid 2px ", ";\n\tbackground-color: ", ";\n\t", "\n"], ["\n\tborder: solid 2px ", ";\n\tbackground-color: ", ";\n\t",
    "\n"])), function (props) { return props.theme.success ? props.theme.success : success; }, function (props) { return props.theme.success ? props.theme.success : success; }, function (props) { return props.updateAlert && styled_components_1.css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\t\t\t\tpadding-top: 0;\n\t\t\t\tpadding-bottom: 0;\n\t\t\t\t> p {\n\t\t\t\t\tmargin-top: auto;\n\t\t\t\t\tmargin-bottom: auto;\n\t\t\t\t}\n\t\t\t\tp:last-child{\n\t\t\t\t\tpadding-left: 6px;\n\t\t\t\t}\n\t\t\t"], ["\n\t\t\t\tpadding-top: 0;\n\t\t\t\tpadding-bottom: 0;\n\t\t\t\t> p {\n\t\t\t\t\tmargin-top: auto;\n\t\t\t\t\tmargin-bottom: auto;\n\t\t\t\t}\n\t\t\t\tp:last-child{\n\t\t\t\t\tpadding-left: 6px;\n\t\t\t\t}\n\t\t\t"]))); });
exports.SuccessButton = SuccessButton;
var WarningButton = styled_components_1.default(Button)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n\tborder: solid 2px ", ";\n\tbackground-color: ", ";\n"], ["\n\tborder: solid 2px ", ";\n\tbackground-color: ", ";\n"])), function (props) { return props.theme.warning ? props.theme.warning : warning; }, function (props) { return props.theme.warning ? props.theme.warning : warning; });
exports.WarningButton = WarningButton;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
