"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
// **********************************************
// function : useFetch
//  path : path to add to the URL to call API (ex: /users)
//  method : method to call API's resources (GET, POST, PUT, DELETE)
//  strPayLoad : JSON string to send to the API
//  return : [Data, boolean]
// description : to use as a React hook
// **********************************************
function useFetch(url, method, strPayLoad) {
    const [data, setData] = (0, react_1.useState)([]);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const bRetry = method === "GET" ? true : false;
    (0, react_1.useEffect)(() => {
        if (url) {
            callAPI(url, method, strPayLoad, bRetry).then((results) => {
                setData(results);
                setIsLoading(false);
            }, () => {
                setData([]);
                setIsLoading(false);
            });
        }
    }, [url, method, strPayLoad, bRetry]);
    return [data, isLoading];
}
exports.default = useFetch;
/* RETURN AJAX API CALL */
function callAPI(path, method, payLoad, retry) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, path);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.responseType = "json";
        xhr.onload = function () {
            if (this.status === 200) {
                resolve(this.response);
            }
            else {
                console.error("received : ", `ERROR ${this.status}`, JSON.stringify(this.response));
                reject({
                    status: this.status,
                    error: JSON.stringify(this.response),
                });
            }
        };
        xhr.onerror = function (error) {
            console.error(`received : ERROR ${this.status} on request ${method} ${path}`, error);
            if (retry) {
                console.error("retry:", `${method} ${path}`);
                return callAPI(path, method, payLoad, false);
            }
            else
                reject({
                    status: this.status,
                    error: error.type,
                });
        };
        xhr.ontimeout = function (error) {
            console.error(`received : TIMEOUT ${this.status} on request ${method} ${path}`, error);
            reject({
                status: 408,
                error: error.type,
            });
        };
        xhr.send(payLoad);
        console.debug("sent : ", `${method} ${path} ${payLoad}`);
    });
}
