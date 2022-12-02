import React from "react";
import FacebookIcon from "../../images/facebook.png";
import InstaIcon from "../../images/instagram.png";
import "./Footer.css"

const Footer = () => {

    return (
        <div className="footer">
            <p>About Us</p>
            <p>Contact Us</p>
            <p>Privacy</p>
            <p>Policy</p>
            <img src={FacebookIcon} alt="facebook" width="25px" height="25px"/>
            <img src={InstaIcon} alt="facebook" width="25px" height="25px"/>
        </div>
    );
}
export default Footer;