import React, { useState } from "react";

import { removeFromCart } from "../CartApi/ApiCalls";

import RemoveIcon from "../../../images/remove-icon.png";

import "./CartItem.css";

const CartItem = (props) => {

    const [showMore, setShowMore] = useState(false);

    const handleRemoveClick = async () => {
        //api call
        await removeFromCart(props.id);
        props.getCartItems();

    }

    return (
        <div className="cart-item-container">
            <div className="cart-item">
                <div className="cart-item-contents">
                    <img src={props.image} alt="product" height="150px" width="100px" />
                    <div className="cart-item-details">
                        <h3 className="cart-item-name">{props.productName}</h3>
                        <h4 className="cart-item-desc">
                            {showMore ? props.description : `${props.description.substring(0, 100)}`}
                            {props.description.length > 100 && <button className="button" onClick={() => setShowMore(!showMore)}>{showMore ? "Show less" : "Show more"}</button>}
                        </h4>
                        <p style={{ fontSize: "20px", fontWeight: "bold" }}>₹ {props.price}</p>
                    </div>
                </div>
                <div className="cart-item-icon-container">
                    <div className="cart-quantity-container">
                        <button id="cart-quantity-minus-btn" onClick={() => props.handleDecrement(props.id)}>-</button>
                        <p>{props.quantity}</p>
                        <button id="cart-quantity-plus-btn" onClick={() => props.handleIncrement(props.id)}>+</button>
                    </div>
                    <button className="cart-item-icon" onClick={handleRemoveClick}> <img src={RemoveIcon} alt="remove" height="25px" width="25px" /> Remove</button>
                </div>
            </div>
            <hr></hr>
        </div>
    );
}

export default CartItem;