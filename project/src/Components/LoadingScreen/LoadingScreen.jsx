import React from "react";
// import styles from "./LoadingScreen.module.css";

export default function LoadingScreen() {
  return (
    <>
      <div className="vh-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
        <div className="fa-solid text-white fa-spinner fa-spin fa-7x"></div>
      </div>
    </>
  );
}
