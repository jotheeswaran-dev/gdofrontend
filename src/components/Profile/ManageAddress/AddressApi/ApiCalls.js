import * as api from "../../../../config/api";
import * as http from "../../../../config/http";

export const getAddress = () => {
    const token = localStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`
    }

    return (http.get(`${api.root}/customer/address`,headers));
}

export const addAddress = (data) => {
    const token = localStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const body = {
        "doorNo": data.doorNo,
        "street": data.street,
        "city": data.city,
        "state": data.state,
        "pinCode": data.pincode
    }

    return (http.post(`${api.root}/customer/address`, body, headers));
}

export const deleteAddress = (addressId) => {
    const token = localStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`
    }

    return (http.del(`${api.root}/customer/address/${addressId}`,headers));
}

export const editAddress = (data, addressId) => {
    const token = localStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const body = {
        "addressId": addressId,
        "doorNo": data.doorNo,
        "street": data.street,
        "city": data.city,
        "state": data.state,
        "pinCode": data.pincode
    }

    return (http.put(`${api.root}/customer/address`, body, headers));
}