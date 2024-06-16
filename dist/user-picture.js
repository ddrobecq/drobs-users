"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const react_webcam_1 = __importDefault(require("react-webcam"));
const react_2 = require("react");
const Cameraswitch_1 = __importDefault(require("@mui/icons-material/Cameraswitch"));
const CameraAlt_1 = __importDefault(require("@mui/icons-material/CameraAlt"));
function WebcamCapture(props) {
    const videoConstraints = {
        width: 200,
        height: 200,
        facingMode: props.facingMode,
    };
    //    height={videoConstraints.height as number}
    //    width={videoConstraints.width as number}
    return (react_1.default.createElement(react_webcam_1.default, Object.assign({ audio: false, screenshotFormat: "image/jpeg", videoConstraints: videoConstraints }, props)));
}
function UserPictureDialog(props) {
    const [facingMode, setFacingMode] = (0, react_2.useState)("user");
    const webcamRef = (0, react_2.useRef)(null);
    const capture = (0, react_2.useCallback)(() => {
        const imageSrc = webcamRef.current === null ? null : webcamRef.current.getScreenshot();
        props.onClose(imageSrc);
    }, [webcamRef, props]);
    //const onCancel = useMemo(() => () => props.onClose(false), [props]);
    function onCancel() {
        props.onClose(null);
    }
    function reverse() {
        if (facingMode === "user") {
            setFacingMode("environment");
        }
        else {
            setFacingMode("user");
        }
    }
    return (react_1.default.createElement(material_1.Dialog, { open: props.open, onClose: onCancel },
        react_1.default.createElement(material_1.DialogTitle, null, "Prendre une photo"),
        react_1.default.createElement(material_1.DialogContent, null,
            react_1.default.createElement(material_1.Box, { sx: { borderRadius: 40, display: "flex", justifyContent: "center" } },
                react_1.default.createElement(WebcamCapture, { webcamRef: webcamRef, facingMode: facingMode }))),
        react_1.default.createElement(material_1.DialogActions, null,
            react_1.default.createElement(material_1.Button, { onClick: onCancel }, "Annuler"),
            react_1.default.createElement(material_1.Button, { onClick: reverse, startIcon: react_1.default.createElement(Cameraswitch_1.default, null) }, "Reverse"),
            react_1.default.createElement(material_1.Button, { onClick: capture, startIcon: react_1.default.createElement(CameraAlt_1.default, null), color: "success" }, "Prendre"))));
}
exports.default = UserPictureDialog;
