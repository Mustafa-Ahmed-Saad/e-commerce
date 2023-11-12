import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ErrorImage from "../../../Assets/Images/404.webp";

export default function NotFound() {
  // TODO: create this page
  return (
    <div className="container text-center">
      <LazyLoadImage
        effect="blur"
        className="w-100 object-fit-cover"
        src={ErrorImage}
        alt="error"
      />
    </div>
  );
}
