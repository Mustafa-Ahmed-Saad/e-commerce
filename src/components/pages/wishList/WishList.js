import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import img from "../../../Assets/Images/11.jpg";
import WishListContextProvider, {
  useContextWishList,
} from "../../../contexts/WishListContext";
import { deleteData } from "../../../helper/api";
import { useContextAuth } from "./../../../contexts/AuthContext";

export default function WishList() {
  // TODO: get wishList from context and show them
  // TODO: when click on addToCart add this product to cart
  // TODO: when click on deleteFromWishlist we will call api and thien id success set state of context wishlist

  const { wishList, setWishList } = useContextWishList();
  const { token } = useContextAuth();

  function addToCart(id) {
    console.log("id", id);
  }

  async function deleteFromWishList(id) {
    if (token) {
      const [data, errorMessage] = await deleteData(`/api/v1/wishlist/${id}`, {
        headers: { token: token },
      });

      if (data?.data) {
        //     TODO: setWishlistContext and if wishlist handel
        let oldWishlist = [...wishList];
        const newWishlist = oldWishlist.filter((product, index) =>
          data?.data.includes(product.id)
        );
        setWishList(newWishlist);
      } else {
        console.log(errorMessage);
      }
    }
  }

  useEffect(() => {
    console.log(wishList);
  }, [wishList]);

  return (
    <>
      <div className="container bg-body-tertiary p-5 my-5">
        <h2 className="fw-bold mb-4">My wish List</h2>
        <WishListContextProvider>
          {wishList?.map(({ title, price, imageCover, id }) => (
            <div className="row my-4 mainShadow rounded-3 transtion-5" key={id}>
              <div className="col-2">
                <img className="w-100" src={imageCover} alt="product-img" />
              </div>
              <div className="col-10">
                <div className="d-flex h-100 align-items-center justify-content-between">
                  <div>
                    <h3 className="fs-5 fw-bold mb-2">{title}</h3>
                    <div className="text-main fw-bold mb-1">{price} EGP</div>
                    <button
                      className="btn border-0 ps-0 text-danger"
                      onClick={() => {
                        deleteFromWishList(id);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} /> remove
                    </button>
                  </div>
                  <button
                    className="btn btn-outline-main"
                    onClick={() => {
                      addToCart(id);
                    }}
                  >
                    add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </WishListContextProvider>
      </div>
    </>
  );
}
