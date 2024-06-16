import React from "react";
import { Avatar, Stack, SvgIcon } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import useFetch from "./lib/fetchAPI";
import { UserSize } from "./lib/common";

type UserAvatarProps = {
  url?: string;
  id: number;
  name?: string;
  size?: UserSize;
};
export default function UserAvatar(props: UserAvatarProps) {
  const size = props.size ? props.size : 'large';
  const id = props.id ? props.id : 0;

  if (id === 0) return <UserAvatarNew size={size} />;
  else
    return <UserAvatarImage {...props} />;
}

type UserAvatarSizeProps = {
  size: UserSize;
};

function UserAvatarNew(props: UserAvatarSizeProps) {
  let fontSize: number;
  let size: number;
  switch (props.size) {
    case "small":
      fontSize = 40;
      size = 40;
      break;
    case "medium":
      fontSize = 50;
      size = 50;
      break;
    case "large":
      fontSize = 70;
      size = 90;
      break;
  }

  return (
    <Avatar sx={{ width: size, height: size }} >
      <SvgIcon component={PersonAddIcon} sx={{ fontSize: fontSize}}  />
    </Avatar>
  );
}

function UserAvatarImage(props: UserAvatarProps) {
  const size = props.size ? props.size : 'large';
  let dim: number;
  switch (props.size) {
    case "small":
      dim = 40;
      break;
    case "medium":
      dim = 50;
      break;
    case "large":
      dim = 90;
      break;
    default:
      dim = 90;
  }
  const [data, isLoading] = useFetch(
    `${props.url}/users/${props.id}/image`,
    "GET",
    "",
  );
  const image = data && data.length > 0 ? data[0].usr_avatar : "";

  if (isLoading) return <Avatar sx={{ width: dim, height: dim }} />;
  else {
    return (
      <Avatar alt={props.name} src={image} sx={{ width: dim, height: dim }} />
    );
  }
}
