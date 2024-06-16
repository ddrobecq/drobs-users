"use client";

import { useState, useEffect } from "react";
type Data = Array<any>;

// **********************************************
// function : useFetch
//  path : path to add to the URL to call API (ex: /users)
//  method : method to call API's resources (GET, POST, PUT, DELETE)
//  strPayLoad : JSON string to send to the API
//  return : [Data, boolean]
// description : to use as a React hook
// **********************************************
export default function useFetch(
  url: string,
  method: string,
  strPayLoad: string,
): [Data, boolean] {
  const [data, setData] = useState<Data>([]);
  const [isLoading, setIsLoading] = useState(true);
  const bRetry = method === "GET" ? true : false;

  useEffect(() => {
    if (url) {
      callAPI(url, method, strPayLoad, bRetry).then(
        (results) => {
          setData(results);
          setIsLoading(false);
        },
        () => {
          setData([]);
          setIsLoading(false);
        },
      );
    }
  }, [url, method, strPayLoad, bRetry]);

  return [data, isLoading];
}

/* RETURN AJAX API CALL */
function callAPI(
  path: string,
  method: string,
  payLoad: string,
  retry: boolean,
) {
  type Error = {
    status: number;
    error: string;
  };
  return new Promise(
    (resolve: (value: Data) => void, reject: (reason: Error) => void) => {
      let xhr = new XMLHttpRequest();
      xhr.open(method, path);
      xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      xhr.responseType = "json";
      xhr.onload = function () {
        if (this.status === 200) {
          resolve(this.response);
        } else {
          console.error(
            "received : ",
            `ERROR ${this.status}`,
            JSON.stringify(this.response),
          );
          reject({
            status: this.status,
            error: JSON.stringify(this.response),
          });
        }
      };
      xhr.onerror = function (error) {
        console.error(
          `received : ERROR ${this.status} on request ${method} ${path}`,
          error,
        );
        if (retry) {
          console.error("retry:", `${method} ${path}`);
          return callAPI(path, method, payLoad, false);
        } else
          reject({
            status: this.status,
            error: error.type,
          });
      };
      xhr.ontimeout = function (error) {
        console.error(
          `received : TIMEOUT ${this.status} on request ${method} ${path}`,
          error,
        );
        reject({
          status: 408,
          error: error.type,
        });
      };
      xhr.send(payLoad);
      console.debug("sent : ", `${method} ${path} ${payLoad}`);
    },
  );
}
