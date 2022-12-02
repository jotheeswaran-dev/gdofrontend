import React,{useState} from "react";

import { moveToCart, getCart, removeFromWishlist } from "../WishlistApi/ApiCalls";

import { useStateValue } from "../../../contexts/StateProvider";

import CartIcon from "../../../images/move-to-cart-icon.png";
import RemoveIcon from "../../../images/remove-icon.png";

import "./WishlistItem.css";

const WishlistItem = (props) => {

    const [,dispatch] = useStateValue();
    const [showMore, setShowMore] = useState(false);

    const handleCartClick = async () => {
        //api call
        await moveToCart(props.id);
        await props.getWishlistItems();
        await getCartDetails();

    }

    const handleRemoveClick = async () => {
        //api call
        await removeFromWishlist(props.id);
        props.getWishlistItems();

    }

    const getCartDetails = async () => {
        try{
            const cartDetailsResponse = await getCart();
            dispatch({
                type: "SET_CART",
                cart: cartDetailsResponse.data.data.productsList
            });
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className="wishlist-item-container">
            <div className="wishlist-item">
                <div className="wishlist-item-contents">
                    <img src={props.image} alt="product" height="150px" width="100px" />
                    <div className="wishlist-item-details">
                        <h3 className="wishlist-item-name">{props.productName}</h3>
                        <h4 className="wishlist-item-desc">
              {showMore ? props.description : `${props.description.substring(0, 100)}`}
              {props.description.length > 100 && <button className="button" onClick={() => setShowMore(!showMore)}>{showMore ? "Show less" : "Show more"}</button> }
            </h4>
                        <p style={{ fontSize: "20px", fontWeight: "bold" }}>₹ {props.price}</p>
                    </div>
                </div>
                <div className="wishlist-item-icon-container">
                    <button className="wishlist-item-icon" onClick={handleCartClick}> <img src={CartIcon} alt="wishlist" height="25px" width="25px" /> Add to Cart</button>
                    <button className="wishlist-item-icon" onClick={handleRemoveClick}> <img src={RemoveIcon} alt="remove" height="25px" width="25px" /> Remove</button>
                </div>
            </div>
            <hr></hr>
        </div>
    );
}

export default WishlistItem;