"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserName = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const fetchAPI_1 = __importDefault(require("./lib/fetchAPI"));
const user_avatar_1 = __importDefault(require("./user-avatar"));
function UserInfo(props) {
    const id = props.id ? props.id : 0;
    const spacing = props.direction === "row" ? 4 : 1;
    return (react_1.default.createElement(material_1.Stack, { direction: "column" },
        react_1.default.createElement(material_1.Stack, { direction: props.direction, alignItems: "center", spacing: spacing },
            react_1.default.createElement(material_1.Stack, { direction: "row", alignItems: "center", spacing: 2 }, id === 0 ? (react_1.default.createElement(UserInfoNew, { size: props.size }) //new player
            ) : (react_1.default.createElement(UserInfoData, { url: props.url, id: props.id, size: props.size }))))));
}
exports.default = UserInfo;
function UserInfoNew(props) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(user_avatar_1.default, { id: 0, size: props.size }),
        react_1.default.createElement(UserName, { name: "Nouveau joueur", size: props.size })));
}
function UserInfoData(props) {
    const [data, isLoading] = (0, fetchAPI_1.default)(`${props.url}/users/${props.id}`, "GET", "");
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(user_avatar_1.default, Object.assign({}, props, { size: props.size })),
        react_1.default.createElement(UserName, { name: data && data.length > 0 ? data[0].usr_name : "", size: props.size })));
}
function UserName(props) {
    const width = props.size === "small" ? 100 : 200;
    return (react_1.default.createElement(material_1.Typography, { align: "center", variant: "h1" }, props.name !== "" ? (props.name) : (react_1.default.createElement(material_1.Skeleton, { variant: "text", width: width }))));
}
exports.UserName = UserName;
