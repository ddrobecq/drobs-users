'use client';

import { Skeleton, Stack } from "@mui/material";
import React from "react";
import useFetch from "./lib/fetchAPI";
import UserCard from "./user-card";

type UserProps = {
  actions?: boolean,
  direction?: "row" | "column",
  handleSelect?: (id: number) => void,
}
type User = {
  usr_id: number,
  usr_name: string,
  usr_avatar: string,
}

export default function Users(props: UserProps): JSX.Element {
    const [data, isLoading] = useFetch ("/users", "GET", "");
    const actions = (props.actions === undefined) ? true : props.actions;
    const direction = (props.direction === undefined) ? "row" : props.direction;

    return (
      <Stack direction={"column"} spacing={2} >
        {isLoading && 
          <>
          <Skeleton variant={'rounded'} height={120} />
          <Skeleton variant={'rounded'} height={120}/>
          <Skeleton variant={'rounded'} height={120}/>
          </>
        }
        {(data.length>0) && data.map((user:User, index:number) => (
            <UserCard key={index} id={user.usr_id} name={user.usr_name} direction={direction} actions={actions} {...props} />
        ))}
        <UserCard key={'new'} id={0} name={""} direction={direction} actions={actions} {...props} />
      </Stack>
    )
}