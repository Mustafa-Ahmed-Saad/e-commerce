import { MainColorType } from "./mainColorType";

export const changeMainColor = (value) => {
  return {
    type: MainColorType.CHANGE_MAIN_COLOR,
    payload: value,
  };
};
