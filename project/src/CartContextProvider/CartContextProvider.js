import axios from "axios";
import React, { createContext } from "react";
import $ from "jquery";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const cartContext = createContext();
export default function CartContextProvider({ children }) {
  const nav = useNavigate();

  const [cartProducts, setCartProducts] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  function getUserCart() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then(function (response) {
        console.log(response.data.data._id);
        setCartProducts(response.data.data.products);
        setNumOfCartItems(response.data.data.__v);
        setTotalCartPrice(response.data.data.totalCartPrice);
        setCartId(response.data.data._id);
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          $(".errorCart").fadeIn(500, () => {
            setTimeout(() => {
              $(".errorCart").fadeOut(500);
              nav("/");
            }, 2000);
          });
        }
      });
  }

  function addProductToCart(proId) {
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: proId,
        },
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      )
      .then(function (response) {
        console.log(response.data.data.totalCartPrice);
        setNumOfCartItems(response.data.numOfCartItems);
        setTotalCartPrice(response.data.data.totalCartPrice);
        // setCartProducts(response.data.data.products);
        if (response.data.status === "success") {
          $(".successMsg").fadeIn(200, function () {
            setTimeout(() => {
              $(".successMsg").fadeOut(500);
            }, 1000);
            $(`#addBtn${proId}`).fadeOut(0);
            $(`#delBtn${proId}`).fadeIn(0);
          });
        }
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          $(".errorCart").fadeIn(500, () => {
            setTimeout(() => {
              $(".errorCart").fadeOut(500);
              nav("");
            }, 1500);
          });
        }
      });
  }

  function deleteFromCart(id) {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then(function (response) {
        // console.log(response.data.data);
        setCartProducts(response.data.data.products);
        setNumOfCartItems(response.data.data.__v);
        setTotalCartPrice(response.data.data.totalCartPrice);
        if (response.data.status === "success") {
          $(".deleteMsg").fadeIn(200, function () {
            setTimeout(() => {
              $(".deleteMsg").fadeOut(500);
            }, 1000);
            $(`#addBtn${id}`).fadeIn(0);
            $(`#delBtn${id}`).fadeOut(0);
          });
        }
      })
      .catch(function (error) {});
  }

  // function updateCount(id,count) {
  //   axios
  //     .put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
  //       "count": count
  //   }, {
  //       headers: { token: localStorage.getItem("userToken") },
  //     })
  //     .then(function (response) {
  //       console.log(response.data.data);
  //       setCartProducts(response.data.data.products);
  //       setNumOfCartItems(response.data.data.__v);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  // useEffect(() => {
  //   getUserCart();
  // }, [cartProducts]);

  function confirmPayment(cartId) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        {
          details: document.getElementById("details").value,
          phone: document.getElementById("phone").value,
          city: document.getElementById("city").value,
        },
        {
          headers: { token: localStorage.getItem("userToken") },
          params: { url: `http://localhost:3000` },
        }
      )
      .then(function (response) {
        console.log(response.data);
        window.open(response.data.session.url);
        // setCartProducts(response.data.data.products);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <cartContext.Provider
      value={{
        getUserCart,
        confirmPayment,
        addProductToCart,
        cartProducts,
        numOfCartItems,
        totalCartPrice,
        deleteFromCart,
        cartId,
      }}
    >
      <div
        style={{ zIndex: "9999", display: "none", padding: "30px", left: "0" }}
        className="alert alert-danger position-fixed bottom-0 mt-3 text-center errorCart "
      >
        {" "}
        No Cart Items
      </div>

      {children}
    </cartContext.Provider>
  );
}
