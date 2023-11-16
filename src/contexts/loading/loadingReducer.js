import { loadingType } from "./loadingType";

export const loadingReducer = (LoadingState, action) => {
  const { type, payload } = action;

  switch (type) {
    case loadingType.CHANGE_LOADING_STATE:
      console.log("CHANGE_LOADING_STATE", payload, LoadingState);
      return payload;
    // return {
    //   ...state,
    //   loading: true,
    // };

    default:
      return LoadingState;
    // throw new Error(`No case for type ${type} found in shopReducer.`);
  }
};
