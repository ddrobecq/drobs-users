import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import Users from "./user-list";

type UserSelectDialogProps = {
  url: string;
  open: boolean;
  onClose: () => void;
  onSelect: (id: number) => void;
};
export default function UserSelectDialog(props: UserSelectDialogProps) {
  function handleCancel() {
    props.onClose();
  }

  function handleSelect(id: number) {
    props.onSelect(id);
    props.onClose();
  }

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Sélectionnez un joueur</DialogTitle>
      <DialogContent>
        <Users url={props.url} actions={false} handleSelect={handleSelect} />
        <DialogActions>
          <Button onClick={handleCancel}>Annuler</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
