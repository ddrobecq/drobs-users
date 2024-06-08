import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import Users from "./user-list";
export default function UserSelectDialog(props) {
    function handleCancel() {
        props.onClose();
    }
    function handleSelect(id) {
        props.onSelect(id);
        props.onClose();
    }
    return (React.createElement(Dialog, { open: props.open, onClose: props.onClose },
        React.createElement(DialogTitle, null, "S\u00E9lectionnez un joueur"),
        React.createElement(DialogContent, null,
            React.createElement(Users, { actions: false, handleSelect: handleSelect }),
            React.createElement(DialogActions, null,
                React.createElement(Button, { onClick: handleCancel }, "Annuler")))));
}
