import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/electron-logo.png'

export default function Navbar({userData,clearUserData}) {
  return (
    <>
      <nav className="navbar shadow-lg navbar-dark navbar-expand-lg sticky-top ">
  <div className="container">
    <Link className="navbar-brand" to=" "><img width={110} src={logo} alt="" /></Link>
    <button className="navbar-toggler text-bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">

      {userData !== null? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item ">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="brands">Brands</Link>
        </li> 
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="cart">Cart</Link>
        </li>
      </ul> : null }
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="d-flex justify-content-center align-items-center">
          <i className="fa-brands fa-facebook me-3"></i>
          <i className="fa-brands fa-twitter me-3"></i>
          <i className="fa-brands fa-instagram me-3"></i>
          <i className="fa-brands fa-tiktok me-3"></i>
          <i className="fa-brands fa-youtube me-3"></i>
          <i className="fa-brands fa-linkedin me-3"></i>
        </li>
        
        { userData == null? <>
          <li className="nav-item">
          <Link className="btn btn-outline-success mb-md-3 me-2" aria-current="page" to="login">Login</Link>
          </li>
          <li className="nav-item">
          <Link className="btn btn-outline-success " aria-current="page" to="signup">SignUp</Link>
          </li>
          </> : <li className="nav-item">
          <Link className="btn btn-outline-danger " onClick={clearUserData} aria-current="page" to="/">Logout</Link>
          </li> }


      </ul>
    </div>
  </div>
</nav>
    </>
  );
}
