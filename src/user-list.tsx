"use client";

import {
  Card,
  CardActionArea,
  CardContent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import useFetch from "./lib/fetchAPI";
import UserCard from "./user-card";
import { UserSize, User } from "./lib/common";

type UserProps = {
  url: string;
  actions?: boolean;
  direction?: "row" | "column";
  handleSelect?: (id: number) => void;
  size?: UserSize;
};

export default function Users(props: UserProps): JSX.Element {
  const [data, isLoading] = useFetch(`${props.url}/users`, "GET", "");
  const actions = props.actions === undefined ? true : props.actions;
  const direction = props.direction === undefined ? "row" : props.direction;
  const height = props.size === "small" ? 90 : 120;

  if (isLoading) return <div></div>;
  else
    return (
      <Stack direction={"column"} spacing={2}>
        {isLoading && (
          <>
            <Skeleton variant={"rounded"} height={height} />
            <Skeleton variant={"rounded"} height={height} />
            <Skeleton variant={"rounded"} height={height} />
          </>
        )}
        {data.length > 0 &&
          data.map((user: User, index: number) => (
            <UserCard
              url={props.url}
              key={index}
              id={user.usr_id}
              name={user.usr_name}
              direction={direction}
              actions={actions}
              size={props.size}
            />
          ))}
        <UserCard
          url={props.url}
          key={"new"}
          id={0}
          name={""}
          direction={direction}
          actions={actions}
          size={props.size}
        />
      </Stack>
    );
}
