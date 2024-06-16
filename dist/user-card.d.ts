import React, { Key } from "react";
import { UserSize } from "./lib/common";
type UserCardProps = {
    url: string;
    key?: Key;
    id: number;
    name: string;
    direction?: "row" | "column";
    actions?: boolean;
    handleSelect?: (id: number) => void;
    size?: UserSize;
};
export default function UserCard(props: UserCardProps): React.JSX.Element;
export {};
