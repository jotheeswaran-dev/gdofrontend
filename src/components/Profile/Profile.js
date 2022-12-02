import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useStateValue } from "../../contexts/StateProvider";

import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ManageAddress from "./ManageAddress/ManageAddress";
import Wishlist from "../Wishlist/Wishlist";
import Cart from "../Cart/Cart";
import Orders from "../Orders/Orders";

import ProfilePhoto from "../../images/profile-photo.png";

import "./Profile.css"

const Profile = () => {

    const navigate = useNavigate();

    const [{user}, dispatch] = useStateValue();

    const [selectedOption, setSelectedOption] = useState(
        {
            profile: true,
            address: false,
            wishlist: false,
            cart: false,
            orders: false
        }
    );

    const handleSelection = (selectedOption) => {
        setSelectedOption(selectedOption);
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
        <>
            {user &&
                <div className="profile">

                    {/* SIDE BAR */}

                    <div className="side-bar">
                        <div className="greeting">
                            <img src={ProfilePhoto} alt="profile" height="40px" width="40px" style={{ margin: "50px" }} />
                            <p>Hello!</p>
                        </div>
                        <div className="options">
                            <div className={selectedOption.profile ? "option selected-option" : "option"}
                                onClick={() => handleSelection({ profile: true, address: false, wishlist: false, cart: false, orders: false })}>
                                Profile Information
                            </div>
                            <div className={selectedOption.address ? "option selected-option" : "option"}
                                onClick={() => handleSelection({ profile: false, address: true, wishlist: false, cart: false, orders: false })}>
                                Manage Addresses
                            </div>
                            <div className={selectedOption.wishlist ? "option selected-option" : "option"}
                                onClick={() => handleSelection({ profile: false, address: false, wishlist: true, cart: false, orders: false })}>
                                My Wishlist
                            </div>
                            <div className={selectedOption.cart ? "option selected-option" : "option"}
                                onClick={() => handleSelection({ profile: false, address: false, wishlist: false, cart: true, orders: false })}>
                                My Cart
                            </div>
                            <div className={selectedOption.orders ? "option selected-option" : "option"}
                                onClick={() => handleSelection({ profile: false, address: false, wishlist: false, cart: false, orders: true })}>
                                My Orders
                            </div>
                            <div className="option5" onClick={handleLogout}>Logout</div>
                        </div>
                    </div>

                    {/* SIDE BAR END */}

                    <div className="content-container">

                        {/* PROFILE CONTENT */}
                        {selectedOption.profile && <ProfileInfo />}


                        {/* MANAGE ADDRESSES CONTENT */}
                        {selectedOption.address && <ManageAddress />}


                        {/* WISHLIST CONTENT */}
                        {selectedOption.wishlist && <Wishlist />}

                        {/* CART CONTENT */}
                        {selectedOption.cart && <Cart />}

                        {/* ORDERS CONTENT */}
                        {selectedOption.orders && <Orders />}

                    </div>
                </div>
            }
        </>
    );
}
export default Profile;