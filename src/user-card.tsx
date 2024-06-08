'use client';

import React, { Key } from "react";
import { Card, CardActionArea, CardContent, Stack } from "@mui/material";
import UserInfo from "./user-info";
import UserForm from "./user-form";
import { useState } from "react";

type UserCardProps = {
    key?: Key,
    id: number,
    name: string,
    handleSelect?: (id: number) => void,
}

export default function UserCard (props: UserCardProps) {
    const [openUpdate, setOpenUpdate] = useState(false);
    function onUpdate (status:boolean) {
        setOpenUpdate(false);
        if (status) {
            if (window) window.location.reload();
        }
    }

    function handleSelect() {
        if (props.handleSelect) {
            props.handleSelect(props.id);
        } else {
            setOpenUpdate(true);
        }
    }

    return (
        <Card >
            <Stack direction={"row"} >
                <CardActionArea onClick={handleSelect} >
                    <CardContent>
                        <UserInfo id={props.id} direction={'row'} />
                    </CardContent>
                </CardActionArea>
            </Stack>
            <UserForm id={props.id} name={props.name} title={"Modifier un joueur"} open={openUpdate} onClose={onUpdate} />
        </Card>
    );
}