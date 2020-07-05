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
var axios_1 = __importDefault(require("axios"));
var cms_1 = require("./styled/cms");
var alert_1 = require("./styled/alert");
var button_1 = require("./styled/button");
var util_1 = require("../util");
var UserCms = /** @class */ (function (_super) {
    __extends(UserCms, _super);
    function UserCms() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            deleteModal: false,
            editModal: false,
            users: [],
            errorMessage: null,
            successMessage: null
        };
        _this.retreiveUsers = function () {
            var _a = _this.props, apiAddress = _a.apiAddress, userRoute = _a.userRoute;
            var self = _this;
            axios_1.default.get("" + apiAddress + userRoute).then(function (resp) {
                var data = resp.data;
                if (data.users && data.users.length >= 1) {
                    self.setState({
                        users: data.users
                    });
                }
            }).catch(function (err) {
                self.setState({
                    errorMessage: "Error loading Users from " + apiAddress + userRoute + " (" + err.message + ")"
                });
            });
        };
        _this.toggleDeleteUserModal = function () { return _this.setState(function (state) { return ({
            deleteModal: !state.deleteModal
        }); }); };
        _this.deleteUser = function (id) {
            var _a = _this.props, apiAddress = _a.apiAddress, userRoute = _a.userRoute;
            var self = _this;
            var confirmDeleteUser = confirm("Are you sure you want to delete this user?");
            if (confirmDeleteUser) {
                axios_1.default.delete("" + apiAddress + userRoute, {
                    data: {
                        userId: id
                    }
                }).then(function (resp) {
                    if (resp.status == 200) {
                        self.setState({
                            successMessage: "Successfully deleted User!"
                        });
                        self.retreiveUsers();
                    }
                }).catch(function (err) {
                    self.setState({
                        errorMessage: "Error loading Users from " + apiAddress + userRoute + " (" + err.message + ")"
                    });
                });
            }
        };
        _this.sendResetPassword = function (id) {
            var _a = _this.props, apiAddress = _a.apiAddress, userRoute = _a.userRoute;
            var self = _this;
            var confirmResetUserPass = confirm("Reset this User's password?");
            if (confirmResetUserPass) {
                var resetPasswordPrompt = prompt("Enter new password (Leave empty if sending instructions)", "");
                if (resetPasswordPrompt !== null) {
                    if (resetPasswordPrompt.length >= 1) {
                        axios_1.default.put("" + apiAddress + userRoute, {
                            data: {
                                userId: id,
                                newPassword: resetPasswordPrompt
                            }
                        }).then(function (resp) {
                            self.setState({
                                successMessage: "New Password set"
                            });
                        }).catch(function (err) {
                            self.setState({
                                errorMessage: "Error (" + err.message + ")"
                            });
                        });
                    }
                    if (resetPasswordPrompt.length < 1) {
                        axios_1.default.put("" + apiAddress + userRoute, {
                            data: {
                                userId: id
                            }
                        }).then(function (resp) {
                            self.setState({
                                successMessage: "User sent reset password instructions"
                            });
                        }).catch(function (err) {
                            self.setState({
                                errorMessage: "Error (" + err.message + ")"
                            });
                        });
                    }
                }
            }
        };
        return _this;
    }
    UserCms.prototype.componentDidMount = function () {
        this.retreiveUsers();
    };
    UserCms.prototype.render = function () {
        var _this = this;
        var _a = this.props, logo = _a.logo, otherRoutes = _a.otherRoutes, userConfig = _a.userConfig;
        var _b = this.state, users = _b.users, errorMessage = _b.errorMessage;
        return (React.createElement(cms_1.Cms, { className: "cms-page" },
            React.createElement(cms_1.CmsHeader, { className: "cms-header", logo: logo },
                logo &&
                    React.createElement("div", { className: "header-logo" },
                        React.createElement("img", { src: logo })),
                otherRoutes.map(function (r, i) { return (React.createElement("div", { key: i, className: "route-link" },
                    React.createElement("a", { href: "/admin/" + util_1.slugify(r.name) }, r.name))); })),
            React.createElement("br", null),
            errorMessage &&
                React.createElement(alert_1.DangerAlert, null, errorMessage),
            React.createElement(cms_1.CmsBody, { className: "cms-body" },
                React.createElement("div", { className: "user-table-content" },
                    React.createElement("table", { className: "user-table" },
                        React.createElement("thead", null,
                            React.createElement("tr", null,
                                React.createElement("th", null, "ID"),
                                userConfig.map(function (uc) { return (React.createElement("th", null, uc.name)); }),
                                React.createElement("th", null))),
                        React.createElement("tbody", null, users && users.map(function (u) { return (React.createElement("tr", null,
                            React.createElement("td", null, u.id),
                            userConfig.map(function (uc) { return (React.createElement("td", null, u[uc.key])); }),
                            React.createElement("td", { className: "user-options" },
                                React.createElement(button_1.SuccessButton, { onClick: function () { return _this.sendResetPassword(u.id); } }, "Reset Password"),
                                " ",
                                React.createElement(button_1.DangerButton, { onClick: function () { return _this.deleteUser(u.id); } }, "Delete User")))); })))))));
    };
    UserCms.defaultProps = {
        userRoute: "/users",
        userConfig: [
            {
                name: "First Name",
                key: "firstName"
            },
            {
                name: "Last Name",
                key: "lastName"
            },
            {
                name: "Email",
                key: "email"
            }
        ]
    };
    return UserCms;
}(React.Component));
exports.default = UserCms;
;
