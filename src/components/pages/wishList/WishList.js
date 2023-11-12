import { faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { useContextMain } from "../../../contexts/MainContext";
import {
  useAddToCardHook,
  useDeleteFromWishList,
  useGetWishListProducts,
} from "../../../helper/hooks/asyncFunction";
import SEO from "../../../helper/SEO";
import Loading from "../../locading/Loading";

export default function WishList() {
  const { loading } = useContextMain();
  const { addToCardHook } = useAddToCardHook();
  const { deleteFromWishList } = useDeleteFromWishList();
  const { wishListProducts, setWishListProducts } = useGetWishListProducts();

  async function addToCart(id) {
    await addToCardHook(id);
  }

  async function deleteProductFromWishList(id) {
    const data = await deleteFromWishList(id);

    if (data) {
      const newProducts = wishListProducts.filter((product) => {
        if (data.includes(product.id)) {
          return product;
        }
      });
      setWishListProducts(newProducts);
    }
  }

  let ui = <Loading />;
  if (!loading) {
    ui =
      wishListProducts?.length > 0 ? (
        <div
          className="container bg-body-tertiary p-5 my-5 wow fadeInLeft rounded-4"
          data-wow-offset="10"
          data-wow-delay="0.2s"
          data-wow-iteration="1"
        >
          <h2 className="fw-bold mb-4">My wish List</h2>

          {wishListProducts?.map(({ title, price, imageCover, id }) => (
            <div
              key={id}
              className="row my-4 bg-body-tertiary mainShadow rounded-3 transtion-5 flex-column flex-sm-row"
            >
              <div className="col-12 col-sm-2">
                <LazyLoadImage
                  effect="blur"
                  className="w-100"
                  src={imageCover}
                  alt="product-img"
                />
              </div>
              <div className="col-12 col-sm-10">
                <div className="row h-100 align-items-center justify-content-between flex-column flex-sm-row">
                  <div className="col-12 col-sm-10">
                    <h3 className="fs-5 fw-bold mb-2">{title}</h3>
                    <div className="text-main fw-bold mb-1">{price} EGP</div>
                    <button
                      className="btn border-0 ps-0 text-danger"
                      onClick={() => {
                        deleteProductFromWishList(id);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} /> remove
                    </button>
                  </div>
                  <div className="col-12 col-sm-2 text-end">
                    <button
                      style={{ minWidth: "64px" }}
                      className="btn btn-outline-main"
                      onClick={() => {
                        addToCart(id);
                      }}
                    >
                      <span className="d-none d-lg-inline-block text-nowrap">
                        add to cart
                      </span>
                      <span className="d-lg-none">
                        <span className="fs-3">+</span>
                        <FontAwesomeIcon
                          icon={faCartShopping}
                          className="text-main fa-lg"
                        />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="container text-center my-5">
          <p className="fw-bold fs-5">
            sorry you do not add any product to your wish list{" "}
            <Link to="/products">go to products</Link>
          </p>
        </div>
      );
  }
  return (
    <>
      <SEO
        title="Wish List"
        description="Wishlist Products"
        facebookType="wishlist"
        twitterType="summary"
      />
      {ui}
    </>
  );
}
