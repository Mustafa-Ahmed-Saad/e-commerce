import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../../../helper/api";
import ProductSlider from "../../../productSlider/ProductSlider";

export default function Product() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  function handelLove(id) {
    // TODO: change hart icon to red and render and call api
    console.log(id);
  }

  async function getProduct() {
    const [data, errorMessage] = await getData("/api/v1/products/" + id);

    if (data?.data) {
      setProduct(data?.data);
    } else {
      console.log(errorMessage);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="container my-5">
      <div className="row align-items-center">
        <div className="col-4">
          {/* TODO: product slider here and remove this img*/}
          {/* <img
            className="w-100"
            src={productDetails.imageCover}
            alt="product-img"
          /> */}
          <ProductSlider imgUrls={product?.images} />
        </div>
        <div className="col-8">
          <h2>{product?.title}</h2>
          <p>{product?.description}</p>

          <div className="d-flex justify-content-between my-4">
            <div>{product?.price} EGP</div>
            <div>
              <FontAwesomeIcon className="text-warning" icon={faStar} />
              {product?.ratingsAverage}
            </div>
          </div>

          <div className="d-flex justify-content-between ">
            <button className="btn btn-main w-75">+ Add</button>

            <div>
              {/* TODO:handel whenclick Love icon and handel when show all product to make the product in wish list is hart is red */}
              <FontAwesomeIcon
                className={`d-inline-block ms-auto fa-xl`}
                icon={faHeart}
                onClick={() => handelLove(product?.id)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
