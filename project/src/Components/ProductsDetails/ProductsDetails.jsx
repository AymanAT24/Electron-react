import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import Slider from "react-slick";
import { cartContext } from "../../CartContextProvider/CartContextProvider";
// import $ from "jquery";
// import styles from "./ProductsDetails.module.css";

export default function ProductsDetails() {
  const { addProductToCart , deleteFromCart} = useContext(cartContext);

  // async function addToMyCart(id) {
  //   if ( await addProductToCart(id) == true) {
  //     $(".successMsg").fadeIn(1000, function () {
  //       setTimeout(() => {
  //         $(".successMsg").fadeOut(1000);
  //       }, 2000);
  //     });
  //     $('.delBtn').fadeIn(500)
  //     $('.addBtn').fadeOut(500)
  //   }
  // }
  const [productDetails, setProductDetails] = useState(null);
  let { id } = useParams();
  function getProductDetails() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(function (response) {
        setProductDetails(response.data.data);
        // console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getProductDetails();
  }, );
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {productDetails ? (
        <div className="container mb-5  mt-5">
          <div className="row d-flex justify-content-center align-items-center">
          <div style={{zIndex:'9999', display:'none', padding:"30px" , left:'0'} }
            className="alert position-fixed bottom-0 mt-3 text-center successMsg  "> Product added successfully to your cart
          </div>
          <div style={{zIndex:'9999', display:'none', padding:"30px" , left:'0'} }
            className="alert alert-danger position-fixed bottom-0 mt-3 text-center deleteMsg  "> Product deleted successfully From your cart
          </div>
            <div className="mb-5 col-md-4">
              <Slider {...settings}>
                {productDetails.images.map((img) => (
                  <img
                    key={productDetails._id}
                    src={img}
                    className="w-100 rounded-3"
                    alt="#"
                  />
                ))}
              </Slider>
            </div>
            <div className="col-md-7 ms-5">
              <h3>{productDetails.title}</h3>
              <p>{productDetails.description}</p>
              <h5>Price: {productDetails.price} EGP</h5>
              <h5>Quantity: {productDetails.quantity}</h5>
              <h5>
                Ratings: {productDetails.ratingsAverage}
                <i className="fas fa-star fs-6 ms-1 rating-color"></i>
              </h5>
              <h5>Ratings-Quantity: {productDetails.ratingsQuantity}</h5>
              <button onClick={() => addProductToCart(productDetails._id)} id={`addBtn${productDetails._id}`} className=" btn fw-bold btn-success mt-2 w-100">
                + Add Product To Cart
              </button>
              <button onClick={ () => deleteFromCart(productDetails._id)} style={{display: "none"}} id={`delBtn${productDetails._id}`} className="btn fw-bold btn-danger mt-2 w-100">
                - Remove From Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
