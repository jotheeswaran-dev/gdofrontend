import * as api from "../../../config/api";
import * as http from "../../../config/http";

export const submitLogin = (data) => {
    const body = {
        "email": data.email,
        "password": data.password
    }

    return (http.post(`${api.root}/customer/login`, body));
}

export const getCustomer = () => {
    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    }

    return (http.get(`${api.root}/customer`,headers));
}