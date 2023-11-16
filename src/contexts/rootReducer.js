import { allAppProductsReducer } from "./allAppProducts/allAppProductsReducer";
import { loadingReducer } from "./loading/loadingReducer";
import { MainColorReducer } from "./mainColor/mainColorReducer";

const rootReducer = (state, action) => {
  return {
    loading: loadingReducer(state.loading, action),
    mainColor: MainColorReducer(state.mainColor, action),
    allAppProducts: allAppProductsReducer(state.allAppProducts, action),
  };
};

export default rootReducer;
