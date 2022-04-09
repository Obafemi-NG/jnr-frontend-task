import { currencyActionType } from "./currency.type";

export const toggleCurrencyDropdown = () => ({
  type: currencyActionType.TOGGLE_CURRENCY_DROPDOWN,
});

export const ChangeCurrency = (currency) => ({
  type: currencyActionType.CHANGE_CURRENCY,
  payload: currency,
});
