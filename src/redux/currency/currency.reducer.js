import { currencyActionType } from "./currency.type";

const INITIAL_STATE = {
  hidden: true,
};
export const currencyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case currencyActionType.TOGGLE_CURRENCY_DROPDOWN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    default:
      return state;
  }
};
