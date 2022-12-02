import * as api from "../../../config/api"
import * as http from "../../../config/http";



export const getCategories = () => {
    
    return (http.get(`${api.root}/inventory/category/all`));
}


export const getAllProducts = () => {
    
    return (http.get(`${api.root}/inventory/product/all`));
}


export const getProducts = (categoryId) => {
    
    return (http.get(`${api.root}/inventory/product/byCategory/${categoryId}`))
}


export const getProduct = (productId) => {
    return (http.get(`${api.root}/inventory/product/${productId}`));
}

