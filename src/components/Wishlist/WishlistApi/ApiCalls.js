import * as api from "../../../config/api";
import * as http from "../../../config/http";

export const getWishlist = () => {
    const token = localStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`
    }

    return(http.get(`${api.root}/wishlist`, headers));
}

export const emptyWishlist = () => {
    const token = localStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`
    }

    return(http.del(`${api.root}/wishlist/empty`, headers));
}

export const moveToCart = (productId) => {
    const token = localStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const body = {
        productId: productId
    }

    return(http.post(`${api.root}/wishlist/moveToCart`, body, headers));
}

export const removeFromWishlist = (productId) => {
    const token = localStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`
    }


    return(http.del(`${api.root}/wishlist/remove/${productId}`, headers));
}

export const getCart = () => {
    const token = localStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`
    }

    return(http.get(`${api.root}/cart`, headers));
}