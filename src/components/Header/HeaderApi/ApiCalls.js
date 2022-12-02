import * as api from "../../../config/api";
import * as http from "../../../config/http";

export const getCustomer = () => {
    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    }

    return (http.get(`${api.root}/customer`,headers));
}

export const getCart = () => {
    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    }

    return(http.get(`${api.root}/cart`, headers));
}