import React from "react";
import { LoadingButton } from '@mui/lab';
import useFetch from "./lib/fetchAPI";
import { useEffect, useState } from "react";
import { Button } from '@mui/material';
export default function UserSave(props) {
    const method = (props.id == 0) ? 'POST' : 'PUT';
    const url = (props.id == 0) ? '/users' : `/users/${props.id}`;
    const [result, isSaving] = useFetch(url, method, strUserBody(props.name, props.picture));
    const [error, setError] = useState(false);
    const [updated, setUpdated] = useState(false);
    /* BUILD JSON BODY FOR SAVNG A USER */
    function strUserBody(name, picture) {
        let body = {};
        if (picture) {
            body = {
                usr_name: name,
                usr_avatar: picture,
            };
        }
        else {
            body = {
                usr_name: name,
            };
        }
        const strBody = JSON.stringify(body);
        return strBody;
    }
    useEffect(() => {
        if (result) {
            /*            if (result.affectedRows == 1) {*/
            setUpdated(true);
        }
        else {
            setError(true);
        }
        //} 
    }, [result]);
    useEffect(() => {
        if (updated) {
            props.onClose();
        }
    }, [props, updated]);
    return (React.createElement(React.Fragment, null, (error)
        ? React.createElement(Button, { color: 'error' }, "Erreur")
        : React.createElement(LoadingButton, { loading: isSaving, disabled: true },
            React.createElement("span", null, "Enregistrer"))));
}
