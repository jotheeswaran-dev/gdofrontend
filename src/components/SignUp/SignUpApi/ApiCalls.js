import * as api from "../../../config/api"
import * as http from "../../../config/http";

export const submitSignup = (data) => {
    const body = {
        "firstName": data.firstname,
        "lastName": data.lastname,
        "email": data.email,
        "contactNo": data.ph_number,
        "password": data.password
    }
    return (http.post(`${api.root}/customer/signup`, body));
};