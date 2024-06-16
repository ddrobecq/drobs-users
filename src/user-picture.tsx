import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

type WebcamCaptureProps = {
  webcamRef: React.LegacyRef<Webcam> | undefined;
  facingMode: string;
};
export type Picture = string | null;

function WebcamCapture(props: WebcamCaptureProps) {
  const videoConstraints: MediaTrackConstraints = {
    width: 200,
    height: 200,
    facingMode: props.facingMode,
  };

  //    height={videoConstraints.height as number}
  //    width={videoConstraints.width as number}
  return (
    <Webcam
      audio={false}
      screenshotFormat="image/jpeg"
      videoConstraints={videoConstraints}
      {...props}
    />
  );
}

type UserPictureDialogProps = {
  open: boolean;
  onClose: (capture: Picture) => void;
};

export default function UserPictureDialog(props: UserPictureDialogProps) {
  const [facingMode, setFacingMode] = useState("user");
  const webcamRef = useRef<Webcam>(null);
  const capture = useCallback(() => {
    const imageSrc =
      webcamRef.current === null ? null : webcamRef.current.getScreenshot();
    props.onClose(imageSrc);
  }, [webcamRef, props]);
  //const onCancel = useMemo(() => () => props.onClose(false), [props]);

  function onCancel() {
    props.onClose(null);
  }

  function reverse() {
    if (facingMode === "user") {
      setFacingMode("environment");
    } else {
      setFacingMode("user");
    }
  }

  return (
    <Dialog open={props.open} onClose={onCancel}>
      <DialogTitle>Prendre une photo</DialogTitle>
      <DialogContent>
        <Box
          sx={{ borderRadius: 40, display: "flex", justifyContent: "center" }}
        >
          <WebcamCapture webcamRef={webcamRef} facingMode={facingMode} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Annuler</Button>
        <Button onClick={reverse} startIcon={<CameraswitchIcon />}>
          Reverse
        </Button>
        <Button
          onClick={capture}
          startIcon={<CameraAltIcon />}
          color={"success"}
        >
          Prendre
        </Button>
      </DialogActions>
    </Dialog>
  );
}
