import React, { Key } from "react";
type UserCardProps = {
    key?: Key;
    id: number;
    name: string;
    handleSelect?: (id: number) => void;
};
export default function UserCard(props: UserCardProps): React.JSX.Element;
export {};
