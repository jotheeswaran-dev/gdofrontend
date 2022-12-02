import React, { useState, useEffect } from "react";

import { useStateValue } from "../../contexts/StateProvider";

import { getWishlist, emptyWishlist } from "./WishlistApi/ApiCalls";

import WishlistItem from "./WishlistItem/WishlistItem";

import "./Wishlist.css";

const Wishlist = () => {

    const [{ user }] = useStateValue();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getWishlistItems();
        // eslint-disable-next-line
    }, []);

    const getWishlistItems = async () => {
        //api call

        try {
            const response = await getWishlist();
            setProducts(response.data.data.productList);
        }
        catch (err) {
            console.log(err);
        }
    }

    const emptyWishlistItems = async () => {
        //api call

        await emptyWishlist();
        getWishlistItems();

    }

    return (
        <>
            {user !== null &&
                <div className="wishlist">
                    <div className="wishlist-content">
                        <div className="wishlist-heading">
                            <h1>My Wishlist</h1>
                        </div>
                        <div className="wishlist-items">
                            {console.log(products)}
                            {products.length > 0 && products.map(product => <WishlistItem key={product.productId} id={product.productId} productName={product.productName} description={product.description} price={product.price} image={product.imageUrl} getWishlistItems={getWishlistItems} />)}
                        </div>
                        {products.length > 0 && <button className="empty-wishlist-btn" onClick={emptyWishlistItems}>Empty Wishlist</button>}
                        {products.length === 0 && <h1 className="empty-wishlist-msg">Your wishlist is empty!</h1>}
                    </div>
                </div>
            }
        </>
    );
}

export default Wishlist;