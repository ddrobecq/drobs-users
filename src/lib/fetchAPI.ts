'use client'

import {useState, useEffect} from 'react';
const _APIURL = "https://api.billard.drobecq.fr";
type Data = Array<any>;
// **********************************************
// function : useFetch
//  url : URL to call API
//  method : method to call API's resources (GET, POST, PUT, DELETE)
//  bWithPagination (optional) : true if data should be fetched page by page
// description : to use as a React hook 
// **********************************************
export default function useFetch (url:string, method:string, strPayLoad:string):[Data, boolean]{
    const [data, setData] = useState<Data> ([]); 
    const [isLoading, setIsLoading] = useState (true); 
    const bRetry = (method === 'GET') ? true : false;

    useEffect(() => {
        if (url) {
                callAPIPerfPool(url, method, strPayLoad, bRetry)
                .then ((results) => {
                    setData (results);
                    setIsLoading(false);
                }
                , () => {
                    setData([]);
                    setIsLoading(false);
                });
        }    
    }, [url, method, strPayLoad, bRetry]);

    return [data, isLoading];
}

function callAPIPerfPool (strPath:string, strMethod:string, strPayLoad:string, bRetry:boolean) {
    const url = _APIURL + strPath;
    return (callAPI (url, strMethod, strPayLoad, bRetry));
}

/* RETURN AJAX API CALL */
function callAPI(strPath:string, strMethod:string, strPayLoad:string, bRetry:boolean) {
    type Error = {
        status: number,
        error: string,
    };
    return new Promise((resolve:(value:Data)=>void, reject:(reason:Error)=>void) => {
        let xhr = new XMLHttpRequest();
        xhr.open(strMethod, strPath);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.responseType = "json";
        xhr.onload = function() {
            if (this.status === 200) {
                resolve(this.response);
            } else {
                console.error ('received : ', `ERROR ${this.status}`, JSON.stringify(this.response));
                reject({
                    status: this.status,
                    error: JSON.stringify(this.response),
                });
            }
        };
        xhr.onerror = function(error) {
            console.error (`received : ERROR ${this.status} on request ${strMethod} ${strPath}`, error);
            if (bRetry) {
                console.error ('retry:', `${strMethod} ${strPath}`);
                return (callAPI(strPath, strMethod, strPayLoad, false));
            } else reject({
                status: this.status,
                error: error.type
            });
        };
        xhr.ontimeout = function(error) {
            console.error (`received : TIMEOUT ${this.status} on request ${strMethod} ${strPath}`, error);
            reject({
                status: 408,
                error: error.type
            });
        };
        xhr.send(strPayLoad);       
        console.debug ("sent : ", `${strMethod} ${strPath} ${strPayLoad}`); 
    });
};
