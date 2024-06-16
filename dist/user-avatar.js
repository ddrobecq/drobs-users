"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const PersonAdd_1 = __importDefault(require("@mui/icons-material/PersonAdd"));
const fetchAPI_1 = __importDefault(require("./lib/fetchAPI"));
function UserAvatar(props) {
    const size = props.size ? props.size : 'large';
    const id = props.id ? props.id : 0;
    if (id === 0)
        return react_1.default.createElement(UserAvatarNew, { size: size });
    else
        return react_1.default.createElement(UserAvatarImage, Object.assign({}, props));
}
exports.default = UserAvatar;
function UserAvatarNew(props) {
    let fontSize;
    let size;
    switch (props.size) {
        case "small":
            fontSize = 40;
            size = 40;
            break;
        case "medium":
            fontSize = 50;
            size = 50;
            break;
        case "large":
            fontSize = 70;
            size = 90;
            break;
    }
    return (react_1.default.createElement(material_1.Avatar, { sx: { width: size, height: size } },
        react_1.default.createElement(material_1.SvgIcon, { component: PersonAdd_1.default, sx: { fontSize: fontSize } })));
}
function UserAvatarImage(props) {
    const size = props.size ? props.size : 'large';
    let dim;
    switch (props.size) {
        case "small":
            dim = 40;
            break;
        case "medium":
            dim = 50;
            break;
        case "large":
            dim = 90;
            break;
        default:
            dim = 90;
    }
    const [data, isLoading] = (0, fetchAPI_1.default)(`${props.url}/users/${props.id}/image`, "GET", "");
    const image = data && data.length > 0 ? data[0].usr_avatar : "";
    if (isLoading)
        return react_1.default.createElement(material_1.Avatar, { sx: { width: dim, height: dim } });
    else {
        return (react_1.default.createElement(material_1.Avatar, { alt: props.name, src: image, sx: { width: dim, height: dim } }));
    }
}
