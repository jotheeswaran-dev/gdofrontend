import React, { useState } from "react";
import { useLocation, Link } from 'react-router-dom';

import { useStateValue } from "../../contexts/StateProvider";

import displayRazorpay from "../../razorpay/RazorpayPaymentGateway"

import Order from "../Orders/Order";

import "./OrderSummary.css";

const OrderSummary = () => {

    const [isPayed, setIsPayed] = useState(false);

    const [{ user }] = useStateValue();

    const location = useLocation();

    const getIndex = (addressId) => location.state.addressDetails.findIndex(item => {
        return item.addressId === addressId;
    });

    return (
        <div className="order-summary">
            {isPayed ?
                <div className="payment-msg">
                    <h1 style={{ color: "#8369FF", marginBottom: "30px" }}>Thanks for Payment!</h1>
                    <h2>To go to your orders click <Link to="/orders">here</Link></h2>
                </div>
                :
                <div className="order-summary-content">
                    <div className="order-summary-heading">
                        <h1>Order Summary</h1>
                    </div>
                    <div className="customer-details">
                        <h2>Personal Details:</h2>
                        <p className="customer-detail">{`${location.state.customerDetails.firstName} ${location.state.customerDetails.lastName}`}</p>
                        <p className="customer-detail">{location.state.customerDetails.email}</p>
                        <p className="customer-detail">{location.state.customerDetails.contactNo}</p>
                    </div>
                    <div className="address-details">
                        <h2>Address Details:</h2>
                        <div className="order-address-content-container">
                            {location.state.addressDetails.length > 0 && location.state.addressDetails.map((item) => (
                                <div key={item.addressId} className="order-address-content">
                                    <div>
                                        <h3>Address {getIndex(item.addressId) + 1}</h3>
                                        <p>{item.doorNo}, {item.street}, {item.city}, {item.state}, {item.pinCode}</p>
                                    </div>
                                    {/* <input type="radio" /> */}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="products-details">
                        <h2>Product Details:</h2>
                        <div className="order-products-content-container">
                            {location.state.productsList.length > 0 && location.state.productsList.map((item) => (
                                <div key={item.productId} className="order-product-container">
                                    <div className="order-product">
                                        <Order productName={item.productName} description={item.description} productQuantity={item.productQuantity} price={item.price} image={item.imageUrl}/>
                                        <h3>Quantity: {item.productQuantity}</h3>
                                    </div>
                                    <hr></hr>
                                </div>
                            ))}
                        </div>
                    </div>
                    <h2 className="total-price">Total Price: ₹{location.state.totalPrice}</h2>
                    <button className="pay-btn" onClick={() => displayRazorpay(user, location.state.id, setIsPayed)}>PAY</button>
                </div>
            }
        </div>
    );
}

export default OrderSummary;