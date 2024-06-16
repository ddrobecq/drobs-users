import React from "react";
type UserFormProps = {
    url: string;
    id: number;
    name: string;
    title: string;
    open: boolean;
    onClose: (status: boolean) => void;
};
export default function UserForm(props: UserFormProps): React.JSX.Element;
export {};
