import React from "react";
import { UserSize } from "./lib/common";
type UserAvatarProps = {
    url?: string;
    id: number;
    name?: string;
    size?: UserSize;
};
export default function UserAvatar(props: UserAvatarProps): React.JSX.Element;
export {};
