import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import { useStateValue } from "../../contexts/StateProvider";

import { submitLogin, getCustomer } from "./LoginApi/ApiCalls";

import "./Login.css"

function Login() {

    const navigate = useNavigate();


    const [, dispatch] = useStateValue();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        //api call

        try{
            const loginResponse = await submitLogin(data);
            localStorage.setItem("token", loginResponse.data.data.jwt);
    
            const customerDetailsResponse = await getCustomer();
    
            const customerDetails = customerDetailsResponse.data.data;
            
            dispatch({
                type: "SET_USER",
                user: {
                        "id": customerDetails.customerId,
                        "firstName": customerDetails.firstName,
                        "lastName": customerDetails.lastName,
                        "email": customerDetails.email,
                        "contactNo": customerDetails.contactNo
                },
            });
    
            navigate('/')
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className="login">
            <div className="login-popup">
                <div className="login-popup-name">
                    LOGIN
                </div>
                <div className="login-popup-content">
                    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                        <input
                            className="email-input"
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            {...register('email', {
                                required: { value: true, message: "Email is required." },
                                pattern: { value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, message: "Invalid email" }
                            })} />
                        {errors.email && <p className='error-message'> &#9888; {errors.email.message}</p>}
                        <input
                            className="password-input"
                            type="password"
                            name="password"
                            placeholder="Password"
                            {...register('password', {
                                required: { value: true, message: "Password is required." }
                            })} />
                        {errors.password && <p className='error-message'> &#9888; {errors.password.message}</p>}
                        <input className="login-submit" type="submit" value="Login" />
                        <Link to="/signup" style={{ textDecoration: 'none' }}><p style={{ textAlign: "center", fontSize: "14px", fontWeight: "bold", color: "#8369FF" }}>New user? Create an account</p></Link>
                    </form>
                </div>
                <Link to="/"><CloseIcon style={{ color: "#8369FF", fontSize: "20px", margin: "3px" }} /></Link>
            </div>
        </div>
    );
}

export default Login;