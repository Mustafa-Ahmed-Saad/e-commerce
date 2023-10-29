import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { postData } from "../../../helper/api";
import { useNavigate } from "react-router-dom";
import { forgetPasswordValidationSchema } from "../../../validation/validation";
import { useContextMain } from "../../../contexts/MainContext";
import { useForgetPassword } from "../../../helper/hooks/asyncFunction";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [isInputFocused, setInputFocused] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { token } = useContextMain();
  const { forgetPassword } = useForgetPassword();
  let [alertInterval, setAlertInterval] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, []);

  async function submit(value) {
    if (alertInterval) {
      clearTimeout(alertInterval);
    }

    const data = await forgetPassword(value);

    if (data?.statusMsg === "success") {
      setShowAlert(false);
      navigate("/verify-code");
    } else {
      setShowAlert(data.errorMessage);
      setAlertInterval(
        setTimeout(() => {
          setShowAlert(false);
        }, 7000)
      );
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: submit,
    validationSchema: forgetPasswordValidationSchema,
  });

  return (
    <>
      <div className="container mt-5">
        <h2 className="fw-bold">please enter your email</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* email */}
          <div className="mb-3 input-group-lg position-relative">
            <input
              type="text"
              className={`form-control form-control-sm mb-2 ${
                formik.values.email || isInputFocused ? "dirty" : ""
              }`}
              id="forgetPassword-email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={() => {
                formik.handleBlur("email");
                setInputFocused(false);
              }}
              onFocus={() => setInputFocused(true)}
            />

            <label
              htmlFor="forgetPassword-email"
              className={`position-absolute ms-3 top-50 text-black translate-middle-y forgetPasswordEmail transtion-5 ${
                formik.values.email || isInputFocused ? "focused" : ""
              }`}
            >
              Email
            </label>
          </div>
          {/* error from api */}
          {showAlert ? (
            <div className="alert alert-danger">{showAlert}</div>
          ) : null}

          {/* error validation from yup */}
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : null}
          <button type="submit" className="btn btn-outline-main btn-lg">
            verify
          </button>
        </form>
      </div>
    </>
  );
}
