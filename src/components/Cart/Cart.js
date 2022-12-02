import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useStateValue } from "../../contexts/StateProvider";

import { getCart, emptyCart, placeOrder } from "./CartApi/ApiCalls";

import CartItem from "./CartItem/CartItem";

import "./Cart.css";

const Cart = () => {

    const [products, setProducts] = useState([]);

    const [{ user }, dispatch] = useStateValue();

    const navigate = useNavigate();

    useEffect(() => {
        getCartItems();
        // eslint-disable-next-line
    }, []);

    const getCartItems = async () => {
        //api call

        try {
            const response = await getCart();

            const productsList = response.data.data.productsList.map(product => (
                {
                    productId: product.productId,
                    productName: product.productName,
                    description: product.description,
                    price: product.price,
                    quantity: 1,
                    imageUrl: product.imageUrl
                }
            ));

            setProducts(productsList);

            dispatch({
                type: "SET_CART",
                cart: productsList
            });

        }
        catch (err) {
            console.log(err);
        }
    }

    const emptyCartItems = async () => {
        //api call
        await emptyCart();
        getCartItems();
    }

    const handlePlaceOrderClick = async () => {
        //api call
        try {
            const productList = products.map(product => (
                {
                    productId: product.productId,
                    productQuantity: product.quantity
                }
            ));

            const response = await placeOrder(productList);

            getCartItems();

            navigate("/checkout", { state: { id: response.data.data.orderId, customerDetails: response.data.data.customer, addressDetails: response.data.data.addressDetailsList, productsList: response.data.data.cart.productsList, totalPrice: response.data.data.totalAmount } });
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleDecrement = (id) => {
        const updateProductsList = products.map(product => {
            if (product.productId === id && product.quantity !== 1) {
                return (
                    {
                        ...product,
                        quantity: product.quantity - 1
                    }
                )
            }
            return (
                {
                    ...product
                }
            )
        });
        setProducts(updateProductsList);
    }

    const handleIncrement = (id) => {
        const updateProductsList = products.map(product => {
            if (product.productId === id) {
                return (
                    {
                        ...product,
                        quantity: product.quantity + 1
                    }
                )
            }
            return (
                {
                    ...product
                }
            )
        });
        setProducts(updateProductsList);
    }

    return (
        <>
            {user &&
                <div className="cart">
                    <div className="cart-content">
                        <div className="cart-heading">
                            <h1>My Cart</h1>
                        </div>
                        {products.length > 0 && <div className="cart-items">
                            {products.map(product => <CartItem key={product.productId} id={product.productId} productName={product.productName} description={product.description} price={product.price} quantity={product.quantity} image={product.imageUrl} getCartItems={getCartItems} handleIncrement={handleIncrement} handleDecrement={handleDecrement} />)}
                        </div>}
                        {products.length > 0 && <div className="cart-btn-container">
                            <button className="place-order-btn" onClick={handlePlaceOrderClick}>Place Order</button>
                            <button className="empty-cart-btn" onClick={emptyCartItems}>Empty Cart</button>
                        </div>}
                        {products.length === 0 && <h1 className="empty-cart-msg">Your cart is empty!</h1>}
                    </div>
                </div>
            }
        </>
    );
}

export default Cart;