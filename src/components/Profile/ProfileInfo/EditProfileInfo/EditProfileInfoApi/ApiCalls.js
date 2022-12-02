import * as api from "../../../../../config/api";
import * as http from "../../../../../config/http";

export const editProfile = (data) => {
    const token = localStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const body = {
            "firstName": data.firstname,
            "lastName": data.lastname,
            "email": data.email,
            "contactNo": data.ph_number
    }

    return (http.put(`${api.root}/customer`,body, headers));
}

export const getCustomer = () => {
    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    }

    return (http.get(`${api.root}/customer`,headers));
}