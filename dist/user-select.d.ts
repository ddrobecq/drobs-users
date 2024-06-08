import React from "react";
type UserSelectDialogProps = {
    open: boolean;
    onClose: () => void;
    onSelect: (id: number) => void;
};
export default function UserSelectDialog(props: UserSelectDialogProps): React.JSX.Element;
export {};
