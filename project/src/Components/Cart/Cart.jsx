// import styles from "./Cart.module.css";
// import axios from "axios";
import { Link } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { useContext, useEffect } from "react";
import { cartContext } from "../../CartContextProvider/CartContextProvider";


export default function Cart() {
  const {getUserCart,cartProducts,deleteFromCart, totalCartPrice} = useContext(cartContext)

  useEffect(() => {
    getUserCart()
    
  }, [])
  

  return (
    <>
      {totalCartPrice?      
      <div className="container mt-5 mb-5">
        <div className="row">
        <div style={{zIndex:'9999', display:'none', padding:"30px" , left:'0'} }
            className="alert alert-danger position-fixed bottom-0 mt-3 text-center deleteMsg  "> Product deleted successfully From your cart
        </div>
        <div className=" mt-5 mb-5 d-flex justify-content-between align-items-center">
          <h3 className=" text-white-50 ">Total Price : <span className="text-primary">{totalCartPrice}EGP</span></h3>
          <Link to={'/payment'}>
          <button className="btn btn-success">Confirm</button>
          </Link>
        </div>
          {cartProducts.map((product) => (
            <div key={product._id} className="col-md-3">
              <div className="product rounded-3 cursor-pointer px-2 py-4">
              <Link to={`/productsdetails/${product.product._id}`}>
                    <img src={product.product.imageCover} className="w-100 " alt="" />
                    <span className="text-success fw-bold font-sm">
                      {product.product.category.name}
                    </span>
                    <h3 className="h6 fw-bolder">
                      {product.product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="d-flex justify-content-between">
                      <span className="text-white-50">{product.price}EGP</span>
                      <span className="text-white-50">
                        <i className="fas fa-star rating-color"></i>
                        {product.product.ratingsAverage}
                      </span>
                    </div>
                </Link>
                    <button onClick={()=> deleteFromCart(product.product._id)} type="button" id= {`delBtn${product.product._id}`} className="w-100 fw-bolder text-white mt-2 button-cart btn btn-danger">- Remove Product </button>
              </div>
            </div>
          ))}
        </div>
      </div> : <LoadingScreen/>}
    </>
  );
}
