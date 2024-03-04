import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ saveUserData }) {
  let navigate = useNavigate();
  let [isLoad, setIsLoad] = useState(false);
  let [msgError, setMsgError] = useState("");
  function handelLogin(values) {
    setIsLoad(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(function (response) {
        localStorage.setItem("userToken",response.data.token);
        saveUserData();
        setIsLoad(false);
        navigate("/");
      })
      .catch(function (error) {
        setMsgError(error.response.data.message);
        setIsLoad(false);
      });
  }

  const validate = (values) => {
    const errors = {};

    if (!values.password) {
      errors.password = "Password is Required";
    } else if (values.password.length < 8) {
      errors.password = "Password shoud be more 8 characters";
    }

    if (!values.email) {
      errors.email = "Email is Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: handelLogin,
  });
  return (
    <>
      <div className="w-75 mx-auto py-4">
        <h3 className="fw-bold ">Login Now : </h3>
        {msgError ? (
          <div className="alert mt-3 text-dark fw-bold alert-danger">
            {msgError}
          </div>
        ) : null}
        <form onSubmit={formik.handleSubmit}>
          <label className="fw-bolder" htmlFor="email">
            Email :
          </label>
          <input
            className="form-control mb-2"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            type="text"
            name="email"
            id="email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="alert fw-bold alert-danger">
              {formik.errors.email}
            </div>
          ) : null}

          <label className="fw-bolder" htmlFor="password">
            Password :
          </label>
          <input
            className="form-control mb-2"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            type="password"
            name="password"
            id="password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="alert fw-bold alert-danger">
              {formik.errors.password}
            </div>
          ) : null}

          {isLoad ? (
            <button type="button" className="btn btn-success text-white">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn btn-success text-white"
            >
              Login
            </button>
          )}
        </form>
      </div>
    </>
  );
}
