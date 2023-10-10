import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContextAuth } from "../../../contexts/AuthContext";
import { putData } from "../../../helper/api";
import { resetPasswordSchema } from "../../../validation/validation";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token, setToken } = useContextAuth();

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, []);

  async function submit(values) {
    const [data, errorMessage] = await putData(
      "/api/v1/auth/resetPassword",
      values
    );

    if (data?.token) {
      navigate("/login");
    } else {
      console.log(errorMessage);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: submit,
    validationSchema: resetPasswordSchema,
  });

  return (
    <>
      <div className="container py-5">
        <h2 className="mb-4 fw-bold">reset your account password</h2>
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
          {/* newPassword */}
          <div className="mb-3 input-group-lg">
            <label htmlFor="newPassword" className="form-label fw-bold">
              newPassword:
            </label>
            <input
              type="password"
              autoComplete="new-password"
              className="form-control mb-2"
              id="newPassword"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              aria-describedby="passwordHelp"
            />
            {formik.errors.newPassword && formik.touched.newPassword ? (
              <div
                className="alert alert-danger"
                dangerouslySetInnerHTML={{ __html: formik.errors.newPassword }}
              />
            ) : null}
          </div>
          {/* submit btn */}
          <button
            className={`btn btn-lg d-block mt-4 ${
              formik.isValid && formik.dirty
                ? "btn-main"
                : "btn-outline-secondary"
            }`}
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
          >
            reset password
          </button>
        </form>
      </div>
    </>
  );
}
