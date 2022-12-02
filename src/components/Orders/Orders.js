import React, { useState, useEffect } from "react";

import { useStateValue } from "../../contexts/StateProvider";

import Order from "./Order";

import { getOrders } from "./OrderApi/ApiCalls";

import "./Orders.css"

const Orders = () => {

    const [{ user }] = useStateValue();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            geAlltOrders();
        }
        // eslint-disable-next-line
    }, []);

    const geAlltOrders = async () => {
        //api call

        try {
            const response = await getOrders();
            setOrders(response.data.data);

        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            {user &&
                <div className="orders">
                    <div className="orders-content">
                        <div className="orders-heading">
                            <h1>My Orders</h1>
                        </div>
                        <div className="orders-products-content-container">
                            {orders.length > 0 && orders.map((order) => {
                                return order.productList.map((item) =>
                                (
                                    <div key={item.productId}>
                                        <div className="orders-product">
                                            <Order productName={item.productName} description={item.description} productQuantity={item.productQuantity} price={item.price} image={item.imageUrl}/>
                                            <div>
                                                <h3 style={{ marginBottom: "6px", color: "#8369FF", fontSize: "16px" }}>Order status: {order.orderStatus}</h3>
                                                <h3 style={{ marginBottom: "6px", color: "#8369FF", fontSize: "16px" }}>Payment status: {order.paymentStatus}</h3>
                                                <h3 style={{ color: "#8369FF", fontSize: "16px" }}>Date of arrival: {order.estimatedArrival}</h3>
                                            </div>
                                        </div>
                                        <hr></hr>
                                    </div>
                                ))
                            })}
                        </div>
                        {orders.length === 0 && <h1 className="empty-orders-msg">You have no past orders!</h1>}
                    </div>
                </div>
            }
        </>
    );
}

export default Orders;
