import React from "react";
import { UserSize } from "./lib/common";
type UserInfoProps = {
    url: string;
    id: number;
    direction?: "row" | "column";
    size?: UserSize;
};
export default function UserInfo(props: UserInfoProps): React.JSX.Element;
type UserNameProps = {
    name: string;
    size?: UserSize;
};
export declare function UserName(props: UserNameProps): React.JSX.Element;
export {};
