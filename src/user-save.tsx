import React from "react";
import { LoadingButton } from "@mui/lab";
import useFetch from "./lib/fetchAPI";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

type UserSaveProps = {
  url: string;
  id: number;
  name: string;
  picture: string;
  onClose: () => void;
};
export default function UserSave(props: UserSaveProps) {
  const method = props.id == 0 ? "POST" : "PUT";
  const url = props.url + (props.id == 0) ? "/users" : `/users/${props.id}`;
  const [result, isSaving] = useFetch(
    url,
    method,
    strUserBody(props.name, props.picture),
  );
  const [error, setError] = useState(false);
  const [updated, setUpdated] = useState(false);

  /* BUILD JSON BODY FOR SAVNG A USER */
  function strUserBody(name: string, picture: string | null) {
    let body = {};
    if (picture) {
      body = {
        usr_name: name,
        usr_avatar: picture,
      };
    } else {
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
    } else {
      setError(true);
    }
    //}
  }, [result]);

  useEffect(() => {
    if (updated) {
      props.onClose();
    }
  }, [props, updated]);

  return (
    <>
      {error ? (
        <Button color={"error"}>Erreur</Button>
      ) : (
        <LoadingButton loading={isSaving} disabled>
          <span>Enregistrer</span>
        </LoadingButton>
      )}
    </>
  );
}
