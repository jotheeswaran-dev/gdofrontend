import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

import { addToWishlist, addToCart, getCart } from "./ProductApi/ApiCalls";

import { useStateValue } from "../../../contexts/StateProvider";

import CartIcon from "../../../images/move-to-cart-icon.png";
import WishlistIcon from "../../../images/move-to-wishlist-icon.png";

import "./Product.css";

const Product = (props) => {
  const [{user}, dispatch] = useStateValue();
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  const handleWishlistClick = () => {
    //api call
    if (user !== null) {
      addToWishlist(props.id);
    } else {
      navigate("/login");
    }
  };

  const handleCartClick = async () => {
    //api call
    if (user !== null) {
      await addToCart(props.id);
      await getCartDetails();
    } else {
      navigate("/login");
    }
  };

  const getCartDetails = async () => {
    try {
      const cartDetailsResponse = await getCart();
      dispatch({
        type: "SET_CART",
        cart: cartDetailsResponse.data.data.productsList,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="product-container">
      <div className="product">
        <div className="product-contents">
          <img src={props.image} alt="product" height="150px" width="100px" />
          <div className="product-details">
            <h3 className="product-name">{props.productName}</h3>
            {/* <p className="product-desc">{props.description}</p> */}
            <h4 className="product-desc">
              {showMore ? props.description : `${props.description.substring(0, 100)}`}
              {props.description.length > 100 && <button className="button" onClick={() => setShowMore(!showMore)}>{showMore ? "Show less" : "Show more"}</button> }
            </h4>
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              ₹ {props.price}
            </p>
          </div>
        </div>
        <div className="product-icon-container">
          <button className="product-icon" onClick={handleWishlistClick}>
            {" "}
            <img
              src={WishlistIcon}
              alt="wishlist"
              height="25px"
              width="25px"
            />{" "}
            Add to Wishlist
          </button>
          <button className="product-icon" onClick={handleCartClick}>
            {" "}
            <img src={CartIcon} alt="wishlist" height="25px" width="25px" /> Add
            to Cart
          </button>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};

export default Product;
