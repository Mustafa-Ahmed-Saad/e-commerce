import { allAppProductsType } from "./allAppProductsType";

export const getAllAppProducts = (value) => {
  return {
    type: allAppProductsType.ALL_APP_PRODUCTS,
    payload: value,
  };
};
