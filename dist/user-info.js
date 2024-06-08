import React from "react";
import { Skeleton, Stack, Typography } from "@mui/material";
import useFetch from "./lib/fetchAPI";
import UserAvatar from "./user-avatar";
export default function UserInfo(props) {
    const id = (props.id) ? props.id : 0;
    const [data, isLoading] = useFetch(`/users/${id}`, "GET", null);
    const spacing = (props.direction === 'row') ? 4 : 1;
    return (React.createElement(Stack, { direction: "column" },
        React.createElement(Stack, { direction: props.direction, alignItems: 'center', spacing: spacing }, (id === 0) // New player
            ? React.createElement(React.Fragment, null,
                React.createElement(UserAvatar, { id: 0 }),
                React.createElement(UserName, { name: 'Nouveau joueur' }))
            : React.createElement(React.Fragment, null,
                React.createElement(UserAvatar, { id: props.id }),
                React.createElement(UserName, { name: data && data.length > 0 ? data[0].usr_name : null })))));
}
export function UserName(props) {
    return (React.createElement(Typography, { align: 'center', variant: "h1" }, (props.name) ? props.name : React.createElement(Skeleton, { variant: "text", width: 100 })));
}
