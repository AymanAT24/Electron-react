import React from "react";
// import styles from "./Home.module.css";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import CategoriSlider from "../CategoriSlider/CategoriSlider";

export default function Home() {
  return (
    <>
      <CategoriSlider />
      <FeaturedProducts />
    </>
  );
}
