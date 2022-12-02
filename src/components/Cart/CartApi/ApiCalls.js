import * as api from "../../../config/api";
import * as http from "../../../config/http";

export const getCart = () => {
    const token = localStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`
    }

    return(http.get(`${api.root}/cart`, headers));
}

export const emptyCart = () => {
    const token = localStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`
    }

    return(http.del(`${api.root}/cart`, headers));
}

export const removeFromCart = (productId) => {
    const token = localStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`
    }

    return(http.del(`${api.root}/cart/product/${productId}`, headers));
}

export const placeOrder = (productList) => {
    const token = localStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const body = {
        "productRequestList": productList
    }

    return(http.post(`${api.root}/order`, body, headers))
}