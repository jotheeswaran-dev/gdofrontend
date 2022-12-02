import React from "react";
import "./Category.css"

const Category = (props) => {

    
    return (
        <div className="category" onClick={() => props.getProductsByCategory(props.id)}>
            <img src={props.image} alt="category" width= "60px" height="60px" style={{borderRadius: "50%", marginBottom: "6px", objectFit: "fill"}}/>
            <h4 style={{color: "#6D6D6D"}}>{props.name} </h4>
        </div>
    );
}
export default Category;