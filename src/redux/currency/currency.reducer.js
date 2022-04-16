import { currencyActionType } from "./currency.type";

const INITIAL_STATE = {
  hidden: true,
  // preferredCurrencyLabel: "USD",
  preferredCurrencySymbol: "$",
};
export const currencyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case currencyActionType.TOGGLE_CURRENCY_DROPDOWN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case currencyActionType.CHANGE_CURRENCY:
      return {
        ...state,
        preferredCurrencySymbol: action.payload,
      };
    default:
      return state;
  }
};
