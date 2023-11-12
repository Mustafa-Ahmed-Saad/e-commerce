import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useContextMain } from "../../contexts/MainContext";
import {
  useAddToCardHook,
  useHandelLoveHook,
} from "../../helper/hooks/asyncFunction";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function ProductCard({ product, index }) {
  const navigate = useNavigate();
  const { wishList } = useContextMain();
  const { handelLoveHook } = useHandelLoveHook();
  const { addToCardHook } = useAddToCardHook();

  async function addToCart(id) {
    await addToCardHook(id);
  }

  async function handelLove(id) {
    await handelLoveHook(id);
  }

  function goToProduct(e, id) {
    const targetElement = e.target;

    if (
      !targetElement.classList.contains("addToCart") &&
      !targetElement.parentElement.classList.contains("heartIcon")
    ) {
      navigate("/products/" + id);
    }
  }

  let wowDelay = "0.1s";
  if (index % 4 === 0) {
    wowDelay = "0.2s";
  } else if (index % 4 === 1) {
    wowDelay = "0.4s";
  } else if (index % 4 === 2) {
    wowDelay = "0.6s";
  } else if (index % 4 === 3) {
    wowDelay = "0.8s";
  }

  return (
    <>
      <div
        onClick={(e) => {
          goToProduct(e, product.id);
        }}
      >
        <Card
          className="p-2 mainShadow wow fadeInUp"
          data-wow-offset="10"
          data-wow-delay={wowDelay}
          data-wow-iteration="1"
        >
          <LazyLoadImage
            effect="blur"
            className="w-100 object-fit-cover object-position-center rounded-top-2"
            variant="top"
            src={product.imageCover}
            alt="product-img"
            height="250px"
          />
          {/* <Card.Img
              className="object-fit-cover object-position-center"
              style={{ height: "250px" }}
              variant="top"
              src={product.imageCover}
            /> */}

          <Card.Body>
            <Card.Title className="text-main fs-6">
              <small>{product.category.name}</small>
            </Card.Title>
            <Card.Title className="fw-bold fs-5">
              <OverlayTrigger
                key="bottom"
                placement="bottom"
                overlay={
                  <Tooltip id={`tooltip-bottom`}>{product.title}</Tooltip>
                }
              >
                <div>
                  {product.title.length > 15
                    ? product.title.slice(0, 15)
                    : product.title}
                </div>
              </OverlayTrigger>
            </Card.Title>
            <div className="d-flex my-3 justify-content-between">
              <div>
                <span>{product.price} EGP</span>
              </div>
              <div>
                <FontAwesomeIcon className="text-warning" icon={faStar} />
                <span>{product.ratingsAverage}</span>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <Button
                variant="btn btn-main me-auto d-inline-block w-75 me-2 addToCart"
                onClick={() => {
                  addToCart(product.id);
                }}
              >
                + add
              </Button>
              <span
                className="heartIcon"
                onClick={() => handelLove(product.id)}
              >
                <FontAwesomeIcon
                  className={`d-inline-block ms-auto fa-xl heartIcon ${
                    wishList?.includes(product.id) ? "text-danger" : null
                  }`}
                  icon={faHeart}
                />
              </span>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
