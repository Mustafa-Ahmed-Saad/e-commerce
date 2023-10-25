import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginValidationSchema } from "../../../validation/validation";
import { postData } from "../../../helper/api";
import { useContextMain } from "../../../contexts/MainContext";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

export default function Login() {
  const navigate = useNavigate();
  const { token, setToken } = useContextMain();

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, []);

  async function submit(values) {
    const [data, errorMessage] = await postData("/api/v1/auth/signin", values);

    if (data?.token) {
      //  decode token
      const decoded = jwt_decode(data.token);
      // Get the current timestamp in seconds
      const currentTimestamp = Math.floor(Date.now() / 1000);
      // Calculate the difference between expiration and current timestamps
      const timeDifferenceSeconds = decoded.exp - currentTimestamp;
      // Calculate the time difference in days
      const timeDifferenceDays = Math.ceil(
        timeDifferenceSeconds / (60 * 60 * 24)
      );
      Cookies.set("token", data.token, { expires: timeDifferenceDays }); // Expires in ... days
      setToken(data.token);
      navigate("/home");
    } else {
      console.log(errorMessage);
    }
  }

  function handelForgetPassword(e) {
    navigate("/forget-password");
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: submit,
    validationSchema: loginValidationSchema,
  });

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold">login now</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* email */}
        <div className="mb-3 input-group-lg">
          <label htmlFor="email" className="form-label fw-bold">
            Email:
          </label>
          <input
            type="email"
            autoComplete="email"
            className="form-control mb-2"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            aria-describedby="emailHelp"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : null}
        </div>
        {/* password */}
        <div className="mb-3 input-group-lg">
          <label htmlFor="password" className="form-label fw-bold">
            Password:
          </label>
          <input
            type="password"
            autoComplete="new-password"
            className="form-control mb-2"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            aria-describedby="passwordHelp"
          />
          {formik.errors.password && formik.touched.password ? (
            <div
              className="alert alert-danger"
              dangerouslySetInnerHTML={{ __html: formik.errors.password }}
            />
          ) : null}
        </div>
        <p
          type="button"
          onClick={handelForgetPassword}
          className="align-self-start fs-5 fw-bold forget-password transtion-5"
        >
          forget your password ?
        </p>
        <div className="d-flex align-items-center justify-content-between">
          {/* submit btn */}
          <button
            className={`btn btn-lg d-block ms-auto ${
              formik.isValid && formik.dirty
                ? "btn-main"
                : "btn-outline-secondary"
            }`}
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
          >
            login now
          </button>
        </div>
      </form>
    </div>
  );
}
