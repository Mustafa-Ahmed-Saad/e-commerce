import { deleteData, getData, postData, putData } from "../api";
import { useContextMain } from "../../contexts/MainContext";
import { toast } from "react-hot-toast";
import { notify } from "../toastFire";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

export function useFetchProducts() {
  const { setAllAppProducts } = useContextMain();

  const fetchProducts = async () => {
    const [data, errorMessage] = await getData("/api/v1/products");

    if (data?.data) {
      setAllAppProducts(data.data);
      return data.data;
    } else {
      console.error(errorMessage);
      return [];
    }
  };

  return {
    fetchProducts,
  };
}

export function useFetchBrand() {
  const fetchBrand = async (id) => {
    const [data, errorMessage] = await getData("/api/v1/brands/" + id);

    if (data?.data) {
      return data.data;
    } else {
      console.error(errorMessage);
      return { name: "oops something went wrong" };
    }
  };

  return {
    fetchBrand,
  };
}

export function useFetchCategories() {
  const fetchCategories = async () => {
    const [data, errorMessage] = await getData("/api/v1/categories");

    if (data?.data) {
      return data.data;
    } else {
      console.error(errorMessage);
      return [];
    }
  };

  return {
    fetchCategories,
  };
}

export function useFetchAllOrders() {
  const fetchAllOrders = async (userId) => {
    const [data, errorMessage] = await getData(`/api/v1/orders/user/${userId}`);

    if (data) {
      return data;
    } else {
      console.error(errorMessage);
      return [];
    }
  };

  return {
    fetchAllOrders,
  };
}

export function useFetchBrands() {
  const fetchCategories = async () => {
    const [data, errorMessage] = await getData("/api/v1/brands");

    if (data?.data) {
      return data.data;
    } else {
      console.error(errorMessage);
      return [];
    }
  };

  return {
    fetchCategories,
  };
}

export function useDeleteFromCartHook(id) {
  const { token, setProductsCounter, productsQuantity, setProductsQuantity } =
    useContextMain();

  const deleteFromCartHook = async (id) => {
    let tLoading = notify("loading", `loading...`);
    const [data, errorMessage] = await deleteData(`/api/v1/cart/${id}`, {
      headers: { token: token },
    });

    if (data?.data) {
      toast.dismiss(tLoading);
      notify("success", "product deleted successfully from cart");
      setProductsCounter((prev) => prev - 1);
      const pq = { ...productsQuantity };
      delete pq[id];
      setProductsQuantity(pq);
      return data.data;
    } else {
      toast.dismiss(tLoading);
      notify("error", `Opps ${errorMessage}`);
      return { products: [], totalCartPrice: 0, myError: errorMessage };
    }
  };

  return {
    deleteFromCartHook,
  };
}

export function useFetchCartProducts() {
  const { token, setProductsCounter, setUserId } = useContextMain();

  const fetchCartProducts = async () => {
    const [data, errorMessage] = await getData(`/api/v1/cart`, {
      headers: { token: token },
    });

    if (data?.data?.products) {
      setProductsCounter(data.data.products.length || 0);
      setUserId(data.data.cartOwner);
      return {
        _id: data.data._id,
        products: data.data.products,
        totalCartPrice: data.data.totalCartPrice,
      };
    } else {
      // TODO: show tost
      console.error(errorMessage);
      return {
        _id: 0,
        products: [],
        totalCartPrice: 0,
      };
    }
  };

  return {
    fetchCartProducts,
  };
}

export function useClearAllProductsCart() {
  const { token, setProductsCounter } = useContextMain();

  const clearAllProductsCart = async () => {
    const [data, errorMessage] = await deleteData(`/api/v1/cart`, {
      headers: { token: token },
    });

    if (data?.message === "success") {
      setProductsCounter(0);
      return "done";
    } else {
      // TODO: show tost
      console.error(errorMessage);
    }
  };

  return {
    clearAllProductsCart,
  };
}

export function useUpdateQuantity() {
  const { token, setProductsCounter } = useContextMain();

  const updateQuantity = async (productId, count) => {
    let tLoading = notify("loading", `loading...`);
    const [data, errorMessage] = await putData(
      `/api/v1/cart/${productId}`,
      {
        count,
      },
      {
        headers: {
          token: token,
        },
      }
    );

    if (data?.data) {
      toast.dismiss(tLoading);
      notify("success", "Successfully");
      return {
        products: data?.data.products,
        totalCartPrice: data.data.totalCartPrice,
      };
    } else {
      toast.dismiss(tLoading);
      notify("error", `Opps ${errorMessage}`);
      console.error(errorMessage);
    }
  };

  return {
    updateQuantity,
  };
}

export function useFetchCategory() {
  const { token, setProductsCounter } = useContextMain();

  const fetchCategory = async (id) => {
    const [data, errorMessage] = await getData(
      "/api/v1/categories/" + id + "/subcategories"
    );

    if (data?.data) {
      return data.data;
    } else {
      console.error(errorMessage);
      return [];
    }
  };

  return {
    fetchCategory,
  };
}

export function useCashPayment() {
  const { token } = useContextMain();
  const navigate = useNavigate();

  const cashPayment = async (id, formData) => {
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
      return "done";
    } else {
      console.error(errorMessage);
    }
  };

  return {
    cashPayment,
  };
}

export function useCardPayment() {
  const { token } = useContextMain();

  const cardPayment = async (id, formData) => {
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
      return "done";
    } else {
      console.error(errorMessage);
    }
  };

  return {
    cardPayment,
  };
}

export function useForgetPassword() {
  const navigate = useNavigate();

  const forgetPassword = async (value) => {
    const [data, errorMessage] = await postData(
      "/api/v1/auth/forgotPasswords",
      value
    );

    if (data?.statusMsg === "success") {
      navigate("/verify-code");
      return {
        statusMsg: "success",
      };
    } else {
      console.error(errorMessage || data?.message);
      return { errorMessage: errorMessage || data?.message };
    }
  };

  return {
    forgetPassword,
  };
}

export function useLoginHook() {
  const { setToken } = useContextMain();
  const navigate = useNavigate();

  const loginHook = async (values) => {
    const [data, errorMessage] = await postData("/api/v1/auth/signin", values);

    if (data?.token) {
      //  decode token
      const decoded = jwt_decode(data.token);
      // Get the current timestamp in seconds
      const currentTimestamp = Math.floor(Date.now() / 1000);
      // Calculate the difference between expiration and current timestamps
      const timeDifferenceSeconds = decoded.exp - currentTimestamp;
      // Calculate the time difference in days
      const timeDifferenceDays = Math.ceil(
        timeDifferenceSeconds / (60 * 60 * 24)
      );
      Cookies.set("token", data.token, { expires: timeDifferenceDays }); // Expires in ... days
      setToken(data.token);
      navigate("/home");
      return "done";
    } else {
      // TODO: handel Error here
      console.error(errorMessage);
    }
  };

  return {
    loginHook,
  };
}

export function useHandelLoveHook() {
  const { wishList, setWishList, token } = useContextMain();

  const handelLoveHook = async (id) => {
    // TODO: check here on this ((wishListProductIds.includes(id) || isIdExistInContextWishList(id)) )
    if (wishList?.includes(id)) {
      notify("success", "product already exist in wish list");
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

      // TODO: conteniue
      if (data?.data) {
        //   put data?.data in local storage wishList (setState of wishlist context)
        toast.dismiss(tLoading);
        notify("success", `${data?.message}`);
        setWishList(data?.data);
        return "done";
      } else {
        toast.dismiss(tLoading);
        notify("error", `Opps ${errorMessage}`);
        console.error(errorMessage);
      }
    }
  };

  return {
    handelLoveHook,
  };
}

export function useAddToCardHook() {
  const { wishList, setProductsCounter, token } = useContextMain();

  const addToCardHook = async (id) => {
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
      // make like wishList an create context for product cart and set this peoduct context from here
      toast.dismiss(tLoading);
      notify("success", `${data.message}`);
      // here also return totalprice in (data?.data?.totalCartPrice)
      setProductsCounter(data.data.products.length);
      return "done";
    } else {
      toast.dismiss(tLoading);
      notify("error", `Opps ${errorMessage}`);
      console.error(errorMessage);
    }
  };

  return {
    addToCardHook,
  };
}

export function useFetchProduct() {
  const fetchProduct = async (id) => {
    const [data, errorMessage] = await getData("/api/v1/products/" + id);

    if (data?.data) {
      return data.data;
    } else {
      console.error(errorMessage);
      return null;
    }
  };

  return {
    fetchProduct,
  };
}

export function useVerifyCodeHook() {
  const navigate = useNavigate();

  const verifyCodeHook = async (value) => {
    const [data, errorMessage] = await postData(
      "/api/v1/auth/verifyResetCode",
      value
    );

    if (data?.status === "Success") {
      navigate("/reset-password");
      return { status: "Success" };
    } else {
      console.error(errorMessage || data?.message);
      return { errorMessage: errorMessage || data?.message };
    }
  };

  return {
    verifyCodeHook,
  };
}

export function useDeleteFromWishlistHook() {
  const { token, setWishList, productsQuantity, setProductsQuantity } =
    useContextMain();

  const deleteFromWishlistHook = async (id) => {
    let tLoading = notify("loading", `loading...`);
    const [data, errorMessage] = await deleteData(`/api/v1/wishlist/${id}`, {
      headers: { token: token },
    });

    if (data?.data) {
      // TODONOW: id data?.data is array of wishlist ids delete the 7 line and setWishlist(data?.data)

      setWishList(data.data);
      toast.dismiss(tLoading);
      notify("success", `${data.message}`);

      return data.data;
    } else {
      toast.dismiss(tLoading);
      notify("error", `Opps ${errorMessage}`);
      console.error(errorMessage);
    }
  };

  return {
    deleteFromWishlistHook,
  };
}

export function useGetWishListHook() {
  const { token, setWishList } = useContextMain();

  const getWishListHook = async () => {
    const [data, errorMessage] = await getData("/api/v1/wishlist/", {
      headers: {
        token: token,
      },
    });

    if (data?.data) {
      const newWishlist = data?.data.map(({ id }) => {
        return id;
      });
      setWishList(newWishlist);
      return data?.data;
    } else {
      console.error(errorMessage);
    }
  };

  return {
    getWishListHook,
  };
}
