"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
const fetchAPI_1 = __importDefault(require("./lib/fetchAPI"));
const user_card_1 = __importDefault(require("./user-card"));
function Users(props) {
    const [data, isLoading] = (0, fetchAPI_1.default)(`${props.url}/users`, "GET", "");
    const actions = props.actions === undefined ? true : props.actions;
    const direction = props.direction === undefined ? "row" : props.direction;
    const height = props.size === "small" ? 90 : 120;
    if (isLoading)
        return react_1.default.createElement("div", null);
    else
        return (react_1.default.createElement(material_1.Stack, { direction: "column", spacing: 2 },
            isLoading && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(material_1.Skeleton, { variant: "rounded", height: height }),
                react_1.default.createElement(material_1.Skeleton, { variant: "rounded", height: height }),
                react_1.default.createElement(material_1.Skeleton, { variant: "rounded", height: height }))),
            data.length > 0 &&
                data.map((user, index) => (react_1.default.createElement(user_card_1.default, { url: props.url, key: index, id: user.usr_id, name: user.usr_name, direction: direction, actions: actions, size: props.size }))),
            react_1.default.createElement(user_card_1.default, { url: props.url, key: "new", id: 0, name: "", direction: direction, actions: actions, size: props.size })));
}
exports.default = Users;
