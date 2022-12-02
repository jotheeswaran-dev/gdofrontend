import React, { useState, useEffect, useRef } from "react";

import { getCategories, getAllProducts, getProducts, getProduct } from "./HomeApi/ApiCalls";

import Category from './Category/Category';
import Product from "./Product/Product";
import ProductCard from "./Product/ProductCard";
import IndividualProduct from "./Product/IndividualProduct";

import LeftArrow from "../../images/left-arrow.png";
import RightArrow from "../../images/right-arrow.png";

import "./Home.css"

const Home = () => {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [showProduct, setShowProduct] = useState(false);
    const [productDetails, setProductDetails] = useState(null);

    const [isCategoryClicked, setIsCategoryClicked] = useState(false);

    const scrl = useRef(null);
    const [scrollX, setscrollX] = useState(0);
    const [scrollEnd, setScrollEnd] = useState(false);

    useEffect(() => {
        getAllCategories();
        getInitialProducts();
    }, [])

    useEffect(() => {
        if (categories.length <= 4) {
            setScrollEnd(true);
        }
        else {
            setScrollEnd(false);
        }

        // eslint-disable-next-line
    }, [categories])

    const getAllCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response.data.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const getInitialProducts = async () => {

        try {
            const response = await getAllProducts();
            setProducts(response.data.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const getProductsByCategory = async (categoryId) => {
        setIsCategoryClicked(true);
        setShowProduct(false);
        //api call
        try {
            const response = await getProducts(categoryId);
            setProducts(response.data.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const scroll = (scrollOffset) => {
        scrl.current.scrollLeft += scrollOffset;
        setscrollX(scrollX + scrollOffset);

        if (Math.floor(scrl.current.scrollWidth - (scrl.current.scrollLeft + scrollOffset)) <= scrl.current.offsetWidth) {
            setScrollEnd(true);
        }
        else {
            setScrollEnd(false);
        }
    };

    const handleProductClick = (productId) => {
        getProductDetails(productId);
        setShowProduct(true);
    }

    const getProductDetails = async (productId) => {
        try {
            const response = await getProduct(productId);
            setProductDetails(response.data.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (

        <div className="home">
            {categories.length > 0 && <div className="categories-container">
                {scrollX !== 0 ? <img src={LeftArrow} alt="left-arrow" height="15px" width="15px" style={{ marginLeft: "40px" }} onClick={() => scroll(-326)} /> : <div style={{ marginRight: "40px" }}></div>}
                <div className="categories" ref={scrl}>
                    {categories.map(category => <Category key={category.categoryId} id={category.categoryId} name={category.categoryName} getProductsByCategory={getProductsByCategory} image={category.imageUrl} />)}
                </div>
                {!scrollEnd ? <img src={RightArrow} alt="right-arrow" height="15px" width="15px" style={{ marginRight: "40px" }} onClick={() => scroll(326)} /> : <div style={{ marginRight: "40px" }}></div>}
            </div>}
            {isCategoryClicked === true ?
                <div>
                    {products.length > 0 && products.map(product => <Product key={product.productId} id={product.productId} productName={product.productName} description={product.description} price={product.price} image={product.imageUrl} />)}
                </div>
                :
                showProduct === true && productDetails !== null ?
                    <div>
                        <IndividualProduct id={productDetails.productId} productName={productDetails.productName} description={productDetails.description} price={productDetails.price} image={productDetails.imageUrl} quantity={productDetails.productQuantity} rating={productDetails.rating} numberOfPeopleRated={productDetails.numberOfPeopleRated} />
                    </div>
                    :
                    <div className="product-card-container">
                        {products.length > 0 && products.map(product => <ProductCard key={product.productId} id={product.productId} productName={product.productName} description={product.description} price={product.price} image={product.imageUrl} rating={product.rating} handleProductClick={handleProductClick} />)}
                    </div>
            }
        </div>
    );
}
export default Home;