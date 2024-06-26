import React from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import UserSave from "./user-save";
import UserAvatar from "./user-avatar";
import UserPictureDialog, { Picture } from "./user-picture";

type UserFormProps = {
  url: string;
  id: number;
  name: string;
  title: string;
  open: boolean;
  onClose: (status: boolean) => void;
};

export default function UserForm(props: UserFormProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [name, setName] = useState(props.name);
  const [picture, setPicture] = useState<Picture>(null);
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

  function handleCloseCapture(capture: Picture) {
    if (capture !== null) setPicture(capture);
    setOpenCapture(false);
  }

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <Stack direction={"row"} spacing={1}>
          <Stack direction={"row"} spacing={-3} alignItems={"baseline"}>
            {picture ? (
              <Avatar
                alt={props.name}
                src={picture}
                sx={{ width: 90, height: 90 }}
              />
            ) : (
              <UserAvatar url={props.url} id={props.id} />
            )}
            <IconButton
              aria-label="change-avatar"
              size="large"
              onClick={openVideoCapture}
            >
              <CameraAltIcon />
            </IconButton>
          </Stack>
          <TextField
            defaultValue={name}
            label={"Nom du joueur"}
            onChange={(e) => setName(e.target.value)}
            variant={"filled"}
            size={"medium"}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Annuler</Button>
        {isUpdating ? (
          <UserSave
            url={props.url}
            id={props.id}
            name={name}
            picture={picture as string}
            onClose={onValidate}
          />
        ) : (
          <Button color={"success"} onClick={onUpdate} startIcon={<SaveIcon />}>
            Enregistrer
          </Button>
        )}
      </DialogActions>
      <UserPictureDialog open={openCapture} onClose={handleCloseCapture} />
    </Dialog>
  );
}
