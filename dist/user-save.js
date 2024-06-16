"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const lab_1 = require("@mui/lab");
const fetchAPI_1 = __importDefault(require("./lib/fetchAPI"));
const react_2 = require("react");
const material_1 = require("@mui/material");
function UserSave(props) {
    const method = props.id == 0 ? "POST" : "PUT";
    const url = props.url + (props.id == 0) ? "/users" : `/users/${props.id}`;
    const [result, isSaving] = (0, fetchAPI_1.default)(url, method, strUserBody(props.name, props.picture));
    const [error, setError] = (0, react_2.useState)(false);
    const [updated, setUpdated] = (0, react_2.useState)(false);
    /* BUILD JSON BODY FOR SAVNG A USER */
    function strUserBody(name, picture) {
        let body = {};
        if (picture) {
            body = {
                usr_name: name,
                usr_avatar: picture,
            };
        }
        else {
            body = {
                usr_name: name,
            };
        }
        const strBody = JSON.stringify(body);
        return strBody;
    }
    (0, react_2.useEffect)(() => {
        if (result) {
            /*            if (result.affectedRows == 1) {*/
            setUpdated(true);
        }
        else {
            setError(true);
        }
        //}
    }, [result]);
    (0, react_2.useEffect)(() => {
        if (updated) {
            props.onClose();
        }
    }, [props, updated]);
    return (react_1.default.createElement(react_1.default.Fragment, null, error ? (react_1.default.createElement(material_1.Button, { color: "error" }, "Erreur")) : (react_1.default.createElement(lab_1.LoadingButton, { loading: isSaving, disabled: true },
        react_1.default.createElement("span", null, "Enregistrer")))));
}
exports.default = UserSave;
