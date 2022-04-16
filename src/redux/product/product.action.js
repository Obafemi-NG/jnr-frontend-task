import { productActionType } from "./product.type";

export const changeCategory = (category) => ({
  type: productActionType.CHANGE_CATEGORY,
  payload: category,
});

export const changeAttribute = (attribute) => ({
  type: productActionType.CHANGE_ATTRIBUTE,
  payload: attribute,
});
