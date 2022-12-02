import React from "react";
import "./ProductCard.css";

import StarIcon from "@mui/icons-material/Star";

const ProductCard = (props) => {

  
  return (
    <div className="product-card" onClick={() => props.handleProductClick(props.id)}>
      <div>
        <img src={props.image} alt="product" width="230px" height="275px"></img>
        <div>
          {props.productName.length > 30
            ? props.productName.substring(0, 30) + "..."
            : props.productName}
        </div>
        <div className="product-card-content">
          <p className="product-card-rating">
            {props.rating} <StarIcon style={{fontSize:"18px", position:"relative",top: "3px" }}/>
          </p>
          <p className="product-card-price">₹ {props.price}</p>
        </div>
        
      </div>
      {console.log(props.rating)}
    </div>
  );
};

export default ProductCard;
