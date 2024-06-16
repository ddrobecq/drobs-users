import React from "react";
import { Skeleton, Stack, Typography } from "@mui/material";
import useFetch from "./lib/fetchAPI";
import UserAvatar from "./user-avatar";
import { UserSize } from "./lib/common";

type UserInfoProps = {
  url: string;
  id: number;
  direction?: "row" | "column";
  size?: UserSize;
};

export default function UserInfo(props: UserInfoProps) {
  const id = props.id ? props.id : 0;
  const spacing = props.direction === "row" ? 4 : 1;

  return (
    <Stack direction={"column"}>
      <Stack
        direction={props.direction}
        alignItems={"center"}
        spacing={spacing}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          {id === 0 ? (
            <UserInfoNew size={props.size} /> //new player
          ) : (
            <UserInfoData url={props.url} id={props.id} size={props.size} />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
type UserNewProps = {
  size?: UserSize;
};
function UserInfoNew(props: UserNewProps) {
  return (
    <>
      <UserAvatar id={0} size={props.size} />
      <UserName name={"Nouveau joueur"} size={props.size} />
    </>
  );
}

function UserInfoData(props: UserInfoProps) {
  const [data, isLoading] = useFetch(
    `${props.url}/users/${props.id}`,
    "GET",
    "",
  );

  return (
    <>
      <UserAvatar {...props} size={props.size} />
      <UserName name={data && data.length > 0 ? data[0].usr_name : ""} size={props.size} />
    </>
  );
}

type UserNameProps = {
  name: string;
  size?: UserSize;
};

export function UserName(props: UserNameProps) {
  const width = props.size === "small" ? 100 : 200;
  return (
    <Typography align="center" variant={"h1"}>
      {props.name !== "" ? (
        props.name
      ) : (
        <Skeleton variant={"text"} width={width} />
      )}
    </Typography>
  );
}
