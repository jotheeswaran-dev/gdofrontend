import React,{useEffect, useState} from "react";
import "./IndividualProduct.css"; 

import { useNavigate } from "react-router-dom";

import { useStateValue } from "../../../contexts/StateProvider";

import { addToWishlist, addToCart, getCart } from "./ProductApi/ApiCalls";

import CartIcon from "../../../images/move-to-cart-icon.png";
import WishlistIcon from "../../../images/move-to-wishlist-icon.png";

import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const IndividualProduct = (props) => {

    const [{user}, dispatch] = useStateValue();

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(props.quantity === 0){
            setButtonDisabled(true);
            console.log("I am here");
        }
        else{
            setButtonDisabled(false);
        }
        // eslint-disable-next-line
    }, [])

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

    return(
        <div className="individual-product" >
            <div>
                <img src={props.image} alt="product" width="480px" height="550px"></img>
            </div>
            <div className="individual-product-details">
                <h1 className="individual-product-name">
                {props.productName}
                </h1>
                <p className="individual-product-description">{props.description.charAt(0).toUpperCase() + props.description.slice(1)}</p>
                <p className="individual-product-price">₹ {props.price}</p>
                <div className="individual-product-rating">
                    {[...new Array(5)].map((arr, index) => {
                        return index < Math.floor(props.rating) ? <StarIcon /> : <StarBorderIcon />;
                    })}
                </div>
                <div>
                    {props.rating} {"("}{props.numberOfPeopleRated}{")"}
                </div>
                <div className="individual-product-quantity-message">
                    {props.quantity===0 && <div style={{color : "red"}}> Sorry, we are out of stock </div>}
                    {props.quantity>0 && props.quantity < 5 && <div style={{ color : "red"}}> Hurry up, Only {props.quantity} left </div>}
                    {props.quantity>=5 && <div style={{color : "green"}}> In stock </div>}
                </div>
                <div className="individual-product-buttons">
                    <button className="individual-product-button" disabled={buttonDisabled} onClick={handleWishlistClick}>
                        {" "}
                        <img
                        src={WishlistIcon}
                        alt="wishlist"
                        height="25px"
                        width="25px"
                        />{" "}
                        Add to Wishlist
                    </button>
                    <button className="individual-product-button" disabled={buttonDisabled} style={{ marginLeft: "60px" }} onClick={handleCartClick}>
                        {" "}
                        <img src={CartIcon} alt="wishlist" height="25px" width="25px" /> Add
                        to Cart
                    </button>
                </div>
                
                
                 
            </div>
  
        </div>
    )
}

export default IndividualProduct;