"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmsInputHeader = exports.CmsTextarea = exports.CmsInput = void 0;
var styled_components_1 = __importDefault(require("styled-components"));
var colors_1 = require("./colors");
var CmsInput = styled_components_1.default.input(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\twidth: 100%;\n\theight: 31px;\n\tborder: solid 1px ", ";\n\tborder-radius: 3px;\n\tpadding: 10px;\n\toutline: none;\n"], ["\n\twidth: 100%;\n\theight: 31px;\n\tborder: solid 1px ", ";\n\tborder-radius: 3px;\n\tpadding: 10px;\n\toutline: none;\n"])), function (props) { return props.theme.secondary ? props.theme.secondary : colors_1.secondary; });
exports.CmsInput = CmsInput;
var CmsInputHeader = styled_components_1.default(CmsInput)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\twidth: 30%;\n\tmargin-top: auto;\n"], ["\n\twidth: 30%;\n\tmargin-top: auto;\n"])));
exports.CmsInputHeader = CmsInputHeader;
var CmsTextarea = styled_components_1.default.textarea(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\twidth: 100%;\n\tborder: solid 1px ", ";\n\tborder-radius: 3px;\n\tpadding: 10px;\n\toutline: none;\n"], ["\n\twidth: 100%;\n\tborder: solid 1px ", ";\n\tborder-radius: 3px;\n\tpadding: 10px;\n\toutline: none;\n"])), function (props) { return props.theme.secondary ? props.theme.secondary : colors_1.secondary; });
exports.CmsTextarea = CmsTextarea;
var templateObject_1, templateObject_2, templateObject_3;
