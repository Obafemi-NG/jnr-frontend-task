import { cartActionTypes } from "./cart.type";
const INITIAL_STATE = {
  hidden: true,
  cartItem: [],
};
export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartActionTypes.TOGGLE_CART:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case cartActionTypes.ADD_CART_ITEM:
      return {
        ...state,
        cartItem: action.payload,
      };
    default:
      return state;
  }
};
