import { cartActionTypes } from "./cart.type";
const INITIAL_STATE = {
  cartItem: [],
};
export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartActionTypes.ADD_CART_ITEM:
      return {
        ...state,
        cartItem: action.payload,
      };
    default:
      return state;
  }
};
