import React from "react";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField } from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react";
import UserSave from "./user-save";
import UserAvatar from "./user-avatar";
import UserPictureDialog from "./user-picture";
export default function UserForm(props) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [name, setName] = useState(props.name);
    const [picture, setPicture] = useState(null);
    const [openCapture, setOpenCapture] = useState(false);
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
        if (capture)
            setPicture(capture);
        setOpenCapture(false);
    }
    return (React.createElement(Dialog, { open: props.open, onClose: props.onClose },
        React.createElement(DialogTitle, null, props.title),
        React.createElement(DialogContent, null,
            React.createElement(Stack, { direction: "row", spacing: 1 },
                React.createElement(Stack, { direction: "row", spacing: -3, alignItems: 'baseline' },
                    (picture)
                        ? React.createElement(Avatar, { alt: props.name, src: picture, sx: { width: 90, height: 90 } })
                        : React.createElement(UserAvatar, { id: props.id }),
                    React.createElement(IconButton, { "aria-label": "change-avatar", size: "large", onClick: openVideoCapture },
                        React.createElement(CameraAltIcon, null))),
                React.createElement(TextField, { defaultValue: name, label: 'Nom du joueur', onChange: (e) => setName(e.target.value), variant: 'filled', size: 'medium' }))),
        React.createElement(DialogActions, null,
            React.createElement(Button, { onClick: onCancel }, "Annuler"),
            (isUpdating)
                ? React.createElement(UserSave, { id: props.id, name: name, picture: picture, onClose: onValidate })
                : React.createElement(Button, { color: "success", onClick: onUpdate, startIcon: React.createElement(SaveIcon, null) }, "Enregistrer")),
        React.createElement(UserPictureDialog, { open: openCapture, onClose: handleCloseCapture })));
}
