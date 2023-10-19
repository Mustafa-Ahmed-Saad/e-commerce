import React from "react";
import ErrorImage from "../../../Assets/Images/404.png";

export default function NotFound() {
  // TODO: create this page
  return (
    <div className="container text-center">
      <img className="w-100 object-fit-cover" src={ErrorImage} alt="error" />
    </div>
  );
}
