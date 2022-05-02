import { cartActionTypes } from "./cart.type";
import { addItemToCart, decreaseCartItem, increaseCartItem } from "./cart.util";
const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
  attributes: {},
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
    case cartActionTypes.DECREASE_QUANTITY:
      return {
        ...state,
        cartItems: decreaseCartItem(state.cartItems, action.payload),
      };
    case cartActionTypes.INCREASE_QUANTITY:
      return {
        ...state,
        cartItems: increaseCartItem(state.cartItems, action.payload),
      };
    case cartActionTypes.REMOVE_CART_ITEM:
      // state.cartItems.splice(action.payload, 1);
      const newCart = state.cartItems.filter((cartItem) => {
        console.log(cartItem.id);
        return cartItem.id !== action.payload;
      });
      return { ...state, cartItems: newCart };
    default:
      return state;
  }
};
