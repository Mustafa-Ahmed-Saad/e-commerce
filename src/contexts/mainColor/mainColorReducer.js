import { saveInLocalStorage } from "../../helper/localStorage";
import { MainColorType } from "./mainColorType";

export const MainColorReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case MainColorType.CHANGE_MAIN_COLOR:
      saveInLocalStorage("main-color", payload);
      return payload;

    // return {
    //   ...state,
    //   mainColor: true,
    // };

    default:
      return state;
  }
};
