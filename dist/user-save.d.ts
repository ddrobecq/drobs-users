import React from "react";
type UserSaveProps = {
    url: string;
    id: number;
    name: string;
    picture: string;
    onClose: () => void;
};
export default function UserSave(props: UserSaveProps): React.JSX.Element;
export {};
