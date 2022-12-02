import React from "react";
import { useForm } from "react-hook-form"

import { editAddress } from "../AddressApi/ApiCalls";

import BackIcon from "../../../../images/back-icon.png";

import "./EditAddressForm.css"

const EditAddressForm = (props) => {

    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            defaultValues: {
                pincode: props.editItem.pinCode,
                doorNo: props.editItem.doorNo,
                street: props.editItem.street,
                city: props.editItem.city,
                state: props.editItem.state
            }
        }
    );

    const onSubmit = async (data) => {
        await editAddress(data, props.editItem.addressId);
        props.getAddressDetails();
        props.setShowEdit(false);
    }


    return (
        <div className="edit-address-form-container">
            <div className="edit-address-heading">
                <h1>Edit Address</h1>
                <img src={BackIcon} alt="edit" height="25px" width="25px" style={{ marginRight: "32px" }}
                    onClick={() => props.setShowEdit(false)}
                />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="add-address-form">
                <div>
                    <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        {...register('pincode', {
                            required: { value: true, message: "This field is required." }
                        })}
                    />
                    {errors.pincode && <p className='error-message'> &#9888; {errors.pincode.message}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        name="doorNo"
                        placeholder="Locality/Door no."
                        {...register('doorNo', {
                            required: { value: true, message: "This field is required." }
                        })}
                    />
                    {errors.doorNo && <p className='error-message'> &#9888; {errors.doorNo.message}</p>}
                </div>
                <div className="street">
                    <input
                        type="text"
                        name="street"
                        placeholder="Area and Street"
                        {...register('street', {
                            required: { value: true, message: "This field is required." }
                        })}
                    />
                    {errors.street && <p className='error-message'> &#9888; {errors.street.message}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        name="city"
                        placeholder="City/District/Town"
                        {...register('city', {
                            required: { value: true, message: "This field is required." }
                        })}
                    />
                    {errors.city && <p className='error-message'> &#9888; {errors.city.message}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        {...register('state', {
                            required: { value: true, message: "This field is required." }
                        })}
                    />
                    {errors.state && <p className='error-message'> &#9888; {errors.state.message}</p>}
                </div>

                <button id="edit-address-submit">SUBMIT</button>
                <button id="edit-address-cancel"
                    onClick={() => props.setShowEdit(false)}>
                    CANCEL
                </button>
            </form>
        </div>
    );
}
export default EditAddressForm;