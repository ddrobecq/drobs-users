"use client";

import React, { Key } from "react";
import { Card, CardActionArea, CardContent, Stack } from "@mui/material";
import UserInfo from "./user-info";
import UserForm from "./user-form";
import { useState } from "react";
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

export default function UserCard(props: UserCardProps) {
  const [openUpdate, setOpenUpdate] = useState(false);
  
  function onUpdate(status: boolean) {
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
    <Card>
      <Stack direction={"row"}>
        <CardActionArea onClick={handleSelect}>
          <CardContent>
            <UserInfo url={props.url} id={props.id} direction={props.direction} size={props.size} />
          </CardContent>
        </CardActionArea>
      </Stack>
      <UserForm
        url={props.url}
        id={props.id}
        name={props.name}
        title={"Modifier un joueur"}
        open={openUpdate}
        onClose={onUpdate}
      />
    </Card>
  );
}
