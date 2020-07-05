"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmsForm = void 0;
var styled_components_1 = __importDefault(require("styled-components"));
var CmsForm = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tmargin: 20%;\n\tpadding: 10px;\n\t& > form {\n\t\tpadding: 5% 10px;\n\t\tborder-radius: 2px;\n\t\tborder: solid 2px black;\n\t\t& > div {\n\t\t\tmargin-bottom: 5px;\n\t\t\t&:last-child {\n\t\t\t\tdisplay: flex;\n\t\t\t\tjustify-content: center;\n\t\t\t}\n\t\t}\n\t}\n"], ["\n\tmargin: 20%;\n\tpadding: 10px;\n\t& > form {\n\t\tpadding: 5% 10px;\n\t\tborder-radius: 2px;\n\t\tborder: solid 2px black;\n\t\t& > div {\n\t\t\tmargin-bottom: 5px;\n\t\t\t&:last-child {\n\t\t\t\tdisplay: flex;\n\t\t\t\tjustify-content: center;\n\t\t\t}\n\t\t}\n\t}\n"])));
exports.CmsForm = CmsForm;
var templateObject_1;
