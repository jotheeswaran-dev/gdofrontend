import  * as api from "../../../config/api";
import  * as http from "../../../config/http";

export const getOrders = () => {
    const token = localStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`
    }

    return(http.get(`${api.root}/order/allOrders`, headers));
}