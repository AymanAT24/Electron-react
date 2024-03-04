// import axios from "axios";
import React, { useContext } from "react";
import { cartContext } from "../../CartContextProvider/CartContextProvider";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
// import styles from "./Payment.module.css";

export default function Payment() {

  const {cartId,confirmPayment} = useContext(cartContext)

  console.log(cartId)

  

  return (
    <>
      {cartId?
      <>   
        <h2 className="text-center fw-bolder text-white-50 mt-5 ">Enter your payment details</h2>
      <div className="container mt-5 mb-5 d-flex justify-content-center align-items-center">
      <div className="w-50 align-content-center m-auto">
    
          <form  >
            <label className="fw-bolder" htmlFor="details">Address Details:</label>
            <input className="form-control  mb-3" placeholder="Address Details" type="text" id="details" />

            <label className="fw-bolder" htmlFor="phone ">Phone:</label>
            <input className="form-control  mb-3" placeholder="phone" type="number" id="phone" />

            <label className="fw-bolder" htmlFor="city">City:</label>
            <input className="form-control mb-3" placeholder="city" type="text" id="city" />
            <button onClick={ ()=> confirmPayment(cartId) } type="button" className=" btn btn-primary" > Confirm Payment </button>
          </form>
          </div>
      </div>  </> : <LoadingScreen/>}
    </>
  );
}
