import React from "react";
export type Picture = string | null;
type UserPictureDialogProps = {
    open: boolean;
    onClose: (capture: Picture) => void;
};
export default function UserPictureDialog(props: UserPictureDialogProps): React.JSX.Element;
export {};
