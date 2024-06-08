'use client';
import React from "react";
import { Card, CardActionArea, CardContent, Stack } from "@mui/material";
import UserInfo from "./user-info";
import UserForm from "./user-form";
import { useState } from "react";
export default function UserCard(props) {
    const [openUpdate, setOpenUpdate] = useState(false);
    function onUpdate(status) {
        setOpenUpdate(false);
        if (status) {
            if (window)
                window.location.reload();
        }
    }
    function handleSelect() {
        if (props.handleSelect) {
            props.handleSelect(props.id);
        }
        else {
            setOpenUpdate(true);
        }
    }
    return (React.createElement(Card, null,
        React.createElement(Stack, { direction: "row" },
            React.createElement(CardActionArea, { onClick: handleSelect },
                React.createElement(CardContent, null,
                    React.createElement(UserInfo, { id: props.id, direction: 'row' })))),
        React.createElement(UserForm, { id: props.id, name: props.name, title: "Modifier un joueur", open: openUpdate, onClose: onUpdate })));
}
