"use strict";
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
exports.__esModule = true;
exports.SignUp = void 0;
var material_1 = require("@mui/material");
var formik_1 = require("formik");
var Yup = require("yup");
var react_router_dom_1 = require("react-router-dom");
var axios_1 = require("axios");
var react_1 = require("react");
var validationSchema = Yup.object().shape({
    username: Yup.string()
        .email("Некорректный формат электронной почты")
        .min(3, "Логин должен содержать не менее 3 символов")
        .required("Требуется ввести логин")
});
exports.SignUp = function () {
    var navigate = react_router_dom_1.useNavigate();
    var _a = react_1.useState(""), value = _a[0], setValue = _a[1];
    var checkEmailAvailability = function (email) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, axios_1["default"].post("https://simple-chat-api-production.up.railway.app/api/auth/sign-up/check-email", {
                            email: email
                        })];
                case 1:
                    response = _a.sent();
                    console.log("Проверка доступности электронной почты выполнена успешно");
                    console.log(response.data); // Результат проверки доступности электронной почты
                    // Если проверка email прошла успешно, отправить код подтверждения на почту
                    return [4 /*yield*/, sendConfirmationCode(email)];
                case 2:
                    // Если проверка email прошла успешно, отправить код подтверждения на почту
                    _a.sent();
                    // Очистить поле ввода после успешной отправки
                    setValue("");
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Ошибка при проверке доступности электронной почты", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var sendConfirmationCode = function (email) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].post("https://simple-chat-api-production.up.railway.app/api/auth/sign-up/check-confirm-code", {
                            email: email,
                            code: "121323"
                        })];
                case 1:
                    response = _a.sent();
                    console.log("Код подтверждения успешно отправлен");
                    console.log(response.data); // Результат отправки кода подтверждения
                    // Перенаправить пользователя на главную страницу
                    navigate("/");
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error("Ошибка при отправке кода подтверждения", error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleFormSubmit = function (values) {
        checkEmailAvailability(values.username);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(material_1.Box, { className: "login-page" },
            React.createElement(material_1.Typography, { variant: "h6", component: "div", className: "login-page-title" }, "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F"),
            React.createElement(formik_1.Formik, { initialValues: {
                    username: ""
                }, validationSchema: validationSchema, onSubmit: handleFormSubmit }, function (_a) {
                var isSubmitting = _a.isSubmitting;
                return (React.createElement(formik_1.Form, { className: "form" },
                    React.createElement("div", { className: "form-input form-username" },
                        React.createElement("label", { htmlFor: "username" }, "\u041B\u043E\u0433\u0438\u043D"),
                        React.createElement(formik_1.Field, { type: "text", id: "username", name: "username", value: value, onChange: function (e) { return setValue(e.target.value); } }),
                        React.createElement(formik_1.ErrorMessage, { name: "username", component: "div" })),
                    React.createElement(material_1.Button, { type: "submit", disabled: isSubmitting }, "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043A\u043E\u0434")));
            }))));
};
