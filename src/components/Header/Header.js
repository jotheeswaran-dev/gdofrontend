import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { useStateValue } from "../../contexts/StateProvider";

import { getCart, getCustomer } from "./HeaderApi/ApiCalls";

import Logo from "../../images/logo.png";
import ProfileIcon from "../../images/profile-icon.png";
import WishlistIcon from "../../images/wishlist-icon.png";
import CartIcon from "../../images/cart-icon.png";

import "./Header.css"

const Header = () => {

    const [{ user, cart }, dispatch] = useStateValue();

    const navigate = useNavigate();

    useEffect(() => {
        getCustomerDetails();
        getCartDetails();
        // eslint-disable-next-line
    }, [])

    const getCustomerDetails = async () => {
        //api call
        try {
            const customerDetailsResponse = await getCustomer();
            const customerDetails = customerDetailsResponse.data.data;

            dispatch({
                type: "SET_USER",
                user: {
                    "id": customerDetails.customerId,
                    "firstName": customerDetails.firstName,
                    "lastName": customerDetails.lastName,
                    "email": customerDetails.email,
                    "contactNo": customerDetails.contactNo
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    const getCartDetails = async () => {
        //api call
        try {
            const cartDetailsResponse = await getCart();
            dispatch({
                type: "SET_CART",
                cart: cartDetailsResponse.data.data.productsList
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleLogout = () => {
        dispatch({
            type: "SET_USER",
            user: null,
        });
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div className="header">
            <Link to="/"><img src={Logo} alt="logo" width="60px" height="60px" className="logo-icon" /></Link>
            {user !== null ?
                <div className="icons-container">
                    <div className="profile-icon-container">
                        <img src={ProfileIcon} alt="profile" width="28px" height="28px" className="profile-icon" />
                        <div className="dropdown-menu">
                            <p>{`${user.firstName} ${user.lastName}`}</p>
                            <hr />
                            <Link to="/profile" style={{ all: 'unset' }}><p className="dropdown-content">View Profile</p></Link>
                            <hr />
                            <p className="dropdown-content" onClick={handleLogout}>Logout</p>
                        </div>
                    </div>
                    <div className="icon-container">
                        <Link to="/wishlist"><img src={WishlistIcon} alt="wishlist" width="28px" height="28px" /></Link>
                    </div>
                    <div className="icon-container">
                        <Link to="cart" id="cart-icon"><img src={CartIcon} alt="cart" width="28px" height="28px" /></Link>
                        {cart.length > 0 && <p id="cart-count">{cart.length}</p>}
                    </div>
                </div> :
                <div className="header-buttons">
                    <Link to="/login"><button className="header-login-btn">LOGIN</button></Link>
                    <Link to="/signup"><button className="header-signup-btn">SIGN UP</button></Link>
                </div>
            }
        </div>
    );
}
export default Header;