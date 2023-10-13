/* eslint-disable no-useless-escape */
import * as Yup from "yup";

export const registerValidationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Min Length must be greater than 3 letters")
    .max(20, "Max Length must be less than 20 letters")
    .matches(/^[a-z].*$/i, "name should start with 1 letter at least"),
  email: Yup.string()
    .required("Email is required")
    // .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Enter valid email"),
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Enter valid email"
    ),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^[a-zA-Z](?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,17}$/i,
      `must be <br />
      * Start with a letter (either uppercase or lowercase). <br />
      * Be between 6 and 17 characters in total. <br />
      * contain special characters like (!@#$%^&*). <br />
      * Can only contain letters (A-Z or a-z), numbers (0-9) and special characters`
      //   "Password must have special character, letter, number and must be greater than 7"
    ),
  rePassword: Yup.string()
    .required("RePassword is required")
    .oneOf([Yup.ref("password")]),
  phone: Yup.string()
    .required("Phone number in required")
    .matches(
      /^01[0125][0-9]{8}$/,
      "Enter valid number phone number should start with 01"
    ),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    // .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Enter valid email"),
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Enter valid email"
    ),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^[a-zA-Z](?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,17}$/i,
      `must be <br />
      * Start with a letter (either uppercase or lowercase). <br />
      * Be between 6 and 17 characters in total. <br />
      * contain special characters like (!@#$%^&*). <br />
      * Can only contain letters (A-Z or a-z), numbers (0-9) and special characters`
      //   "Password must have special character, letter, number and must be greater than 7"
    ),
});

export const resetPasswordSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    // .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Enter valid email"),
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Enter valid email"
    ),
  newPassword: Yup.string()
    .required("Password is required")
    .matches(
      /^[a-zA-Z](?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,17}$/i,
      `must be <br />
      * Start with a letter (either uppercase or lowercase). <br />
      * Be between 6 and 17 characters in total. <br />
      * contain special characters like (!@#$%^&*). <br />
      * Can only contain letters (A-Z or a-z), numbers (0-9) and special characters`
      //   "Password must have special character, letter, number and must be greater than 7"
    ),
});

export const forgetPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    // .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Enter valid email"),
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Enter valid email"
    ),
});

export const codeValidationSchema = Yup.object({
  resetCode: Yup.string()
    .required("resetCode is required")
    .test("len", "Must be more than 2 characters", (val) => {
      return val.length > 2;
    }),
});

export const checkOutValidationSchema = Yup.object({
  details: Yup.string()
    .required("details is required")
    .test("len", "Must be more than 10 characters", (val) => {
      return val.length > 10;
    }),
  phone: Yup.string()
    .required("Phone number in required")
    .matches(
      /^01[0125][0-9]{8}$/,
      "Enter valid number phone number should start with 01"
    ),
  city: Yup.string()
    .required("city is required")
    .test("len", "Must be more than 5 characters", (val) => {
      return val.length > 5;
    }),
  payment: Yup.string().required("city is required"),
});
