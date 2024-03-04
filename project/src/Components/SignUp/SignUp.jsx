import React, { useState } from "react";
import { useFormik } from "formik";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  let navigate = useNavigate()
  let [isLoad, setIsLoad] = useState(false)
  let [msgError, setMsgError] = useState('')
  function handelSignUp(values) {
    setIsLoad(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
    .then(function (response) {
      setIsLoad(false)
      navigate('/Login')
    })
    .catch(function (error) {
      setMsgError(error.response.data.message);
      setIsLoad(false)
    });
  }
  
  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Name is Required";
    } else if (values.name.length < 8) {
      errors.name = "Must be 8 characters or More";
    }

    if (!values.password) {
      errors.password = "Password is Required";
    } else if (values.password.length < 8) {
      errors.password = "Password shoud be more 8 characters";
    }

    if (!values.rePassword) {
      errors.rePassword = "RePassword is Required";
    } else if (values.password !== values.rePassword) {
      errors.rePassword = "Password and RePassword shoud be the same";
    }

    if (!values.email) {
      errors.email = "Email is Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.phone) {
      errors.phone = "Phone is Required";
    } else if (!/^^01[0-2]\d{1,8}$$/.test(values.phone)) {
      errors.phone = "Invalid Phone Number";
    }

    return errors;
  };

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validate,
    onSubmit: handelSignUp,
  });
  return (
    <>
      <div className="w-75 mx-auto py-4">
        <h3 className="fw-bold ">Register Now : </h3>
        {msgError? <div className="alert mt-3 text-dark fw-bold alert-danger">{msgError}</div>: null}
          <form onSubmit={formik.handleSubmit}>
            <label className="fw-bolder" htmlFor="name">Name : </label>
            <input className="form-control mb-2" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" />
            {formik.touched.name && formik.errors.name ? (<div className="alert fw-bold alert-danger">{formik.errors.name}</div>) : null}

            <label className="fw-bolder" htmlFor="name">Email : </label>
            <input className="form-control mb-2" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="text" name="email" id="email" />
            {formik.touched.email && formik.errors.email ? (<div className="alert fw-bold alert-danger">{formik.errors.email}</div>) : null}

            <label className="fw-bolder" htmlFor="name">Phone : </label>
            <input className="form-control mb-2" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone}  type="tel" name="phone" id="phone" />
            {formik.touched.phone && formik.errors.phone ? (<div className="alert fw-bold  alert-danger">{formik.errors.phone}</div>) : null}

            <label className="fw-bolder" htmlFor="name">Password : </label>
            <input className="form-control mb-2" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" />
            {formik.touched.password && formik.errors.password ? (<div className="alert fw-bold alert-danger">{formik.errors.password}</div>) : null}

            <label className="fw-bolder" htmlFor="name">RePassword : </label>
            <input className="form-control mb-2" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" />
            
            {formik.touched.rePassword && formik.errors.rePassword ? (<div className="alert fw-bold alert-danger">{formik.errors.rePassword}</div>) : null}
            {isLoad?<button  type="button" className="btn btn-success text-white"><i className="fas fa-spinner fa-spin"></i></button>:<button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn btn-success text-white"> Register </button>}
            
            
      </form>
      </div>
    </>
  );
}
