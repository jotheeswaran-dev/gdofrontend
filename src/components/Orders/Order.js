import React, { useState } from "react";

import "./Order.css"

const Order = (props) => {

    const [showMore, setShowMore] = useState(false);

    return (
        <div className="orders-product-contents">
            <img src={props.image} alt="product" height="150px" width="100px" />
            <div className="orders-product-details">
                <h3 className="orders-product-name">{props.productName}</h3>
                <h4 className="orders-product-desc">
                    {showMore ? props.description : `${props.description.substring(0, 100)}`}
                    {props.description.length > 100 && <button className="button" onClick={() => setShowMore(!showMore)}>{showMore ? "Show less" : "Show more"}</button>}
                </h4>
                <p className="orders-product-quantity">Quantity: {props.productQuantity}</p>
                <p style={{ fontSize: "20px", fontWeight: "bold" }}>₹ {props.price}</p>
            </div>
        </div>
    );
}

export default Order;