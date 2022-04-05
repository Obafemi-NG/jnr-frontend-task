import { combineReducers } from "redux";
import { cartReducer } from "./cart/cart.reducer";
import { currencyReducer } from "./currency/currency.reducer";
import productReducer from "./product/product.reducer";

export default combineReducers({
  cart: cartReducer,
  currency: currencyReducer,
  product: productReducer,
});
