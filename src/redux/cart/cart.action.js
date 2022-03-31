import { cartActionTypes } from "./cart.type";

export const addItem = (item) => ({
  type: cartActionTypes.ADD_CART_ITEM,
  payload: item,
});

export const toggleCart = () => ({
  type: cartActionTypes.TOGGLE_CART,
});
