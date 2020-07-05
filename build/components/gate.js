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
var formik_1 = require("formik");
var input_1 = require("./styled/input");
var form_1 = require("./styled/form");
var button_1 = require("./styled/button");
var util_1 = require("../util");
var LoginPane = function (_a) {
    var onLogin = _a.onLogin;
    var _b = formik_1.useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: onLogin,
    }), values = _b.values, handleChange = _b.handleChange, handleBlur = _b.handleBlur, handleSubmit = _b.handleSubmit;
    return (React.createElement(form_1.CmsForm, null,
        React.createElement("form", { onSubmit: handleSubmit },
            React.createElement("div", null,
                React.createElement(input_1.CmsInput, { placeholder: "Username", name: "username", type: "text", value: values.username, onChange: handleChange, onBlur: handleBlur })),
            React.createElement("div", null,
                React.createElement(input_1.CmsInput, { placeholder: "Password", name: "password", type: "password", value: values.password, onChange: handleChange, onBlur: handleBlur })),
            React.createElement("div", null,
                React.createElement(button_1.SuccessButton, { type: "submit" }, "Login")))));
};
var Gate = function (_a) {
    var locked = _a.locked, creds = _a.creds, component = _a.component, customLoginPane = _a.customLoginPane;
    var _b = React.useState(false), passThroughGate = _b[0], setGatePass = _b[1];
    var checkSession = function () {
        if (typeof localStorage == "undefined") {
            return false;
        }
        else {
            var sessionId = localStorage.getItem("sessionId");
            var sessionTime = localStorage.getItem("sessionTime"); //should come back as unix timestamp
            var d = new Date(sessionTime);
            var today = new Date();
            if (sessionId) {
                if (d.getDay() - today.getDay() == 2 || d.getDay() - today.getDay() == -2) {
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                return false;
            }
        }
    };
    var loginUser = function (values) {
        if (creds) {
            if (creds.username == values.username && creds.password == values.password) {
                if (typeof localStorage != "undefined") {
                    localStorage.setItem("sessionTime", Date.now().toString());
                    localStorage.setItem("sessionId", util_1.randomId(6));
                    setGatePass(true);
                }
            }
            else {
                alert("Wrong username and/or password");
            }
        }
    };
    var RenderComponent = component;
    var RenderLoginComponent = customLoginPane;
    if (locked) {
        if (checkSession() || passThroughGate) {
            return React.createElement(RenderComponent, null);
        }
        else {
            if (customLoginPane) {
                return React.createElement(RenderLoginComponent, { onLogin: loginUser });
            }
            else {
                return React.createElement(LoginPane, { onLogin: loginUser });
            }
        }
    }
    else {
        return React.createElement(RenderComponent, null);
    }
};
exports.default = Gate;
