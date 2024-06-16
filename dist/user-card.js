"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const user_info_1 = __importDefault(require("./user-info"));
const user_form_1 = __importDefault(require("./user-form"));
const react_2 = require("react");
function UserCard(props) {
    const [openUpdate, setOpenUpdate] = (0, react_2.useState)(false);
    function onUpdate(status) {
        setOpenUpdate(false);
        if (status) {
            if (window)
                window.location.reload();
        }
    }
    function handleSelect() {
        if (props.handleSelect) {
            props.handleSelect(props.id);
        }
        else {
            setOpenUpdate(true);
        }
    }
    return (react_1.default.createElement(material_1.Card, null,
        react_1.default.createElement(material_1.Stack, { direction: "row" },
            react_1.default.createElement(material_1.CardActionArea, { onClick: handleSelect },
                react_1.default.createElement(material_1.CardContent, null,
                    react_1.default.createElement(user_info_1.default, { url: props.url, id: props.id, direction: props.direction, size: props.size })))),
        react_1.default.createElement(user_form_1.default, { url: props.url, id: props.id, name: props.name, title: "Modifier un joueur", open: openUpdate, onClose: onUpdate })));
}
exports.default = UserCard;
