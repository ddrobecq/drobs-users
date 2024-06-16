"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const CameraAlt_1 = __importDefault(require("@mui/icons-material/CameraAlt"));
const Save_1 = __importDefault(require("@mui/icons-material/Save"));
const react_2 = require("react");
const user_save_1 = __importDefault(require("./user-save"));
const user_avatar_1 = __importDefault(require("./user-avatar"));
const user_picture_1 = __importDefault(require("./user-picture"));
function UserForm(props) {
    const [isUpdating, setIsUpdating] = (0, react_2.useState)(false);
    const [name, setName] = (0, react_2.useState)(props.name);
    const [picture, setPicture] = (0, react_2.useState)(null);
    const [openCapture, setOpenCapture] = (0, react_2.useState)(false);
    function onCancel() {
        props.onClose(false);
    }
    function onUpdate() {
        setIsUpdating(true);
    }
    function onValidate() {
        props.onClose(true);
    }
    function openVideoCapture() {
        setOpenCapture(true);
    }
    function handleCloseCapture(capture) {
        if (capture !== null)
            setPicture(capture);
        setOpenCapture(false);
    }
    return (react_1.default.createElement(material_1.Dialog, { open: props.open, onClose: props.onClose },
        react_1.default.createElement(material_1.DialogTitle, null, props.title),
        react_1.default.createElement(material_1.DialogContent, null,
            react_1.default.createElement(material_1.Stack, { direction: "row", spacing: 1 },
                react_1.default.createElement(material_1.Stack, { direction: "row", spacing: -3, alignItems: "baseline" },
                    picture ? (react_1.default.createElement(material_1.Avatar, { alt: props.name, src: picture, sx: { width: 90, height: 90 } })) : (react_1.default.createElement(user_avatar_1.default, { url: props.url, id: props.id })),
                    react_1.default.createElement(material_1.IconButton, { "aria-label": "change-avatar", size: "large", onClick: openVideoCapture },
                        react_1.default.createElement(CameraAlt_1.default, null))),
                react_1.default.createElement(material_1.TextField, { defaultValue: name, label: "Nom du joueur", onChange: (e) => setName(e.target.value), variant: "filled", size: "medium" }))),
        react_1.default.createElement(material_1.DialogActions, null,
            react_1.default.createElement(material_1.Button, { onClick: onCancel }, "Annuler"),
            isUpdating ? (react_1.default.createElement(user_save_1.default, { url: props.url, id: props.id, name: name, picture: picture, onClose: onValidate })) : (react_1.default.createElement(material_1.Button, { color: "success", onClick: onUpdate, startIcon: react_1.default.createElement(Save_1.default, null) }, "Enregistrer"))),
        react_1.default.createElement(user_picture_1.default, { open: openCapture, onClose: handleCloseCapture })));
}
exports.default = UserForm;
