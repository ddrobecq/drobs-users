'use client';
import { Skeleton, Stack } from "@mui/material";
import React from "react";
import useFetch from "./lib/fetchAPI";
import UserCard from "./user-card";
export default function Users(props) {
    const [data, isLoading] = useFetch("/users", "GET", "");
    const actions = (props.actions === undefined) ? true : props.actions;
    const direction = (props.direction === undefined) ? "row" : props.direction;
    return (React.createElement(Stack, { direction: "column", spacing: 2 },
        isLoading &&
            React.createElement(React.Fragment, null,
                React.createElement(Skeleton, { variant: 'rounded', height: 120 }),
                React.createElement(Skeleton, { variant: 'rounded', height: 120 }),
                React.createElement(Skeleton, { variant: 'rounded', height: 120 })),
        (data.length > 0) && data.map((user, index) => (React.createElement(UserCard, Object.assign({ key: index, id: user.usr_id, name: user.usr_name, direction: direction, actions: actions }, props)))),
        React.createElement(UserCard, Object.assign({ key: 'new', id: 0, name: "", direction: direction, actions: actions }, props))));
}
