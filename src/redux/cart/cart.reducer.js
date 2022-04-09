import { cartActionTypes } from "./cart.type";
import { addItemToCart, removeItemFromCart } from "./cart.util";
const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
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
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case cartActionTypes.REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    default:
      return state;
  }
};
