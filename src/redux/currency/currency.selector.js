import { createSelector } from "reselect";

const selectCurrency = (state) => state.currency;

export const selectCurrencyHidden = createSelector(
  [selectCurrency],
  (currency) => currency.hidden
);

export const selectCurrencySymbol = createSelector(
  [selectCurrency],
  (currency) => currency.preferredCurrencySymbol
);
