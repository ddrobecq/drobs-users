import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box } from "@mui/material";
import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
function WebcamCapture(props) {
    const videoConstraints = {
        width: 200,
        height: 200,
        facingMode: props.facingMode
    };
    return (React.createElement(Webcam, { audio: false, height: videoConstraints.height, screenshotFormat: "image/jpeg", width: videoConstraints.width, ref: props.webcamRef, videoConstraints: videoConstraints }));
}
export default function UserPictureDialog(props) {
    const [facingMode, setFacingMode] = useState("user");
    const webcamRef = useRef(null);
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        props.onClose(imageSrc);
    }, [webcamRef, props]);
    //const onCancel = useMemo(() => () => props.onClose(false), [props]);
    function onCancel() {
        props.onClose(false);
    }
    function reverse() {
        if (facingMode === "user") {
            setFacingMode("environment");
        }
        else {
            setFacingMode("user");
        }
    }
    return (React.createElement(Dialog, { open: props.open, onClose: onCancel },
        React.createElement(DialogTitle, null, "Prendre une photo"),
        React.createElement(DialogContent, null,
            React.createElement(Box, { sx: { borderRadius: 40, display: 'flex', justifyContent: 'center' } },
                React.createElement(WebcamCapture, { webcamRef: webcamRef, facingMode: facingMode }))),
        React.createElement(DialogActions, null,
            React.createElement(Button, { onClick: onCancel }, "Annuler"),
            React.createElement(Button, { onClick: reverse, startIcon: React.createElement(CameraswitchIcon, null) }, "Reverse"),
            React.createElement(Button, { onClick: capture, startIcon: React.createElement(CameraAltIcon, null), color: 'success' }, "Prendre"))));
}
