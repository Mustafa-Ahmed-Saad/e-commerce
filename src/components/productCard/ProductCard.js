import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { postData } from "../../helper/api";
import { useContextMain } from "../../contexts/MainContext";
import toast from "react-hot-toast";

export default function ProductCard({ product, notify }) {
  const navigate = useNavigate();
  const { token, wishList, setCartProducts, setProductsCounter } =
    useContextMain();
  const [wishListProductIds, setWishListProductIds] = useState([]);

  async function addToCart(id) {
    let tLoading = notify("loading", `loading...`);
    const [data, errorMessage] = await postData(
      "/api/v1/cart",
      {
        productId: id,
      },
      {
        headers: {
          token: token,
        },
      }
    );

    if (data?.data?.products) {
      console.log(data?.data);
      // here also return totalprice in (data?.data?.totalCartPrice)
      setCartProducts(data?.data?.products);
      setProductsCounter(data?.data?.products.length);
      toast.dismiss(tLoading);
      notify("success", `${data?.message}`);
    } else {
      toast.dismiss(tLoading);
      notify("error", `Opps ${errorMessage}`);
      console.log(errorMessage);
    }
  }

  async function handelLove(id) {
    // TODO: add to wish list

    if (wishListProductIds.includes(id) || isIdExistInContextWishList(id)) {
      notify("success", "Product already exist in wish list");
    } else {
      let tLoading = notify("loading", `loading...`);
      const [data, errorMessage] = await postData(
        "/api/v1/wishlist",
        {
          productId: id,
        },
        {
          headers: {
            token: token,
          },
        }
      );

      if (data?.data) {
        //  TODO: put data?.data in local storage wishList (setState of wishlist context)
        toast.dismiss(tLoading);
        notify("success", `${data?.message}`);
        setWishListProductIds(data?.data);
      } else {
        toast.dismiss(tLoading);
        notify("error", `Opps ${errorMessage}`);
        console.log(errorMessage);
      }
    }
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

  function isIdExistInContextWishList(ProductId) {
    let isExistInOldWishList = false;
    wishList.forEach((wishlistProduct) => {
      if (wishlistProduct.id === ProductId) {
        isExistInOldWishList = true;
        return;
      }
    });

    return isExistInOldWishList;
  }

  return (
    <>
      <Link
        to={"#"}
        onClick={(e) => {
          goToProduct(e, product.id);
        }}
      >
        <Card className="p-2 mainShadow">
          <Card.Img
            className="object-fit-cover object-position-center"
            style={{ height: "250px" }}
            variant="top"
            src={product.imageCover}
          />
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
            {/* <Card.Text>{product.details}</Card.Text> */}
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
                    wishListProductIds.includes(product.id) ||
                    isIdExistInContextWishList(product.id)
                      ? "text-danger"
                      : null
                  }`}
                  icon={faHeart}
                />
              </span>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </>
  );
}
