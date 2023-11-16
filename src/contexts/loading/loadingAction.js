import { loadingType } from "./loadingType";

export const changeLoading = (value) => {
  return {
    type: loadingType.CHANGE_LOADING_STATE,
    payload: value,
  };
};
