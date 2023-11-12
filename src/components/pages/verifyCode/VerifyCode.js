import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useContextMain } from "../../../contexts/MainContext";
import { useVerifyCodeHook } from "../../../helper/hooks/asyncFunction";
import { codeValidationSchema } from "../../../validation/validation";

export default function VerifyCode() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const { token } = useContextMain();
  const [isInputFocused, setInputFocused] = useState(false);

  const { verifyCodeHook } = useVerifyCodeHook();

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowAlert(false);
    }, 7000);
  }, [showAlert]);

  async function submit(value) {
    const data = await verifyCodeHook(value);

    if (data.status === "Success") {
      setShowAlert(false);
    } else {
      setShowAlert(data.errorMessage);
    }
  }

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: submit,
    validationSchema: codeValidationSchema,
  });

  return (
    <div className="container mt-5">
      <h2 className="fw-bold">please enter your resetCode</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* resetCode */}
        <div className="mb-3 input-group-lg position-relative">
          <input
            type="text"
            className={`form-control form-control-sm mb-2 ${
              formik.values.resetCode || isInputFocused ? "dirty" : ""
            }`}
            id="resetCode"
            name="resetCode"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={() => {
              formik.handleBlur("resetCode");
              setInputFocused(false);
            }}
            onFocus={() => setInputFocused(true)}
          />

          <label
            htmlFor="resetCode"
            className={`position-absolute ms-3 top-50 text-black translate-middle-y resetCode transtion-5 ${
              formik.values.resetCode || isInputFocused ? "focused" : ""
            }`}
          >
            code
          </label>
        </div>
        {/* error from api */}
        {showAlert ? (
          <div className="alert alert-danger">{showAlert}</div>
        ) : null}

        {/* error validation from yup */}
        {formik.errors.resetCode && formik.touched.resetCode ? (
          <div className="alert alert-danger">{formik.errors.resetCode}</div>
        ) : null}
        <button type="submit" className="btn btn-outline-main btn-lg">
          verify
        </button>
      </form>
    </div>
  );
}
