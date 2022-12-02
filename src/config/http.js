import axios from "axios";

export const post = async (url, body, headers) => {
    try{
        const res =  await axios.post(url, body, {headers:headers});
        return res;
    }
    catch(err){
        return err;
    }
}

export const get = async (url, headers) => {
    try{
        const res = axios.get(url, {headers: headers});
        return res;
    }
    catch(err){
        return err;
    }
}

export const del = async (url, headers) => {
    try{
        const res = axios.delete(url, {headers: headers});
        return res;
    }
    catch(err){
        return err;
    }
}

export const put = async (url, body, headers) => {
    try{
        const res = axios.put(url, body, {headers: headers});
        return res;
    }
    catch(err){
        return err;
    }
}