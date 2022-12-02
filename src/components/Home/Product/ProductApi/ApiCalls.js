import * as api from "../../../../config/api";
import * as http from "../../../../config/http";

export const addToWishlist = (productId) => {
    const token = localStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const body = {
        productId: productId
    }

    return (http.post(`${api.root}/wishlist`, body, headers));
}

export const addToCart = (productId) => {
    const token = localStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const body = {
        productId: productId
    }

    return (http.post(`${api.root}/cart`, body, headers));
}

export const getCart = () => {
    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    }

    return(http.get(`${api.root}/cart`, headers));
}