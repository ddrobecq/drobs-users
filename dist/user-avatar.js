import React from "react";
import { Avatar, Stack, SvgIcon } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import useFetch from "./lib/fetchAPI";
export default function UserAvatar(props) {
    const id = (props.id) ? props.id : 0;
    const [data, isLoading] = useFetch(`/users/${id}/image`, 'GET', null);
    const image = (data && data.length > 0) ? data[0].usr_avatar : null;
    return (React.createElement(Stack, { direction: "column", alignItems: 'center' }, (id === 0)
        ? React.createElement(Avatar, { sx: { width: 90, height: 90 } },
            React.createElement(SvgIcon, { component: PersonAddIcon, sx: { fontSize: 70 } }))
        : (isLoading)
            ? React.createElement(Avatar, { sx: { width: 90, height: 90 } })
            : React.createElement(Avatar, { alt: props.name, src: image, sx: { width: 90, height: 90 } })));
}
