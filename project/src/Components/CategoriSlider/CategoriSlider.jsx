import axios from "axios";
import React, { useEffect, useState } from "react";
// import styles from "./CategoriSlider.module.css";
import Slider from "react-slick";

export default function CategoriSlider() {
  const [categories, setcategories] = useState([]);

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(function (response) {
        setcategories(response.data.data);
        // console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };

  return (
    <div className="container">
      <div className="row">
        <Slider {...settings}>
          {categories.map((category) => (
            <div className="mt-5 " key={category._id}>
              <img alt="#" className="w-100" height={200} src={category.image} />
              <h2 className="h6">{category.name}</h2>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
