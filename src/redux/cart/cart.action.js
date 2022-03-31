import { cartActionTypes } from "./cart.type";

export const addItem = (item) => ({
  type: cartActionTypes.ADD_CART_ITEM,
  payload: item,
});
