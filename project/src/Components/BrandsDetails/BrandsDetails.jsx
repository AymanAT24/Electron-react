import React, { useContext, useEffect, useState } from "react";
// import styles from "./BrandsDetails.module.css";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Link, useParams } from "react-router-dom";
import { cartContext } from "../../CartContextProvider/CartContextProvider";
// import $ from "jquery";

export default function BrandsDetails() {
  const { addProductToCart, deleteFromCart } = useContext(cartContext);



  const [brandsDetails, setBrandsDetails] = useState(null);
  let { id } = useParams();
  function getBrandDetailes() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`, {
        params: { brand: id },
      })
      .then(function (response) {
        setBrandsDetails(response.data.data);
        // console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    getBrandDetailes();
  }, );

  return (
    <>
      {brandsDetails ? (
        <div className="container">
          <div className="row">
          <div style={{zIndex:'9999', display:'none', padding:"30px" , left:'0'} }
            className="alert position-fixed bottom-0 mt-3 text-center successMsg  "> Product added successfully to your cart
            </div>
          <div style={{zIndex:'9999', display:'none', padding:"30px" , left:'0'} }
            className="alert alert-danger position-fixed bottom-0 mt-3 text-center deleteMsg  "> Product deleted successfully From your cart
          </div>
            {brandsDetails === null ? (
              <h2 className="text-center py-5 mt-5">
                No Products Available Right Now ..
              </h2>
            ) : (
              brandsDetails.map((pro) => (
                <div key={pro._id} className="col-md-3">
                  <div className="product rounded-3 cursor-pointer px-2 py-4">
                    <Link to={`/productsdetails/${pro._id}`}>
                      <img src={pro.imageCover} className="w-100 " alt="#" />
                      <span className="text-success fw-bold font-sm">
                        {pro.category.name}
                      </span>
                      <h3 className="h6 fw-bolder">
                        {pro.title.split(" ").slice(0, 2).join(" ")}
                      </h3>
                      <div className="d-flex justify-content-between">
                        <span className="text-white-50">{pro.price}EGP</span>
                        <span className="text-white-50">
                          <i className="fas fa-star rating-color"></i>
                          {pro.ratingsAverage}
                        </span>
                      </div>
                    </Link>
                    <button onClick={() => addProductToCart(pro._id)} id= {`addBtn${pro._id}`} type="button" className=" w-100 fw-bolder text-white btn btn-success">+ Add </button>
                    <button onClick={() => deleteFromCart(pro._id)} style={{display:"none"}} id={`delBtn${pro._id}`} type="button" className=" w-100 fw-bolder text-white btn btn-danger">- remove </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
