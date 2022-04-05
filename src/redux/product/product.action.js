import { productActionType } from "./product.type";

export const changeCategory = (category) => ({
  type: productActionType.CHANGE_CATEGORY,
  payload: category,
});
