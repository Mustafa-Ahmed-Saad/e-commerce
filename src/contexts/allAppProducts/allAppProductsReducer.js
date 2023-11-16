import { saveInLocalStorage } from "../../helper/localStorage";
import { allAppProductsType } from "./allAppProductsType";

export const allAppProductsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case allAppProductsType.ALL_APP_PRODUCTS:
      saveInLocalStorage("allAppProducts", payload);
      return payload;
    // return {
    //   ...state,
    //   loading: true,
    // };

    default:
      return state;
    // throw new Error(`No case for type ${type} found in shopReducer.`);
  }
};
