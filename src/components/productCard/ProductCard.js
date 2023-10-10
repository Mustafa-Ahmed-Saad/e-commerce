import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { postData } from "../../helper/api";
import { useContextAuth } from "../../contexts/AuthContext";
import { useContextWishList } from "../../contexts/WishListContext";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { token } = useContextAuth();
  const [wishListProductIds, setWishListProductIds] = useState([]);
  const { wishList } = useContextWishList();

  async function handelLove(id) {
    // TODO: change hart icon to red and render and call api
    // TODO: add to wish list
    console.log(id);

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

    // TODO: conteniue
    if (data?.data) {
      //   put data?.data in local storage wishList (setState of wishlist context)
      //   show tost message data?.message

      setWishListProductIds(data?.data);
    } else {
      //   show tost message "sorry something wrong happen please try but product in wishlist later"
      console.log(errorMessage);
    }
  }

  function goToProduct(e, id) {
    const targetElement = e.target;
    // TODO: add to cart
    // console.log(e.target.classList.contains("addToCart"));

    if (
      !targetElement.classList.contains("addToCart") &&
      !targetElement.parentElement.classList.contains("heartIcon")
    ) {
      navigate("/products/" + id);
    }
  }

  let isExistInOldWishList = false;
  wishList.forEach((wishlistProduct) => {
    if (wishlistProduct.id === product.id) {
      isExistInOldWishList = true;
      return;
    }
  });

  return (
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
              overlay={<Tooltip id={`tooltip-bottom`}>{product.title}</Tooltip>}
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
            <Button variant="btn btn-main me-auto d-inline-block w-75 me-2 addToCart">
              + add
            </Button>
            {/* TODO:handel whenclick Love icon and handel when show all product to make the product in wish list is hart is red */}
            {/* <FontAwesomeIcon
              className={`d-inline-block ms-auto fa-xl ${
                product.loved ? "text-danger" : null
              }`}
              icon={faHeart}
              onClick={() => handelLove(product.id)}
            /> */}
            <span className="heartIcon" onClick={() => handelLove(product.id)}>
              <FontAwesomeIcon
                className={`d-inline-block ms-auto fa-xl heartIcon ${
                  wishListProductIds.includes(product.id) ||
                  isExistInOldWishList
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
  );
}
