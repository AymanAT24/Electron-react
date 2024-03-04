import React, { useEffect, useState } from "react";
// import styles from "./Brands.module.css";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Link } from "react-router-dom";

export default function Brands() {
  const [allBrands, setallBrands] = useState(null);
  function getAllBrands() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .then(function (response) {
        setallBrands(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <>
      {allBrands ? (
        <div className="container mt-5">
          <div className="row justify-content-center align-items-center">
            <div className=" col-md-3">
              <h3 className=" text-info fw-bold">Our Brands</h3>
              <p>
                You can see our brands and each brand inclues the product in it.
              </p>
            </div>
            {allBrands.map((brand) => (
              <div key={brand._id} className="col-md-3 text-center mt-3 mb-3">
                <Link to={`/brandsdetails/${brand._id}`}>
                  <div className="brand">
                    <img src={brand.image} className="w-100" alt={brand.name} />
                    <h5 className=" fw-bold text-white-50 mt-3">
                      {brand.name}
                    </h5>
                  </div>
                </Link>
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
