import React from "react";
import { useForm } from "react-hook-form"

import { useStateValue } from "../../../../contexts/StateProvider";

import { editProfile, getCustomer } from "./EditProfileInfoApi/ApiCalls";

import BackIcon from "../../../../images/back-icon.png";

import "./EditProfileInfo.css"

const EditProfileInfo = (props) => {

    const [{ user }, dispatch] = useStateValue();

    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            defaultValues: {
                firstname: user.firstName,
                lastname: user.lastName,
                email: user.email,
                ph_number: user.contactNo
            }
        }
    );

    const onEditProfileSubmit = async (data) => {
        //api call
        
        try {
            await editProfile(data);

            const getCustomerResponse = await getCustomer();

            const customerDetails = getCustomerResponse.data.data;

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

            props.handleShowEdit();


        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="profile-content">
            <div className="edit-profile-heading">
                <h1>Edit Profile</h1>
                <img src={BackIcon} alt="edit" height="25px" width="25px" style={{ marginRight: "40px" }}
                    onClick={props.handleShowEdit}
                />
            </div>
            <form className="edit-profile-form" onSubmit={handleSubmit(onEditProfileSubmit)}>
                <label htmlFor="firstname" >First Name</label>
                <div>
                    <input
                        type="text"
                        name="firstname"
                        placeholder="Firstname"
                        {...register('firstname', {
                            required: { value: true, message: "Firstname is required." }
                        })}
                    />
                    {errors.firstname && <p className='error-message'> &#9888; {errors.firstname.message}</p>}
                </div>
                <label htmlFor="lastname">Last Name</label>
                <div>
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Lastname"
                        {...register('lastname', {
                            required: { value: true, message: "Lastname is required." }
                        })}
                    />
                    {errors.lastname && <p className='error-message'> &#9888; {errors.lastname.message}</p>}
                </div>
                <label htmlFor="email">Email</label>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        {...register('email', {
                            required: { value: true, message: "Email is required." },
                        })}
                    />
                    {errors.email && <p className='error-message'> &#9888; {errors.email.message}</p>}
                </div>
                <label htmlFor="ph_number">Phone Number</label>
                <div>
                    <input
                        type="tel"
                        name="ph_number"
                        placeholder="Phone Number"
                        {...register('ph_number', {
                            required: { value: true, message: "Phone number is required." },
                        })}
                    />
                    {errors.ph_number && <p className='error-message'> &#9888; {errors.ph_number.message}</p>}
                </div>
                <button id="edit-profile-submit">SUBMIT</button>
                <button id="edit-profile-cancel"
                    onClick={props.handleShowEdit}>
                    CANCEL
                </button>
            </form>
        </div>
    );
}
export default EditProfileInfo;