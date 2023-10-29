import { useFormik } from "formik";
import React, { useEffect } from "react";
import { registerValidationSchema } from "../../../validation/validation";

import { useNavigate } from "react-router-dom";
import { postData } from "./../../../helper/api";
import { useContextMain } from "../../../contexts/MainContext";

export default function Register() {
  const { token } = useContextMain();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, []);

  async function submit(values) {
    const [data, errorMessage] = await postData("/api/v1/auth/signup", values);

    if (data?.token) {
      // we can go directly to home if we want but uou should handle and save token in cookies
      navigate("/login");
    } else {
      console.error(errorMessage);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: submit,
    validationSchema: registerValidationSchema,
  });

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold">register now</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* name */}
        <div className="mb-3 input-group-lg">
          <label htmlFor="name" className="form-label fw-bold">
            Name:
          </label>
          <input
            type="text"
            className="form-control mb-2"
            autoComplete="username"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            aria-describedby="nameHelp"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger">{formik.errors.name}</div>
          ) : null}
        </div>
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
        {/* re-password */}
        <div className="mb-3 input-group-lg">
          <label htmlFor="re-password" className="form-label fw-bold">
            Re-Password:
          </label>
          <input
            type="password"
            autoComplete="new-password"
            className="form-control mb-2"
            id="re-password"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            aria-describedby="rePasswordHelp"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger">{formik.errors.rePassword}</div>
          ) : null}
        </div>
        {/* phone */}
        <div className="mb-3 input-group-lg">
          <label htmlFor="phone" className="form-label fw-bold">
            Phone:
          </label>
          <input
            type="tel"
            className="form-control mb-2"
            autoComplete="tel"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            aria-describedby="phoneHelp"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger">{formik.errors.phone}</div>
          ) : null}
        </div>

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
          register now
        </button>
      </form>
    </div>
  );
}
