"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const user_list_1 = __importDefault(require("./user-list"));
function UserSelectDialog(props) {
    function handleCancel() {
        props.onClose();
    }
    function handleSelect(id) {
        props.onSelect(id);
        props.onClose();
    }
    return (react_1.default.createElement(material_1.Dialog, { open: props.open, onClose: props.onClose },
        react_1.default.createElement(material_1.DialogTitle, null, "S\u00E9lectionnez un joueur"),
        react_1.default.createElement(material_1.DialogContent, null,
            react_1.default.createElement(user_list_1.default, { url: props.url, actions: false, handleSelect: handleSelect }),
            react_1.default.createElement(material_1.DialogActions, null,
                react_1.default.createElement(material_1.Button, { onClick: handleCancel }, "Annuler")))));
}
exports.default = UserSelectDialog;
