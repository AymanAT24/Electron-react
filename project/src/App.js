import "./App.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
// import Categories from "./Components/Categories/Categories";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import SignUp from "./Components/SignUp/SignUp";
// import Products from "./Components/Products/Products";
// import { jwtDecode } from "jwt-decode";

import { useState } from "react";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { useEffect } from "react";
import ProductsDetails from "./Components/ProductsDetails/ProductsDetails";
import BrandsDetails from "./Components/BrandsDetails/BrandsDetails";
import CartContextProvider from "./CartContextProvider/CartContextProvider";
import Payment from "./Components/Payment/Payment";
  
function App() {
  const [userData, setUserData] = useState(null);
  function saveUserData() {
    let decodedToken = localStorage.getItem("userToken");
    setUserData(decodedToken);
  }

  function clearUserData(){
    localStorage.clear()
    setUserData(null)
  }
  let routers = createHashRouter([
    {
      path: "",
      element: <Layout clearUserData={clearUserData} userData={userData} />,
      children: [
        { index: true, element: <CartContextProvider> <Home /> </CartContextProvider>  },
        { path: "productsDetails/:id", element: <ProtectedRoute> <CartContextProvider> <ProductsDetails /> </CartContextProvider> </ProtectedRoute> },
        { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: "brandsDetails/:id", element: <ProtectedRoute> <CartContextProvider> <BrandsDetails /> </CartContextProvider> </ProtectedRoute> },
        { path: "cart", element: <ProtectedRoute> <CartContextProvider> <Cart /> </CartContextProvider> </ProtectedRoute> },
        { path: "payment", element: <ProtectedRoute> <CartContextProvider> <Payment /> </CartContextProvider> </ProtectedRoute> },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "signup", element: <SignUp /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  useEffect(() => {
    if (localStorage.getItem != null  ) {
      saveUserData()
    }
  }, []);
  
  return <RouterProvider router={routers}></RouterProvider>;
}

export default App;
