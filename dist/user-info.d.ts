import React from "react";
type UserInfoProps = {
    id: number;
    direction: "row" | "column";
};
export default function UserInfo(props: UserInfoProps): React.JSX.Element;
type UserNameProps = {
    name: string;
};
export declare function UserName(props: UserNameProps): React.JSX.Element;
export {};
