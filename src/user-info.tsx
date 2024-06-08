import React from "react";
import { Skeleton, Stack, Typography } from "@mui/material";
import useFetch from "./lib/fetchAPI";
import UserAvatar from "./user-avatar";

type UserInfoProps = {
    id: number,
    direction: "row" | "column",
}

export default function UserInfo (props: UserInfoProps) {
    const id = (props.id) ? props.id : 0;
    const [data, isLoading] = useFetch (`/users/${id}`, "GET", null);
    const spacing = (props.direction === 'row') ? 4 : 1;

    return (
        <Stack direction={"column"} >
            <Stack direction={props.direction} alignItems={'center'} spacing={spacing} >
                {(id === 0) // New player
                ?   <>
                        <UserAvatar id={0} />
                        <UserName name={'Nouveau joueur'} />
                    </>
                :   <>
                        <UserAvatar id={props.id} />
                        <UserName name={data && data.length>0 ? data[0].usr_name : null} />
                    </>
                }
            </Stack>
        </Stack>
);
}

type UserNameProps = {
    name: string,
}
   
export function UserName (props: UserNameProps) {
    return (
        <Typography align='center' variant={"h1"}>
            {(props.name) ? props.name : <Skeleton variant="text" width={100} />}
        </Typography>
    );
}