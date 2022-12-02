import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { submitSignup } from "./SignUpApi/ApiCalls";
import "./SignUp.css"

const SignUp = (props) => {

    const navigate = useNavigate();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try{
            await submitSignup(data);
            navigate('/login');
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className="signup">
            <div className="signup-popup">
                <div className="signup-popup-name">
                    SIGN UP
                </div>
                <div className="signup-popup-content">
                    <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
                        <input
                            className="text-input"
                            type="text"
                            name="firstname"
                            placeholder="Firstname"
                            {...register('firstname', {
                                required: { value: true, message: "Firstname is required." }
                            })} />
                        {errors.firstname && <p className='error-message'> &#9888; {errors.firstname.message}</p>}
                        <input
                            className="text-input"
                            type="text"
                            name="lastname"
                            placeholder="Lastname"
                            {...register('lastname', {
                                required: { value: true, message: "Lastname is required." }
                            })} />
                        {errors.lastname && <p className='error-message'> &#9888; {errors.lastname.message}</p>}
                        <input
                            className="email-input"
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            {...register('email', {
                                required: { value: true, message: "Email is required." },
                                pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Invalid email" }
                            })} />
                        {errors.email && <p className='error-message'> &#9888; {errors.email.message}</p>}
                        <input
                            className="ph-number-input"
                            type="tel"
                            name="ph_number"
                            placeholder="Phone Number"
                            {...register('ph_number', {
                                required: { value: true, message: "Phone number is required." },
                                pattern: { value: /^(\+91[-\s]?)?[0]?(91)?[789]\d{9}$/, message: "Invalid phone number" }
                            })} />
                        {errors.ph_number && <p className='error-message'> &#9888; {errors.ph_number.message}</p>}
                        <input
                            className="password-input"
                            type="password"
                            name="password"
                            placeholder="Password"
                            {...register('password', {
                                required: { value: true, message: "Password is required." },
                                minLength: { value: 8, message: "Password must be atleast 8 characters." },
                                maxLength: { value: 32, message: "Password must not have more than 32 characters." },
                                pattern: { value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*#!@$%^&]).{8,32}$/, message: "Password must contain atleast 1 uppercase, 1 lowercase, 1 special character(!@#$%^&*) and 1 digit." }
                            })} />
                        {errors.password && <p className='error-message'> &#9888; {errors.password.message}</p>}
                        <input
                            className="password-input"
                            type="password"
                            name="confirm_password"
                            placeholder="Confirm Password"
                            {...register('confirm_password', {
                                required: { value: true, message: "Confirm Password is required." },
                                validate: (value) => value === watch('password') || "Passwords does not match."
                            })} />
                        {errors.confirm_password && <p className='error-message'> &#9888; {errors.confirm_password.message}</p>}
                        <input
                            className="signup-submit"
                            type="submit"
                            value="SIGN UP"
                        />
                        <Link to="/login" style={{ textDecoration: 'none' }}><p style={{ textAlign: "center", fontSize: "14px", fontWeight: "bold", color: "#8369FF" }}>Existing user? Login</p></Link>
                    </form>
                </div>
                <Link to="/"><CloseIcon style={{ color: "#8369FF", fontSize: "20px", margin: "3px" }} /></Link>
            </div>
        </div>
    );
}
export default SignUp;