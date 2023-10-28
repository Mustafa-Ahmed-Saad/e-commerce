import { useFormik } from "formik";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postData } from "../../../helper/api";
import { checkOutValidationSchema } from "../../../validation/validation";
import { useContextMain } from "./../../../contexts/MainContext";

export default function CheckOut() {
  //   get cart id
  const { id } = useParams();
  const { token } = useContextMain();
  const navigate = useNavigate();

  async function submit(formData) {
    console.log(formData);

    if (formData.payment === "cash") {
      //    cash
      delete formData.payment;
      const [data, errorMessage] = await postData(
        `/api/v1/orders/${id}`,
        formData,
        {
          headers: { token: token },
        }
      );

      if (data?.status === "success") {
        navigate("/allorders");
      } else {
        console.log(errorMessage);
      }
    } else {
      //    card
      delete formData.payment;
      const [data, errorMessage] = await postData(
        `/api/v1/orders/checkout-session/${id}`,
        formData,
        {
          headers: { token: token },
          params: {
            url: "https://mustafa-ahmed-saad.github.io/e-commerce/#",
          },
        }
      );

      if (data?.session) {
        window.location.href = data?.session?.url;
        // or use
        // window.open(data?.session?.url, '_blank');
      } else {
        console.log(errorMessage);
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
      payment: "cash",
    },
    onSubmit: submit,
    validationSchema: checkOutValidationSchema,
  });

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold">Checkout now</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* details */}
        <div className="mb-3 input-group-lg">
          <label htmlFor="details" className="form-label fw-bold">
            details:
          </label>
          <input
            type="text"
            className="form-control mb-2"
            id="details"
            name="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.details && formik.touched.details ? (
            <div className="alert alert-danger">{formik.errors.details}</div>
          ) : null}
        </div>
        {/* phone */}
        <div className="mb-3 input-group-lg">
          <label htmlFor="phone" className="form-label fw-bold">
            phone:
          </label>
          <input
            type="tel"
            className="form-control mb-2"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger">{formik.errors.phone}</div>
          ) : null}
        </div>
        {/* city */}
        <div className="mb-3 input-group-lg">
          <label htmlFor="city" className="form-label fw-bold">
            city:
          </label>
          <input
            type="text"
            className="form-control mb-2"
            id="city"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.city && formik.touched.city ? (
            <div className="alert alert-danger">{formik.errors.city}</div>
          ) : null}
        </div>
        {/* payment options */}
        <div className="mb-3 input-group-lg">
          <label htmlFor="payment-options" className="form-label fw-bold">
            payment method options:
          </label>
          <select
            id="payment-options"
            name="payment"
            value={formik.values.payment}
            onChange={formik.handleChange}
            className="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
          >
            <option value="cash" selected>
              cash
            </option>
            <option value="card">credit card</option>
          </select>
          {formik.errors.payment && formik.touched.payment ? (
            <div className="alert alert-danger">{formik.errors.payment}</div>
          ) : null}
        </div>

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
            Checkout
          </button>
        </div>
      </form>
    </div>
  );
}
