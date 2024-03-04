import React, { useContext, useEffect, useState } from "react";
// import styles from "./FeaturedProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { cartContext } from "../../CartContextProvider/CartContextProvider";
// import $ from "jquery";

export default function FeaturedProducts() {

  const {addProductToCart , deleteFromCart} = useContext(cartContext);

  // function addMyProduct(id) {
  //   addProductToCart(id)
    
  // }
  
  const [products, setProducts] = useState(null);
  function getProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(function (response) {
        setProducts(response.data.data);
      });
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      {products ? (
        <div className="container mt-5 mb-5">
          <div className="row">
            <div style={{zIndex:'9999', display:'none', padding:"30px" , left:'0'} }
            className="alert position-fixed bottom-0 mt-3 text-center successMsg  "> Product added successfully to your cart
            </div>
            <div style={{zIndex:'9999', display:'none', padding:"30px" , left:'0'} }
            className="alert alert-danger position-fixed bottom-0 mt-3 text-center deleteMsg  "> Product deleted successfully From your cart
            </div>
            {products.map((product) => (
              <div key={product._id} className="col-md-3">
                  <div className="product rounded-3 cursor-pointer px-2 py-4">
                <Link to={`/productsdetails/${product._id}`}>
                    <img src={product.imageCover} className="w-100 " alt="" />
                    <span className="text-success fw-bold font-sm">
                      {product.category.name}
                    </span>
                    <h3 className="h6 fw-bolder">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="d-flex justify-content-between">
                      <span className="text-white-50">{product.price}EGP</span>
                      <span className="text-white-50">
                        <i className="fas fa-star rating-color"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                </Link>
                    <button onClick={() => addProductToCart(product._id)} type="button" id= {`addBtn${product._id}`} className="w-100 fw-bolder button text-white btn btn-success">+ Add </button>
                    <button style={{display:"none"}} onClick={()=> deleteFromCart(product._id)} type="button" id= {`delBtn${product._id}`} className="w-100 fw-bolder text-white button btn btn-danger">- remove </button>
                  </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
