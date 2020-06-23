"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = __importDefault(require("styled-components"));
var danger = "#f6511dff";
var Alert = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tdisplay: flex;\n\tflex-direction: column;\n\tpadding: 26px;\n\tmargin: 0 5px 10px 5px;\n\tcolor: white;\n"], ["\n\tdisplay: flex;\n\tflex-direction: column;\n\tpadding: 26px;\n\tmargin: 0 5px 10px 5px;\n\tcolor: white;\n"])));
var DangerAlert = styled_components_1.default(Alert)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\tbackground-color: ", ";\n\tborder: solid 1px ", ";\n"], ["\n\tbackground-color: ", ";\n\tborder: solid 1px ", ";\n"])), function (props) { return props.theme.danger ? props.theme.danger : danger; }, function (props) { return props.theme.danger ? props.theme.danger : danger; });
exports.DangerAlert = DangerAlert;
var templateObject_1, templateObject_2;
